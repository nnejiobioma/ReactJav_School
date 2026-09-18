'use client';

import React from 'react';
import { AcademyTrack, getTutoringWhatsAppUrl } from '@/data/academyTracks';
import { ArrowRight, BookOpen, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

interface TrackCardProps {
  track: AcademyTrack;
  onSelectTrack: (track: AcademyTrack) => void;
  onBookTutoring: (track: AcademyTrack) => void;
}

export default function TrackCard({ track, onSelectTrack, onBookTutoring }: TrackCardProps) {
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-subtle)',
        borderLeft: '4px solid var(--primary)',
        borderRadius: '1.25rem',
        padding: '1.75rem',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="group-hover-card"
    >
      {/* Top Header: Icon & Tier */}
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div
          style={{
            width: '3.75rem',
            height: '3.75rem',
            borderRadius: '1rem',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.85rem',
            flexShrink: 0,
          }}
        >
          {track.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                background: 'rgba(79, 70, 229, 0.08)',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.4rem',
              }}
            >
              Track
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
              }}
            >
              {track.tier}
            </span>
          </div>

          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              margin: '0.2rem 0',
            }}
          >
            {track.name}
          </h3>
          <p
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              margin: 0,
            }}
          >
            {track.sub}
          </p>
        </div>
      </div>

      {/* Description Snippet */}
      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          margin: '0 0 1.25rem 0',
        }}
      >
        {track.description}
      </p>

      {/* Curriculum Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.45rem',
          marginBottom: '1.5rem',
        }}
      >
        {track.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              padding: '0.3rem 0.65rem',
              borderRadius: '0.5rem',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Card Action Row */}
      <div
        style={{
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button
            onClick={() => onBookTutoring(track)}
            className="btn btn-primary btn-sm"
            style={{
              flex: 1,
              padding: '0.65rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px -2px rgba(16, 185, 129, 0.35)',
              cursor: 'pointer',
            }}
          >
            <Sparkles size={15} />
            <span>Enrol in Track</span>
          </button>

          <button
            onClick={() => onSelectTrack(track)}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.65rem 0.95rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
            }}
            title="View Syllabus & Roadmap"
          >
            <BookOpen size={15} />
            <span>Syllabus</span>
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          <CheckCircle2 size={12} color="var(--accent-emerald)" />
          <span>Personalised 1-on-1 Mentorship</span>
        </div>
      </div>
    </div>
  );
}
