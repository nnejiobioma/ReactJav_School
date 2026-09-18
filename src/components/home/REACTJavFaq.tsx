'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function REACTJavFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the $5/month or Mastercard Foundation sponsorship model work?',
      a: 'Through our historic partnership with the Mastercard Foundation, eligible African applicants receive heavily subsidized access to our global curriculum, cloud sandboxes, and tech hubs. A nominal commitment fee of $5/month ensures learners have skin in the game while keeping education 100% accessible to anyone regardless of financial background.',
    },
    {
      q: 'What is the weekly time commitment, and can I learn while working?',
      a: 'Most intensive engineering tracks (such as Full-Stack Web Development and Data Analytics) require 20 to 30 hours per week of dedicated problem solving. Programs are structured flexibly with asynchronous modules and evening/weekend cohort standups, enabling motivated professionals and university students to participate.',
    },
    {
      q: 'Do I need prior coding or technical experience to apply?',
      a: 'Foundational programmes such as AI Career Essentials (AiCE), UI/UX Design Systems, and Data Analytics Academy are beginner-friendly and start from first principles. Advanced tracks like Deep Learning & Cloud DevOps recommend basic programming familiarity.',
    },
    {
      q: 'How do physical hubs and the Virtual Campus Intranet integrate?',
      a: 'Learners can study from anywhere with a computer and internet connection for high-speed Wi-Fi, power, and in-person hackathons. Simultaneously, our online Campus Intranet provides 24/7 access to timed CBT certification exams, live virtual meeting rooms, and peer code review queues. You can book a slot anytime to study with your peers at any time both physically and virtuall',
    },
    {
      q: 'Will I receive an industry-recognized certificate upon completion?',
      a: 'Yes. Upon successfully defending your capstone project and scoring 70%+ on the timed CBT examination, you will be awarded an encrypted, verifiable digital certificate. You will also have the option of downloading your testimonila and transcript which shows all your activities.',
    },
  ];

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
          <span>Got Questions?</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}>
          Frequently Asked Questions
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: '620px',
          margin: '0.5rem auto 0',
        }}>
          Everything you need to know about admissions, sponsorship, and our learning framework.
        </p>
      </div>

      <div style={{
        maxWidth: '820px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.q}
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
                  {faq.q}
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
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
