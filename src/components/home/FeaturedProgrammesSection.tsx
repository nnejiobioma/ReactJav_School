'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, Layers, Flame, CheckCircle2 } from 'lucide-react';
import { Course } from '@/types';
import CourseCard from '@/components/home/CourseCard';

interface FeaturedProgrammesSectionProps {
  courses: Course[];
  userId?: string;
}

export default function FeaturedProgrammesSection({ courses, userId }: FeaturedProgrammesSectionProps) {
  // Select top 3-4 flagship/popular programmes
  // Priority: is_popular, is_now_open, or first 4
  const featuredCourses = courses.filter(c => c.is_popular || c.is_now_open).slice(0, 4);
  const displayCourses = featuredCourses.length >= 3 ? featuredCourses : courses.slice(0, 4);

  return (
    <section id="featured-programmes" style={{ margin: '5rem 0', scrollMarginTop: '6rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2.5rem',
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            color: 'var(--primary)',
            fontSize: '0.78rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            <Flame size={13} color="#ef4444" />
            <span>Curated For 2026 Admissions</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            margin: 0,
          }}>
            Featured <span className="text-gradient">Flagship Programmes</span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
            maxWidth: '650px',
            lineHeight: 1.55,
          }}>
            Handpicked engineering and technical specializations with active cohort intakes, industry partner grants, and proven career placement velocity.
          </p>
        </div>

        <Link
          href="/courses"
          className="btn btn-outline"
          style={{
            gap: '0.5rem',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
          }}
        >
          <span>View All 20+ Programmes</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Course Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: 'clamp(1.5rem, 2.5vw, 2rem)',
        marginBottom: '3rem',
      }}>
        {displayCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            userId={userId}
          />
        ))}
      </div>

      {/* Catalog CTA Banner */}
      <div style={{
        padding: '2.5rem',
        borderRadius: '1.5rem',
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
        border: '1px solid var(--border-accent)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <BookOpen size={16} />
            <span>Complete Syllabus & Specialization Library</span>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            Looking for a specific tech stack or skill level?
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0', lineHeight: 1.55 }}>
            Browse our comprehensive catalogue of 20+ technical disciplines spanning AI & Deep Learning, Cloud DevOps, Distributed Systems, UX Product Design, Mobile Architecture, and Founder Academy.
          </p>
        </div>

        <Link
          href="/courses"
          className="btn btn-primary btn-lg"
          style={{
            gap: '0.6rem',
            fontWeight: 800,
            fontSize: '0.95rem',
            padding: '0.9rem 2rem',
            borderRadius: '9999px',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 25px -4px rgba(37, 99, 235, 0.4)',
          }}
        >
          <span>Explore All 20+ Curricula</span>
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
