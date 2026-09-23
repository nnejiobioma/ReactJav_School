'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import CourseCard from '@/components/home/CourseCard';
import REACTJavTrackOverview from '@/components/home/REACTJavTrackOverview';
import REACTJavLearningModel from '@/components/home/REACTJavLearningModel';
import REACTJavTestimonials from '@/components/home/REACTJavTestimonials';
import REACTJavFaq from '@/components/home/REACTJavFaq';
import AdminEditableSection from '@/components/admin/AdminEditableSection';
import AdminSectionEditorModal from '@/components/admin/AdminSectionEditorModal';
import { Course, Profile, SiteContentConfig } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { DEFAULT_SITE_CONTENT } from '@/lib/supabase/defaultSiteContent';
import { 
  BookOpen, 
  Sparkles, 
  Filter, 
  ShieldCheck, 
  ArrowRight, 
  Building, 
  Flame, 
  CheckCircle2, 
  GraduationCap, 
  Calendar,
  Layers,
  MessageSquare
} from 'lucide-react';
import { getTutoringWhatsAppUrl } from '@/data/academyTracks';

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [siteContent, setSiteContent] = useState<SiteContentConfig>(DEFAULT_SITE_CONTENT);
  const [activeEditModal, setActiveEditModal] = useState<{ key: keyof SiteContentConfig; title: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All Programmes');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    setCourses(LocalDataService.getCourses());
    setCurrentUser(LocalDataService.getCurrentUser());
    setSiteContent(LocalDataService.getSiteContent());

    const handleStorageChange = () => {
      setCourses(LocalDataService.getCourses());
      setCurrentUser(LocalDataService.getCurrentUser());
      setSiteContent(LocalDataService.getSiteContent());
    };

    const handleSiteContentUpdate = () => {
      setSiteContent(LocalDataService.getSiteContent());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('reactjav-site-content-updated', handleSiteContentUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('reactjav-site-content-updated', handleSiteContentUpdate);
    };
  }, []);

  const tracks = [
    'All Programmes',
    'AI & Data',
    'Software Engineering',
    'Creative & Design',
    'Entrepreneurship',
  ];

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter courses by track, search, level, and status
  const filteredCourses = courses.filter((c) => {
    const matchesTrack = 
      selectedTrack === 'All Programmes' || 
      c.track === selectedTrack || 
      c.category === selectedTrack;

    const matchesSearch =
      searchQuery.trim() === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.skills && c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (c.outcome_hook && c.outcome_hook.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLevel = 
      selectedLevel === 'All Levels' || 
      c.level === selectedLevel;

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Now Open' && c.is_now_open) ||
      (selectedStatus === 'Popular' && c.is_popular);

    return matchesTrack && matchesSearch && matchesLevel && matchesStatus;
  });

  // Flagship Spotlight Course
  const flagshipCourse = courses.find(c => c.id === 'crs_aice_03') || courses[0];

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      {/* REACTJav-Style Hero Section with Search & Metrics */}
      <AdminEditableSection
        sectionKey="hero"
        sectionTitle="Hero & Platform Metrics"
        onEdit={() => setActiveEditModal({ key: 'hero', title: 'Hero & Platform Metrics' })}
      >
        <HeroSection
          content={siteContent.hero}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedTrack}
          setSelectedCategory={setSelectedTrack}
          categories={tracks}
        />
      </AdminEditableSection>

      {/* Flagship Programme Spotlight Banner */}
      {flagshipCourse && (
        <AdminEditableSection
          sectionKey="flagship"
          sectionTitle="Flagship Programme Spotlight Banner"
          onEdit={() => setActiveEditModal({ key: 'flagship', title: 'Flagship Programme Spotlight Banner' })}
        >
          <div style={{
            margin: '2.5rem 0 3.5rem',
            padding: 'clamp(1.25rem, 3vw, 2.5rem)',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
            border: '1px solid var(--border-accent)',
            boxShadow: 'var(--shadow-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2rem',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background Ambient Glow */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }} />

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#f87171',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}>
                <Flame size={13} color="#ef4444" />
                <span>{siteContent.flagship?.badge || 'Flagship Programme • High Demand'}</span>
              </div>

              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: 1.25,
                marginBottom: '0.75rem',
              }}>
                {siteContent.flagship?.title || flagshipCourse.title}
              </h2>

              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                maxWidth: '560px',
              }}>
                {siteContent.flagship?.description || flagshipCourse.outcome_hook || flagshipCourse.description}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                marginBottom: '1.75rem',
                fontSize: '0.85rem',
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Next Intake</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                    {siteContent.flagship?.next_intake || flagshipCourse.cohort_date || 'April 2026'}
                  </span>
                </div>
                <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Duration</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                    {siteContent.flagship?.duration || (flagshipCourse.duration_weeks ? `${flagshipCourse.duration_weeks} Weeks` : 'Self-Paced')}
                  </span>
                </div>
                <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Sponsorship</span>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>
                    {siteContent.flagship?.sponsorship || flagshipCourse.sponsorship_note || 'Sponsored'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <Link
                  href={`/courses/${flagshipCourse.slug}`}
                  className="btn btn-primary"
                  style={{
                    padding: '0.7rem 1.4rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    gap: '0.5rem',
                  }}
                >
                  <span>{siteContent.flagship?.cta_primary_text || 'Explore Full Syllabus'}</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/subscribe"
                  className="btn btn-outline"
                  style={{
                    padding: '0.7rem 1.4rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <span>{siteContent.flagship?.cta_secondary_text || 'Check Eligibility & Grants'}</span>
                </Link>
              </div>
            </div>

            {/* Right Image Graphic */}
            <div style={{
              position: 'relative',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxHeight: '280px',
            }}>
              <img
                src={siteContent.flagship?.thumbnail_url || flagshipCourse.thumbnail_url}
                alt={siteContent.flagship?.title || flagshipCourse.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(10, 13, 22, 0.85) 100%)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span className="badge badge-emerald">
                  {siteContent.flagship?.partner_badge || 'Mastercard Foundation Partnered'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>
                  {siteContent.flagship?.enrolled_count_text || '8,400+ Enrolled'}
                </span>
              </div>
            </div>
          </div>
        </AdminEditableSection>
      )}

      {/* Main Catalog Header with REACTJav Track Filter Pills */}
      <AdminEditableSection
        sectionKey="catalog_header"
        sectionTitle="Course Catalog Header & Intro"
        onEdit={() => setActiveEditModal({ key: 'catalog_header', title: 'Course Catalog Header & Intro' })}
      >
        <div id="programmes-catalog" style={{
          margin: '2rem 0 1.5rem',
          paddingTop: '1.5rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            <div>
              <span style={{
                fontSize: '0.78rem',
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 700,
              }}>
                {siteContent.catalog_header?.eyebrow || 'Catalogue of Specializations'}
              </span>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                margin: '0.25rem 0 0',
              }}>
                {siteContent.catalog_header?.title || 'All REACTJav Programmes'}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-surface)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid var(--border-subtle)',
              }}>
                Showing {filteredCourses.length} of {courses.length} Programmes
              </span>
            </div>
          </div>

          {/* REACTJav Track Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '1.5rem',
          }}>
            {tracks.map((track) => {
              const isActive = selectedTrack === track;
              return (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  style={{
                    padding: '0.6rem 1.3rem',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    background: isActive ? 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' : 'var(--bg-surface)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: isActive ? '0 4px 15px rgba(37, 99, 235, 0.35)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {track}
                </button>
              );
            })}
          </div>

          {/* Secondary Sub-filters: Level & Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            fontSize: '0.825rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Filter size={14} />
                Filter by Level:
              </span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '0.5rem',
                    background: selectedLevel === lvl ? 'var(--bg-surface-elevated)' : 'transparent',
                    color: selectedLevel === lvl ? 'var(--text-primary)' : 'var(--text-muted)',
                    border: selectedLevel === lvl ? '1px solid var(--border-accent)' : '1px solid transparent',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: selectedLevel === lvl ? 600 : 400,
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Status:</span>
              {['All', 'Now Open', 'Popular'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '0.5rem',
                    background: selectedStatus === status ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    color: selectedStatus === status ? 'var(--primary)' : 'var(--text-muted)',
                    border: selectedStatus === status ? '1px solid var(--border-accent)' : '1px solid transparent',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: selectedStatus === status ? 600 : 400,
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AdminEditableSection>

      {/* REACTJav Programme Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.25rem)',
          marginBottom: '4rem',
        }}>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              userId={currentUser?.id}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem', marginBottom: '4rem' }}>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            No programmes found matching your filters in <strong>{selectedTrack}</strong>.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTrack('All Programmes');
              setSelectedLevel('All Levels');
              setSelectedStatus('All');
            }}
            className="btn btn-secondary btn-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Explore Career Pathways Section */}
      <REACTJavTrackOverview onSelectTrack={(track) => {
        setSelectedTrack(track);
        const catalogEl = document.getElementById('programmes-catalog');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
      }} />

      {/* Partition Architecture Gateway Card: Public Catalog vs Campus Intranet */}
      <AdminEditableSection
        sectionKey="partition_gateway"
        sectionTitle="Partition Architecture Gateway"
        onEdit={() => setActiveEditModal({ key: 'partition_gateway', title: 'Partition Architecture Gateway' })}
      >
        <div style={{
          margin: '4rem 0',
          padding: '2.5rem',
          borderRadius: '1.5rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-accent)',
          boxShadow: 'var(--shadow-xl)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 700,
            }}>
              {siteContent.partition_gateway?.eyebrow || 'Platform Partition Architecture'}
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
              {siteContent.partition_gateway?.title_prefix || 'Choose Your Destination:'}{' '}
              <span className="text-gradient">
                {siteContent.partition_gateway?.title_public_highlight || 'Public Catalog'}
              </span>{' '}
              or{' '}
              <span style={{ color: '#10b981' }}>
                {siteContent.partition_gateway?.title_intranet_highlight || 'Campus Intranet'}
              </span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              {siteContent.partition_gateway?.subtitle || 'Explore open syllabi publicly or access the gated internal campus for certified testing and live collaboration.'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
          }}>
            {/* Partition 1: Public Catalog */}
            <div style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1.1rem',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '0.65rem',
                    background: 'rgba(99, 102, 241, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <BookOpen size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {siteContent.partition_gateway?.public_title || 'Part 1: The Public Catalog'}
                    </h3>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                      {siteContent.partition_gateway?.public_badge || 'Open to All Visitors'}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                  {siteContent.partition_gateway?.public_description || 'Browse full engineering course outlines, syllabi breakdowns, lesson objectives, instructor profiles, and free preview lectures without login requirements.'}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  {(siteContent.partition_gateway?.public_bullets || [
                    'Unlimited course catalog exploration',
                    'Syllabus & curriculum inspection',
                    'Transparent tuition plan comparisons',
                  ]).map((bullet, idx) => (
                    <li key={idx}>✓ {bullet}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href="#programmes-catalog"
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <span>{siteContent.partition_gateway?.public_cta_1_text || 'Browse Curricula'}</span>
                </a>
                <Link
                  href="/subscribe"
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <span>{siteContent.partition_gateway?.public_cta_2_text || 'Tuition & Plans'}</span>
                </Link>
              </div>
            </div>

            {/* Partition 2: Campus Intranet */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, var(--bg-surface-elevated) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '1.1rem',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '0.65rem',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <ShieldCheck size={20} color="var(--accent-emerald)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {siteContent.partition_gateway?.intranet_title || 'Part 2: The Campus Intranet'}
                    </h3>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                      {currentUser?.admin_granted || currentUser?.role !== 'student' 
                        ? 'Access Granted' 
                        : (siteContent.partition_gateway?.intranet_badge || 'Gated: Subscription & Admin Clearance')}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                  {siteContent.partition_gateway?.intranet_description || 'Private internal facility containing timed CBT examinations with certificate printouts, live virtual rooms with 1080p screen sharing, and code archives.'}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  {(siteContent.partition_gateway?.intranet_bullets || [
                    'Timed 60-min CBT Examination Center',
                    'Live Virtual Meeting Rooms & Breakout Pods',
                    'Enrolled Course Player & Internal Code Sandbox',
                  ]).map((bullet, idx) => (
                    <li key={idx}>🔒 {bullet}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link
                  href="/intranet"
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, justifyContent: 'center', gap: '0.4rem' }}
                >
                  <Building size={14} />
                  <span>{siteContent.partition_gateway?.intranet_cta_text || 'Enter Campus Intranet'}</span>
                  <ArrowRight size={14} />
                </Link>
                {currentUser?.role === 'student' && !currentUser?.admin_granted && (
                  <Link
                    href="/subscribe"
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <span>Pay Tuition</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminEditableSection>

      {/* The REACTJav Learning Framework & Hub Ecosystem */}
      <AdminEditableSection
        sectionKey="learning_model"
        sectionTitle="REACTJav Learning Framework Pillars"
        onEdit={() => setActiveEditModal({ key: 'learning_model', title: 'REACTJav Learning Framework Pillars' })}
      >
        <REACTJavLearningModel content={siteContent.learning_model} />
      </AdminEditableSection>

      {/* Direct 1-on-1 Tutoring & Academy Tracks Spotlight */}
      <AdminEditableSection
        sectionKey="direct_tutoring"
        sectionTitle="Direct 1-on-1 Tutoring & Academy Spotlight"
        onEdit={() => setActiveEditModal({ key: 'direct_tutoring', title: 'Direct 1-on-1 Tutoring & Academy Spotlight' })}
      >
        <div style={{
          margin: '4.5rem 0',
          padding: '3.5rem 2.5rem',
          borderRadius: '1.75rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)',
          border: '1px solid var(--border-accent)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '0.25rem 0.65rem' }}>
                {siteContent.direct_tutoring?.badge || '1-on-1 Direct Tutoring'}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {siteContent.direct_tutoring?.eyebrow || 'ReactJav Academy Tracks & Learning Pathways'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                margin: 0,
              }}>
                {siteContent.direct_tutoring?.title || 'Prefer Dedicated 1-on-1 Mentorship?'}
              </h2>
              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '780px',
                margin: 0,
              }}>
                {siteContent.direct_tutoring?.description || 'Explore our tiered Academy Tracks modeled for students aged 5 to adult. From foundational computational logic to full-stack web and mobile application deployment, every session is a private, live screen-pairing experience with an expert mentor.'}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              marginBottom: '2.5rem',
            }}>
              <div style={{
                padding: '1.25rem',
                borderRadius: '1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>👶 🧠</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {siteContent.direct_tutoring?.zone_1_title || 'Zone 01: Foundation & Explorer'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {siteContent.direct_tutoring?.zone_1_desc || 'Junior Dev (Ages 5–10), Computational Logic, Python Engineering & AI Literacy.'}
                </div>
              </div>

              <div style={{
                padding: '1.25rem',
                borderRadius: '1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>🌐 📱</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {siteContent.direct_tutoring?.zone_2_title || 'Zone 02: Builder & Professional'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {siteContent.direct_tutoring?.zone_2_desc || 'Web Architecture, Mobile App Dev, UI/UX Design & Workforce Readiness pathways.'}
                </div>
              </div>

              <div style={{
                padding: '1.25rem',
                borderRadius: '1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>🛠️ 🎯</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {siteContent.direct_tutoring?.zone_3_title || 'Bespoke Custom Roadmaps'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {siteContent.direct_tutoring?.zone_3_desc || 'Build-your-own track tailored for school syllabus, hackathons, or career milestones.'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                href="/academy"
                className="btn btn-primary"
                style={{
                  padding: '0.85rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px -2px rgba(16, 185, 129, 0.4)',
                }}
              >
                <Sparkles size={16} />
                <span>{siteContent.direct_tutoring?.cta_primary_text || 'Explore Academy Tracks & Pathways'}</span>
              </Link>

              <a
                href={getTutoringWhatsAppUrl(undefined, siteContent.direct_tutoring?.whatsapp_number)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                }}
              >
                <MessageSquare size={16} color="var(--accent-emerald)" />
                <span>{siteContent.direct_tutoring?.cta_whatsapp_text || 'Chat With Academy Team'}</span>
              </a>
            </div>
          </div>
        </div>
      </AdminEditableSection>

      {/* Transformation in Action - Learner Voices */}
      <AdminEditableSection
        sectionKey="testimonials"
        sectionTitle="Learner Voices & Proven Career Outcomes"
        onEdit={() => setActiveEditModal({ key: 'testimonials', title: 'Learner Voices & Proven Career Outcomes' })}
      >
        <REACTJavTestimonials content={siteContent.testimonials} />
      </AdminEditableSection>

      {/* Frequently Asked Questions */}
      <AdminEditableSection
        sectionKey="faq"
        sectionTitle="Frequently Asked Questions (FAQ)"
        onEdit={() => setActiveEditModal({ key: 'faq', title: 'Frequently Asked Questions (FAQ)' })}
      >
        <REACTJavFaq content={siteContent.faq} />
      </AdminEditableSection>

      {/* Bottom CTA Banner - "Ready to Do Hard Things?" */}
      <AdminEditableSection
        sectionKey="bottom_cta"
        sectionTitle="Bottom Call-To-Action Banner"
        onEdit={() => setActiveEditModal({ key: 'bottom_cta', title: 'Bottom Call-To-Action Banner' })}
      >
        <div style={{
          marginTop: '4rem',
          padding: '3.5rem 2rem',
          borderRadius: '1.5rem',
          background: 'linear-gradient(135deg, rgba(37, 99, 248, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(244, 63, 94, 0.06) 100%)',
          border: '1px solid var(--border-accent)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            {siteContent.bottom_cta?.title_prefix || 'Ready to'}{' '}
            <span style={{ color: '#f43f5e' }}>
              {siteContent.bottom_cta?.title_highlight || 'Do Hard Things'}
            </span>?
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}>
            {siteContent.bottom_cta?.subtitle || 'Join over 350,000 learners mastering in-demand tech and leadership skills. Applications for the 2026 cohort close soon.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="#programmes-catalog"
              className="btn btn-primary"
              style={{
                padding: '0.85rem 2rem',
                fontSize: '1rem',
                fontWeight: 800,
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              }}
            >
              <Sparkles size={16} />
              <span>{siteContent.bottom_cta?.cta_primary_text || 'Apply For A Programme'}</span>
            </a>
            <Link
              href="/subscribe"
              className="btn btn-secondary"
              style={{
                padding: '0.85rem 1.75rem',
                fontSize: '1rem',
              }}
            >
              <span>{siteContent.bottom_cta?.cta_secondary_text || 'View Tuition & Sponsorships'}</span>
            </Link>
          </div>
        </div>
      </AdminEditableSection>

      {/* Global Section Editor Modal */}
      <AdminSectionEditorModal
        sectionKey={activeEditModal?.key || null}
        sectionTitle={activeEditModal?.title || ''}
        isOpen={!!activeEditModal}
        onClose={() => setActiveEditModal(null)}
        onSaved={() => {
          setSiteContent(LocalDataService.getSiteContent());
        }}
      />
    </div>
  );
}
