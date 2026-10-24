import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { UserRole, Profile, ROLE_PRIVILEGES } from '@/types';
import { 
  getFirebaseAdminAuth, 
  isFirebaseAdminConfigured, 
  setFirebaseRoleAndClaims, 
  verifyFirebaseToken,
  listAllFirebaseUsers,
  buildClaimsForRole
} from '@/lib/firebase/admin';
import { createClient } from '@supabase/supabase-js';

const PROFILES_FILE = path.join(process.cwd(), 'src', 'data', 'persistedProfiles.json');

/**
 * Loads persisted profiles safely from disk and Supabase
 */
async function loadPersistedProfiles(): Promise<Profile[]> {
  let list: Profile[] = [];
  try {
    if (fs.existsSync(PROFILES_FILE)) {
      const content = fs.readFileSync(PROFILES_FILE, 'utf-8');
      list = JSON.parse(content);
    }
  } catch (err) {
    console.error('[API Privileges] Error reading persisted profiles:', err);
  }

  // Enhance from Supabase if available
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data: dbProfiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && dbProfiles && dbProfiles.length > 0) {
        const map = new Map<string, Profile>();
        list.forEach((p) => map.set(p.id, p));
        dbProfiles.forEach((p: any) => {
          const profile: Profile = {
            id: p.id,
            firebase_uid: p.firebase_uid || p.id,
            email: p.email,
            full_name: p.full_name || p.email?.split('@')[0] || 'Learner',
            avatar_url: p.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(p.full_name || p.email)}`,
            role: (p.role as UserRole) || 'student',
            privileges: ROLE_PRIVILEGES[(p.role as UserRole) || 'student'] || ROLE_PRIVILEGES.student,
            created_at: p.created_at || new Date().toISOString(),
            subscription_status: p.subscription_status || 'none',
            admin_granted: !!p.admin_granted,
            tutoring_enrolled: !!p.tutoring_enrolled,
            registration_completed: !!p.registration_completed,
            privacy_accepted: p.privacy_accepted !== undefined ? !!p.privacy_accepted : false,
            terms_accepted: p.terms_accepted !== undefined ? !!p.terms_accepted : false,
          };
          map.set(profile.id, profile);
          if (profile.email) map.set(profile.email.toLowerCase(), profile);
        });
        list = Array.from(new Set(map.values()));
      }
    } catch (err) {
      console.warn('[API Privileges] Supabase profiles query notice:', err);
    }
  }

  return list;
}

/**
 * Saves persisted profiles safely
 */
function savePersistedProfiles(profiles: Profile[]): boolean {
  try {
    const dir = path.dirname(PROFILES_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(PROFILES_FILE, JSON.stringify(profiles, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[API Privileges] Error writing persisted profiles:', err);
    return false;
  }
}

/**
 * Optional Supabase admin client for server-side updates
 */
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfhmqodrjnsabpyxbgnn.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaG1xb2Ryam5zYWJweXhiZ25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDExMzQsImV4cCI6MjEwNTQ3NzEzNH0.ovZdP0xuywAWJUwg2Yx9ilRXhLwCYe8uTw4MSXaUjB0';
  if (!url || !key) return null;
  return createClient(url, key);
}

/**
 * GET: Lists roles, privilege categories, and user claims
 */
export async function GET(request: NextRequest) {
  try {
    const profiles = await loadPersistedProfiles();
    const isConfigured = isFirebaseAdminConfigured();

    // Privilege category definitions
    const categories = [
      {
        id: 'student',
        title: 'Student (Learner)',
        role: 'student',
        badgeColor: '#38bdf8',
        description: 'Standard academic enrollment. Enjoys full curriculum access, interactive CBT quizzes, video checkpoint resume, and personal study workspace.',
        privileges: ROLE_PRIVILEGES.student,
      },
      {
        id: 'instructor',
        title: 'Instructor (Faculty & Course Author)',
        role: 'instructor',
        badgeColor: '#10b981',
        description: 'Faculty clearance. Authors courses and interactive curricula, creates CBT quizzes, tracks cohort attendance, and mentors students.',
        privileges: ROLE_PRIVILEGES.instructor,
      },
      {
        id: 'admin',
        title: 'Administrator (Staff & Registrar)',
        role: 'admin',
        badgeColor: '#fbbf24',
        description: 'Academic staff clearance. Manages curriculum authoring, student performance reviews, CBT examinations, attendance, and tuition clearance.',
        privileges: ROLE_PRIVILEGES.admin,
      },
      {
        id: 'super_admin',
        title: 'Super Administrator (Root Governance)',
        role: 'super_admin',
        badgeColor: '#c084fc',
        description: 'Complete unconstrained institutional control. Holds exclusive authority to grant or revoke Instructor, Admin, and Super Admin privileges, manage Firebase claims, and govern platform security.',
        privileges: ROLE_PRIVILEGES.super_admin,
      },
    ];

    return NextResponse.json({
      success: true,
      isFirebaseAdminConfigured: isConfigured,
      categories,
      rolePrivileges: ROLE_PRIVILEGES,
      users: profiles.map((p) => ({
        id: p.id,
        firebase_uid: p.firebase_uid || p.id,
        email: p.email,
        full_name: p.full_name,
        role: p.role,
        privileges: ROLE_PRIVILEGES[p.role] || ROLE_PRIVILEGES.student,
        custom_claims: p.custom_claims || buildClaimsForRole(p.role),
        avatar_url: p.avatar_url,
        subscription_status: p.subscription_status,
        created_at: p.created_at,
      })),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to retrieve privilege directory.' },
      { status: 500 }
    );
  }
}

/**
 * POST: Assigns role and sets Firebase Custom User Claims
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetUserId, targetRole, initiatorId } = body;

    if (!targetUserId || !targetRole) {
      return NextResponse.json(
        { success: false, error: 'targetUserId and targetRole are required.' },
        { status: 400 }
      );
    }

    const validRoles: UserRole[] = ['student', 'instructor', 'admin', 'super_admin'];
    if (!validRoles.includes(targetRole)) {
      return NextResponse.json(
        { success: false, error: `Invalid role specified: ${targetRole}. Valid: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    // Load profiles from persisted disk and database
    let profiles = await loadPersistedProfiles();
    let targetIndex = profiles.findIndex(
      (p) => p.id === targetUserId || p.firebase_uid === targetUserId || (p.email && p.email.toLowerCase() === targetUserId.toLowerCase())
    );

    // If not found in loaded list, attempt direct lookup from Firebase Admin or Supabase
    if (targetIndex === -1) {
      const fbAdmin = getFirebaseAdminAuth();
      if (fbAdmin) {
        try {
          let fbUserRecord: any = null;
          try {
            fbUserRecord = await fbAdmin.getUser(targetUserId);
          } catch {
            if (targetUserId.includes('@')) {
              fbUserRecord = await fbAdmin.getUserByEmail(targetUserId.toLowerCase().trim());
            }
          }
          if (fbUserRecord) {
            const newProfile: Profile = {
              id: fbUserRecord.uid,
              firebase_uid: fbUserRecord.uid,
              email: fbUserRecord.email || targetUserId,
              full_name: fbUserRecord.displayName || targetUserId.split('@')[0] || 'User',
              avatar_url: fbUserRecord.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fbUserRecord.email || targetUserId)}`,
              role: 'student',
              privileges: ROLE_PRIVILEGES.student,
              created_at: new Date().toISOString(),
              subscription_status: 'none',
              admin_granted: false,
              tutoring_enrolled: false,
              registration_completed: false,
              privacy_accepted: true,
              terms_accepted: true,
            };
            profiles.push(newProfile);
            targetIndex = profiles.length - 1;
          }
        } catch (lookupErr) {
          console.warn('[API Privileges] Direct Firebase user lookup notice:', lookupErr);
        }
      }
    }

    if (targetIndex === -1) {
      return NextResponse.json(
        { success: false, error: `User profile with ID or email ${targetUserId} not found.` },
        { status: 404 }
      );
    }

    const targetUser = profiles[targetIndex];

    // Check authorization: Bearer token or initiator verification
    let authorized = false;
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decoded = await verifyFirebaseToken(token);
      if (decoded && (decoded.role === 'super_admin' || decoded.isSuperAdmin)) {
        authorized = true;
      }
    }

    // Check initiator fallback
    if (!authorized && initiatorId) {
      const initiator = profiles.find((p) => p.id === initiatorId || p.firebase_uid === initiatorId);
      if (initiator && initiator.role === 'super_admin') {
        authorized = true;
      }
    }

    // In local development or bootstrap mode, allow first super_admin configuration
    const currentSuperAdmins = profiles.filter((p) => p.role === 'super_admin');
    if (!authorized && currentSuperAdmins.length === 0) {
      authorized = true; // First Super Admin bootstrapping
    }

    if (!authorized) {
      return NextResponse.json(
        {
          success: false,
          error: 'Access Denied: Only authenticated Super Administrators have governance rights to modify privilege claims.',
        },
        { status: 403 }
      );
    }

    // Safety guard: Cannot demote the last remaining Super Admin
    if (targetUser.role === 'super_admin' && targetRole !== 'super_admin') {
      const remainingSuperAdmins = profiles.filter(
        (p) => p.role === 'super_admin' && p.id !== targetUser.id && p.firebase_uid !== targetUser.firebase_uid
      );
      if (remainingSuperAdmins.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'Security Constraint: You cannot demote the only remaining Super Administrator on the platform.',
          },
          { status: 400 }
        );
      }
    }

    // 1. Set Firebase Custom User Claims via Firebase Admin SDK
    const firebaseUid = targetUser.firebase_uid || targetUser.id;
    const firebaseResult = await setFirebaseRoleAndClaims(firebaseUid, targetRole);

    // 2. Update local state
    const updatedUser: Profile = {
      ...targetUser,
      role: targetRole,
      privileges: ROLE_PRIVILEGES[targetRole as UserRole],
      custom_claims: firebaseResult.claims,
    };
    profiles[targetIndex] = updatedUser;
    savePersistedProfiles(profiles);

    // 3. Update Supabase database
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        const cleanEmail = targetUser.email ? targetUser.email.toLowerCase().trim() : '';
        if (cleanEmail) {
          await supabase
            .from('profiles')
            .update({ role: targetRole, updated_at: new Date().toISOString() })
            .eq('email', cleanEmail);
        }
        await supabase
          .from('profiles')
          .update({ role: targetRole, updated_at: new Date().toISOString() })
          .or(`id.eq.${targetUser.id},firebase_uid.eq.${firebaseUid}`);
      } catch (dbErr) {
        console.warn('[API Privileges] Supabase profile sync notice:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully assigned ${targetRole.toUpperCase().replace('_', ' ')} privileges to ${targetUser.full_name || targetUser.email}.`,
      user: updatedUser,
      firebaseClaims: firebaseResult.claims,
      firebaseConfigured: isFirebaseAdminConfigured(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'An error occurred while updating user privileges.' },
      { status: 500 }
    );
  }
}

/**
 * PUT: Synchronize all profiles with Firebase Custom Claims
 */
export async function PUT(request: NextRequest) {
  try {
    const isConfigured = isFirebaseAdminConfigured();
    if (!isConfigured) {
      return NextResponse.json({
        success: false,
        message: 'Firebase Admin credentials not detected in environment. Provide FIREBASE_ADMIN_* keys in .env.local to enable cloud claims synchronization.',
      });
    }

    const profiles = await loadPersistedProfiles();
    let syncedCount = 0;

    for (const profile of profiles) {
      const uid = profile.firebase_uid || profile.id;
      if (uid) {
        const res = await setFirebaseRoleAndClaims(uid, profile.role);
        if (res.success) syncedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      syncedCount,
      totalCount: profiles.length,
      message: `Successfully synchronized ${syncedCount} of ${profiles.length} user privilege claims with Firebase Auth.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to sync Firebase claims.' },
      { status: 500 }
    );
  }
}
