import { NextRequest, NextResponse } from 'next/server';
import { generatePasswordResetLinkFirebase, isFirebaseAdminConfigured } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const isConfigured = isFirebaseAdminConfigured();

    if (!isConfigured) {
      return NextResponse.json({
        success: false,
        isConfigured: false,
        error: 'Firebase Admin SDK service credentials not detected. Service key needed for direct link generation.',
      });
    }

    const res = await generatePasswordResetLinkFirebase(cleanEmail);
    if (!res.success) {
      return NextResponse.json(
        { success: false, error: res.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      email: cleanEmail,
      link: res.link,
      oobCode: res.oobCode,
      message: 'Direct password reset link generated successfully.',
    });
  } catch (err: any) {
    console.error('[API Reset Link] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to generate reset link.' },
      { status: 500 }
    );
  }
}
