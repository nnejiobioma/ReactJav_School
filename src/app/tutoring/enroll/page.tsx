'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import DirectTutoringEnrollmentForm from '@/components/academy/DirectTutoringEnrollmentForm';
import {
  Sparkles,
  ShieldCheck,
  Video,
  Award,
  CheckCircle2,
  ArrowLeft,
  HeartHandshake
} from 'lucide-react';

function TutoringEnrollContent() {
  const searchParams = useSearchParams();
  const trackId = searchParams.get('trackId') || searchParams.get('track');

  return (
    <div className="container" style={{ padding: '3.5rem 1rem 6rem' }}>
      {/* Back button */}
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/academy"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Direct Tutoring Overview</span>
        </Link>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: '0.85rem',
            color: '#34d399',
            fontWeight: 600,
            marginBottom: '1rem',
          }}
        >
          <Sparkles size={16} color="var(--accent-emerald)" />
          <span>ReactJav Academy • 1-on-1 Direct Tutoring Desk</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.1rem, 4vw, 3.1rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '0.85rem',
          }}
        >
          Direct Tutoring <span className="text-gradient">Enrolment Form</span>
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Customized academic tracks for children (Ages 5–9), foundation explorers (Ages 10–13), high schoolers (Ages 14–17), and adult scholars. Fill out the enrollment profile below to configure your 1-on-1 mentorship pod.
        </p>
      </div>

      {/* Layout Grid: Form + Info Sidebar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '2.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'start',
        }}
      >
        {/* Main Enrollment Card */}
        <div
          className="glass-card"
          style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderRadius: '1.5rem',
            border: '1px solid var(--border-accent)',
            boxShadow: 'var(--shadow-lg)',
            gridColumn: 'span 2',
          }}
        >
          <DirectTutoringEnrollmentForm initialTrackId={trackId || undefined} />
        </div>

        {/* Informational Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Minor Safety Card */}
          <div
            className="glass-card"
            style={{
              padding: '1.75rem',
              borderRadius: '1.25rem',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, var(--bg-surface) 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <HeartHandshake size={20} color="#fbbf24" />
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                Minor Safety & Parental Consent
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 1rem' }}>
              For learners under 18 years old, a parent or legal guardian must review and approve the parental consent agreement before enrollment can proceed.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="var(--accent-emerald)" />
                <span>COPPA & Child Safety Compliant</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="var(--accent-emerald)" />
                <span>Fully Vetted Faculty Mentors</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="var(--accent-emerald)" />
                <span>Parent Access to Attendance Ledgers</span>
              </div>
            </div>
          </div>

          {/* Dual Sign-off Card */}
          <div
            className="glass-card"
            style={{
              padding: '1.75rem',
              borderRadius: '1.25rem',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <ShieldCheck size={20} color="var(--accent-emerald)" />
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                The Dual Sign-Off Guarantee
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 1rem' }}>
              Sessions and study hours are recorded on the internal campus ledger. Credits are recognized only when both the student and mentor confirm session completion.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Video size={15} color="var(--primary)" />
                <span>1080p Screen Sharing & Code Pairing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Award size={15} color="var(--accent-amber)" />
                <span>Official Track Certification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TutoringEnrollPage() {
  return (
    <Suspense
      fallback={
        <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading Direct Tutoring Enrolment Desk...</p>
        </div>
      }
    >
      <TutoringEnrollContent />
    </Suspense>
  );
}
