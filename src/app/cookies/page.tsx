'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Cookie, 
  Lock, 
  FileText, 
  ArrowLeft, 
  ArrowRight,
  Printer, 
  CheckCircle2, 
  Check, 
  Clock, 
  Database, 
  Globe, 
  Mail, 
  Building,
  KeyRound,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { acceptCookies, hasAcceptedCookies } from '@/lib/cookies';

export default function CookiePolicyPage() {
  const [accepted, setAccepted] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  useEffect(() => {
    setAccepted(hasAcceptedCookies());
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleAcceptAll = () => {
    acceptCookies(true);
    setAccepted(true);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  const handleAcceptEssential = () => {
    acceptCookies(false);
    setAccepted(true);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  const lastUpdatedDate = 'October 16, 2026';

  const cookieCategories = [
    {
      name: 'Essential & Authentication Cookies',
      badge: 'Strictly Required',
      badgeColor: '#34d399',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      description: 'These cookies are strictly required to provide you with secure access to the ReactJav learning portal, maintain your authenticated student/instructor session, prevent CSRF attacks, and manage user login state.',
      examples: [
        { name: 'sb-auth-token', purpose: 'Stores Supabase authentication session token', duration: 'Session / 30 Days' },
        { name: 'reactjav_cookie_consent', purpose: 'Remembers your cookie consent choices', duration: '1 Year' },
        { name: 'reactjav_privacy_accepted', purpose: 'Verifies acceptance of institutional privacy terms', duration: '1 Year' },
      ],
    },
    {
      name: 'Functional & Platform Preferences',
      badge: 'Recommended',
      badgeColor: '#818cf8',
      badgeBg: 'rgba(99, 102, 241, 0.12)',
      description: 'Used to remember your interface preferences such as dark/light system theme, Cloud IDE layout settings, editor font preferences, and active course language filters.',
      examples: [
        { name: 'app-theme', purpose: 'Remembers Dark or Light UI theme selection', duration: 'Permanent / Local' },
        { name: 'ide_panel_layout', purpose: 'Stores collapsed/expanded state of code explorer', duration: '1 Year' },
        { name: 'video_playback_rate', purpose: 'Persists lecture video speed (e.g. 1.25x, 1.5x)', duration: '6 Months' },
      ],
    },
    {
      name: 'Academic Progress & Examination Cookies',
      badge: 'Required for Courses',
      badgeColor: '#c084fc',
      badgeBg: 'rgba(168, 85, 247, 0.12)',
      description: 'Ensures your video streaming position is saved when resuming lectures, keeps temporary drafts of laboratory exercises, and maintains timed CBT examination timers.',
      examples: [
        { name: 'cbt_session_guard', purpose: 'Validates exam attempt continuity and prevents duplicate submission', duration: 'Examination Window' },
        { name: 'lesson_resume_sec', purpose: 'Saves timestamp inside lecture video player', duration: '90 Days' },
      ],
    },
    {
      name: 'Performance & Error Telemetry',
      badge: 'Optional',
      badgeColor: '#fbbf24',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
      description: 'Aggregates anonymous website speed metrics, Core Web Vitals (LCP, FID), and system crash reports via Vercel Speed Insights to ensure fast video streaming and responsive web IDE execution.',
      examples: [
        { name: '_va_speed_insights', purpose: 'Anonymous performance metrics and latency telemetry', duration: 'Session' },
      ],
    },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.25rem 6rem', maxWidth: '960px' }}>
      {/* Top Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--primary)',
            fontSize: '0.86rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handlePrint}
            className="btn btn-secondary btn-sm"
            style={{ gap: '0.4rem', fontSize: '0.82rem' }}
          >
            <Printer size={14} />
            <span>Print or Save PDF</span>
          </button>

          <Link
            href="/auth?mode=signin"
            className="btn btn-primary btn-sm"
            style={{ gap: '0.4rem', fontSize: '0.82rem' }}
          >
            <KeyRound size={14} />
            <span>Sign In</span>
          </Link>
        </div>
      </div>

      {/* Main Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.14) 0%, rgba(139, 92, 246, 0.08) 50%, var(--bg-surface) 100%)',
        border: '1px solid var(--border-accent)',
        borderRadius: '1.5rem',
        padding: 'clamp(2rem, 4vw, 3rem)',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg), 0 0 35px rgba(124, 58, 237, 0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(129, 140, 248, 0.35)',
            color: '#a5b4fc',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <Cookie size={13} />
            Cookie Governance
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}>
            <CheckCircle2 size={12} />
            GDPR & ePrivacy Compliant
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.15,
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          ReactJav Cookie Policy & Tracking Technologies
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '720px',
          marginBottom: '1.75rem',
        }}>
          This Cookie Policy explains how ReactJav School uses cookies, local storage, and similar technologies 
          to recognize you when you visit our website, sign in to your student account, and interact with our learning management system.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Clock size={15} color="var(--primary)" />
            <span>Last Updated: <strong style={{ color: '#ffffff' }}>{lastUpdatedDate}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Building size={15} color="var(--primary)" />
            <span>Institution: <strong style={{ color: '#ffffff' }}>ReactJav School</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <FileText size={15} color="var(--primary)" />
            <span>Related: <Link href="/privacy" style={{ color: '#a5b4fc', textDecoration: 'underline' }}>Privacy Policy</Link></span>
          </div>
        </div>
      </div>

      {/* Interactive Cookie Preference Manager */}
      <div style={{
        background: 'rgba(99, 102, 241, 0.08)',
        border: '1px solid rgba(129, 140, 248, 0.25)',
        borderRadius: '1.25rem',
        padding: '1.75rem',
        marginBottom: '3rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SlidersHorizontal size={20} color="#a5b4fc" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Your Cookie Consent Status
              </h2>
              <span style={{ fontSize: '0.82rem', color: accepted ? '#34d399' : 'var(--text-muted)' }}>
                {accepted ? 'Cookies Accepted for this Browser' : 'No Consent Recorded Yet'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={handleAcceptEssential} className="btn btn-secondary btn-sm">
              <span>Essential Only</span>
            </button>
            <button onClick={handleAcceptAll} className="btn btn-primary btn-sm">
              <span>Accept All Cookies</span>
              <Check size={14} />
            </button>
          </div>
        </div>

        {savedNotification && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#34d399',
            fontSize: '0.84rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <CheckCircle2 size={16} />
            <span>Your cookie preferences have been successfully updated and saved in this browser.</span>
          </div>
        )}
      </div>

      {/* Cookie Categories Details */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem' }}>
        Categories of Cookies We Use
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
        {cookieCategories.map((cat, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                {cat.name}
              </h3>
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: cat.badgeColor,
                background: cat.badgeBg,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {cat.badge}
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              {cat.description}
            </p>

            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-subtle)',
              overflow: 'hidden',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '0.75rem 1rem', color: '#ffffff', fontWeight: 600 }}>Cookie Identifier</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#ffffff', fontWeight: 600 }}>Purpose</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#ffffff', fontWeight: 600 }}>Lifespan</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.examples.map((item, i) => (
                    <tr key={i} style={{ borderBottom: i !== cat.examples.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <td style={{ padding: '0.75rem 1rem', color: '#a5b4fc', fontFamily: 'monospace', fontWeight: 600 }}>{item.name}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{item.purpose}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* How to Manage Cookies in Browser */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
          How You Can Control or Block Cookies
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
          Most web browsers allow you to manage or delete cookies through browser settings. However, disabling <strong>Essential Cookies</strong> will prevent you from signing in to your student account, accessing proctored exams, or maintaining an active learning session.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
          For further details regarding personal data handling, user rights, and contact details for our Data Protection Officer, please consult our full <Link href="/privacy" style={{ color: '#a5b4fc', textDecoration: 'underline' }}>Privacy Policy</Link>.
        </p>
      </div>

      {/* Bottom CTA */}
      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%)',
        border: '1px solid var(--border-accent)',
        borderRadius: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>
            Have questions about cookies or data compliance?
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
            Reach out to our Data Protection and Security Team at <strong>privacy@reactjav.school</strong>.
          </p>
        </div>

        <Link href="/auth?mode=signin" className="btn btn-primary">
          <span>Sign In to Learning Portal</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
