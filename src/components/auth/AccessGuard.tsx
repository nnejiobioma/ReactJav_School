'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  KeyRound, 
  ExternalLink,
  ChevronRight,
  Shield,
  GraduationCap
} from 'lucide-react';
import { Profile, UserRole } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

export type AccessLevel = 'authenticated' | 'intranet' | 'instructor' | 'admin' | 'super_admin';

interface AccessGuardProps {
  children: React.ReactNode;
  level?: AccessLevel;
  pageTitle?: string;
  customDescription?: string;
}

export default function AccessGuard({
  children,
  level = 'authenticated',
  pageTitle = 'Protected Resource',
  customDescription,
}: AccessGuardProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const evaluateState = () => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    evaluateState();

    const handleStorage = () => {
      evaluateState();
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.85rem 1.75rem',
          background: 'var(--bg-surface)',
          borderRadius: '9999px',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
        }}>
          <RefreshCw className="animate-spin" size={16} />
          <span>Validating Access Permissions & Clearance...</span>
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 1: CHECK AUTHENTICATION
  // ==========================================
  const isAuthenticated = !!currentUser && currentUser.id !== 'guest';

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem 6rem', maxWidth: '680px' }}>
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
          <div style={{
            width: '4.5rem',
            height: '4.5rem',
            borderRadius: '1.25rem',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}>
            <Lock size={36} color="var(--primary)" />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.8rem',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#a5b4fc',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <KeyRound size={13} />
            <span>Authentication Required</span>
          </div>

          <h1 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.75rem' }}>
            Sign In to Access {pageTitle}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 2rem' }}>
            {customDescription || `Access to this academic space is restricted to registered ReactJav scholars and faculty. Please sign in or register to proceed.`}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link href="/auth" className="btn btn-primary">
              <span>Sign In to Your Account</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/courses" className="btn btn-secondary">
              <span>Browse Catalog</span>
            </Link>
          </div>

          {/* Quick Demo Personas */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
            padding: '1.25rem',
            textAlign: 'left',
          }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', fontWeight: 700 }}>
              Or Instant One-Click Login via Demo Personas:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => {
                  LocalDataService.switchDemoRole('student');
                  evaluateState();
                }}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start' }}
              >
                <UserCheck size={16} color="var(--primary)" />
                <span>Alex (Student)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  LocalDataService.switchDemoRole('instructor');
                  evaluateState();
                }}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start' }}
              >
                <Sparkles size={16} color="var(--accent-emerald)" />
                <span>Dr. Elena (Instructor)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  LocalDataService.switchDemoRole('admin');
                  evaluateState();
                }}
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'flex-start' }}
              >
                <ShieldCheck size={16} color="var(--accent-amber)" />
                <span>Admin Dean</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 2: INSTRUCTOR FACULTY LEVEL
  // ==========================================
  if (level === 'instructor') {
    const hasInstructorAccess = currentUser.role === 'instructor' || currentUser.role === 'admin' || currentUser.role === 'super_admin';

    if (!hasInstructorAccess) {
      return (
        <div className="container" style={{ padding: '4rem 1.5rem 6rem', maxWidth: '680px' }}>
          <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '1.25rem',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
            }}>
              <ShieldAlert size={36} color="#ef4444" />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#f87171',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              <Lock size={13} />
              <span>Instructor Clearance Required</span>
            </div>

            <h1 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.75rem' }}>
              Faculty Privileges Required
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              Your account (<strong>{currentUser.email}</strong>) currently holds the <strong>Student</strong> role.
              The Instructor Studio and Curriculum Builder are strictly reserved for verified faculty leads and administrators.
            </p>

            <div style={{
              padding: '1rem',
              borderRadius: '0.85rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '2rem',
              textAlign: 'left',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontWeight: 600, marginBottom: '0.3rem' }}>
                <GraduationCap size={16} color="var(--primary)" />
                <span>Want to publish courses on ReactJav?</span>
              </div>
              <span>Instructors can design interactive curricula, create CBT quizzes, host live pairing rooms, and track cohort completion metrics.</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link href="/dashboard" className="btn btn-primary">
                <span>Return to Student Dashboard</span>
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={() => {
                  LocalDataService.switchDemoRole('instructor');
                  evaluateState();
                }}
                className="btn btn-secondary"
              >
                <Sparkles size={16} color="var(--accent-emerald)" />
                <span>Switch to Instructor Persona (Demo)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // ==========================================
  // LEVEL 3: ADMINISTRATOR LEVEL
  // ==========================================
  if (level === 'admin') {
    const hasAdminAccess = currentUser.role === 'admin' || currentUser.role === 'super_admin';

    if (!hasAdminAccess) {
      return (
        <div className="container" style={{ padding: '4rem 1.5rem 6rem', maxWidth: '680px' }}>
          <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '1.25rem',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
            }}>
              <ShieldAlert size={36} color="var(--accent-amber)" />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#fbbf24',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              <Shield size={13} />
              <span>Administrative Clearance Level 4</span>
            </div>

            <h1 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.75rem' }}>
              Registrar Clearance Desk Restricted
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              You are currently authenticated as <strong>{currentUser.full_name || currentUser.email}</strong> ({currentUser.role}).
              The Registrar Clearance Desk manages tuition audits, access grants, and system policies, requiring Administrative clearance.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link href="/dashboard" className="btn btn-primary">
                <span>Return to Dashboard</span>
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={() => {
                  LocalDataService.switchDemoRole('admin');
                  evaluateState();
                }}
                className="btn btn-secondary"
              >
                <ShieldCheck size={16} color="var(--accent-amber)" />
                <span>Switch to Admin Persona (Demo)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // ==========================================
  // LEVEL 3.5: SUPER ADMINISTRATOR LEVEL
  // ==========================================
  if (level === 'super_admin') {
    const hasSuperAdminAccess = currentUser.role === 'super_admin';

    if (!hasSuperAdminAccess) {
      return (
        <div className="container" style={{ padding: '4rem 1.5rem 6rem', maxWidth: '680px' }}>
          <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '1.25rem',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
            }}>
              <ShieldAlert size={36} color="#c084fc" />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              background: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#d8b4fe',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              <Sparkles size={13} />
              <span>Super Administrator Clearance Level 5</span>
            </div>

            <h1 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.75rem' }}>
              Root Executive Console Restricted
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              You are currently authenticated as <strong>{currentUser.full_name || currentUser.email}</strong> ({currentUser.role}).
              Platform Governance, Staff Role Promotions, and System Overrides strictly require <strong>Super Administrator</strong> authority.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Link href="/dashboard" className="btn btn-primary">
                <span>Return to Dashboard</span>
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={() => {
                  LocalDataService.switchDemoRole('super_admin');
                  evaluateState();
                }}
                className="btn btn-secondary"
                style={{ borderColor: 'rgba(168, 85, 247, 0.4)', color: '#d8b4fe' }}
              >
                <Sparkles size={16} color="#c084fc" />
                <span>Switch to Super Admin Persona (Demo)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // ==========================================
  // LEVEL 4: INTRANET & FELLOWSHIP CLEARANCE
  // ==========================================
  if (level === 'intranet') {
    const clearance = LocalDataService.checkIntranetAccess(currentUser);

    if (!clearance.hasAccess) {
      return (
        <div className="container" style={{ padding: '4rem 1.5rem 6rem', maxWidth: '720px' }}>
          <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '1.25rem',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
            }}>
              <Lock size={36} color="var(--primary)" />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              background: clearance.status === 'pending_approval' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(99, 102, 241, 0.1)',
              border: clearance.status === 'pending_approval' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(99, 102, 241, 0.25)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: clearance.status === 'pending_approval' ? '#fbbf24' : '#a5b4fc',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              <ShieldCheck size={13} />
              <span>{clearance.status === 'pending_approval' ? 'Clearance Pending Approval' : 'Intranet Fellowship Required'}</span>
            </div>

            <h1 style={{ fontSize: '1.85rem', color: '#ffffff', marginBottom: '0.75rem' }}>
              Campus Intranet Clearance Required
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 2rem' }}>
              {clearance.reason || 'This portal is restricted to active tuition subscribers and Direct Tutoring Fellows.'}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link href="/subscribe" className="btn btn-primary">
                <span>View Tuition & Clearance Plans</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/academy" className="btn btn-secondary">
                <GraduationCap size={16} color="var(--accent-emerald)" />
                <span>Explore Direct Tutoring</span>
              </Link>
            </div>

            {/* Quick Demo Bypass for testing */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1rem',
              padding: '1.25rem',
              textAlign: 'left',
            }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', fontWeight: 700 }}>
                Demo Verification Bypasses:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    LocalDataService.grantIntranetAccess(currentUser.id, 'usr_admin_001');
                    evaluateState();
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start' }}
                >
                  <ShieldCheck size={15} color="var(--accent-emerald)" />
                  <span>Grant Instant Student Clearance</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    LocalDataService.switchDemoRole('admin');
                    evaluateState();
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ justifyContent: 'flex-start' }}
                >
                  <Shield size={15} color="var(--accent-amber)" />
                  <span>Switch to Admin Persona</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // All checks passed!
  return <>{children}</>;
}
