'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SiteFaqContent } from '@/types';
import { DEFAULT_SITE_CONTENT } from '@/lib/supabase/defaultSiteContent';

interface REACTJavFaqProps {
  content?: SiteFaqContent;
}

export default function REACTJavFaq({ content }: REACTJavFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const data = content || DEFAULT_SITE_CONTENT.faq;

  return (
    <section style={{ margin: '4rem 0 3rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.78rem',
          color: 'var(--accent-cyan)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}>
          <HelpCircle size={14} />
          <span>{data.eyebrow}</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}>
          {data.title}
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: '620px',
          margin: '0.5rem auto 0',
        }}>
          {data.subtitle}
        </p>
      </div>

      <div style={{
        maxWidth: '820px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}>
        {data.items.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id || faq.question}
              className="glass-card"
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '1rem',
                background: isOpen ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                border: isOpen ? '1px solid var(--border-focus)' : '1px solid var(--border-subtle)',
                boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}>
                <h3 style={{
                  fontSize: '1.025rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}>
                  {faq.question}
                </h3>
                <ChevronDown
                  size={18}
                  color={isOpen ? 'var(--primary)' : 'var(--text-muted)'}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.25s ease',
                    flexShrink: 0,
                  }}
                />
              </div>

              {isOpen && (
                <p style={{
                  marginTop: '0.85rem',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.85rem',
                  marginBottom: 0,
                }}>
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
