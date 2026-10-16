'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LandingHero from '@/components/home/LandingHero';
import WhyChooseReactJav from '@/components/home/WhyChooseReactJav';
import InteractiveCampusPreview from '@/components/home/InteractiveCampusPreview';
import FeaturedProgrammesSection from '@/components/home/FeaturedProgrammesSection';
import TuitionSponsorshipSection from '@/components/home/TuitionSponsorshipSection';
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
  Sparkles, 
  ArrowRight, 
  Flame, 
  BookOpen, 
  ShieldCheck, 
  Building, 
  MessageSquare 
} from 'lucide-react';
import { getTutoringWhatsAppUrl } from '@/data/academyTracks';

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [siteContent, setSiteContent] = useState<SiteContentConfig>(DEFAULT_SITE_CONTENT);
  const [activeEditModal, setActiveEditModal] = useState<{ key: keyof SiteContentConfig; title: string } | null>(null);

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

  // Flagship Spotlight Course
  const flagshipCourse = courses.find(c => c.id === 'crs_aice_03') || courses[0];

  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      {/* 1. High-Converting Landing Hero with Platform Mockup & Trust Stats */}
      <AdminEditableSection
        sectionKey="hero"
        sectionTitle="Hero & Platform Metrics"
        onEdit={() => setActiveEditModal({ key: 'hero', title: 'Hero & Platform Metrics' })}
      >
        <LandingHero content={siteContent.hero} />
      </AdminEditableSection>

      {/* 2. Why Choose ReactJav / Value Propositions with Interactive Feature Cards */}
      <WhyChooseReactJav />

      {/* 3. Interactive Platform Preview / Product Demo Mockup (Intranet & CBT Experience) */}
      <InteractiveCampusPreview />

      {/* 4. Curated Featured Programmes Showcase (Top 3-4 Courses + Link to Full /courses Catalog) */}
      <FeaturedProgrammesSection courses={courses} userId={currentUser?.id} />

      {/* 5. Flagship Programme Spotlight Banner */}
      {flagshipCourse && (
        <AdminEditableSection
          sectionKey="flagship"
          sectionTitle="Flagship Programme Spotlight Banner"
          onEdit={() => setActiveEditModal({ key: 'flagship', title: 'Flagship Programme Spotlight Banner' })}
        >
          <div style={{
            margin: '4rem 0',
            padding: 'clamp(1.5rem, 3vw, 2.75rem)',
            borderRadius: '1.75rem',
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
            border: '1px solid var(--border-accent)',
            boxShadow: 'var(--shadow-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '380px',
              height: '380px',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
              filter: 'blur(55px)',
              pointerEvents: 'none',
            }} />

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
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
                fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                lineHeight: 1.25,
                marginBottom: '0.75rem',
              }}>
                {siteContent.flagship?.title || flagshipCourse.title}
              </h2>

              <p style={{
                fontSize: '0.98rem',
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
                    padding: '0.75rem 1.6rem',
                    fontSize: '0.925rem',
                    fontWeight: 700,
                    gap: '0.5rem',
                    borderRadius: '0.75rem',
                  }}
                >
                  <span>{siteContent.flagship?.cta_primary_text || 'Explore Full Syllabus'}</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/subscribe"
                  className="btn btn-outline"
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.925rem',
                    borderRadius: '0.75rem',
                  }}
                >
                  <span>{siteContent.flagship?.cta_secondary_text || 'Check Eligibility & Grants'}</span>
                </Link>
              </div>
            </div>

            {/* Right Image Graphic */}
            <div style={{
              position: 'relative',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxHeight: '300px',
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
                  {siteContent.flagship?.partner_badge || 'Industry Partnered'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>
                  {siteContent.flagship?.enrolled_count_text || '8,400+ Enrolled'}
                </span>
              </div>
            </div>
          </div>
        </AdminEditableSection>
      )}

      {/* 6. Explore Career Pathways Section */}
      <REACTJavTrackOverview onSelectTrack={() => {
        window.location.href = '/courses';
      }} />

      {/* 7. Partition Architecture Gateway Card: Public Catalog vs Campus Intranet */}
      <AdminEditableSection
        sectionKey="partition_gateway"
        sectionTitle="Partition Architecture Gateway"
        onEdit={() => setActiveEditModal({ key: 'partition_gateway', title: 'Partition Architecture Gateway' })}
      >
        <div style={{
          margin: '4.5rem 0',
          padding: '2.5rem',
          borderRadius: '1.5rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-accent)',
          boxShadow: 'var(--shadow-xl)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 700,
            }}>
              {siteContent.partition_gateway?.eyebrow || 'Platform Partition Architecture'}
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
              {siteContent.partition_gateway?.title_prefix || 'Choose Your Destination:'}{' '}
              <span className="text-gradient">
                {siteContent.partition_gateway?.title_public_highlight || 'Public Catalog'}
              </span>{' '}
              or{' '}
              <span style={{ color: '#10b981' }}>
                {siteContent.partition_gateway?.title_intranet_highlight || 'Campus Intranet'}
              </span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '620px', margin: '0.65rem auto 0', lineHeight: 1.55 }}>
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
              borderRadius: '1.25rem',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '0.75rem',
                    background: 'rgba(99, 102, 241, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <BookOpen size={22} color="var(--primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {siteContent.partition_gateway?.public_title || 'Part 1: The Public Catalog'}
                    </h3>
                    <span className="badge badge-primary" style={{ fontSize: '0.68rem', marginTop: '0.2rem' }}>
                      {siteContent.partition_gateway?.public_badge || 'Open to All Visitors'}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {siteContent.partition_gateway?.public_description || 'Browse full engineering course outlines, syllabi breakdowns, lesson objectives, instructor profiles, and free preview lectures without login requirements.'}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {(siteContent.partition_gateway?.public_bullets || [
                    'Unlimited course catalog exploration',
                    'Syllabus & curriculum inspection',
                    'Transparent tuition plan comparisons',
                  ]).map((bullet, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link
                  href="/courses"
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <span>{siteContent.partition_gateway?.public_cta_1_text || 'Browse Curricula'}</span>
                </Link>
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
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '1.25rem',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '0.75rem',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <ShieldCheck size={22} color="var(--accent-emerald)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {siteContent.partition_gateway?.intranet_title || 'Part 2: The Campus Intranet'}
                    </h3>
                    <span className="badge badge-emerald" style={{ fontSize: '0.68rem', marginTop: '0.2rem' }}>
                      {currentUser?.admin_granted || currentUser?.role !== 'student' 
                        ? 'Access Granted' 
                        : (siteContent.partition_gateway?.intranet_badge || 'Gated: Subscription & Admin Clearance')}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {siteContent.partition_gateway?.intranet_description || 'Private internal facility containing timed CBT examinations with certificate printouts, live virtual rooms with 1080p screen sharing, and code archives.'}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {(siteContent.partition_gateway?.intranet_bullets || [
                    'Timed 60-min CBT Examination Center',
                    'Live Virtual Meeting Rooms & Breakout Pods',
                    'Enrolled Course Player & Internal Code Sandbox',
                  ]).map((bullet, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{ color: '#10b981' }}>🔒</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link
                  href="/intranet"
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, justifyContent: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff' }}
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

      {/* 8. The REACTJav Learning Framework & Hub Ecosystem */}
      <AdminEditableSection
        sectionKey="learning_model"
        sectionTitle="REACTJav Learning Framework Pillars"
        onEdit={() => setActiveEditModal({ key: 'learning_model', title: 'REACTJav Learning Framework Pillars' })}
      >
        <REACTJavLearningModel content={siteContent.learning_model} />
      </AdminEditableSection>

      {/* 9. Direct 1-on-1 Tutoring & Academy Tracks Spotlight */}
      <AdminEditableSection
        sectionKey="direct_tutoring"
        sectionTitle="Direct 1-on-1 Tutoring & Academy Spotlight"
        onEdit={() => setActiveEditModal({ key: 'direct_tutoring', title: 'Direct 1-on-1 Tutoring & Academy Spotlight' })}
      >
        <div style={{
          margin: '5rem 0',
          padding: 'clamp(2rem, 4vw, 3.75rem) clamp(1.5rem, 3vw, 2.75rem)',
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
              gap: '1.25rem',
              marginBottom: '2.5rem',
            }}>
              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>👶 🧠</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {siteContent.direct_tutoring?.zone_1_title || 'Zone 01: Foundation & Explorer'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  {siteContent.direct_tutoring?.zone_1_desc || 'Junior Dev (Ages 5–10), Computational Logic, Python Engineering & AI Literacy.'}
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🌐 📱</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {siteContent.direct_tutoring?.zone_2_title || 'Zone 02: Builder & Professional'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  {siteContent.direct_tutoring?.zone_2_desc || 'Web Architecture, Mobile App Dev, UI/UX Design & Workforce Readiness pathways.'}
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🛠️ 🎯</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {siteContent.direct_tutoring?.zone_3_title || 'Bespoke Custom Roadmaps'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
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

      {/* 10. Tuition, Scholarships & Sponsorship Grant Breakdown */}
      <TuitionSponsorshipSection />

      {/* 11. Transformation in Action - Learner Voices */}
      <AdminEditableSection
        sectionKey="testimonials"
        sectionTitle="Learner Voices & Proven Career Outcomes"
        onEdit={() => setActiveEditModal({ key: 'testimonials', title: 'Learner Voices & Proven Career Outcomes' })}
      >
        <REACTJavTestimonials content={siteContent.testimonials} />
      </AdminEditableSection>

      {/* 12. Frequently Asked Questions */}
      <AdminEditableSection
        sectionKey="faq"
        sectionTitle="Frequently Asked Questions (FAQ)"
        onEdit={() => setActiveEditModal({ key: 'faq', title: 'Frequently Asked Questions (FAQ)' })}
      >
        <REACTJavFaq content={siteContent.faq} />
      </AdminEditableSection>

      {/* 13. Bottom High-Converting CTA Banner - "Ready to Do Hard Things?" */}
      <AdminEditableSection
        sectionKey="bottom_cta"
        sectionTitle="Bottom Call-To-Action Banner"
        onEdit={() => setActiveEditModal({ key: 'bottom_cta', title: 'Bottom Call-To-Action Banner' })}
      >
        <div style={{
          marginTop: '5rem',
          padding: 'clamp(2.5rem, 5vw, 4rem) 2rem',
          borderRadius: '1.75rem',
          background: 'linear-gradient(135deg, rgba(37, 99, 248, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(244, 63, 94, 0.08) 100%)',
          border: '1px solid var(--border-accent)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
        }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
          }}>
            {siteContent.bottom_cta?.title_prefix || 'Ready to'}{' '}
            <span style={{ color: '#f43f5e' }}>
              {siteContent.bottom_cta?.title_highlight || 'Do Hard Things'}
            </span>?
          </h2>
          <p style={{
            fontSize: '1.08rem',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 2.25rem',
            lineHeight: 1.65,
          }}>
            {siteContent.bottom_cta?.subtitle || 'Join over 350,000 learners mastering in-demand tech and leadership skills. Applications for the 2026 cohort close soon.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/courses"
              className="btn btn-primary btn-lg"
              style={{
                padding: '0.95rem 2.25rem',
                fontSize: '1.025rem',
                fontWeight: 800,
                gap: '0.55rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                boxShadow: '0 8px 25px -4px rgba(37, 99, 235, 0.45)',
              }}
            >
              <Sparkles size={17} />
              <span>{siteContent.bottom_cta?.cta_primary_text || 'Apply For A Programme'}</span>
            </Link>
            <Link
              href="/subscribe"
              className="btn btn-secondary btn-lg"
              style={{
                padding: '0.95rem 2rem',
                fontSize: '1.025rem',
                borderRadius: '9999px',
              }}
            >
              <span>{siteContent.bottom_cta?.cta_secondary_text || 'View Tuition & Sponsorships'}</span>
            </Link>
          </div>
        </div>
      </AdminEditableSection>

      {/* Global Section Editor Modal for Administrators */}
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
