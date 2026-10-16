'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  Timer, 
  Users, 
  Building, 
  HeartHandshake, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export default function WhyChooseReactJav() {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const features = [
    {
      id: 1,
      icon: <Layers size={24} color="#38bdf8" />,
      badge: 'Production-Grade',
      title: 'Real Engineering, Not Tutorial Hell',
      tagline: 'Ship live, production-grade applications that withstand actual traffic.',
      description: 'Forget basic to-do apps. Every learner builds and deploys scalable systems featuring PostgreSQL Row Level Security, Supabase authentication, Next.js 16 App Router, and resilient cloud storage.',
      highlights: [
        'Full-stack architecture from day one',
        'Real database migrations & indexing',
        'Live production deployments to cloud',
      ],
      metric: '100% Deployed Portfolios',
      color: '#38bdf8',
      accentBg: 'rgba(56, 189, 248, 0.1)',
      borderAccent: 'rgba(56, 189, 248, 0.35)',
    },
    {
      id: 2,
      icon: <Timer size={24} color="#f59e0b" />,
      badge: 'Certified Rigor',
      title: 'Timed CBT Examination Engine',
      tagline: 'Validate true engineering competency under realistic test conditions.',
      description: 'Graduation requires passing our 60-minute timed proctored Computer-Based Testing center. Questions test architectural judgment, debugging capabilities, and syntax precision under time limits.',
      highlights: [
        'Proctored 60-minute countdown system',
        'Cryptographically signed score report',
        'Zero open-book shortcuts or guessing',
      ],
      metric: 'Enterprise-Grade Testing',
      color: '#f59e0b',
      accentBg: 'rgba(245, 158, 11, 0.1)',
      borderAccent: 'rgba(245, 158, 11, 0.35)',
    },
    {
      id: 3,
      icon: <Users size={24} color="#10b981" />,
      badge: '1-on-1 Screen Pairing',
      title: 'Dedicated Senior Mentorship',
      tagline: 'Never get stuck for hours. Screen-pair directly with senior practitioners.',
      description: 'Book private, 1-on-1 virtual pairing sessions with vetted software architects. Get line-by-line PR reviews, architecture feedback, and personalized career roadmaps tailored to your pace.',
      highlights: [
        'Private 1080p screen-sharing pods',
        'Dual-signoff evaluation framework',
        'Tailored from age 5 to working adults',
      ],
      metric: 'Direct Mentor Signoff',
      color: '#10b981',
      accentBg: 'rgba(16, 185, 129, 0.1)',
      borderAccent: 'rgba(16, 185, 129, 0.35)',
    },
    {
      id: 4,
      icon: <Building size={24} color="#818cf8" />,
      badge: 'Campus Architecture',
      title: 'Dual Partition Platform Experience',
      tagline: 'Transparent public catalog meets gated campus intranet facility.',
      description: 'Inspect full syllabi, lesson objectives, and lecture previews openly without friction. Then enter the gated Intranet Campus for real-time examinations, collaborative rooms, and code sandboxes.',
      highlights: [
        'Open curricula transparency for all',
        'Gated Intranet for enrolled students',
        'Role-governed student & instructor suites',
      ],
      metric: 'Zero-Friction Access',
      color: '#818cf8',
      accentBg: 'rgba(129, 140, 248, 0.1)',
      borderAccent: 'rgba(129, 140, 248, 0.35)',
    },
    {
      id: 5,
      icon: <HeartHandshake size={24} color="#ec4899" />,
      badge: 'Global Sponsorships',
      title: 'Foundation Grants & $0 Upfront',
      tagline: 'Financial background will never stand between talent and opportunity.',
      description: 'Backed by global tech alliances and foundation endowments, we offer need-based full tuition sponsorship grants. High-performing fellows learn completely tuition-free with verified support.',
      highlights: [
        '100% sponsored scholarship options',
        'Flexible monthly split-tuition plans',
        'Equitable access across 54+ nations',
      ],
      metric: '$0 Upfront Grants',
      color: '#ec4899',
      accentBg: 'rgba(236, 72, 153, 0.1)',
      borderAccent: 'rgba(236, 72, 153, 0.35)',
    },
    {
      id: 6,
      icon: <GraduationCap size={24} color="#a855f7" />,
      badge: 'Industry Verified',
      title: 'Permanent Verifiable Credentials',
      tagline: 'Credentials employers can instantly trust and verify with one click.',
      description: 'Every certificate comes with a permanent verification link, serial identification, and tamper-resistant metadata. Recruiters can independently inspect your exam scores and deployed milestone projects.',
      highlights: [
        'Permanent public verification URL',
        'Direct LinkedIn & resume integration',
        'Verified project milestone showcase',
      ],
      metric: '350,000+ Verified Issued',
      color: '#a855f7',
      accentBg: 'rgba(168, 85, 247, 0.1)',
      borderAccent: 'rgba(168, 85, 247, 0.35)',
    },
  ];

  return (
    <section style={{ margin: '5rem 0 4rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.3rem 0.85rem',
          borderRadius: '9999px',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: 'var(--primary)',
          fontSize: '0.78rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          <Sparkles size={13} />
          <span>The ReactJav Difference</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
        }}>
          Why Engineers & Ambitious Learners{' '}
          <span className="text-gradient">Choose ReactJav</span>
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          marginTop: '1rem',
          lineHeight: 1.6,
        }}>
          We removed passive video watching and replaced it with hands-on architecture, proctored examinations, and private 1-on-1 mentorship.
        </p>
      </div>

      {/* Interactive Feature Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: '1.75rem',
        marginBottom: '3rem',
      }}>
        {features.map((feat, index) => {
          const isSelected = activeFeature === index;
          return (
            <div
              key={feat.id}
              onClick={() => setActiveFeature(index)}
              style={{
                background: isSelected 
                  ? `linear-gradient(135deg, ${feat.accentBg} 0%, var(--bg-surface) 100%)` 
                  : 'var(--bg-surface)',
                border: isSelected ? `2px solid ${feat.color}` : '1px solid var(--border-subtle)',
                borderRadius: '1.25rem',
                padding: '2rem 1.75rem',
                boxShadow: isSelected ? `0 12px 30px -8px ${feat.color}35` : 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                {/* Header Row: Icon + Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '0.85rem',
                    background: feat.accentBg,
                    border: `1px solid ${feat.borderAccent}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {feat.icon}
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: feat.color,
                    background: feat.accentBg,
                    border: `1px solid ${feat.borderAccent}`,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                  }}>
                    {feat.badge}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3,
                }}>
                  {feat.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: feat.color,
                  marginBottom: '0.85rem',
                  lineHeight: 1.4,
                }}>
                  {feat.tagline}
                </p>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  marginBottom: '1.25rem',
                }}>
                  {feat.description}
                </p>

                {/* Highlights List */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.825rem',
                }}>
                  {feat.highlights.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={14} color={feat.color} style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div style={{
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {feat.metric}
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  color: feat.color,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}>
                  <span>Learn more</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div style={{
        padding: '1.5rem 2rem',
        borderRadius: '1.25rem',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid var(--border-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ShieldCheck size={22} color="#10b981" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              The ReactJav 100% Competency Assurance
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
              If you don't pass your timed CBT certification after completing your project milestones, your mentor stays with you at zero additional cost until you certify.
            </p>
          </div>
        </div>

        <Link
          href="/subscribe"
          className="btn btn-primary btn-sm"
          style={{ whiteSpace: 'nowrap', gap: '0.4rem', padding: '0.65rem 1.4rem' }}
        >
          <span>Explore Tuition & Sponsorships</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
