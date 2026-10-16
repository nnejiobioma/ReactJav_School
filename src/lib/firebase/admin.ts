import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth, DecodedIdToken, UserRecord } from 'firebase-admin/auth';
import { UserRole, Privilege, ROLE_PRIVILEGES, FirebaseCustomClaims } from '@/types';

/**
 * Singleton instance of Firebase Admin App
 */
let adminApp: App | null = null;

/**
 * Formats private key safely, ensuring escaped newlines are converted to true newlines
 */
function formatPrivateKey(key?: string): string | undefined {
  if (!key) return undefined;
  let formatted = key.trim();
  // Strip enclosing quotes if present in env
  if ((formatted.startsWith('"') && formatted.endsWith('"')) || (formatted.startsWith("'") && formatted.endsWith("'"))) {
    formatted = formatted.slice(1, -1);
  }
  return formatted.replace(/\\n/g, '\n');
}

/**
 * Checks whether Firebase Admin SDK credentials are provided in the environment.
 */
export function isFirebaseAdminConfigured(): boolean {
  if (typeof window !== 'undefined') return false;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) return true;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY);

  return !!(projectId && clientEmail && privateKey);
}

/**
 * Initializes and returns the Firebase Admin SDK application instance.
 */
export function getFirebaseAdminApp(): App | null {
  if (typeof window !== 'undefined') return null;

  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0]!;
  }

  // 1. Try JSON service account key (raw or base64)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      let rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
      if (!rawJson.startsWith('{')) {
        rawJson = Buffer.from(rawJson, 'base64').toString('utf-8');
      }
      const serviceAccount = JSON.parse(rawJson);
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
      });
      return adminApp;
    } catch (err) {
      console.error('[Firebase Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', err);
    }
  }

  // 2. Try discrete credentials
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY);

  if (projectId && clientEmail && privateKey) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      });
      return adminApp;
    } catch (err) {
      console.error('[Firebase Admin] Error initializing with individual credentials:', err);
    }
  }

  // 3. Fallback for Google Cloud / Vercel with Application Default Credentials
  if (projectId) {
    try {
      adminApp = initializeApp({
        projectId,
      });
      return adminApp;
    } catch (err) {
      console.warn('[Firebase Admin] Notice: Project ID initialized without explicit service account key.');
    }
  }

  return null;
}

/**
 * Returns Firebase Admin Auth instance or null if not configured
 */
export function getFirebaseAdminAuth(): Auth | null {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  return getAuth(app);
}

/**
 * Builds standard custom claims object based on the user's role
 */
export function buildClaimsForRole(role: UserRole): FirebaseCustomClaims {
  const privileges: Privilege[] = ROLE_PRIVILEGES[role] || ROLE_PRIVILEGES.student;
  return {
    role,
    privileges,
    isAdmin: role === 'admin' || role === 'super_admin',
    isSuperAdmin: role === 'super_admin',
    isInstructor: role === 'instructor' || role === 'admin' || role === 'super_admin',
    isStudent: role === 'student',
    updated_at: new Date().toISOString(),
  };
}

/**
 * Sets custom user claims for a user in Firebase Auth.
 * Enables server-enforced role and privilege checks.
 */
export async function setFirebaseRoleAndClaims(
  uid: string, 
  role: UserRole
): Promise<{ success: boolean; claims: FirebaseCustomClaims; message: string }> {
  const claims = buildClaimsForRole(role);
  const auth = getFirebaseAdminAuth();

  if (!auth) {
    return {
      success: false,
      claims,
      message: 'Firebase Admin SDK is not configured with service account credentials. Role updated in database & local state only.',
    };
  }

  try {
    await auth.setCustomUserClaims(uid, claims);
    return {
      success: true,
      claims,
      message: `Firebase custom claims successfully assigned: ${role.toUpperCase().replace('_', ' ')}.`,
    };
  } catch (err: any) {
    console.error(`[Firebase Admin] Failed setting claims for UID ${uid}:`, err);
    return {
      success: false,
      claims,
      message: `Failed to set Firebase custom claims: ${err.message || 'Unknown error'}`,
    };
  }
}

/**
 * Verifies a Firebase ID token and returns the decoded claims
 */
export async function verifyFirebaseToken(idToken: string): Promise<DecodedIdToken | null> {
  const auth = getFirebaseAdminAuth();
  if (!auth) return null;
  try {
    return await auth.verifyIdToken(idToken, true);
  } catch (err) {
    console.warn('[Firebase Admin] Token verification failed:', err);
    return null;
  }
}

/**
 * Retrieves a user record by UID along with custom claims
 */
export async function getFirebaseUser(uid: string): Promise<UserRecord | null> {
  const auth = getFirebaseAdminAuth();
  if (!auth) return null;
  try {
    return await auth.getUser(uid);
  } catch {
    return null;
  }
}

/**
 * Lists users registered in Firebase Authentication
 */
export async function listAllFirebaseUsers(maxResults = 100): Promise<UserRecord[]> {
  const auth = getFirebaseAdminAuth();
  if (!auth) return [];
  try {
    const listResult = await auth.listUsers(maxResults);
    return listResult.users;
  } catch (err) {
    console.error('[Firebase Admin] Error listing users:', err);
    return [];
  }
}

/**
 * Bootstraps a Super Admin user by email if specified in SUPER_ADMIN_EMAILS
 */
export async function bootstrapSuperAdminByEmail(email: string): Promise<boolean> {
  const auth = getFirebaseAdminAuth();
  if (!auth) return false;
  try {
    const user = await auth.getUserByEmail(email.toLowerCase().trim());
    if (user && user.uid) {
      await setFirebaseRoleAndClaims(user.uid, 'super_admin');
      console.log(`[Firebase Admin] Bootstrapped ${email} (${user.uid}) as Super Admin.`);
      return true;
    }
  } catch (err) {
    console.warn(`[Firebase Admin] Bootstrap notice for ${email}:`, err);
  }
  return false;
}
