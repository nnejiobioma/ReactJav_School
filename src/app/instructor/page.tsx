'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Users, 
  DollarSign, 
  BookOpen, 
  Star, 
  Edit3, 
  ExternalLink, 
  Sparkles,
  Layers,
  ArrowRight,
  Calendar,
  ShieldCheck,
  Search,
  Filter,
  GraduationCap,
  Clock,
  CheckCircle2,
  Lock,
  Mail,
  Zap,
  Tag,
  Check
} from 'lucide-react';
import { Course, Profile } from '@/types';
import { AcademyTrack, ACADEMY_TRACKS } from '@/data/academyTracks';
import { LocalDataService } from '@/lib/supabase/client';
import { formatCurrency } from '@/lib/utils';
import TutoringAttendanceTracker from '@/components/attendance/TutoringAttendanceTracker';
import AdminTrackEditorModal from '@/components/academy/AdminTrackEditorModal';
import AccessGuard from '@/components/auth/AccessGuard';

export default function InstructorDashboardPage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [tracks, setTracks] = useState<AcademyTrack[]>(ACADEMY_TRACKS);
  const [students, setStudents] = useState<Profile[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateTrackModal, setShowCreateTrackModal] = useState(false);
  const [editingTrack, setEditingTrack] = useState<AcademyTrack | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'tracks' | 'attendance' | 'students'>('courses');

  // Search & filter for read-only student roster
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilter, setStudentFilter] = useState<'all' | 'tutoring' | 'catalog'>('all');

  // New catalog course form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Beginner');
  const [price, setPrice] = useState('49.99');
  const [description, setDescription] = useState('');

  // New 1-on-1 Track form
  const [newTrackName, setNewTrackName] = useState('');
  const [newTrackZone, setNewTrackZone] = useState<'zone-01' | 'zone-02'>('zone-01');
  const [newTrackDuration, setNewTrackDuration] = useState('12 Weeks');
  const [newTrackPrice, setNewTrackPrice] = useState('399');
  const [newTrackHook, setNewTrackHook] = useState('');
  const [newTrackSyllabus, setNewTrackSyllabus] = useState('Module 1: Foundations\nModule 2: Core Engineering\nModule 3: Capstone Delivery');

  const loadAllData = () => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
    setCourses(LocalDataService.getCourses());
    setTracks(LocalDataService.getAcademyTracks());
    
    // Load student profiles for read-only inspection
    const allProfiles = LocalDataService.getAllProfiles();
    const studentList = allProfiles.filter((p) => p.role === 'student' || !p.role);
    setStudents(studentList);
  };

  useEffect(() => {
    loadAllData();

    const handleUpdate = () => loadAllData();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('reactjav-site-content-updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('reactjav-site-content-updated', handleUpdate);
    };
  }, []);

  const handleCreateCourse = () => {
    if (!title.trim()) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCourse: Course = {
      id: `crs_${Date.now()}`,
      instructor_id: currentUser?.id || 'usr_instructor_001',
      title: title.trim(),
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      description: description || 'Comprehensive course curriculum built with Next.js & Supabase.',
      category,
      level,
      price: parseFloat(price) || 0,
      thumbnail_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      is_published: false,
      created_at: new Date().toISOString(),
      enrollments_count: 0,
      average_rating: 5.0,
      reviews_count: 0,
      instructor: currentUser || undefined,
      sections: [
        {
          id: `sec_${Date.now()}_1`,
          course_id: `crs_${Date.now()}`,
          title: 'Module 1: Foundations & Architecture',
          position: 1,
          lessons: [
            {
              id: `les_${Date.now()}_1`,
              section_id: `sec_${Date.now()}_1`,
              title: '1.1 Introduction & Course Objectives',
              type: 'video',
              video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              duration_seconds: 300,
              position: 1,
              is_free_preview: true,
            }
          ]
        }
      ]
    };

    LocalDataService.saveCourse(newCourse);
    setCourses(LocalDataService.getCourses());
    setShowCreateModal(false);

    // Reset form
    setTitle('');
    setDescription('');
  };

  const handleCreateTrack = () => {
    if (!newTrackName.trim()) return;
    const trackId = `track-${newTrackName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`;
    const syllabusList = newTrackSyllabus.split('\n').map(s => s.trim()).filter(Boolean);

    const newTrack: AcademyTrack = {
      id: trackId,
      name: newTrackName.trim(),
      sub: newTrackHook || 'Mentored 1-on-1 Pathway',
      icon: newTrackZone === 'zone-01' ? '⚡' : '🚀',
      tags: ['1-on-1 Mentorship', 'Live Code Pairing', 'Dual Attendance Signoff'],
      zone: newTrackZone,
      zoneName: newTrackZone === 'zone-01' ? 'Foundation & Explorer' : 'Professional & Advanced',
      tier: newTrackZone === 'zone-01' ? 'Foundation (Ages 5–10 or Beginners)' : 'Professional & Systems',
      description: newTrackHook || 'Intensive 1-on-1 mentored engineering pathway with weekly live pairing sessions.',
      recommendedSchedule: newTrackDuration ? `${newTrackDuration} • 2x per week` : '2x per week (60–90 mins)',
      overview: 'Dedicated 1-on-1 mentoring program designed to accelerate engineering proficiency through live hands-on code reviews, personalized milestone tracking, and dual-signoff verified attendance.',
      syllabus: syllabusList.length > 0 ? syllabusList : ['Foundational Core', 'Advanced Engineering', 'Capstone Defense'],
      projects: [`${newTrackName.trim()} Production Capstone`, 'Interactive System Architecture'],
      certification: `${newTrackName.trim()} Certified Specialist`,
      prerequisites: ['Basic computer familiarity', 'Active participation in code reviews']
    };

    LocalDataService.saveAcademyTrack(newTrack);
    setTracks(LocalDataService.getAcademyTracks());
    setShowCreateTrackModal(false);
    setNewTrackName('');
    setNewTrackHook('');
  };

  const totalStudents = courses.reduce((acc, c) => acc + (c.enrollments_count || 0), 0);
  const totalRevenue = courses.reduce((acc, c) => acc + (c.enrollments_count || 0) * (c.price || 0), 0);
  const tutoringFellowsCount = students.filter(s => s.tutoring_enrolled || s.tutoring_track_id).length;

  // Filtered read-only students
  const filteredStudents = students.filter((s) => {
    const q = studentSearch.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      (s.full_name || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q) ||
      (s.tutoring_track_name || '').toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q);

    const isTutoring = s.tutoring_enrolled || !!s.tutoring_track_id;
    const matchesFilter =
      studentFilter === 'all' ||
      (studentFilter === 'tutoring' && isTutoring) ||
      (studentFilter === 'catalog' && !isTutoring);

    return matchesSearch && matchesFilter;
  });

  return (
    <AccessGuard level="instructor" pageTitle="Instructor Studio">
      <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-emerald">Instructor Studio</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Faculty RBAC Clearance: Active
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', color: '#ffffff' }}>Instructor Dashboard & Studio</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Author catalog courses, manage 1-on-1 direct learning tracks, log attendance, and review student rosters.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
              style={{ gap: '0.45rem' }}
            >
              <Plus size={18} />
              <span>Create New Course</span>
            </button>
            <button
              onClick={() => setShowCreateTrackModal(true)}
              className="btn btn-secondary"
              style={{ gap: '0.45rem', color: 'var(--accent-emerald)', borderColor: 'rgba(16, 185, 129, 0.35)' }}
            >
              <GraduationCap size={18} color="var(--accent-emerald)" />
              <span>New 1-on-1 Track</span>
            </button>
          </div>
        </div>

        {/* Studio View Selector Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          background: 'var(--bg-surface)',
          padding: '0.35rem',
          borderRadius: '0.85rem',
          border: '1px solid var(--border-subtle)',
          width: 'fit-content',
          flexWrap: 'wrap',
        }}>
          {/* Tab 1: Catalog Courses */}
          <button
            onClick={() => setActiveTab('courses')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.65rem',
              border: 'none',
              background: activeTab === 'courses' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'courses' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s ease',
            }}
          >
            <BookOpen size={16} />
            <span>Curricula Management ({courses.length})</span>
          </button>

          {/* Tab 2: 1-on-1 Direct Learning Tracks */}
          <button
            onClick={() => setActiveTab('tracks')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.65rem',
              border: 'none',
              background: activeTab === 'tracks' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
              color: activeTab === 'tracks' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s ease',
            }}
          >
            <GraduationCap size={16} />
            <span>1-on-1 Direct Learning Tracks ({tracks.length})</span>
          </button>

          {/* Tab 3: Attendance Desk */}
          <button
            onClick={() => setActiveTab('attendance')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.65rem',
              border: 'none',
              background: activeTab === 'attendance' ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'transparent',
              color: activeTab === 'attendance' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s ease',
            }}
          >
            <Calendar size={16} />
            <span>1-on-1 Tutoring Attendance Desk</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem' }}>
              Dual Sign-off
            </span>
          </button>

          {/* Tab 4: Read-Only Student Roster */}
          <button
            onClick={() => setActiveTab('students')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.65rem',
              border: 'none',
              background: activeTab === 'students' ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' : 'transparent',
              color: activeTab === 'students' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s ease',
            }}
          >
            <Users size={16} />
            <span>Student Roster ({students.length})</span>
            <span className="badge badge-amber" style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem' }}>
              Read-Only
            </span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CURRICULA MANAGEMENT                              */}
        {/* ======================================================== */}
        {activeTab === 'courses' && (
          <>
            {/* Analytics Metric Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              marginBottom: '3rem',
            }}>
              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(99, 102, 241, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <BookOpen size={24} color="var(--primary)" />
                </div>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
                    {courses.length}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Curricula Created</span>
                </div>
              </div>

              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Users size={24} color="var(--accent-emerald)" />
                </div>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
                    {totalStudents.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Catalog Enrollments</span>
                </div>
              </div>

              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <DollarSign size={24} color="var(--accent-amber)" />
                </div>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
                    {formatCurrency(totalRevenue)}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Simulated Revenue</span>
                </div>
              </div>

              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(6, 182, 212, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Star size={24} color="var(--accent-cyan)" />
                </div>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
                    4.92 / 5.0
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Rating</span>
                </div>
              </div>
            </div>

            {/* Courses List */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h2 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0 }}>
                  Your Authored Catalog Courses
                </h2>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-primary btn-sm"
                  style={{ gap: '0.4rem' }}
                >
                  <Plus size={15} />
                  <span>Create Course</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexGrow: 1, minWidth: 'min(100%, 280px)' }}>
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        style={{ width: '80px', height: '60px', borderRadius: '0.5rem', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span className={`badge ${course.is_published ? 'badge-emerald' : 'badge-amber'}`}>
                            {course.is_published ? 'Published' : 'Draft'}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {course.category} • {course.level}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.2rem' }}>
                          {course.title}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {course.sections?.length || 0} sections • {course.sections?.reduce((a, s) => a + (s.lessons?.length || 0), 0) || 0} lessons • {formatCurrency(course.price)}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Link
                        href={`/instructor/builder/${course.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <Edit3 size={15} />
                        <span>Curriculum Builder</span>
                      </Link>

                      <a
                        href={`/courses/${course.slug}`}
                        target="_blank"
                        className="btn btn-secondary btn-sm"
                        title="View Student Page"
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DIRECT 1-ON-1 LEARNING TRACKS                    */}
        {/* ======================================================== */}
        {activeTab === 'tracks' && (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', color: '#ffffff', margin: '0 0 0.35rem 0' }}>
                  1-on-1 Direct Learning Pathways & Curricula
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  Instructors hold full authoring rights to edit syllabi, customize pricing, learning outcomes, and create new direct tutoring tracks.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button
                  onClick={() => setShowCreateTrackModal(true)}
                  className="btn btn-primary btn-sm"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', gap: '0.4rem', fontWeight: 700 }}
                >
                  <Plus size={15} />
                  <span>Create 1-on-1 Track</span>
                </button>
                <Link
                  href="/academy#learning-zones"
                  target="_blank"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.4rem' }}
                >
                  <ExternalLink size={14} />
                  <span>View Public Academy</span>
                </Link>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '1.5rem',
            }}>
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-accent)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem' }}>
                      <span className={track.zone === 'zone-01' ? 'badge badge-primary' : 'badge badge-purple'}>
                        {track.zone === 'zone-01' ? 'Zone 01 • Foundation' : 'Zone 02 • Professional'}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        {track.tier}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.45rem' }}>
                      <span style={{ fontSize: '1.4rem' }}>{track.icon || '🚀'}</span>
                      <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0, fontWeight: 800 }}>
                        {track.name}
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {track.description || track.sub}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--bg-surface-elevated)',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                      border: '1px solid var(--border-subtle)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={13} color="var(--primary)" />
                        <span>{track.recommendedSchedule}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <GraduationCap size={13} color="var(--accent-emerald)" />
                        <span>{track.certification}</span>
                      </div>
                    </div>

                    {/* Syllabus Roadmap Preview */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.45rem' }}>
                        Syllabus Modules ({track.syllabus?.length || 0})
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {(track.syllabus || []).slice(0, 3).map((mod, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <CheckCircle2 size={13} color="var(--accent-emerald)" />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mod}</span>
                          </div>
                        ))}
                        {(track.syllabus?.length || 0) > 3 && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingLeft: '1.15rem' }}>
                            +{(track.syllabus?.length || 0) - 3} additional modules
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                    <button
                      onClick={() => setEditingTrack(track)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, justifyContent: 'center', gap: '0.4rem', fontWeight: 700 }}
                    >
                      <Edit3 size={14} />
                      <span>Edit Track Syllabus</span>
                    </button>
                    <Link
                      href={`/tutoring/enroll?trackId=${encodeURIComponent(track.id)}`}
                      target="_blank"
                      className="btn btn-secondary btn-sm"
                      title="Preview Booking Form"
                      style={{ padding: '0.5rem 0.75rem' }}
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: TUTORING ATTENDANCE DESK                         */}
        {/* ======================================================== */}
        {activeTab === 'attendance' && (
          <TutoringAttendanceTracker initialRole="instructor" />
        )}

        {/* ======================================================== */}
        {/* TAB 4: READ-ONLY STUDENT DIRECTORY                      */}
        {/* ======================================================== */}
        {activeTab === 'students' && (
          <div>
            {/* Faculty Audit Notice Banner */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '0.75rem',
                  background: 'rgba(99, 102, 241, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Users size={22} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      Faculty Student Roster
                    </h3>
                    <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>
                      Read-Only Clearance
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.2rem 0 0', lineHeight: 1.4 }}>
                    Faculty clearance permits you to inspect enrolled scholars, their direct tutoring tracks, syllabus progression, and Intranet verification status. Note: User access grants and role assignments are governed exclusively by administrators.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-surface)', borderRadius: '0.5rem', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>{students.length}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scholars</span>
                </div>
                <div style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-surface)', borderRadius: '0.5rem', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399', display: 'block' }}>{tutoringFellowsCount}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>1-on-1 Fellows</span>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'var(--bg-surface)',
              borderRadius: '0.85rem',
              border: '1px solid var(--border-subtle)',
            }}>
              {/* Search Box */}
              <div style={{ position: 'relative', flex: 1, minWidth: 'min(100%, 260px)' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search scholars by name, email, or track..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="input-field"
                  style={{
                    width: '100%',
                    paddingLeft: '2.5rem',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.6rem',
                    fontSize: '0.86rem',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              {/* Filter Pills */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setStudentFilter('all')}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '0.55rem',
                    border: studentFilter === 'all' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    background: studentFilter === 'all' ? 'var(--primary)' : 'var(--bg-surface-elevated)',
                    color: studentFilter === 'all' ? '#ffffff' : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  All ({students.length})
                </button>
                <button
                  onClick={() => setStudentFilter('tutoring')}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '0.55rem',
                    border: studentFilter === 'tutoring' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                    background: studentFilter === 'tutoring' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-surface-elevated)',
                    color: studentFilter === 'tutoring' ? '#34d399' : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  1-on-1 Fellows ({tutoringFellowsCount})
                </button>
                <button
                  onClick={() => setStudentFilter('catalog')}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '0.55rem',
                    border: studentFilter === 'catalog' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    background: studentFilter === 'catalog' ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-surface-elevated)',
                    color: studentFilter === 'catalog' ? '#a5b4fc' : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  General Learners ({students.length - tutoringFellowsCount})
                </button>
              </div>
            </div>

            {/* Read-Only Student Table */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                      <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Scholar</th>
                      <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Contact Email</th>
                      <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Enrollment Track</th>
                      <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Intranet Clearance</th>
                      <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Registration</th>
                      <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Enrolled Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          No students matched your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((st) => (
                        <tr key={st.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s ease' }}>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <img
                                src={st.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
                                alt={st.full_name || 'Student'}
                                style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-subtle)' }}
                              />
                              <div>
                                <span style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                                  {st.full_name || 'Anonymous Scholar'}
                                </span>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                  ID: {st.id.slice(0, 8)}...
                                </span>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <Mail size={13} color="var(--text-muted)" />
                              <span>{st.email || 'N/A'}</span>
                            </div>
                          </td>

                          <td style={{ padding: '0.85rem 1rem' }}>
                            {st.tutoring_enrolled || st.tutoring_track_id ? (
                              <div>
                                <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '0.12rem 0.45rem', marginBottom: '0.2rem' }}>
                                  1-on-1 Direct Tutoring
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', display: 'block', fontWeight: 600 }}>
                                  {st.tutoring_track_name || 'Junior Dev Track'}
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '0.12rem 0.45rem', marginBottom: '0.2rem' }}>
                                  Standard Catalog
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                                  Self-paced Curriculum
                                </span>
                              </div>
                            )}
                          </td>

                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span className={st.admin_granted || st.tutoring_enrolled || st.subscription_status === 'active' ? 'badge badge-emerald' : st.subscription_status === 'pending_approval' ? 'badge badge-amber' : 'badge'} style={{ fontSize: '0.7rem' }}>
                              {st.admin_granted || st.tutoring_enrolled || st.subscription_status === 'active' ? 'Clearance Active' : st.subscription_status === 'pending_approval' ? 'Awaiting Clearance' : 'Standard'}
                            </span>
                          </td>

                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={{ fontSize: '0.78rem', color: st.registration_completed ? '#34d399' : 'var(--text-muted)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                              {st.registration_completed ? <Check size={13} /> : null}
                              {st.registration_completed ? 'Completed' : 'Pending'}
                            </span>
                          </td>

                          <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {st.created_at ? new Date(st.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL: CREATE CATALOG COURSE                             */}
        {/* ======================================================== */}
        {showCreateModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 500,
            padding: '1.5rem',
          }}>
            <div className="glass-card animate-fade-in" style={{
              width: '100%',
              maxWidth: '560px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-accent)',
            }}>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '1.25rem' }}>
                Create New Engineering Course
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Course Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Distributed Cloud Architecture with Kubernetes"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-input"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science & AI">Data Science & AI</option>
                      <option value="Design">Design</option>
                      <option value="Cloud Architecture">Cloud Architecture</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      Difficulty Level
                    </label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value as any)}
                      className="form-input"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Overview Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Summarize course goals, target audience, and key prerequisites..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCourse}
                  disabled={!title.trim()}
                  className="btn btn-primary btn-sm"
                >
                  Initialize Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL: CREATE 1-ON-1 DIRECT LEARNING TRACK               */}
        {/* ======================================================== */}
        {showCreateTrackModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 500,
            padding: '1.5rem',
          }}>
            <div className="glass-card animate-fade-in" style={{
              width: '100%',
              maxWidth: '600px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-accent)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <GraduationCap size={20} color="var(--accent-emerald)" />
                <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0 }}>
                  Create 1-on-1 Direct Learning Track
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Track Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js 15 Full-Stack & Supabase Fellowship"
                    value={newTrackName}
                    onChange={(e) => setNewTrackName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      Learning Zone
                    </label>
                    <select
                      value={newTrackZone}
                      onChange={(e) => setNewTrackZone(e.target.value as any)}
                      className="form-input"
                    >
                      <option value="zone-01">Zone 01: Foundation & Explorer</option>
                      <option value="zone-02">Zone 02: Builder & Professional</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      Duration (Weeks)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 12 Weeks"
                      value={newTrackDuration}
                      onChange={(e) => setNewTrackDuration(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Tuition / Fee (USD)
                  </label>
                  <input
                    type="number"
                    value={newTrackPrice}
                    onChange={(e) => setNewTrackPrice(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Outcome Tagline & Value Hook
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe the transformative mastery the scholar achieves..."
                    value={newTrackHook}
                    onChange={(e) => setNewTrackHook(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Syllabus Modules (One module per line)
                  </label>
                  <textarea
                    rows={4}
                    value={newTrackSyllabus}
                    onChange={(e) => setNewTrackSyllabus(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  onClick={() => setShowCreateTrackModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTrack}
                  disabled={!newTrackName.trim()}
                  className="btn btn-primary btn-sm"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                >
                  Save & Publish Track
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL: EDIT EXISTING 1-ON-1 TRACK (AdminTrackEditorModal) */}
        {/* ======================================================== */}
        <AdminTrackEditorModal
          isOpen={!!editingTrack}
          onClose={() => setEditingTrack(null)}
          track={editingTrack}
          onSaved={() => {
            setTracks(LocalDataService.getAcademyTracks());
            setEditingTrack(null);
          }}
        />

      </div>
    </AccessGuard>
  );
}
