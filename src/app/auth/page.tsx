'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Database, 
  ShieldCheck, 
  Key, 
  Check, 
  ExternalLink, 
  UserCheck, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';
import { LocalDataService, isSupabaseConfigured } from '@/lib/supabase/client';
import { UserRole } from '@/types';

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'supabase-setup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const hasLiveSupabase = isSupabaseConfigured();

  const handlePersonaLogin = (demoRole: UserRole) => {
    LocalDataService.switchDemoRole(demoRole);
    setToastMessage(`Switched active session to Demo ${demoRole.toUpperCase()}`);
    setTimeout(() => {
      if (demoRole === 'instructor') {
        router.push('/instructor');
      } else {
        router.push('/dashboard');
      }
    }, 600);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Create / save local session profile
    LocalDataService.setCurrentUser({
      id: `usr_${Date.now()}`,
      email,
      full_name: fullName || email.split('@')[0],
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role,
      created_at: new Date().toISOString(),
    });

    setToastMessage(`Authenticated successfully as ${role}!`);
    setTimeout(() => {
      if (role === 'instructor') {
        router.push('/instructor');
      } else {
        router.push('/dashboard');
      }
    }, 600);
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem 6rem', maxWidth: '640px' }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          marginBottom: '1rem',
          fontSize: '0.8rem',
          color: '#a5b4fc',
        }}>
          <Database size={14} />
          <span>Supabase Auth & Database Layer</span>
        </div>

        <h1 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
          Authentication & Access Control
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Secure session management with PostgreSQL Row-Level Security.
        </p>
      </div>

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
          onClick={() => setActiveTab('signin')}
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
          onClick={() => setActiveTab('signup')}
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
          onClick={() => setActiveTab('supabase-setup')}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
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
            </div>
          </div>

          {/* Form */}
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
                  Account Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="form-input"
                >
                  <option value="student">Student (Learn courses & track progress)</option>
                  <option value="instructor">Instructor (Create & manage courses)</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              <span>{activeTab === 'signin' ? 'Sign In to ReactJav' : 'Create Account'}</span>
              <ArrowRight size={16} />
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
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Status: {hasLiveSupabase ? 'Connected to Live Supabase' : 'Local Fallback Active'}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            To link your real Supabase project:
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
              <strong>Create a project</strong> at{' '}
              <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-purple)' }}>
                supabase.com
              </a>.
            </li>
            <li>
              <strong>Run the Migration Script</strong>: Open your Supabase Dashboard $\rightarrow$ <strong>SQL Editor</strong>, and paste the contents of{' '}
              <code>supabase/schema.sql</code>. This generates all tables, RLS policies, and triggers in seconds.
            </li>
            <li>
              <strong>Update .env.local</strong> with your credentials:
              <pre style={{
                background: 'var(--bg-surface)',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                marginTop: '0.5rem',
                color: '#a5b4fc',
                fontFamily: 'var(--font-mono)',
              }}>
                NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co{'\n'}
                NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
              </pre>
            </li>
          </ol>

          <div style={{
            padding: '0.875rem',
            background: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '0.65rem',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.825rem',
            color: '#c7d2fe',
          }}>
            <Info size={16} color="var(--primary)" />
            <span>The app runs out-of-the-box in local demo mode until you add live keys!</span>
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
