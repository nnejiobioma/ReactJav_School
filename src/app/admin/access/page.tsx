'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Users, 
  Search, 
  Filter, 
  RefreshCw, 
  ExternalLink, 
  CreditCard, 
  Building, 
  UserCheck, 
  Calendar,
  Sparkles,
  Lock,
  GraduationCap
} from 'lucide-react';
import { Profile, IntranetAccessRequest, SubscriptionStatus, UserRole } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import TutoringAttendanceTracker from '@/components/attendance/TutoringAttendanceTracker';
import AccessGuard from '@/components/auth/AccessGuard';

export default function AdminAccessPage() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [requests, setRequests] = useState<IntranetAccessRequest[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleSearchQuery, setRoleSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'clearance' | 'attendance' | 'governance'>('clearance');

  const loadData = () => {
    setCurrentUser(LocalDataService.getCurrentUser());
    setRequests(LocalDataService.getIntranetRequests());
    setProfiles(LocalDataService.getAllProfiles());
  };

  useEffect(() => {
    loadData();

    const handleStorage = () => {
      loadData();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleGrant = (requestId: string, studentName: string) => {
    LocalDataService.grantIntranetAccess(requestId, currentUser?.id || 'usr_admin_001');
    loadData();
    setActionFeedback(`Academic clearance granted to ${studentName}! Intranet access is now active.`);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handleReject = (requestId: string, studentName: string) => {
    const reason = prompt('Specify rejection reason for registrar audit:', 'Invalid payment reference or tuition discrepancy.');
    if (reason === null) return;
    LocalDataService.rejectIntranetAccess(requestId, reason, currentUser?.id || 'usr_admin_001');
    loadData();
    setActionFeedback(`Tuition verification rejected for ${studentName}.`);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const handleRevoke = (userId: string, studentName: string) => {
    if (!confirm(`Are you sure you want to revoke campus intranet clearance for ${studentName}?`)) return;
    LocalDataService.revokeIntranetAccess(userId);
    loadData();
    setActionFeedback(`Intranet clearance revoked for ${studentName}.`);
    setTimeout(() => setActionFeedback(null), 3500);
  };


  const handleRoleChange = (userId: string, targetName: string, newRole: UserRole) => {
    if (currentUser?.role !== 'super_admin') {
      alert('Access Denied: Only Super Administrators have permissions to alter user roles.');
      return;
    }
    if (!confirm(`Confirm Role Reassignment:\nAre you sure you want to change the platform role of ${targetName} to ${newRole.toUpperCase().replace('_', ' ')}?`)) {
      return;
    }
    const res = LocalDataService.updateUserRole(userId, newRole, currentUser);
    if (res.success) {
      loadData();
      setActionFeedback(res.message);
      setTimeout(() => setActionFeedback(null), 3500);
    } else {
      alert(res.message);
    }
  };

  // Metrics
  const totalRequests = requests.length;
  const pendingCount = requests.filter((r) => r.status === 'pending_approval').length;
  const activeCount = requests.filter((r) => r.status === 'active').length;
  const totalRevenue = requests
    .filter((r) => r.status === 'active' || r.status === 'pending_approval')
    .reduce((sum, r) => sum + r.amount_paid, 0);

  // Filtered requests
  const filteredRequests = requests.filter((r) => {
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesSearch = 
      r.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.payment_reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <AccessGuard level="admin" pageTitle="Registrar Clearance Desk">
      <div className="container" style={{ padding: '3rem 1rem 6rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem',
          }}>
            <ShieldCheck size={14} />
            <span>Registrar & Academic Bursar Console</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Student Subscription & Intranet Clearance
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Review incoming student tuition payments and issue authenticated campus intranet admission clearance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/intranet" className="btn btn-secondary btn-sm">
            <Building size={16} />
            <span>View Intranet Portal</span>
          </Link>
          <Link href="/subscribe" className="btn btn-outline btn-sm">
            <CreditCard size={16} />
            <span>Test Student Payment Page</span>
          </Link>
        </div>
      </div>

      {/* Admin Section Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '2rem',
        paddingBottom: '0.25rem'
      }}>
        <button
          onClick={() => setActiveTab('clearance')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'clearance' ? '2px solid var(--primary)' : '2px solid transparent',
            color: activeTab === 'clearance' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <ShieldCheck size={18} color={activeTab === 'clearance' ? 'var(--primary)' : 'var(--text-muted)'} />
          <span>Tuition & Bursar Clearance</span>
          {pendingCount > 0 && (
            <span style={{
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#fbbf24',
              fontSize: '0.72rem',
              padding: '0.15rem 0.5rem',
              borderRadius: '9999px',
              fontWeight: 700,
            }}>
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'attendance' ? '2px solid var(--accent-emerald)' : '2px solid transparent',
            color: activeTab === 'attendance' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <Calendar size={18} color={activeTab === 'attendance' ? 'var(--accent-emerald)' : 'var(--text-muted)'} />
          <span>Direct Tutoring Attendance Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('governance')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'governance' ? '2px solid #a855f7' : '2px solid transparent',
            color: activeTab === 'governance' ? '#ffffff' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <Users size={18} color={activeTab === 'governance' ? '#c084fc' : 'var(--text-muted)'} />
          <span>User Roles & Governance</span>
          {currentUser?.role === 'super_admin' && (
            <span style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(236, 72, 153, 0.25))',
              color: '#d8b4fe',
              fontSize: '0.68rem',
              padding: '0.12rem 0.45rem',
              borderRadius: '9999px',
              fontWeight: 700,
              border: '1px solid rgba(168, 85, 247, 0.35)',
            }}>
              Super Admin
            </span>
          )}
        </button>
      </div>

      {activeTab === 'attendance' ? (
        <div>
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '1rem',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
                Dean & Bursar Attendance Verification Audit
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Monthly dual-verification audit ledger for direct tutoring fellows. Sessions require both student and instructor sign-off to qualify for certification.
              </p>
            </div>
            <Link href="/tutoring/attendance" className="btn btn-outline btn-sm">
              <ExternalLink size={14} />
              <span>Full Attendance Portal</span>
            </Link>
          </div>

          <TutoringAttendanceTracker initialRole="admin" />
        </div>
      ) : activeTab === 'governance' ? (
        <div>
          {/* Governance Header Banner */}
          <div style={{
            background: currentUser?.role === 'super_admin'
              ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(236, 72, 153, 0.08))'
              : 'rgba(245, 158, 11, 0.08)',
            border: currentUser?.role === 'super_admin'
              ? '1px solid rgba(168, 85, 247, 0.35)'
              : '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: currentUser?.role === 'super_admin'
                  ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(236, 72, 153, 0.25))'
                  : 'rgba(245, 158, 11, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {currentUser?.role === 'super_admin' ? (
                  <Sparkles size={24} color="#c084fc" />
                ) : (
                  <ShieldCheck size={24} color="var(--accent-amber)" />
                )}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Platform User Directory & Role Governance (RBAC)
                  </h3>
                  <span className={`badge ${currentUser?.role === 'super_admin' ? 'badge-purple' : 'badge-amber'}`} style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem' }}>
                    {currentUser?.role === 'super_admin' ? 'Super Admin Authority Active' : 'Admin Read-Only Directory'}
                  </span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5, maxWidth: '750px' }}>
                  {currentUser?.role === 'super_admin'
                    ? 'Super Administrator Authority: You have complete rights to assign or reassign platform roles (Student, Instructor, Admin, Super Admin). Role changes immediately propagate across Supabase RLS and client capabilities.'
                    : 'Administrator Directory View: Standard administrators can inspect registered user accounts and records. Reassigning staff and administrator roles strictly requires Super Administrator privileges.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Feedback Toast */}
          {actionFeedback && (
            <div style={{
              padding: '0.85rem 1.25rem',
              borderRadius: '0.75rem',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'fadeIn 0.2s ease',
            }}>
              <CheckCircle2 size={16} />
              <span>{actionFeedback}</span>
            </div>
          )}

          {/* Role Metrics Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '0.875rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Registered Users
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
                {profiles.length}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '0.875rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Students
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
                {profiles.filter((p) => p.role === 'student').length}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '0.875rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Instructors (Faculty)
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
                {profiles.filter((p) => p.role === 'instructor').length}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '0.875rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Administrators
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '0.25rem' }}>
                {profiles.filter((p) => p.role === 'admin').length}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '0.875rem', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <span style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Super Admins (Root)
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#d8b4fe', marginTop: '0.25rem' }}>
                {profiles.filter((p) => p.role === 'super_admin').length}
              </div>
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
            <div style={{ position: 'relative', flex: '1 1 260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by name, email, or user ID..."
                value={roleSearchQuery}
                onChange={(e) => setRoleSearchQuery(e.target.value)}
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
                <option value="all">All Roles ({profiles.length})</option>
                <option value="student">Students</option>
                <option value="instructor">Instructors</option>
                <option value="admin">Administrators</option>
                <option value="super_admin">Super Admins</option>
              </select>
            </div>
          </div>

          {/* User Governance Table */}
          <div className="glass-card" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '1rem 1.25rem' }}>User Profile</th>
                    <th style={{ padding: '1rem 1.25rem' }}>Current Role</th>
                    <th style={{ padding: '1rem 1.25rem' }}>Intranet Clearance</th>
                    <th style={{ padding: '1rem 1.25rem' }}>Direct Tutoring</th>
                    <th style={{ padding: '1rem 1.25rem' }}>Role Assignment (RBAC)</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles
                    .filter((p) => {
                      const matchesRole = roleFilter === 'all' || p.role === roleFilter;
                      const matchesSearch = 
                        (p.full_name || '').toLowerCase().includes(roleSearchQuery.toLowerCase()) ||
                        p.email.toLowerCase().includes(roleSearchQuery.toLowerCase()) ||
                        p.id.toLowerCase().includes(roleSearchQuery.toLowerCase());
                      return matchesRole && matchesSearch;
                    })
                    .map((p) => {
                      const canEditThisUser = currentUser?.role === 'super_admin';

                      return (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <img
                                src={p.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                                alt={p.full_name || 'User'}
                                style={{
                                  width: '38px',
                                  height: '38px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  border: '1.5px solid var(--border-subtle)',
                                }}
                              />
                              <div>
                                <div style={{ fontWeight: 700, color: '#ffffff' }}>
                                  {p.full_name || 'Unnamed User'}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                  {p.email}
                                </div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                                  ID: {p.id}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '1rem 1.25rem' }}>
                            <span
                              className={`badge ${
                                p.role === 'super_admin'
                                  ? 'badge-purple'
                                  : p.role === 'admin'
                                  ? 'badge-amber'
                                  : p.role === 'instructor'
                                  ? 'badge-emerald'
                                  : 'badge-primary'
                              }`}
                              style={{
                                fontSize: '0.72rem',
                                padding: '0.2rem 0.55rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                              }}
                            >
                              {p.role === 'super_admin' && <Sparkles size={11} />}
                              {p.role === 'admin' && <ShieldCheck size={11} />}
                              {p.role === 'instructor' && <GraduationCap size={11} />}
                              <span>{p.role.toUpperCase().replace('_', ' ')}</span>
                            </span>
                          </td>

                          <td style={{ padding: '1rem 1.25rem' }}>
                            <span
                              className={`badge ${
                                p.admin_granted || p.role !== 'student'
                                  ? 'badge-emerald'
                                  : p.subscription_status === 'pending_approval'
                                  ? 'badge-amber'
                                  : 'badge-primary'
                              }`}
                              style={{ fontSize: '0.72rem' }}
                            >
                              {p.role !== 'student'
                                ? 'Staff Clearance'
                                : p.admin_granted
                                ? 'Active (Granted)'
                                : p.subscription_status === 'pending_approval'
                                ? 'Pending Review'
                                : 'No Subscription'}
                            </span>
                          </td>

                          <td style={{ padding: '1rem 1.25rem' }}>
                            <span style={{ fontSize: '0.8rem', color: p.tutoring_enrolled ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                              {p.tutoring_enrolled ? (p.tutoring_track_name || 'Enrolled Scholar') : '—'}
                            </span>
                          </td>

                          <td style={{ padding: '1rem 1.25rem' }}>
                            {canEditThisUser ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <select
                                  value={p.role}
                                  onChange={(e) => handleRoleChange(p.id, p.full_name || p.email, e.target.value as UserRole)}
                                  className="form-input"
                                  style={{
                                    padding: '0.4rem 0.65rem',
                                    fontSize: '0.8rem',
                                    borderRadius: '0.5rem',
                                    background: 'var(--bg-surface)',
                                    width: 'auto',
                                    borderColor: p.role === 'super_admin' ? '#c084fc' : undefined,
                                  }}
                                >
                                  <option value="student">Student</option>
                                  <option value="instructor">Instructor</option>
                                  <option value="admin">Administrator</option>
                                  <option value="super_admin">Super Admin</option>
                                </select>
                              </div>
                            ) : (
                              <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                background: 'var(--bg-surface)',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border-subtle)',
                              }}>
                                <Lock size={12} />
                                <span>Super Admin Only</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <>

      {/* Action Feedback Toast */}
      {actionFeedback && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: '0.75rem',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#34d399',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'fadeIn 0.2s ease',
        }}>
          <CheckCircle2 size={16} />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* KPI Stats Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2.5rem',
      }}>
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pending Approvals
            </span>
            <Clock size={18} color="var(--accent-amber)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>
            {pendingCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Requires Bursar verification
          </span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Intranet Scholars
            </span>
            <Users size={18} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
            {activeCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Granted full campus access
          </span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Tuition Logged
            </span>
            <DollarSign size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
            ${totalRevenue.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Active & Pending admissions
          </span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Applications
            </span>
            <ShieldCheck size={18} color="var(--text-muted)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a5b4fc' }}>
            {totalRequests}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            All-time enrollment ledger
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.3rem', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
          {[
            { id: 'all', label: 'All Requests' },
            { id: 'pending_approval', label: `Pending (${pendingCount})` },
            { id: 'active', label: 'Active Fellows' },
            { id: 'rejected', label: 'Declined' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: filterStatus === tab.id ? 'var(--primary)' : 'transparent',
                color: filterStatus === tab.id ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search student or ref..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem', fontSize: '0.85rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className="glass-card" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <th style={{ padding: '1rem 1.25rem' }}>Student Candidate</th>
                <th style={{ padding: '1rem 1.25rem' }}>Tuition Tier</th>
                <th style={{ padding: '1rem 1.25rem' }}>Payment Ref & Method</th>
                <th style={{ padding: '1rem 1.25rem' }}>Submission Date</th>
                <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Registrar Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  {/* Candidate */}
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={req.user_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt={req.user_name}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <span style={{ fontWeight: 700, color: '#ffffff', display: 'block' }}>
                          {req.user_name}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {req.user_email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Plan */}
                  <td style={{ padding: '1.25rem' }}>
                    <span style={{ fontWeight: 600, color: '#ffffff' }}>{req.plan_name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                      ${req.amount_paid} tuition paid
                    </span>
                  </td>

                  {/* Payment Details */}
                  <td style={{ padding: '1.25rem' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#a5b4fc', display: 'block' }}>
                      {req.payment_reference}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                      {req.payment_method.replace('_', ' ')}
                    </span>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '1.25rem', color: 'var(--text-secondary)' }}>
                    {new Date(req.payment_date).toLocaleDateString()}
                    <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {new Date(req.payment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: '1.25rem' }}>
                    {req.status === 'pending_approval' && (
                      <span className="badge badge-amber">
                        Pending Clearance
                      </span>
                    )}
                    {req.status === 'active' && (
                      <span className="badge badge-emerald">
                        ● Intranet Active
                      </span>
                    )}
                    {req.status === 'rejected' && (
                      <span className="badge badge-red" title={req.rejection_reason || ''}>
                        Declined
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                    {req.status === 'pending_approval' && (
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleGrant(req.id, req.user_name)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        >
                          <ShieldCheck size={14} />
                          <span>Grant Access</span>
                        </button>

                        <button
                          onClick={() => handleReject(req.id, req.user_name)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem', color: 'var(--accent-red)' }}
                        >
                          <XCircle size={14} />
                          <span>Decline</span>
                        </button>
                      </div>
                    )}

                    {req.status === 'active' && (
                      <button
                        onClick={() => handleRevoke(req.user_id, req.user_name)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}
                      >
                        <span>Revoke Pass</span>
                      </button>
                    )}

                    {req.status === 'rejected' && (
                      <button
                        onClick={() => handleGrant(req.id, req.user_name)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', color: '#a5b4fc' }}
                      >
                        <RefreshCw size={12} />
                        <span>Re-evaluate & Grant</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRequests.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No access requests matching current filters.
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
    </AccessGuard>
  );
}
