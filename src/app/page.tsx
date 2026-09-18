'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import CourseCard from '@/components/home/CourseCard';
import REACTJavTrackOverview from '@/components/home/REACTJavTrackOverview';
import REACTJavLearningModel from '@/components/home/REACTJavLearningModel';
import REACTJavTestimonials from '@/components/home/REACTJavTestimonials';
import REACTJavFaq from '@/components/home/REACTJavFaq';
import { Course, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
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
  Layers
} from 'lucide-react';

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All Programmes');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    setCourses(LocalDataService.getCourses());
    setCurrentUser(LocalDataService.getCurrentUser());

    const handleStorageChange = () => {
      setCourses(LocalDataService.getCourses());
      setCurrentUser(LocalDataService.getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedTrack}
        setSelectedCategory={setSelectedTrack}
        categories={tracks}
      />

      {/* Flagship Programme Spotlight Banner */}
      {flagshipCourse && (
        <div style={{
          margin: '2.5rem 0 3.5rem',
          padding: '2rem 2.5rem',
          borderRadius: '1.5rem',
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
          border: '1px solid var(--border-accent)',
          boxShadow: 'var(--shadow-xl)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
              <span>Flagship Programme • High Demand</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '0.75rem',
            }}>
              {flagshipCourse.title}
            </h2>

            <p style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              maxWidth: '560px',
            }}>
              {flagshipCourse.outcome_hook || flagshipCourse.description}
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
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{flagshipCourse.cohort_date || 'April 2026'}</span>
              </div>
              <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Duration</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{flagshipCourse.duration_weeks ? `${flagshipCourse.duration_weeks} Weeks` : 'Self-Paced'}</span>
              </div>
              <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Sponsorship</span>
                <span style={{ color: '#34d399', fontWeight: 700 }}>{flagshipCourse.sponsorship_note || 'Sponsored'}</span>
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
                <span>Explore Full Syllabus</span>
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
                <span>Check Eligibility & Grants</span>
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
              src={flagshipCourse.thumbnail_url}
              alt={flagshipCourse.title}
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
              <span className="badge badge-emerald">Mastercard Foundation Partnered</span>
              <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>8,400+ Enrolled</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Catalog Header with REACTJav Track Filter Pills */}
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
              Catalogue of Specializations
            </span>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              margin: '0.25rem 0 0',
            }}>
              All REACTJav Programmes
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

      {/* REACTJav Programme Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
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
            Platform Partition Architecture
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
            Choose Your Destination: <span className="text-gradient">Public Catalog</span> or <span style={{ color: '#10b981' }}>Campus Intranet</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            Explore open syllabi publicly or access the gated internal campus for certified testing and live collaboration.
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
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Part 1: The Public Catalog</h3>
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Open to All Visitors</span>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                Browse full engineering course outlines, syllabi breakdowns, lesson objectives, instructor profiles, and free preview lectures without login requirements.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <li>✓ Unlimited course catalog exploration</li>
                <li>✓ Syllabus & curriculum inspection</li>
                <li>✓ Transparent tuition plan comparisons</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="#programmes-catalog"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <span>Browse Curricula</span>
              </a>
              <Link
                href="/subscribe"
                className="btn btn-outline btn-sm"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <span>Tuition & Plans</span>
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
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Part 2: The Campus Intranet</h3>
                  <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                    {currentUser?.admin_granted || currentUser?.role !== 'student' ? 'Access Granted' : 'Gated: Subscription & Admin Clearance'}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                Private internal facility containing timed CBT examinations with certificate printouts, live virtual rooms with 1080p screen sharing, and code archives.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                <li>🔒 Timed 60-min CBT Examination Center</li>
                <li>🔒 Live Virtual Meeting Rooms & Breakout Pods</li>
                <li>🔒 Enrolled Course Player & Internal Code Sandbox</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link
                href="/intranet"
                className="btn btn-primary btn-sm"
                style={{ flex: 1, justifyContent: 'center', gap: '0.4rem' }}
              >
                <Building size={14} />
                <span>Enter Campus Intranet</span>
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

      {/* The REACTJav Learning Framework & Hub Ecosystem */}
      <REACTJavLearningModel />

      {/* Transformation in Action - Learner Voices */}
      <REACTJavTestimonials />

      {/* Frequently Asked Questions */}
      <REACTJavFaq />

      {/* Bottom CTA Banner - "Ready to Do Hard Things?" */}
      <div style={{
        marginTop: '4rem',
        padding: '3.5rem 2rem',
        borderRadius: '1.5rem',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(244, 63, 94, 0.06) 100%)',
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
          Ready to <span style={{ color: '#f43f5e' }}>Do Hard Things</span>?
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0 auto 2rem',
          lineHeight: 1.6,
        }}>
          Join over 350,000 learners mastering in-demand tech and leadership skills. 
          Applications for the 2026 cohort close soon.
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
            <span>Apply For A Programme</span>
          </a>
          <Link
            href="/subscribe"
            className="btn btn-secondary"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '1rem',
            }}
          >
            <span>View Tuition & Sponsorships</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
