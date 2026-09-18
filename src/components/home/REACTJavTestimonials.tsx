'use client';

import React from 'react';
import { Star, Quote, CheckCircle, Building2, Briefcase } from 'lucide-react';

export default function REACTJavTestimonials() {
  const stories = [
    {
      name: 'Ahmed El-Mansouri',
      initialRole: 'Junior Marketer',
      currentRole: 'Strategic Marketing Manager, KIA Morocco',
      track: 'AI Career Essentials (AiCE)',
      company: 'KIA Motors',
      quote: 'What started as learning prompt engineering and AI workflow automation grew into leading our regional AI strategy and stepping into an executive leadership role.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      flag: '🇲🇦 Morocco',
    },
    {
      name: 'Chris Okoth',
      initialRole: 'Unpaid Intern',
      currentRole: 'Full-Stack Software Engineer, Safaricom',
      track: 'Software Engineering',
      company: 'Safaricom',
      quote: 'REACTJav’s "Do Hard Things" mindset fundamentally transformed my technical stamina. The rigorous peer code reviews prepared me directly for enterprise production systems.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      flag: '🇰🇪 Kenya',
    },
    {
      name: 'Amina Bello',
      initialRole: 'Economics Graduate',
      currentRole: 'Senior Data Analyst, Flutterwave',
      track: 'Data Analytics Academy',
      company: 'Flutterwave',
      quote: 'In 6 months, I went from struggling with basic SQL syntax to building predictive customer retention models and interactive executive BI dashboards.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      flag: '🇳🇬 Nigeria',
    },
  ];

  return (
    <section style={{ margin: '4rem 0 3.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{
          fontSize: '0.8rem',
          color: 'var(--accent-emerald)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 700,
        }}>
          Transformation in Action
        </span>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          marginTop: '0.35rem',
          letterSpacing: '-0.02em',
        }}>
          Learner Voices & Proven Career Outcomes
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0.75rem auto 0',
          lineHeight: 1.55,
        }}>
          Real stories from graduates who turned ambition into high-paying engineering roles, venture creation, and international contracts.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {stories.map((story) => (
          <div
            key={story.name}
            className="glass-card"
            style={{
              padding: '1.75rem',
              borderRadius: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span style={{
                  fontSize: '0.725rem',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}>
                  {story.flag}
                </span>
              </div>

              <p style={{
                fontSize: '0.92rem',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: '1.5rem',
              }}>
                "{story.quote}"
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
            }}>
              <img
                src={story.avatar}
                alt={story.name}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--primary)',
                }}
              />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {story.name}
                </h4>
                <p style={{
                  fontSize: '0.775rem',
                  color: 'var(--accent-cyan)',
                  fontWeight: 600,
                  margin: '0.15rem 0',
                }}>
                  {story.currentRole}
                </p>
                <span style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}>
                  Track: {story.track}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
