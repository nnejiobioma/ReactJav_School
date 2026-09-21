'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  MessageSquare, 
  Download, 
  Share2, 
  Lock,
  CreditCard,
  Printer, 
  Mail, 
  GraduationCap, 
  Award, 
  FileText, 
  ShieldCheck,
  Edit3,
  Plus,
  X
} from 'lucide-react';
import { Course, Lesson, Profile, LessonQaItem, LessonResourceItem } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import AccessGuard from '@/components/auth/AccessGuard';
import VideoPlayer from '@/components/player/VideoPlayer';
import LessonSidebar from '@/components/player/LessonSidebar';
import QuizRunner from '@/components/quiz/QuizRunner';
import StudentRecordModal from '@/components/student/StudentRecordModal';
import LessonTabEditorModal, { 
  LessonEditorSection, 
  DEFAULT_SUMMARY, 
  DEFAULT_TIP, 
  DEFAULT_LECTURE_NOTES, 
  DEFAULT_QA_ITEMS, 
  DEFAULT_RESOURCES 
} from '@/components/player/LessonTabEditorModal';
import ProgrammeCheckoutModal from '@/components/checkout/ProgrammeCheckoutModal';

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [lastPosition, setLastPosition] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'summary' | 'notes' | 'qa' | 'resources'>('summary');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [autoPrintRecord, setAutoPrintRecord] = useState(false);
  const [editingSection, setEditingSection] = useState<LessonEditorSection | null>(null);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Load course and progress
  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
    if (!user) return;

    const foundCourse = LocalDataService.getCourseById(courseId);
    if (foundCourse) {
      setCourse(foundCourse);

      // Find current lesson (including any nested sub-lessons)
      const allLessons = foundCourse.sections?.flatMap((s) =>
        (s.lessons || []).flatMap((l) => [l, ...(l.sub_lessons || [])])
      ) || [];
      const foundLesson = allLessons.find((l) => l.id === lessonId);
      if (foundLesson) {
        setCurrentLesson(foundLesson);
      }

      // Load progress
      const userProg = LocalDataService.getProgress(user.id);
      const map: Record<string, boolean> = {};
      Object.keys(userProg).forEach((lid) => {
        map[lid] = userProg[lid].is_completed;
      });
      setProgressMap(map);

      if (userProg[lessonId]) {
        setLastPosition(userProg[lessonId].last_position_seconds || 0);
      }
    }
  }, [courseId, lessonId]);

  if (!course || !currentLesson) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', color: '#ffffff' }}>Loading Learning Session...</h2>
      </div>
    );
  }

  // Check instructor, admin, or super admin editing privileges
  const canEdit = currentUser?.role === 'admin' || currentUser?.role === 'super_admin' || currentUser?.role === 'instructor';

  // Computed materials
  const qaItems = currentLesson.qa_items && currentLesson.qa_items.length > 0
    ? currentLesson.qa_items
    : DEFAULT_QA_ITEMS;

  const resources = currentLesson.resources && currentLesson.resources.length > 0
    ? currentLesson.resources
    : DEFAULT_RESOURCES;

  const summaryContent = currentLesson.summary || DEFAULT_SUMMARY;
  const tipContent = currentLesson.implementation_tip || DEFAULT_TIP;
  const notesContent = currentLesson.lecture_notes || currentLesson.content || DEFAULT_LECTURE_NOTES;

  // Check enrollment / preview permission
  const isFaculty = currentUser?.role === 'admin' || currentUser?.role === 'super_admin' || currentUser?.role === 'instructor';
  const isEnrolled = currentUser ? LocalDataService.isEnrolled(currentUser.id, course.id) : false;

  if (!isEnrolled && !isFaculty && !currentLesson.is_free_preview) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem 6rem', maxWidth: '640px' }}>
        <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
          <div style={{
            width: '4.5rem',
            height: '4.5rem',
            borderRadius: '1.25rem',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}>
            <Lock size={36} color="var(--accent-amber)" />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.8rem',
            borderRadius: '9999px',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#fbbf24',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <ShieldCheck size={13} />
            <span>Programme Tuition Required</span>
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
            Lesson Access Locked
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 2rem' }}>
            Full curriculum access, source code repositories, and interactive sandboxes in <strong>{course.title}</strong> are exclusively available to students who have completed programme enrollment and tuition payment.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setShowCheckoutModal(true)}
              className="btn btn-primary"
              style={{ gap: '0.5rem' }}
            >
              <CreditCard size={16} />
              <span>Pay Tuition & Unlock Programme</span>
            </button>
            <Link href="/courses" className="btn btn-secondary">
              <span>View All Programmes</span>
            </Link>
          </div>
        </div>

        <ProgrammeCheckoutModal
          course={course}
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          onSuccess={() => {
            window.location.reload();
          }}
        />
      </div>
    );
  }

  const allLessons = course.sections?.flatMap((s) =>
    (s.lessons || []).flatMap((l) => [l, ...(l.sub_lessons || [])])
  ) || [];
  const currentIdx = allLessons.findIndex((l) => l.id === currentLesson.id);
  const nextLesson = allLessons[currentIdx + 1] || null;
  const prevLesson = allLessons[currentIdx - 1] || null;

  // Find parent lesson if this is a sub-lesson
  const parentLesson = course.sections
    ?.flatMap((s) => s.lessons || [])
    .find((l) => l.sub_lessons?.some((sl) => sl.id === currentLesson.id));

  const isCompleted = !!progressMap[currentLesson.id];

  const handleToggleComplete = (targetLessonId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentUser) return;

    const nextState = !progressMap[targetLessonId];
    LocalDataService.updateLessonProgress(currentUser.id, targetLessonId, nextState, lastPosition);
    setProgressMap((prev) => ({ ...prev, [targetLessonId]: nextState }));
  };

  const handleTimeUpdate = (currentTime: number) => {
    if (!currentUser) return;
    setLastPosition(currentTime);
    // Persist position checkpoint every 5 seconds
    if (Math.floor(currentTime) % 5 === 0) {
      LocalDataService.updateLessonProgress(currentUser.id, currentLesson.id, isCompleted, currentTime);
    }
  };

  const handleLessonAutoCompleted = () => {
    if (!currentUser) return;
    LocalDataService.updateLessonProgress(currentUser.id, currentLesson.id, true, lastPosition);
    setProgressMap((prev) => ({ ...prev, [currentLesson.id]: true }));
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/learn/${course.id}/${nextLesson.id}`);
    }
  };

  // Save updated lesson materials to course and disk
  const handleSaveLesson = (updatedLesson: Lesson) => {
    if (!course) return;
    const newSections = (course.sections || []).map((sec) => {
      let sectionChanged = false;
      const newLessons = (sec.lessons || []).map((l) => {
        if (l.id === updatedLesson.id) {
          sectionChanged = true;
          return updatedLesson;
        }
        if (l.sub_lessons && l.sub_lessons.some((sl) => sl.id === updatedLesson.id)) {
          sectionChanged = true;
          return {
            ...l,
            sub_lessons: l.sub_lessons.map((sl) => (sl.id === updatedLesson.id ? updatedLesson : sl)),
          };
        }
        return l;
      });
      return sectionChanged ? { ...sec, lessons: newLessons } : sec;
    });

    const updatedCourse: Course = {
      ...course,
      sections: newSections,
    };

    LocalDataService.saveCourse(updatedCourse);
    setCourse(updatedCourse);
    setCurrentLesson(updatedLesson);
    setEditingSection(null);
  };

  // Student question submission
  const handleStudentAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !currentLesson) return;
    const newQa: LessonQaItem = {
      id: `qa-${Date.now()}`,
      user_name: currentUser?.full_name || currentUser?.email?.split('@')[0] || 'Student',
      time_ago: 'Just now',
      question: newQuestionText.trim(),
    };
    const updatedLesson: Lesson = {
      ...currentLesson,
      qa_items: [newQa, ...qaItems],
    };
    handleSaveLesson(updatedLesson);
    setNewQuestionText('');
    setIsAskModalOpen(false);
  };

  // Resource download handler
  const handleDownloadResource = (res: LessonResourceItem) => {
    if (res.url && res.url !== '#' && res.url.startsWith('http')) {
      window.open(res.url, '_blank');
      return;
    }
    const blobContent = `-- REACTJav Engineering Material: ${res.name}\n-- Type: ${res.type} (${res.size})\n-- Course: ${course.title}\n-- Module: ${currentLesson.title}\n\n${res.description || 'Supplementary reference material and engineering assets for this lesson.'}\n`;
    const blob = new Blob([blobContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = res.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = currentUser ? LocalDataService.getCourseStats(course.id, currentUser.id) : { totalLessons: 0, completedLessons: 0, percentage: 0 };

  return (
    <AccessGuard level="authenticated" pageTitle="Interactive Learning Classroom">
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      {/* Top Breadcrumb Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href={`/courses/${course.slug}`} className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} />
            <span>Course Outline</span>
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {course.title}
          </span>
          {parentLesson && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>/</span>
              <Link
                href={`/learn/${course.id}/${parentLesson.id}`}
                style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none' }}
                title="Go to parent lesson"
              >
                {parentLesson.title}
              </Link>
            </>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {prevLesson && (
            <Link
              href={`/learn/${course.id}/${prevLesson.id}`}
              className="btn btn-secondary btn-sm"
              title={prevLesson.title}
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </Link>
          )}

          <button
            onClick={() => handleToggleComplete(currentLesson.id)}
            className={`btn btn-sm ${isCompleted ? 'btn-success' : 'btn-secondary'}`}
          >
            {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>

          {nextLesson && (
            <button onClick={handleNextLesson} className="btn btn-primary btn-sm">
              <span>Next Lesson</span>
              <ArrowRight size={14} />
            </button>
          )}

          <button
            onClick={() => {
              setAutoPrintRecord(false);
              setIsRecordModalOpen(true);
            }}
            className="btn btn-secondary btn-sm"
            title="View & manage student academic record and transcript"
          >
            <GraduationCap size={15} color="var(--primary)" />
            <span>Academic Record</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Stage on Left, Curriculum Sidebar on Right */}
      <div className="lesson-player-layout">
        {/* Left Column: Media Stage & Content */}
        <div>
          {/* Lesson Stage */}
          <div style={{ marginBottom: '2rem' }}>
            {currentLesson.type === 'video' && currentLesson.video_url && (
              <VideoPlayer
                videoUrl={currentLesson.video_url}
                title={currentLesson.title}
                initialTime={lastPosition}
                isCompleted={isCompleted}
                onTimeUpdate={handleTimeUpdate}
                onComplete={handleLessonAutoCompleted}
              />
            )}

            {currentLesson.type === 'quiz' && (
              <QuizRunner
                questions={currentLesson.quiz_questions || []}
                lessonTitle={currentLesson.title}
                onComplete={handleLessonAutoCompleted}
                canEdit={canEdit}
                onUpdateQuestions={(newQuestions) => {
                  const updatedLesson: Lesson = {
                    ...currentLesson,
                    quiz_questions: newQuestions,
                  };
                  handleSaveLesson(updatedLesson);
                }}
              />
            )}

            {currentLesson.type === 'article' && (
              <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}>
                  <span className="badge badge-cyan">Article Reading</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Approx {Math.round(currentLesson.duration_seconds / 60)} min read
                  </span>
                </div>

                <div style={{
                  color: 'var(--text-primary)',
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  whiteSpace: 'pre-line',
                }}>
                  {currentLesson.content}
                </div>

                <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      handleToggleComplete(currentLesson.id);
                      if (nextLesson) handleNextLesson();
                    }}
                    className="btn btn-primary"
                  >
                    <span>Mark Read & Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Title & Info */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {parentLesson ? (
                <span className="badge badge-indigo" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  Sub-lesson of {parentLesson.title}
                </span>
              ) : (
                <span className="badge badge-primary">Main Lesson</span>
              )}
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
              {currentLesson.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Part of {course.title}
            </p>
          </div>

          {/* Tab Navigation: 4 Explicit Sections */}
          <div className="responsive-tabs-bar">
            <button
              onClick={() => setActiveTab('summary')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.75rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activeTab === 'summary' ? '#ffffff' : 'var(--text-muted)',
                borderBottom: activeTab === 'summary' ? '2px solid var(--primary)' : '2px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
              }}
            >
              <FileText size={16} color={activeTab === 'summary' ? 'var(--primary)' : undefined} />
              <span>Summary & Key Takeaways</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.75rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activeTab === 'notes' ? '#ffffff' : 'var(--text-muted)',
                borderBottom: activeTab === 'notes' ? '2px solid var(--primary)' : '2px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
              }}
            >
              <BookOpen size={16} color={activeTab === 'notes' ? 'var(--primary)' : undefined} />
              <span>Lecture Notes & Key Concepts</span>
            </button>

            <button
              onClick={() => setActiveTab('qa')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.75rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activeTab === 'qa' ? '#ffffff' : 'var(--text-muted)',
                borderBottom: activeTab === 'qa' ? '2px solid var(--primary)' : '2px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
              }}
            >
              <MessageSquare size={16} color={activeTab === 'qa' ? 'var(--primary)' : undefined} />
              <span>Discussion / Q&A ({qaItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.75rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: activeTab === 'resources' ? '#ffffff' : 'var(--text-muted)',
                borderBottom: activeTab === 'resources' ? '2px solid var(--primary)' : '2px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
              }}
            >
              <Download size={16} color={activeTab === 'resources' ? 'var(--primary)' : undefined} />
              <span>Downloadable Resources ({resources.length})</span>
            </button>
          </div>

          {/* TAB 1: Summary & Key Takeaways Panel */}
          {activeTab === 'summary' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  Summary & Key Takeaways
                </h3>
                {canEdit && (
                  <button
                    onClick={() => setEditingSection('summary')}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--primary)',
                      borderColor: 'rgba(99, 102, 241, 0.35)',
                      background: 'rgba(99, 102, 241, 0.08)',
                    }}
                    title="Edit Summary & Key Takeaways"
                  >
                    <Edit3 size={14} />
                    <span>Edit Summary & Takeaways</span>
                  </button>
                )}
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
                {summaryContent}
              </p>
              <div style={{
                background: 'var(--bg-surface-elevated)',
                padding: '1rem 1.25rem',
                borderRadius: '0.65rem',
                borderLeft: '4px solid var(--primary)',
                fontSize: '0.875rem',
                color: '#c7d2fe',
                lineHeight: 1.6,
              }}>
                <strong>Implementation Tip:</strong> {tipContent}
              </div>
            </div>
          )}

          {/* TAB 2: Lecture Notes & Key Concepts Panel */}
          {activeTab === 'notes' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                    Lecture Notes & Key Concepts
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Detailed architectural notes and technical principles
                  </span>
                </div>
                {canEdit && (
                  <button
                    onClick={() => setEditingSection('notes')}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--primary)',
                      borderColor: 'rgba(99, 102, 241, 0.35)',
                      background: 'rgba(99, 102, 241, 0.08)',
                    }}
                    title="Edit Lecture Notes & Key Concepts"
                  >
                    <Edit3 size={14} />
                    <span>Edit Lecture Notes</span>
                  </button>
                )}
              </div>
              <div style={{
                color: 'var(--text-primary)',
                lineHeight: 1.8,
                fontSize: '0.95rem',
                whiteSpace: 'pre-line',
              }}>
                {notesContent}
              </div>
            </div>
          )}

          {/* TAB 3: Discussion / Q&A Panel */}
          {activeTab === 'qa' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                    Discussion / Q&A ({qaItems.length})
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Student questions and instructor guidance
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {canEdit && (
                    <button
                      onClick={() => setEditingSection('qa')}
                      className="btn btn-secondary btn-sm"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: 'var(--primary)',
                        borderColor: 'rgba(99, 102, 241, 0.35)',
                        background: 'rgba(99, 102, 241, 0.08)',
                      }}
                      title="Edit & Manage Q&A Threads"
                    >
                      <Edit3 size={14} />
                      <span>Manage / Edit Q&A</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsAskModalOpen(true)}
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Plus size={14} />
                    <span>Ask a Question</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {qaItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '0.65rem',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#ffffff' }}>{item.user_name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time_ago}</span>
                      </div>
                      {canEdit && (
                        <button
                          onClick={() => setEditingSection('qa')}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                          }}
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                      )}
                    </div>

                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {item.question}
                    </p>

                    {item.answer && (
                      <div style={{
                        marginTop: '0.75rem',
                        padding: '0.75rem 1rem',
                        background: 'rgba(99, 102, 241, 0.08)',
                        borderRadius: '0.5rem',
                        borderLeft: '3px solid var(--primary)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 700 }}>
                            {item.answered_by || 'Instructor Answer'}:
                          </span>
                        </div>
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-primary)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Downloadable Resources Panel */}
          {activeTab === 'resources' && (
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                    Downloadable Resources ({resources.length})
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Lecture attachments, starter files, slides, and cheat sheets
                  </span>
                </div>
                {canEdit && (
                  <button
                    onClick={() => setEditingSection('resources')}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--primary)',
                      borderColor: 'rgba(99, 102, 241, 0.35)',
                      background: 'rgba(99, 102, 241, 0.08)',
                    }}
                    title="Edit & Add Downloadable Resources"
                  >
                    <Edit3 size={14} />
                    <span>Manage / Edit Resources</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {resources.map((res) => (
                  <div
                    key={res.id}
                    style={{
                      padding: '0.85rem 1.25rem',
                      borderRadius: '0.5rem',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                      }}>
                        <FileText size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', display: 'block' }}>
                          {res.name}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {res.type} • {res.size}
                          {res.description && ` — ${res.description}`}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {canEdit && (
                        <button
                          onClick={() => setEditingSection('resources')}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                          title="Edit Resource"
                        >
                          <Edit3 size={13} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDownloadResource(res)}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* END OF COURSE & STUDENT ACADEMIC RECORD MANAGEMENT SECTION */}
          <div 
            className="glass-card" 
            style={{ 
              marginTop: '2.5rem', 
              padding: '2rem', 
              border: '1px solid var(--border-accent)',
              background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
              borderRadius: '1rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top decorative tag */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.1) 100%)',
              padding: '0.4rem 1.25rem',
              borderBottomLeftRadius: '0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--primary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Academic Transcript Center
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.35)',
                flexShrink: 0,
              }}>
                <GraduationCap size={28} />
              </div>

              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Student Academic Record & Official Transcript
                  </h3>
                  {stats.percentage === 100 && (
                    <span className="badge badge-emerald">Course Completed</span>
                  )}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  {stats.percentage === 100
                    ? 'Congratulations! You have completed all curriculum modules in this course. Your official academic record, CDT assessment scores, and proctored verification hashes are ready for management.'
                    : !nextLesson 
                    ? 'You have reached the final module of this curriculum! Review your cumulative coursework, print your official academic record, or dispatch it via email.'
                    : 'Manage your verified academic standing, review complete course activity and CDT assessment scores, or generate printable official transcripts anytime.'}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '0.85rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.65rem',
                padding: '0.85rem 1rem',
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                  Candidate ID
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  {currentUser ? `RJ-2026-ENG-${(currentUser.id || 'usr_001').slice(-5).toUpperCase()}` : 'RJ-2026-ENG-001'}
                </span>
              </div>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.65rem',
                padding: '0.85rem 1rem',
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                  Curriculum Progress
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {stats.completedLessons} of {stats.totalLessons} Lessons ({stats.percentage}%)
                </span>
              </div>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.65rem',
                padding: '0.85rem 1rem',
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                  Verification Status
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={14} /> Verified Fellow
                </span>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setAutoPrintRecord(false);
                    setIsRecordModalOpen(true);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <FileText size={15} />
                  <span>View & Manage Record</span>
                </button>

                <button
                  onClick={() => {
                    setAutoPrintRecord(true);
                    setIsRecordModalOpen(true);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Printer size={15} />
                  <span>Print Record (PDF)</span>
                </button>

                <button
                  onClick={() => {
                    setAutoPrintRecord(false);
                    setIsRecordModalOpen(true);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  <Mail size={15} />
                  <span>Send via Email</span>
                </button>
              </div>

              <Link
                href="/cbt"
                className="btn btn-secondary btn-sm"
                style={{ color: 'var(--accent-amber)', borderColor: 'rgba(245, 158, 11, 0.3)' }}
              >
                <Award size={15} />
                <span>Take CDT Certification Exam</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Curriculum Sidebar */}
        <div>
          <LessonSidebar
            course={course}
            currentLessonId={currentLesson.id}
            progressMap={progressMap}
            onToggleComplete={handleToggleComplete}
            stats={stats}
            onOpenRecord={() => {
              setAutoPrintRecord(false);
              setIsRecordModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* Student Academic Record & Transcript Modal */}
      <StudentRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        specificCourseId={course.id}
        autoPrint={autoPrintRecord}
      />

      {/* Instructor & Admin Lesson Materials Editor Modal */}
      {editingSection && (
        <LessonTabEditorModal
          isOpen={editingSection !== null}
          initialSection={editingSection}
          lesson={currentLesson}
          onClose={() => setEditingSection(null)}
          onSave={handleSaveLesson}
        />
      )}

      {/* Student Ask Question Modal */}
      {isAskModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 7, 15, 0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAskModalOpen(false);
          }}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '1.75rem',
              borderRadius: '1rem',
              border: '1px solid rgba(99, 102, 241, 0.35)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Ask a Question
              </h3>
              <button
                onClick={() => setIsAskModalOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.4rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.3rem',
                }}
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleStudentAskQuestion}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Your Question or Discussion Topic for {currentLesson.title}
                </label>
                <textarea
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  rows={4}
                  required
                  className="form-input"
                  placeholder="Ask for clarification on concepts, implementation tips, or edge cases..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAskModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AccessGuard>
  );
}
