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
    <aside className="lesson-sidebar">
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
          const allSecLessons = sectionLessons.flatMap((l) => [l, ...(l.sub_lessons || [])]);
          const completedCount = allSecLessons.filter((l) => progressMap[l.id]).length;

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
                  {completedCount}/{allSecLessons.length}
                </span>
              </button>

              {/* Section Lessons */}
              {!isCollapsed && (
                <div style={{ padding: '0.35rem' }}>
                  {sectionLessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;
                    const isCompleted = !!progressMap[lesson.id];
                    const hasSubLessons = !!(lesson.sub_lessons && lesson.sub_lessons.length > 0);

                    return (
                      <div key={lesson.id} style={{ marginBottom: '0.25rem' }}>
                        {/* Main Lesson Row */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.55rem 0.75rem',
                            borderRadius: '0.5rem',
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
                                fontWeight: isActive ? 700 : (hasSubLessons ? 600 : 400),
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
                                {hasSubLessons && (
                                  <span style={{ color: '#a5b4fc', fontWeight: 600 }}>• {lesson.sub_lessons?.length} sub-lessons</span>
                                )}
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

                        {/* Sub-lessons nested under main lesson */}
                        {hasSubLessons && (
                          <div style={{
                            marginLeft: '1.25rem',
                            paddingLeft: '0.65rem',
                            borderLeft: '2px solid rgba(99, 102, 241, 0.25)',
                            marginTop: '0.2rem',
                            marginBottom: '0.35rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.2rem',
                          }}>
                            {lesson.sub_lessons?.map((subLesson) => {
                              const isSubActive = subLesson.id === currentLessonId;
                              const isSubCompleted = !!progressMap[subLesson.id];

                              return (
                                <div
                                  key={subLesson.id}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0.4rem 0.6rem',
                                    borderRadius: '0.375rem',
                                    background: isSubActive ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                                    border: isSubActive ? '1px solid var(--border-accent)' : '1px solid transparent',
                                    transition: 'all 0.2s ease',
                                  }}
                                >
                                  <Link
                                    href={`/learn/${course.id}/${subLesson.id}`}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.5rem',
                                      textDecoration: 'none',
                                      color: isSubActive ? 'var(--primary)' : 'var(--text-secondary)',
                                      flexGrow: 1,
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <span style={{
                                      width: '6px',
                                      height: '6px',
                                      borderRadius: '50%',
                                      backgroundColor: isSubActive ? 'var(--primary)' : 'var(--text-muted)',
                                      flexShrink: 0,
                                    }} />
                                    {getLessonIcon(subLesson.type, isSubCompleted, isSubActive)}
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                      <span style={{
                                        fontSize: '0.785rem',
                                        fontWeight: isSubActive ? 600 : 400,
                                        display: 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        color: isSubActive ? '#ffffff' : 'var(--text-secondary)',
                                      }}>
                                        {subLesson.title}
                                      </span>
                                      <span style={{
                                        fontSize: '0.675rem',
                                        color: 'var(--text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                      }}>
                                        <Clock size={10} />
                                        {formatDuration(subLesson.duration_seconds)}
                                        {subLesson.is_free_preview && (
                                          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>• Preview</span>
                                        )}
                                      </span>
                                    </div>
                                  </Link>

                                  <button
                                    onClick={(e) => onToggleComplete(subLesson.id, e)}
                                    title={isSubCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                      padding: '0.2rem',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    {isSubCompleted ? (
                                      <CheckCircle2 size={16} color="var(--accent-emerald)" />
                                    ) : (
                                      <Circle size={16} color="var(--text-muted)" />
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
