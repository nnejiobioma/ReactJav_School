'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, Check, X, SlidersHorizontal } from 'lucide-react';
import { hasAcceptedCookies, acceptCookies } from '@/lib/cookies';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if user has not yet accepted cookies
    const checkConsent = () => {
      setIsVisible(!hasAcceptedCookies());
    };

    checkConsent();

    const handleConsentEvent = () => checkConsent();
    window.addEventListener('cookie_consent_updated', handleConsentEvent);
    return () => window.removeEventListener('cookie_consent_updated', handleConsentEvent);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 2.5rem)',
        maxWidth: '860px',
        zIndex: 9990,
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(129, 140, 248, 0.3)',
        borderRadius: '1.25rem',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: '1 1 400px' }}>
        <div
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))',
            border: '1px solid rgba(129, 140, 248, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <Cookie size={20} color="#a5b4fc" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
              We Value Your Privacy & Learning Experience
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Cookies
            </span>
          </div>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            ReactJav uses essential and functional cookies to maintain your login session, save your video progress, 
            and remember IDE settings. Learn more in our{' '}
            <Link
              href="/cookies"
              style={{ color: '#a5b4fc', textDecoration: 'underline', fontWeight: 600 }}
            >
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              style={{ color: '#a5b4fc', textDecoration: 'underline', fontWeight: 600 }}
            >
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            acceptCookies(false);
            setIsVisible(false);
          }}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.82rem' }}
        >
          <span>Essential Only</span>
        </button>

        <button
          onClick={() => {
            acceptCookies(true);
            setIsVisible(false);
          }}
          className="btn btn-primary btn-sm"
          style={{ fontSize: '0.82rem', gap: '0.4rem' }}
        >
          <Check size={14} />
          <span>Accept Cookies</span>
        </button>
      </div>
    </div>
  );
}
