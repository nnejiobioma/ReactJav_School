'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ACADEMY_TRACKS, 
  AcademyTrack, 
  TUTORING_METRICS, 
  TUTORING_PERKS, 
  getTutoringWhatsAppUrl 
} from '@/data/academyTracks';
import TrackCard from '@/components/academy/TrackCard';
import TrackDetailsModal from '@/components/academy/TrackDetailsModal';
import AdminEditableSection from '@/components/admin/AdminEditableSection';
import AdminSectionEditorModal from '@/components/admin/AdminSectionEditorModal';
import AdminTrackEditorModal from '@/components/academy/AdminTrackEditorModal';
import { LocalDataService } from '@/lib/supabase/client';
import { DEFAULT_SITE_CONTENT } from '@/lib/supabase/defaultSiteContent';
import { SiteContentConfig } from '@/types';
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
  const router = useRouter();
  const [siteContent, setSiteContent] = useState<SiteContentConfig>(DEFAULT_SITE_CONTENT);
  const [tracks, setTracks] = useState<AcademyTrack[]>(ACADEMY_TRACKS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<AcademyTrack | null>(null);
  const [activeEditModal, setActiveEditModal] = useState<{ key: keyof SiteContentConfig; title: string } | null>(null);
  const [editingTrack, setEditingTrack] = useState<AcademyTrack | null>(null);

  useEffect(() => {
    const loadData = () => {
      setSiteContent(LocalDataService.getSiteContent());
      setTracks(LocalDataService.getAcademyTracks());
      const user = LocalDataService.getCurrentUser();
      setIsAdmin((user?.role === 'admin' || user?.role === 'super_admin') && LocalDataService.isEditModeActive());
    };

    loadData();

    window.addEventListener('reactjav-site-content-updated', loadData);
    window.addEventListener('reactjav-edit-mode-toggled', loadData);
    window.addEventListener('storage', loadData);

    return () => {
      window.removeEventListener('reactjav-site-content-updated', loadData);
      window.removeEventListener('reactjav-edit-mode-toggled', loadData);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  // Group tracks by zone
  const zone01Tracks = tracks.filter((t) => t.zone === 'zone-01');
  const zone02Tracks = tracks.filter((t) => t.zone === 'zone-02');

  const heroData = siteContent.tutoring_hero || DEFAULT_SITE_CONTENT.tutoring_hero!;
  const zonesData = siteContent.tutoring_zones || DEFAULT_SITE_CONTENT.tutoring_zones!;
  const metricsData = siteContent.tutoring_metrics || DEFAULT_SITE_CONTENT.tutoring_metrics!;
  const perksData = siteContent.tutoring_perks || DEFAULT_SITE_CONTENT.tutoring_perks!;
  const ctaData = siteContent.tutoring_bottom_cta || DEFAULT_SITE_CONTENT.tutoring_bottom_cta!;

  const handleOpenBooking = (track?: AcademyTrack) => {
    const trackId = track?.id || 'junior-dev-track';
    const formUrl = `/tutoring/enroll?trackId=${encodeURIComponent(trackId)}`;
    const currentUser = LocalDataService.getCurrentUser();

    if (!currentUser || currentUser.id === 'guest') {
      router.push(`/auth?mode=signup&tutoringTrackId=${encodeURIComponent(trackId)}&redirect=${encodeURIComponent(formUrl)}`);
    } else {
      router.push(formUrl);
    }
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

  const dynamicMetrics = [
    {
      value: metricsData.metric_1_value,
      label: metricsData.metric_1_label,
      sub: metricsData.metric_1_sub,
    },
    {
      value: metricsData.metric_2_value,
      label: metricsData.metric_2_label,
      sub: metricsData.metric_2_sub,
    },
    {
      value: metricsData.metric_3_value,
      label: metricsData.metric_3_label,
      sub: metricsData.metric_3_sub,
    },
    {
      value: metricsData.metric_4_value,
      label: metricsData.metric_4_label,
      sub: metricsData.metric_4_sub,
    },
  ];

  const dynamicPerks = [
    {
      title: perksData.perk_1_title,
      description: perksData.perk_1_desc,
      icon: 'Users',
    },
    {
      title: perksData.perk_2_title,
      description: perksData.perk_2_desc,
      icon: 'Zap',
    },
    {
      title: perksData.perk_3_title,
      description: perksData.perk_3_desc,
      icon: 'FolderGit2',
    },
    {
      title: perksData.perk_4_title,
      description: perksData.perk_4_desc,
      icon: 'CalendarClock',
    },
  ];

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
        <AdminEditableSection
          sectionKey="tutoring_hero"
          sectionTitle="Direct Tutoring Hero & CTAs"
          onEdit={() => setActiveEditModal({ key: 'tutoring_hero', title: 'Direct Tutoring Hero & CTAs' })}
        >
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
                {heroData.badge}
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
              {heroData.title_prefix}{' '}
              <br />
              <span
                style={{
                  background: 'var(--grad-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {heroData.title_highlight}
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
              {heroData.subtitle}
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
                <span>{heroData.cta_primary_text}</span>
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
                <span>{heroData.cta_secondary_text}</span>
                <ArrowRight size={16} />
              </a>

              <a
                href={getTutoringWhatsAppUrl(undefined, heroData.whatsapp_number)}
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
                <span>{heroData.cta_whatsapp_text}</span>
              </a>
            </div>
          </div>
        </AdminEditableSection>

        {/* Dual-Zone Learning Pathways Grid */}
        <AdminEditableSection
          sectionKey="tutoring_zones"
          sectionTitle="Learning Zones Scope & Headers"
          onEdit={() => setActiveEditModal({ key: 'tutoring_zones', title: 'Learning Zones Scope & Headers' })}
        >
          <div id="learning-zones" style={{ marginBottom: '6rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1.5rem, 4vw, 3.5rem)',
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
                    {zonesData.zone_1_badge}
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
                    {zonesData.zone_1_title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.925rem',
                      color: 'var(--text-secondary)',
                      marginTop: '0.4rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {zonesData.zone_1_subtitle}
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
                      onEditTrack={(t) => setEditingTrack(t)}
                      isAdmin={isAdmin}
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
                    {zonesData.zone_2_badge}
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
                    {zonesData.zone_2_title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.925rem',
                      color: 'var(--text-secondary)',
                      marginTop: '0.4rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {zonesData.zone_2_subtitle}
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
                      onEditTrack={(t) => setEditingTrack(t)}
                      isAdmin={isAdmin}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AdminEditableSection>

        {/* Impact Metric Strip */}
        <AdminEditableSection
          sectionKey="tutoring_metrics"
          sectionTitle="Tutoring Impact Metrics"
          onEdit={() => setActiveEditModal({ key: 'tutoring_metrics', title: 'Tutoring Impact Metrics' })}
        >
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
              {dynamicMetrics.map((metric, idx) => (
                <div
                  key={metric.label || idx}
                  style={{
                    padding: '2.25rem 2rem',
                    borderRight: idx < dynamicMetrics.length - 1 ? '1px solid var(--border-subtle)' : 'none',
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
        </AdminEditableSection>

        {/* Why 1-on-1 Direct Tutoring Works */}
        <AdminEditableSection
          sectionKey="tutoring_perks"
          sectionTitle="Why 1-on-1 Tutoring Works (Perks)"
          onEdit={() => setActiveEditModal({ key: 'tutoring_perks', title: 'Why 1-on-1 Tutoring Works (Perks)' })}
        >
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
              <span
                className="badge badge-primary"
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.8rem', marginBottom: '0.75rem' }}
              >
                {perksData.badge}
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
                {perksData.title}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {perksData.subtitle}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {dynamicPerks.map((perk) => (
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
        </AdminEditableSection>

        {/* Bottom Banner CTA */}
        <AdminEditableSection
          sectionKey="tutoring_bottom_cta"
          sectionTitle="Bottom Roadmap & Quote CTA Banner"
          onEdit={() => setActiveEditModal({ key: 'tutoring_bottom_cta', title: 'Bottom Roadmap & Quote CTA Banner' })}
        >
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
              {ctaData.title}
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
              {ctaData.subtitle}
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
                <span>{ctaData.cta_primary_text}</span>
              </button>

              <a
                href={getTutoringWhatsAppUrl(undefined, ctaData.whatsapp_number)}
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
                <span>{ctaData.cta_whatsapp_text}</span>
              </a>
            </div>
          </div>
        </AdminEditableSection>
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

      {/* Admin Section Editor Modal */}
      <AdminSectionEditorModal
        sectionKey={activeEditModal?.key || null}
        sectionTitle={activeEditModal?.title || ''}
        isOpen={!!activeEditModal}
        onClose={() => setActiveEditModal(null)}
        onSaved={() => {
          setSiteContent(LocalDataService.getSiteContent());
        }}
      />

      {/* Admin Track Editor Modal */}
      <AdminTrackEditorModal
        track={editingTrack}
        isOpen={!!editingTrack}
        onClose={() => setEditingTrack(null)}
        onSaved={() => {
          setTracks(LocalDataService.getAcademyTracks());
        }}
      />
    </div>
  );
}
