'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  ChevronRight, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Circle,
  Clock,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { Course, Lesson } from '@/types';
import { formatDuration } from '@/lib/utils';

interface LessonSidebarProps {
  course: Course;
  currentLessonId: string;
  progressMap: Record<string, boolean>;
  onToggleComplete: (lessonId: string, e: React.MouseEvent) => void;
  stats: { totalLessons: number; completedLessons: number; percentage: number };
  onOpenRecord?: () => void;
}

export default function LessonSidebar({
  course,
  currentLessonId,
  progressMap,
  onToggleComplete,
  stats,
  onOpenRecord,
}: LessonSidebarProps) {
  // Keep all sections open by default
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (secId: string) => {
    setCollapsedSections((prev) => ({ ...prev, [secId]: !prev[secId] }));
  };

  const getLessonIcon = (type: Lesson['type'], isCompleted: boolean, isActive: boolean) => {
    if (type === 'quiz') {
      return <HelpCircle size={17} color={isActive ? '#a5b4fc' : 'var(--accent-amber)'} />;
    }
    if (type === 'article') {
      return <FileText size={17} color={isActive ? '#a5b4fc' : 'var(--accent-cyan)'} />;
    }
    return <PlayCircle size={17} color={isActive ? '#a5b4fc' : 'var(--primary)'} />;
  };

  return (
    <aside style={{
      width: '100%',
      maxWidth: '380px',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '1rem',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 7rem)',
      position: 'sticky',
      top: '5.5rem',
    }}>
      {/* Header with Course Progress */}
      <div style={{
        padding: '1.25rem',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface-elevated)',
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
          {course.title}
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            Course Progress ({stats.completedLessons} of {stats.totalLessons})
          </span>
          <span style={{ fontWeight: 700, color: '#a5b4fc' }}>{stats.percentage}%</span>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${stats.percentage}%` }} />
        </div>
      </div>

      {/* Sections and Lessons List */}
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        padding: '0.75rem',
      }}>
        {course.sections?.map((section, sIdx) => {
          const isCollapsed = !!collapsedSections[section.id];
          const sectionLessons = section.lessons || [];
          const completedCount = sectionLessons.filter((l) => progressMap[l.id]).length;

          return (
            <div
              key={section.id}
              style={{
                marginBottom: '0.75rem',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                background: 'var(--bg-surface)',
              }}
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-surface-elevated)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {isCollapsed ? <ChevronRight size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    {section.title}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {completedCount}/{sectionLessons.length}
                </span>
              </button>

              {/* Section Lessons */}
              {!isCollapsed && (
                <div style={{ padding: '0.35rem' }}>
                  {sectionLessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;
                    const isCompleted = !!progressMap[lesson.id];

                    return (
                      <div
                        key={lesson.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.55rem 0.75rem',
                          borderRadius: '0.5rem',
                          marginBottom: '0.2rem',
                          background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                          border: isActive ? '1px solid var(--border-accent)' : '1px solid transparent',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Link
                          href={`/learn/${course.id}/${lesson.id}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem',
                            textDecoration: 'none',
                            color: isActive ? 'var(--primary)' : 'var(--text-primary)',
                            flexGrow: 1,
                            overflow: 'hidden',
                          }}
                        >
                          {getLessonIcon(lesson.type, isCompleted, isActive)}
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <span style={{
                              fontSize: '0.825rem',
                              fontWeight: isActive ? 600 : 400,
                              display: 'block',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}>
                              {lesson.title}
                            </span>
                            <span style={{
                              fontSize: '0.7rem',
                              color: 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                            }}>
                              <Clock size={11} />
                              {formatDuration(lesson.duration_seconds)}
                              {lesson.is_free_preview && (
                                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>• Preview</span>
                              )}
                            </span>
                          </div>
                        </Link>

                        {/* Interactive Completion Toggle Checkbox */}
                        <button
                          onClick={(e) => onToggleComplete(lesson.id, e)}
                          title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={18} color="var(--accent-emerald)" />
                          ) : (
                            <Circle size={18} color="var(--text-muted)" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Persistent Academic Record & Transcript Footer */}
      {onOpenRecord && (
        <div style={{
          padding: '0.75rem 1rem',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface-elevated)',
        }}>
          <button
            onClick={onOpenRecord}
            className="btn btn-secondary btn-sm"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
            }}
            title="View, print, or email your student academic record"
          >
            <GraduationCap size={15} color="var(--primary)" />
            <span>Academic Record & Transcript</span>
          </button>
        </div>
      )}
    </aside>
  );
}
