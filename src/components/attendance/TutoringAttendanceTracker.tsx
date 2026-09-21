'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  ShieldAlert, 
  AlertCircle, 
  User, 
  GraduationCap, 
  Video, 
  Filter, 
  ChevronDown, 
  Plus, 
  Printer, 
  Sparkles, 
  Info, 
  Check, 
  ArrowRight,
  RefreshCw,
  FileCheck
} from 'lucide-react';
import { TutoringAttendanceSession, MonthlyAttendanceSummary, Profile, UserRole } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

interface TutoringAttendanceTrackerProps {
  initialRole?: UserRole;
  filterStudentId?: string;
  showHeaderBanner?: boolean;
  showMonthlySummaryOnly?: boolean;
}

export default function TutoringAttendanceTracker({
  initialRole,
  filterStudentId,
  showHeaderBanner = true,
  showMonthlySummaryOnly = false,
}: TutoringAttendanceTrackerProps) {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [availableMonths, setAvailableMonths] = useState<{ month: string; label: string }[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [sessions, setSessions] = useState<TutoringAttendanceSession[]>([]);
  const [monthlySummary, setMonthlySummary] = useState<MonthlyAttendanceSummary | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);

  // New session form states
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('14:00 - 15:30 GMT');
  const [newTopic, setNewTopic] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const loadData = () => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
    const role = initialRole || user?.role || 'student';
    setActiveRole(role);

    const months = LocalDataService.getAvailableAttendanceMonths();
    setAvailableMonths(months);
    const currMonth = selectedMonth || (months[0]?.month || new Date().toISOString().slice(0, 7));
    setSelectedMonth(currMonth);

    const studentFilter = filterStudentId || (role === 'student' ? user?.id : undefined);
    const list = LocalDataService.getTutoringAttendance({
      month: currMonth,
      studentId: studentFilter,
    });
    setSessions(list);

    const summary = LocalDataService.getMonthlyAttendanceSummary(currMonth, studentFilter);
    setMonthlySummary(summary);
  };

  useEffect(() => {
    loadData();

    const handleStorage = () => {
      loadData();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [selectedMonth, initialRole, filterStudentId]);

  const handleToggleStudentSignoff = (sessionId: string, currentVal: boolean) => {
    if (activeRole !== 'student' && activeRole !== 'admin' && activeRole !== 'super_admin') {
      setActionFeedback('Only the enrolled student (or administrator) can sign the student confirmation box.');
      setTimeout(() => setActionFeedback(null), 3000);
      return;
    }

    const res = LocalDataService.toggleStudentAttendanceSignoff(sessionId, !currentVal, currentUser?.id);
    loadData();
    setActionFeedback(res.message);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handleToggleInstructorSignoff = (sessionId: string, currentVal: boolean) => {
    if (activeRole !== 'instructor' && activeRole !== 'admin' && activeRole !== 'super_admin') {
      setActionFeedback('Only the assigned instructor (or administrator) can sign the teacher verification box.');
      setTimeout(() => setActionFeedback(null), 3000);
      return;
    }

    const res = LocalDataService.toggleInstructorAttendanceSignoff(sessionId, !currentVal, currentUser?.id);
    loadData();
    setActionFeedback(res.message);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    LocalDataService.addTutoringAttendanceSession({
      session_title: newTitle.trim(),
      session_date: newDate,
      session_time: newTime,
      topic_summary: newTopic.trim(),
      notes: newNotes.trim(),
      instructor_checked: activeRole === 'instructor' || activeRole === 'admin' || activeRole === 'super_admin',
    });

    setShowAddSessionModal(false);
    setNewTitle('');
    setNewTopic('');
    setNewNotes('');
    loadData();
    setActionFeedback('New 1-on-1 tutoring session scheduled into the monthly attendance ledger.');
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Toast Notification */}
      {actionFeedback && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 999,
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--primary)',
          borderRadius: '0.85rem',
          padding: '0.9rem 1.4rem',
          boxShadow: 'var(--shadow-xl)',
          color: 'var(--text-primary)',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          animation: 'fadeIn 0.2s ease-out forwards',
        }}>
          <Sparkles size={18} color="var(--primary)" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Header Banner */}
      {showHeaderBanner && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '1.25rem',
          padding: '1.75rem 2rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                Direct Tutoring Only
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Dual-Signoff Protocol
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                Audit Level: Strict Mutual Validation
              </span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Direct Tutoring Attendance & Verification Ledger
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.35rem 0 0', maxWidth: '680px', lineHeight: 1.5 }}>
              Attendance is <strong>only valid & accepted if both the student AND the instructor check their verification box</strong>. If only one party signs, the session remains incomplete and uncertified. At the end of each month, the record is visible across Student, Instructor, and Administrator portals.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {(activeRole === 'instructor' || activeRole === 'admin' || activeRole === 'super_admin') && (
              <button
                onClick={() => setShowAddSessionModal(true)}
                className="btn btn-primary btn-sm"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  gap: '0.4rem',
                }}
              >
                <Plus size={15} />
                <span>Log / Schedule Session</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.82rem', gap: '0.4rem' }}
              title="Print official monthly attendance statement"
            >
              <Printer size={15} />
              <span>Print Monthly Ledger</span>
            </button>
          </div>
        </div>
      )}

      {/* Monthly Selector & Control Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '1rem 1.25rem',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            <Calendar size={16} color="var(--primary)" />
            <span>Attendance Month:</span>
          </div>

          {/* Month Pills */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {availableMonths.map((m) => (
              <button
                key={m.month}
                onClick={() => setSelectedMonth(m.month)}
                style={{
                  background: selectedMonth === m.month ? 'var(--primary)' : 'var(--bg-surface-elevated)',
                  color: selectedMonth === m.month ? '#ffffff' : 'var(--text-secondary)',
                  border: selectedMonth === m.month ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  borderRadius: '0.6rem',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Signoff Legend Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#34d399', fontWeight: 600 }}>
            <CheckCircle2 size={13} color="#10b981" />
            <span>Both Checked = Valid</span>
          </span>
          <span style={{ color: 'var(--border-subtle)' }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24', fontWeight: 600 }}>
            <AlertCircle size={13} color="#f59e0b" />
            <span>One Checked = Invalid / Pending</span>
          </span>
        </div>
      </div>

      {/* Monthly Summary Statistics Grid */}
      {monthlySummary && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {/* Card 1: Total Sessions */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.875rem',
            padding: '1.25rem',
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>
              Total Sessions Scheduled
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {monthlySummary.total_sessions}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>in {monthlySummary.month_label}</span>
            </div>
          </div>

          {/* Card 2: Valid Accepted Sessions */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.06)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '0.875rem',
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Accepted & Valid Sessions
              </span>
              <ShieldCheck size={16} color="#10b981" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>
                {monthlySummary.valid_sessions}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                of {monthlySummary.total_sessions} dual-verified
              </span>
            </div>
          </div>

          {/* Card 3: Pending / Invalid Sessions */}
          <div style={{
            background: monthlySummary.pending_sessions > 0 ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-surface)',
            border: monthlySummary.pending_sessions > 0 ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid var(--border-subtle)',
            borderRadius: '0.875rem',
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', color: monthlySummary.pending_sessions > 0 ? '#fbbf24' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Incomplete / Single Sign-off
              </span>
              <AlertCircle size={16} color={monthlySummary.pending_sessions > 0 ? '#f59e0b' : 'var(--text-muted)'} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: monthlySummary.pending_sessions > 0 ? '#f59e0b' : 'var(--text-secondary)' }}>
                {monthlySummary.pending_sessions}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>awaiting second signature</span>
            </div>
          </div>

          {/* Card 4: Monthly Rate & Audit Status */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.875rem',
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Monthly Validation Rate
              </span>
              <span className={`badge ${monthlySummary.attendance_percentage >= 80 ? 'badge-emerald' : monthlySummary.attendance_percentage >= 60 ? 'badge-amber' : 'badge-primary'}`} style={{ fontSize: '0.68rem' }}>
                {monthlySummary.audit_status}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: monthlySummary.attendance_percentage >= 80 ? '#10b981' : '#f59e0b' }}>
                {monthlySummary.attendance_percentage}%
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>verified attendance</span>
            </div>
            {/* Progress bar */}
            <div style={{ width: '100%', height: '5px', background: 'var(--bg-surface-elevated)', borderRadius: '9999px', marginTop: '0.6rem', overflow: 'hidden' }}>
              <div style={{ width: `${monthlySummary.attendance_percentage}%`, height: '100%', background: monthlySummary.attendance_percentage >= 80 ? '#10b981' : '#f59e0b', borderRadius: '9999px' }} />
            </div>
          </div>
        </div>
      )}

      {/* If summary only requested, return early */}
      {showMonthlySummaryOnly && null}

      {/* Attendance Session Records List */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {/* Table Header / Subheading */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'var(--bg-surface-elevated)',
        }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Session Verification Ledger ({monthlySummary?.month_label || 'Current Month'})
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Dual signatures required. Checkboxes can be signed directly by student and teacher below.
            </span>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Viewing as Persona: <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{activeRole}</strong>
          </div>
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Calendar size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>No tutoring sessions scheduled for {monthlySummary?.month_label}.</p>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.82rem' }}>Sessions are logged automatically when direct tutoring sessions occur.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sessions.map((sess, idx) => {
              const isStudentChecked = sess.student_checked;
              const isInstructorChecked = sess.instructor_checked;
              const isValid = sess.is_valid;

              return (
                <div
                  key={sess.id}
                  style={{
                    padding: '1.5rem',
                    borderBottom: idx < sessions.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    background: isValid 
                      ? 'rgba(16, 185, 129, 0.02)' 
                      : (isStudentChecked || isInstructorChecked)
                      ? 'rgba(245, 158, 11, 0.03)'
                      : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  {/* Top row: Date, Title, Track, Overall Validity Badge */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--primary)',
                          background: 'rgba(99, 102, 241, 0.1)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '0.4rem',
                        }}>
                          <Calendar size={13} />
                          <span>{sess.session_date}</span>
                        </span>

                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {sess.session_time}
                        </span>

                        <span style={{ color: 'var(--border-subtle)' }}>•</span>

                        <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>
                          {sess.track_name}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                        {sess.session_title}
                      </h4>

                      {sess.topic_summary && (
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4, maxWidth: '720px' }}>
                          {sess.topic_summary}
                        </p>
                      )}
                    </div>

                    {/* Overall Validity Badge */}
                    <div>
                      {isValid ? (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.45rem 0.9rem',
                          borderRadius: '9999px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          color: '#34d399',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                        }}>
                          <ShieldCheck size={16} />
                          <span>ACCEPTED & VALIDATED</span>
                        </div>
                      ) : (isStudentChecked || isInstructorChecked) ? (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.45rem 0.9rem',
                          borderRadius: '9999px',
                          background: 'rgba(245, 158, 11, 0.15)',
                          border: '1px solid rgba(245, 158, 11, 0.4)',
                          color: '#fbbf24',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                        }}>
                          <AlertCircle size={16} />
                          <span>
                            {isStudentChecked 
                              ? 'INVALID • AWAITING INSTRUCTOR SIGN-OFF' 
                              : 'INVALID • AWAITING STUDENT CONFIRMATION'}
                          </span>
                        </div>
                      ) : (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.45rem 0.9rem',
                          borderRadius: '9999px',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-muted)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                        }}>
                          <Clock size={16} />
                          <span>PENDING BOTH SIGNATURES</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dual Sign-off Boxes Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.85rem',
                    padding: '1rem 1.25rem',
                  }}>
                    {/* Box 1: Student Verification Box */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      borderRadius: '0.65rem',
                      background: isStudentChecked ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface)',
                      border: isStudentChecked ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <img
                          src={sess.student_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                          alt={sess.student_name}
                          style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                            STUDENT CONFIRMATION
                          </span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {sess.student_name}
                          </span>
                          {isStudentChecked && sess.student_checked_at && (
                            <span style={{ fontSize: '0.68rem', color: '#10b981', display: 'block' }}>
                              Signed: {new Date(sess.student_checked_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Interactive Student Checkbox */}
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: (activeRole === 'student' || activeRole === 'admin' || activeRole === 'super_admin') ? 'pointer' : 'not-allowed',
                        userSelect: 'none',
                      }}>
                        <input
                          type="checkbox"
                          checked={isStudentChecked}
                          disabled={activeRole !== 'student' && activeRole !== 'admin' && activeRole !== 'super_admin'}
                          onChange={() => handleToggleStudentSignoff(sess.id, isStudentChecked)}
                          style={{
                            width: '20px',
                            height: '20px',
                            accentColor: '#10b981',
                            cursor: (activeRole === 'student' || activeRole === 'admin' || activeRole === 'super_admin') ? 'pointer' : 'not-allowed',
                          }}
                        />
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: isStudentChecked ? '#10b981' : 'var(--text-muted)' }}>
                          {isStudentChecked ? 'Confirmed' : 'Sign Off'}
                        </span>
                      </label>
                    </div>

                    {/* Box 2: Instructor Verification Box */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      borderRadius: '0.65rem',
                      background: isInstructorChecked ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface)',
                      border: isInstructorChecked ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <img
                          src={sess.instructor_avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80'}
                          alt={sess.instructor_name}
                          style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                            INSTRUCTOR VERIFICATION
                          </span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {sess.instructor_name}
                          </span>
                          {isInstructorChecked && sess.instructor_checked_at && (
                            <span style={{ fontSize: '0.68rem', color: '#10b981', display: 'block' }}>
                              Verified: {new Date(sess.instructor_checked_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Interactive Instructor Checkbox */}
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: (activeRole === 'instructor' || activeRole === 'admin' || activeRole === 'super_admin') ? 'pointer' : 'not-allowed',
                        userSelect: 'none',
                      }}>
                        <input
                          type="checkbox"
                          checked={isInstructorChecked}
                          disabled={activeRole !== 'instructor' && activeRole !== 'admin' && activeRole !== 'super_admin'}
                          onChange={() => handleToggleInstructorSignoff(sess.id, isInstructorChecked)}
                          style={{
                            width: '20px',
                            height: '20px',
                            accentColor: '#10b981',
                            cursor: (activeRole === 'instructor' || activeRole === 'admin' || activeRole === 'super_admin') ? 'pointer' : 'not-allowed',
                          }}
                        />
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: isInstructorChecked ? '#10b981' : 'var(--text-muted)' }}>
                          {isInstructorChecked ? 'Verified' : 'Sign Off'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Notes / Action row */}
                  {sess.notes && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Info size={13} color="var(--primary)" />
                      <span>Mentor Observation: {sess.notes}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add New Session Modal */}
      {showAddSessionModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1.25rem',
            maxWidth: '520px',
            width: '100%',
            padding: '2rem',
            boxShadow: 'var(--shadow-xl)',
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Schedule 1-on-1 Tutoring Session
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Create an entry in the direct tutoring attendance ledger. Both student and instructor will have to check the box for attendance to count as valid.
            </p>

            <form onSubmit={handleCreateSession} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                  Session Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Session 7: Capstone Deployment & CI/CD"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                    Session Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="input-field"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                    Session Time
                  </label>
                  <input
                    type="text"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="input-field"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                  Curriculum Topic / Syllabus Module
                </label>
                <input
                  type="text"
                  placeholder="e.g. Docker containerization and cloud orchestration"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                  Mentor Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Pre-session preparation notes or deliverables..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddSessionModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                >
                  Save to Attendance Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
