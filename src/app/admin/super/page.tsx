'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  GraduationCap, 
  UserCheck, 
  Users, 
  Search, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Lock, 
  ExternalLink,
  Crown,
  UserX,
  Building,
  Calendar
} from 'lucide-react';
import { Profile, UserRole } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import AccessGuard from '@/components/auth/AccessGuard';

export default function SuperAdminGovernancePage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Modal state for confirmation
  const [pendingAction, setPendingAction] = useState<{
    user: Profile;
    targetRole: UserRole;
  } | null>(null);

  const loadProfiles = async () => {
    setCurrentUser(LocalDataService.getCurrentUser());
    const local = LocalDataService.getAllProfiles();
    setProfiles(local);
  };

  const handleSyncSupabase = async () => {
    setIsSyncing(true);
    try {
      const synced = await LocalDataService.fetchProfilesFromSupabase();
      setProfiles(synced);
      setFeedback({ message: 'User directory synchronized with Supabase database.', type: 'success' });
      setTimeout(() => setFeedback(null), 3500);
    } catch {
      setFeedback({ message: 'Could not sync from remote database; loaded local profiles.', type: 'error' });
      setTimeout(() => setFeedback(null), 3500);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadProfiles();
    handleSyncSupabase();

    const handleStorage = () => loadProfiles();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const triggerRoleChange = (user: Profile, targetRole: UserRole) => {
    if (user.role === targetRole) return;
    setPendingAction({ user, targetRole });
  };

  const confirmRoleChange = () => {
    if (!pendingAction || !currentUser) return;
    const { user, targetRole } = pendingAction;

    const res = LocalDataService.updateUserRole(user.id, targetRole, currentUser);
    if (res.success) {
      loadProfiles();
      setFeedback({ message: res.message, type: 'success' });
      setTimeout(() => setFeedback(null), 4000);
    } else {
      setFeedback({ message: res.message, type: 'error' });
      setTimeout(() => setFeedback(null), 4000);
    }
    setPendingAction(null);
  };

  const cancelRoleChange = () => {
    setPendingAction(null);
  };

  // Metrics
  const totalUsers = profiles.length;
  const studentCount = profiles.filter((p) => p.role === 'student').length;
  const instructorCount = profiles.filter((p) => p.role === 'instructor').length;
  const adminCount = profiles.filter((p) => p.role === 'admin').length;
  const superAdminCount = profiles.filter((p) => p.role === 'super_admin').length;

  // Filtered profiles
  const filteredProfiles = profiles.filter((p) => {
    const matchesRole = roleFilter === 'all' || p.role === roleFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (p.full_name || '').toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q);
    return matchesRole && matchesSearch;
  });

  return (
    <AccessGuard level="super_admin" pageTitle="Super Administrator Access Control">
      <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <Link
            href="/admin/access"
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.8rem', gap: '0.4rem', borderRadius: '0.5rem' }}
          >
            <ArrowLeft size={14} />
            <span>Registrar Desk</span>
          </Link>
          <span style={{ color: 'var(--border-subtle)' }}>/</span>
          <span style={{ fontSize: '0.82rem', color: '#c084fc', fontWeight: 700 }}>
            Root Governance
          </span>
          <span style={{ color: 'var(--border-subtle)' }}>/</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            User Access Control
          </span>
        </div>

        {/* Page Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.16) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(99, 102, 241, 0.08) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          borderRadius: '1.25rem',
          padding: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 8px 32px rgba(168, 85, 247, 0.1)',
        }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              background: 'rgba(168, 85, 247, 0.2)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              color: '#d8b4fe',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.85rem',
            }}>
              <Crown size={14} />
              <span>Super Administrator Exclusive Console</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>
              User Access Control & Role Governance
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
              As Super Administrator, you possess exclusive authority to manage platform access and assign user roles. All new signups register as standard <strong>Students</strong> until elevated by you.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleSyncSupabase}
              disabled={isSyncing}
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem', borderColor: 'rgba(168, 85, 247, 0.35)', color: '#d8b4fe' }}
            >
              <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Database Users'}</span>
            </button>
            <Link href="/admin/access" className="btn btn-outline btn-sm">
              <Building size={14} />
              <span>Registrar Clearance Desk</span>
            </Link>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div style={{
            padding: '1rem 1.25rem',
            borderRadius: '0.85rem',
            background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: feedback.type === 'success' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
            color: feedback.type === 'success' ? '#34d399' : '#f87171',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}>
            {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Registered
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
              {totalUsers}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>All registered platform accounts</span>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Students (Default)
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.62rem' }}>Default</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
              {studentCount}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Standard course & CBT learners</span>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Instructors (Faculty)
              </span>
              <GraduationCap size={16} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
              {instructorCount}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Curriculum & live room authoring</span>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Administrators
              </span>
              <ShieldCheck size={16} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '0.2rem' }}>
              {adminCount}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Bursar audits & student admissions</span>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '1rem', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Super Users (Root)
              </span>
              <Crown size={16} color="#c084fc" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d8b4fe', marginTop: '0.2rem' }}>
              {superAdminCount}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Full platform access control</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-card" style={{
          padding: '1.25rem',
          borderRadius: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search user by name, email, or user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.4rem', fontSize: '0.875rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="form-input"
              style={{ width: 'auto', padding: '0.6rem 0.9rem', fontSize: '0.85rem' }}
            >
              <option value="all">All User Tiers ({profiles.length})</option>
              <option value="student">Students ({studentCount})</option>
              <option value="instructor">Instructors ({instructorCount})</option>
              <option value="admin">Administrators ({adminCount})</option>
              <option value="super_admin">Super Users ({superAdminCount})</option>
            </select>
          </div>
        </div>

        {/* User Access Datagrid */}
        <div className="glass-card" style={{ borderRadius: '1.25rem', overflow: 'hidden', padding: 0 }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '1.1rem 1.25rem' }}>User Profile</th>
                  <th style={{ padding: '1.1rem 1.25rem' }}>Current Role</th>
                  <th style={{ padding: '1.1rem 1.25rem' }}>Access Clearance</th>
                  <th style={{ padding: '1.1rem 1.25rem', textAlign: 'center' }}>Super User Actions (Grant Access)</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <Users size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                      <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>No users matching query.</p>
                      <span style={{ fontSize: '0.8rem' }}>Try clearing filters or search keywords.</span>
                    </td>
                  </tr>
                ) : (
                  filteredProfiles.map((user) => {
                    const isSelf = user.id === currentUser?.id;
                    const isStudent = user.role === 'student';
                    const isInstructor = user.role === 'instructor';
                    const isAdmin = user.role === 'admin';
                    const isSuperAdmin = user.role === 'super_admin';

                    return (
                      <tr key={user.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s ease' }}>
                        
                        {/* Profile Info */}
                        <td style={{ padding: '1.1rem 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <img
                              src={user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.full_name || user.email)}`}
                              alt={user.full_name || 'User'}
                              style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: isSuperAdmin ? '2px solid #c084fc' : '1.5px solid var(--border-subtle)',
                              }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                <span>{user.full_name || 'Unnamed Scholar'}</span>
                                {isSelf && (
                                  <span className="badge badge-purple" style={{ fontSize: '0.6rem', padding: '0.05rem 0.35rem' }}>
                                    You (Super User)
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {user.email}
                              </div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '0.1rem' }}>
                                UID: {user.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Current Role */}
                        <td style={{ padding: '1.1rem 1.25rem' }}>
                          <span
                            className={`badge ${
                              isSuperAdmin
                                ? 'badge-purple'
                                : isAdmin
                                ? 'badge-amber'
                                : isInstructor
                                ? 'badge-emerald'
                                : 'badge-primary'
                            }`}
                            style={{
                              fontSize: '0.74rem',
                              padding: '0.25rem 0.65rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontWeight: 700,
                            }}
                          >
                            {isSuperAdmin && <Crown size={12} />}
                            {isAdmin && <ShieldCheck size={12} />}
                            {isInstructor && <GraduationCap size={12} />}
                            <span>{user.role.toUpperCase().replace('_', ' ')}</span>
                          </span>
                        </td>

                        {/* Intranet Clearance */}
                        <td style={{ padding: '1.1rem 1.25rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <span
                              className={`badge ${
                                user.admin_granted || user.role !== 'student'
                                  ? 'badge-emerald'
                                  : user.subscription_status === 'pending_approval'
                                  ? 'badge-amber'
                                  : 'badge-primary'
                              }`}
                              style={{ fontSize: '0.68rem', width: 'fit-content' }}
                            >
                              {user.role !== 'student'
                                ? 'Staff Level Clearance'
                                : user.admin_granted
                                ? 'Intranet Active'
                                : user.subscription_status === 'pending_approval'
                                ? 'Clearance Pending'
                                : 'Default Access'}
                            </span>
                            {user.tutoring_enrolled && (
                              <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Sparkles size={11} />
                                <span>{user.tutoring_track_name || 'Tutoring Fellow'}</span>
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Role Action Buttons */}
                        <td style={{ padding: '1.1rem 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                            
                            {/* 1. Assign as Admin */}
                            <button
                              type="button"
                              onClick={() => triggerRoleChange(user, 'admin')}
                              disabled={isAdmin}
                              className="btn btn-sm"
                              style={{
                                fontSize: '0.74rem',
                                padding: '0.35rem 0.65rem',
                                borderRadius: '0.5rem',
                                background: isAdmin ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                                color: isAdmin ? '#fcd34d' : 'var(--text-secondary)',
                                border: isAdmin ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid var(--border-subtle)',
                                cursor: isAdmin ? 'default' : 'pointer',
                                opacity: isAdmin ? 0.7 : 1,
                                gap: '0.3rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                              }}
                              title={isAdmin ? 'User is already an Administrator' : 'Promote user to Administrator'}
                            >
                              <ShieldCheck size={13} color="var(--accent-amber)" />
                              <span>Assign as Admin</span>
                            </button>

                            {/* 2. Assign as Instructor */}
                            <button
                              type="button"
                              onClick={() => triggerRoleChange(user, 'instructor')}
                              disabled={isInstructor}
                              className="btn btn-sm"
                              style={{
                                fontSize: '0.74rem',
                                padding: '0.35rem 0.65rem',
                                borderRadius: '0.5rem',
                                background: isInstructor ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                                color: isInstructor ? '#6ee7b7' : 'var(--text-secondary)',
                                border: isInstructor ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid var(--border-subtle)',
                                cursor: isInstructor ? 'default' : 'pointer',
                                opacity: isInstructor ? 0.7 : 1,
                                gap: '0.3rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                              }}
                              title={isInstructor ? 'User is already an Instructor' : 'Promote user to Instructor'}
                            >
                              <GraduationCap size={13} color="var(--accent-emerald)" />
                              <span>Assign as Instructor</span>
                            </button>

                            {/* 3. Assign as Super User */}
                            <button
                              type="button"
                              onClick={() => triggerRoleChange(user, 'super_admin')}
                              disabled={isSuperAdmin}
                              className="btn btn-sm"
                              style={{
                                fontSize: '0.74rem',
                                padding: '0.35rem 0.65rem',
                                borderRadius: '0.5rem',
                                background: isSuperAdmin ? 'rgba(168, 85, 247, 0.25)' : 'transparent',
                                color: isSuperAdmin ? '#d8b4fe' : '#c084fc',
                                border: isSuperAdmin ? '1px solid #c084fc' : '1px solid rgba(168, 85, 247, 0.4)',
                                cursor: isSuperAdmin ? 'default' : 'pointer',
                                opacity: isSuperAdmin ? 0.7 : 1,
                                gap: '0.3rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                fontWeight: 700,
                              }}
                              title={isSuperAdmin ? 'User already possesses Super User authority' : 'Grant Super Administrator authority'}
                            >
                              <Crown size={13} color="#c084fc" />
                              <span>Assign as Super User</span>
                            </button>

                            {/* 4. Revert to Student (If elevated) */}
                            {!isStudent && (
                              <button
                                type="button"
                                onClick={() => triggerRoleChange(user, 'student')}
                                className="btn btn-sm"
                                style={{
                                  fontSize: '0.74rem',
                                  padding: '0.35rem 0.65rem',
                                  borderRadius: '0.5rem',
                                  background: 'rgba(99, 102, 241, 0.1)',
                                  color: '#a5b4fc',
                                  border: '1px solid rgba(99, 102, 241, 0.3)',
                                  cursor: 'pointer',
                                  gap: '0.3rem',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                }}
                                title="Revoke elevated privileges and reset user to default Student status"
                              >
                                <UserX size={13} />
                                <span>Revert to Student</span>
                              </button>
                            )}

                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Roles Capabilities Summary Card */}
        <div style={{
          marginTop: '3rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '1.75rem',
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={18} color="var(--primary)" />
            <span>Role Permissions & Access Matrix Reference</span>
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Clearance hierarchy enforced by PostgreSQL Row Level Security (RLS) policies:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}>
            <div style={{ padding: '1rem', borderRadius: '0.75rem', background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Student (Default)</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Assigned automatically upon registration. Can view public catalog, complete CBT examinations, access campus IDE sandbox upon tuition clearance, and track study progress.
              </p>
            </div>

            <div style={{ padding: '1rem', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Instructor</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Granted by Super User. Includes all Student rights plus Course Builder, Lesson Editor, Quiz Authoring, and Live Audio/Video Studio classroom hosting.
              </p>
            </div>

            <div style={{ padding: '1rem', borderRadius: '0.75rem', background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>Administrator</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Granted by Super User. Includes Faculty rights plus Registrar Bursar Desk, student tuition validation, intranet admission clearance grants, and dual-signoff attendance audit logs.
              </p>
            </div>

            <div style={{ padding: '1rem', borderRadius: '0.75rem', background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>Super User (Root)</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Full Platform Authority. Only role permitted to access this page, grant or revoke rights, promote instructors/admins, assign Super Users, or perform database overrides.
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {pendingAction && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem',
            animation: 'fadeIn 0.15s ease',
          }}>
            <div className="glass-card" style={{
              maxWidth: '520px',
              width: '100%',
              padding: '2rem',
              borderRadius: '1.25rem',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
            }}>
              <div style={{
                width: '3.75rem',
                height: '3.75rem',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(99, 102, 241, 0.25))',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <Crown size={28} color="#c084fc" />
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                Confirm Access Rights Change
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Are you sure you want to assign <strong>{pendingAction.user.full_name || pendingAction.user.email}</strong> to the role of:
              </p>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Previous Role</span>
                  <span className="badge badge-secondary" style={{ marginTop: '0.2rem' }}>
                    {pendingAction.user.role.toUpperCase()}
                  </span>
                </div>
                <span style={{ color: 'var(--text-muted)' }}>➔</span>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>New Target Role</span>
                  <span className={`badge ${
                    pendingAction.targetRole === 'super_admin'
                      ? 'badge-purple'
                      : pendingAction.targetRole === 'admin'
                      ? 'badge-amber'
                      : pendingAction.targetRole === 'instructor'
                      ? 'badge-emerald'
                      : 'badge-primary'
                  }`} style={{ marginTop: '0.2rem', fontWeight: 700 }}>
                    {pendingAction.targetRole.toUpperCase().replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={cancelRoleChange}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmRoleChange}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                    fontWeight: 700,
                  }}
                >
                  Confirm & Grant
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AccessGuard>
  );
}
