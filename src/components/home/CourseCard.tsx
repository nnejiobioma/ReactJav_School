'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Calendar, CheckCircle2, ArrowRight, Sparkles, Flame, Laptop, Award } from 'lucide-react';
import { Course } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import ProgrammeCheckoutModal from '@/components/checkout/ProgrammeCheckoutModal';

interface CourseCardProps {
  course: Course;
  userId?: string;
  onEnrollSuccess?: () => void;
}

export default function CourseCard({ course, userId, onEnrollSuccess }: CourseCardProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const currentUserId = userId || LocalDataService.getCurrentUser()?.id;
  const isEnrolled = currentUserId ? LocalDataService.isEnrolled(currentUserId, course.id) : false;

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUserId || currentUserId === 'guest') {
      window.location.href = `/auth?mode=signup&courseId=${course.id}&redirect=${encodeURIComponent(`/subscribe?courseId=${course.id}`)}`;
      return;
    }
    setShowCheckout(true);
  };

  const trackBadgeColors: Record<string, { bg: string; text: string; border: string }> = {
    'AI & Data': {
      bg: 'rgba(56, 189, 248, 0.12)',
      text: '#38bdf8',
      border: 'rgba(56, 189, 248, 0.3)',
    },
    'Software Engineering': {
      bg: 'rgba(99, 102, 241, 0.12)',
      text: '#818cf8',
      border: 'rgba(99, 102, 241, 0.3)',
    },
    'Creative & Design': {
      bg: 'rgba(236, 72, 153, 0.12)',
      text: '#f472b6',
      border: 'rgba(236, 72, 153, 0.3)',
    },
    'Entrepreneurship': {
      bg: 'rgba(245, 158, 11, 0.12)',
      text: '#fbbf24',
      border: 'rgba(245, 158, 11, 0.3)',
    },
  };

  const trackStyle = trackBadgeColors[course.track || 'Software Engineering'] || {
    bg: 'rgba(99, 102, 241, 0.12)',
    text: '#818cf8',
    border: 'rgba(99, 102, 241, 0.3)',
  };

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '1.25rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'var(--border-accent)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Visual Image Header */}
      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
        <img
          src={course.thumbnail_url}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 13, 20, 0.1) 0%, rgba(13, 17, 28, 0.9) 100%)',
        }} />

        {/* Top Badges: Status & Track */}
        <div style={{
          position: 'absolute',
          top: '0.85rem',
          left: '0.85rem',
          right: '0.85rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          {/* Track Tag */}
          <span style={{
            fontSize: '0.725rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            background: trackStyle.bg,
            color: trackStyle.text,
            border: `1px solid ${trackStyle.border}`,
            backdropFilter: 'blur(8px)',
          }}>
            {course.track || course.category}
          </span>

          {/* Status Badge */}
          {course.is_now_open ? (
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.22rem 0.6rem',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }} />
              NOW OPEN
            </span>
          ) : course.is_popular ? (
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.22rem 0.6rem',
              borderRadius: '9999px',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}>
              <Flame size={12} color="#ef4444" />
              POPULAR
            </span>
          ) : (
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '0.22rem 0.6rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
            }}>
              {course.level}
            </span>
          )}
        </div>

        {/* Bottom Metadata inside Image: Enrollment or Cohort */}
        <div style={{
          position: 'absolute',
          bottom: '0.65rem',
          left: '0.85rem',
          right: '0.85rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
        }}>
          <span style={{
            color: '#e2e8f0',
            fontWeight: 600,
            background: 'rgba(0,0,0,0.6)',
            padding: '0.18rem 0.55rem',
            borderRadius: '0.4rem',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(6px)',
          }}>
            {course.cohort_date ? `Next Cohort: ${course.cohort_date}` : 'Self-Paced'}
          </span>

          {isEnrolled && (
            <span style={{
              color: '#34d399',
              fontWeight: 700,
              background: 'rgba(16, 185, 129, 0.25)',
              padding: '0.18rem 0.55rem',
              borderRadius: '0.4rem',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              backdropFilter: 'blur(6px)',
            }}>
              <CheckCircle2 size={12} />
              Enrolled
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div style={{
        padding: '1.4rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}>
        <div>
          {/* Programme Title */}
          <Link
            href={`/courses/${course.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              lineHeight: 1.35,
              marginBottom: '0.65rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.015em',
            }}>
              {course.title}
            </h3>
          </Link>

          {/* Outcome Statement (REACTJav style punchy career hook) */}
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            marginBottom: '1.25rem',
          }}>
            {course.outcome_hook || course.description}
          </p>

          {/* REACTJav Key Programme Metadata Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.65rem',
            padding: '0.85rem',
            background: 'var(--bg-surface-elevated)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.2rem',
            fontSize: '0.78rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}>
              <Clock size={14} color="var(--accent-cyan)" />
              <span>{course.duration_weeks ? `${course.duration_weeks} Weeks` : 'Self-Paced'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}>
              <Laptop size={14} color="var(--accent-purple)" />
              <span>{course.weekly_hours || '20 hrs/week'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)' }}>
              <Award size={14} color="var(--accent-emerald)" />
              <span>{course.level}</span>
            </div>
          </div>

          {/* Skills Acquired Chips */}
          {course.skills && course.skills.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
              marginBottom: '1.4rem',
            }}>
              {course.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-surface-elevated)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '0.35rem',
                    border: '1px solid var(--border-subtle)',
                    fontWeight: 500,
                  }}
                >
                  {skill}
                </span>
              ))}
              {course.skills.length > 4 && (
                <span style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  padding: '0.2rem 0.35rem',
                }}>
                  +{course.skills.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons: View Curriculum & Quick Enroll */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <Link
            href={`/courses/${course.slug}`}
            className="btn btn-secondary btn-sm"
            style={{
              flex: 1,
              justifyContent: 'center',
              fontSize: '0.82rem',
              padding: '0.55rem 0.75rem',
            }}
          >
            <span>View Syllabus</span>
            <ArrowRight size={13} />
          </Link>

          {!isEnrolled ? (
            <Link
              href={
                !currentUserId || currentUserId === 'guest'
                  ? `/auth?mode=signup&courseId=${course.id}&redirect=${encodeURIComponent(`/subscribe?courseId=${course.id}`)}`
                  : `/subscribe?courseId=${course.id}`
              }
              className="btn btn-primary btn-sm"
              style={{
                flex: 1,
                justifyContent: 'center',
                fontSize: '0.82rem',
                padding: '0.55rem 0.75rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              }}
            >
              <Sparkles size={13} />
              <span>Enroll Now</span>
            </Link>
          ) : (
            <Link
              href={`/learn/${course.id}/${course.sections?.[0]?.lessons?.[0]?.id || 'overview'}`}
              className="btn btn-primary btn-sm"
              style={{
                flex: 1,
                justifyContent: 'center',
                fontSize: '0.82rem',
                padding: '0.55rem 0.75rem',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              }}
            >
              <span>Resume</span>
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>

      {/* Programme Tuition & Checkout Modal */}
      <ProgrammeCheckoutModal
        course={course}
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSuccess={() => {
          if (onEnrollSuccess) onEnrollSuccess();
        }}
      />
    </div>
  );
}
