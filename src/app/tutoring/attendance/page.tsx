'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Profile, UserRole } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import TutoringAttendanceTracker from '@/components/attendance/TutoringAttendanceTracker';

export default function TutoringAttendancePage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [activePersona, setActivePersona] = useState<UserRole>('student');

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
    setActivePersona(user.role);
  }, []);

  const handleSwitchPersona = (role: UserRole) => {
    const updated = LocalDataService.switchDemoRole(role);
    setCurrentUser(updated);
    setActivePersona(role);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
      {/* Top Navigation & Breadcrumbs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            href="/academy"
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.8rem', gap: '0.4rem', borderRadius: '0.5rem' }}
          >
            <ArrowLeft size={14} />
            <span>Direct Tutoring Academy</span>
          </Link>

          <span style={{ color: 'var(--border-subtle)' }}>/</span>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Attendance Tracker
          </span>
        </div>

        {/* Demo Persona Switcher for Quick Validation Testing */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'var(--bg-surface)',
          padding: '0.3rem 0.5rem',
          borderRadius: '0.75rem',
          border: '1px solid var(--border-subtle)',
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '0.25rem' }}>
            Test As:
          </span>
          <button
            onClick={() => handleSwitchPersona('student')}
            style={{
              padding: '0.3rem 0.65rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: activePersona === 'student' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color: activePersona === 'student' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            Student
          </button>
          <button
            onClick={() => handleSwitchPersona('instructor')}
            style={{
              padding: '0.3rem 0.65rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: activePersona === 'instructor' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
              color: activePersona === 'instructor' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            Instructor
          </button>
          <button
            onClick={() => handleSwitchPersona('admin')}
            style={{
              padding: '0.3rem 0.65rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: activePersona === 'admin' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
              color: activePersona === 'admin' ? 'var(--accent-amber)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Main Attendance Tracker Component */}
      <TutoringAttendanceTracker initialRole={activePersona} />
    </div>
  );
}
