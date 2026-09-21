'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Award, 
  Clock, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  X, 
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Printer,
  Mail,
  FileText,
  Video,
  Terminal,
  Timer,
  Building,
  Check,
  Calendar
} from 'lucide-react';
import { Course, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { formatDuration } from '@/lib/utils';
import { ACADEMY_TRACKS } from '@/data/academyTracks';
import StudentRecordModal from '@/components/student/StudentRecordModal';
import TutoringAttendanceTracker from '@/components/attendance/TutoringAttendanceTracker';
import AccessGuard from '@/components/auth/AccessGuard';

export default function StudentDashboardPage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<{ course: Course; stats: { totalLessons: number; completedLessons: number; percentage: number } }[]>([]);
  const [selectedCertificateCourse, setSelectedCertificateCourse] = useState<Course | null>(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [autoPrintRecord, setAutoPrintRecord] = useState(false);

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
    if (!user) return;

    const enrolledIds = LocalDataService.getEnrollments(user.id);
    const allCourses = LocalDataService.getCourses();

    const enrolled = enrolledIds
      .map((id) => allCourses.find((c) => c.id === id))
      .filter((c): c is Course => !!c)
      .map((course) => {
        const stats = LocalDataService.getCourseStats(course.id, user.id);
        return { course, stats };
      });

    setEnrolledCourses(enrolled);
  }, []);

  const totalCompletedLessons = enrolledCourses.reduce((acc, curr) => acc + curr.stats.completedLessons, 0);
  const totalCertificates = enrolledCourses.filter((c) => c.stats.percentage === 100).length;

  return (
    <AccessGuard level="authenticated" pageTitle="Student Learning Dashboard">
      <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
        {/* Welcome Header */}
        <div className="glass-card" style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
          border: '1px solid var(--border-accent)',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt="Profile"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--primary)',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>
                Welcome back, {currentUser?.full_name?.split(' ')[0] || 'Scholar'}!
              </h1>
              <span className="badge badge-primary">Student Portal</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              Keep advancing your curriculum milestones. Your progress is synced securely.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setAutoPrintRecord(false);
                  setIsRecordModalOpen(true);
                }}
                className="btn btn-primary btn-sm"
              >
                <GraduationCap size={15} />
                <span>Official Academic Record</span>
              </button>
              <button
                onClick={() => {
                  setAutoPrintRecord(true);
                  setIsRecordModalOpen(true);
                }}
                className="btn btn-secondary btn-sm"
              >
                <Printer size={15} />
                <span>Print Record</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-surface-elevated)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <Flame size={22} color="var(--accent-amber)" />
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>5 Days</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Learning Streak</span>
            </div>
          </div>

          <div style={{
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-surface-elevated)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <CheckCircle2 size={22} color="var(--accent-emerald)" />
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>
                {totalCompletedLessons}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lessons Mastered</span>
            </div>
          </div>

          <div style={{
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-surface-elevated)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <Award size={22} color="var(--accent-purple)" />
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>
                {totalCertificates}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Certificates</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1-on-1 Direct Tutoring Fellow Track & Intranet Study Tracking */}
      {currentUser?.tutoring_enrolled && (() => {
        const tutoringTrack = ACADEMY_TRACKS.find(t => t.id === currentUser?.tutoring_track_id) || ACADEMY_TRACKS[0];
        return (
          <div style={{
            marginBottom: '3.5rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '1.25rem',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            {/* Header & Badges */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                    1-on-1 Direct Tutoring Fellow
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    Cadence: {currentUser.tutoring_frequency || '2x per week'}
                  </span>
                  <span style={{ color: 'var(--border-subtle)' }}>•</span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    color: '#34d399',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}>
                    <ShieldCheck size={14} />
                    <span>Campus Intranet Unrestricted Clearance</span>
                  </span>
                </div>

                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Active Pathway: {tutoringTrack.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.35rem 0 0', maxWidth: '720px', lineHeight: 1.5 }}>
                  {tutoringTrack.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <Link
                  href="/live"
                  className="btn btn-primary btn-sm"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    padding: '0.55rem 1.15rem',
                    gap: '0.4rem',
                  }}
                >
                  <Video size={16} />
                  <span>Join 1-on-1 Live Room</span>
                </Link>

                <Link
                  href="/tutoring/attendance"
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem', gap: '0.4rem' }}
                >
                  <Calendar size={16} color="var(--accent-emerald)" />
                  <span>Attendance & Sign-Off</span>
                </Link>

                <button
                  onClick={() => {
                    setAutoPrintRecord(false);
                    setIsRecordModalOpen(true);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem', gap: '0.4rem' }}
                >
                  <GraduationCap size={16} color="var(--primary)" />
                  <span>Transcript & Studies Record</span>
                </button>
              </div>
            </div>

            {/* Campus Intranet Facilities Fast-Lane Access Grid */}
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
            }}>
              <Building size={16} color="var(--primary)" />
              <span>Campus Intranet Resources & Study Facilities (Fully Cleared)</span>
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              {/* Card 1: Intranet Hub */}
              <Link href="/intranet" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.875rem',
                  padding: '1.25rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}>
                  <div>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '0.5rem',
                      background: 'rgba(99, 102, 241, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}>
                      <Building size={18} color="var(--primary)" />
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
                      Campus Intranet Hub
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      Private bulletins, internal academic records, and university announcements.
                    </p>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 600 }}>
                    <span>Enter Intranet Hub</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>

              {/* Card 2: 1-on-1 Live Room */}
              <Link href="/live" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.875rem',
                  padding: '1.25rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}>
                  <div>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '0.5rem',
                      background: 'rgba(236, 72, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}>
                      <Video size={18} color="var(--accent-pink)" />
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
                      1-on-1 Live Mentoring
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      Hardware 1080p screen share, shared code whiteboard, and direct faculty pairing.
                    </p>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-pink)', fontSize: '0.78rem', fontWeight: 600 }}>
                    <span>Open Live Room</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>

              {/* Card 3: CBT Examination */}
              <Link href="/cbt" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.875rem',
                  padding: '1.25rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}>
                  <div>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '0.5rem',
                      background: 'rgba(245, 158, 11, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}>
                      <Timer size={18} color="var(--accent-amber)" />
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
                      CBT Examination Center
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      Timed standardized assessments, objective evaluations, and digital test slips.
                    </p>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-amber)', fontSize: '0.78rem', fontWeight: 600 }}>
                    <span>Take CBT Assessment</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>

              {/* Card 4: IDE Sandbox */}
              <Link href="/intranet/ide" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.875rem',
                  padding: '1.25rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}>
                  <div>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '0.5rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}>
                      <Terminal size={18} color="var(--accent-emerald)" />
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
                      Engineering IDE Sandbox
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      Multi-file compiler, real-time preview, and playground for coursework code.
                    </p>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-emerald)', fontSize: '0.78rem', fontWeight: 600 }}>
                    <span>Open Code Sandbox</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            </div>

            {/* Track Syllabus Milestones Checklist */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1rem',
              padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Curriculum Modules & Study Milestones for {tutoringTrack.name}
                </h4>
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                  Award: {tutoringTrack.certification}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '0.75rem',
              }}>
                {tutoringTrack.syllabus.map((mod: any, idx: number) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.65rem',
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: idx === 0 ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-surface)',
                      border: idx === 0 ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: idx === 0 ? '#10b981' : 'var(--text-muted)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      {idx === 0 ? <Check size={14} /> : idx + 1}
                    </div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4 }}>
                      {mod}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 1-on-1 Direct Tutoring Attendance Tracker (Dual Sign-off) */}
            <div style={{ marginTop: '2rem' }}>
              <TutoringAttendanceTracker initialRole="student" showHeaderBanner={false} />
            </div>
          </div>
        );
      })()}

      {/* Enrolled Courses Section */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Your Enrolled Curricula</h2>
          <Link href="/" className="btn btn-secondary btn-sm">
            Browse More Courses
          </Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
          }}>
            {enrolledCourses.map(({ course, stats }) => {
              const firstLessonId = course.sections?.[0]?.lessons?.[0]?.id || 'les_01_01';
              const isCompleted = stats.percentage === 100;

              return (
                <div key={course.id} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '160px' }}>
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(10,13,20,0.85) 100%)',
                    }} />
                    <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                      {isCompleted ? (
                        <span className="badge badge-emerald">Course Completed</span>
                      ) : (
                        <span className="badge badge-primary">In Progress</span>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        {course.title}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        {course.instructor?.full_name}
                      </p>
                    </div>

                    <div>
                      {/* Progress Bar */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>
                            {stats.completedLessons} of {stats.totalLessons} lessons
                          </span>
                          <span style={{ fontWeight: 700, color: '#a5b4fc' }}>{stats.percentage}%</span>
                        </div>
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: `${stats.percentage}%` }} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link
                          href={`/learn/${course.id}/${firstLessonId}`}
                          className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
                          style={{ flexGrow: 1 }}
                        >
                          <span>{isCompleted ? 'Review Material' : 'Continue Learning'}</span>
                          <ArrowRight size={14} />
                        </Link>

                        {isCompleted && (
                          <button
                            onClick={() => setSelectedCertificateCourse(course)}
                            className="btn btn-success btn-sm"
                            title="View Certificate"
                          >
                            <Award size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              You have not enrolled in any courses yet.
            </p>
            <Link href="/" className="btn btn-primary">
              Explore Course Catalog
            </Link>
          </div>
        )}
      </div>

      {/* Official Academic Records & Official Transcript Section */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Official Academic Records & Transcripts
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Comprehensive log of candidate matriculation, coursework progress, and Computer-Based Testing (CDT) evaluations.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setAutoPrintRecord(true);
                setIsRecordModalOpen(true);
              }}
              className="btn btn-secondary btn-sm"
            >
              <Printer size={15} />
              <span>Print Official Transcript</span>
            </button>
            <button
              onClick={() => {
                setAutoPrintRecord(false);
                setIsRecordModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
            >
              <FileText size={15} />
              <span>Manage & View Full Record</span>
            </button>
          </div>
        </div>

        {/* Academic Record Summary Showcase Card */}
        <div className="glass-card" style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
              }}>
                <GraduationCap size={30} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Matriculation Dossier
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.1rem' }}>
                  {currentUser?.full_name || 'Scholar'}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  Matric No: RJ-2026-ENG-{(currentUser?.id || 'usr_001').slice(-5).toUpperCase()} • Track: Full-Stack Software Engineering
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem' }}>
                <ShieldCheck size={14} />
                <span>Verified Academic Standing</span>
              </span>
              <button
                onClick={() => {
                  setAutoPrintRecord(false);
                  setIsRecordModalOpen(true);
                }}
                className="btn btn-secondary btn-sm"
                title="Send record to sponsor, employer, or registered email"
              >
                <Mail size={15} />
                <span>Send via Email</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Breakdown */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Cumulative Standing
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                3.92 GPA
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'block', fontWeight: 600 }}>
                First Class Honours
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Course Modules Completed
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {totalCompletedLessons} Lessons
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Across {enrolledCourses.length} Curricula
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                CDT / CBT Exam Assessment
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                3 Passed (90% Avg)
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Proctor Verified
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Engineering Sandbox
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                48 Labs Logged
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Python & WebAssembly Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Certificate Modal */}
      {selectedCertificateCourse && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 500,
          padding: '1.5rem',
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '750px',
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
            border: '2px solid rgba(139, 92, 246, 0.5)',
            padding: '3rem 2.5rem',
            position: 'relative',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xl)',
          }}>
            <button
              onClick={() => setSelectedCertificateCourse(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={22} />
            </button>

            {/* Certificate Header */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              background: 'var(--grad-primary)',
              margin: '0 auto 1.25rem',
              boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)',
            }}>
              <GraduationCap size={32} color="#ffffff" />
            </div>

            <span style={{
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent-purple)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.5rem',
            }}>
              Certificate of Completion
            </span>

            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              ReactJav Engineering Academy
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              This certifies that
            </p>

            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              borderBottom: '2px dashed var(--border-accent)',
              paddingBottom: '0.75rem',
              margin: '0 auto 1.5rem',
              maxWidth: '450px',
            }}>
              {currentUser?.full_name}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Has successfully mastered all modules, assessments, and technical checkpoints in{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{selectedCertificateCourse.title}</strong>.
            </p>

            {/* Certificate Meta */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.5rem',
              marginBottom: '2rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}>
              <div>
                <span style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span>Date Issued</span>
              </div>

              <div>
                <span style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  EDF-{selectedCertificateCourse.id.substring(4, 12).toUpperCase()}
                </span>
                <span>Credential Verification ID</span>
              </div>

              <div>
                <span style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {selectedCertificateCourse.instructor?.full_name}
                </span>
                <span>Lead Instructor</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={() => window.print()}
                className="btn btn-primary"
              >
                <Download size={16} />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Student Academic Record & Transcript Modal */}
        <StudentRecordModal
          isOpen={isRecordModalOpen}
          onClose={() => setIsRecordModalOpen(false)}
          autoPrint={autoPrintRecord}
        />
      </div>
    </AccessGuard>
  );
}
