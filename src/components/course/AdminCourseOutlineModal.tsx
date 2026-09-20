'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  Pencil, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ExternalLink, 
  Save, 
  Check, 
  Clock, 
  Award,
  HelpCircle
} from 'lucide-react';
import { Course } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import CurriculumEditor from '@/components/instructor/CurriculumEditor';

interface AdminCourseOutlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onCourseUpdated: (course: Course) => void;
  initialTab?: 'curriculum' | 'details';
}

export default function AdminCourseOutlineModal({
  isOpen,
  onClose,
  course,
  onCourseUpdated,
  initialTab = 'curriculum',
}: AdminCourseOutlineModalProps) {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'details'>(initialTab);
  const [formData, setFormData] = useState<Partial<Course>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        slug: course.slug,
        description: course.description,
        category: course.category,
        track: course.track,
        level: course.level,
        duration_weeks: course.duration_weeks,
        weekly_hours: course.weekly_hours,
        outcome_hook: course.outcome_hook,
      });
    }
  }, [course]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const handleMetadataChange = (key: keyof Course, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCourse: Course = {
      ...course,
      ...formData,
      title: formData.title || course.title,
      slug: formData.slug || course.slug,
      description: formData.description || course.description,
      category: formData.category || course.category,
      track: formData.track || course.track,
      level: formData.level || course.level,
      duration_weeks: Number(formData.duration_weeks) || course.duration_weeks,
      weekly_hours: formData.weekly_hours || course.weekly_hours,
      outcome_hook: formData.outcome_hook || course.outcome_hook,
    };

    LocalDataService.saveCourse(updatedCourse);
    onCourseUpdated(updatedCourse);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const totalLessons = (course.sections || []).reduce(
    (acc, sec) => acc + (sec.lessons || []).reduce((lAcc, l) => lAcc + 1 + (l.sub_lessons?.length || 0), 0),
    0
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(5, 8, 22, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.5rem, 2vw, 1rem)',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-accent)',
          borderRadius: '1.25rem',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '94dvh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(99, 102, 241, 0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: 'clamp(0.85rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.75rem)',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.65rem',
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px -2px rgba(79, 70, 229, 0.5)',
              }}
            >
              <Pencil size={18} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Course Outline & Curriculum Editor
                </h3>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.55rem',
                    borderRadius: '9999px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                  }}
                >
                  Admin CMS
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0' }}>
                {course.title} • {course.sections?.length || 0} Sections • {totalLessons} Lessons
              </p>
            </div>
          </div>

          {/* Tab buttons + Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                display: 'flex',
                background: 'var(--bg-surface)',
                padding: '0.2rem',
                borderRadius: '0.6rem',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('curriculum')}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '0.45rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'curriculum' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'curriculum' ? '#ffffff' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease',
                }}
              >
                <Layers size={14} />
                <span>Curriculum & Lessons</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('details')}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '0.45rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeTab === 'details' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'details' ? '#ffffff' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease',
                }}
              >
                <BookOpen size={14} />
                <span>Course Details</span>
              </button>
            </div>

            <Link
              href={`/instructor/builder/${course.id}`}
              className="btn btn-sm btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.75rem',
                fontSize: '0.8rem',
              }}
              title="Open full builder studio in dedicated page"
            >
              <ExternalLink size={14} />
              <span>Full Studio</span>
            </Link>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '0.45rem',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem' }}>
          {activeTab === 'curriculum' ? (
            <div>
              <div
                style={{
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 1.25rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Sparkles size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    Add sections, edit lesson titles, configure video URLs & lecture markdown, add sub-lessons, and drag to reorder.
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  ✓ Auto-saved to server disk
                </span>
              </div>

              <CurriculumEditor
                course={course}
                onCourseUpdated={(updated) => {
                  LocalDataService.saveCourse(updated);
                  onCourseUpdated(updated);
                }}
              />
            </div>
          ) : (
            <form onSubmit={handleSaveDetails} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '850px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Course Title</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.title || ''}
                    onChange={(e) => handleMetadataChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">URL Slug</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.slug || ''}
                    onChange={(e) => handleMetadataChange('slug', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Course Description</label>
                <textarea
                  rows={3}
                  required
                  className="form-input"
                  style={{ resize: 'vertical' }}
                  value={formData.description || ''}
                  onChange={(e) => handleMetadataChange('description', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.category || ''}
                    onChange={(e) => handleMetadataChange('category', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Track</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.track || ''}
                    onChange={(e) => handleMetadataChange('track', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Difficulty Level</label>
                  <select
                    className="form-input"
                    value={formData.level || 'Intermediate'}
                    onChange={(e) => handleMetadataChange('level', e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Duration (Weeks)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.duration_weeks || 12}
                    onChange={(e) => handleMetadataChange('duration_weeks', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Weekly Time Commitment</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 15-20 hrs/week"
                    value={formData.weekly_hours || ''}
                    onChange={(e) => handleMetadataChange('weekly_hours', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Outcome Hook / Key Takeaway</label>
                <textarea
                  rows={2}
                  className="form-input"
                  placeholder="What will learners achieve upon completing this course outline?"
                  style={{ resize: 'vertical' }}
                  value={formData.outcome_hook || ''}
                  onChange={(e) => handleMetadataChange('outcome_hook', e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    minWidth: '130px',
                    justifyContent: 'center',
                  }}
                >
                  {isSaved ? (
                    <>
                      <Check size={16} />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
