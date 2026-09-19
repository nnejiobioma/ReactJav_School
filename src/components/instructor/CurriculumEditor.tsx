'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Pencil,
  Video, 
  FileText, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Save, 
  Check, 
  Clock, 
  Layers, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Course, Section, Lesson } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

interface CurriculumEditorProps {
  course: Course;
  onCourseUpdated: (updated: Course) => void;
}

export default function CurriculumEditor({
  course,
  onCourseUpdated,
}: CurriculumEditorProps) {
  const [sections, setSections] = useState<Section[]>(course.sections || []);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    sections[0]?.id || null
  );

  // Lesson form state (Add & Edit)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState<'video' | 'article' | 'quiz'>('video');
  const [lessonUrl, setLessonUrl] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonDuration, setLessonDuration] = useState(300);
  const [lessonPreview, setLessonPreview] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);

  // Section edit modal state
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [sectionTitleInput, setSectionTitleInput] = useState('');
  const [showSectionModal, setShowSectionModal] = useState(false);

  const [savedToast, setSavedToast] = useState(false);

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    const newSec: Section = {
      id: `sec_${Date.now()}`,
      course_id: course.id,
      title: newSectionTitle.trim(),
      position: sections.length + 1,
      lessons: [],
    };
    const updated = [...sections, newSec];
    setSections(updated);
    setNewSectionTitle('');
    setActiveSectionId(newSec.id);
    persistChanges(updated);
  };

  const handleOpenEditSection = (sec: Section) => {
    setEditingSection(sec);
    setSectionTitleInput(sec.title);
    setShowSectionModal(true);
  };

  const handleSaveSection = () => {
    if (!editingSection || !sectionTitleInput.trim()) return;
    const updatedSections = sections.map((sec) => {
      if (sec.id === editingSection.id) {
        return {
          ...sec,
          title: sectionTitleInput.trim(),
        };
      }
      return sec;
    });
    setSections(updatedSections);
    persistChanges(updatedSections);
    setShowSectionModal(false);
    setEditingSection(null);
  };

  const handleDeleteSection = (secId: string) => {
    const updated = sections.filter((s) => s.id !== secId);
    setSections(updated);
    if (activeSectionId === secId) {
      setActiveSectionId(updated[0]?.id || null);
    }
    persistChanges(updated);
  };

  const handleOpenAddLesson = () => {
    setEditingLesson(null);
    setLessonTitle('');
    setLessonType('video');
    setLessonUrl('');
    setLessonContent('');
    setLessonDuration(300);
    setLessonPreview(false);
    setShowLessonModal(true);
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setLessonTitle(lesson.title);
    setLessonType(lesson.type);
    setLessonUrl(lesson.video_url || '');
    setLessonContent(lesson.content || '');
    setLessonDuration(lesson.duration_seconds || 300);
    setLessonPreview(!!lesson.is_free_preview);
    setShowLessonModal(true);
  };

  const handleSaveLesson = () => {
    if (!activeSectionId || !lessonTitle.trim()) return;
    const activeSec = sections.find((s) => s.id === activeSectionId);
    if (!activeSec) return;

    let updatedSections: Section[];

    if (editingLesson) {
      // Update existing lesson in place
      updatedSections = sections.map((sec) => {
        if (sec.id === activeSectionId) {
          return {
            ...sec,
            lessons: (sec.lessons || []).map((les) => {
              if (les.id === editingLesson.id) {
                return {
                  ...les,
                  title: lessonTitle.trim(),
                  type: lessonType,
                  video_url: lessonType === 'video' ? (lessonUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4') : null,
                  content: lessonType === 'article' ? (lessonContent || 'Sample article content.') : null,
                  duration_seconds: lessonDuration,
                  is_free_preview: lessonPreview,
                };
              }
              return les;
            }),
          };
        }
        return sec;
      });
    } else {
      // Create new lesson
      const newLes: Lesson = {
        id: `les_${Date.now()}`,
        section_id: activeSectionId,
        title: lessonTitle.trim(),
        type: lessonType,
        video_url: lessonType === 'video' ? (lessonUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4') : null,
        content: lessonType === 'article' ? (lessonContent || 'Sample article content.') : null,
        duration_seconds: lessonDuration,
        position: (activeSec.lessons?.length || 0) + 1,
        is_free_preview: lessonPreview,
        quiz_questions: lessonType === 'quiz' ? [
          {
            id: `q_${Date.now()}`,
            lesson_id: `les_${Date.now()}`,
            question: 'Sample assessment question for this module?',
            options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
            correct_option_index: 0,
            explanation: 'Demonstration explanation for the correct answer.',
            position: 1,
          }
        ] : undefined,
      };

      updatedSections = sections.map((sec) => {
        if (sec.id === activeSectionId) {
          return {
            ...sec,
            lessons: [...(sec.lessons || []), newLes],
          };
        }
        return sec;
      });
    }

    setSections(updatedSections);
    persistChanges(updatedSections);

    // Reset form & close
    setLessonTitle('');
    setLessonUrl('');
    setLessonContent('');
    setEditingLesson(null);
    setShowLessonModal(false);
  };

  const handleDeleteLesson = (secId: string, lesId: string) => {
    const updated = sections.map((sec) => {
      if (sec.id === secId) {
        return {
          ...sec,
          lessons: sec.lessons?.filter((l) => l.id !== lesId) || [],
        };
      }
      return sec;
    });
    setSections(updated);
    persistChanges(updated);
  };

  const togglePublish = () => {
    const updatedCourse: Course = {
      ...course,
      is_published: !course.is_published,
      sections,
    };
    LocalDataService.saveCourse(updatedCourse);
    onCourseUpdated(updatedCourse);
    showSaveNotification();
  };

  const persistChanges = (updatedSections: Section[]) => {
    const updatedCourse: Course = {
      ...course,
      sections: updatedSections,
    };
    LocalDataService.saveCourse(updatedCourse);
    onCourseUpdated(updatedCourse);
    showSaveNotification();
  };

  const showSaveNotification = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const activeSec = sections.find((s) => s.id === activeSectionId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Action Header */}
      <div className="glass-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className={`badge ${course.is_published ? 'badge-emerald' : 'badge-amber'}`}>
              {course.is_published ? 'Published' : 'Draft'}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Course ID: {course.id}
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>{course.title}</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={togglePublish}
            className={`btn btn-sm ${course.is_published ? 'btn-secondary' : 'btn-primary'}`}
          >
            {course.is_published ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>{course.is_published ? 'Unpublish Course' : 'Publish Course'}</span>
          </button>

          <a
            href={`/courses/${course.slug}`}
            target="_blank"
            className="btn btn-secondary btn-sm"
          >
            <ExternalLink size={15} />
            <span>Preview Student View</span>
          </a>
        </div>
      </div>

      {/* Editor Grid: Sections on left, Lessons on right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}>
        {/* Left Column: Sections List */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Course Sections</h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {sections.length} sections
            </span>
          </div>

          {/* Add Section Input */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <input
              type="text"
              placeholder="e.g. Module 1: System Foundations"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="form-input"
              style={{ flexGrow: 1 }}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
            />
            <button
              onClick={handleAddSection}
              className="btn btn-primary btn-sm"
              disabled={!newSectionTitle.trim()}
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>

          {/* Sections Reorderable List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sections.map((sec, idx) => {
              const isSelected = sec.id === activeSectionId;
              return (
                <div
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.65rem',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface)',
                    border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      #{idx + 1}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: isSelected ? 600 : 400, color: 'var(--text-primary)' }}>
                      {sec.title}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {sec.lessons?.length || 0} lessons
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditSection(sec);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '0.35rem',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s ease',
                      }}
                      title="Edit Section Title"
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSection(sec.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '0.35rem',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s ease',
                      }}
                      title="Delete Section"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Lessons in Selected Section */}
        <div className="glass-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {activeSec ? activeSec.title : 'Select a Section'}
                </h3>
                {activeSec && (
                  <button
                    onClick={() => handleOpenEditSection(activeSec)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      padding: '0.25rem 0.55rem',
                      fontSize: '0.75rem',
                      gap: '0.3rem',
                      background: 'rgba(99, 102, 241, 0.1)',
                      borderColor: 'rgba(99, 102, 241, 0.25)',
                      color: 'var(--primary)',
                    }}
                    title="Edit Section Title"
                  >
                    <Pencil size={12} />
                    <span>Edit Section</span>
                  </button>
                )}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Manage lessons, video streams, and quizzes for this section
              </p>
            </div>

            {activeSec && (
              <button
                onClick={handleOpenAddLesson}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>Add Lesson</span>
              </button>
            )}
          </div>

          {/* Lessons List */}
          {activeSec ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(activeSec.lessons || []).map((lesson, lIdx) => (
                <div
                  key={lesson.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.65rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '0.4rem',
                      background: 'var(--bg-surface-elevated)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {lesson.type === 'video' && <Video size={16} color="var(--primary)" />}
                      {lesson.type === 'article' && <FileText size={16} color="var(--accent-cyan)" />}
                      {lesson.type === 'quiz' && <HelpCircle size={16} color="var(--accent-amber)" />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {lesson.title}
                        </span>
                        {lesson.is_free_preview && (
                          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                            Free Preview
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={11} />
                        {Math.round(lesson.duration_seconds / 60)} mins • {lesson.type.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleOpenEditLesson(lesson)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        padding: '0.35rem 0.65rem',
                        fontSize: '0.78rem',
                        gap: '0.35rem',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderColor: 'rgba(99, 102, 241, 0.25)',
                        color: 'var(--primary)',
                      }}
                      title="Edit Lesson Details"
                    >
                      <Pencil size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteLesson(activeSec.id, lesson.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '0.35rem',
                        borderRadius: '0.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s ease',
                      }}
                      title="Delete Lesson"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}

              {(activeSec.lessons || []).length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No lessons in this section yet. Click "Add Lesson" to get started.
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Select a section on the left to edit its lessons.
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Lesson Modal */}
      {showLessonModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          padding: '1.5rem',
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '540px',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-accent)',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '0.5rem',
                background: 'rgba(99, 102, 241, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}>
                {editingLesson ? <Pencil size={16} /> : <Plus size={16} />}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {editingLesson ? 'Edit Lesson Details' : `Add Lesson to ${activeSec?.title}`}
                </h3>
                {editingLesson && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Modifying: {editingLesson.title}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Lesson Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1.3 State Management Principles"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Content Type
                  </label>
                  <select
                    value={lessonType}
                    onChange={(e) => setLessonType(e.target.value as any)}
                    className="form-input"
                  >
                    <option value="video">Video Stream</option>
                    <option value="article">Rich Article / Markdown</option>
                    <option value="quiz">Interactive Quiz</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Estimated Minutes
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={Math.round(lessonDuration / 60)}
                    onChange={(e) => setLessonDuration(parseInt(e.target.value || '5') * 60)}
                    className="form-input"
                  />
                </div>
              </div>

              {lessonType === 'video' && (
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Video URL (MP4 or HLS Stream)
                  </label>
                  <input
                    type="text"
                    placeholder="https://commondatastorage.googleapis.com/.../sample.mp4"
                    value={lessonUrl}
                    onChange={(e) => setLessonUrl(e.target.value)}
                    className="form-input"
                  />
                </div>
              )}

              {lessonType === 'article' && (
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Article Markdown Content
                  </label>
                  <textarea
                    rows={5}
                    placeholder="### Overview&#10;Write markdown lecture notes here..."
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <input
                  type="checkbox"
                  id="previewCheckbox"
                  checked={lessonPreview}
                  onChange={(e) => setLessonPreview(e.target.checked)}
                  style={{ accentColor: '#6366f1', width: '16px', height: '16px' }}
                />
                <label htmlFor="previewCheckbox" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Allow as Free Preview (accessible without purchase)
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setShowLessonModal(false);
                  setEditingLesson(null);
                }}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLesson}
                disabled={!lessonTitle.trim()}
                className="btn btn-primary btn-sm"
              >
                <Save size={15} />
                <span>{editingLesson ? 'Save Changes' : 'Create Lesson'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Section Modal */}
      {showSectionModal && editingSection && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          padding: '1.5rem',
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '480px',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-accent)',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '0.5rem',
                background: 'rgba(99, 102, 241, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}>
                <Layers size={16} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  Edit Course Section
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Update the title for section #{editingSection.position}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                Section Title
              </label>
              <input
                type="text"
                placeholder="e.g. Module 1: Architecture, Supabase Foundations & Authentication"
                value={sectionTitleInput}
                onChange={(e) => setSectionTitleInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveSection()}
                className="form-input"
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setShowSectionModal(false);
                  setEditingSection(null);
                }}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSection}
                disabled={!sectionTitleInput.trim()}
                className="btn btn-primary btn-sm"
              >
                <Save size={15} />
                <span>Save Section</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Toast */}
      {savedToast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(16, 185, 129, 0.95)',
          backdropFilter: 'blur(10px)',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '0.875rem',
          fontWeight: 600,
          zIndex: 400,
          animation: 'fadeIn 0.2s ease',
        }}>
          <Check size={18} />
          <span>Curriculum updated and saved to database!</span>
        </div>
      )}
    </div>
  );
}
