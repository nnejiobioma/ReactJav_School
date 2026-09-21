'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  BookOpen, 
  Timer, 
  Video, 
  GraduationCap,
  RefreshCw
} from 'lucide-react';
import { Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

interface IntranetGuardProps {
  children: React.ReactNode;
  requiredFeatureTitle?: string;
}

export default function IntranetGuard({ children, requiredFeatureTitle }: IntranetGuardProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [accessState, setAccessState] = useState<{
    hasAccess: boolean;
    status: string;
    reason: string;
  }>({ hasAccess: false, status: 'none', reason: 'Loading clearance credentials...' });
  const [isLoading, setIsLoading] = useState(true);

  const checkAccess = () => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
    const result = LocalDataService.checkIntranetAccess(user);
    setAccessState(result);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAccess();

    const handleStorageChange = () => {
      checkAccess();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 2rem',
          background: 'var(--bg-surface)',
          borderRadius: '9999px',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)'
        }}>
          <RefreshCw className="animate-spin" size={18} />
          <span>Validating Campus Intranet Clearance Credentials...</span>
        </div>
      </div>
    );
  }

  // ==========================================
  // CASE 1: Active Access Granted (Admin, Faculty, or Cleared Student)
  // ==========================================
  if (accessState.hasAccess) {
    const isStudent = currentUser?.role === 'student';
    return (
      <>
        {/* Intranet Verified Campus Header Bar */}
        <div style={{
          background: isStudent ? 'rgba(16, 185, 129, 0.08)' : 'rgba(99, 102, 241, 0.08)',
          borderBottom: isStudent ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(99, 102, 241, 0.25)',
          padding: '0.45rem 1rem',
          fontSize: '0.78rem',
          backdropFilter: 'blur(10px)',
        }}>
          <div className="container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: isStudent ? '#34d399' : '#a5b4fc',
                fontWeight: 600,
              }}>
                <ShieldCheck size={15} />
                <span>ReactJav Campus Intranet</span>
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {currentUser?.tutoring_enrolled
                  ? `Direct Tutoring Fellow (${currentUser.tutoring_track_name || 'Active Track'}) • Studies & Intranet Tracked`
                  : isStudent 
                  ? 'Verified Student Fellowship Clearance' 
                  : 'Faculty & Administrative Access Mode'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {isStudent && currentUser?.payment_reference && (
                <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                  REF: {currentUser.payment_reference}
                </span>
              )}
              <Link 
                href="/" 
                style={{ 
                  color: 'var(--text-muted)', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <span>Switch to Public Catalog</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {children}
      </>
    );
  }

  // ==========================================
  // CASE 2: Payment Submitted • Pending Admin Clearance
  // ==========================================
  if (accessState.status === 'pending_approval') {
    return (
      <div className="container" style={{ padding: '4rem 1rem 6rem' }}>
        <div className="glass-card" style={{
          maxWidth: '740px',
          margin: '0 auto',
          padding: '3rem 2.5rem',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          background: 'var(--bg-surface)',
          borderRadius: '1.25rem',
          boxShadow: 'var(--shadow-lg)',
        }}>
          {/* Header pill */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: 'var(--accent-amber)',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}>
              <Clock size={16} />
              <span>ACADEMIC CLEARANCE PENDING</span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Tuition Received • Awaiting Admin Clearance
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Thank you, <strong style={{ color: 'var(--text-primary)' }}>{currentUser?.full_name || 'Scholar'}</strong>! 
              Your subscription payment has been received by our automated billing ledger. As part of campus security, an Administrator or Academic Registrar will review your tuition and activate your Intranet credentials.
            </p>
          </div>

          {/* Verification Record Card */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.875rem',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Submission Verification Dossier
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Student Candidate</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{currentUser?.full_name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{currentUser?.email}</span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Subscribed Tier</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'capitalize' }}>
                  {currentUser?.subscription_plan || 'Annual Campus Fellowship'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Payment Reference</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-emerald)', fontFamily: 'monospace' }}>
                  {currentUser?.payment_reference || 'TXN-REACTJAV-8921B'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Approval Status</span>
                <span className="badge badge-amber" style={{ display: 'inline-block', marginTop: '0.2rem' }}>
                  Under Bursar Review
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            background: 'var(--bg-surface-elevated)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-subtle)',
            marginBottom: '2.5rem',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>1. Payment Received</span>
            </div>
            <span style={{ color: 'var(--border-subtle)' }}>→</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="#f59e0b" />
              <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600 }}>2. Admin Clearance Grant</span>
            </div>
            <span style={{ color: 'var(--border-subtle)' }}>→</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={18} color="var(--text-muted)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>3. Full Intranet Access</span>
            </div>
          </div>


          {/* Action links */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/academy" className="btn btn-primary btn-sm" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <GraduationCap size={16} />
              <span>Enrol in Direct Tutoring</span>
            </Link>
            <Link href="/" className="btn btn-secondary btn-sm">
              <BookOpen size={16} />
              <span>Browse Public Catalog</span>
            </Link>
            <Link href="/admin/access" className="btn btn-outline btn-sm">
              <ShieldAlert size={16} />
              <span>Admin Desk</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CASE 3: Rejected Submission
  // ==========================================
  if (accessState.status === 'rejected') {
    return (
      <div className="container" style={{ padding: '4rem 1rem 6rem' }}>
        <div className="glass-card" style={{
          maxWidth: '620px',
          margin: '0 auto',
          padding: '3rem 2rem',
          textAlign: 'center',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <ShieldAlert size={30} color="var(--accent-red)" />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            Clearance Verification Declined
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {currentUser?.rejection_reason || 'Your tuition payment reference could not be authenticated by the registrar. Please submit an active receipt or choose another payment method.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/subscribe" className="btn btn-primary">
              <CreditCard size={16} />
              <span>Resubmit Tuition Payment</span>
            </Link>
            <Link href="/" className="btn btn-secondary">
              <span>Return to Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CASE 4: No Subscription (`status === 'none'`)
  // ==========================================
  return (
    <div className="container" style={{ padding: '4rem 1rem 6rem' }}>
      <div className="glass-card" style={{
        maxWidth: '820px',
        margin: '0 auto',
        padding: '3.5rem 2.5rem',
        borderRadius: '1.5rem',
        border: '1px solid var(--border-accent)',
        background: 'var(--bg-surface)',
        boxShadow: 'var(--shadow-lg)',
      }}>
        {/* Header Badge */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            background: 'rgba(79, 70, 229, 0.12)',
            border: '1px solid rgba(79, 70, 229, 0.3)',
            color: 'var(--primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
          }}>
            <Lock size={15} />
            <span>CAMPUS INTRANET • RESTRICTED FELLOWSHIP ZONE</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '0.85rem',
          }}>
            {requiredFeatureTitle ? `Access to ${requiredFeatureTitle}` : 'Restricted Student Campus Intranet'}
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '620px',
            margin: '0 auto',
            fontSize: '1rem',
            lineHeight: 1.6,
          }}>
            The ReactJav Intranet is a private academic network reserved strictly for subscribed students upon formal Administrator verification. Public visitors may explore course syllabi in the catalog.
          </p>
        </div>

        {/* Intranet Perks Matrix */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          margin: '2.5rem 0',
        }}>
          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.875rem',
            padding: '1.25rem',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '0.5rem',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
            }}>
              <Timer size={18} color="var(--accent-amber)" />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              CBT Testing Center
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              60-minute timed certification assessments, live question palette, and verified print slips.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.875rem',
            padding: '1.25rem',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '0.5rem',
              background: 'rgba(236, 72, 153, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
            }}>
              <Video size={18} color="var(--accent-pink)" />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Live Virtual Rooms
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Hardware 1080p screen share, breakout pods, real-time laser annotations, and faculty office hours.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.875rem',
            padding: '1.25rem',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '0.5rem',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
            }}>
              <GraduationCap size={18} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Engineering Curricula
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Full course lecture streaming, interactive code quizzes, progress tracking, and repos.
            </p>
          </div>
        </div>

        {/* How Access Works (4 Steps) */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
            Admissions & Clearance Protocol:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700, display: 'block' }}>Step 1: Select Plan</span>
              Choose Term, Annual, or Lifetime Scholar pass.
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700, display: 'block' }}>Step 2: Pay Tuition</span>
              Submit card or wire payment to receive reference.
            </div>
            <div style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700, display: 'block' }}>
              Step 3: Admin Clearance
              <span style={{ display: 'block', fontWeight: 400, color: 'var(--text-secondary)' }}>
                Bursar & Admin grant admission to student.
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, display: 'block' }}>
              Step 4: Intranet Key
              <span style={{ display: 'block', fontWeight: 400, color: 'var(--text-secondary)' }}>
                Unrestricted 24/7 access to all campus facilities.
              </span>
            </div>
          </div>
        </div>

        {/* Direct Tutoring Alternative Pathway Callout */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                Instant Access Pathway
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                1-on-1 Direct Tutoring Fellowships
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '520px', lineHeight: 1.5 }}>
              Enrolling under Direct Tutoring immediately unlocks the entire Campus Intranet with 100% active academic clearance, automated coursework tracking, timed CBT exams, and private mentoring rooms.
            </p>
          </div>

          <Link
            href="/academy"
            className="btn btn-primary btn-sm"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              fontWeight: 700,
              padding: '0.65rem 1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}
          >
            <GraduationCap size={16} />
            <span>Enrol in Direct Tutoring</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Call to Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <Link
            href="/subscribe"
            className="btn btn-primary btn-lg"
            style={{
              padding: '0.85rem 2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <CreditCard size={18} />
            <span>Enroll & Subscribe Now</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/"
            className="btn btn-secondary btn-lg"
            style={{ padding: '0.85rem 1.75rem' }}
          >
            <BookOpen size={18} />
            <span>Back to Public Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
