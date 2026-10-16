'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake, 
  HelpCircle, 
  Clock, 
  Award,
  Zap
} from 'lucide-react';

export default function TuitionSponsorshipSection() {
  const tiers = [
    {
      id: 'explorer',
      name: 'Public Explorer',
      badge: 'Open to Everyone',
      price: '$0',
      period: 'Always Free',
      description: 'Transparent access for self-starters exploring curriculum outlines, public syllabi, and technical lesson previews.',
      features: [
        'Unrestricted course catalog exploration',
        'Detailed syllabi & milestone breakdowns',
        'Free preview lectures & code snippets',
        'Open Discord community & tech events',
        'Self-guided learning at your pace',
      ],
      ctaText: 'Browse Free Curricula',
      ctaHref: '/courses',
      ctaVariant: 'btn-outline',
      highlighted: false,
    },
    {
      id: 'scholar',
      name: 'Campus Intranet Scholar',
      badge: 'Most Popular • Grant Eligible',
      price: '$0 Upfront',
      period: '100% Sponsorship Grants Available',
      description: 'The core verified engineering track. Timed proctored CBT exams, production code archives, and verified credentials.',
      features: [
        'Timed 60-min CBT Examination Center',
        'Cryptographically verifiable certificates',
        'In-browser cloud IDE & PostgreSQL sandbox',
        'Live 1080p virtual breakout rooms',
        'Peer code reviews & milestone tracking',
        'Eligible for 100% need-based sponsorship',
      ],
      ctaText: 'Apply For Sponsorship',
      ctaHref: '/subscribe',
      ctaVariant: 'btn-primary',
      highlighted: true,
    },
    {
      id: 'mentorship',
      name: '1-on-1 Academy Mentorship',
      badge: 'Dedicated Pairing',
      price: 'Custom',
      period: 'Bespoke Track / Flexible Cadence',
      description: 'Private 1-on-1 live screen-pairing with a dedicated software architect. Tailored for learners aged 5 to adult.',
      features: [
        'Private 1-on-1 live screen-pairing sessions',
        'Bespoke syllabus (from Junior Dev to Senior SWE)',
        'Line-by-line pull request code reviews',
        'Direct WhatsApp & mentor communication hotline',
        'Dual-signoff portfolio & job interview prep',
        'Timed CBT test coaching & milestone signoff',
      ],
      ctaText: 'Explore Academy Tracks',
      ctaHref: '/academy',
      ctaVariant: 'btn-secondary',
      highlighted: false,
    },
  ];

  return (
    <section id="tuition-sponsorships" style={{ margin: '5rem 0', scrollMarginTop: '6rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.3rem 0.85rem',
          borderRadius: '9999px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          color: '#10b981',
          fontSize: '0.78rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          <HeartHandshake size={14} />
          <span>Equitable Tech Education</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.85rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
        }}>
          Transparent Tuition & <span className="text-gradient">Sponsorship Grants</span>
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          marginTop: '0.85rem',
          lineHeight: 1.6,
        }}>
          Financial limitations should never stand between ambition and world-class technical competence. Over 80% of our fellows access subsidized or 100% sponsored grants.
        </p>
      </div>

      {/* 3 Pricing / Sponsorship Tier Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: '2rem',
        alignItems: 'stretch',
        marginBottom: '3rem',
      }}>
        {tiers.map((tier) => (
          <div
            key={tier.id}
            style={{
              borderRadius: '1.5rem',
              padding: '2.25rem 2rem',
              background: tier.highlighted 
                ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, var(--bg-surface) 100%)' 
                : 'var(--bg-surface)',
              border: tier.highlighted ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
              boxShadow: tier.highlighted ? '0 16px 40px -10px rgba(124, 58, 237, 0.35)' : 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              transform: tier.highlighted ? 'scale(1.02)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          >
            {tier.highlighted && (
              <div style={{
                position: 'absolute',
                top: '-0.85rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.3rem 1rem',
                borderRadius: '9999px',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.45)',
              }}>
                Recommended For Certified Fellows
              </div>
            )}

            <div>
              {/* Badge & Title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: tier.highlighted ? 'rgba(124, 58, 237, 0.15)' : 'var(--bg-surface-elevated)',
                  color: tier.highlighted ? 'var(--primary)' : 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                }}>
                  {tier.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {tier.name}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem', minHeight: '42px' }}>
                {tier.description}
              </p>

              {/* Price Row */}
              <div style={{
                paddingBottom: '1.5rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {tier.price}
                </div>
                <div style={{ fontSize: '0.8rem', color: tier.highlighted ? '#10b981' : 'var(--text-muted)', fontWeight: 600, marginTop: '0.35rem' }}>
                  {tier.period}
                </div>
              </div>

              {/* Features List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                marginBottom: '2rem',
                fontSize: '0.86rem',
              }}>
                {tier.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color={tier.highlighted ? 'var(--primary)' : '#10b981'} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <span style={{ lineHeight: 1.4 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href={tier.ctaHref}
                className={`btn ${tier.ctaVariant}`}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.85rem',
                  fontWeight: 700,
                  fontSize: '0.925rem',
                  borderRadius: '0.75rem',
                  boxShadow: tier.highlighted ? '0 6px 20px -3px rgba(37, 99, 235, 0.4)' : 'none',
                }}
              >
                <span>{tier.ctaText}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Grant Application Callout */}
      <div style={{
        padding: '1.5rem 2rem',
        borderRadius: '1.25rem',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <ShieldCheck size={24} color="#10b981" />
          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <strong>Have questions about sponsorship grants or need an institutional invoice?</strong> Chat with our admissions officers to review grant requirements.
          </div>
        </div>

        <Link
          href="/subscribe"
          style={{
            fontSize: '0.85rem',
            color: 'var(--primary)',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <span>Learn About Grant Guidelines</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
