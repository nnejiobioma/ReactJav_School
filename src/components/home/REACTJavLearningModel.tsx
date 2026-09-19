'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Users, MapPin, ShieldCheck, HeartHandshake, ArrowRight, Building, Sparkles } from 'lucide-react';
import { SiteLearningModelContent } from '@/types';
import { DEFAULT_SITE_CONTENT } from '@/lib/supabase/defaultSiteContent';

interface REACTJavLearningModelProps {
  content?: SiteLearningModelContent;
}

export default function REACTJavLearningModel({
  content = DEFAULT_SITE_CONTENT.learning_model,
}: REACTJavLearningModelProps) {
  const iconList = [
    <Target key="1" size={24} color="#f43f5e" />,
    <MapPin key="2" size={24} color="#38bdf8" />,
    <Users key="3" size={24} color="#818cf8" />,
    <HeartHandshake key="4" size={24} color="#10b981" />,
  ];

  const colorList = [
    { bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.3)' },
    { bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.3)' },
    { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.3)' },
    { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' },
  ];

  return (
    <section style={{
      margin: '4.5rem 0',
      padding: '3rem 2rem',
      borderRadius: '1.5rem',
      background: 'radial-gradient(ellipse at center, rgba(17, 24, 39, 0.85) 0%, rgba(99, 102, 241, 0.08) 100%)',
      border: '1px solid var(--border-subtle)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.3rem 0.85rem',
          borderRadius: '9999px',
          background: 'rgba(244, 63, 94, 0.12)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          color: '#fb7185',
          fontSize: '0.78rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          <Sparkles size={13} />
          <span>{content.eyebrow}</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}>
          {content.title}
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          marginTop: '0.75rem',
          lineHeight: 1.6,
        }}>
          {content.subtitle}
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem',
      }}>
        {content.pillars.map((pillar, idx) => {
          const colors = colorList[idx % colorList.length];
          const icon = iconList[idx % iconList.length];

          return (
            <div
              key={pillar.id || idx}
              className="glass-card"
              style={{
                padding: '1.75rem',
                borderRadius: '1.1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.85rem',
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  marginBottom: '1.25rem',
                }}>
                  {icon}
                </div>

                <span style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--accent-purple)',
                  marginBottom: '0.4rem',
                }}>
                  {pillar.tag}
                </span>

                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '0.6rem',
                  lineHeight: 1.3,
                }}>
                  {pillar.title}
                </h3>

                <p style={{
                  fontSize: '0.86rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  {pillar.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Campus Intranet Portal Teaser Bar */}
      <div style={{
        background: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-accent)',
        borderRadius: '1rem',
        padding: '1.25rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '0.75rem',
            background: 'rgba(79, 70, 229, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Building size={20} color="var(--primary)" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Enrolled in a REACTJav Programme?
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
              Access the Campus Intranet for timed CBT certification exams, live virtual meeting rooms, and peer code sandboxes.
            </p>
          </div>
        </div>

        <Link
          href="/intranet"
          className="btn btn-primary btn-sm"
          style={{ gap: '0.45rem', padding: '0.55rem 1.25rem' }}
        >
          <span>Enter Campus Intranet</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
