'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  ExternalLink,
  CheckCircle2,
  Code,
  List,
  Heading
} from 'lucide-react';
import { Lesson, LessonQaItem, LessonResourceItem } from '@/types';

export type LessonEditorSection = 'summary' | 'notes' | 'qa' | 'resources';

interface LessonTabEditorModalProps {
  isOpen: boolean;
  initialSection: LessonEditorSection;
  lesson: Lesson;
  onClose: () => void;
  onSave: (updatedLesson: Lesson) => void;
}

export const DEFAULT_SUMMARY = 
  "In this lecture, we explore how Postgres Row-Level Security coordinates with JWT tokens emitted by Supabase Auth. Because policies evaluate directly against database rows before query results are serialized, unauthorized consumers cannot access tenant information even if an API route fails to include filtering constraints.";

export const DEFAULT_TIP = 
  "Ensure that all foreign keys referenced in your security policies (e.g. user_id and course_id) have B-Tree indices to maintain sub-millisecond query planning speeds.";

export const DEFAULT_LECTURE_NOTES = 
`### Core Architecture & Execution Model
1. **Authentication Token Lifecycle**: When a client sends requests, the Bearer token carries identity claims (\`auth.uid()\`, role, and email).
2. **Postgres RLS Policy Engine**: The database evaluates each SQL row against the configured security expressions prior to returning results.
3. **Multi-Tenant Isolation**: Row-level policies eliminate accidental data leakage across distinct organizations or learners.

### Key Implementation Guidelines
- Always enable Row-Level Security on newly generated tables:
\`\`\`sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
\`\`\`
- Prefer using explicit \`USING\` and \`WITH CHECK\` clauses to distinguish read and write constraints.
- Create covering indexes on tenant identifier columns to keep evaluation latency under 1ms.`;

export const DEFAULT_QA_ITEMS: LessonQaItem[] = [
  {
    id: 'qa-1',
    user_name: 'Marcus Reed',
    time_ago: '2 hours ago',
    question: 'Does Supabase automatically cache RLS policy checks between identical queries in a connection pool?',
    answer: "Yes, Postgres query plans cache parsed statements, but the boolean policy expression is re-evaluated per row based on the session's active auth.uid() context.",
    answered_by: 'Lead Instructor',
  },
  {
    id: 'qa-2',
    user_name: 'Sarah Chen',
    time_ago: '5 hours ago',
    question: 'What is the recommended pattern for testing sub-lessons and module dependencies before deploying to production?',
    answer: 'We recommend setting up staging seed scripts that mimic the schema migrations and running automated test suites against your edge functions before committing.',
    answered_by: 'Course Staff',
  },
  {
    id: 'qa-3',
    user_name: 'Alex Miller',
    time_ago: '1 day ago',
    question: 'Can we attach custom metadata to JWT claims for fine-grained role evaluation?',
    answer: 'Yes, you can use Supabase Auth hooks or Postgres functions to include organizational context directly inside the JWT payload.',
    answered_by: 'Security Mentor',
  },
  {
    id: 'qa-4',
    user_name: 'Elena Rostova',
    time_ago: '2 days ago',
    question: 'How do we handle real-time subscriptions with complex filter criteria across multiple relational tables?',
    answer: "You can specify filter parameters in the supabase-js channel subscription (e.g., filter: 'room_id=eq.' + roomId) or use private broadcast channels.",
    answered_by: 'Lead Instructor',
  }
];

export const DEFAULT_RESOURCES: LessonResourceItem[] = [
  {
    id: 'res-1',
    name: 'Supabase-Postgres-Schema-Starter.sql',
    type: 'SQL Migration',
    size: '14 KB',
    url: '#',
    description: 'Complete production schema setup with RLS policies and table indexes.',
  },
  {
    id: 'res-2',
    name: 'Lecture-Slide-Deck-Key-Concepts.pdf',
    type: 'PDF Document',
    size: '2.4 MB',
    url: '#',
    description: 'High-resolution slide presentation covering architectural diagrams.',
  },
  {
    id: 'res-3',
    name: 'Production-Security-Checklist.md',
    type: 'Cheatsheet',
    size: '8 KB',
    url: '#',
    description: 'Pre-flight deployment verification checklist for student projects.',
  }
];

export default function LessonTabEditorModal({
  isOpen,
  initialSection,
  lesson,
  onClose,
  onSave,
}: LessonTabEditorModalProps) {
  const [activeSection, setActiveSection] = useState<LessonEditorSection>(initialSection);
  const [summary, setSummary] = useState(lesson.summary || DEFAULT_SUMMARY);
  const [implementationTip, setImplementationTip] = useState(lesson.implementation_tip || DEFAULT_TIP);
  const [lectureNotes, setLectureNotes] = useState(lesson.lecture_notes || lesson.content || DEFAULT_LECTURE_NOTES);
  const [qaItems, setQaItems] = useState<LessonQaItem[]>(
    lesson.qa_items && lesson.qa_items.length > 0 ? lesson.qa_items : DEFAULT_QA_ITEMS
  );
  const [resources, setResources] = useState<LessonResourceItem[]>(
    lesson.resources && lesson.resources.length > 0 ? lesson.resources : DEFAULT_RESOURCES
  );
  const [previewNotes, setPreviewNotes] = useState(false);
  const [isSavedToast, setIsSavedToast] = useState(false);

  // Sync state when lesson or initialSection changes
  useEffect(() => {
    setActiveSection(initialSection);
    setSummary(lesson.summary || DEFAULT_SUMMARY);
    setImplementationTip(lesson.implementation_tip || DEFAULT_TIP);
    setLectureNotes(lesson.lecture_notes || lesson.content || DEFAULT_LECTURE_NOTES);
    setQaItems(lesson.qa_items && lesson.qa_items.length > 0 ? lesson.qa_items : DEFAULT_QA_ITEMS);
    setResources(lesson.resources && lesson.resources.length > 0 ? lesson.resources : DEFAULT_RESOURCES);
  }, [lesson, initialSection]);

  if (!isOpen) return null;

  // Insert markdown helpers into lecture notes
  const insertMarkdownHelper = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('lesson-notes-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = lectureNotes.substring(start, end) || 'Sample text';
    const newText = lectureNotes.substring(0, start) + prefix + selectedText + suffix + lectureNotes.substring(end);
    setLectureNotes(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  // Q&A Handlers
  const handleAddQaItem = () => {
    const newItem: LessonQaItem = {
      id: `qa-${Date.now()}`,
      user_name: 'Student Question',
      time_ago: 'Just now',
      question: 'New question regarding this lecture concept...',
      answer: 'Instructor answer explaining the best practice or solution...',
      answered_by: 'Instructor',
    };
    setQaItems([newItem, ...qaItems]);
  };

  const handleUpdateQaItem = (id: string, field: keyof LessonQaItem, value: string) => {
    setQaItems(qaItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleDeleteQaItem = (id: string) => {
    setQaItems(qaItems.filter(item => item.id !== id));
  };

  // Resource Handlers
  const handleAddResource = () => {
    const newRes: LessonResourceItem = {
      id: `res-${Date.now()}`,
      name: 'Supplementary-Guide.pdf',
      type: 'PDF Document',
      size: '1.2 MB',
      url: '#',
      description: 'Useful reference material and exercise files for this lesson.',
    };
    setResources([...resources, newRes]);
  };

  const handleUpdateResource = (id: string, field: keyof LessonResourceItem, value: string) => {
    setResources(resources.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter(item => item.id !== id));
  };

  // Handle Save
  const handleSaveAll = () => {
    const updatedLesson: Lesson = {
      ...lesson,
      summary,
      implementation_tip: implementationTip,
      lecture_notes: lectureNotes,
      qa_items: qaItems,
      resources,
    };

    onSave(updatedLesson);
    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
      onClose();
    }, 600);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 7, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '1.25rem',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6), 0 0 32px rgba(99, 102, 241, 0.15)',
          background: 'linear-gradient(180deg, rgba(20, 24, 39, 0.98) 0%, rgba(13, 16, 28, 0.98) 100%)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out',
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
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Edit Lesson Materials
                </h3>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                  Instructor & Admin CMS
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {lesson.title}
              </p>
            </div>
          </div>

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
              transition: 'all 0.2s',
            }}
            title="Close editor"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(0, 0, 0, 0.25)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0 1.25rem',
          overflowX: 'auto',
          gap: '0.5rem',
        }}>
          <button
            onClick={() => setActiveSection('summary')}
            style={{
              padding: '0.85rem 1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeSection === 'summary' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeSection === 'summary' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <FileText size={16} color={activeSection === 'summary' ? 'var(--primary)' : undefined} />
            <span>Summary & Key Takeaways</span>
          </button>

          <button
            onClick={() => setActiveSection('notes')}
            style={{
              padding: '0.85rem 1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeSection === 'notes' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeSection === 'notes' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <BookOpen size={16} color={activeSection === 'notes' ? 'var(--primary)' : undefined} />
            <span>Lecture Notes & Key Concepts</span>
          </button>

          <button
            onClick={() => setActiveSection('qa')}
            style={{
              padding: '0.85rem 1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeSection === 'qa' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeSection === 'qa' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <MessageSquare size={16} color={activeSection === 'qa' ? 'var(--primary)' : undefined} />
            <span>Discussion / Q&A ({qaItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('resources')}
            style={{
              padding: '0.85rem 1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeSection === 'resources' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeSection === 'resources' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <Download size={16} color={activeSection === 'resources' ? 'var(--primary)' : undefined} />
            <span>Downloadable Resources ({resources.length})</span>
          </button>
        </div>

        {/* Modal Body: Content Editors */}
        <div style={{
          padding: '1.75rem',
          overflowY: 'auto',
          flexGrow: 1,
        }}>
          {/* SECTION 1: Summary & Key Takeaways */}
          {activeSection === 'summary' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                  Summary & Key Takeaways Content
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Provide an executive synthesis of what the learner will discover and master in this lesson.
                </p>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={6}
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.65rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    fontFamily: 'inherit',
                  }}
                  placeholder="Summarize the key architectural takeaways, principles, and concepts..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                  Implementation Tip / Pro-Tip Callout
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Highlighted advice shown in the colored callout box to guide real-world project development.
                </p>
                <textarea
                  value={implementationTip}
                  onChange={(e) => setImplementationTip(e.target.value)}
                  rows={3}
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.65rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#c7d2fe',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    fontFamily: 'inherit',
                  }}
                  placeholder="e.g. Ensure that all foreign keys referenced in your security policies have B-Tree indices..."
                />
              </div>
            </div>
          )}

          {/* SECTION 2: Lecture Notes & Key Concepts */}
          {activeSection === 'notes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
                    Lecture Notes & Detailed Concepts
                  </label>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Rich lecture curriculum notes, code snippets, definitions, and technical steps.
                  </p>
                </div>

                {/* Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => insertMarkdownHelper('### ')}
                    className="btn btn-secondary btn-sm"
                    title="Insert Heading"
                  >
                    <Heading size={14} />
                    <span>Heading</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownHelper('- ')}
                    className="btn btn-secondary btn-sm"
                    title="Insert Bullet Item"
                  >
                    <List size={14} />
                    <span>List</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownHelper('```sql\n', '\n```')}
                    className="btn btn-secondary btn-sm"
                    title="Insert Code Block"
                  >
                    <Code size={14} />
                    <span>Code</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewNotes(!previewNotes)}
                    className={`btn btn-sm ${previewNotes ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    <span>{previewNotes ? 'Edit Source' : 'Preview'}</span>
                  </button>
                </div>
              </div>

              {!previewNotes ? (
                <textarea
                  id="lesson-notes-textarea"
                  value={lectureNotes}
                  onChange={(e) => setLectureNotes(e.target.value)}
                  rows={14}
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0.65rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    fontFamily: 'monospace',
                  }}
                  placeholder="Enter detailed lecture notes, concepts, code examples..."
                />
              ) : (
                <div style={{
                  padding: '1.25rem',
                  borderRadius: '0.65rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  minHeight: '280px',
                  whiteSpace: 'pre-line',
                }}>
                  {lectureNotes}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: Discussion / Q&A */}
          {activeSection === 'qa' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    Manage Lesson Q&A Threads ({qaItems.length})
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Edit existing student questions, provide official instructor answers, or add new threads.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddQaItem}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={14} />
                  <span>Add New Q&A</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {qaItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1 }}>
                        <div style={{ flex: '1 1 200px' }}>
                          <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                            Student / Inquirer Name
                          </label>
                          <input
                            type="text"
                            value={item.user_name}
                            onChange={(e) => handleUpdateQaItem(item.id, 'user_name', e.target.value)}
                            className="form-input"
                            style={{
                              width: '100%',
                              padding: '0.4rem 0.65rem',
                              borderRadius: '0.4rem',
                              background: 'rgba(0,0,0,0.3)',
                              border: '1px solid var(--border-subtle)',
                              color: '#ffffff',
                              fontSize: '0.85rem',
                            }}
                          />
                        </div>
                        <div style={{ flex: '0 0 130px' }}>
                          <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                            Time Stamp
                          </label>
                          <input
                            type="text"
                            value={item.time_ago}
                            onChange={(e) => handleUpdateQaItem(item.id, 'time_ago', e.target.value)}
                            className="form-input"
                            style={{
                              width: '100%',
                              padding: '0.4rem 0.65rem',
                              borderRadius: '0.4rem',
                              background: 'rgba(0,0,0,0.3)',
                              border: '1px solid var(--border-subtle)',
                              color: '#ffffff',
                              fontSize: '0.85rem',
                            }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteQaItem(item.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#f87171',
                          borderRadius: '0.4rem',
                          padding: '0.4rem 0.6rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.75rem',
                        }}
                        title="Delete this Q&A item"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                        Question Text
                      </label>
                      <textarea
                        value={item.question}
                        onChange={(e) => handleUpdateQaItem(item.id, 'question', e.target.value)}
                        rows={2}
                        className="form-input"
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.75rem',
                          borderRadius: '0.5rem',
                          background: 'rgba(0,0,0,0.3)',
                          border: '1px solid var(--border-subtle)',
                          color: '#ffffff',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                        }}
                      />
                    </div>

                    <div style={{
                      background: 'rgba(99, 102, 241, 0.06)',
                      padding: '0.85rem',
                      borderRadius: '0.5rem',
                      borderLeft: '3px solid var(--primary)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 700 }}>
                          Instructor Answer:
                        </span>
                        <input
                          type="text"
                          value={item.answered_by || 'Instructor'}
                          onChange={(e) => handleUpdateQaItem(item.id, 'answered_by', e.target.value)}
                          placeholder="Answered by title"
                          style={{
                            background: 'rgba(0,0,0,0.25)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--primary)',
                            fontSize: '0.7rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '0.3rem',
                            width: '140px',
                          }}
                        />
                      </div>
                      <textarea
                        value={item.answer || ''}
                        onChange={(e) => handleUpdateQaItem(item.id, 'answer', e.target.value)}
                        rows={2}
                        placeholder="Type instructor clarification or solution..."
                        className="form-input"
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.4rem',
                          background: 'rgba(0,0,0,0.25)',
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          color: 'var(--text-primary)',
                          fontSize: '0.825rem',
                          lineHeight: 1.5,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: Downloadable Resources */}
          {activeSection === 'resources' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    Downloadable Resources ({resources.length})
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Manage downloadable lecture attachments, starter files, slides, and cheat sheets.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddResource}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={14} />
                  <span>Add New Resource</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {resources.map((res, idx) => (
                  <div
                    key={res.id || idx}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '0.65rem',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 140px 100px 40px', gap: '0.75rem', alignItems: 'center' }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                          Resource / File Name
                        </label>
                        <input
                          type="text"
                          value={res.name}
                          onChange={(e) => handleUpdateResource(res.id, 'name', e.target.value)}
                          className="form-input"
                          style={{
                            width: '100%',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '0.4rem',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-subtle)',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                          File Type
                        </label>
                        <input
                          type="text"
                          value={res.type}
                          onChange={(e) => handleUpdateResource(res.id, 'type', e.target.value)}
                          className="form-input"
                          placeholder="e.g. SQL Migration"
                          style={{
                            width: '100%',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '0.4rem',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.8rem',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                          File Size
                        </label>
                        <input
                          type="text"
                          value={res.size}
                          onChange={(e) => handleUpdateResource(res.id, 'size', e.target.value)}
                          className="form-input"
                          placeholder="e.g. 14 KB"
                          style={{
                            width: '100%',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '0.4rem',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.8rem',
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteResource(res.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#f87171',
                            borderRadius: '0.4rem',
                            width: '34px',
                            height: '34px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                          title="Delete resource"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                        Download Link / Storage URL
                      </label>
                      <input
                        type="text"
                        value={res.url || ''}
                        onChange={(e) => handleUpdateResource(res.id, 'url', e.target.value)}
                        placeholder="https://... or /downloads/file.zip or #"
                        className="form-input"
                        style={{
                          width: '100%',
                          padding: '0.4rem 0.65rem',
                          borderRadius: '0.4rem',
                          background: 'rgba(0,0,0,0.3)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--primary)',
                          fontSize: '0.8rem',
                        }}
                      />
                    </div>
                  </div>
                ))}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isSavedToast && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} />
                <span>Saved & Persisted!</span>
              </span>
            )}
          </div>

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
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
              }}
            >
              <Save size={16} />
              <span>Save & Persist Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
