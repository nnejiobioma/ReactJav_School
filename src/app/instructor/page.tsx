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
  ArrowRight
} from 'lucide-react';
import { Course, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { formatCurrency } from '@/lib/utils';

export default function InstructorDashboardPage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New course form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Beginner');
  const [price, setPrice] = useState('49.99');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Automatically switch to or load instructor persona
    const user = LocalDataService.getCurrentUser();
    if (user.role !== 'instructor') {
      const instructorUser = LocalDataService.switchDemoRole('instructor');
      setCurrentUser(instructorUser);
    } else {
      setCurrentUser(user);
    }
    setCourses(LocalDataService.getCourses());
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

  const totalStudents = courses.reduce((acc, c) => acc + (c.enrollments_count || 0), 0);
  const totalRevenue = courses.reduce((acc, c) => acc + (c.enrollments_count || 0) * (c.price || 0), 0);

  return (
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
              Supabase RBAC: Role = 'instructor'
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', color: '#ffffff' }}>Instructor Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Manage courses, edit module curricula, and monitor student enrollments.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus size={18} />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Analytics Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
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
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Students</span>
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
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Simulated Gross Revenue</span>
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
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Course Rating</span>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div>
        <h2 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '1.25rem' }}>
          Your Authored Courses
        </h2>

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexGrow: 1, minWidth: '280px' }}>
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

      {/* Create Course Modal */}
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
    </div>
  );
}
