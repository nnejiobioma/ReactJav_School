'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Check, 
  HelpCircle, 
  CheckCircle2, 
  Save, 
  ArrowUp, 
  ArrowDown, 
  Copy,
  AlertCircle
} from 'lucide-react';
import { QuizQuestion } from '@/types';

interface QuizQuestionEditorModalProps {
  isOpen: boolean;
  lessonTitle: string;
  initialQuestions: QuizQuestion[];
  onClose: () => void;
  onSave: (questions: QuizQuestion[]) => void;
}

export const createDefaultQuestion = (lessonId: string = '', index: number = 1): QuizQuestion => ({
  id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
  lesson_id: lessonId,
  question: `Checkpoint Question ${index}: What is the primary concept covered in this section?`,
  options: [
    'Option A: First principle concept (Correct Answer)',
    'Option B: Alternative approach',
    'Option C: Legacy configuration',
    'Option D: Unrelated implementation',
  ],
  correct_option_index: 0,
  explanation: 'Explanation: This option directly addresses the architectural principle established in this module.',
  position: index,
});

export default function QuizQuestionEditorModal({
  isOpen,
  lessonTitle,
  initialQuestions,
  onClose,
  onSave,
}: QuizQuestionEditorModalProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      setQuestions(JSON.parse(JSON.stringify(initialQuestions)));
    } else {
      setQuestions([createDefaultQuestion('', 1)]);
    }
    setActiveQuestionIdx(0);
    setValidationError(null);
  }, [initialQuestions, isOpen]);

  if (!isOpen) return null;

  const currentQ = questions[activeQuestionIdx] || questions[0];

  // Add a brand new question
  const handleAddQuestion = () => {
    const newQ = createDefaultQuestion('', questions.length + 1);
    const updated = [...questions, newQ];
    setQuestions(updated);
    setActiveQuestionIdx(updated.length - 1);
    setValidationError(null);
  };

  // Duplicate active question
  const handleDuplicateQuestion = (idx: number) => {
    const target = questions[idx];
    if (!target) return;
    const duplicated: QuizQuestion = {
      ...JSON.parse(JSON.stringify(target)),
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      question: `${target.question} (Copy)`,
      position: questions.length + 1,
    };
    const updated = [...questions.slice(0, idx + 1), duplicated, ...questions.slice(idx + 1)];
    setQuestions(updated);
    setActiveQuestionIdx(idx + 1);
  };

  // Delete question
  const handleDeleteQuestion = (idx: number) => {
    if (questions.length <= 1) {
      setValidationError('At least one question is required for the Checkpoint Assessment.');
      return;
    }
    const updated = questions.filter((_, i) => i !== idx);
    setQuestions(updated);
    if (activeQuestionIdx >= updated.length) {
      setActiveQuestionIdx(updated.length - 1);
    }
    setValidationError(null);
  };

  // Move question position up/down
  const handleMoveQuestion = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= questions.length) return;
    const updated = [...questions];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setQuestions(updated);
    setActiveQuestionIdx(targetIdx);
  };

  // Update current question field
  const handleUpdateCurrentQuestion = (field: keyof QuizQuestion, value: any) => {
    if (!currentQ) return;
    const updated = questions.map((q, i) => {
      if (i === activeQuestionIdx) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setQuestions(updated);
    setValidationError(null);
  };

  // Update specific option
  const handleUpdateOption = (optIdx: number, val: string) => {
    if (!currentQ) return;
    const newOptions = [...currentQ.options];
    newOptions[optIdx] = val;
    handleUpdateCurrentQuestion('options', newOptions);
  };

  // Add option to current question
  const handleAddOption = () => {
    if (!currentQ) return;
    if (currentQ.options.length >= 6) {
      setValidationError('A maximum of 6 options is supported per question.');
      return;
    }
    const newOptions = [...currentQ.options, `Option ${String.fromCharCode(65 + currentQ.options.length)}`];
    handleUpdateCurrentQuestion('options', newOptions);
  };

  // Remove option from current question
  const handleRemoveOption = (optIdx: number) => {
    if (!currentQ) return;
    if (currentQ.options.length <= 2) {
      setValidationError('A question must have at least 2 options.');
      return;
    }
    const newOptions = currentQ.options.filter((_, i) => i !== optIdx);
    let newCorrect = currentQ.correct_option_index;
    if (newCorrect === optIdx) {
      newCorrect = 0;
    } else if (newCorrect > optIdx) {
      newCorrect = newCorrect - 1;
    }
    const updated = questions.map((q, i) => {
      if (i === activeQuestionIdx) {
        return {
          ...q,
          options: newOptions,
          correct_option_index: newCorrect,
        };
      }
      return q;
    });
    setQuestions(updated);
  };

  // Save all questions
  const handleSaveAll = () => {
    // Validate that all questions have non-empty prompt and at least 2 non-empty options
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        setActiveQuestionIdx(i);
        setValidationError(`Question #${i + 1} has an empty question prompt.`);
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        setActiveQuestionIdx(i);
        setValidationError(`Question #${i + 1} has one or more empty options.`);
        return;
      }
    }

    const reIndexed = questions.map((q, i) => ({
      ...q,
      position: i + 1,
    }));

    onSave(reIndexed);
    onClose();
  };

  return (
    <div 
      className="responsive-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="glass-card responsive-modal-card"
        style={{
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7), 0 0 32px rgba(245, 158, 11, 0.15)',
          background: 'linear-gradient(180deg, rgba(20, 24, 39, 0.98) 0%, rgba(13, 16, 28, 0.98) 100%)',
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
            }}>
              <HelpCircle size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Checkpoint Assessment Builder
                </h3>
                <span className="badge badge-amber" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                  {questions.length} {questions.length === 1 ? 'Question' : 'Questions'}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {lessonTitle || 'Interactive Quiz Module'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleAddQuestion}
              className="btn btn-primary btn-sm"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderColor: '#d97706',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Plus size={15} />
              <span>Add Question</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.5rem',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
              title="Close builder"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '0.65rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#fca5a5',
            fontSize: '0.85rem',
          }}>
            <AlertCircle size={16} />
            <span>{validationError}</span>
          </div>
        )}

        {/* Main Body: Two Columns (Left: Question List / Right: Question Editor) */}
        <div className="quiz-modal-grid">
          {/* Left Column: Questions Sidebar */}
          <div 
            className="quiz-modal-sidebar"
            style={{
              background: 'rgba(0, 0, 0, 0.25)',
              borderRight: '1px solid var(--border-subtle)',
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              padding: '0 0.25rem',
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Questions ({questions.length})
              </span>
              <button
                type="button"
                onClick={handleAddQuestion}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-amber)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}
              >
                <Plus size={13} />
                <span>Add</span>
              </button>
            </div>

            {questions.map((q, idx) => {
              const isActive = idx === activeQuestionIdx;
              return (
                <div
                  key={q.id || idx}
                  onClick={() => {
                    setActiveQuestionIdx(idx);
                    setValidationError(null);
                  }}
                  style={{
                    padding: '0.75rem 0.85rem',
                    borderRadius: '0.65rem',
                    background: isActive ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '1px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: isActive ? 'var(--accent-amber)' : '#ffffff',
                    }}>
                      Question #{idx + 1}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {q.options.length} options
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {q.question || '(Empty question prompt)'}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Question Editor Workspace */}
          {currentQ && (
            <div style={{
              padding: '1.75rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}>
              {/* Question Header & Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Editing Question #{activeQuestionIdx + 1}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Set question prompt, multiple choice answers, and mark the correct option.
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => handleMoveQuestion(activeQuestionIdx, 'up')}
                    disabled={activeQuestionIdx === 0}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.6rem' }}
                    title="Move up"
                  >
                    <ArrowUp size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveQuestion(activeQuestionIdx, 'down')}
                    disabled={activeQuestionIdx === questions.length - 1}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.6rem' }}
                    title="Move down"
                  >
                    <ArrowDown size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDuplicateQuestion(activeQuestionIdx)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    title="Duplicate this question"
                  >
                    <Copy size={13} />
                    <span>Duplicate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(activeQuestionIdx)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      borderRadius: '0.4rem',
                      padding: '0.35rem 0.65rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.75rem',
                    }}
                    title="Delete question"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Question Prompt Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                  Question Prompt / Problem Statement
                </label>
                <textarea
                  value={currentQ.question}
                  onChange={(e) => handleUpdateCurrentQuestion('question', e.target.value)}
                  rows={3}
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.65rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                  }}
                  placeholder="e.g. Which PostgreSQL clause guarantees that a row cannot be modified unless the policy condition is satisfied?"
                />
              </div>

              {/* Options & Correct Answer Selection */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', display: 'block' }}>
                      Answer Options (Select the correct option with the radio button)
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Students will select from these options during the Checkpoint Assessment.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}
                  >
                    <Plus size={13} />
                    <span>Add Option</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentQ.options.map((opt, optIdx) => {
                    const isCorrect = currentQ.correct_option_index === optIdx;
                    return (
                      <div
                        key={optIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface)',
                          border: isCorrect ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                          borderRadius: '0.65rem',
                          padding: '0.6rem 0.85rem',
                        }}
                      >
                        {/* Radio selector for correct answer */}
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: isCorrect ? 'var(--accent-emerald)' : 'var(--text-muted)',
                            flexShrink: 0,
                          }}
                          title="Set as correct answer"
                        >
                          <input
                            type="radio"
                            name={`correct_opt_${activeQuestionIdx}`}
                            checked={isCorrect}
                            onChange={() => handleUpdateCurrentQuestion('correct_option_index', optIdx)}
                            style={{ accentColor: '#10b981', width: '16px', height: '16px', cursor: 'pointer' }}
                          />
                          <span>Option {String.fromCharCode(65 + optIdx)}</span>
                        </label>

                        {/* Option Text Input */}
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleUpdateOption(optIdx, e.target.value)}
                          className="form-input"
                          style={{
                            flexGrow: 1,
                            padding: '0.45rem 0.75rem',
                            borderRadius: '0.4rem',
                            background: 'rgba(0,0,0,0.3)',
                            border: isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                            color: '#ffffff',
                            fontSize: '0.875rem',
                          }}
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)} text...`}
                        />

                        {isCorrect && (
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: 'var(--accent-emerald)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            flexShrink: 0,
                          }}>
                            <CheckCircle2 size={15} /> Correct
                          </span>
                        )}

                        {/* Remove Option Button */}
                        {currentQ.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(optIdx)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '0.25rem',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            title="Remove this option"
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation Field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                  Explanation / Answer Rationale
                </label>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Shown to students immediately after submitting their choice to reinforce learning.
                </p>
                <textarea
                  value={currentQ.explanation || ''}
                  onChange={(e) => handleUpdateCurrentQuestion('explanation', e.target.value)}
                  rows={2}
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#c7d2fe',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                  }}
                  placeholder="e.g. The WITH CHECK clause enforces security conditions on INSERT and UPDATE operations..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)',
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Total Questions configured: <strong style={{ color: '#ffffff' }}>{questions.length}</strong>
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderColor: '#d97706',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
              }}
            >
              <Save size={16} />
              <span>Save & Persist Questions ({questions.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
