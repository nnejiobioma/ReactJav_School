'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Key, 
  Check, 
  ArrowRight,
  Info,
  LogOut,
  AlertCircle,
  RefreshCw,
  Lock,
  Mail,
  User,
  KeyRound,
  ArrowLeft,
  CheckCircle2
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

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode') || searchParams.get('tab');
  const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'forgot' | 'reset'>(
    modeParam === 'signup' 
      ? 'signup' 
      : modeParam === 'reset' 
        ? 'reset' 
        : modeParam === 'forgot'
          ? 'forgot'
          : 'signin'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  const loadCurrentUser = () => {
    setCurrentUser(LocalDataService.getCurrentUser());
  };

  useEffect(() => {
    loadCurrentUser();

    const handleStorage = () => loadCurrentUser();
    window.addEventListener('storage', handleStorage);

    // Detect recovery token from hash or query param
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('type=recovery') || modeParam === 'reset') {
        setActiveTab('reset');
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

    return () => window.removeEventListener('storage', handleStorage);
  }, [modeParam]);

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

        const res = await signUpWithSupabase(cleanEmail, password, fullName.trim());
        if (!res.success) {
          setErrorMessage(res.error || 'Registration failed. Please try again.');
          setIsSubmitting(false);
          return;
        }

        setToastMessage(res.message || 'Account created successfully!');
        loadCurrentUser();

        setTimeout(() => {
          // New student signups always proceed to complete the student registration form
          router.push('/onboarding');
        }, 800);
      } else {
        const res = await signInWithSupabase(cleanEmail, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Invalid credentials or user not found.');
          setIsSubmitting(false);
          return;
        }

        setToastMessage(res.message || 'Signed in successfully!');
        loadCurrentUser();

        setTimeout(() => {
          if (res.user?.role === 'instructor') {
            router.push(redirectUrl || '/instructor');
          } else if (res.user?.role === 'admin' || res.user?.role === 'super_admin') {
            router.push(redirectUrl || '/admin/access');
          } else {
            // Student: Check if registration form details have been filled
            if (!res.user?.registration_completed) {
              router.push('/onboarding');
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
      const res = await sendPasswordResetEmail(cleanEmail);
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
      const res = await updateUserPassword(newPassword);
      if (res.success) {
        setToastMessage('Password updated successfully!');
        setResetSuccess(true);
        setTimeout(() => {
          setActiveTab('signin');
          setResetSuccess(false);
          setNewPassword('');
          setConfirmPassword('');
        }, 1500);
      } else {
        setErrorMessage(res.error || 'Failed to update password.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Password update failed';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem', maxWidth: '600px' }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 800 }}>
          Authentication & Access Control
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Sign in or create an account to access campus courses and resources.
        </p>
      </div>

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
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
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

            <button
              onClick={() => { setActiveTab('reset'); setErrorMessage(null); setResetSuccess(false); }}
              className="btn btn-secondary btn-sm"
              title="Change Password"
              style={{ color: '#d8b4fe' }}
            >
              <KeyRound size={14} />
              <span>Change Password</span>
            </button>

            <button
              onClick={handleSignOut}
              className="btn btn-secondary btn-sm"
              title="Sign Out"
              style={{ color: '#f87171' }}
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
          background: 'var(--bg-surface)',
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
              background: activeTab === 'signin' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeTab === 'signin' ? '#ffffff' : 'var(--text-muted)',
              border: activeTab === 'signin' ? '1px solid var(--border-subtle)' : 'none',
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
              background: activeTab === 'signup' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeTab === 'signup' ? '#ffffff' : 'var(--text-muted)',
              border: activeTab === 'signup' ? '1px solid var(--border-subtle)' : 'none',
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
      <div className="glass-card">
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
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 700, margin: 0 }}>
                  Reset Your Password
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                  Enter your registered email address to receive a secure recovery link.
                </p>
              </div>
            </div>

            {resetSuccess ? (
              <div style={{
                padding: '1.25rem',
                borderRadius: '0.75rem',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#34d399',
                fontSize: '0.88rem',
                lineHeight: 1.5,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
              }}>
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#ffffff', marginBottom: '0.25rem' }}>
                    Password Reset Link Sent!
                  </strong>
                  Check your inbox at <strong>{email}</strong> for instructions to reset your password. Once you receive the link, click it to set a new password.
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
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
                  color: 'var(--text-muted)',
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
                color: '#c084fc',
              }}>
                <Lock size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 700, margin: 0 }}>
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
                color: '#34d399',
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
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
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
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
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
              </form>
            )}

            <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '1.5rem', paddingTop: '1rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setErrorMessage(null); setResetSuccess(false); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
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
            {activeTab === 'signup' && (
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
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
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
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
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: 600,
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

            {activeTab === 'signup' && (
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '0.65rem',
                padding: '0.75rem 0.9rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                lineHeight: 1.45,
              }}>
                <Info size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  All new accounts register as standard <strong>Students</strong>. Administrative, Faculty, or Super User clearance is strictly controlled and assigned by the <strong>Super Administrator</strong>.
                </span>
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
                  <span>{activeTab === 'signin' ? 'Sign In to ReactJav' : 'Create Account'}</span>
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
