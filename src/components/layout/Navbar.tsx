'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Sparkles,
  Database,
  UserCheck,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Settings,
  Timer,
  Video,
  Terminal,
  CalendarCheck,
  Menu,
  X,
  ExternalLink,
  KeyRound
} from 'lucide-react';
import ThemeSelector from '@/components/theme/ThemeSelector';
import { Profile, UserRole } from '@/types';
import { LocalDataService, isSupabaseConfigured } from '@/lib/supabase/client';
import { signOutUser } from '@/lib/supabase/auth';

export default function Navbar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [hasSupabase, setHasSupabase] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showIntranetMenu, setShowIntranetMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const intranetMenuRef = useRef<HTMLDivElement>(null);

  const loadUserData = () => {
    setCurrentUser(LocalDataService.getCurrentUser());
    setHasSupabase(isSupabaseConfigured());
  };

  useEffect(() => {
    loadUserData();

    const handleStorage = () => {
      loadUserData();
    };
    window.addEventListener('storage', handleStorage);

    // Click outside listener for dropdown menus
    const handleClickOutside = (e: MouseEvent) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setShowRoleMenu(false);
      }
      if (intranetMenuRef.current && !intranetMenuRef.current.contains(e.target as Node)) {
        setShowIntranetMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setShowRoleMenu(false);
    setShowIntranetMenu(false);
    setMobileMenuOpen(false);
  }, [pathname]);


  const roleBadgeStyle = {
    student: 'badge-primary',
    instructor: 'badge-emerald',
    admin: 'badge-amber',
    super_admin: 'badge-purple',
  }[currentUser?.role || 'student'] || 'badge-primary';

  const isIntranetActive =
    pathname.startsWith('/intranet') ||
    pathname.startsWith('/cbt') ||
    pathname.startsWith('/live') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/tutoring/attendance') ||
    pathname.startsWith('/admin/super') ||
    pathname.startsWith('/admin/access');

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      width: '100%',
    }}>
      {/* Centered 3-Column Header Grid */}
      <div className="header-grid-container">
        {/* ================= COLUMN 1: BRAND LOGO ================= */}
        <div className="header-logo-container">
          <Link
            href="/"
            className="header-logo-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            {/*<div className="header-logo-icon">
              <GraduationCap size={56} color="#ffffff" />
            </div>*/}
            <span className="header-logo-text">
              React<span className="text-gradient">Jav</span>
            </span>
          </Link>
        </div>

        {/* ================= COLUMN 2: CENTERED PRIMARY NAVIGATION ================= */}
        <nav
          className="header-desktop-nav"
          style={{
            justifySelf: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {/* Main Academic & Curriculum Pill Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'var(--bg-surface)',
            padding: '0.38rem 0.55rem',
            borderRadius: '0.95rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <Link
              href="/courses"
              className="btn btn-sm"
              style={{
                background: (pathname === '/' || pathname.startsWith('/courses')) ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
                color: (pathname === '/' || pathname.startsWith('/courses')) ? 'var(--primary)' : 'var(--text-secondary)',
                fontSize: '0.86rem',
                padding: '0.52rem 0.85rem',
                fontWeight: 600,
                borderRadius: '0.75rem',
                gap: '0.45rem',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <BookOpen size={16} />
              <span>Programmes</span>
            </Link>

            <Link
              href="/academy"
              className="btn btn-sm"
              style={{
                background: (pathname.startsWith('/academy') || pathname.startsWith('/tutoring')) ? 'rgba(16, 185, 129, 0.14)' : 'transparent',
                color: (pathname.startsWith('/academy') || pathname.startsWith('/tutoring')) ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                fontSize: '0.86rem',
                padding: '0.52rem 0.85rem',
                fontWeight: 600,
                borderRadius: '0.75rem',
                gap: '0.45rem',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <GraduationCap size={16} color="var(--accent-emerald)" />
              <span>Direct Tutoring</span>
              <span className="badge badge-emerald" style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem' }}>
                1-on-1
              </span>
            </Link>

            <Link
              href="/subscribe"
              className="btn btn-sm"
              style={{
                background: pathname === '/subscribe' ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
                color: pathname === '/subscribe' ? 'var(--primary)' : 'var(--text-secondary)',
                fontSize: '0.86rem',
                padding: '0.52rem 0.85rem',
                fontWeight: 600,
                borderRadius: '0.75rem',
                gap: '0.45rem',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <Sparkles size={16} color="var(--primary)" />
              <span>Tuition & Plans</span>
            </Link>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'var(--border-subtle)', margin: '0 0.25rem' }} />

          {/* Collapsed Campus Intranet Dropdown */}
          <div ref={intranetMenuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowIntranetMenu(!showIntranetMenu)}
              className="btn btn-sm"
              style={{
                background: isIntranetActive ? 'rgba(79, 70, 229, 0.16)' : 'var(--bg-surface)',
                color: isIntranetActive ? 'var(--primary)' : 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.86rem',
                padding: '0.52rem 0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: '0.85rem',
                border: isIntranetActive ? '1px solid rgba(79, 70, 229, 0.35)' : '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
              }}
              title="Campus Intranet Portal & Resources"
            >
              <ShieldCheck size={17} color={currentUser?.admin_granted || currentUser?.tutoring_enrolled || currentUser?.role !== 'student' ? 'var(--accent-emerald)' : 'var(--accent-amber)'} />
              <span>Campus Intranet</span>
              <ChevronDown
                size={14}
                color="var(--text-muted)"
                style={{
                  transform: showIntranetMenu ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease'
                }}
              />
            </button>

            {showIntranetMenu && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.6rem)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '320px',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-accent)',
                borderRadius: '0.95rem',
                padding: '0.6rem',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 250,
                animation: 'fadeIn 0.15s ease',
              }}>
                <div style={{
                  padding: '0.4rem 0.75rem 0.5rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '0.35rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Campus Intranet Portal
                  </span>
                  <span className={currentUser?.admin_granted || currentUser?.tutoring_enrolled || currentUser?.role !== 'student' ? 'badge badge-emerald' : 'badge badge-amber'} style={{ fontSize: '0.62rem', padding: '0.08rem 0.35rem' }}>
                    {currentUser?.admin_granted || currentUser?.tutoring_enrolled || currentUser?.role !== 'student' ? 'Clearance Active' : 'Restricted'}
                  </span>
                </div>

                <Link
                  href="/intranet"
                  onClick={() => setShowIntranetMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '0.55rem',
                    color: pathname === '/intranet' ? 'var(--primary)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    background: pathname === '/intranet' ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
                    marginBottom: '0.15rem',
                  }}
                >
                  <ShieldCheck size={18} color="var(--primary)" />
                  <div>
                    <span style={{ display: 'block', fontWeight: 700 }}>Intranet Home</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Official campus news, bulletins & clearance</span>
                  </div>
                </Link>

                <Link
                  href="/dashboard"
                  onClick={() => setShowIntranetMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '0.55rem',
                    color: pathname.startsWith('/dashboard') ? 'var(--primary)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    background: pathname.startsWith('/dashboard') ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
                    marginBottom: '0.15rem',
                  }}
                >
                  <LayoutDashboard size={18} color="var(--primary)" />
                  <div>
                    <span style={{ display: 'block', fontWeight: 700 }}>Student Dashboard</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Enrolled courses, stats & study records</span>
                  </div>
                </Link>

                <Link
                  href="/intranet/ide"
                  onClick={() => setShowIntranetMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '0.55rem',
                    color: pathname.startsWith('/intranet/ide') ? 'var(--accent-emerald)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    background: pathname.startsWith('/intranet/ide') ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                    marginBottom: '0.15rem',
                  }}
                >
                  <Terminal size={18} color="var(--accent-emerald)" />
                  <div>
                    <span style={{ display: 'block', fontWeight: 700 }}>IDE Sandbox</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Browser code execution & engineering pods</span>
                  </div>
                </Link>

                <Link
                  href="/cbt"
                  onClick={() => setShowIntranetMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '0.55rem',
                    color: pathname.startsWith('/cbt') ? 'var(--accent-amber)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    background: pathname.startsWith('/cbt') ? 'rgba(217, 119, 6, 0.12)' : 'transparent',
                    marginBottom: '0.15rem',
                  }}
                >
                  <Timer size={18} color="var(--accent-amber)" />
                  <div>
                    <span style={{ display: 'block', fontWeight: 700 }}>CBT Examination Hub</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Timed proctored tests & certifications</span>
                  </div>
                </Link>

                <Link
                  href="/live"
                  onClick={() => setShowIntranetMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '0.55rem',
                    color: pathname.startsWith('/live') ? 'var(--accent-pink)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    background: pathname.startsWith('/live') ? 'rgba(219, 39, 119, 0.12)' : 'transparent',
                    marginBottom: '0.15rem',
                  }}
                >
                  <Video size={18} color="var(--accent-pink)" />
                  <div>
                    <span style={{ display: 'block', fontWeight: 700 }}>Live Audio/Video Studio</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Real-time voice & screen share rooms</span>
                  </div>
                </Link>

                <Link
                  href="/tutoring/attendance"
                  onClick={() => setShowIntranetMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '0.55rem',
                    color: pathname.startsWith('/tutoring/attendance') ? 'var(--accent-emerald)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    background: pathname.startsWith('/tutoring/attendance') ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                    marginBottom: '0.15rem',
                  }}
                >
                  <CalendarCheck size={18} color="var(--accent-emerald)" />
                  <div>
                    <span style={{ display: 'block', fontWeight: 700 }}>Tutoring Attendance Tracker</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Dual-signoff monthly audit ledger</span>
                  </div>
                </Link>

                {(currentUser?.role === 'admin' || currentUser?.role === 'super_admin' || currentUser?.role === 'instructor') && (
                  <Link
                    href="/admin/access"
                    onClick={() => setShowIntranetMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '0.55rem',
                      color: pathname.startsWith('/admin/access') ? 'var(--accent-amber)' : 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      borderTop: '1px solid var(--border-subtle)',
                      marginTop: '0.25rem',
                      paddingTop: '0.55rem',
                      background: pathname.startsWith('/admin/access') ? 'rgba(217, 119, 6, 0.12)' : 'transparent',
                    }}
                  >
                    <UserCheck size={18} color="var(--accent-amber)" />
                    <div>
                      <span style={{ display: 'block', fontWeight: 700 }}>Registrar Clearance Desk</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tuition verification & admissions</span>
                    </div>
                  </Link>
                )}

                {currentUser?.role === 'super_admin' && (
                  <Link
                    href="/admin/super"
                    onClick={() => setShowIntranetMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '0.55rem',
                      color: '#d8b4fe',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      borderTop: '1px solid rgba(168, 85, 247, 0.25)',
                      marginTop: '0.25rem',
                      paddingTop: '0.55rem',
                      background: pathname.startsWith('/admin/super') ? 'rgba(168, 85, 247, 0.16)' : 'transparent',
                    }}
                  >
                    <Sparkles size={18} color="#c084fc" />
                    <div>
                      <span style={{ display: 'block', fontWeight: 700 }}>Super Admin Access Control</span>
                      <span style={{ fontSize: '0.72rem', color: '#c084fc' }}>Assign roles & user permissions</span>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* ================= COLUMN 3: RIGHT ACTIONS & PROMINENT LOGIN SECTION ================= */}
        <div style={{
          justifySelf: 'end',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          flexShrink: 0,
        }}>
          {/* 1. Supabase Status Indicator (Compact) */}
          <div
            className="header-db-pill"
            title={hasSupabase ? 'Supabase Live: Connected to PostgreSQL & Auth' : 'Supabase Demo Mock: Operating with local storage persistence'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.42rem 0.65rem',
              background: 'var(--bg-surface)',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.76rem',
              fontWeight: 600,
              color: hasSupabase ? 'var(--accent-emerald)' : 'var(--text-muted)',
              cursor: 'default',
            }}
          >
            <Database size={14} color={hasSupabase ? 'var(--accent-emerald)' : 'var(--primary)'} />
            <span className="db-text" style={{ fontSize: '0.74rem' }}>{hasSupabase ? 'Live DB' : 'Demo DB'}</span>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: hasSupabase ? 'var(--accent-emerald)' : 'var(--primary)',
              boxShadow: hasSupabase ? '0 0 6px var(--accent-emerald)' : '0 0 6px var(--primary)',
            }} />
          </div>

          {/* 2. Theme Toggle */}
          <ThemeSelector />

          {/* 3. ACTIVE USER PROFILE & PERSONA SWITCHER */}
          {currentUser && currentUser.id !== 'guest' ? (
            <div ref={roleMenuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="btn btn-secondary btn-sm header-persona-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.42rem 0.85rem',
                  borderRadius: '0.95rem',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  cursor: 'pointer',
                }}
                title="Current Session Profile • Click to switch role"
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser?.full_name || 'User'}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid var(--border-subtle)',
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    bottom: '-1px',
                    right: '-1px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#10b981',
                    border: '1.5px solid var(--bg-surface)',
                  }} />
                </div>
                <div className="header-persona-details" style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <span className="header-persona-name" style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', color: 'var(--text-primary)' }}>
                    {currentUser?.full_name?.split(' ')[0] || 'Demo User'}
                  </span>
                  <span className={`badge ${roleBadgeStyle} header-persona-badge`} style={{ fontSize: '0.6rem', padding: '0.08rem 0.35rem' }}>
                    {currentUser?.role || 'student'}
                  </span>
                </div>
                <span className="header-persona-chevron">
                  <ChevronDown size={14} color="var(--text-muted)" style={{ transform: showRoleMenu ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </span>
              </button>

            {/* Dropdown Menu */}
            {showRoleMenu && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 0.6rem)',
                  width: '240px',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: '0.875rem',
                  padding: '0.5rem',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 250,
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                <div style={{
                  padding: '0.5rem 0.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '0.4rem',
                }}>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                    Active Persona Session
                  </p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem', marginBottom: '0.35rem' }}>
                    {currentUser?.full_name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {currentUser?.email}
                  </p>

                  {/* Intranet Clearance Pill */}
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.4rem',
                    background: currentUser?.tutoring_enrolled || currentUser?.admin_granted || currentUser?.role !== 'student'
                      ? 'rgba(16, 185, 129, 0.15)'
                      : currentUser?.subscription_status === 'pending_approval'
                        ? 'rgba(245, 158, 11, 0.15)'
                        : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>Intranet:</span>
                    <span style={{
                      fontWeight: 600,
                      color: currentUser?.tutoring_enrolled || currentUser?.admin_granted || currentUser?.role !== 'student'
                        ? '#34d399'
                        : currentUser?.subscription_status === 'pending_approval'
                          ? '#fbbf24'
                          : 'var(--text-secondary)'
                    }}>
                      {currentUser?.tutoring_enrolled
                        ? 'Tutoring Scholar (Active)'
                        : currentUser?.role !== 'student'
                          ? 'Faculty Access'
                          : currentUser?.admin_granted
                            ? 'Granted & Active'
                            : currentUser?.subscription_status === 'pending_approval'
                              ? 'Awaiting Clearance'
                              : 'Not Subscribed'}
                    </span>
                  </div>
                </div>


                <div style={{
                  borderTop: '1px solid var(--border-subtle)',
                  marginTop: '0.4rem',
                  paddingTop: '0.4rem',
                }}>
                  {currentUser?.role === 'super_admin' && (
                    <Link
                      href="/admin/super"
                      onClick={() => setShowRoleMenu(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.45rem 0.75rem',
                        fontSize: '0.825rem',
                        color: '#d8b4fe',
                        textDecoration: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: 600,
                        background: 'rgba(168, 85, 247, 0.12)',
                        marginBottom: '0.3rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <Sparkles size={14} color="#c084fc" />
                        <span>Super Admin Access</span>
                      </div>
                      <ExternalLink size={12} />
                    </Link>
                  )}

                  {(currentUser?.role === 'admin' || currentUser?.role === 'super_admin') && (
                    <Link
                      href="/admin/access"
                      onClick={() => setShowRoleMenu(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.45rem 0.75rem',
                        fontSize: '0.825rem',
                        color: 'var(--accent-amber)',
                        textDecoration: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: 600,
                        marginBottom: '0.3rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <UserCheck size={14} />
                        <span>Registrar Clearance Desk</span>
                      </div>
                      <ExternalLink size={12} />
                    </Link>
                  )}

                  <Link
                    href="/auth"
                    onClick={() => setShowRoleMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.825rem',
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: 600,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Settings size={14} />
                      <span>Full Auth & Login Portal</span>
                    </div>
                    <ExternalLink size={12} />
                  </Link>

                  <button
                    onClick={async () => {
                      await signOutUser();
                      setCurrentUser(null);
                      setShowRoleMenu(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      background: 'transparent',
                      color: '#f87171',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      textAlign: 'left',
                      fontWeight: 600,
                      marginTop: '0.2rem',
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          ) : (
            <Link
              href="/auth"
              className="btn btn-primary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '0.85rem',
                fontSize: '0.84rem',
                fontWeight: 600,
              }}
            >
              <KeyRound size={15} />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="header-mobile-toggle"
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              borderRadius: '0.5rem',
              padding: '0.45rem',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.25rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          boxShadow: 'var(--shadow-lg)',
          maxHeight: 'calc(100dvh - 5.5rem)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          {/* Mobile User Profile & Persona Card */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-accent)',
            borderRadius: '1rem',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            {currentUser && currentUser.id !== 'guest' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={currentUser?.full_name || 'User'}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1.5px solid var(--border-subtle)',
                      }}
                    />
                    <div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', lineHeight: 1.2 }}>
                        {currentUser?.full_name || 'User'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {currentUser?.email}
                      </span>
                    </div>
                  </div>
                  <span className={`badge ${roleBadgeStyle}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                    {currentUser?.role || 'student'}
                  </span>
                </div>

                <button
                  onClick={async () => {
                    await signOutUser();
                    setCurrentUser(null);
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#f87171', justifyContent: 'center', gap: '0.5rem', marginTop: '0.25rem' }}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  Sign in to access your course progress and campus intranet.
                </p>
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <KeyRound size={15} />
                  <span>Sign In / Register</span>
                </Link>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Academic Offerings
            </span>
            <Link href="/courses" className="btn btn-secondary btn-sm touch-target" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
              <BookOpen size={17} /> Programmes
            </Link>
            <Link href="/academy" className="btn btn-secondary btn-sm touch-target" style={{ justifyContent: 'flex-start', gap: '0.6rem', color: 'var(--accent-emerald)' }}>
              <GraduationCap size={17} /> Direct Tutoring (1-on-1)
            </Link>
            <Link href="/subscribe" className="btn btn-secondary btn-sm touch-target" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
              <Sparkles size={17} /> Tuition & Plans
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Campus Intranet & Tools
            </span>
            <Link href="/intranet" className="btn btn-secondary btn-sm touch-target" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
              <ShieldCheck size={17} /> Campus Intranet
            </Link>
            <Link href="/dashboard" className="btn btn-secondary btn-sm touch-target" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
              <LayoutDashboard size={17} /> Student Dashboard
            </Link>
            <Link href="/intranet/ide" className="btn btn-secondary btn-sm touch-target" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
              <Terminal size={17} /> IDE Sandbox
            </Link>
            <Link href="/cbt" className="btn btn-secondary btn-sm touch-target" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
              <Timer size={17} /> CBT Exams
            </Link>
            <Link href="/live" className="btn btn-secondary btn-sm touch-target" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
              <Video size={17} /> Live Studios
            </Link>
            <Link href="/tutoring/attendance" className="btn btn-secondary btn-sm touch-target" style={{ justifyContent: 'flex-start', gap: '0.6rem', color: 'var(--accent-emerald)' }}>
              <CalendarCheck size={17} /> Tutoring Attendance Tracker
            </Link>
          </div>

          {(currentUser?.role === 'super_admin' || currentUser?.role === 'admin') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Campus Administration
              </span>
              {currentUser?.role === 'super_admin' && (
                <Link
                  href="/admin/super"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary btn-sm touch-target"
                  style={{ justifyContent: 'flex-start', gap: '0.6rem', color: '#d8b4fe', background: 'rgba(168, 85, 247, 0.12)' }}
                >
                  <Sparkles size={17} color="#c084fc" /> Super Admin Access Control
                </Link>
              )}
              <Link
                href="/admin/access"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary btn-sm touch-target"
                style={{ justifyContent: 'flex-start', gap: '0.6rem', color: 'var(--accent-amber)' }}
              >
                <UserCheck size={17} /> Registrar Clearance Desk
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
