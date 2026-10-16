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

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'mockData.json');

/**
 * Loads mockData.json safely
 */
function loadData(): any {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('[API Privileges] Error reading mock data:', err);
  }
  return {};
}

/**
 * Saves mockData.json safely
 */
function saveData(data: any): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[API Privileges] Error writing mock data:', err);
    return false;
  }
}

/**
 * Optional Supabase admin client for server-side updates
 */
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/**
 * GET: Lists roles, privilege categories, and user claims
 */
export async function GET(request: NextRequest) {
  try {
    const data = loadData();
    const profiles: Profile[] = data.profiles || [];
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

    // Load data
    const data = loadData();
    const profiles: Profile[] = data.profiles || [];
    const targetIndex = profiles.findIndex(
      (p) => p.id === targetUserId || p.firebase_uid === targetUserId || p.email.toLowerCase() === targetUserId.toLowerCase()
    );

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
    data.profiles = profiles;
    saveData(data);

    // 3. Update Supabase database
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        await supabase
          .from('profiles')
          .update({ role: targetRole })
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

    const data = loadData();
    const profiles: Profile[] = data.profiles || [];
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
