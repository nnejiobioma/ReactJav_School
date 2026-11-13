'use client';

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, Edit3, Plus, Shuffle } from 'lucide-react';
import { QuizQuestion } from '@/types';
import QuizQuestionEditorModal from '@/components/quiz/QuizQuestionEditorModal';

interface QuizRunnerProps {
  questions: QuizQuestion[];
  lessonTitle: string;
  onComplete: () => void;
  canEdit?: boolean;
  onUpdateQuestions?: (questions: QuizQuestion[]) => void;
}

const MAX_QUESTIONS_PER_ATTEMPT = 5;

function isFullDiagnosticQuiz(title: string): boolean {
  const lower = (title || '').toLowerCase();
  return lower.includes('pre-check') || lower.includes('post-check') || lower.includes('already know');
}

function sampleQuestionBank(bank: QuizQuestion[], count: number, fullDiagnostic = false): QuizQuestion[] {
  if (!bank) return [];
  if (fullDiagnostic || bank.length <= count) return bank;
  const shuffled = [...bank];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export default function QuizRunner({
  questions,
  lessonTitle,
  onComplete,
  canEdit = false,
  onUpdateQuestions,
}: QuizRunnerProps) {
  const isDiagnostic = isFullDiagnosticQuiz(lessonTitle);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() =>
    sampleQuestionBank(questions, MAX_QUESTIONS_PER_ATTEMPT, isDiagnostic)
  );
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isEditingQuestions, setIsEditingQuestions] = useState(false);

  const drawNewAttemptQuestions = useCallback(
    (sourceBank: QuizQuestion[], fullDiag: boolean) => {
      setActiveQuestions(sampleQuestionBank(sourceBank, MAX_QUESTIONS_PER_ATTEMPT, fullDiag));
      setCurrentIdx(0);
      setSelectedOption(null);
      setShowExplanation(false);
      setUserAnswers({});
      setIsFinished(false);
    },
    []
  );

  useEffect(() => {
    drawNewAttemptQuestions(questions, isDiagnostic);
    setAttemptNumber(1);
  }, [questions, lessonTitle, isDiagnostic, drawNewAttemptQuestions]);

  if (!questions || questions.length === 0) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <HelpCircle size={40} color="var(--accent-amber)" style={{ margin: '0 auto 1rem' }} />
        <h3>No Quiz Questions Configured</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: canEdit ? '1.5rem' : '0' }}>
          This module is currently being finalized by the instructor.
        </p>
        {canEdit && onUpdateQuestions && (
          <div>
            <button
              onClick={() => setIsEditingQuestions(true)}
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderColor: '#d97706',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Plus size={16} />
              <span>Add Checkpoint Assessment Questions</span>
            </button>
            {isEditingQuestions && (
              <QuizQuestionEditorModal
                isOpen={isEditingQuestions}
                lessonTitle={lessonTitle}
                initialQuestions={[]}
                onClose={() => setIsEditingQuestions(false)}
                onSave={(newQuestions) => {
                  onUpdateQuestions(newQuestions);
                  setIsEditingQuestions(false);
                  setCurrentIdx(0);
                  setSelectedOption(null);
                  setShowExplanation(false);
                  setUserAnswers({});
                  setIsFinished(false);
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  const isQuestionBank = !isDiagnostic && questions.length > MAX_QUESTIONS_PER_ATTEMPT;
  const quizQuestions = activeQuestions.length > 0 ? activeQuestions : questions;
  const currentQ = quizQuestions[currentIdx] || quizQuestions[0];

  const handleSelectOption = (index: number) => {
    if (showExplanation) return; // Prevent changing after revealing
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setUserAnswers((prev) => ({ ...prev, [currentIdx]: selectedOption }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Finished all questions
      setIsFinished(true);
      calculateResults();
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct_option_index) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / quizQuestions.length) * 100);
    if (isDiagnostic || percent >= 70) {
      // Diagnostic pre/post checks are ungraded (always complete); module knowledge checks require >= 70%
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
      onComplete();
    }
  };

  const handleRestart = () => {
    drawNewAttemptQuestions(questions, isDiagnostic);
    setAttemptNumber((n) => n + 1);
  };

  // Score calculations if finished
  const totalCorrect = quizQuestions.filter(
    (q, idx) => userAnswers[idx] === q.correct_option_index
  ).length;
  const scorePercent = Math.round((totalCorrect / quizQuestions.length) * 100);
  const isPassed = isDiagnostic || scorePercent >= 70;

  if (isFinished) {
    return (
      <div className="glass-card animate-fade-in" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{
          width: '4.5rem',
          height: '4.5rem',
          borderRadius: '50%',
          background: isPassed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          {isPassed ? (
            <Award size={36} color="var(--accent-emerald)" />
          ) : (
            <XCircle size={36} color="var(--accent-rose)" />
          )}
        </div>

        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          {isPassed ? 'Knowledge Check Passed!' : 'Review Recommended'}
        </h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1rem' }}>
          {isPassed
            ? `Fantastic work! You scored ${scorePercent}% (${totalCorrect}/${quizQuestions.length} correct). This lesson is now marked completed.`
            : `You scored ${scorePercent}% (${totalCorrect}/${quizQuestions.length} correct). A score of 70% or higher is required to master this module.`}
        </p>

        {isQuestionBank && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
            Question Bank Active ({questions.length} total questions in pool) — clicking Retake draws a fresh 5-question variation.
          </p>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={handleRestart} className="btn btn-secondary">
            <RotateCcw size={16} />
            <span>{isQuestionBank ? 'Retake Assessment (New Question Set)' : 'Retake Assessment'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      {/* Quiz Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <HelpCircle size={20} color="var(--accent-amber)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {isDiagnostic ? '10-Question Pre/Post Diagnostic Check (Ungraded)' : '5-Question Knowledge Check'}
          </span>
          {isQuestionBank && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '0.2rem 0.55rem',
                borderRadius: '9999px',
                background: 'rgba(99, 102, 241, 0.12)',
                color: '#a5b4fc',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}
              title="Questions are randomly drawn from a larger module question bank so retakes vary"
            >
              <Shuffle size={11} />
              <span>Bank Pool: {quizQuestions.length} of {questions.length} (Attempt #{attemptNumber})</span>
            </span>
          )}
          {canEdit && onUpdateQuestions && (
            <button
              onClick={() => setIsEditingQuestions(true)}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                padding: '0.25rem 0.65rem',
                color: 'var(--accent-amber)',
                borderColor: 'rgba(245, 158, 11, 0.35)',
                background: 'rgba(245, 158, 11, 0.08)',
                marginLeft: '0.25rem',
              }}
              title="Edit Checkpoint Assessment questions"
            >
              <Edit3 size={13} />
              <span>Edit Bank ({questions.length})</span>
            </button>
          )}
        </div>
        <span style={{
          fontSize: '0.825rem',
          color: 'var(--text-secondary)',
          background: 'var(--bg-surface-elevated)',
          padding: '0.2rem 0.6rem',
          borderRadius: '9999px',
        }}>
          Question {currentIdx + 1} of {quizQuestions.length}
        </span>
      </div>

      {/* Question Prompt */}
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '1.5rem',
        lineHeight: 1.4,
      }}>
        {currentQ.question}
      </h3>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {currentQ.options.map((option, oIdx) => {
          const isSelected = selectedOption === oIdx;
          const isCorrect = currentQ.correct_option_index === oIdx;

          let optionStyle = {
            padding: '1rem 1.25rem',
            borderRadius: '0.75rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            cursor: showExplanation ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          };

          if (!showExplanation && isSelected) {
            optionStyle.border = '1px solid var(--primary)';
            optionStyle.background = 'rgba(99, 102, 241, 0.15)';
          }

          if (showExplanation) {
            if (isCorrect) {
              optionStyle.border = '1px solid var(--accent-emerald)';
              optionStyle.background = 'rgba(16, 185, 129, 0.15)';
              optionStyle.color = '#10b981';
            } else if (isSelected && !isCorrect) {
              optionStyle.border = '1px solid var(--accent-rose)';
              optionStyle.background = 'rgba(244, 63, 94, 0.15)';
              optionStyle.color = '#e11d48';
            }
          }

          return (
            <div
              key={oIdx}
              onClick={() => handleSelectOption(oIdx)}
              style={optionStyle}
            >
              <span style={{ fontSize: '0.95rem' }}>{option}</span>
              {showExplanation && isCorrect && <CheckCircle2 size={18} color="var(--accent-emerald)" />}
              {showExplanation && isSelected && !isCorrect && <XCircle size={18} color="var(--accent-rose)" />}
            </div>
          );
        })}
      </div>

      {/* Explanation Box */}
      {showExplanation && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '0.75rem',
          background: 'var(--bg-surface-elevated)',
          borderLeft: '4px solid var(--primary)',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          animation: 'fadeIn 0.3s ease',
        }}>
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
            Explanation:
          </strong>
          {currentQ.explanation || 'Review the documentation for full architectural details.'}
        </div>
      )}

      {/* Bottom Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        {!showExplanation ? (
          <button
            onClick={handleConfirmAnswer}
            disabled={selectedOption === null}
            className="btn btn-primary"
            style={{ opacity: selectedOption === null ? 0.5 : 1 }}
          >
            <span>Submit Answer</span>
          </button>
        ) : (
          <button onClick={handleNext} className="btn btn-primary">
            <span>{currentIdx + 1 === quizQuestions.length ? 'View Results' : 'Next Question'}</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Checkpoint Assessment Question Editor Modal */}
      {isEditingQuestions && onUpdateQuestions && (
        <QuizQuestionEditorModal
          isOpen={isEditingQuestions}
          lessonTitle={lessonTitle}
          initialQuestions={questions}
          onClose={() => setIsEditingQuestions(false)}
          onSave={(newQuestions) => {
            onUpdateQuestions(newQuestions);
            setIsEditingQuestions(false);
            drawNewAttemptQuestions(newQuestions, isDiagnostic);
          }}
        />
      )}
    </div>
  );
}
