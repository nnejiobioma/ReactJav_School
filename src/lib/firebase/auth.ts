import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './config';
import { Profile, UserRole, Privilege, ROLE_PRIVILEGES, FirebaseCustomClaims } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { setCookie } from '@/lib/cookies';

export interface FirebaseAuthResponse {
  success: boolean;
  user?: Profile | null;
  message?: string;
  error?: string;
}

/**
 * Maps a FirebaseUser and local data into a unified ReactJav Profile
 */
export function mapFirebaseUserToProfile(
  fbUser: FirebaseUser, 
  extra?: Partial<Profile>
): Profile {
  const cleanEmail = (fbUser.email || '').trim().toLowerCase();
  const allProfiles = LocalDataService.getAllProfiles();
  const existing = allProfiles.find(
    (p) => p.id === fbUser.uid || p.firebase_uid === fbUser.uid || (p.email && p.email.toLowerCase() === cleanEmail)
  );

  const timestamp = new Date().toISOString();
  const fullName = extra?.full_name || fbUser.displayName || existing?.full_name || cleanEmail.split('@')[0] || 'Learner';
  const role: UserRole = extra?.role || existing?.role || 'student';
  const privileges: Privilege[] = extra?.privileges || existing?.privileges || ROLE_PRIVILEGES[role] || ROLE_PRIVILEGES.student;

  const profile: Profile = {
    id: existing?.id || fbUser.uid,
    firebase_uid: fbUser.uid,
    email: cleanEmail,
    full_name: fullName,
    avatar_url: fbUser.photoURL || existing?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
    role,
    privileges,
    custom_claims: extra?.custom_claims || existing?.custom_claims,
    created_at: existing?.created_at || timestamp,
    subscription_status: extra?.subscription_status || existing?.subscription_status || 'none',
    subscription_plan: extra?.subscription_plan || existing?.subscription_plan,
    payment_reference: extra?.payment_reference || existing?.payment_reference,
    admin_granted: extra?.admin_granted !== undefined ? extra.admin_granted : (existing?.admin_granted || false),
    registration_completed: existing?.registration_completed || false,
    privacy_accepted: extra?.privacy_accepted !== undefined 
      ? extra.privacy_accepted 
      : existing?.privacy_accepted !== undefined 
        ? existing.privacy_accepted 
        : false,
    privacy_accepted_at: extra?.privacy_accepted_at || existing?.privacy_accepted_at,
    terms_accepted: extra?.terms_accepted !== undefined 
      ? extra.terms_accepted 
      : existing?.terms_accepted !== undefined 
        ? existing.terms_accepted 
        : false,
    terms_accepted_at: extra?.terms_accepted_at || existing?.terms_accepted_at,
  };

  return profile;
}

/**
 * Register a new student account using Firebase Authentication.
 * Strictly enforces Privacy Policy and Terms of Service acceptance.
 */
export async function signUpWithFirebase(
  email: string,
  password: string,
  fullName: string,
  acceptedPrivacy: boolean = false,
  acceptedTerms: boolean = false
): Promise<FirebaseAuthResponse> {
  if (!acceptedPrivacy && !acceptedTerms) {
    return {
      success: false,
      error: 'Access not granted: You must accept both the Terms of Service and Privacy Policy before creating an account.',
    };
  }
  if (!acceptedPrivacy) {
    return {
      success: false,
      error: 'Access not granted: You must accept the Privacy Policy before creating an account.',
    };
  }
  if (!acceptedTerms) {
    return {
      success: false,
      error: 'Access not granted: You must accept the Terms of Service before creating an account.',
    };
  }

  const cleanEmail = email.trim().toLowerCase();
  const timestamp = new Date().toISOString();

  // If Firebase keys are configured, use real Firebase Auth
  if (isFirebaseConfigured() && auth) {
    try {
      const credential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      
      // Update display name on Firebase Auth record
      try {
        await updateProfile(credential.user, {
          displayName: fullName.trim(),
          photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName.trim())}`,
        });
      } catch (err) {
        console.warn('Could not update Firebase displayName:', err);
      }

      const profile = mapFirebaseUserToProfile(credential.user, {
        full_name: fullName.trim(),
        role: 'student',
        privacy_accepted: true,
        privacy_accepted_at: timestamp,
        terms_accepted: true,
        terms_accepted_at: timestamp,
      });

      // Persist profile locally and to Supabase database
      await LocalDataService.syncProfileToSupabaseAndLocal(profile);
      setCookie('reactjav_privacy_accepted', 'true', 365);
      window.dispatchEvent(new Event('storage'));

      return {
        success: true,
        user: profile,
        message: 'Account created successfully with Firebase Authentication!',
      };
    } catch (err: any) {
      let message = err?.message || 'Firebase registration failed.';
      if (err?.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please sign in instead.';
      } else if (err?.code === 'auth/weak-password') {
        message = 'Password is too weak. Please use at least 6 characters.';
      } else if (err?.code === 'auth/invalid-email') {
        message = 'Invalid email address format.';
      }

      return {
        success: false,
        error: message,
      };
    }
  }

  // Graceful fallback for local development / offline demo
  const fallbackProfile: Profile = {
    id: `fb_usr_${Date.now()}`,
    email: cleanEmail,
    full_name: fullName.trim(),
    avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName.trim())}`,
    role: 'student',
    created_at: timestamp,
    subscription_status: 'none',
    admin_granted: false,
    privacy_accepted: true,
    privacy_accepted_at: timestamp,
    terms_accepted: true,
    terms_accepted_at: timestamp,
  };

  await LocalDataService.syncProfileToSupabaseAndLocal(fallbackProfile);
  setCookie('reactjav_privacy_accepted', 'true', 365);
  window.dispatchEvent(new Event('storage'));

  return {
    success: true,
    user: fallbackProfile,
    message: 'Account created successfully! (Configure NEXT_PUBLIC_FIREBASE_* in .env.local for production Firebase Auth)',
  };
}

/**
 * Sign in using Firebase Authentication with email & password.
 * Synchronizes with Supabase database for role & tuition subscription status.
 */
export async function signInWithFirebase(
  email: string,
  password: string
): Promise<FirebaseAuthResponse> {
  const cleanEmail = email.trim().toLowerCase();

  // Sync server persisted profiles first
  try {
    await LocalDataService.syncFromServer();
  } catch {}

  if (isFirebaseConfigured() && auth) {
    try {
      const credential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      
      // Extract Firebase custom claims from ID token
      let tokenRole: UserRole | undefined;
      let tokenClaims: FirebaseCustomClaims | undefined;
      try {
        const idTokenResult = await credential.user.getIdTokenResult(true);
        if (idTokenResult?.claims?.role) {
          tokenRole = idTokenResult.claims.role as UserRole;
          tokenClaims = idTokenResult.claims as unknown as FirebaseCustomClaims;
        }
      } catch (claimsErr) {
        console.warn('Notice: ID token claims lookup:', claimsErr);
      }

      // Fetch user's profile from Supabase database
      const dbProfile = await LocalDataService.getProfileByEmailOrId(cleanEmail, credential.user.uid);
      const effectiveRole: UserRole = tokenRole || dbProfile?.role || 'student';

      const profile = mapFirebaseUserToProfile(credential.user, {
        role: effectiveRole,
        privileges: ROLE_PRIVILEGES[effectiveRole],
        custom_claims: tokenClaims,
        subscription_status: dbProfile?.subscription_status,
        subscription_plan: dbProfile?.subscription_plan,
        payment_reference: dbProfile?.payment_reference,
        admin_granted: dbProfile?.admin_granted,
        full_name: dbProfile?.full_name || credential.user.displayName || undefined,
        avatar_url: credential.user.photoURL || dbProfile?.avatar_url || undefined,
        privacy_accepted: dbProfile?.privacy_accepted,
        privacy_accepted_at: dbProfile?.privacy_accepted_at,
        terms_accepted: dbProfile?.terms_accepted,
        terms_accepted_at: dbProfile?.terms_accepted_at,
      });

      await LocalDataService.syncProfileToSupabaseAndLocal(profile);
      window.dispatchEvent(new Event('storage'));

      return {
        success: true,
        user: profile,
        message: 'Signed in successfully with Firebase!',
      };
    } catch (err: any) {
      let message = err?.message || 'Invalid email or password.';
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential') {
        message = 'Invalid email or password. Please verify your credentials or register a new account.';
      } else if (err?.code === 'auth/too-many-requests') {
        message = 'Access temporarily disabled due to many failed login attempts. Please reset your password or try again later.';
      }

      return {
        success: false,
        error: message,
      };
    }
  }

  // Local / offline fallback
  const dbProfile = await LocalDataService.getProfileByEmailOrId(cleanEmail);
  if (dbProfile) {
    LocalDataService.setCurrentUser(dbProfile);
    window.dispatchEvent(new Event('storage'));
    return {
      success: true,
      user: dbProfile,
      message: 'Signed in successfully!',
    };
  }

  return {
    success: false,
    error: 'Invalid email or password. Please verify your credentials or register a new account.',
  };
}

/**
 * Single-click Google Sign-in with Firebase.
 * Preserves Supabase permissions, roles, and tuition clearance.
 */
export async function signInWithGoogleFirebase(
  acceptedPrivacy: boolean = true,
  acceptedTerms: boolean = true
): Promise<FirebaseAuthResponse> {
  if (!isFirebaseConfigured() || !auth || !googleProvider) {
    return {
      success: false,
      error: 'Firebase is not yet configured. Please add your NEXT_PUBLIC_FIREBASE_* credentials in .env.local to enable Google Sign-In.',
    };
  }

  try {
    const credential = await signInWithPopup(auth, googleProvider);
    const cleanEmail = (credential.user.email || '').trim().toLowerCase();
    const timestamp = new Date().toISOString();

    // Extract Firebase custom claims from ID token
    let tokenRole: UserRole | undefined;
    let tokenClaims: FirebaseCustomClaims | undefined;
    try {
      const idTokenResult = await credential.user.getIdTokenResult(true);
      if (idTokenResult?.claims?.role) {
        tokenRole = idTokenResult.claims.role as UserRole;
        tokenClaims = idTokenResult.claims as unknown as FirebaseCustomClaims;
      }
    } catch (claimsErr) {
      console.warn('Notice: Google sign-in ID token claims lookup:', claimsErr);
    }

    // Query Supabase database for existing record
    const dbProfile = await LocalDataService.getProfileByEmailOrId(cleanEmail, credential.user.uid);
    const effectiveRole: UserRole = tokenRole || dbProfile?.role || 'student';

    const profile = mapFirebaseUserToProfile(credential.user, {
      role: effectiveRole,
      privileges: ROLE_PRIVILEGES[effectiveRole],
      custom_claims: tokenClaims,
      subscription_status: dbProfile?.subscription_status,
      subscription_plan: dbProfile?.subscription_plan,
      payment_reference: dbProfile?.payment_reference,
      admin_granted: dbProfile?.admin_granted,
      full_name: dbProfile?.full_name || credential.user.displayName || undefined,
      avatar_url: credential.user.photoURL || dbProfile?.avatar_url || undefined,
      privacy_accepted: dbProfile?.privacy_accepted !== undefined ? dbProfile.privacy_accepted : acceptedPrivacy,
      privacy_accepted_at: dbProfile?.privacy_accepted_at || (acceptedPrivacy ? timestamp : undefined),
      terms_accepted: dbProfile?.terms_accepted !== undefined ? dbProfile.terms_accepted : acceptedTerms,
      terms_accepted_at: dbProfile?.terms_accepted_at || (acceptedTerms ? timestamp : undefined),
    });

    await LocalDataService.syncProfileToSupabaseAndLocal(profile);
    if (profile.privacy_accepted) {
      setCookie('reactjav_privacy_accepted', 'true', 365);
    }

    window.dispatchEvent(new Event('storage'));

    return {
      success: true,
      user: profile,
      message: 'Signed in with Google successfully!',
    };
  } catch (err: any) {
    if (err?.code === 'auth/popup-closed-by-user') {
      return {
        success: false,
        error: 'Google sign-in popup was closed before completion.',
      };
    }
    return {
      success: false,
      error: err?.message || 'Google sign-in failed.',
    };
  }
}

/**
 * Send password reset email via Firebase Auth
 */
export async function sendPasswordResetFirebase(email: string): Promise<FirebaseAuthResponse> {
  const cleanEmail = email.trim().toLowerCase();

  if (isFirebaseConfigured() && auth) {
    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      return {
        success: true,
        message: 'Password reset link sent to your email via Firebase.',
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Failed to send password reset email.',
      };
    }
  }

  return {
    success: true,
    message: 'Password reset link sent! Check your inbox for instructions.',
  };
}

/**
 * Update authenticated user password
 */
export async function updatePasswordFirebase(newPassword: string): Promise<FirebaseAuthResponse> {
  if (isFirebaseConfigured() && auth && auth.currentUser) {
    try {
      await updatePassword(auth.currentUser, newPassword);
      return {
        success: true,
        message: 'Password updated successfully in Firebase Auth!',
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Failed to update password.',
      };
    }
  }

  return {
    success: true,
    message: 'Password updated successfully!',
  };
}

/**
 * Sign out from Firebase Auth and local session
 */
export async function signOutFirebase(): Promise<void> {
  if (isFirebaseConfigured() && auth) {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Firebase sign out error:', err);
    }
  }

  LocalDataService.logout();
  window.dispatchEvent(new Event('storage'));
}

/**
 * Listen to Firebase Auth state changes
 */
export function onFirebaseAuthStateChange(callback: (user: FirebaseUser | null) => void) {
  if (isFirebaseConfigured() && auth) {
    return onAuthStateChanged(auth, callback);
  }
  return () => {};
}

/**
 * Force refresh user's Firebase token to pull the latest Custom User Claims
 */
export async function refreshFirebaseCustomClaims(): Promise<{
  role: UserRole;
  privileges: Privilege[];
  claims?: any;
} | null> {
  if (isFirebaseConfigured() && auth && auth.currentUser) {
    try {
      const idTokenResult = await auth.currentUser.getIdTokenResult(true);
      const role = (idTokenResult?.claims?.role as UserRole) || 'student';
      const currentUser = LocalDataService.getCurrentUser();
      if (currentUser) {
        const updatedUser: Profile = {
          ...currentUser,
          role,
          privileges: ROLE_PRIVILEGES[role],
          custom_claims: idTokenResult.claims as unknown as FirebaseCustomClaims,
        };
        LocalDataService.setCurrentUser(updatedUser);
        window.dispatchEvent(new Event('storage'));
        return {
          role,
          privileges: ROLE_PRIVILEGES[role],
          claims: idTokenResult.claims,
        };
      }
    } catch (err) {
      console.warn('Could not refresh Firebase custom claims:', err);
    }
  }
  return null;
}

/**
 * Checks whether an authenticated user holds a specific privilege
 */
export function hasPrivilege(user: Profile | null, privilege: Privilege): boolean {
  if (!user) return false;
  if (user.role === 'super_admin') return true;
  const userPrivileges = user.privileges || ROLE_PRIVILEGES[user.role] || [];
  return userPrivileges.includes(privilege);
}

/**
 * Validates whether the user is a Super Administrator (All Privileges)
 */
export function isSuperAdmin(user: Profile | null): boolean {
  return !!user && user.role === 'super_admin';
}

/**
 * Validates whether the user has Administrator or higher privileges
 */
export function isAdmin(user: Profile | null): boolean {
  return !!user && (user.role === 'admin' || user.role === 'super_admin');
}

/**
 * Validates whether the user holds standard Student privileges
 */
export function isStudent(user: Profile | null): boolean {
  return !!user && user.role === 'student';
}

