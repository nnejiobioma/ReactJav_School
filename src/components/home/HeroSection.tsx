'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Sparkles, Flame, Users, Award, Globe, DollarSign, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}: HeroSectionProps) {
  return (
    <section style={{
      padding: '2rem 0 2.5rem',
      position: 'relative',
      textAlign: 'center',
    }}>
      {/* Top Announcement Bar - REACTJav Cohort Notice */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.6rem',
        padding: '0.45rem 1.25rem',
        borderRadius: '9999px',
        background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.35)',
        marginBottom: '1.75rem',
        fontSize: '0.85rem',
        color: '#fca5a5',
        fontWeight: 600,
        boxShadow: '0 0 25px rgba(239, 68, 68, 0.15)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          color: '#f87171',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
        }}>
          <Flame size={14} color="#ef4444" />
          <span>2026 Admissions Open</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
        <span style={{ color: '#e2e8f0' }}>
          Sponsored Programmes & Flexible Access Across the world
        </span>
        <a
          href="#programmes-catalog"
          style={{
            color: '#60a5fa',
            textDecoration: 'none',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.2rem',
            marginLeft: '0.25rem',
          }}
        >
          <span>Explore Below</span>
          <ArrowRight size={13} />
        </a>
      </div>

      {/* Hero Eyebrow */}
      <div style={{
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        fontSize: '0.85rem',
        fontWeight: 800,
        color: 'var(--accent-cyan)',
        marginBottom: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
      }}>
        <Sparkles size={16} color="var(--accent-cyan)" />
        <span>Learn Hard Things First • A World-Class Tech Academy</span>
      </div>

      {/* Main REACTJav Hero Headline */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
        fontWeight: 900,
        letterSpacing: '-0.035em',
        lineHeight: 1.12,
        maxWidth: '960px',
        margin: '0 auto 1.5rem',
        color: 'var(--text-primary)',
      }}>
        Every Programme Leads to a{' '}
        <span style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 50%, #db2777 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Real Career Outcome.
        </span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
        color: 'var(--text-secondary)', maxWidth: '740px',
        margin: '0 auto 2.5rem',
        lineHeight: 1.6,
      }}>
        Master high-paying skills in AI, Data, Software Engineering, Game Design and Digital Leadership.
        Learn with peers, build production portfolios, and access subsidized tuition via global foundation partnerships.
      </p>

      {/* Search Input Bar */}
      <div style={{
        maxWidth: '640px',
        margin: '0 auto 1.25rem',
        position: 'relative',
      }}>
        <Search
          size={20}
          color="var(--text-muted)"
          style={{
            position: 'absolute',
            left: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
        <input
          type="text"
          placeholder="Search by programme, tech tool (Python, React, SQL...), or career..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input"
          style={{
            paddingLeft: '3.2rem',
            paddingRight: '1.5rem',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            borderRadius: '9999px',
            fontSize: '1.025rem',
            background: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
          }}
        />
      </div>

      {/* Quick Search Suggestions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        marginBottom: '2.5rem',
      }}>
        <span style={{ fontWeight: 600 }}>Quick suggestions:</span>
        {['AI Essentials', 'Full-Stack Next.js', 'Data Analytics', 'Cloud DevOps', 'UI/UX Design', 'Founder Academy', 'Game Development'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSearchQuery(tag === searchQuery ? '' : tag)}
            style={{
              background: searchQuery === tag ? 'var(--primary)' : 'var(--bg-surface)',
              border: searchQuery === tag ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
              color: searchQuery === tag ? '#ffffff' : 'var(--text-secondary)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 500,
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* REACTJav Impact Statistics Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '1rem',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <div className="glass-card" style={{
          padding: '1.1rem 1.25rem',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '0.75rem',
            background: 'rgba(56, 189, 248, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Users size={22} color="var(--accent-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              350,000+
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', fontWeight: 500 }}>
              Graduates & Learners
            </div>
          </div>
        </div>

        <div className="glass-card" style={{
          padding: '1.1rem 1.25rem',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '0.75rem',
            background: 'rgba(16, 185, 129, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Award size={22} color="var(--accent-emerald)" />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              85%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', fontWeight: 500 }}>
              Career Placement Rate
            </div>
          </div>
        </div>

        <div className="glass-card" style={{
          padding: '1.1rem 1.25rem',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '0.75rem',
            background: 'rgba(139, 92, 246, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Globe size={22} color="var(--accent-purple)" />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Global Access
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', fontWeight: 500 }}>
              Across The Globe
            </div>
          </div>
        </div>

        <div className="glass-card" style={{
          padding: '1.1rem 1.25rem',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '0.75rem',
            background: 'rgba(245, 158, 11, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <DollarSign size={22} color="var(--accent-amber)" />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Upto 100%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', fontWeight: 500 }}>
              Scholarship Access
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
