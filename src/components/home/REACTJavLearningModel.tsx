'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Users, MapPin, ShieldCheck, HeartHandshake, ArrowRight, Building, Sparkles } from 'lucide-react';

export default function REACTJavLearningModel() {
  const pillars = [
    {
      title: 'Hard Things First',
      description: 'Passive tutorials create an illusion of competence that evaporates the second you face a blank terminal. We throw you into complex, production-grade architecture on day one so you learn how to debug, structure, and think under pressure. By confronting the hardest problems upfront, everyday engineering stops feeling intimidating.',
      icon: <Target size={24} color="#f43f5e" />,
      highlight: 'Project-First Pedagogy',
      color: 'rgba(244, 63, 94, 0.15)',
      borderColor: 'rgba(244, 63, 94, 0.3)',
    },
    {
      title: 'Self Passed and Contact Learning',
      description: 'While the curriculum is self-paced, you are never alone. Every cohort is divided into small peer pods that conduct synchronous code reviews, daily standups, and pair programming challenges. This structure ensures you build the self-discipline to progress independently while maintaining the accountability of a close-knit team.',
      icon: <MapPin size={24} color="#38bdf8" />,
      highlight: 'Hybrid Infrastructure',
      color: 'rgba(56, 189, 248, 0.15)',
      borderColor: 'rgba(56, 189, 248, 0.3)',
    },
    {
      title: 'Peer-to-Peer Pods & Code Reviews',
      description: 'You will never learn in isolation. Every learner belongs to a peer pod, conducting synchronous code reviews, daily standups, and pairing on group engineering challenges.',
      icon: <Users size={24} color="#818cf8" />,
      highlight: 'High-Accountability Cohorts',
      color: 'rgba(99, 102, 241, 0.15)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    {
      title: 'Sponsorship for students with financial needs',
      description: 'We provide fully subsidized tuition to eligible talented students, democratizing elite software and AI education.',
      icon: <HeartHandshake size={24} color="#10b981" />,
      highlight: 'For Financially Needy Students',
      color: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
    },
  ];

  return (
    <section style={{
      margin: '4.5rem 0',
      padding: '3rem 2rem',
      borderRadius: '1.5rem',
      background: 'radial-gradient(ellipse at center, rgba(17, 24, 39, 0.85) 0%, rgba(9, 12, 19, 0.98) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
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
          <span>The REACTJav Learning Framework</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}>
          Global Quality, World-Class Accessibility.
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          marginTop: '0.75rem',
          lineHeight: 1.6,
        }}>
          We’ve re-engineered higher education for the digital age. By fusing world-class curriculum with peer accountability and subsidized access, our learners achieve 5x faster career transformation.
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem',
      }}>
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
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
                background: pillar.color,
                border: `1px solid ${pillar.borderColor}`,
                marginBottom: '1.25rem',
              }}>
                {pillar.icon}
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
                {pillar.highlight}
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
        ))}
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
