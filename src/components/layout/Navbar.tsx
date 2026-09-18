'use client';

import React, { useState, useEffect } from 'react';
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
  Sun,
  Moon,
  Terminal
} from 'lucide-react';
import ThemeSelector from '@/components/theme/ThemeSelector';
import { Profile, UserRole } from '@/types';
import { LocalDataService, isSupabaseConfigured } from '@/lib/supabase/client';

export default function Navbar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [hasSupabase, setHasSupabase] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  useEffect(() => {
    setCurrentUser(LocalDataService.getCurrentUser());
    setHasSupabase(isSupabaseConfigured());
  }, []);

  const handleRoleSwitch = (role: UserRole) => {
    const updated = LocalDataService.switchDemoRole(role);
    setCurrentUser(updated);
    setShowRoleMenu(false);
    // Notify window for instant component reaction
    window.dispatchEvent(new Event('storage'));
  };

  const roleBadgeStyle = {
    student: 'badge-primary',
    instructor: 'badge-emerald',
    admin: 'badge-amber',
  }[currentUser?.role || 'student'];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1680px',
        margin: '0 auto',
        padding: '0 clamp(1.25rem, 3.5vw, 3rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--header-height, 5.5rem)',
        gap: '1.25rem',
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          textDecoration: 'none',
          flexShrink: 0,
        }}>
          <div style={{
            width: '3.1rem',
            height: '3.1rem',
            borderRadius: '0.85rem',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px -2px rgba(79, 70, 229, 0.35)',
            transition: 'transform 0.2s ease',
          }}>
            <GraduationCap size={26} color="#ffffff" />
          </div>
          <span style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            lineHeight: 1,
            display: 'inline-block',
          }}>
            React<span className="text-gradient">Jav</span>
          </span>
        </Link>

        {/* Center Nav Links: Partitioned Catalog vs. Campus Intranet */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          {/* Section 1: Public Catalog */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'var(--bg-surface)',
            padding: '0.3rem 0.45rem',
            borderRadius: '0.85rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <Link
              href="/courses"
              className="btn btn-sm"
              style={{
                background: (pathname === '/' || pathname.startsWith('/courses')) ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
                color: (pathname === '/' || pathname.startsWith('/courses')) ? 'var(--primary)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                padding: '0.45rem 0.8rem',
                fontWeight: 600,
                borderRadius: '0.65rem',
                gap: '0.45rem',
              }}
            >
              <BookOpen size={16} />
              <span>Programmes</span>
            </Link>

            <Link
              href="/subscribe"
              className="btn btn-sm"
              style={{
                background: pathname === '/subscribe' ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
                color: pathname === '/subscribe' ? 'var(--primary)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                padding: '0.45rem 0.8rem',
                fontWeight: 600,
                borderRadius: '0.65rem',
                gap: '0.45rem',
              }}
            >
              <Sparkles size={16} color="var(--primary)" />
              <span>Tuition & Plans</span>
            </Link>

            <Link
              href="/academy"
              className="btn btn-sm"
              style={{
                background: (pathname.startsWith('/academy') || pathname.startsWith('/tutoring')) ? 'rgba(16, 185, 129, 0.14)' : 'transparent',
                color: (pathname.startsWith('/academy') || pathname.startsWith('/tutoring')) ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                padding: '0.45rem 0.8rem',
                fontWeight: 600,
                borderRadius: '0.65rem',
                gap: '0.45rem',
              }}
            >
              <GraduationCap size={16} color="var(--accent-emerald)" />
              <span>Direct Tutoring</span>
            </Link>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'var(--border-subtle)', margin: '0 0.35rem' }} />

          {/* Section 2: Campus Intranet (Gated) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: pathname.startsWith('/intranet') || pathname.startsWith('/cbt') || pathname.startsWith('/live') || pathname.startsWith('/dashboard') 
              ? 'rgba(79, 70, 229, 0.08)' 
              : 'var(--bg-surface)',
            padding: '0.3rem 0.45rem',
            borderRadius: '0.85rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <Link
              href="/intranet"
              className="btn btn-sm"
              style={{
                background: pathname === '/intranet' ? 'rgba(79, 70, 229, 0.16)' : 'transparent',
                color: pathname === '/intranet' ? 'var(--primary)' : 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                padding: '0.45rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: '0.65rem',
              }}
            >
              <ShieldCheck size={16} color={currentUser?.admin_granted || currentUser?.tutoring_enrolled || currentUser?.role !== 'student' ? 'var(--accent-emerald)' : 'var(--accent-amber)'} />
              <span>Campus Intranet</span>
              {currentUser?.role === 'student' && !currentUser?.admin_granted && !currentUser?.tutoring_enrolled && (
                <span className="badge badge-amber" style={{ fontSize: '0.625rem', padding: '0.1rem 0.35rem' }}>
                  {currentUser?.subscription_status === 'pending_approval' ? 'Pending' : 'Lock'}
                </span>
              )}
              {currentUser?.tutoring_enrolled && (
                <span className="badge badge-emerald" style={{ fontSize: '0.625rem', padding: '0.1rem 0.35rem' }}>
                  Tutoring
                </span>
              )}
            </Link>

            <Link
              href="/cbt"
              className="btn btn-sm"
              style={{
                background: pathname.startsWith('/cbt') ? 'rgba(217, 119, 6, 0.12)' : 'transparent',
                color: pathname.startsWith('/cbt') ? 'var(--accent-amber)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                padding: '0.45rem 0.75rem',
                fontWeight: 600,
                borderRadius: '0.65rem',
                gap: '0.45rem',
              }}
            >
              <Timer size={16} color="var(--accent-amber)" />
              <span>CBT</span>
            </Link>

            <Link
              href="/live"
              className="btn btn-sm"
              style={{
                background: pathname.startsWith('/live') ? 'rgba(219, 39, 119, 0.12)' : 'transparent',
                color: pathname.startsWith('/live') ? 'var(--accent-pink)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                padding: '0.45rem 0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontWeight: 600,
                borderRadius: '0.65rem',
              }}
            >
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--accent-pink)',
                boxShadow: '0 0 8px var(--accent-pink)',
                display: 'inline-block',
              }} />
              <span>Live Rooms</span>
            </Link>

            <Link
              href="/intranet/ide"
              className="btn btn-sm"
              style={{
                background: pathname.startsWith('/intranet/ide') ? 'rgba(16, 185, 129, 0.16)' : 'transparent',
                color: pathname.startsWith('/intranet/ide') ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                padding: '0.45rem 0.75rem',
                fontWeight: 600,
                borderRadius: '0.65rem',
                gap: '0.45rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Terminal size={16} color="var(--accent-emerald)" />
              <span>IDE Sandbox</span>
            </Link>

            <Link
              href="/dashboard"
              className="btn btn-sm"
              style={{
                background: pathname.startsWith('/dashboard') ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
                color: pathname.startsWith('/dashboard') ? 'var(--primary)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                padding: '0.45rem 0.75rem',
                fontWeight: 600,
                borderRadius: '0.65rem',
                gap: '0.45rem',
              }}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </Link>

            {/* Admin Clearance Desk Shortcut */}
            {(currentUser?.role === 'admin' || currentUser?.role === 'instructor') && (
              <Link
                href="/admin/access"
                className="btn btn-sm"
                style={{
                  background: pathname.startsWith('/admin/access') ? 'rgba(217, 119, 6, 0.18)' : 'rgba(217, 119, 6, 0.08)',
                  color: 'var(--accent-amber)',
                  fontSize: '0.85rem',
                  padding: '0.45rem 0.8rem',
                  border: '1px solid rgba(217, 119, 6, 0.25)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  borderRadius: '0.65rem',
                }}
              >
                <UserCheck size={16} />
                <span>Clearance Desk</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Right Actions: Supabase Status, Theme Toggle & Role Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          flexShrink: 0,
        }}>
          {/* Theme Mode Selector (Light / Dark / System) */}
          <ThemeSelector />

          {/* Supabase Status Pill */}
          <div 
            title={hasSupabase ? 'Connected to live Supabase project' : 'Running in Local Demo Mode (Configure .env.local to link live Supabase)'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 0.95rem',
              background: 'var(--bg-surface)',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: hasSupabase ? 'var(--accent-emerald)' : 'var(--primary)',
            }}
          >
            <Database size={15} />
            <span>{hasSupabase ? 'Supabase Live' : 'Supabase Demo'}</span>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: hasSupabase ? 'var(--accent-emerald)' : 'var(--primary)',
              boxShadow: hasSupabase ? '0 0 8px var(--accent-emerald)' : '0 0 8px var(--primary)',
            }} />
          </div>

          {/* User Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '0.85rem',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <img
                src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={currentUser?.full_name || 'User'}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid var(--border-subtle)',
                }}
              />
              <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 600, display: 'block', color: 'var(--text-primary)' }}>
                  {currentUser?.full_name?.split(' ')[0] || 'Demo User'}
                </span>
                <span className={`badge ${roleBadgeStyle}`} style={{ fontSize: '0.625rem', padding: '0.1rem 0.4rem' }}>
                  {currentUser?.role || 'student'}
                </span>
              </div>
              <ChevronDown size={15} color="var(--text-muted)" />
            </button>

            {/* Dropdown Menu */}
            {showRoleMenu && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '220px',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: '0.875rem',
                  padding: '0.5rem',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 200,
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                <div style={{
                  padding: '0.5rem 0.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '0.4rem',
                }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Simulate RBAC Role
                  </p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {currentUser?.email}
                  </p>
                  {/* Intranet Clearance Pill */}
                  <div style={{
                    marginTop: '0.4rem',
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

                <button
                  onClick={() => handleRoleSwitch('student')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    background: currentUser?.role === 'student' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    color: currentUser?.role === 'student' ? '#a5b4fc' : 'var(--text-primary)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                  }}
                >
                  <UserCheck size={16} />
                  <span>Student Persona</span>
                </button>

                <button
                  onClick={() => handleRoleSwitch('instructor')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    background: currentUser?.role === 'instructor' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                    color: currentUser?.role === 'instructor' ? '#6ee7b7' : 'var(--text-primary)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                  }}
                >
                  <Sparkles size={16} />
                  <span>Instructor Persona</span>
                </button>

                <button
                  onClick={() => handleRoleSwitch('admin')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    background: currentUser?.role === 'admin' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                    color: currentUser?.role === 'admin' ? '#fcd34d' : 'var(--text-primary)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Admin Persona</span>
                </button>

                <div style={{
                  borderTop: '1px solid var(--border-subtle)',
                  marginTop: '0.4rem',
                  paddingTop: '0.4rem',
                }}>
                  <Link
                    href="/auth"
                    onClick={() => setShowRoleMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.825rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      borderRadius: '0.5rem',
                    }}
                  >
                    <Settings size={14} />
                    <span>Supabase Auth Portal</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
