'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  LogOut, 
  FileText, 
  ExternalLink,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { signOutUser } from '@/lib/supabase/auth';
import { setCookie } from '@/lib/cookies';

export default function PrivacyPolicyPopup() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkUserStatus = () => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);

    // If user is authenticated and has NOT accepted privacy policy yet, open modal
    if (user && user.id !== 'guest' && user.privacy_accepted !== true) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    checkUserStatus();

    const handleStorage = () => checkUserStatus();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleAccept = async () => {
    if (!hasAgreed || !currentUser) return;
    setIsSubmitting(true);

    try {
      // Persist acceptance in profile & database
      LocalDataService.acceptPrivacyPolicy(currentUser.id);
      setCookie('reactjav_privacy_accepted', 'true', 365);
      
      // Update local state
      const updatedUser = LocalDataService.getCurrentUser();
      setCurrentUser(updatedUser);
      setIsOpen(false);
      window.dispatchEvent(new Event('storage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeclineSignOut = async () => {
    await signOutUser();
    setIsOpen(false);
    setCurrentUser(null);
    window.location.href = '/auth?mode=signin';
  };

  if (!isOpen || !currentUser) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(7, 11, 20, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(23, 23, 43, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)',
          border: '1px solid rgba(129, 140, 248, 0.35)',
          borderRadius: '1.5rem',
          maxWidth: '560px',
          width: '100%',
          padding: 'clamp(1.75rem, 4vw, 2.5rem)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 50px rgba(99, 102, 241, 0.2)',
          position: 'relative',
        }}
      >
        {/* Header Badge & Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))',
              border: '1px solid rgba(129, 140, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)',
            }}
          >
            <ShieldCheck size={26} color="#a5b4fc" />
          </div>
          <div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(129, 140, 248, 0.3)',
                color: '#c084fc',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.2rem',
              }}
            >
              Action Required on Login
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Updated Privacy Policy Consent
            </h2>
          </div>
        </div>

        {/* Description */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          Welcome back, <strong style={{ color: '#ffffff' }}>{currentUser.full_name || currentUser.email}</strong>. 
          ReactJav has updated its institutional Privacy Policy to safeguard student data, proctored computer-based testing records, 
          and campus intranet communications. To continue accessing your dashboard and courses, please accept our privacy terms.
        </p>

        {/* Highlights List */}
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.06)',
            border: '1px solid rgba(129, 140, 248, 0.2)',
            borderRadius: '0.85rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span><strong>No Sale of Data:</strong> Your educational profile, lab code, and student records are never sold or rented to third-party advertisers.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span><strong>Assessment Security:</strong> Proctored CBT examination telemetry is encrypted and retained strictly for grade validation.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span><strong>Row-Level Security:</strong> Strict database isolation ensures other students cannot view your private coursework.</span>
          </div>
        </div>

        {/* Review Link */}
        <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--primary)',
              fontSize: '0.86rem',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            <span>Read Complete Privacy Policy (11 Sections)</span>
            <ExternalLink size={14} />
          </Link>
        </div>

        {/* Consent Checkbox */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.75rem',
            padding: '0.85rem 1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
          }}
        >
          <input
            type="checkbox"
            id="privacyPopupConsentCheckbox"
            checked={hasAgreed}
            onChange={(e) => setHasAgreed(e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              accentColor: '#6366f1',
              marginTop: '2px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
          <label
            htmlFor="privacyPopupConsentCheckbox"
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            I have read and accept the{' '}
            <strong style={{ color: '#ffffff' }}>ReactJav Privacy Policy</strong>. 
            I understand that continued access to learning resources, coursework, and the campus intranet requires accepting these terms.
          </label>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleDeclineSignOut}
            className="btn btn-secondary btn-sm"
            style={{ color: '#f87171', gap: '0.4rem' }}
          >
            <LogOut size={14} />
            <span>Decline & Sign Out</span>
          </button>

          <button
            onClick={handleAccept}
            disabled={!hasAgreed || isSubmitting}
            className="btn btn-primary"
            style={{
              gap: '0.5rem',
              opacity: !hasAgreed ? 0.6 : 1,
              cursor: !hasAgreed ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="animate-spin" size={16} />
                <span>Saving Acceptance...</span>
              </>
            ) : (
              <>
                <span>Accept & Continue</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
