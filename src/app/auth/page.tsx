'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Key, 
  Check, 
  ArrowRight,
  LogOut,
  AlertCircle,
  RefreshCw,
  Lock,
  Mail,
  User,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { LocalDataService, createClient } from '@/lib/supabase/client';
import { 
  signInWithSupabase, 
  signUpWithSupabase, 
  signOutUser, 
  sendPasswordResetEmail, 
  updateUserPassword 
} from '@/lib/supabase/auth';
import { Profile } from '@/types';
import { hasAcceptedCookies, acceptCookies } from '@/lib/cookies';
import { 
  signInWithFirebase, 
  signUpWithFirebase, 
  signInWithGoogleFirebase,
  sendPasswordResetFirebase, 
  updatePasswordFirebase, 
  confirmPasswordResetFirebase,
  verifyPasswordResetCodeFirebase,
  onFirebaseAuthStateChange 
} from '@/lib/firebase/auth';
import { isFirebaseConfigured } from '@/lib/firebase/config';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode') || searchParams.get('tab');
  const oobCodeParam = searchParams.get('oobCode');
  const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');
  const courseIdParam = searchParams.get('courseId') || searchParams.get('course');

  // Extract selected course if user came from a course card / enroll action
  let targetCourseId = courseIdParam;
  if (!targetCourseId && redirectUrl) {
    const match = redirectUrl.match(/[?&]courseId=([^&]+)/);
    if (match) {
      targetCourseId = decodeURIComponent(match[1]);
    }
  }
  const selectedCourse = targetCourseId ? LocalDataService.getCourseById(targetCourseId) : null;
  const isEnrolling = !!selectedCourse || !!courseIdParam || (redirectUrl?.includes('subscribe') ?? false);

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'forgot' | 'reset'>(
    oobCodeParam || modeParam === 'resetPassword' || modeParam === 'reset'
      ? 'reset'
      : modeParam === 'signup' || (isEnrolling && modeParam !== 'signin')
        ? 'signup' 
        : modeParam === 'forgot'
          ? 'forgot'
          : 'signin'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [requiresRecentLogin, setRequiresRecentLogin] = useState(false);
  const [verifiedResetEmail, setVerifiedResetEmail] = useState<string | null>(null);
  const [isSendingResetEmail, setIsSendingResetEmail] = useState(false);
  const [directResetLink, setDirectResetLink] = useState<string | null>(null);
  const [directOobCode, setDirectOobCode] = useState<string | null>(null);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedCookiesOnLogin, setAcceptedCookiesOnLogin] = useState(false);

  const loadCurrentUser = () => {
    setCurrentUser(LocalDataService.getCurrentUser());
  };

  useEffect(() => {
    loadCurrentUser();
    setAcceptedCookiesOnLogin(hasAcceptedCookies());

    const handleStorage = () => loadCurrentUser();
    window.addEventListener('storage', handleStorage);

    // If an action code is in the URL from a Firebase password reset email
    if (oobCodeParam) {
      setActiveTab('reset');
      verifyPasswordResetCodeFirebase(oobCodeParam).then((res) => {
        if (res.success && res.email) {
          setVerifiedResetEmail(res.email);
        } else if (res.error) {
          setErrorMessage(res.error);
        }
      });
    }

    // Detect recovery token from hash or query param
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('type=recovery') || modeParam === 'reset' || modeParam === 'resetPassword') {
        setActiveTab('reset');
      } else if (modeParam === 'signup' || (isEnrolling && modeParam !== 'signin')) {
        setActiveTab('signup');
      }
    }

    const supabase = createClient();
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setActiveTab('reset');
        }
      });
      return () => {
        subscription.unsubscribe();
        window.removeEventListener('storage', handleStorage);
      };
    }

    const unsubscribeFb = onFirebaseAuthStateChange((fbUser) => {
      if (fbUser) {
        loadCurrentUser();
      }
    });

    return () => {
      window.removeEventListener('storage', handleStorage);
      unsubscribeFb();
    };
  }, [modeParam, isEnrolling]);

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
    setToastMessage('Signed out successfully.');
  };

  // Sign in / Sign up submit
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      setIsSubmitting(false);
      return;
    }

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (activeTab === 'signup') {
        if (!fullName.trim()) {
          setErrorMessage('Please enter your full name.');
          setIsSubmitting(false);
          return;
        }

        if (!acceptedPrivacy || !acceptedTerms) {
          if (!acceptedPrivacy && !acceptedTerms) {
            setErrorMessage('Access not granted: You must accept both the Terms of Service and Privacy Policy before your account can be created.');
          } else if (!acceptedTerms) {
            setErrorMessage('Access not granted: You must accept the Terms of Service before your account can be created.');
          } else {
            setErrorMessage('Access not granted: You must accept the Privacy Policy before your account can be created.');
          }
          setIsSubmitting(false);
          return;
        }

        const res = await signUpWithFirebase(cleanEmail, password, fullName.trim(), acceptedPrivacy, acceptedTerms);
        if (!res.success) {
          setErrorMessage(res.error || 'Registration failed. Please try again.');
          setIsSubmitting(false);
          return;
        }

        setToastMessage(res.message || 'Account created successfully!');
        loadCurrentUser();

        setTimeout(() => {
          // If destination is specifically tutoring enrollment or checkout, proceed directly there
          if (redirectUrl && (redirectUrl.includes('/tutoring') || redirectUrl.includes('enroll') || redirectUrl.includes('subscribe'))) {
            router.push(redirectUrl);
          } else if (redirectUrl) {
            router.push(`/onboarding?redirect=${encodeURIComponent(redirectUrl)}`);
          } else {
            router.push('/onboarding');
          }
        }, 800);
      } else {
        if (!acceptedCookiesOnLogin) {
          setErrorMessage('Access not granted: You must accept session cookies to sign in to ReactJav.');
          setIsSubmitting(false);
          return;
        }

        acceptCookies(true);

        const res = await signInWithFirebase(cleanEmail, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Invalid credentials or user not found.');
          setIsSubmitting(false);
          return;
        }

        setToastMessage(res.message || 'Signed in successfully!');
        loadCurrentUser();

        // If existing user has not accepted the Privacy Policy, let the PrivacyPolicyPopup appear immediately
        if (res.user && res.user.privacy_accepted !== true) {
          setIsSubmitting(false);
          return;
        }

        setTimeout(() => {
          if (res.user?.role === 'instructor') {
            router.push(redirectUrl || '/instructor');
          } else if (res.user?.role === 'admin' || res.user?.role === 'super_admin') {
            router.push(redirectUrl || '/admin/access');
          } else {
            // If destination is specifically tutoring enrollment or checkout, proceed directly there
            if (redirectUrl && (redirectUrl.includes('/tutoring') || redirectUrl.includes('enroll') || redirectUrl.includes('subscribe'))) {
              router.push(redirectUrl);
            } else if (!res.user?.registration_completed) {
              if (redirectUrl) {
                router.push(`/onboarding?redirect=${encodeURIComponent(redirectUrl)}`);
              } else {
                router.push('/onboarding');
              }
            } else if (redirectUrl) {
              router.push(redirectUrl);
            } else {
              router.push('/courses');
            }
          }
        }, 800);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Forgot password submit
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      
      // 1. Dispatch reset email via Firebase Auth client
      const res = await sendPasswordResetFirebase(cleanEmail);

      // 2. Query server API to generate direct reset token if Admin credentials are present
      try {
        const directRes = await fetch('/api/auth/reset-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail }),
        });
        const directData = await directRes.json();
        if (directData?.success && directData?.link) {
          setDirectResetLink(directData.link);
          if (directData.oobCode) {
            setDirectOobCode(directData.oobCode);
          }
        }
      } catch (directErr) {
        console.warn('Direct reset link generation notice:', directErr);
      }

      if (!res.success) {
        setErrorMessage(res.error || 'Unable to send password reset email.');
        setIsSubmitting(false);
        return;
      }
      setResetSuccess(true);
      setToastMessage(res.message || 'Password reset link sent to your email!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Password reset failed';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set new password submit
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const effectiveCode = directOobCode || oobCodeParam;
      const res = await updatePasswordFirebase(newPassword, currentPassword || undefined, effectiveCode || undefined);
      if (res.success) {
        setToastMessage(res.message || 'Password updated successfully!');
        setResetSuccess(true);
        setRequiresRecentLogin(false);
        setTimeout(() => {
          setActiveTab('signin');
          setResetSuccess(false);
          setNewPassword('');
          setConfirmPassword('');
          setCurrentPassword('');
          setDirectOobCode(null);
          setDirectResetLink(null);
        }, 1800);
      } else {
        if (res.error === 'auth/requires-recent-login' || (res.error && res.error.includes('requires-recent-login'))) {
          setRequiresRecentLogin(true);
          setErrorMessage('Security Verification Required: For your protection, Firebase requires recent confirmation before updating your password. Please enter your current password below to confirm, or click the button below to send a secure reset link to your email.');
        } else {
          setErrorMessage(res.error || 'Failed to update password.');
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Password update failed';
      if (msg.includes('requires-recent-login')) {
        setRequiresRecentLogin(true);
        setErrorMessage('Security Verification Required: Please enter your current password below to confirm, or send a reset link to your email.');
      } else {
        setErrorMessage(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendEmailResetInstead = async () => {
    const targetEmail = (email || verifiedResetEmail || currentUser?.email || '').trim().toLowerCase();
    if (!targetEmail) {
      setActiveTab('forgot');
      setErrorMessage('Please enter your account email address to receive a secure password reset link.');
      return;
    }
    setIsSendingResetEmail(true);
    try {
      // Also request direct link
      try {
        const directRes = await fetch('/api/auth/reset-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: targetEmail }),
        });
        const directData = await directRes.json();
        if (directData?.success && directData?.link) {
          setDirectResetLink(directData.link);
          if (directData.oobCode) {
            setDirectOobCode(directData.oobCode);
          }
        }
      } catch {}

      const res = await sendPasswordResetFirebase(targetEmail);
      if (res.success) {
        setToastMessage(`Password reset link sent to ${targetEmail}! Check your inbox.`);
        setActiveTab('forgot');
        setResetSuccess(true);
      } else {
        setErrorMessage(res.error || 'Failed to send reset email.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to send reset email.');
    } finally {
      setIsSendingResetEmail(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    if (activeTab === 'signin' && !acceptedCookiesOnLogin) {
      setErrorMessage('Access not granted: You must accept session cookies to sign in to ReactJav.');
      setIsSubmitting(false);
      return;
    }

    if (activeTab === 'signup' && (!acceptedPrivacy || !acceptedTerms)) {
      setErrorMessage('Access not granted: You must accept both the Terms of Service and Privacy Policy before continuing with Google.');
      setIsSubmitting(false);
      return;
    }

    acceptCookies(true);

    try {
      const res = await signInWithGoogleFirebase(acceptedPrivacy || true, acceptedTerms || true);
      if (!res.success) {
        setErrorMessage(res.error || 'Google authentication failed.');
        setIsSubmitting(false);
        return;
      }

      setToastMessage('Signed in with Google successfully!');
      loadCurrentUser();

      if (res.user && res.user.privacy_accepted !== true) {
        setIsSubmitting(false);
        return;
      }

      setTimeout(() => {
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push('/courses');
        }
      }, 800);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Google sign-in error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: 'clamp(2.5rem, 5vw, 3.5rem) clamp(0.75rem, 3vw, 1.5rem) clamp(2.5rem, 4vw, 3.5rem)', maxWidth: '600px' }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 800 }}>
          Authentication & Access Control
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Sign in or create an account to access campus courses and resources.
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          background: isFirebaseConfigured() ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
          border: isFirebaseConfigured() ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
          color: isFirebaseConfigured() ? '#10b981' : '#fbbf24',
          fontSize: '0.72rem',
          fontWeight: 700,
          marginTop: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          <Sparkles size={12} />
          <span>{isFirebaseConfigured() ? 'Firebase Auth Active' : 'Firebase Auth Configured (Local Mode)'}</span>
        </div>
      </div>

      {/* Course Enrollment Notification Banner */}
      {isEnrolling && (
        <div style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-accent)',
          borderRadius: '1rem',
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          boxShadow: 'var(--shadow-md)',
        }}>
          {selectedCourse?.thumbnail_url ? (
            <img
              src={selectedCourse.thumbnail_url}
              alt={selectedCourse.title}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '0.65rem',
                objectFit: 'cover',
                flexShrink: 0,
                border: '1px solid var(--border-subtle)',
              }}
            />
          ) : (
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '0.75rem',
              background: 'rgba(99, 102, 241, 0.25)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--primary)',
            }}>
              <GraduationCap size={28} />
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--primary)',
              marginBottom: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}>
              <Sparkles size={13} />
              <span>{selectedCourse?.track || 'Course Selection Action'}</span>
            </div>
            <h3 style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '0 0 0.35rem',
              lineHeight: 1.3,
            }}>
              {selectedCourse ? `Create Account to Enroll: ${selectedCourse.title}` : 'Account Required for Course Enrollment'}
            </h3>
            <p style={{
              fontSize: '0.84rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.45,
            }}>
              {activeTab === 'signup'
                ? 'Please create your student account to register for this programme, proceed to tuition payment, and unlock your curriculum access.'
                : 'Already have an active account? Sign in below to continue with your course enrollment and tuition.'}
            </p>
          </div>
        </div>
      )}

      {/* If already logged in, show Current Session Card with Sign Out & Change Password option */}
      {currentUser && (
        <div style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-accent)',
          borderRadius: '1rem',
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img
              src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={currentUser.full_name || 'User'}
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {currentUser.full_name || 'Active User'}
                </span>
                <span className={`badge ${currentUser.role === 'super_admin' ? 'badge-purple' : currentUser.role === 'admin' ? 'badge-amber' : currentUser.role === 'instructor' ? 'badge-emerald' : 'badge-primary'}`} style={{ fontSize: '0.65rem' }}>
                  {currentUser.role.toUpperCase().replace('_', ' ')}
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {currentUser.email}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {redirectUrl ? (
              <Link href={redirectUrl} className="btn btn-primary btn-sm">
                <span>Continue to Page</span>
                <ArrowRight size={14} />
              </Link>
            ) : (
              <Link href={currentUser.role === 'instructor' ? '/instructor' : (currentUser.role === 'admin' || currentUser.role === 'super_admin') ? '/admin/access' : '/dashboard'} className="btn btn-primary btn-sm">
                <span>Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            )}

            <Link
              href="/profile"
              className="btn btn-secondary btn-sm"
              title="Edit Profile & Avatar"
              style={{ color: 'var(--text-primary)', gap: '0.4rem' }}
            >
              <User size={14} />
              <span>Edit Profile</span>
            </Link>

            <button
              onClick={() => { setActiveTab('reset'); setErrorMessage(null); setResetSuccess(false); }}
              className="btn btn-secondary btn-sm"
              title="Change Password"
              style={{ color: 'var(--text-primary)' }}
            >
              <KeyRound size={14} />
              <span>Change Password</span>
            </button>

            <button
              onClick={handleSignOut}
              className="btn btn-secondary btn-sm"
              title="Sign Out"
              style={{ color: '#ef4444' }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Tabs (Shown only for signin and signup) */}
      {(activeTab === 'signin' || activeTab === 'signup') && (
        <div style={{
          display: 'flex',
          background: 'var(--bg-surface-elevated)',
          borderRadius: '0.75rem',
          padding: '0.35rem',
          marginBottom: '2rem',
          border: '1px solid var(--border-subtle)',
        }}>
          <button
            onClick={() => { setActiveTab('signin'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: '0.5rem',
              background: activeTab === 'signin' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'signin' ? 'var(--text-primary)' : 'var(--text-muted)',
              border: activeTab === 'signin' ? '1px solid var(--border-subtle)' : 'none',
              boxShadow: activeTab === 'signin' ? 'var(--shadow-sm)' : 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Sign In
          </button>

          <button
            onClick={() => { setActiveTab('signup'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: '0.5rem',
              background: activeTab === 'signup' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'signup' ? 'var(--text-primary)' : 'var(--text-muted)',
              border: activeTab === 'signup' ? '1px solid var(--border-subtle)' : 'none',
              boxShadow: activeTab === 'signup' ? 'var(--shadow-sm)' : 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Error notification */}
      {errorMessage && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.85rem 1rem',
          borderRadius: '0.75rem',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          color: '#fca5a5',
          fontSize: '0.86rem',
          marginBottom: '1.5rem',
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* MAIN AUTH CONTAINER */}
      <div className="glass-card" style={{ padding: 'clamp(1.25rem, 3.5vw, 2.25rem)' }}>
        {/* ================= MODE 1: FORGOT PASSWORD ================= */}
        {activeTab === 'forgot' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.65rem',
                background: 'rgba(99, 102, 241, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}>
                <KeyRound size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 800, margin: 0 }}>
                  Reset Your Password
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                  Enter your registered email address to receive a secure recovery link.
                </p>
              </div>
            </div>

            {resetSuccess ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '1.25rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#10b981',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}>
                  <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Password Reset Initiated
                    </strong>
                    A password recovery email has been requested for <strong style={{ color: 'var(--text-primary)' }}>{email}</strong> via Firebase Authentication.
                  </div>
                </div>

                {/* Detailed Email Delivery Guidance */}
                <div style={{
                  padding: '1.1rem 1.25rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  fontSize: '0.82rem',
                  lineHeight: 1.55,
                  color: 'var(--text-secondary)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#d97706', marginBottom: '0.5rem' }}>
                    <AlertCircle size={16} />
                    <span>If the reset email does not appear in your inbox:</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li>
                      <strong style={{ color: 'var(--text-primary)' }}>Check your Spam or Junk folder:</strong> Firebase sends emails from <em>noreply@reactjav-6531c.firebaseapp.com</em>, which email providers (Gmail, Outlook) often categorize as Spam or Promotions.
                    </li>
                    <li>
                      <strong style={{ color: 'var(--text-primary)' }}>Verify the exact email:</strong> Due to Firebase Security (Email Enumeration Protection), if an email is not yet registered in Firebase Authentication, Firebase returns success but silently does not dispatch an email.
                    </li>
                  </ul>
                </div>

                {/* Instant Direct Reset Bypass Button (when available) */}
                {directOobCode ? (
                  <div style={{
                    padding: '1.15rem',
                    borderRadius: '0.75rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>⚡ Instant Reset Available:</strong><br />
                      No need to wait for email delivery. You can reset your password immediately below:
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setVerifiedResetEmail(email);
                        setActiveTab('reset');
                      }}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                        padding: '0.75rem 1rem',
                      }}
                    >
                      <KeyRound size={16} />
                      <span>Reset Password Directly Now</span>
                    </button>
                    {directResetLink && (
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(directResetLink);
                          setIsCopiedLink(true);
                          setTimeout(() => setIsCopiedLink(false), 2000);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          textAlign: 'center',
                          padding: '0.2rem',
                          fontWeight: 700,
                        }}
                      >
                        {isCopiedLink ? '✓ Direct Link Copied to Clipboard!' : 'Copy Direct Reset Link'}
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setResetSuccess(false)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
                    >
                      <RefreshCw size={14} />
                      <span>Try Another Email</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveTab('signup'); setResetSuccess(false); }}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
                    >
                      <User size={14} />
                      <span>Create New Account</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                    Account Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      <span>Sending Reset Link...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      <span>Send Password Reset Link</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '1.5rem', paddingTop: '1rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setErrorMessage(null); setResetSuccess(false); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 600,
                }}
              >
                <ArrowLeft size={14} />
                <span>Back to Sign In</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= MODE 2: SET NEW PASSWORD ================= */}
        {activeTab === 'reset' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.65rem',
                background: 'rgba(168, 85, 247, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-purple)',
              }}>
                <Lock size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 800, margin: 0 }}>
                  Set New Password
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                  Create and confirm your new secure password below.
                </p>
              </div>
            </div>

            {resetSuccess ? (
              <div style={{
                padding: '1.25rem',
                borderRadius: '0.75rem',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#10b981',
                fontSize: '0.88rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <CheckCircle2 size={20} />
                <span>Password updated successfully! Redirecting...</span>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {verifiedResetEmail && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.65rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <Mail size={15} color="var(--primary)" />
                    <span>Resetting password for: <strong style={{ color: 'var(--text-primary)' }}>{verifiedResetEmail}</strong></span>
                  </div>
                )}

                {/* Current password for re-authentication when required */}
                {(requiresRecentLogin || (!(directOobCode || oobCodeParam) && !!currentUser)) && (
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                      Current Password {requiresRecentLogin && <span style={{ color: '#d97706', fontWeight: 700 }}>* (Required to verify identity)</span>}
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="form-input"
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                  </div>
                )}

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                    New Password (min. 6 characters)
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Save New Password</span>
                    </>
                  )}
                </button>

                {/* Fallback option if user doesn't remember current password */}
                {requiresRecentLogin && (
                  <div style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    fontSize: '0.82rem',
                    marginTop: '0.25rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#d97706', marginBottom: '0.35rem' }}>
                      <AlertCircle size={15} />
                      <span>Don't know your current password?</span>
                    </div>
                    <p style={{ margin: '0 0 0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      No problem. We can send a secure, 1-click password reset link directly to your registered email inbox so you don't need your old password.
                    </p>
                    <button
                      type="button"
                      onClick={handleSendEmailResetInstead}
                      disabled={isSendingResetEmail}
                      className="btn btn-secondary btn-sm"
                      style={{ gap: '0.4rem', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)', width: '100%', justifyContent: 'center' }}
                    >
                      <Mail size={14} />
                      <span>{isSendingResetEmail ? 'Sending Reset Link...' : 'Send Password Reset Email Link Instead'}</span>
                    </button>
                  </div>
                )}
              </form>
            )}

            <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '1.5rem', paddingTop: '1rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setErrorMessage(null); setResetSuccess(false); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 600,
                }}
              >
                <ArrowLeft size={14} />
                <span>Back to Sign In</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= MODE 3: SIGN IN / SIGN UP ================= */}
        {(activeTab === 'signin' || activeTab === 'signup') && (
          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Google Authentication Button via Firebase */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="btn btn-secondary"
              style={{
                width: '100%',
                justifyContent: 'center',
                gap: '0.65rem',
                padding: '0.75rem 1rem',
                fontSize: '0.925rem',
                fontWeight: 600,
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{activeTab === 'signup' ? 'Sign up with Google' : 'Continue with Google'}</span>
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              margin: '0.1rem 0',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Or with email
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            {activeTab === 'signup' && (
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Password
                </label>
                {activeTab === 'signin' && (
                  <button
                    type="button"
                    onClick={() => { setActiveTab('forgot'); setErrorMessage(null); setResetSuccess(false); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: 700,
                    }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {activeTab === 'signin' && (
              <div style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.75rem',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
              }}>
                <input
                  type="checkbox"
                  id="cookieConsentSigninCheckbox"
                  checked={acceptedCookiesOnLogin}
                  onChange={(e) => setAcceptedCookiesOnLogin(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--primary)',
                    marginTop: '2px',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                  required
                />
                <label
                  htmlFor="cookieConsentSigninCheckbox"
                  style={{
                    fontSize: '0.825rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.5,
                    cursor: 'pointer',
                    userSelect: 'none',
                    fontWeight: 500,
                  }}
                >
                  I accept the use of session & functional cookies to authenticate my login session and remember my course progress. (
                  <Link
                    href="/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--primary)',
                      fontWeight: 700,
                      textDecoration: 'underline',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Cookie Policy
                  </Link>
                  )
                </label>
              </div>
            )}

            {activeTab === 'signup' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}>
                  <input
                    type="checkbox"
                    id="termsOfServiceCheckbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: 'var(--primary)',
                      marginTop: '2px',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    required
                  />
                  <label
                    htmlFor="termsOfServiceCheckbox"
                    style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                      cursor: 'pointer',
                      userSelect: 'none',
                      fontWeight: 500,
                    }}
                  >
                    I have read and agree to the{' '}
                    <Link
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--primary)',
                        fontWeight: 700,
                        textDecoration: 'underline',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      ReactJav Terms of Service
                    </Link>
                    . I understand that academic honor code, tuition policies, and intranet conduct rules apply.
                  </label>
                </div>

                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}>
                  <input
                    type="checkbox"
                    id="privacyPolicyCheckbox"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: 'var(--primary)',
                      marginTop: '2px',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    required
                  />
                  <label
                    htmlFor="privacyPolicyCheckbox"
                    style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                      cursor: 'pointer',
                      userSelect: 'none',
                      fontWeight: 500,
                    }}
                  >
                    I have read and accept the{' '}
                    <Link
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--primary)',
                        fontWeight: 700,
                        textDecoration: 'underline',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      ReactJav Privacy Policy
                    </Link>
                    . I understand that access to courses, proctored examinations, and the student intranet is not granted without accepting these terms.
                  </label>
                </div>
              </div>
            )}


            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>
                    {isEnrolling
                      ? activeTab === 'signup'
                        ? 'Create Account & Continue to Enrollment'
                        : 'Sign In & Continue to Enrollment'
                      : activeTab === 'signin'
                        ? 'Sign In to ReactJav'
                        : 'Create Account'}
                  </span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Notification Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(99, 102, 241, 0.95)',
          backdropFilter: 'blur(10px)',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '0.875rem',
          fontWeight: 600,
          zIndex: 600,
          animation: 'fadeIn 0.2s ease',
        }}>
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <RefreshCw className="animate-spin" size={24} style={{ margin: '0 auto', color: 'var(--primary)' }} />
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
