'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { SiteTestimonialsContent } from '@/types';
import { DEFAULT_SITE_CONTENT } from '@/lib/supabase/defaultSiteContent';

interface REACTJavTestimonialsProps {
  content?: SiteTestimonialsContent;
}

export default function REACTJavTestimonials({ content }: REACTJavTestimonialsProps) {
  const data = content || DEFAULT_SITE_CONTENT.testimonials;

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
          {data.eyebrow}
        </span>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          marginTop: '0.35rem',
          letterSpacing: '-0.02em',
        }}>
          {data.title}
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0.75rem auto 0',
          lineHeight: 1.55,
        }}>
          {data.subtitle}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {data.items.map((story) => (
          <div
            key={story.id || story.name}
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
                  color: 'var(--accent-cyan)',
                  fontWeight: 600,
                }}>
                  {story.outcome}
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
                src={story.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
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
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  margin: '0.15rem 0',
                }}>
                  {story.role}
                </p>
                <span style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}>
                  Outcome: {story.outcome}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
