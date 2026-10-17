'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Users, 
  Award, 
  Globe, 
  DollarSign, 
  ShieldCheck, 
  Code2, 
  Timer,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { SiteHeroContent } from '@/types';
import { DEFAULT_SITE_CONTENT } from '@/lib/supabase/defaultSiteContent';

interface LandingHeroProps {
  content?: SiteHeroContent;
}

export default function LandingHero({
  content = DEFAULT_SITE_CONTENT.hero,
}: LandingHeroProps) {
  return (
    <section style={{
      position: 'relative',
      paddingTop: '2.5rem',
      paddingBottom: '4rem',
      overflow: 'hidden',
    }}>
      {/* Background Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(900px, 90vw)',
        height: '450px',
        background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.1) 0%, rgba(79, 70, 229, 0.05) 45%, transparent 75%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1100px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        {/* Top Announcement Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.6rem',
          padding: '0.45rem 1.25rem',
          borderRadius: '9999px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-accent)',
          marginBottom: '1.75rem',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          fontWeight: 600,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--primary)',
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
          }}>
            <Sparkles size={14} color="var(--primary)" />
            <span>{content.announcement_badge}</span>
          </div>
          <span style={{ color: 'var(--border-focus)' }}>•</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            {content.announcement_text}
          </span>
          <Link
            href="/subscribe"
            style={{
              color: 'var(--primary)',
              textDecoration: 'none',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem',
              marginLeft: '0.25rem',
            }}
          >
            <span>{content.announcement_link_text || 'Apply Now'}</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Hero Eyebrow */}
        <div style={{
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontSize: '0.85rem',
          fontWeight: 800,
          color: 'var(--accent-purple)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}>
          <Sparkles size={16} color="var(--accent-purple)" />
          <span>{content.eyebrow}</span>
        </div>

        {/* Main High-Impact Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5.8vw, 4.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.035em',
          lineHeight: 1.12,
          maxWidth: '1000px',
          margin: '0 auto 1.5rem',
          color: 'var(--text-primary)',
        }}>
          {content.title_prefix}{' '}
          <span style={{
            background: 'linear-gradient(135deg, #818cf8 0%, #a855f7 40%, #ec4899 80%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {content.title_highlight}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '780px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.65,
        }}>
          {content.subtitle}
        </p>

        {/* Primary & Secondary Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
        }}>
          <a
            href="#featured-programmes"
            className="btn btn-primary btn-lg"
            style={{
              padding: '0.95rem 2.25rem',
              fontSize: '1.025rem',
              fontWeight: 800,
              gap: '0.6rem',
              borderRadius: '9999px',
              boxShadow: '0 8px 25px -4px rgba(124, 58, 237, 0.55)',
            }}
          >
            <span>Explore Programmes</span>
            <ArrowRight size={18} />
          </a>

          <Link
            href="/subscribe"
            className="btn btn-outline btn-lg"
            style={{
              padding: '0.95rem 2rem',
              fontSize: '1.025rem',
              fontWeight: 700,
              gap: '0.5rem',
              borderRadius: '9999px',
              background: 'var(--bg-surface)',
            }}
          >
            <Sparkles size={17} color="var(--accent-purple)" />
            <span>Apply For Sponsorship</span>
          </Link>
        </div>

        {/* Trust Badges & Social Proof Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          padding: '1rem 1.5rem',
          borderRadius: '1.25rem',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-subtle)',
          maxWidth: '720px',
          margin: '0 auto 3.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', color: '#f59e0b' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              4.9/5
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Learner Satisfaction
            </span>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />

          {/* Verification Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <CheckCircle2 size={16} color="#10b981" />
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              100% Production-Grade Portfolios
            </span>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />

          {/* Certified Testing */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <ShieldCheck size={16} color="var(--accent-purple)" />
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Timed CBT Verification
            </span>
          </div>
        </div>

        {/* Floating Interactive Platform Mockup Preview */}
        <div style={{
          position: 'relative',
          borderRadius: '1.5rem',
          padding: '1rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '4rem',
        }}>
          {/* Top Window Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.6rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-elevated)',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            fontSize: '0.8rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ marginLeft: '0.5rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                reactjav-campus-terminal v2.4 (live)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                color: '#059669',
                fontWeight: 700,
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
                Dual-Partition Online
              </span>
              <Link
                href="/intranet"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <span>Launch Intranet</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>

          {/* Interactive Preview Body - 2 Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            padding: '1.25rem',
            background: 'var(--bg-surface)',
            borderBottomLeftRadius: '1rem',
            borderBottomRightRadius: '1rem',
            textAlign: 'left',
          }}>
            {/* Column 1: Timed CBT Engine Snapshot */}
            <div style={{
              background: 'var(--bg-surface-elevated)',
              padding: '1.25rem',
              borderRadius: '0.85rem',
              border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                  <Timer size={12} /> CBT Engine • Proctored
                </span>
                <span style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  54:12 REMAINING
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Question 14 of 40: Which SQL statement enforces Row Level Security in PostgreSQL?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem' }}>
                <div style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: 'rgba(5, 150, 105, 0.1)',
                  border: '1px solid rgba(5, 150, 105, 0.3)',
                  color: '#059669',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}>
                  <CheckCircle2 size={13} />
                  <code>ALTER TABLE records ENABLE ROW LEVEL SECURITY;</code>
                </div>
                <div style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}>
                  <code>SET SECURITY POLICY ON records;</code>
                </div>
              </div>
            </div>

            {/* Column 2: In-Browser Code IDE Preview */}
            <div style={{
              background: 'var(--bg-surface-elevated)',
              padding: '1.25rem',
              borderRadius: '0.85rem',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                  <Code2 size={12} /> Cloud IDE Sandbox
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  branch: main (verified)
                </span>
              </div>
              <div style={{
                background: '#0a0d1a',
                padding: '0.85rem',
                borderRadius: '0.5rem',
                fontSize: '0.76rem',
                lineHeight: 1.55,
                color: '#f8fafc',
                overflowX: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}>
                <span style={{ color: '#818cf8' }}>const</span> supabase = createServerClient(<br />
                &nbsp;&nbsp;process.env.NEXT_PUBLIC_SUPABASE_URL,<br />
                &nbsp;&nbsp;process.env.SUPABASE_SERVICE_ROLE_KEY<br />
                );<br />
                <span style={{ color: '#34d399' }}>// ✓ Next.js 16 App Router Connected</span>
              </div>
              <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>Build Status: Passing (100%)</span>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>350+ Fellows Coding Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Impact Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1.25rem',
          maxWidth: '1050px',
          margin: '0 auto',
        }}>
          <div className="glass-card" style={{
            padding: '1.25rem 1.4rem',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '0.85rem',
              background: 'rgba(56, 189, 248, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Users size={24} color="var(--accent-cyan)" />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {content.metric_1_value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.25rem', fontWeight: 600 }}>
                {content.metric_1_label}
              </div>
            </div>
          </div>

          <div className="glass-card" style={{
            padding: '1.25rem 1.4rem',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '0.85rem',
              background: 'rgba(16, 185, 129, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Award size={24} color="var(--accent-emerald)" />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {content.metric_2_value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.25rem', fontWeight: 600 }}>
                {content.metric_2_label}
              </div>
            </div>
          </div>

          <div className="glass-card" style={{
            padding: '1.25rem 1.4rem',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '0.85rem',
              background: 'rgba(139, 92, 246, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Globe size={24} color="var(--accent-purple)" />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {content.metric_3_value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.25rem', fontWeight: 600 }}>
                {content.metric_3_label}
              </div>
            </div>
          </div>

          <div className="glass-card" style={{
            padding: '1.25rem 1.4rem',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '0.85rem',
              background: 'rgba(245, 158, 11, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <DollarSign size={24} color="var(--accent-amber)" />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {content.metric_4_value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.25rem', fontWeight: 600 }}>
                {content.metric_4_label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
