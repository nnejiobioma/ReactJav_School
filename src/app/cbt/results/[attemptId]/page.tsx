'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  ArrowLeft, 
  Printer, 
  Download, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  BarChart2,
  Calendar,
  UserCheck
} from 'lucide-react';
import { CBTAttempt, CBTExam, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { formatDuration } from '@/lib/utils';

export default function CBTResultPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params.attemptId as string;

  const [attempt, setAttempt] = useState<CBTAttempt | null>(null);
  const [exam, setExam] = useState<CBTExam | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [showSlipModal, setShowSlipModal] = useState(false);

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);

    const foundAttempt = LocalDataService.getCBTAttemptById(attemptId);
    if (foundAttempt) {
      setAttempt(foundAttempt);
      const foundExam = LocalDataService.getCBTExamById(foundAttempt.exam_id);
      if (foundExam) {
        setExam(foundExam);
      }

      // If passed, launch celebration
      if (foundAttempt.passed) {
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    }
  }, [attemptId]);

  if (!attempt) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>Transcript Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The specified CBT examination record could not be retrieved.
        </p>
        <Link href="/cbt" className="btn btn-primary">
          Return to CBT Center
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
      {/* Top Breadcrumb */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/cbt" className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} />
          <span>Back to CBT Examination Hall</span>
        </Link>
      </div>

      {/* Main Score Banner */}
      <div className="glass-card animate-fade-in" style={{
        padding: '3rem 2rem',
        marginBottom: '2.5rem',
        textAlign: 'center',
        background: attempt.passed
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(10, 13, 20, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(10, 13, 20, 0.95) 100%)',
        border: attempt.passed ? '2px solid rgba(16, 185, 129, 0.4)' : '2px solid rgba(244, 63, 94, 0.4)',
      }}>
        <div style={{
          width: '5rem',
          height: '5rem',
          borderRadius: '50%',
          background: attempt.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: attempt.passed ? '0 0 30px rgba(16, 185, 129, 0.4)' : '0 0 30px rgba(244, 63, 94, 0.4)',
        }}>
          {attempt.passed ? (
            <Award size={40} color="var(--accent-emerald)" />
          ) : (
            <XCircle size={40} color="var(--accent-rose)" />
          )}
        </div>

        <span className={`badge ${attempt.passed ? 'badge-emerald' : 'badge-amber'}`} style={{ marginBottom: '0.75rem' }}>
          {attempt.passed ? 'Examination Passed' : 'Minimum Threshold Not Met'}
        </span>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
          Score: {attempt.score}%
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          {attempt.passed
            ? `Congratulations, ${currentUser?.full_name}! You demonstrated required competency in ${attempt.exam_title}.`
            : `You scored ${attempt.score}% (${attempt.correct_count} of ${attempt.total_questions} correct). A score of 70% or higher is required to pass.`}
        </p>

        {/* Metrics Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem',
          padding: '1rem',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '0.75rem',
          maxWidth: '650px',
          margin: '0 auto 2rem',
        }}>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
              {attempt.correct_count} / {attempt.total_questions}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Correct Answers</span>
          </div>

          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
              {attempt.answered_count}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Questions Answered</span>
          </div>

          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
              {formatDuration(attempt.time_spent_seconds)}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Time Elapsed</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowSlipModal(true)}
            className="btn btn-primary"
            style={{ boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)' }}
          >
            <Printer size={16} />
            <span>Print Official CBT Result Slip</span>
          </button>

          <Link href={`/cbt/${attempt.exam_id}`} className="btn btn-secondary">
            <RotateCcw size={16} />
            <span>Retake Examination</span>
          </Link>
        </div>
      </div>

      {/* Question-by-Question Detailed Review */}
      {exam && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <BarChart2 size={20} color="var(--primary)" />
              <h2 style={{ fontSize: '1.35rem', color: '#ffffff' }}>
                Itemized Question Review & Explanations
              </h2>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Detailed audit trail
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {exam.questions.map((q, idx) => {
              const selectedIdx = attempt.answers[q.id];
              const isCorrect = selectedIdx === q.correct_option_index;
              const isSkipped = selectedIdx === undefined;

              return (
                <div
                  key={q.id}
                  className="glass-card"
                  style={{
                    padding: '1.75rem',
                    borderLeft: `4px solid ${isCorrect ? 'var(--accent-emerald)' : isSkipped ? 'var(--text-muted)' : 'var(--accent-rose)'}`,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
                        Question {idx + 1}
                      </span>
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                        {q.topic}
                      </span>
                    </div>

                    <span className={`badge ${isCorrect ? 'badge-emerald' : isSkipped ? 'badge-primary' : 'badge-amber'}`}>
                      {isCorrect ? 'Correct (+1.0)' : isSkipped ? 'Unanswered (0.0)' : 'Incorrect (0.0)'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '1.25rem', lineHeight: 1.4 }}>
                    {q.question}
                  </h3>

                  {/* Options with Review Highlights */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    {q.options.map((opt, oIdx) => {
                      const letter = String.fromCharCode(65 + oIdx);
                      const isOptionCorrect = oIdx === q.correct_option_index;
                      const isOptionSelected = oIdx === selectedIdx;

                      let optBg = 'var(--bg-surface)';
                      let optBorder = 'var(--border-subtle)';
                      let optColor = 'var(--text-secondary)';

                      if (isOptionCorrect) {
                        optBg = 'rgba(16, 185, 129, 0.15)';
                        optBorder = '1px solid var(--accent-emerald)';
                        optColor = '#6ee7b7';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        optBg = 'rgba(244, 63, 94, 0.15)';
                        optBorder = '1px solid var(--accent-rose)';
                        optColor = '#fda4af';
                      }

                      return (
                        <div
                          key={oIdx}
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            background: optBg,
                            border: optBorder,
                            color: optColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.9rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontWeight: 800 }}>{letter}.</span>
                            <span>{opt}</span>
                          </div>

                          {isOptionCorrect && (
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                              Correct Answer
                            </span>
                          )}
                          {isOptionSelected && !isOptionCorrect && (
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
                              Your Choice
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Pedagogical Explanation */}
                  <div style={{
                    padding: '0.85rem 1rem',
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: '0.5rem',
                    borderLeft: '3px solid var(--primary)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}>
                    <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.2rem' }}>
                      Explanation:
                    </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Official CBT Result Slip Modal */}
      {showSlipModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 700,
          padding: '1.5rem',
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '720px',
            background: '#ffffff',
            color: '#0f172a',
            padding: '3rem',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            border: '3px double #cbd5e1',
          }}>
            {/* Print Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#4f46e5' }}>
                ReactJav Standardized Examination Board
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>
                OFFICIAL CBT RESULT TRANSCRIPT
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Computer-Based Testing Assessment System • Verified Credential Slip
              </span>
            </div>

            {/* Candidate & Test Meta Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.25rem',
              marginBottom: '2rem',
              fontSize: '0.875rem',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '1.5rem',
            }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Candidate Full Name</span>
                <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{currentUser?.full_name}</strong>
              </div>

              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Candidate ID</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  {currentUser?.id?.toUpperCase() || 'RJ-CAND-2026'}
                </strong>
              </div>

              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Examination Title</span>
                <strong style={{ color: '#0f172a' }}>{attempt.exam_title}</strong>
              </div>

              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Examination Date</span>
                <strong style={{ color: '#0f172a' }}>
                  {new Date(attempt.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </strong>
              </div>
            </div>

            {/* Performance Summary Box */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', display: 'block' }}>
                  {attempt.total_questions}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Items</span>
              </div>

              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669', display: 'block' }}>
                  {attempt.correct_count}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Score Raw</span>
              </div>

              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: attempt.passed ? '#059669' : '#e11d48', display: 'block' }}>
                  {attempt.score}%
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Percentage</span>
              </div>

              <div>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: attempt.passed ? '#059669' : '#e11d48',
                  display: 'block',
                  textTransform: 'uppercase',
                }}>
                  {attempt.passed ? 'PASSED' : 'FAILED'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Final Status</span>
              </div>
            </div>

            {/* Security Verification Barcode & Seal */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '2px solid #e2e8f0',
              paddingTop: '1.25rem',
              fontSize: '0.75rem',
              color: '#64748b',
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', fontWeight: 700, color: '#0f172a', display: 'block' }}>
                  VERIFY: RJ-CBT-{attempt.id.toUpperCase()}
                </span>
                <span>Digitally Certified by ReactJav Testing Engine</span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 700, color: '#0f172a', display: 'block' }}>
                  Certified Registrar
                </span>
                <span>Office of Academic Accreditation</span>
              </div>
            </div>

            {/* Modal Controls */}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={() => setShowSlipModal(false)}
                className="btn btn-secondary btn-sm"
                style={{ color: '#0f172a', background: '#e2e8f0' }}
              >
                Close Slip
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-primary btn-sm"
              >
                <Printer size={15} />
                <span>Print Official Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
