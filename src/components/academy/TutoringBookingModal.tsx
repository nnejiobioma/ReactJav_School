'use client';

import React, { useEffect } from 'react';
import { AcademyTrack, ACADEMY_TRACKS } from '@/data/academyTracks';
import DirectTutoringEnrollmentForm from '@/components/academy/DirectTutoringEnrollmentForm';
import { X, Sparkles } from 'lucide-react';

interface TutoringBookingModalProps {
  initialTrack: AcademyTrack | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TutoringBookingModal({ initialTrack, isOpen, onClose }: TutoringBookingModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease-out forwards',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1.5rem',
          boxShadow: 'var(--shadow-lg)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface-elevated)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                1-on-1 Direct Tutoring
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                ReactJav Academy
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Direct Tutoring Academic Enrolment
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '0.5rem',
            }}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Content */}
        <div style={{ padding: '1.75rem 2rem' }}>
          <DirectTutoringEnrollmentForm
            initialTrackId={initialTrack?.id}
            isModal={true}
            onCloseModal={onClose}
          />
        </div>
      </div>
    </div>
  );
}
