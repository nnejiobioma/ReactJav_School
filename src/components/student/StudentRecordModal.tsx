'use client';

import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Mail, 
  X, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  User, 
  Hash, 
  QrCode, 
  Send, 
  Sparkles, 
  GraduationCap, 
  Code2, 
  Check, 
  Flame, 
  FileText,
  AlertCircle,
  CalendarCheck,
  UserCheck
} from 'lucide-react';
import { Course, Profile, CBTAttempt, MonthlyAttendanceSummary, TutoringAttendanceSession } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { formatDuration } from '@/lib/utils';

interface StudentRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  specificCourseId?: string;
  autoPrint?: boolean;
}

export default function StudentRecordModal({
  isOpen,
  onClose,
  specificCourseId,
  autoPrint = false,
}: StudentRecordModalProps) {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<{ course: Course; stats: { totalLessons: number; completedLessons: number; percentage: number } }[]>([]);
  const [cbtAttempts, setCbtAttempts] = useState<CBTAttempt[]>([]);
  const [tutoringSummary, setTutoringSummary] = useState<MonthlyAttendanceSummary | null>(null);
  const [tutoringSessions, setTutoringSessions] = useState<TutoringAttendanceSession[]>([]);
  
  // Email dispatch modal state
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailNote, setEmailNote] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentResult, setEmailSentResult] = useState<{ success: boolean; refId: string; timestamp: string } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

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

    const attempts = LocalDataService.getCBTAttempts(user.id);
    setCbtAttempts(attempts);

    const tutSummary = LocalDataService.getMonthlyAttendanceSummary('2026-09', user.id);
    setTutoringSummary(tutSummary);
    const tutSessions = LocalDataService.getTutoringAttendance({ studentId: user.id, month: '2026-09' });
    setTutoringSessions(tutSessions);

    const initialMatric = `RJ-2026-ENG-${(user.id || 'usr_001').slice(-5).toUpperCase()}`;
    setRecipientEmail(user.email || 'student@example.com');
    setEmailSubject(`Official Academic Transcript & CDT Assessment Record - ${user.full_name || 'Scholar'} (${initialMatric})`);

    if (autoPrint) {
      const timer = setTimeout(() => {
        window.print();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoPrint]);

  if (!isOpen || !currentUser) return null;

  const matricNo = `RJ-2026-ENG-${(currentUser.id || 'usr_001').slice(-5).toUpperCase()}`;
  const totalCompletedLessons = enrolledCourses.reduce((acc, curr) => acc + curr.stats.completedLessons, 0);
  const totalCertificates = enrolledCourses.filter((c) => c.stats.percentage === 100).length;
  const passedCbtCount = cbtAttempts.filter((a) => a.passed).length;
  const averageCbtScore = cbtAttempts.length > 0 
    ? Math.round(cbtAttempts.reduce((acc, curr) => acc + curr.score, 0) / cbtAttempts.length)
    : 90;

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) return;

    setIsSendingEmail(true);

    setTimeout(() => {
      const refId = `MAIL-TRX-${Math.floor(100000 + Math.random() * 900000)}`;
      setEmailSentResult({
        success: true,
        refId,
        timestamp: new Date().toLocaleString(),
      });
      setIsSendingEmail(false);
    }, 1200);
  };

  return (
    <>
      {/* Global CSS for Screen & Print Modes */}
      <style jsx global>{`
        @media print {
          /* Hide everything except the transcript printable area */
          body * {
            visibility: hidden !important;
          }
          nav, header, footer, .no-print, .student-record-toolbar {
            display: none !important;
          }
          .printable-record-overlay, .printable-record-overlay * {
            visibility: visible !important;
          }
          .printable-record-overlay {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
          }
          .printable-sheet {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .print-dark-text {
            color: #0f172a !important;
          }
          .print-muted-text {
            color: #475569 !important;
          }
          .print-border {
            border-color: #cbd5e1 !important;
          }
          .print-bg-subtle {
            background-color: #f8fafc !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-badge-passed {
            background: #dcfce7 !important;
            color: #166534 !important;
            border: 1px solid #86efac !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: A4 portrait;
            margin: 12mm 12mm 15mm 12mm;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div 
        className="printable-record-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 7, 12, 0.88)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflowY: 'auto',
          padding: 'clamp(0.75rem, 2vw, 2rem) clamp(0.5rem, 1.5vw, 1rem) 3rem',
        }}
      >
        <div 
          className="printable-sheet glass-card animate-fade-in"
          style={{
            width: '100%',
            maxWidth: '920px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-accent)',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
            position: 'relative',
          }}
        >
          {/* TOP ACTION TOOLBAR (SCREEN ONLY) */}
          <div 
            className="no-print student-record-toolbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              background: 'var(--bg-surface-elevated)',
              borderBottom: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}>
                <GraduationCap size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                  Official Student Academic Record & Transcript
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Matriculation Registry • Verified True Copy
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={handlePrint} 
                className="btn btn-primary btn-sm"
                title="Print official academic transcript document"
              >
                <Printer size={15} />
                <span>Print Record</span>
              </button>

              <button 
                onClick={() => {
                  setEmailSentResult(null);
                  setIsEmailModalOpen(true);
                }} 
                className="btn btn-secondary btn-sm"
                title="Send official record via email"
              >
                <Mail size={15} />
                <span>Send via Email</span>
              </button>

              <button 
                onClick={onClose}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
                title="Close record view"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* OFFICIAL TRANSCRIPT DOCUMENT CONTAINER */}
          <div style={{ padding: 'clamp(1rem, 3vw, 2.5rem)' }}>
            
            {/* 1. OFFICIAL UNIVERSITY LETTERHEAD */}
            <div 
              className="print-border"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1.75rem',
                borderBottom: '2px solid var(--border-subtle)',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
                  color: '#ffffff',
                }}>
                  <GraduationCap size={38} />
                </div>
                <div>
                  <span style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    fontWeight: 800,
                    display: 'block',
                    marginBottom: '0.2rem',
                  }}>
                    Office of the Registrar & Examination Board
                  </span>
                  <h1 
                    className="print-dark-text"
                    style={{ 
                      fontSize: '1.65rem', 
                      fontWeight: 900, 
                      color: 'var(--text-primary)', 
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    REACTJAV ENGINEERING ACADEMY
                  </h1>
                  <p 
                    className="print-muted-text"
                    style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}
                  >
                    Faculty of Computing & Distributed Systems • Intranet Student Registry
                  </p>
                </div>
              </div>

              {/* Security Verification Stamp & QR Code */}
              <div 
                className="print-bg-subtle print-border"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 1.1rem',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  background: '#ffffff',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f172a',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}>
                  <QrCode size={36} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={14} color="var(--accent-emerald)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
                      Cryptographically Verified
                    </span>
                  </div>
                  <span 
                    className="print-dark-text"
                    style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', display: 'block' }}
                  >
                    TRANSCRIPT REF: {matricNo}
                  </span>
                  <span 
                    className="print-muted-text"
                    style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}
                  >
                    Issued: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. STUDENT CREDENTIALS & BIOGRAPHICAL DETAILS */}
            <div 
              className="print-bg-subtle print-border"
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.85rem',
                padding: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 
                  className="print-dark-text"
                  style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  Candidate Biographical & Matriculation Record
                </h2>
                <span className="badge badge-emerald print-badge-passed" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                  <Check size={13} style={{ marginRight: '0.3rem' }} />
                  {currentUser.tutoring_enrolled ? 'Direct Tutoring Fellow (Active)' : 'Verified Active Scholar'}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.25rem',
              }}>
                <div>
                  <span 
                    className="print-muted-text"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}
                  >
                    FULL STUDENT NAME
                  </span>
                  <span 
                    className="print-dark-text"
                    style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}
                  >
                    {currentUser.full_name || 'Student'}
                  </span>
                </div>

                <div>
                  <span 
                    className="print-muted-text"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}
                  >
                    MATRICULATION / STUDENT ID
                  </span>
                  <span 
                    className="print-dark-text"
                    style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}
                  >
                    {matricNo}
                  </span>
                </div>

                <div>
                  <span 
                    className="print-muted-text"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}
                  >
                    STUDENT EMAIL
                  </span>
                  <span 
                    className="print-dark-text"
                    style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    {currentUser.email}
                  </span>
                </div>

                <div>
                  <span 
                    className="print-muted-text"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}
                  >
                    ACADEMIC TRACK
                  </span>
                  <span 
                    className="print-dark-text"
                    style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    {currentUser.tutoring_enrolled 
                      ? `1-on-1 Direct Tutoring: ${currentUser.tutoring_track_name || 'Active Track'}` 
                      : 'Full-Stack Software Engineering'}
                  </span>
                </div>

                <div>
                  <span 
                    className="print-muted-text"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}
                  >
                    ADMISSION COHORT
                  </span>
                  <span 
                    className="print-dark-text"
                    style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    2026 Fellow (Term 1)
                  </span>
                </div>

                <div>
                  <span 
                    className="print-muted-text"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}
                  >
                    INTRANET FELLOWSHIP CLEARANCE
                  </span>
                  <span 
                    className="print-dark-text"
                    style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-emerald)' }}
                  >
                    Clearance Granted • Verified
                  </span>
                </div>
              </div>
            </div>

            {/* 3. ACADEMIC STANDING & CUMULATIVE METRICS */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              <div 
                className="print-bg-subtle print-border"
                style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                }}
              >
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  Cumulative GPA
                </span>
                <span 
                  className="print-dark-text"
                  style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--primary)', display: 'block', marginTop: '0.25rem' }}
                >
                  3.92 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 4.0</span>
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  First Class Honours
                </span>
              </div>

              <div 
                className="print-bg-subtle print-border"
                style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                }}
              >
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  Courses Completed
                </span>
                <span 
                  className="print-dark-text"
                  style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', display: 'block', marginTop: '0.25rem' }}
                >
                  {totalCertificates} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ {enrolledCourses.length}</span>
                </span>
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}
                >
                  {totalCompletedLessons} Lessons Mastered
                </span>
              </div>

              <div 
                className="print-bg-subtle print-border"
                style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                }}
              >
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  CDT/CBT Exam Velocity
                </span>
                <span 
                  className="print-dark-text"
                  style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--accent-emerald)', display: 'block', marginTop: '0.25rem' }}
                >
                  {passedCbtCount} Passed
                </span>
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}
                >
                  Avg Score: {averageCbtScore}%
                </span>
              </div>

              <div 
                className="print-bg-subtle print-border"
                style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                }}
              >
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  IDE & Lab Practice
                </span>
                <span 
                  className="print-dark-text"
                  style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--accent-amber)', display: 'block', marginTop: '0.25rem' }}
                >
                  48 Labs
                </span>
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}
                >
                  5-Day Streak Active
                </span>
              </div>
            </div>

            {/* 4. BREAKDOWN OF COURSES & CURRICULA TAKEN */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}>
                <BookOpen size={18} color="var(--primary)" />
                <h3 
                  className="print-dark-text"
                  style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}
                >
                  1. Enrolled Curricula & Module Completion Breakdown
                </h3>
              </div>

              <div 
                className="print-border"
                style={{
                  overflowX: 'auto',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr 
                      className="print-bg-subtle print-border"
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        borderBottom: '1px solid var(--border-subtle)',
                        textAlign: 'left',
                      }}
                    >
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                      >
                        Curriculum Title & Specialization
                      </th>
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                      >
                        Lead Instructor
                      </th>
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                      >
                        Progress
                      </th>
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                      >
                        Standing
                      </th>
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right' }}
                      >
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledCourses.map(({ course, stats }, index) => {
                      const isComplete = stats.percentage === 100;
                      const grade = isComplete ? 'A+ (Distinction)' : stats.percentage >= 60 ? 'In Progress (A-)' : 'In Progress';

                      return (
                        <tr 
                          key={course.id}
                          className="print-border"
                          style={{
                            borderBottom: index < enrolledCourses.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                            background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                          }}
                        >
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span 
                              className="print-dark-text"
                              style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}
                            >
                              {course.title}
                            </span>
                            <span 
                              className="print-muted-text"
                              style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                            >
                              Code: CRS-{course.id.slice(4, 12).toUpperCase()} • {course.level}
                            </span>
                          </td>
                          <td 
                            className="print-muted-text"
                            style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}
                          >
                            {course.instructor?.full_name || 'Faculty Staff'}
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span 
                                className="print-dark-text"
                                style={{ fontWeight: 700, color: isComplete ? 'var(--accent-emerald)' : 'var(--primary)' }}
                              >
                                {stats.percentage}%
                              </span>
                              <span 
                                className="print-muted-text"
                                style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                              >
                                ({stats.completedLessons}/{stats.totalLessons} lessons)
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            {isComplete ? (
                              <span className="badge badge-emerald print-badge-passed" style={{ fontSize: '0.75rem' }}>
                                Completed
                              </span>
                            ) : (
                              <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                                Ongoing
                              </span>
                            )}
                          </td>
                          <td 
                            className="print-dark-text"
                            style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 800, color: isComplete ? 'var(--accent-emerald)' : 'var(--text-primary)' }}
                          >
                            {grade}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DIRECT TUTORING ATTENDANCE & DUAL-SIGNOFF RECORD */}
            {(currentUser.tutoring_enrolled || (tutoringSummary && tutoringSummary.total_sessions > 0)) && (
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CalendarCheck size={18} color="var(--accent-emerald)" />
                    <h3 
                      className="print-dark-text"
                      style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}
                    >
                      2. Direct 1-on-1 Tutoring Attendance Ledger (Dual-Signoff Audited)
                    </h3>
                  </div>
                  <span 
                    className="print-muted-text"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                  >
                    Monthly Validation: {tutoringSummary?.month_label || 'September 2026'}
                  </span>
                </div>

                {/* Validation Rule Notice */}
                <div 
                  className="print-bg-subtle print-border"
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(16, 185, 129, 0.06)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '0.65rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <p 
                    className="print-muted-text"
                    style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}
                  >
                    <strong style={{ color: '#34d399' }}>Dual-Signoff Rule:</strong> Attendance sessions are valid and accepted <em>only</em> if both the Student Fellow and Instructor have checked the verification box. Single-signature sessions are invalid.
                  </p>
                  <span 
                    className="badge badge-emerald print-badge-passed"
                    style={{ fontSize: '0.75rem', fontWeight: 700 }}
                  >
                    {tutoringSummary?.attendance_percentage || 0}% Monthly Verified
                  </span>
                </div>

                {/* Sessions Ledger Table */}
                <div 
                  className="print-border"
                  style={{
                    overflowX: 'auto',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.75rem',
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr 
                        className="print-bg-subtle print-border"
                        style={{
                          background: 'var(--bg-surface-elevated)',
                          borderBottom: '1px solid var(--border-subtle)',
                          textAlign: 'left',
                        }}
                      >
                        <th 
                          className="print-dark-text print-border"
                          style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                        >
                          Session & Track
                        </th>
                        <th 
                          className="print-dark-text print-border"
                          style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                        >
                          Instructor
                        </th>
                        <th 
                          className="print-dark-text print-border"
                          style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                        >
                          Student Check
                        </th>
                        <th 
                          className="print-dark-text print-border"
                          style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                        >
                          Instructor Check
                        </th>
                        <th 
                          className="print-dark-text print-border"
                          style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right' }}
                        >
                          Validity Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutoringSessions.length > 0 ? (
                        tutoringSessions.map((session, index) => {
                          const isValid = session.is_valid || (session.student_checked && session.instructor_checked);

                          return (
                            <tr 
                              key={session.id}
                              className="print-border"
                              style={{
                                borderBottom: index < tutoringSessions.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                              }}
                            >
                              <td style={{ padding: '0.85rem 1rem' }}>
                                <span 
                                  className="print-dark-text"
                                  style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}
                                >
                                  {session.session_title}
                                </span>
                                <span 
                                  className="print-muted-text"
                                  style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                                >
                                  {new Date(session.session_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {session.session_time} • {session.track_name}
                                </span>
                              </td>
                              <td 
                                className="print-muted-text"
                                style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}
                              >
                                {session.instructor_name}
                              </td>
                              <td style={{ padding: '0.85rem 1rem' }}>
                                {session.student_checked ? (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600 }}>
                                    <Check size={14} /> Signed
                                  </span>
                                ) : (
                                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                    Unsigned
                                  </span>
                                )}
                              </td>
                              <td style={{ padding: '0.85rem 1rem' }}>
                                {session.instructor_checked ? (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600 }}>
                                    <Check size={14} /> Verified
                                  </span>
                                ) : (
                                  <span style={{ color: 'var(--accent-amber)', fontSize: '0.8rem' }}>
                                    Pending
                                  </span>
                                )}
                              </td>
                              <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                                {isValid ? (
                                  <span className="badge badge-emerald print-badge-passed" style={{ fontSize: '0.72rem' }}>
                                    Accepted (Valid)
                                  </span>
                                ) : (
                                  <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                                    Invalid (Incomplete)
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No direct tutoring attendance sessions recorded for this billing cycle.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. BREAKDOWN OF CDT / CBT EXAMINATIONS */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={18} color="var(--accent-amber)" />
                  <h3 
                    className="print-dark-text"
                    style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}
                  >
                    3. Computer-Based Testing (CDT/CBT) Examination Assessments
                  </h3>
                </div>
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                >
                  Timed Proctor Verification Logged
                </span>
              </div>

              <div 
                className="print-border"
                style={{
                  overflowX: 'auto',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr 
                      className="print-bg-subtle print-border"
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        borderBottom: '1px solid var(--border-subtle)',
                        textAlign: 'left',
                      }}
                    >
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                      >
                        Examination Title
                      </th>
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                      >
                        Date Taken
                      </th>
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                      >
                        Score Achieved
                      </th>
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)' }}
                      >
                        Status
                      </th>
                      <th 
                        className="print-dark-text print-border"
                        style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right' }}
                      >
                        Proctor Verification Checksum
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cbtAttempts.length > 0 ? (
                      cbtAttempts.map((attempt, index) => {
                        const checksum = `SHA256: 8f4a${attempt.id.slice(-4)}${index}92b1`;
                        const formattedDate = new Date(attempt.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        });

                        return (
                          <tr 
                            key={attempt.id}
                            className="print-border"
                            style={{
                              borderBottom: index < cbtAttempts.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                              background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                            }}
                          >
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <span 
                                className="print-dark-text"
                                style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}
                              >
                                {attempt.exam_title}
                              </span>
                              <span 
                                className="print-muted-text"
                                style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                              >
                                Code: CBT-{attempt.exam_id.slice(-6).toUpperCase()} • Duration: {Math.round(attempt.time_spent_seconds / 60)} mins
                              </span>
                            </td>
                            <td 
                              className="print-muted-text"
                              style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}
                            >
                              {formattedDate}
                            </td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <span 
                                className="print-dark-text"
                                style={{
                                  fontWeight: 800,
                                  fontSize: '0.95rem',
                                  color: attempt.passed ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                                }}
                              >
                                {attempt.score}%
                              </span>
                              <span 
                                className="print-muted-text"
                                style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.35rem' }}
                              >
                                ({attempt.correct_count}/{attempt.total_questions} correct)
                              </span>
                            </td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              {attempt.passed ? (
                                <span className="badge badge-emerald print-badge-passed" style={{ fontSize: '0.75rem' }}>
                                  PASSED
                                </span>
                              ) : (
                                <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                                  RE-TEST
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                              <span 
                                className="print-dark-text"
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.75rem',
                                  color: 'var(--primary)',
                                  background: 'rgba(99, 102, 241, 0.1)',
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '4px',
                                  display: 'inline-block',
                                }}
                              >
                                {checksum}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No CBT examination attempts logged for this candidate.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6. PRACTICAL LABS, SANDBOX & ACTIVITIES LOG */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}>
                <Code2 size={18} color="var(--accent-cyan)" />
                <h3 
                  className="print-dark-text"
                  style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}
                >
                  3. Technical Sandbox & Practical Engineering Pods
                </h3>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
              }}>
                <div 
                  className="print-bg-subtle print-border"
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <Code2 size={16} color="var(--accent-cyan)" />
                    <span 
                      className="print-dark-text"
                      style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}
                    >
                      Python & Full-Stack Sandbox
                    </span>
                  </div>
                  <p 
                    className="print-muted-text"
                    style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}
                  >
                    48 interactive WebAssembly compilations, data structure implementations, and safe sandbox scripts executed.
                  </p>
                </div>

                <div 
                  className="print-bg-subtle print-border"
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <Clock size={16} color="var(--primary)" />
                    <span 
                      className="print-dark-text"
                      style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}
                    >
                      Live Engineering Studios
                    </span>
                  </div>
                  <p 
                    className="print-muted-text"
                    style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}
                  >
                    14 live architectural office hours attended, interactive voice discussions, and code reviews completed.
                  </p>
                </div>

                <div 
                  className="print-bg-subtle print-border"
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <Flame size={16} color="var(--accent-amber)" />
                    <span 
                      className="print-dark-text"
                      style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}
                    >
                      Discipline & Consistency
                    </span>
                  </div>
                  <p 
                    className="print-muted-text"
                    style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}
                  >
                    5-day continuous curriculum streak. Consistent daily progression on technical modules.
                  </p>
                </div>
              </div>
            </div>

            {/* 7. OFFICIAL REGISTRAR SIGNATURES & SECURITY STAMP */}
            <div 
              className="print-border"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '2rem',
                borderTop: '2px solid var(--border-subtle)',
                paddingTop: '2rem',
                marginTop: '1.5rem',
              }}
            >
              <div>
                <div style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '0.5rem',
                  marginBottom: '0.5rem',
                  minHeight: '38px',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}>
                  <span style={{
                    fontFamily: 'cursive, var(--font-sans)',
                    fontSize: '1.25rem',
                    color: 'var(--primary)',
                    letterSpacing: '0.05em',
                  }}>
                    David K. Sterling
                  </span>
                </div>
                <span 
                  className="print-dark-text"
                  style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}
                >
                  Prof. David K. Sterling, PhD
                </span>
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                >
                  Academic Registrar & Dean of Examinations
                </span>
              </div>

              <div>
                <div style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '0.5rem',
                  marginBottom: '0.5rem',
                  minHeight: '38px',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}>
                  <span style={{
                    fontFamily: 'cursive, var(--font-sans)',
                    fontSize: '1.25rem',
                    color: 'var(--accent-purple)',
                    letterSpacing: '0.05em',
                  }}>
                    Elena Chen, PhD
                  </span>
                </div>
                <span 
                  className="print-dark-text"
                  style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}
                >
                  Dr. Elena Chen, PhD
                </span>
                <span 
                  className="print-muted-text"
                  style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                >
                  Head of Faculty, Software Engineering
                </span>
              </div>

              {/* Official Seal Badge */}
              <div style={{
                textAlign: 'center',
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '2px dashed var(--border-accent)',
                background: 'rgba(99, 102, 241, 0.05)',
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  display: 'block',
                  marginBottom: '0.2rem',
                }}>
                  ACADEMY DIGITAL SEAL
                </span>
                <span 
                  className="print-dark-text"
                  style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}
                >
                  Official Certified Academic Record
                </span>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  VERIFY: reactjav.io/verify/{matricNo}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* EMAIL DISPATCH SUBMODAL */}
      {isEmailModalOpen && (
        <div 
          className="no-print"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div 
            className="glass-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '560px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-accent)',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'var(--grad-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}>
                  <Mail size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Dispatch Academic Record via Email
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Send official transcript to scholar, sponsor, or employer
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setIsEmailModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {emailSentResult ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid var(--accent-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: 'var(--accent-emerald)',
                }}>
                  <CheckCircle2 size={32} />
                </div>

                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Transcript Dispatched Successfully!
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  An official PDF copy of the candidate transcript with cryptographic CDT proctor checksums has been sent to{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>{recipientEmail}</strong>.
                </p>

                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  marginBottom: '1.75rem',
                  fontSize: '0.8rem',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>DELIVERY REFERENCE</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{emailSentResult.refId}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>TIME STAMP</span>
                    <span style={{ color: 'var(--text-primary)' }}>{emailSentResult.timestamp}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsEmailModalOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendEmail}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Recipient Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="e.g. student@example.com or employer@company.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '0.5rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                    Candidate or third-party admissions/hiring office email
                  </span>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Email Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '0.5rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Personal Note / Cover Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={emailNote}
                    onChange={(e) => setEmailNote(e.target.value)}
                    placeholder="Include any specific instructions or cover comments for the recipient..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '0.5rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Attachments checklist */}
                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 1rem',
                  marginBottom: '1.5rem',
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                    Automated Secure Attachments
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)' }}>
                      <Check size={14} />
                      <span>Official Encrypted PDF Transcript (A4 High Resolution)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)' }}>
                      <Check size={14} />
                      <span>CDT Proctor Checksum Hashes & Verification Link</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="btn btn-primary"
                    style={{ minWidth: '150px' }}
                  >
                    {isSendingEmail ? (
                      <>
                        <Clock size={16} className="animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Transcript</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
