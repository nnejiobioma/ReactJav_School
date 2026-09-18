'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Clock, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  Star, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  UserCheck,
  CreditCard,
  Lock,
  Sparkles
} from 'lucide-react';
import { Course, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { formatCurrency, formatDuration } from '@/lib/utils';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);

    const foundCourse = LocalDataService.getCourseBySlug(slug);
    if (foundCourse) {
      setCourse(foundCourse);
      setIsEnrolled(LocalDataService.isEnrolled(user.id, foundCourse.id));
    }
  }, [slug]);

  if (!course) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', color: '#ffffff' }}>Course Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The requested course could not be located in the catalog.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!currentUser) return;
    setEnrolling(true);
    setTimeout(() => {
      LocalDataService.enroll(currentUser.id, course.id);
      setIsEnrolled(true);
      setEnrolling(false);
      // Navigate to first lesson
      const firstLesson = course.sections?.[0]?.lessons?.[0];
      if (firstLesson) {
        router.push(`/learn/${course.id}/${firstLesson.id}`);
      }
    }, 800);
  };

  const totalLessons = course.sections?.reduce(
    (acc, sec) => acc + (sec.lessons?.length || 0), 0
  ) || 0;

  const totalDuration = course.sections?.reduce(
    (acc, sec) => acc + (sec.lessons?.reduce((lAcc, l) => lAcc + l.duration_seconds, 0) || 0), 0
  ) || 0;

  const firstPreviewLesson = course.sections
    ?.flatMap((s) => s.lessons || [])
    .find((l) => l.is_free_preview);

  return (
    <div>
      {/* Top Banner / Hero */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(18, 25, 42, 0.9) 0%, var(--bg-main) 100%)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '3.5rem 0 3rem',
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Left Column: Title, Description, Stats */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge badge-primary">{course.category}</span>
              <span className="badge badge-emerald">{course.level}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}>
              {course.title}
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}>
              {course.description}
            </p>

            {/* Instructor and Rating row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2rem',
              fontSize: '0.875rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <img
                  src={course.instructor?.avatar_url || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80'}
                  alt={course.instructor?.full_name || 'Instructor'}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Instructor</span>
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{course.instructor?.full_name}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontWeight: 700, color: '#ffffff' }}>{course.average_rating || 4.9}</span>
                <span style={{ color: 'var(--text-muted)' }}>({course.reviews_count || 120} ratings)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                <Clock size={16} />
                <span>{formatDuration(totalDuration)} total content</span>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Card / Player Preview */}
          <div>
            <div className="glass-card" style={{
              padding: '1.75rem',
              border: '1px solid var(--border-accent)',
              boxShadow: 'var(--shadow-lg)',
            }}>
              <div style={{
                position: 'relative',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                aspectRatio: '16/9',
                marginBottom: '1.5rem',
              }}>
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {firstPreviewLesson && (
                    <Link
                      href={`/learn/${course.id}/${firstPreviewLesson.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: '9999px', boxShadow: '0 0 25px rgba(99,102,241,0.7)' }}
                    >
                      <PlayCircle size={18} />
                      <span>Watch Free Preview</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
                    {formatCurrency(course.price)}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    $129.99
                  </span>
                  <span className="badge badge-emerald" style={{ marginLeft: 'auto' }}>
                    60% OFF
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Full lifetime access • Completion Certificate included
                </p>
              </div>

              {isEnrolled ? (
                <Link
                  href={`/learn/${course.id}/${course.sections?.[0]?.lessons?.[0]?.id || 'les_01_01'}`}
                  className="btn btn-success btn-lg"
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  <CheckCircle2 size={18} />
                  <span>You are Enrolled • Continue Learning</span>
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginBottom: '1rem' }}
                >
                  {enrolling ? (
                    <span>Processing Enrollment...</span>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      <span>Instant Enroll Now</span>
                    </>
                  )}
                </button>
              )}

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} color="var(--accent-emerald)" />
                  <span>PostgreSQL RLS Protected Student Access</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={16} color="var(--accent-amber)" />
                  <span>Verified Course Certificate on 100% Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Breakdown Section */}
      <section className="container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '850px' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: '#ffffff', marginBottom: '0.5rem' }}>
              Curriculum Syllabus
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              {course.sections?.length} modules • {totalLessons} lessons • {formatDuration(totalDuration)} total length
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {course.sections?.map((section, idx) => (
              <div key={section.id} className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>
                    {section.title}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {section.lessons?.length || 0} lessons
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {section.lessons?.map((lesson) => (
                    <div
                      key={lesson.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: 'var(--bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {lesson.type === 'video' && <PlayCircle size={16} color="var(--primary)" />}
                        {lesson.type === 'article' && <FileText size={16} color="var(--accent-cyan)" />}
                        {lesson.type === 'quiz' && <HelpCircle size={16} color="var(--accent-amber)" />}

                        <span style={{ fontSize: '0.875rem', color: '#ffffff' }}>
                          {lesson.title}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {formatDuration(lesson.duration_seconds)}
                        </span>

                        {lesson.is_free_preview ? (
                          <Link
                            href={`/learn/${course.id}/${lesson.id}`}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
                          >
                            Preview
                          </Link>
                        ) : !isEnrolled ? (
                          <Lock size={14} color="var(--text-muted)" />
                        ) : (
                          <Link
                            href={`/learn/${course.id}/${lesson.id}`}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                          >
                            Play
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
