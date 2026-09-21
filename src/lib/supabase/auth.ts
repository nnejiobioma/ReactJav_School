import { createClient, isSupabaseConfigured, LocalDataService } from './client';
import { Profile, UserRole } from '@/types';
import { DEMO_PROFILES } from './mockData';

export interface AuthResponse {
  success: boolean;
  user?: Profile | null;
  message?: string;
  error?: string;
}

/**
 * Sign up with email, password, full name, and role.
 * Integrates directly with Supabase Auth when configured, with seamless fallback.
 */
export async function signUpWithSupabase(
  email: string,
  password: string,
  fullName: string,
  role: UserRole = 'student'
): Promise<AuthResponse> {
  const supabase = createClient();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      if (data.user) {
        const newProfile: Profile = {
          id: data.user.id,
          email: data.user.email || email,
          full_name: fullName,
          avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
          role,
          created_at: new Date().toISOString(),
          subscription_status: role === 'student' ? 'none' : 'active',
          admin_granted: role !== 'student',
        };

        // Try upserting into public.profiles if table is created
        try {
          await supabase.from('profiles').upsert({
            id: newProfile.id,
            email: newProfile.email,
            full_name: newProfile.full_name,
            avatar_url: newProfile.avatar_url,
            role: newProfile.role,
          });
        } catch {
          // Table might not be migrated yet; local state handles execution
        }

        LocalDataService.setCurrentUser(newProfile);
        window.dispatchEvent(new Event('storage'));

        return {
          success: true,
          user: newProfile,
          message: data.session
            ? 'Account created and authenticated successfully!'
            : 'Account registered! Please check your email to confirm registration.',
        };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Signup failed';
      return { success: false, error: msg };
    }
  }

  // Fallback local persistence
  const fallbackProfile: Profile = {
    id: `usr_${Date.now()}`,
    email,
    full_name: fullName,
    avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
    role,
    created_at: new Date().toISOString(),
    subscription_status: role === 'student' ? 'none' : 'active',
    admin_granted: role !== 'student',
  };

  LocalDataService.setCurrentUser(fallbackProfile);
  window.dispatchEvent(new Event('storage'));

  return {
    success: true,
    user: fallbackProfile,
    message: `Account created successfully as ${role.toUpperCase()} (Session active)`,
  };
}

/**
 * Sign in with email and password.
 */
export async function signInWithSupabase(
  email: string,
  password: string
): Promise<AuthResponse> {
  const supabase = createClient();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      if (data.user) {
        // Fetch or build profile
        let userRole: UserRole = (data.user.user_metadata?.role as UserRole) || 'student';
        let fullName = data.user.user_metadata?.full_name || email.split('@')[0];
        let avatarUrl = data.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`;

        try {
          const { data: profileRow } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profileRow) {
            userRole = (profileRow.role as UserRole) || userRole;
            fullName = profileRow.full_name || fullName;
            avatarUrl = profileRow.avatar_url || avatarUrl;
          }
        } catch {
          // Ignore profile table query error
        }

        const profile: Profile = {
          id: data.user.id,
          email: data.user.email || email,
          full_name: fullName,
          avatar_url: avatarUrl,
          role: userRole,
          created_at: data.user.created_at || new Date().toISOString(),
          subscription_status: userRole === 'student' ? 'active' : 'active',
          admin_granted: true,
        };

        LocalDataService.setCurrentUser(profile);
        window.dispatchEvent(new Event('storage'));

        return {
          success: true,
          user: profile,
          message: 'Signed in successfully with Supabase!',
        };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      return { success: false, error: msg };
    }
  }

  // Check demo personas if matching email
  const lowerEmail = email.toLowerCase();
  let matchedPersona = DEMO_PROFILES.student;
  if (lowerEmail.includes('superadmin') || lowerEmail.includes('root') || lowerEmail.includes('owner')) {
    matchedPersona = DEMO_PROFILES.super_admin;
  } else if (lowerEmail.includes('instructor') || lowerEmail.includes('chen')) {
    matchedPersona = DEMO_PROFILES.instructor;
  } else if (lowerEmail.includes('admin') || lowerEmail.includes('registrar')) {
    matchedPersona = DEMO_PROFILES.admin;
  } else {
    matchedPersona = {
      ...DEMO_PROFILES.student,
      email,
      full_name: email.split('@')[0],
    };
  }

  LocalDataService.setCurrentUser(matchedPersona);
  window.dispatchEvent(new Event('storage'));

  return {
    success: true,
    user: matchedPersona,
    message: `Signed in as ${matchedPersona.role.toUpperCase()}`,
  };
}

/**
 * Sign out current session
 */
export async function signOutUser(): Promise<void> {
  const supabase = createClient();
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase sign out error:', err);
    }
  }

  LocalDataService.logout();
  window.dispatchEvent(new Event('storage'));
}

/**
 * Sync Supabase session with local state
 */
export async function syncSupabaseSession(): Promise<Profile | null> {
  const supabase = createClient();
  if (!isSupabaseConfigured() || !supabase) {
    return LocalDataService.getCurrentUser();
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !session.user) {
      return LocalDataService.getCurrentUser();
    }

    const { user } = session;
    const existing = LocalDataService.getCurrentUser();
    if (existing && existing.id === user.id) {
      return existing;
    }

    const profile: Profile = {
      id: user.id,
      email: user.email || '',
      full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email || 'U')}`,
      role: (user.user_metadata?.role as UserRole) || 'student',
      created_at: user.created_at || new Date().toISOString(),
      subscription_status: 'active',
      admin_granted: true,
    };

    LocalDataService.setCurrentUser(profile);
    window.dispatchEvent(new Event('storage'));
    return profile;
  } catch {
    return LocalDataService.getCurrentUser();
  }
}
