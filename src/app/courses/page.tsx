'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import CourseCard from '@/components/home/CourseCard';
import REACTJavTrackOverview from '@/components/home/REACTJavTrackOverview';
import REACTJavFaq from '@/components/home/REACTJavFaq';
import { Course, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { Filter, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export default function CoursesCatalogPage() {
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
    'Game Development',
  ];

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

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
      (c.skills && c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (c.outcome_hook && c.outcome_hook.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLevel = selectedLevel === 'All Levels' || c.level === selectedLevel;

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Now Open' && c.is_now_open) ||
      (selectedStatus === 'Popular' && c.is_popular);

    return matchesTrack && matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      {/* REACTJav-Style Hero Header */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedTrack}
        setSelectedCategory={setSelectedTrack}
        categories={tracks}
      />

      {/* Catalog Filter Header */}
      <div id="programmes-catalog" style={{ margin: '2rem 0 1.5rem', paddingTop: '1rem' }}>
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
              Explore Curricula
            </span>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--text-primary)',
              margin: '0.25rem 0 0',
            }}>
              Programmes Catalog
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

      {/* Program Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1.25rem, 2.5vw, 2rem)',
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

      {/* Career Pathways */}
      <REACTJavTrackOverview onSelectTrack={(track) => {
        setSelectedTrack(track);
        const catalogEl = document.getElementById('programmes-catalog');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
      }} />

      {/* FAQ */}
      <REACTJavFaq />
    </div>
  );
}
