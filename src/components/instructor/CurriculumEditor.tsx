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
  ChevronDown,
  CornerDownRight,
  ExternalLink,
  GripVertical
} from 'lucide-react';
import { Course, Section, Lesson } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

interface CurriculumEditorProps {
  course: Course;
  onCourseUpdated: (updated: Course) => void;
}

type DragType = 'section' | 'lesson' | 'sub_lesson';

interface DragItem {
  type: DragType;
  index: number;
  parentLessonId?: string;
  sectionId?: string;
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

  // Drag and Drop state
  const [draggingItem, setDraggingItem] = useState<DragItem | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<{
    type: DragType;
    index: number;
    parentLessonId?: string;
  } | null>(null);

  // Helper reorder function
  const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Section drag handlers
  const handleSectionDragStart = (e: React.DragEvent, index: number) => {
    setDraggingItem({ type: 'section', index });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `section:${index}`);
  };

  const handleSectionDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingItem?.type === 'section' && draggingItem.index !== index) {
      setDragOverTarget({ type: 'section', index });
    }
  };

  const handleSectionDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggingItem?.type === 'section' && draggingItem.index !== undefined && draggingItem.index !== dropIndex) {
      const reordered = reorder(sections, draggingItem.index, dropIndex).map((sec, idx) => ({
        ...sec,
        position: idx + 1,
      }));
      setSections(reordered);
      persistChanges(reordered);
    }
    setDraggingItem(null);
    setDragOverTarget(null);
  };

  // Lesson drag handlers
  const handleLessonDragStart = (e: React.DragEvent, index: number, sectionId: string) => {
    setDraggingItem({ type: 'lesson', index, sectionId });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `lesson:${index}`);
  };

  const handleLessonDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingItem?.type === 'lesson' && draggingItem.index !== index) {
      setDragOverTarget({ type: 'lesson', index });
    }
  };

  const handleLessonDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (
      draggingItem?.type === 'lesson' &&
      draggingItem.index !== undefined &&
      draggingItem.index !== dropIndex &&
      activeSectionId
    ) {
      const currentSec = sections.find((s) => s.id === activeSectionId);
      if (currentSec) {
        const currentLessons = currentSec.lessons || [];
        const reorderedLessons = reorder(currentLessons, draggingItem.index, dropIndex).map((l, idx) => ({
          ...l,
          position: idx + 1,
        }));

        const updatedSections = sections.map((sec) => {
          if (sec.id === activeSectionId) {
            return {
              ...sec,
              lessons: reorderedLessons,
            };
          }
          return sec;
        });

        setSections(updatedSections);
        persistChanges(updatedSections);
      }
    }
    setDraggingItem(null);
    setDragOverTarget(null);
  };

  // Sub-lesson drag handlers
  const handleSubLessonDragStart = (
    e: React.DragEvent,
    index: number,
    parentLessonId: string,
    sectionId: string
  ) => {
    e.stopPropagation();
    setDraggingItem({ type: 'sub_lesson', index, parentLessonId, sectionId });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `sub_lesson:${parentLessonId}:${index}`);
  };

  const handleSubLessonDragOver = (e: React.DragEvent, index: number, parentLessonId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      draggingItem?.type === 'sub_lesson' &&
      draggingItem.parentLessonId === parentLessonId &&
      draggingItem.index !== index
    ) {
      setDragOverTarget({ type: 'sub_lesson', index, parentLessonId });
    }
  };

  const handleSubLessonDrop = (e: React.DragEvent, dropIndex: number, parentLesson: Lesson) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      draggingItem?.type === 'sub_lesson' &&
      draggingItem.parentLessonId === parentLesson.id &&
      draggingItem.index !== undefined &&
      draggingItem.index !== dropIndex &&
      activeSectionId
    ) {
      const currentSubLessons = parentLesson.sub_lessons || [];
      const reorderedSubLessons = reorder(currentSubLessons, draggingItem.index, dropIndex).map((sl, idx) => ({
        ...sl,
        position: idx + 1,
      }));

      const updatedSections = sections.map((sec) => {
        if (sec.id === activeSectionId) {
          return {
            ...sec,
            lessons: (sec.lessons || []).map((les) => {
              if (les.id === parentLesson.id) {
                return {
                  ...les,
                  sub_lessons: reorderedSubLessons,
                };
              }
              return les;
            }),
          };
        }
        return sec;
      });

      setSections(updatedSections);
      persistChanges(updatedSections);
    }
    setDraggingItem(null);
    setDragOverTarget(null);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
    setDragOverTarget(null);
  };

  // Lesson form state (Add & Edit - Main & Sub-lessons)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [parentLessonForSubLesson, setParentLessonForSubLesson] = useState<Lesson | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState<'video' | 'article' | 'quiz'>('video');
  const [lessonUrl, setLessonUrl] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonDuration, setLessonDuration] = useState(300);
  const [lessonPreview, setLessonPreview] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({});

  const toggleLessonExpanded = (lessonId: string) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: prev[lessonId] === undefined ? false : !prev[lessonId],
    }));
  };

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
    setParentLessonForSubLesson(null);
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
    setParentLessonForSubLesson(null);
    setEditingLesson(lesson);
    setLessonTitle(lesson.title);
    setLessonType(lesson.type);
    setLessonUrl(lesson.video_url || '');
    setLessonContent(lesson.content || '');
    setLessonDuration(lesson.duration_seconds || 300);
    setLessonPreview(!!lesson.is_free_preview);
    setShowLessonModal(true);
  };

  const handleOpenAddSubLesson = (parentLesson: Lesson) => {
    setParentLessonForSubLesson(parentLesson);
    setEditingLesson(null);
    setLessonTitle('');
    setLessonType('video');
    setLessonUrl('');
    setLessonContent('');
    setLessonDuration(180);
    setLessonPreview(false);
    setShowLessonModal(true);
  };

  const handleOpenEditSubLesson = (subLesson: Lesson, parentLesson: Lesson) => {
    setParentLessonForSubLesson(parentLesson);
    setEditingLesson(subLesson);
    setLessonTitle(subLesson.title);
    setLessonType(subLesson.type);
    setLessonUrl(subLesson.video_url || '');
    setLessonContent(subLesson.content || '');
    setLessonDuration(subLesson.duration_seconds || 180);
    setLessonPreview(!!subLesson.is_free_preview);
    setShowLessonModal(true);
  };

  const handleDeleteSubLesson = (secId: string, parentLessonId: string, subLessonId: string) => {
    const updated = sections.map((sec) => {
      if (sec.id === secId) {
        return {
          ...sec,
          lessons: (sec.lessons || []).map((les) => {
            if (les.id === parentLessonId) {
              return {
                ...les,
                sub_lessons: (les.sub_lessons || []).filter((sub) => sub.id !== subLessonId),
              };
            }
            return les;
          }),
        };
      }
      return sec;
    });
    setSections(updated);
    persistChanges(updated);
  };

  const handleSaveLesson = () => {
    if (!activeSectionId || !lessonTitle.trim()) return;
    const activeSec = sections.find((s) => s.id === activeSectionId);
    if (!activeSec) return;

    let updatedSections: Section[];

    if (parentLessonForSubLesson) {
      // Sub-lesson manipulation (Add or Edit)
      const pId = parentLessonForSubLesson.id;

      if (editingLesson) {
        // Edit existing sub-lesson
        updatedSections = sections.map((sec) => {
          if (sec.id === activeSectionId) {
            return {
              ...sec,
              lessons: (sec.lessons || []).map((les) => {
                if (les.id === pId) {
                  return {
                    ...les,
                    sub_lessons: (les.sub_lessons || []).map((sub) => {
                      if (sub.id === editingLesson.id) {
                        return {
                          ...sub,
                          title: lessonTitle.trim(),
                          type: lessonType,
                          video_url: lessonType === 'video' ? (lessonUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4') : null,
                          content: lessonType === 'article' ? (lessonContent || 'Sample article content.') : null,
                          duration_seconds: lessonDuration,
                          is_free_preview: lessonPreview,
                        };
                      }
                      return sub;
                    }),
                  };
                }
                return les;
              }),
            };
          }
          return sec;
        });
      } else {
        // Add new sub-lesson
        const newSubLes: Lesson = {
          id: `sub_${Date.now()}`,
          section_id: activeSectionId,
          parent_lesson_id: pId,
          title: lessonTitle.trim(),
          type: lessonType,
          video_url: lessonType === 'video' ? (lessonUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4') : null,
          content: lessonType === 'article' ? (lessonContent || 'Sample article content.') : null,
          duration_seconds: lessonDuration,
          position: ((parentLessonForSubLesson.sub_lessons?.length || 0) + 1),
          is_free_preview: lessonPreview,
          quiz_questions: lessonType === 'quiz' ? [
            {
              id: `q_${Date.now()}`,
              lesson_id: `sub_${Date.now()}`,
              question: 'Sample assessment question for this sub-module?',
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
              lessons: (sec.lessons || []).map((les) => {
                if (les.id === pId) {
                  return {
                    ...les,
                    sub_lessons: [...(les.sub_lessons || []), newSubLes],
                  };
                }
                return les;
              }),
            };
          }
          return sec;
        });
      }
    } else {
      // Main lesson manipulation (Add or Edit)
      if (editingLesson) {
        // Update existing main lesson in place
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
        // Create new main lesson
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
          sub_lessons: [],
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
    }

    setSections(updatedSections);
    persistChanges(updatedSections);

    // Reset form & close
    setLessonTitle('');
    setLessonUrl('');
    setLessonContent('');
    setEditingLesson(null);
    setParentLessonForSubLesson(null);
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
              const isDragging = draggingItem?.type === 'section' && draggingItem.index === idx;
              const isDropTarget = dragOverTarget?.type === 'section' && dragOverTarget.index === idx;

              return (
                <div
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  onDragOver={(e) => handleSectionDragOver(e, idx)}
                  onDrop={(e) => handleSectionDrop(e, idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.65rem',
                    background: isDropTarget
                      ? 'rgba(99, 102, 241, 0.25)'
                      : isSelected
                      ? 'rgba(99, 102, 241, 0.15)'
                      : 'var(--bg-surface)',
                    border: isDropTarget
                      ? '2px dashed var(--primary)'
                      : isSelected
                      ? '1px solid var(--primary)'
                      : '1px solid var(--border-subtle)',
                    boxShadow: isDropTarget ? '0 0 12px rgba(99, 102, 241, 0.4)' : 'none',
                    opacity: isDragging ? 0.35 : 1,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, minWidth: 0 }}>
                    {/* Drag Handle */}
                    <div
                      draggable
                      onDragStart={(e) => handleSectionDragStart(e, idx)}
                      onDragEnd={handleDragEnd}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        cursor: 'grab',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.2rem',
                        borderRadius: '0.25rem',
                        transition: 'color 0.15s ease',
                        flexShrink: 0,
                      }}
                      title="Drag to reorder section"
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <GripVertical size={16} />
                    </div>

                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0 }}>
                      #{idx + 1}
                    </span>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: isSelected ? 600 : 400,
                      color: 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {sec.title}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {(activeSec.lessons || []).map((lesson, lIdx) => {
                const subLessons = lesson.sub_lessons || [];
                const isExpanded = expandedLessons[lesson.id] !== false; // expanded by default
                const isLessonDragging = draggingItem?.type === 'lesson' && draggingItem.index === lIdx;
                const isLessonDropTarget = dragOverTarget?.type === 'lesson' && dragOverTarget.index === lIdx;

                return (
                  <div
                    key={lesson.id}
                    onDragOver={(e) => handleLessonDragOver(e, lIdx)}
                    onDrop={(e) => handleLessonDrop(e, lIdx)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '0.75rem',
                      background: isLessonDropTarget ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-surface)',
                      border: isLessonDropTarget ? '2px dashed var(--primary)' : '1px solid var(--border-subtle)',
                      boxShadow: isLessonDropTarget ? '0 0 14px rgba(99, 102, 241, 0.45)' : 'none',
                      opacity: isLessonDragging ? 0.35 : 1,
                      overflow: 'hidden',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {/* Main Lesson Row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexGrow: 1, minWidth: 0 }}>
                        {/* Main Lesson Drag Handle */}
                        <div
                          draggable
                          onDragStart={(e) => handleLessonDragStart(e, lIdx, activeSec.id)}
                          onDragEnd={handleDragEnd}
                          style={{
                            cursor: 'grab',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.2rem',
                            borderRadius: '0.25rem',
                            transition: 'color 0.15s ease',
                            flexShrink: 0,
                          }}
                          title="Drag to reorder lesson"
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                          <GripVertical size={16} />
                        </div>

                        {/* Expand/Collapse Toggle if it has sub-lessons */}
                        {subLessons.length > 0 ? (
                          <button
                            onClick={() => toggleLessonExpanded(lesson.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '0.2rem',
                              display: 'flex',
                              alignItems: 'center',
                              borderRadius: '0.25rem',
                              flexShrink: 0,
                            }}
                            title={isExpanded ? 'Collapse Sub-lessons' : 'Expand Sub-lessons'}
                          >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                        ) : (
                          <div style={{ width: '16px', flexShrink: 0 }} />
                        )}

                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '0.4rem',
                          background: 'var(--bg-surface-elevated)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {lesson.type === 'video' && <Video size={16} color="var(--primary)" />}
                          {lesson.type === 'article' && <FileText size={16} color="var(--accent-cyan)" />}
                          {lesson.type === 'quiz' && <HelpCircle size={16} color="var(--accent-amber)" />}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {lesson.title}
                            </span>
                            {lesson.is_free_preview && (
                              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                                Free Preview
                              </span>
                            )}
                            {subLessons.length > 0 && (
                              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                                {subLessons.length} {subLessons.length === 1 ? 'sub-lesson' : 'sub-lessons'}
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Clock size={11} />
                            {Math.round(lesson.duration_seconds / 60)} mins • {lesson.type.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Main Lesson Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
                        {/* + Sub-lesson Button */}
                        <button
                          onClick={() => handleOpenAddSubLesson(lesson)}
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: '0.32rem 0.6rem',
                            fontSize: '0.75rem',
                            gap: '0.3rem',
                            background: 'rgba(5, 150, 105, 0.1)',
                            borderColor: 'rgba(5, 150, 105, 0.25)',
                            color: 'var(--accent-emerald)',
                          }}
                          title="Add a sub-lesson under this main lesson"
                        >
                          <Plus size={13} />
                          <span>Sub-lesson</span>
                        </button>

                        {/* Edit Main Lesson Button */}
                        <button
                          onClick={() => handleOpenEditLesson(lesson)}
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: '0.32rem 0.6rem',
                            fontSize: '0.75rem',
                            gap: '0.3rem',
                            background: 'rgba(99, 102, 241, 0.1)',
                            borderColor: 'rgba(99, 102, 241, 0.25)',
                            color: 'var(--primary)',
                          }}
                          title="Edit Lesson Details"
                        >
                          <Pencil size={12} />
                          <span>Edit</span>
                        </button>

                        {/* Delete Main Lesson Button */}
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
                          title="Delete Lesson and its Sub-lessons"
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Sub-lessons Tree Container */}
                    {isExpanded && subLessons.length > 0 && (
                      <div style={{
                        background: 'var(--bg-surface-elevated)',
                        borderTop: '1px solid var(--border-subtle)',
                        padding: '0.65rem 1rem 0.75rem 2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.45rem',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Sub-lessons ({subLessons.length}):
                          </span>
                          <button
                            onClick={() => handleOpenAddSubLesson(lesson)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--accent-emerald)',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.15rem 0.4rem',
                            }}
                          >
                            <Plus size={12} />
                            <span>Add Another Sub-lesson</span>
                          </button>
                        </div>

                        {subLessons.map((sub, sIdx) => {
                          const isSubDragging =
                            draggingItem?.type === 'sub_lesson' &&
                            draggingItem.parentLessonId === lesson.id &&
                            draggingItem.index === sIdx;
                          const isSubDropTarget =
                            dragOverTarget?.type === 'sub_lesson' &&
                            dragOverTarget.parentLessonId === lesson.id &&
                            dragOverTarget.index === sIdx;

                          return (
                            <div
                              key={sub.id}
                              onDragOver={(e) => handleSubLessonDragOver(e, sIdx, lesson.id)}
                              onDrop={(e) => handleSubLessonDrop(e, sIdx, lesson)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.55rem 0.85rem',
                                borderRadius: '0.55rem',
                                background: isSubDropTarget ? 'rgba(5, 150, 105, 0.18)' : 'var(--bg-surface)',
                                border: isSubDropTarget ? '2px dashed var(--accent-emerald)' : '1px solid var(--border-subtle)',
                                boxShadow: isSubDropTarget ? '0 0 12px rgba(5, 150, 105, 0.4)' : 'none',
                                opacity: isSubDragging ? 0.35 : 1,
                                gap: '0.5rem',
                                transition: 'all 0.18s ease',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, minWidth: 0 }}>
                                {/* Sub-lesson Drag Handle */}
                                <div
                                  draggable
                                  onDragStart={(e) => handleSubLessonDragStart(e, sIdx, lesson.id, activeSec.id)}
                                  onDragEnd={handleDragEnd}
                                  style={{
                                    cursor: 'grab',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.15rem',
                                    borderRadius: '0.25rem',
                                    transition: 'color 0.15s ease',
                                    flexShrink: 0,
                                  }}
                                  title="Drag to reorder sub-lesson"
                                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-emerald)')}
                                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                                >
                                  <GripVertical size={14} />
                                </div>

                                <CornerDownRight size={14} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                                <div style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '0.35rem',
                                  background: 'var(--bg-surface-elevated)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}>
                                  {sub.type === 'video' && <Video size={13} color="var(--primary)" />}
                                  {sub.type === 'article' && <FileText size={13} color="var(--accent-cyan)" />}
                                  {sub.type === 'quiz' && <HelpCircle size={13} color="var(--accent-amber)" />}
                                </div>

                                <div style={{ minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.84rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                                      {sub.title}
                                    </span>
                                    {sub.is_free_preview && (
                                      <span className="badge badge-cyan" style={{ fontSize: '0.6rem', padding: '0.15rem 0.4rem' }}>
                                        Free Preview
                                      </span>
                                    )}
                                  </div>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock size={10} />
                                    {Math.round(sub.duration_seconds / 60)} mins • {sub.type.toUpperCase()}
                                  </span>
                                </div>
                              </div>

                              {/* Actions for Sub-lesson */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                                <button
                                  onClick={() => handleOpenEditSubLesson(sub, lesson)}
                                  className="btn btn-secondary btn-sm"
                                  style={{
                                    padding: '0.25rem 0.5rem',
                                    fontSize: '0.72rem',
                                    gap: '0.25rem',
                                    background: 'rgba(99, 102, 241, 0.08)',
                                    borderColor: 'rgba(99, 102, 241, 0.2)',
                                    color: 'var(--primary)',
                                  }}
                                  title="Edit Sub-lesson"
                                >
                                  <Pencil size={11} />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteSubLesson(activeSec.id, lesson.id, sub.id)}
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
                                  title="Delete Sub-lesson"
                                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

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

      {/* Add / Edit Lesson Modal (Supports Main Lessons & Sub-lessons) */}
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
                background: parentLessonForSubLesson ? 'rgba(5, 150, 105, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: parentLessonForSubLesson ? 'var(--accent-emerald)' : 'var(--primary)',
              }}>
                {editingLesson ? <Pencil size={16} /> : <Plus size={16} />}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {parentLessonForSubLesson
                    ? (editingLesson ? 'Edit Sub-lesson' : 'Add Sub-lesson')
                    : (editingLesson ? 'Edit Lesson Details' : `Add Lesson to ${activeSec?.title}`)}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {parentLessonForSubLesson
                    ? `Under Main Lesson: ${parentLessonForSubLesson.title}`
                    : (editingLesson ? `Modifying: ${editingLesson.title}` : `Creating top-level lesson in ${activeSec?.title}`)}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  {parentLessonForSubLesson ? 'Sub-lesson Title' : 'Lesson Title'}
                </label>
                <input
                  type="text"
                  placeholder={parentLessonForSubLesson ? 'e.g. 1.1.1 Microservices Architecture Breakdown' : 'e.g. 1.1 System Architecture'}
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="form-input"
                  autoFocus
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
                  setParentLessonForSubLesson(null);
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
                <span>
                  {parentLessonForSubLesson
                    ? (editingLesson ? 'Save Sub-lesson' : 'Create Sub-lesson')
                    : (editingLesson ? 'Save Changes' : 'Create Lesson')}
                </span>
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
