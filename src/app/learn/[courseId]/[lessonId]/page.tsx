'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  MessageSquare, 
  Download, 
  Share2,
  Lock
} from 'lucide-react';
import { Course, Lesson, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import VideoPlayer from '@/components/player/VideoPlayer';
import LessonSidebar from '@/components/player/LessonSidebar';
import QuizRunner from '@/components/quiz/QuizRunner';
import StudentRecordModal from '@/components/student/StudentRecordModal';
import { Printer, Mail, GraduationCap, Award, FileText, ShieldCheck } from 'lucide-react';

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [lastPosition, setLastPosition] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'qa' | 'resources'>('overview');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [autoPrintRecord, setAutoPrintRecord] = useState(false);

  // Load course and progress
  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);

    const foundCourse = LocalDataService.getCourseById(courseId);
    if (foundCourse) {
      setCourse(foundCourse);

      // Find current lesson (including any nested sub-lessons)
      const allLessons = foundCourse.sections?.flatMap((s) =>
        (s.lessons || []).flatMap((l) => [l, ...(l.sub_lessons || [])])
      ) || [];
      const foundLesson = allLessons.find((l) => l.id === lessonId);
      if (foundLesson) {
        setCurrentLesson(foundLesson);
      }

      // Load progress
      const userProg = LocalDataService.getProgress(user.id);
      const map: Record<string, boolean> = {};
      Object.keys(userProg).forEach((lid) => {
        map[lid] = userProg[lid].is_completed;
      });
      setProgressMap(map);

      if (userProg[lessonId]) {
        setLastPosition(userProg[lessonId].last_position_seconds || 0);
      }
    }
  }, [courseId, lessonId]);

  if (!course || !currentLesson) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', color: '#ffffff' }}>Loading Learning Session...</h2>
      </div>
    );
  }

  // Check enrollment / preview permission
  const isEnrolled = currentUser ? LocalDataService.isEnrolled(currentUser.id, course.id) : false;
  if (!isEnrolled && !currentLesson.is_free_preview) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem' }}>
          <Lock size={40} color="var(--accent-amber)" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ marginBottom: '0.75rem', color: '#ffffff' }}>Lesson Locked</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            This lesson is exclusive to enrolled students. Please enroll in the course to unlock full curriculum access.
          </p>
          <Link href={`/courses/${course.slug}`} className="btn btn-primary">
            View Enrollment Options
          </Link>
        </div>
      </div>
    );
  }

  const allLessons = course.sections?.flatMap((s) =>
    (s.lessons || []).flatMap((l) => [l, ...(l.sub_lessons || [])])
  ) || [];
  const currentIdx = allLessons.findIndex((l) => l.id === currentLesson.id);
  const nextLesson = allLessons[currentIdx + 1] || null;
  const prevLesson = allLessons[currentIdx - 1] || null;

  // Find parent lesson if this is a sub-lesson
  const parentLesson = course.sections
    ?.flatMap((s) => s.lessons || [])
    .find((l) => l.sub_lessons?.some((sl) => sl.id === currentLesson.id));

  const isCompleted = !!progressMap[currentLesson.id];

  const handleToggleComplete = (targetLessonId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentUser) return;

    const nextState = !progressMap[targetLessonId];
    LocalDataService.updateLessonProgress(currentUser.id, targetLessonId, nextState, lastPosition);
    setProgressMap((prev) => ({ ...prev, [targetLessonId]: nextState }));
  };

  const handleTimeUpdate = (currentTime: number) => {
    if (!currentUser) return;
    setLastPosition(currentTime);
    // Persist position checkpoint every 5 seconds
    if (Math.floor(currentTime) % 5 === 0) {
      LocalDataService.updateLessonProgress(currentUser.id, currentLesson.id, isCompleted, currentTime);
    }
  };

  const handleLessonAutoCompleted = () => {
    if (!currentUser) return;
    LocalDataService.updateLessonProgress(currentUser.id, currentLesson.id, true, lastPosition);
    setProgressMap((prev) => ({ ...prev, [currentLesson.id]: true }));
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/learn/${course.id}/${nextLesson.id}`);
    }
  };

  const stats = currentUser ? LocalDataService.getCourseStats(course.id, currentUser.id) : { totalLessons: 0, completedLessons: 0, percentage: 0 };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
      {/* Top Breadcrumb Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href={`/courses/${course.slug}`} className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} />
            <span>Course Outline</span>
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {course.title}
          </span>
          {parentLesson && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>/</span>
              <Link
                href={`/learn/${course.id}/${parentLesson.id}`}
                style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none' }}
                title="Go to parent lesson"
              >
                {parentLesson.title}
              </Link>
            </>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {prevLesson && (
            <Link
              href={`/learn/${course.id}/${prevLesson.id}`}
              className="btn btn-secondary btn-sm"
              title={prevLesson.title}
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </Link>
          )}

          <button
            onClick={() => handleToggleComplete(currentLesson.id)}
            className={`btn btn-sm ${isCompleted ? 'btn-success' : 'btn-secondary'}`}
          >
            {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>

          {nextLesson && (
            <button onClick={handleNextLesson} className="btn btn-primary btn-sm">
              <span>Next Lesson</span>
              <ArrowRight size={14} />
            </button>
          )}

          <button
            onClick={() => {
              setAutoPrintRecord(false);
              setIsRecordModalOpen(true);
            }}
            className="btn btn-secondary btn-sm"
            title="View & manage student academic record and transcript"
          >
            <GraduationCap size={15} color="var(--primary)" />
            <span>Academic Record</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Stage on Left, Curriculum Sidebar on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 360px',
        gap: '2rem',
        alignItems: 'start',
      }}>
        {/* Left Column: Media Stage & Content */}
        <div>
          {/* Lesson Stage */}
          <div style={{ marginBottom: '2rem' }}>
            {currentLesson.type === 'video' && currentLesson.video_url && (
              <VideoPlayer
                videoUrl={currentLesson.video_url}
                title={currentLesson.title}
                initialTime={lastPosition}
                isCompleted={isCompleted}
                onTimeUpdate={handleTimeUpdate}
                onComplete={handleLessonAutoCompleted}
              />
            )}

            {currentLesson.type === 'quiz' && (
              <QuizRunner
                questions={currentLesson.quiz_questions || []}
                lessonTitle={currentLesson.title}
                onComplete={handleLessonAutoCompleted}
              />
            )}

            {currentLesson.type === 'article' && (
              <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}>
                  <span className="badge badge-cyan">Article Reading</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Approx {Math.round(currentLesson.duration_seconds / 60)} min read
                  </span>
                </div>

                <div style={{
                  color: 'var(--text-primary)',
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  whiteSpace: 'pre-line',
                }}>
                  {currentLesson.content}
                </div>

                <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      handleToggleComplete(currentLesson.id);
                      if (nextLesson) handleNextLesson();
                    }}
                    className="btn btn-primary"
                  >
                    <span>Mark Read & Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Title & Info */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {parentLesson ? (
                <span className="badge badge-indigo" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  Sub-lesson of {parentLesson.title}
                </span>
              ) : (
                <span className="badge badge-primary">Main Lesson</span>
              )}
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
              {currentLesson.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Part of {course.title}
            </p>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '1.5rem',
          }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.75rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activeTab === 'overview' ? '#ffffff' : 'var(--text-muted)',
                borderBottom: activeTab === 'overview' ? '2px solid var(--primary)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              Lecture Notes & Key Concepts
            </button>

            <button
              onClick={() => setActiveTab('qa')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.75rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activeTab === 'qa' ? '#ffffff' : 'var(--text-muted)',
                borderBottom: activeTab === 'qa' ? '2px solid var(--primary)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              Discussion / Q&A (4)
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.75rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activeTab === 'resources' ? '#ffffff' : 'var(--text-muted)',
                borderBottom: activeTab === 'resources' ? '2px solid var(--primary)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              Downloadable Resources
            </button>
          </div>

          {/* Tab Content Panels */}
          {activeTab === 'overview' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '1rem' }}>
                Summary & Key Takeaways
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                In this lecture, we explore how Postgres Row-Level Security coordinates with JWT tokens emitted by Supabase Auth. Because policies evaluate directly against database rows before query results are serialized, unauthorized consumers cannot access tenant information even if an API route fails to include filtering constraints.
              </p>
              <div style={{
                background: 'var(--bg-surface-elevated)',
                padding: '1rem 1.25rem',
                borderRadius: '0.65rem',
                borderLeft: '4px solid var(--primary)',
                fontSize: '0.875rem',
                color: '#c7d2fe',
              }}>
                <strong>Implementation Tip:</strong> Ensure that all foreign keys referenced in your security policies (e.g. <code>user_id</code> and <code>course_id</code>) have B-Tree indices to maintain sub-millisecond query planning speeds.
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Lesson Questions</h3>
                <button className="btn btn-primary btn-sm">Ask a Question</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  padding: '1rem',
                  borderRadius: '0.65rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#ffffff' }}>Marcus Reed</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2 hours ago</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Does Supabase automatically cache RLS policy checks between identical queries in a connection pool?
                  </p>
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    background: 'rgba(99, 102, 241, 0.08)',
                    borderRadius: '0.5rem',
                    borderLeft: '3px solid var(--primary)',
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 600 }}>Instructor Answer:</span>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      Yes, Postgres query plans cache parsed statements, but the boolean policy expression is re-evaluated per row based on the session's active <code>auth.uid()</code> context.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '1rem' }}>
                Supplemental Material
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'var(--bg-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', display: 'block' }}>
                      Supabase-Postgres-Schema-Starter.sql
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SQL Migration • 14 KB</span>
                  </div>
                  <button className="btn btn-secondary btn-sm">
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* END OF COURSE & STUDENT ACADEMIC RECORD MANAGEMENT SECTION */}
          <div 
            className="glass-card" 
            style={{ 
              marginTop: '2.5rem', 
              padding: '2rem', 
              border: '1px solid var(--border-accent)',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
              borderRadius: '1rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top decorative tag */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.1) 100%)',
              padding: '0.4rem 1.25rem',
              borderBottomLeftRadius: '0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--primary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Academic Transcript Center
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.35)',
                flexShrink: 0,
              }}>
                <GraduationCap size={28} />
              </div>

              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Student Academic Record & Official Transcript
                  </h3>
                  {stats.percentage === 100 && (
                    <span className="badge badge-emerald">Course Completed</span>
                  )}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  {stats.percentage === 100
                    ? 'Congratulations! You have completed all curriculum modules in this course. Your official academic record, CDT assessment scores, and proctored verification hashes are ready for management.'
                    : !nextLesson 
                    ? 'You have reached the final module of this curriculum! Review your cumulative coursework, print your official academic record, or dispatch it via email.'
                    : 'Manage your verified academic standing, review complete course activity and CDT assessment scores, or generate printable official transcripts anytime.'}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '0.85rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.65rem',
                padding: '0.85rem 1rem',
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                  Candidate ID
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  {currentUser ? `RJ-2026-ENG-${(currentUser.id || 'usr_001').slice(-5).toUpperCase()}` : 'RJ-2026-ENG-001'}
                </span>
              </div>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.65rem',
                padding: '0.85rem 1rem',
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                  Curriculum Progress
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {stats.completedLessons} of {stats.totalLessons} Lessons ({stats.percentage}%)
                </span>
              </div>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.65rem',
                padding: '0.85rem 1rem',
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                  Verification Status
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={14} /> Verified Fellow
                </span>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setAutoPrintRecord(false);
                    setIsRecordModalOpen(true);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <FileText size={15} />
                  <span>View & Manage Record</span>
                </button>

                <button
                  onClick={() => {
                    setAutoPrintRecord(true);
                    setIsRecordModalOpen(true);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Printer size={15} />
                  <span>Print Record (PDF)</span>
                </button>

                <button
                  onClick={() => {
                    setAutoPrintRecord(false);
                    setIsRecordModalOpen(true);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Mail size={15} />
                  <span>Send via Email</span>
                </button>
              </div>

              <Link
                href="/cbt"
                className="btn btn-secondary btn-sm"
                style={{ color: 'var(--accent-amber)', borderColor: 'rgba(245, 158, 11, 0.3)' }}
              >
                <Award size={15} />
                <span>Take CDT Certification Exam</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Curriculum Sidebar */}
        <div>
          <LessonSidebar
            course={course}
            currentLessonId={currentLesson.id}
            progressMap={progressMap}
            onToggleComplete={handleToggleComplete}
            stats={stats}
            onOpenRecord={() => {
              setAutoPrintRecord(false);
              setIsRecordModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* Student Academic Record & Transcript Modal */}
      <StudentRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        specificCourseId={course.id}
        autoPrint={autoPrintRecord}
      />
    </div>
  );
}
