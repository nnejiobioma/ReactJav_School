'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building, 
  GraduationCap, 
  Timer, 
  Video, 
  BookOpen, 
  LayoutDashboard, 
  ShieldCheck, 
  Bell, 
  ArrowRight, 
  FileCode, 
  Download, 
  Users, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  QrCode,
  Calendar,
  Terminal
} from 'lucide-react';
import IntranetGuard from '@/components/intranet/IntranetGuard';
import { Profile, IntranetBulletin, CBTExam, LiveRoom, Course } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import StudentRecordModal from '@/components/student/StudentRecordModal';

export default function IntranetHubPage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [autoPrintRecord, setAutoPrintRecord] = useState(false);
  const [bulletins, setBulletins] = useState<IntranetBulletin[]>([]);
  const [exams, setExams] = useState<CBTExam[]>([]);
  const [rooms, setRooms] = useState<LiveRoom[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCurrentUser(LocalDataService.getCurrentUser());
    setBulletins(LocalDataService.getCampusBulletins());
    setExams(LocalDataService.getCBTExams());
    setRooms(LocalDataService.getLiveRooms());
    setCourses(LocalDataService.getCourses());

    const handleStorage = () => {
      setCurrentUser(LocalDataService.getCurrentUser());
      setBulletins(LocalDataService.getCampusBulletins());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <IntranetGuard requiredFeatureTitle="Campus Intranet Portal">
      <div className="container" style={{ padding: '2.5rem 1rem 5rem' }}>
        {/* Intranet Welcome Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          padding: '2.5rem',
          borderRadius: '1.25rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-accent)',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#34d399',
              fontSize: '0.78rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}>
              <ShieldCheck size={14} />
              <span>ACADEMIC CLEARANCE: ACTIVE & VERIFIED</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              Welcome to the Campus Intranet, {currentUser?.full_name?.split(' ')[0] || 'Scholar'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Your private portal to timed CBT certifications, real-time virtual rooms with 1080p screen-sharing, faculty office hours, and exclusive internal engineering repositories.
            </p>
          </div>

          {/* Student Digital Intranet ID Badge */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
            padding: '1.25rem',
            minWidth: '280px',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <img
                src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt="Profile"
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
              />
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                  {currentUser?.full_name || 'Enrolled Student'}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                  ● Cleared Fellow ({currentUser?.subscription_plan || 'Annual Pass'})
                </span>
              </div>
            </div>

            <div style={{
              borderTop: '1px dashed var(--border-subtle)',
              paddingTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.68rem' }}>MATRICULATION</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>RJ-2026-089</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '0.68rem' }}>CAMPUS KEY</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--primary)' }}>
                  {currentUser?.payment_reference || 'SEC-INTRANET-PASS'}
                </span>
              </div>
            </div>

            {/* Quick Transcript Action Button */}
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => {
                  setAutoPrintRecord(false);
                  setIsRecordModalOpen(true);
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                title="View, manage, or print official student academic transcript"
              >
                <GraduationCap size={14} color="var(--primary)" />
                <span>View / Print Academic Transcript</span>
              </button>
            </div>
          </div>
        </div>

        {/* Intranet Quick Access Grid */}
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building size={20} color="var(--primary)" />
          <span>Internal Campus Facilities</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {/* Card 1: CBT Center */}
          <Link href="/cbt" style={{ textDecoration: 'none' }} className="glass-card">
            <div style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '0.75rem',
                    background: 'rgba(245, 158, 11, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Timer size={22} color="var(--accent-amber)" />
                  </div>
                  <span className="badge badge-amber">
                    {exams.length} Exams Ready
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  CBT Testing Center
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Timed 60-minute certification assessments with real-time question palette and printable credential slips.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Launch CBT Exam</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Card 2: Live Virtual Classrooms */}
          <Link href="/live" style={{ textDecoration: 'none' }} className="glass-card">
            <div style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '0.75rem',
                    background: 'rgba(236, 72, 153, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Video size={22} color="#ec4899" />
                  </div>
                  <span className="badge" style={{ background: 'rgba(236,72,153,0.2)', color: '#f472b6' }}>
                    {rooms.length} Active Pods
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Live Virtual Rooms
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Hardware 1080p screen share, collaborative laser annotations, cloud recording simulation, and breakout rooms.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f472b6', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Enter Live Pods</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Card 3: Curriculum Player */}
          <Link href="/learn/crs_nextjs_supabase_01" style={{ textDecoration: 'none' }} className="glass-card">
            <div style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '0.75rem',
                    background: 'rgba(99, 102, 241, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <BookOpen size={22} color="var(--primary)" />
                  </div>
                  <span className="badge badge-primary">
                    Course Player
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Enrolled Curriculum
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Resume lecture video streaming, module quizzes, and interactive code exercises on Next.js 15 & Supabase.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a5b4fc', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Resume Course Player</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Card 4: Academic Dashboard */}
          <Link href="/dashboard" style={{ textDecoration: 'none' }} className="glass-card">
            <div style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '0.75rem',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <LayoutDashboard size={22} color="var(--accent-emerald)" />
                  </div>
                  <span className="badge badge-emerald">
                    Academic Stats
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Student Dashboard
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Track overall completion velocity, review recent test attempts, and manage account credentials.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>View My Records</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>

          {/* Card 5: Campus IDE & Sandbox */}
          <Link href="/intranet/ide" style={{ textDecoration: 'none' }} className="glass-card">
            <div style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Terminal size={22} color="var(--accent-emerald)" />
                  </div>
                  <span className="badge badge-emerald">
                    Python • JS • SQL
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Engineering IDE & Sandbox
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Interactive code environment with Python 3 WebAssembly runtime, live web application preview, and database querying.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Launch IDE Sandbox</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </div>

        {/* Two-Column Section: Campus Bulletins & Internal Academic Library */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
        }}>
          {/* Column A: Campus Bulletin Board */}
          <div className="glass-card" style={{ padding: '2rem', borderRadius: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={18} color="var(--accent-amber)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Campus Bulletins & Memos
                </h3>
              </div>
              <span className="badge badge-amber">{bulletins.length} Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bulletins.map((b) => (
                <div
                  key={b.id}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.875rem',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className={`badge ${
                      b.priority === 'high' ? 'badge-amber' : b.priority === 'urgent' ? 'badge-red' : 'badge-primary'
                    }`} style={{ fontSize: '0.65rem' }}>
                      {b.category} • {b.priority.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {new Date(b.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {b.title}
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {b.content}
                  </p>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Posted by: <strong style={{ color: 'var(--text-primary)' }}>{b.author}</strong> ({b.author_role})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column B: Internal Study Repositories & Downloads */}
          <div className="glass-card" style={{ padding: '2rem', borderRadius: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCode size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Internal Code Archive
                </h3>
              </div>
              <span className="badge badge-primary">Cleared Only</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.875rem',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    PostgreSQL RLS Architecture Blueprints (.pdf)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Complete schema migration, row-level policy templates, and role definitions.
                  </span>
                </div>
                <button
                  onClick={() => alert('Downloading official ReactJav RLS Blueprints (Sample asset)...')}
                  className="btn btn-secondary btn-sm"
                  style={{ flexShrink: 0, marginLeft: '0.5rem' }}
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>
              </div>

              <div style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.875rem',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    CBT Exam Preparatory Question Bank (.json)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    150 practice questions spanning Next.js App Router, SSR, and Supabase Auth.
                  </span>
                </div>
                <button
                  onClick={() => alert('Downloading CBT Question Bank (Sample asset)...')}
                  className="btn btn-secondary btn-sm"
                  style={{ flexShrink: 0, marginLeft: '0.5rem' }}
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>
              </div>

              <div style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.875rem',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Live Virtual Room Presenter SDK (.zip)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    WebRTC signaling adapter, slide deck renderer, and screen pen hooks.
                  </span>
                </div>
                <button
                  onClick={() => alert('Downloading Presenter SDK (Sample asset)...')}
                  className="btn btn-secondary btn-sm"
                  style={{ flexShrink: 0, marginLeft: '0.5rem' }}
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Academic Record & Transcript Modal */}
      <StudentRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        autoPrint={autoPrintRecord}
      />
    </IntranetGuard>
  );
}
