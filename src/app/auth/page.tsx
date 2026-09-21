'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Database, 
  ShieldCheck, 
  Key, 
  Check, 
  ExternalLink, 
  UserCheck, 
  Sparkles, 
  ArrowRight,
  Info,
  LogOut,
  AlertCircle,
  RefreshCw,
  Lock,
  Mail,
  User,
  ShieldAlert
} from 'lucide-react';
import { LocalDataService, isSupabaseConfigured } from '@/lib/supabase/client';
import { signInWithSupabase, signUpWithSupabase, signOutUser } from '@/lib/supabase/auth';
import { UserRole, Profile } from '@/types';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'supabase-setup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  const hasLiveSupabase = isSupabaseConfigured();

  const loadCurrentUser = () => {
    setCurrentUser(LocalDataService.getCurrentUser());
  };

  useEffect(() => {
    loadCurrentUser();

    const handleStorage = () => loadCurrentUser();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handlePersonaLogin = (demoRole: UserRole) => {
    LocalDataService.switchDemoRole(demoRole);
    setToastMessage(`Switched active session to Demo ${demoRole.toUpperCase()}`);
    setTimeout(() => {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (demoRole === 'instructor') {
        router.push('/instructor');
      } else if (demoRole === 'admin') {
        router.push('/admin/access');
      } else {
        router.push('/dashboard');
      }
    }, 500);
  };

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
    setToastMessage('Signed out successfully.');
  };

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
      if (activeTab === 'signup') {
        if (!fullName.trim()) {
          setErrorMessage('Please enter your full name.');
          setIsSubmitting(false);
          return;
        }

        const res = await signUpWithSupabase(email.trim(), password, fullName.trim(), role);
        if (!res.success) {
          setErrorMessage(res.error || 'Registration failed. Please try again.');
          setIsSubmitting(false);
          return;
        }

        setToastMessage(res.message || 'Account created successfully!');
        loadCurrentUser();

        setTimeout(() => {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else if (role === 'instructor') {
            router.push('/instructor');
          } else {
            router.push('/dashboard');
          }
        }, 800);
      } else {
        const res = await signInWithSupabase(email.trim(), password);
        if (!res.success) {
          setErrorMessage(res.error || 'Invalid credentials or user not found.');
          setIsSubmitting(false);
          return;
        }

        setToastMessage(res.message || 'Signed in successfully!');
        loadCurrentUser();

        setTimeout(() => {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else if (res.user?.role === 'instructor') {
            router.push('/instructor');
          } else if (res.user?.role === 'admin') {
            router.push('/admin/access');
          } else {
            router.push('/dashboard');
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

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem', maxWidth: '640px' }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          background: hasLiveSupabase ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          border: hasLiveSupabase ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(99, 102, 241, 0.3)',
          marginBottom: '1rem',
          fontSize: '0.8rem',
          color: hasLiveSupabase ? 'var(--accent-emerald)' : '#a5b4fc',
        }}>
          <Database size={14} />
          <span>{hasLiveSupabase ? 'Live Supabase Auth & RLS Connected' : 'Demo Local Auth Mode'}</span>
        </div>

        <h1 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
          Authentication & Access Control
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Role-Based Access Control (RBAC) with PostgreSQL security policies.
        </p>
      </div>

      {/* If already logged in, show Current Session Card with Sign Out option */}
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
                <span className={`badge ${currentUser.role === 'admin' ? 'badge-amber' : currentUser.role === 'instructor' ? 'badge-emerald' : 'badge-primary'}`} style={{ fontSize: '0.65rem' }}>
                  {currentUser.role.toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {currentUser.email}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {redirectUrl ? (
              <Link href={redirectUrl} className="btn btn-primary btn-sm">
                <span>Continue to Requested Page</span>
                <ArrowRight size={14} />
              </Link>
            ) : (
              <Link href={currentUser.role === 'instructor' ? '/instructor' : currentUser.role === 'admin' ? '/admin/access' : '/dashboard'} className="btn btn-primary btn-sm">
                <span>Open Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="btn btn-secondary btn-sm"
              title="Sign Out"
              style={{ color: '#f87171' }}
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
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
            padding: '0.6rem',
            borderRadius: '0.5rem',
            background: activeTab === 'signin' ? 'var(--bg-surface-elevated)' : 'transparent',
            color: activeTab === 'signin' ? '#ffffff' : 'var(--text-muted)',
            border: activeTab === 'signin' ? '1px solid var(--border-subtle)' : 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>

        <button
          onClick={() => { setActiveTab('signup'); setErrorMessage(null); }}
          style={{
            flex: 1,
            padding: '0.6rem',
            borderRadius: '0.5rem',
            background: activeTab === 'signup' ? 'var(--bg-surface-elevated)' : 'transparent',
            color: activeTab === 'signup' ? '#ffffff' : 'var(--text-muted)',
            border: activeTab === 'signup' ? '1px solid var(--border-subtle)' : 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>

        <button
          onClick={() => { setActiveTab('supabase-setup'); setErrorMessage(null); }}
          style={{
            flex: 1,
            padding: '0.6rem',
            borderRadius: '0.5rem',
            background: activeTab === 'supabase-setup' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
            color: activeTab === 'supabase-setup' ? '#a5b4fc' : 'var(--text-muted)',
            border: activeTab === 'supabase-setup' ? '1px solid var(--border-accent)' : 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Supabase Guide
        </button>
      </div>

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

      {/* Auth Card */}
      {activeTab !== 'supabase-setup' ? (
        <div className="glass-card">
          {/* Quick Demo Personas Banner */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1.75rem',
          }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem', fontWeight: 700 }}>
              Quick One-Click Demo Personas:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handlePersonaLogin('student')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start' }}
              >
                <UserCheck size={15} color="var(--primary)" />
                <span>Alex (Student)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePersonaLogin('instructor')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start' }}
              >
                <Sparkles size={15} color="var(--accent-emerald)" />
                <span>Dr. Elena (Instructor)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePersonaLogin('admin')}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start' }}
              >
                <ShieldCheck size={15} color="var(--accent-amber)" />
                <span>Admin Dean</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeTab === 'signup' && (
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
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
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Password
              </label>
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
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Account Role & Clearance Level
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="form-input"
                >
                  <option value="student">Student (Learn courses, CBT exams & progress)</option>
                  <option value="instructor">Instructor (Build courses & host virtual rooms)</option>
                  <option value="admin">Administrator (Tuition verification & admissions)</option>
                </select>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ marginTop: '0.5rem', width: '100%' }}
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
        </div>
      ) : (
        /* Supabase Setup Guidance */
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.5rem',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Database size={20} color="var(--accent-emerald)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>Supabase Configuration Guide</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>
                Status: Connected to Project <code>jfhmqodrjnsabpyxbgnn</code>
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Supabase credentials have been configured in <code>.env.local</code>. Authentication is active across all levels:
          </p>

          <ol style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
            paddingLeft: '1.25rem',
            marginBottom: '1.5rem',
          }}>
            <li>
              <strong>Database Tables & RLS Policies</strong>: If you haven't executed the database schema yet in the Supabase SQL editor, copy <code>supabase/schema.sql</code> to create all tables (<code>profiles</code>, <code>courses</code>, <code>cbt_exams</code>, etc.) and Row Level Security policies.
            </li>
            <li>
              <strong>Instant Authentication</strong>: Users signing up or signing in will create authenticated sessions with PostgreSQL Row Level Security automatically enforced.
            </li>
            <li>
              <strong>Local Fallback Mode</strong>: If offline or testing specific scenarios, the demo personas (Student, Instructor, Admin) remain instantly accessible.
            </li>
          </ol>

          <div style={{
            padding: '0.875rem',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '0.65rem',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.825rem',
            color: '#a7f3d0',
          }}>
            <ShieldCheck size={16} color="var(--accent-emerald)" />
            <span>Role-Based Access Control (RBAC) and Intranet Clearance active!</span>
          </div>
        </div>
      )}

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
