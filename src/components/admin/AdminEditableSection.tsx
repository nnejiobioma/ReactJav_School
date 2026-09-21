'use client';

import React, { useState, useEffect } from 'react';
import { Pencil, Sparkles } from 'lucide-react';
import { LocalDataService } from '@/lib/supabase/client';

interface AdminEditableSectionProps {
  sectionKey: string;
  sectionTitle: string;
  onEdit: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdminEditableSection({
  sectionKey,
  sectionTitle,
  onEdit,
  children,
  style,
  className,
}: AdminEditableSectionProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
      } else {
        setIsEditMode(LocalDataService.isEditModeActive());
      }
    };

    window.addEventListener('storage', handleUserChange);
    window.addEventListener('reactjav-edit-mode-toggled', handleEditModeToggle);

    return () => {
      window.removeEventListener('storage', handleUserChange);
      window.removeEventListener('reactjav-edit-mode-toggled', handleEditModeToggle);
    };
  }, []);

  const showEditControls = isAdmin && isEditMode;

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1rem',
        outline: showEditControls && isHovered ? '2px dashed rgba(99, 102, 241, 0.65)' : 'none',
        outlineOffset: '6px',
        transition: 'outline 0.2s ease',
        ...style,
      }}
    >
      {/* Floating Admin Edit Button */}
      {showEditControls && (
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            className="btn btn-sm"
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 16px -2px rgba(79, 70, 229, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.15)',
              padding: '0.35rem 0.75rem',
              fontSize: '0.765rem',
              fontWeight: 700,
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              backdropFilter: 'blur(8px)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 6px 20px -2px rgba(79, 70, 229, 0.75)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px -2px rgba(79, 70, 229, 0.55)';
            }}
            title={`Click to edit ${sectionTitle}`}
          >
            <Pencil size={12} color="#ffffff" />
            <span>Edit Section: {sectionTitle}</span>
          </button>
        </div>
      )}

      {children}
    </div>
  );
}
