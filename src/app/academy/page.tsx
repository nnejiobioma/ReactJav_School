'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ACADEMY_TRACKS, 
  AcademyTrack, 
  TUTORING_METRICS, 
  TUTORING_PERKS, 
  getTutoringWhatsAppUrl 
} from '@/data/academyTracks';
import TrackCard from '@/components/academy/TrackCard';
import TrackDetailsModal from '@/components/academy/TrackDetailsModal';
import TutoringBookingModal from '@/components/academy/TutoringBookingModal';
import { 
  GraduationCap, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  Users, 
  Zap, 
  FolderGit2, 
  CalendarClock, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function AcademyPage() {
  const [selectedTrack, setSelectedTrack] = useState<AcademyTrack | null>(null);
  const [bookingTrack, setBookingTrack] = useState<AcademyTrack | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Group tracks by zone
  const zone01Tracks = ACADEMY_TRACKS.filter(t => t.zone === 'zone-01');
  const zone02Tracks = ACADEMY_TRACKS.filter(t => t.zone === 'zone-02');

  const handleOpenBooking = (track?: AcademyTrack) => {
    setBookingTrack(track || null);
    setIsBookingOpen(true);
  };

  const getPerkIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users size={24} color="var(--primary)" />;
      case 'Zap': return <Zap size={24} color="var(--accent-amber)" />;
      case 'FolderGit2': return <FolderGit2 size={24} color="var(--accent-emerald)" />;
      case 'CalendarClock': return <CalendarClock size={24} color="var(--accent-cyan)" />;
      default: return <Sparkles size={24} color="var(--primary)" />;
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Background Decorative Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.18) 0%, rgba(79, 70, 229, 0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0) 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '3.5rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-accent)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '1.75rem',
            }}
          >
            <Sparkles size={14} color="var(--primary)" />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
              }}
            >
              ReactJav Academy • Direct 1-on-1 Tutoring
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.08,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
            }}
          >
            Engineering Mastery for{' '}
            <br />
            <span
              style={{
                background: 'var(--grad-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              The Next Generation
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              fontWeight: 500,
            }}
          >
            From foundational logic to professional-grade deployment, our tiered tracks ensure students don’t just learn to code—they learn to engineer the future with private, expert-led 1-on-1 mentorship.
          </p>

          {/* Hero CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleOpenBooking()}
              className="btn btn-primary"
              style={{
                padding: '0.9rem 2.25rem',
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px -2px rgba(16, 185, 129, 0.45)',
                cursor: 'pointer',
              }}
            >
              <Sparkles size={18} />
              <span>Book 1-on-1 Discovery Chat</span>
            </button>

            <a
              href="#learning-zones"
              className="btn btn-secondary"
              style={{
                padding: '0.9rem 1.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                textDecoration: 'none',
              }}
            >
              <span>Explore Learning Zones</span>
              <ArrowRight size={16} />
            </a>

            <a
              href={getTutoringWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                padding: '0.9rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                borderRadius: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
              }}
            >
              <MessageSquare size={17} color="var(--accent-emerald)" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Dual-Zone Learning Pathways Grid */}
        <div id="learning-zones" style={{ marginBottom: '6rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'start',
            }}
          >
            {/* ZONE 01: FOUNDATION & EXPLORER */}
            <div id="zone-01" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div
                style={{
                  position: 'relative',
                  paddingLeft: '1.25rem',
                  borderLeft: '3px solid var(--primary)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    marginBottom: '0.35rem',
                  }}
                >
                  Zone 01
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Foundation & Explorer
                </h2>
                <p
                  style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.4rem',
                    lineHeight: 1.5,
                  }}
                >
                  Ages 6–13: digital literacy, computational logic, Python fundamentals, and applied AI literacy.
                </p>
              </div>

              {/* Zone 01 Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {zone01Tracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    onSelectTrack={(t) => setSelectedTrack(t)}
                    onBookTutoring={(t) => handleOpenBooking(t)}
                  />
                ))}
              </div>
            </div>

            {/* ZONE 02: BUILDER & PROFESSIONAL */}
            <div id="zone-02" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div
                style={{
                  position: 'relative',
                  paddingLeft: '1.25rem',
                  borderLeft: '3px solid var(--accent-purple)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-purple)',
                    marginBottom: '0.35rem',
                  }}
                >
                  Zone 02
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Builder & Professional
                </h2>
                <p
                  style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.4rem',
                    lineHeight: 1.5,
                  }}
                >
                  Ages 14–17+: web development, mobile app systems, interface design, and workforce readiness pathways.
                </p>
              </div>

              {/* Zone 02 Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {zone02Tracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    onSelectTrack={(t) => setSelectedTrack(t)}
                    onBookTutoring={(t) => handleOpenBooking(t)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metric Strip (Matching reference) */}
        <div
          style={{
            borderRadius: '1.75rem',
            background: 'var(--bg-surface)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
            marginBottom: '6rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            }}
          >
            {TUTORING_METRICS.map((metric, idx) => (
              <div
                key={metric.label}
                style={{
                  padding: '2.25rem 2rem',
                  borderRight: idx < TUTORING_METRICS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                    fontWeight: 900,
                    color: 'var(--primary)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: '0.35rem',
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-primary)',
                  }}
                >
                  {metric.label}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                  }}
                >
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why 1-on-1 Direct Tutoring Works */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <span
              className="badge badge-primary"
              style={{ fontSize: '0.72rem', padding: '0.3rem 0.8rem', marginBottom: '0.75rem' }}
            >
              The ReactJav Tutoring Advantage
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.85rem, 3vw, 2.6rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
              }}
            >
              Why 1-on-1 Live Tutoring Works
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Unlike pre-recorded video lectures or crowded classrooms, private live mentoring adapts completely to how your learner thinks, solves, and builds.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {TUTORING_PERKS.map((perk) => (
              <div
                key={perk.title}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '1.25rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'transform 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '0.85rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getPerkIcon(perk.icon)}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {perk.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner CTA */}
        <div
          style={{
            padding: '3.5rem 2rem',
            borderRadius: '1.75rem',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
            border: '1px solid var(--border-accent)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '1rem',
              background: 'var(--grad-primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 4px 16px rgba(79, 70, 229, 0.35)',
            }}
          >
            <GraduationCap size={32} />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Request Your Personalized Roadmap & Quote
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: '0 auto 2.25rem',
              lineHeight: 1.6,
            }}
          >
            Every journey begins with a complimentary 20-minute discovery chat. We evaluate current experience, discuss passions, and design a customized 1-on-1 learning plan.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleOpenBooking()}
              className="btn btn-primary"
              style={{
                padding: '0.9rem 2.25rem',
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px -2px rgba(16, 185, 129, 0.4)',
              }}
            >
              <Sparkles size={17} />
              <span>Book Discovery Chat</span>
            </button>

            <a
              href={getTutoringWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                padding: '0.9rem 1.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
              }}
            >
              <MessageSquare size={17} color="var(--accent-emerald)" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TrackDetailsModal
        track={selectedTrack}
        onClose={() => setSelectedTrack(null)}
        onBookTutoring={(track) => {
          setSelectedTrack(null);
          handleOpenBooking(track);
        }}
      />

      <TutoringBookingModal
        initialTrack={bookingTrack}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
