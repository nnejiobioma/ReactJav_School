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
import AccessGuard from '@/components/auth/AccessGuard';

export default function TutoringAttendancePage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <AccessGuard level="authenticated" pageTitle="Tutoring Attendance Tracker">
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
      </div>

      {/* Main Attendance Tracker Component */}
      <TutoringAttendanceTracker initialRole={currentUser?.role || 'student'} />
    </div>
    </AccessGuard>
  );
}
