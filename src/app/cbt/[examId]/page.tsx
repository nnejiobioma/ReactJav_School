'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Timer, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Send,
  HelpCircle,
  X
} from 'lucide-react';
import { CBTExam, CBTAttempt, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import AccessGuard from '@/components/auth/AccessGuard';
import { formatTimeMMSS } from '@/lib/utils';

export default function CBTActiveExamRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  const [exam, setExam] = useState<CBTExam | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Exam answers & flags
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  // Countdown timer state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Submit confirmation dialog
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);

    const foundExam = LocalDataService.getCBTExamById(examId);
    if (foundExam) {
      setExam(foundExam);
      setSecondsRemaining(foundExam.duration_minutes * 60);
    }
  }, [examId]);

  // Start timer once exam loads
  useEffect(() => {
    if (!exam || secondsRemaining <= 0) return;

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Timer expired: auto-submit!
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [exam]);

  const handleSelectOption = (optionIndex: number) => {
    if (!exam) return;
    const currentQ = exam.questions[currentIdx];
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
  };

  const handleClearAnswer = () => {
    if (!exam) return;
    const currentQ = exam.questions[currentIdx];
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleFlag = () => {
    if (!exam) return;
    const currentQ = exam.questions[currentIdx];
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  const handleFinalSubmit = () => {
    if (!exam || !currentUser || isSubmitting) return;
    setIsSubmitting(true);
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate score
    let correctCount = 0;
    exam.questions.forEach((q) => {
      if (answers[q.id] === q.correct_option_index) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / exam.questions.length) * 100);
    const isPassed = scorePercent >= exam.passing_score_percent;
    const timeSpent = exam.duration_minutes * 60 - secondsRemaining;

    const attemptId = `att_${Date.now()}`;
    const attempt: CBTAttempt = {
      id: attemptId,
      user_id: currentUser.id,
      exam_id: exam.id,
      exam_title: exam.title,
      score: scorePercent,
      passed: isPassed,
      total_questions: exam.questions.length,
      answered_count: Object.keys(answers).length,
      correct_count: correctCount,
      time_spent_seconds: Math.max(timeSpent, 10),
      answers,
      flagged_questions: Array.from(flagged),
      created_at: new Date().toISOString(),
    };

    LocalDataService.saveCBTAttempt(attempt);
    router.push(`/cbt/results/${attemptId}`);
  };

  const handleAutoSubmit = () => {
    handleFinalSubmit();
  };

  if (!exam) {
    return (
      <AccessGuard level="authenticated" pageTitle="CBT Active Examination">
        <div className="container" style={{ padding: '2rem 1.5rem 5rem', maxWidth: '1000px' }}>
          <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>Initializing CBT Hall...</h2>
        </div>
      </AccessGuard>
    );
  }

  const currentQ = exam.questions[currentIdx];
  const isTimeCritical = secondsRemaining < 180; // < 3 mins remaining
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = exam.questions.length - answeredCount;
  const isFlagged = flagged.has(currentQ.id);

  return (
    <AccessGuard level="authenticated" pageTitle="CBT Active Examination">
      <div style={{
        minHeight: '100vh',
        background: '#070a10',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top CBT Hall Header */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(10, 14, 23, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0.75rem 1.5rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}>
            {/* Candidate & Exam details */}
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Standardized CBT Examination
              </span>
              <h2 style={{ fontSize: '1.1rem', color: '#ffffff', lineHeight: 1.2 }}>
                {exam.title}
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Candidate: {currentUser?.full_name} • Pass Mark: {exam.passing_score_percent}%
              </span>
            </div>

            {/* Center: Live Digital Countdown Timer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '0.75rem',
              background: isTimeCritical ? 'rgba(244, 63, 94, 0.2)' : 'var(--bg-surface-elevated)',
              border: isTimeCritical ? '2px solid var(--accent-rose)' : '1px solid var(--border-accent)',
              animation: isTimeCritical ? 'pulseGlow 1.5s infinite' : 'none',
            }}>
              <Timer size={22} color={isTimeCritical ? 'var(--accent-rose)' : 'var(--accent-amber)'} />
              <div style={{ textAlign: 'left' }}>
                <span style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  color: isTimeCritical ? '#fda4af' : '#ffffff',
                  lineHeight: 1,
                  display: 'block',
                }}>
                  {formatTimeMMSS(secondsRemaining)}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Remaining Time
                </span>
              </div>
            </div>

            {/* Right: Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn btn-sm"
              style={{
                background: 'var(--grad-emerald)',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                padding: '0.6rem 1.25rem',
              }}
            >
              <Send size={15} />
              <span>Finish & Submit Test</span>
            </button>
          </div>
        </header>

        {/* Main Examination Hall Content */}
        <div className="cbt-exam-layout">
          {/* Left Column: Current Question Card */}
          <div className="glass-card" style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)', border: '1px solid var(--border-subtle)' }}>
            {/* Question Sub-header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '1rem',
              marginBottom: '1.75rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  background: 'var(--bg-surface-elevated)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-subtle)',
                }}>
                  Question {currentIdx + 1} of {exam.questions.length}
                </span>
                <span className="badge badge-primary">{currentQ.topic}</span>
              </div>

              {/* Flag for Review Button */}
              <button
                onClick={handleToggleFlag}
                className={`btn btn-sm ${isFlagged ? 'btn-secondary' : 'btn-outline'}`}
                style={{
                  borderColor: isFlagged ? 'var(--accent-amber)' : 'var(--border-subtle)',
                  color: isFlagged ? 'var(--accent-amber)' : 'var(--text-secondary)',
                  padding: '0.4rem 0.8rem',
                }}
              >
                <Flag size={14} fill={isFlagged ? 'var(--accent-amber)' : 'none'} />
                <span>{isFlagged ? 'Flagged for Review' : 'Flag for Review'}</span>
              </button>
            </div>

            {/* Question Prompt */}
            <h3 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.5,
              marginBottom: '2rem',
            }}>
              {currentQ.question}
            </h3>

            {/* Options (A, B, C, D) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}>
              {currentQ.options.map((opt, oIdx) => {
                const letter = String.fromCharCode(65 + oIdx); // A, B, C, D
                const isSelected = answers[currentQ.id] === oIdx;

                return (
                  <div
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    style={{
                      padding: '1.1rem 1.25rem',
                      borderRadius: '0.75rem',
                      background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface)',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '0.5rem',
                      background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {letter}
                    </span>

                    <span style={{ fontSize: '1rem', color: isSelected ? '#ffffff' : 'var(--text-primary)', lineHeight: 1.4 }}>
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <button
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="btn btn-secondary btn-sm"
                style={{ opacity: currentIdx === 0 ? 0.4 : 1 }}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              {answers[currentQ.id] !== undefined && (
                <button
                  onClick={handleClearAnswer}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                >
                  <RotateCcw size={13} />
                  <span>Clear Option</span>
                </button>
              )}

              <button
                onClick={() => setCurrentIdx((prev) => Math.min(exam.questions.length - 1, prev + 1))}
                disabled={currentIdx === exam.questions.length - 1}
                className="btn btn-primary btn-sm"
                style={{ opacity: currentIdx === exam.questions.length - 1 ? 0.4 : 1 }}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: Question Navigator Palette */}
          <aside className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: '5.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                Question Palette
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {answeredCount}/{exam.questions.length} answered
              </span>
            </div>

            {/* Question Numbers Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}>
              {exam.questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isQFlagged = flagged.has(q.id);
                const isCurrent = idx === currentIdx;

                let bgColor = 'var(--bg-surface)';
                let textColor = 'var(--text-secondary)';
                let borderColor = 'var(--border-subtle)';

                if (isAnswered) {
                  bgColor = 'rgba(16, 185, 129, 0.2)';
                  textColor = '#6ee7b7';
                  borderColor = 'rgba(16, 185, 129, 0.4)';
                }

                if (isQFlagged) {
                  bgColor = 'rgba(245, 158, 11, 0.2)';
                  textColor = '#fcd34d';
                  borderColor = 'rgba(245, 158, 11, 0.5)';
                }

                if (isCurrent) {
                  borderColor = 'var(--primary)';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '0.5rem',
                      background: bgColor,
                      color: textColor,
                      border: `2px solid ${borderColor}`,
                      cursor: 'pointer',
                      fontWeight: isCurrent ? 800 : 600,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isCurrent ? '0 0 10px rgba(99, 102, 241, 0.5)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Palette Legend */}
            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(16, 185, 129, 0.4)', border: '1px solid #10b981' }} />
                <span>Answered ({answeredCount})</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(245, 158, 11, 0.4)', border: '1px solid #f59e0b' }} />
                <span>Flagged for Review ({flagged.size})</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }} />
                <span>Unanswered ({unansweredCount})</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Confirmation Submit Modal */}
        {showSubmitModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 600,
            padding: '1.5rem',
          }}>
            <div className="glass-card animate-fade-in" style={{
              width: '100%',
              maxWidth: '520px',
              background: 'var(--bg-surface-elevated)',
              border: '2px solid var(--border-accent)',
              padding: '2rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>Confirm CBT Submission</h3>
                <button onClick={() => setShowSubmitModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Are you sure you want to conclude and submit your examination? Once submitted, your answers will be locked and graded immediately.
              </p>

              <div style={{
                background: 'var(--bg-surface)',
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1.75rem',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.85rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Questions:</span>
                  <span style={{ fontWeight: 700, color: '#ffffff' }}>{exam.questions.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Questions Answered:</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{answeredCount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Flagged for Review:</span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-amber)' }}>{flagged.size}</span>
                </div>
                {unansweredCount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-rose)' }}>
                    <span>Unanswered Questions:</span>
                    <span style={{ fontWeight: 700 }}>{unansweredCount}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Return to Test
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="btn btn-primary btn-sm"
                  style={{ background: 'var(--grad-emerald)', color: '#ffffff' }}
                >
                  {isSubmitting ? 'Grading...' : 'Yes, Submit Final Exam'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AccessGuard>
  );
}
