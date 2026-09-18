'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Timer, 
  Award, 
  HelpCircle, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Play, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { CBTExam, CBTAttempt, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { formatDuration } from '@/lib/utils';
import IntranetGuard from '@/components/intranet/IntranetGuard';

export default function CBTExamCenterPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [exams, setExams] = useState<CBTExam[]>([]);
  const [attempts, setAttempts] = useState<CBTAttempt[]>([]);
  const [selectedExamForModal, setSelectedExamForModal] = useState<CBTExam | null>(null);

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
    setExams(LocalDataService.getCBTExams());
    setAttempts(LocalDataService.getCBTAttempts(user.id));
  }, []);

  const handleStartExam = (examId: string) => {
    router.push(`/cbt/${examId}`);
  };

  const difficultyClass = {
    Beginner: 'badge-emerald',
    Intermediate: 'badge-primary',
    Advanced: 'badge-amber',
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
      {/* Top Banner */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 1rem',
          borderRadius: '9999px',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          color: '#fcd34d',
          fontWeight: 600,
        }}>
          <Timer size={16} color="var(--accent-amber)" />
          <span>Standardized Computer-Based Testing (CBT) Center</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}>
          Timed Examination & Certification Engine
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          margin: '0 auto',
          fontSize: '1rem',
          lineHeight: 1.6,
        }}>
          Simulated rigorous standardized testing environment. Features live countdown timers, question navigator palettes, instant objective evaluation, and official result transcripts.
        </p>
      </div>

      {/* Candidate Verification Card */}
      <div className="glass-card" style={{
        padding: '1.5rem 2rem',
        marginBottom: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
        border: '1px solid var(--border-accent)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt="Candidate"
            style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--primary)', objectFit: 'cover' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {currentUser?.full_name}
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                {currentUser?.tutoring_enrolled ? `Tutoring Fellow (${currentUser.tutoring_track_name})` : 'Verified Candidate'}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Candidate ID: {currentUser?.id?.toUpperCase() || 'CAND-9402'} • {currentUser?.tutoring_enrolled ? '1-on-1 Tutoring Study Assessment Track Active' : 'Browser System Ready'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>
              {attempts.length} Tests
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed Attempts</span>
          </div>

          <div style={{
            padding: '0.5rem 1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '0.5rem',
            fontSize: '0.8rem',
            color: '#6ee7b7',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <ShieldCheck size={16} />
            <span>Anti-Cheating Timer Active</span>
          </div>
        </div>
      </div>

      {/* Available CBT Exams Grid */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.75rem',
        }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
            Active Examination Schedules
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {exams.length} Standardized Exams Available
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
        }}>
          {exams.map((exam) => {
            const diffClass = difficultyClass[exam.difficulty] || 'badge-primary';
            const userAttempts = attempts.filter((a) => a.exam_id === exam.id);
            const highestScore = userAttempts.length > 0 ? Math.max(...userAttempts.map((a) => a.score)) : null;

            return (
              <div
                key={exam.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.75rem',
                  position: 'relative',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className={`badge ${diffClass}`}>{exam.difficulty}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{exam.category}</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {exam.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                    {exam.description}
                  </p>

                  {/* Exam Specs */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    background: 'var(--bg-surface-elevated)',
                    padding: '0.75rem',
                    borderRadius: '0.65rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                  }}>
                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>
                        {exam.duration_minutes}m
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Duration</span>
                    </div>

                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>
                        {exam.total_questions}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Questions</span>
                    </div>

                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-amber)', display: 'block' }}>
                        {exam.passing_score_percent}%
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pass Mark</span>
                    </div>
                  </div>
                </div>

                <div>
                  {highestScore !== null && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      marginBottom: '1rem',
                      padding: '0.4rem 0.75rem',
                      background: highestScore >= exam.passing_score_percent ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                      borderRadius: '0.5rem',
                      color: highestScore >= exam.passing_score_percent ? '#10b981' : '#f43f5e',
                    }}>
                      <span>Highest Attempt Score:</span>
                      <span style={{ fontWeight: 700 }}>{highestScore}%</span>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedExamForModal(exam)}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    <Play size={16} />
                    <span>Enter Examination Hall</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Past CBT Attempts Transcript History */}
      {attempts.length > 0 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Award size={20} color="var(--accent-amber)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                Your CBT Examination Transcripts
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Official candidate records
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Examination Title</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Date Taken</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Score</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Time Used</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((att) => (
                  <tr key={att.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {att.exam_title}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                      {new Date(att.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: att.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                        {att.score}%
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.35rem' }}>
                        ({att.correct_count}/{att.total_questions})
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${att.passed ? 'badge-emerald' : 'badge-amber'}`}>
                        {att.passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                      {formatDuration(att.time_spent_seconds)}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <Link
                        href={`/cbt/results/${att.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <FileText size={14} />
                        <span>View Result Slip</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pre-Exam Instructions Modal */}
      {selectedExamForModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 600,
          padding: '1.5rem',
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '600px',
            background: 'var(--bg-surface-elevated)',
            border: '2px solid rgba(245, 158, 11, 0.5)',
            padding: '2rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Timer size={24} color="var(--accent-amber)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                  {selectedExamForModal.title}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Standardized CBT Candidate Briefing
                </span>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-subtle)',
            }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Important Examination Instructions:
              </h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li>
                  <strong>Time Limit:</strong> You have exactly <strong>{selectedExamForModal.duration_minutes} minutes</strong> to answer {selectedExamForModal.total_questions} questions.
                </li>
                <li>
                  <strong>Auto-Submission:</strong> When the countdown timer reaches <code>00:00</code>, your test will be automatically submitted and evaluated immediately.
                </li>
                <li>
                  <strong>Question Palette:</strong> You can jump between questions at any time using the numbered navigator palette.
                </li>
                <li>
                  <strong>Review Flags:</strong> Click "Flag for Review" on any question you wish to re-check before final submission.
                </li>
                <li>
                  <strong>Pass Requirement:</strong> A minimum score of <strong>{selectedExamForModal.passing_score_percent}%</strong> is required to earn the official Certification Result Slip.
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setSelectedExamForModal(null)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStartExam(selectedExamForModal.id)}
                className="btn btn-primary btn-sm"
                style={{ background: 'var(--grad-amber)', color: '#000000', fontWeight: 700 }}
              >
                <span>I Understand • Begin Examination</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
