'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AcademyTrack, ACADEMY_TRACKS, TUTORING_WHATSAPP_NUMBER } from '@/data/academyTracks';
import { LocalDataService } from '@/lib/supabase/client';
import { 
  X, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  LayoutDashboard,
  CreditCard 
} from 'lucide-react';

interface TutoringBookingModalProps {
  initialTrack: AcademyTrack | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TutoringBookingModal({ initialTrack, isOpen, onClose }: TutoringBookingModalProps) {
  const router = useRouter();
  const [selectedTrackId, setSelectedTrackId] = useState<string>(initialTrack?.id || ACADEMY_TRACKS[0].id);
  const [learnerName, setLearnerName] = useState('');
  const [parentName, setParentName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [ageTier, setAgeTier] = useState('Ages 10–14');
  const [frequency, setFrequency] = useState('2x per week (Recommended)');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialTrack) {
      setSelectedTrackId(initialTrack.id);
    }
  }, [initialTrack]);

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

  const currentTrack = ACADEMY_TRACKS.find(t => t.id === selectedTrackId) || ACADEMY_TRACKS[0];

  const buildWhatsAppMessage = () => {
    const msg = `Hello ReactJav Academy 👋\n\nI would like to enrol in 1-on-1 Direct Tutoring:\n- Track: ${currentTrack.name}\n- Learner Name: ${learnerName || 'Prospective Student'}\n- Age Tier: ${ageTier}\n- Frequency: ${frequency}\n- Parent/Contact: ${parentName || 'Self'}\n- Contact Phone/Email: ${contactInfo || 'N/A'}\n- Goals/Notes: ${notes || 'Looking for personalized mentorship'}\n\nPlease let me know available schedule slots and onboarding steps!`;
    return `https://wa.me/${TUTORING_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Save enrollment request / inquiry to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('reactjav_tutoring_inquiries') || '[]');
      existing.push({
        id: 'inq_' + Date.now(),
        trackId: selectedTrackId,
        trackName: currentTrack.name,
        learnerName: learnerName.trim(),
        parentName: parentName.trim(),
        contactInfo: contactInfo.trim(),
        ageTier,
        frequency,
        notes: notes.trim(),
        status: 'pending_payment',
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('reactjav_tutoring_inquiries', JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    // 2. Direct user to payment page instead of taking them directly to the course
    const paymentUrl = `/subscribe?tutoringTrackId=${encodeURIComponent(selectedTrackId)}&learnerName=${encodeURIComponent(learnerName.trim())}&frequency=${encodeURIComponent(frequency)}&contact=${encodeURIComponent(contactInfo.trim())}`;

    onClose();

    const currentUser = LocalDataService.getCurrentUser();
    if (!currentUser || currentUser.id === 'guest') {
      router.push(`/auth?mode=signup&redirect=${encodeURIComponent(paymentUrl)}`);
    } else {
      router.push(paymentUrl);
    }
  };

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
          maxWidth: '640px',
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
              Enrol / Book Discovery Session
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

        {isSubmitted ? (
          <div style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
            <div
              style={{
                width: '4.5rem',
                height: '4.5rem',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              <ShieldCheck size={14} />
              <span>CAMPUS INTRANET CLEARANCE ACTIVATED</span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Enrolment & Intranet Clearance Activated!
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
              Congratulations <strong>{learnerName || parentName || 'Scholar'}</strong>! You are now actively registered under the <strong>{currentTrack.name}</strong> Direct Tutoring Track. Full access to the Campus Intranet, CBT testing, Live screen-pairing rooms, and personal study tracking has been unlocked.
            </p>

            <div style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1rem',
              padding: '1.25rem',
              maxWidth: '480px',
              margin: '0 auto 2rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              fontSize: '0.85rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
                <span>Campus Intranet Facilities & Resources: <strong>Granted</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
                <span>Study Tracking & Academic Transcript: <strong>Active</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
                <span>Live 1-on-1 Virtual Room Clearance: <strong>Enabled</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link
                href="/intranet"
                onClick={onClose}
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  padding: '0.8rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  gap: '0.5rem',
                  textDecoration: 'none',
                  borderRadius: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <ShieldCheck size={16} />
                <span>Enter Campus Intranet</span>
              </Link>

              <Link
                href="/dashboard"
                onClick={onClose}
                className="btn btn-secondary"
                style={{
                  padding: '0.8rem 1.35rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                }}
              >
                <LayoutDashboard size={16} />
                <span>Study Dashboard</span>
              </Link>

              <a
                href={buildWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  padding: '0.8rem 1.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  gap: '0.45rem',
                  textDecoration: 'none',
                  borderRadius: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <MessageSquare size={16} color="var(--accent-emerald)" />
                <span>WhatsApp Mentor</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Track Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Selected Academy Track
              </label>
              <select
                value={selectedTrackId}
                onChange={(e) => setSelectedTrackId(e.target.value)}
                className="form-input"
                style={{ cursor: 'pointer', fontWeight: 600 }}
              >
                {ACADEMY_TRACKS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.icon} {t.name} ({t.tier})
                  </option>
                ))}
              </select>
            </div>

            {/* Grid 1: Learner Name & Age Tier */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Learner Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Eze"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Age / Learner Tier
                </label>
                <select
                  value={ageTier}
                  onChange={(e) => setAgeTier(e.target.value)}
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="Ages 5–9 (Junior Explorer)">Ages 5–9 (Junior Explorer)</option>
                  <option value="Ages 10–13 (Foundation)">Ages 10–13 (Foundation)</option>
                  <option value="Ages 14–17 (Builder / High School)">Ages 14–17 (Builder / High School)</option>
                  <option value="Ages 18+ (University / Professional)">Ages 18+ (University / Professional)</option>
                </select>
              </div>
            </div>

            {/* Grid 2: Parent Name & Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Parent / Guardian / Contact Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mrs. Ngozi Eze"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Phone / WhatsApp / Email *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+358 0465695068 or email"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Frequency Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Preferred Tutoring Frequency
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.6rem' }}>
                {[
                  '1x per week (Paced)',
                  '2x per week (Recommended)',
                  '3x per week (Intensive)'
                ].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setFrequency(freq)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: frequency === freq ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                      background: frequency === freq ? 'rgba(79, 70, 229, 0.08)' : 'var(--bg-surface-elevated)',
                      color: frequency === freq ? 'var(--primary)' : 'var(--text-secondary)',
                      textAlign: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes / Special Focus */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Learner Goals & Schedule Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Any specific projects, exam prep, or time preferences?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'center',
                marginTop: '0.5rem',
              }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.925rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px -2px rgba(16, 185, 129, 0.4)',
                }}
              >
                <Send size={16} />
                <span>Submit Enrolment Request</span>
              </button>

              <a
                href={buildWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  padding: '0.85rem 1.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                  borderRadius: '0.75rem',
                }}
              >
                <MessageSquare size={16} color="var(--accent-emerald)" />
                <span>Instant WhatsApp</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
