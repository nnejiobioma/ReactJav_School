'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Eye, Pencil, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';
import { LocalDataService } from '@/lib/supabase/client';

export default function AdminEditModeBar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setIsAdmin(user?.role === 'admin' || user?.role === 'super_admin');
    setIsEditMode(LocalDataService.isEditModeActive());

    const handleUserChange = () => {
      const u = LocalDataService.getCurrentUser();
      setIsAdmin(u?.role === 'admin' || u?.role === 'super_admin');
    };

    const handleEditModeToggle = (e: any) => {
      if (e.detail && typeof e.detail.active === 'boolean') {
        setIsEditMode(e.detail.active);
      }
    };

    window.addEventListener('storage', handleUserChange);
    window.addEventListener('reactjav-edit-mode-toggled', handleEditModeToggle);

    return () => {
      window.removeEventListener('storage', handleUserChange);
      window.removeEventListener('reactjav-edit-mode-toggled', handleEditModeToggle);
    };
  }, []);

  if (!isAdmin) return null;

  const toggleEditMode = () => {
    const next = !isEditMode;
    setIsEditMode(next);
    LocalDataService.setEditModeActive(next);
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset ALL site copy back to original factory defaults? This cannot be undone.')) {
      LocalDataService.resetAllSiteContent();
      alert('All site copy has been restored to default.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: isCollapsed ? '0.45rem 0.85rem' : '0.65rem 1rem',
          borderRadius: '9999px',
          background: 'rgba(15, 23, 42, 0.92)',
          border: '1px solid rgba(99, 102, 241, 0.45)',
          boxShadow: '0 10px 30px -4px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.3)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'all 0.25s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isEditMode ? '#10b981' : '#f59e0b',
              boxShadow: isEditMode ? '0 0 8px #10b981' : 'none',
            }}
          />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em' }}>
            Admin {isEditMode ? 'Edit Mode' : 'Clean Preview'}
          </span>
        </div>

        {!isCollapsed && (
          <>
            <div style={{ width: '1px', height: '18px', background: 'rgba(255, 255, 255, 0.15)' }} />

            {/* Toggle Button */}
            <button
              onClick={toggleEditMode}
              className="btn btn-sm"
              style={{
                padding: '0.28rem 0.7rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: '9999px',
                background: isEditMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                border: isEditMode ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.2)',
                color: isEditMode ? '#a5b4fc' : 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer',
              }}
              title={isEditMode ? 'Switch to visitor clean preview mode' : 'Switch to admin in-place edit mode'}
            >
              {isEditMode ? <Eye size={12} /> : <Pencil size={12} />}
              <span>{isEditMode ? 'Hide Edit Buttons' : 'Show Edit Buttons'}</span>
            </button>

            {/* Reset All Button */}
            <button
              onClick={handleResetAll}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.15s ease',
              }}
              title="Reset all site sections to default factory copy"
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <RotateCcw size={13} />
            </button>
          </>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.2rem',
            display: 'flex',
            alignItems: 'center',
          }}
          title={isCollapsed ? 'Expand Admin Bar' : 'Collapse Admin Bar'}
        >
          {isCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </div>
  );
}
