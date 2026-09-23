'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AcademyTrack, ACADEMY_TRACKS, TUTORING_WHATSAPP_NUMBER } from '@/data/academyTracks';
import { LocalDataService } from '@/lib/supabase/client';
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  User,
  Calendar,
  Phone,
  Mail,
  BookOpen,
  Send,
  Lock,
  ArrowRight,
  Info,
  Clock,
  HeartHandshake,
  Check
} from 'lucide-react';

interface DirectTutoringEnrollmentFormProps {
  initialTrackId?: string;
  onSuccessRedirect?: (url: string) => void;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export default function DirectTutoringEnrollmentForm({
  initialTrackId,
  onSuccessRedirect,
  isModal = false,
  onCloseModal,
}: DirectTutoringEnrollmentFormProps) {
  const router = useRouter();

  // Track selection
  const [selectedTrackId, setSelectedTrackId] = useState<string>(
    initialTrackId || ACADEMY_TRACKS[0].id
  );

  // Learner fields
  const [learnerName, setLearnerName] = useState('');
  const [age, setAge] = useState<number | ''>(12);
  const [ageTier, setAgeTier] = useState('Ages 10–13 (Foundation)');
  const [learnerEmail, setLearnerEmail] = useState('');
  const [learnerPhone, setLearnerPhone] = useState('');

  // Tutoring objective
  const [objective, setObjective] = useState(
    'Algorithmic & Computational Foundation (Creative & Logic Thinking)'
  );

  // Scheduling
  const [frequency, setFrequency] = useState('2x per week (Recommended)');
  const [preferredTime, setPreferredTime] = useState('Weekday Afternoons (3pm – 6pm)');
  const [notes, setNotes] = useState('');

  // Parent / Guardian fields (for learners under 18)
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentRelationship, setParentRelationship] = useState<'Mother' | 'Father' | 'Legal Guardian' | 'Other'>('Mother');
  const [parentalConsentApproved, setParentalConsentApproved] = useState(false);
  const [showConsentTermsModal, setShowConsentTermsModal] = useState(false);

  // Validation & status
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTrackId) {
      setSelectedTrackId(initialTrackId);
    }
  }, [initialTrackId]);

  // Load current user default info if available
  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    if (user && user.id !== 'guest') {
      if (!learnerName && user.full_name) setLearnerName(user.full_name);
      if (!learnerEmail && user.email) setLearnerEmail(user.email);
      if (!learnerPhone && user.phone) setLearnerPhone(user.phone);
    }
  }, []);

  // Synchronize age with age tier automatically
  const handleAgeChange = (val: number | '') => {
    setAge(val);
    if (val === '') return;
    if (val < 10) {
      setAgeTier('Ages 5–9 (Junior Explorer)');
    } else if (val >= 10 && val < 14) {
      setAgeTier('Ages 10–13 (Foundation)');
    } else if (val >= 14 && val < 18) {
      setAgeTier('Ages 14–17 (Builder / High School)');
    } else {
      setAgeTier('Ages 18+ (University / Professional)');
    }
  };

  const handleTierChange = (tier: string) => {
    setAgeTier(tier);
    if (tier.includes('5–9') && (age === '' || age < 5 || age >= 10)) {
      setAge(8);
    } else if (tier.includes('10–13') && (age === '' || age < 10 || age >= 14)) {
      setAge(12);
    } else if (tier.includes('14–17') && (age === '' || age < 14 || age >= 18)) {
      setAge(15);
    } else if (tier.includes('18+') && (age === '' || age < 18)) {
      setAge(20);
    }
  };

  const currentTrack =
    ACADEMY_TRACKS.find((t) => t.id === selectedTrackId) || ACADEMY_TRACKS[0];

  const isMinor = typeof age === 'number' ? age < 18 : ageTier !== 'Ages 18+ (University / Professional)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!learnerName.trim()) {
      setErrorMessage('Please enter the learner’s full name.');
      return;
    }

    if (age === '' || age < 4 || age > 90) {
      setErrorMessage('Please specify a valid learner age between 4 and 90.');
      return;
    }

    // STRICT CHECK: IF CHILD IS LESS THAN 18, PARENTAL CONSENT IS MANDATORY
    if (isMinor) {
      if (!parentName.trim()) {
        setErrorMessage('Please provide the parent or legal guardian full name.');
        return;
      }
      if (!parentPhone.trim() && !parentEmail.trim()) {
        setErrorMessage('Please provide the parent/guardian phone or email contact.');
        return;
      }
      if (!parentalConsentApproved) {
        setErrorMessage(
          'Parental consent approval is legally required for minors under 18 years of age. The parent or guardian must check and approve the consent agreement before registration can continue.'
        );
        return;
      }
    } else {
      // Adult student
      if (!learnerPhone.trim() && !learnerEmail.trim()) {
        setErrorMessage('Please provide your phone or email contact.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const activeContact = isMinor
        ? `${parentPhone} (${parentName} - ${parentRelationship})`
        : learnerPhone || learnerEmail;

      // 1. Save enrollment inquiry record in localStorage
      const existingInquiries = JSON.parse(
        localStorage.getItem('reactjav_tutoring_inquiries') || '[]'
      );
      existingInquiries.push({
        id: 'inq_' + Date.now(),
        trackId: selectedTrackId,
        trackName: currentTrack.name,
        learnerName: learnerName.trim(),
        age: Number(age),
        ageTier,
        objective,
        frequency,
        preferredTime,
        parentName: isMinor ? parentName.trim() : 'Self (Adult)',
        parentEmail: isMinor ? parentEmail.trim() : learnerEmail.trim(),
        parentPhone: isMinor ? parentPhone.trim() : learnerPhone.trim(),
        parentRelationship: isMinor ? parentRelationship : 'Self',
        parentalConsentApproved: isMinor ? parentalConsentApproved : true,
        parentalConsentAt: isMinor ? new Date().toISOString() : undefined,
        contactInfo: activeContact,
        notes: notes.trim(),
        status: 'pending_payment',
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('reactjav_tutoring_inquiries', JSON.stringify(existingInquiries));

      // 2. Update user profile registration details if authenticated
      const currentUser = LocalDataService.getCurrentUser();
      if (currentUser && currentUser.id !== 'guest') {
        LocalDataService.updateTutoringRegistrationDetails(currentUser.id, {
          full_name: learnerName.trim(),
          age: Number(age),
          age_tier: ageTier,
          tutoring_objective: objective,
          track_id: selectedTrackId,
          track_name: currentTrack.name,
          frequency,
          phone: isMinor ? parentPhone.trim() : learnerPhone.trim(),
          parent_name: isMinor ? parentName.trim() : undefined,
          parent_email: isMinor ? parentEmail.trim() : undefined,
          parent_phone: isMinor ? parentPhone.trim() : undefined,
          parent_relationship: isMinor ? parentRelationship : undefined,
          parental_consent: isMinor ? parentalConsentApproved : true,
          notes: notes.trim(),
        });
      }

      // 3. Construct destination payment URL
      const paymentUrl = `/subscribe?tutoringTrackId=${encodeURIComponent(
        selectedTrackId
      )}&learnerName=${encodeURIComponent(
        learnerName.trim()
      )}&age=${encodeURIComponent(String(age))}&ageTier=${encodeURIComponent(
        ageTier
      )}&frequency=${encodeURIComponent(
        frequency
      )}&parentName=${encodeURIComponent(
        isMinor ? parentName.trim() : ''
      )}&parentConsent=${encodeURIComponent(
        String(isMinor ? parentalConsentApproved : true)
      )}&objective=${encodeURIComponent(objective)}`;

      if (onCloseModal) {
        onCloseModal();
      }

      if (onSuccessRedirect) {
        onSuccessRedirect(paymentUrl);
        return;
      }

      // If user is guest/unauthenticated, redirect to signup first with return URL
      if (!currentUser || currentUser.id === 'guest') {
        router.push(`/auth?mode=signup&redirect=${encodeURIComponent(paymentUrl)}`);
      } else {
        router.push(paymentUrl);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during submission';
      setErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Error Alert */}
      {errorMessage && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '0.85rem',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            color: '#fca5a5',
            fontSize: '0.875rem',
            lineHeight: 1.5,
          }}
        >
          <AlertCircle size={20} color="var(--accent-rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.2rem' }}>
              Action Required to Continue:
            </strong>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* 1. Track Selector */}
      <div
        style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '1.25rem',
        }}
      >
        <label
          style={{
            display: 'block',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}
        >
          Selected 1-on-1 Direct Tutoring Track
        </label>
        <select
          value={selectedTrackId}
          onChange={(e) => setSelectedTrackId(e.target.value)}
          className="form-input"
          style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}
        >
          {ACADEMY_TRACKS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.icon} {t.name} — {t.tier} ({t.zoneName})
            </option>
          ))}
        </select>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {currentTrack.description}
        </p>
      </div>

      {/* 2. Learner Identity & Age Categorization */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          <User size={18} color="var(--primary)" />
          <span>Learner Information & Age Category</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Learner Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. David Somto Eze"
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Learner Age (Years) *
            </label>
            <input
              type="number"
              required
              min={4}
              max={85}
              placeholder="e.g. 11"
              value={age}
              onChange={(e) => handleAgeChange(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className="form-input"
              style={{ fontWeight: 700, fontSize: '1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Academic Development Tier
            </label>
            <select
              value={ageTier}
              onChange={(e) => handleTierChange(e.target.value)}
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
      </div>

      {/* 3. Tutoring Objectives & Learning Focus */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Direct Tutoring Objective & Learning Focus
        </label>
        <select
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="form-input"
          style={{ cursor: 'pointer' }}
        >
          <option value="Algorithmic & Computational Foundation (Creative & Logic Thinking)">
            Algorithmic & Computational Foundation (Creative & Logic Thinking)
          </option>
          <option value="School Curriculum Support & AP Computer Science Exam Prep">
            School Curriculum Support & AP Computer Science Exam Prep
          </option>
          <option value="Creative Coding, Scratch & Interactive Game Development">
            Creative Coding, Scratch & Interactive Game Development
          </option>
          <option value="Full-Stack Web & Software Engineering Project Building">
            Full-Stack Web & Software Engineering Project Building
          </option>
          <option value="Coding Competitions, Olympiads & Hackathon Preparation">
            Coding Competitions, Olympiads & Hackathon Preparation
          </option>
          <option value="Python AI, Data Science & Machine Learning Foundations">
            Python AI, Data Science & Machine Learning Foundations
          </option>
          <option value="University Coursework Assistance & Architecture Pairing">
            University Coursework Assistance & Architecture Pairing
          </option>
          <option value="Personalized Custom Mentorship (Tailored Schedule)">
            Personalized Custom Mentorship (Tailored Schedule)
          </option>
        </select>
      </div>

      {/* 4. Tutoring Frequency & Schedule Timing */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Preferred Weekly Tutoring Frequency
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.6rem' }}>
          {[
            '1x per week (Paced - 60 mins)',
            '2x per week (Recommended)',
            '3x per week (Intensive Mentorship)',
          ].map((freq) => (
            <button
              key={freq}
              type="button"
              onClick={() => setFrequency(freq)}
              style={{
                padding: '0.75rem 0.85rem',
                borderRadius: '0.75rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: frequency === freq ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                background: frequency === freq ? 'rgba(79, 70, 229, 0.12)' : 'var(--bg-surface-elevated)',
                color: frequency === freq ? 'var(--primary)' : 'var(--text-secondary)',
                textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              {freq}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '0.4rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
            Preferred Time Slot:
          </label>
          <select
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="form-input"
            style={{ cursor: 'pointer' }}
          >
            <option value="Weekday Afternoons (3pm – 6pm)">Weekday Afternoons (3pm – 6pm)</option>
            <option value="Weekday Evenings (6pm – 9pm)">Weekday Evenings (6pm – 9pm)</option>
            <option value="Weekend Mornings (9am – 12pm)">Weekend Mornings (9am – 12pm)</option>
            <option value="Weekend Afternoons (1pm – 5pm)">Weekend Afternoons (1pm – 5pm)</option>
            <option value="Flexible / Coordinate with Faculty Mentor">Flexible / Coordinate with Faculty Mentor</option>
          </select>
        </div>
      </div>

      {/* 5. PARENTAL CONSENT & GUARDIAN SECTION (IF AGE < 18) */}
      {isMinor ? (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, var(--bg-surface-elevated) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fbbf24',
                }}
              >
                <HeartHandshake size={18} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
                  Parent / Guardian Authorization & Consent
                </h4>
                <span style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 600 }}>
                  Mandatory for Minor Scholars (Age {age || 'under 18'})
                </span>
              </div>
            </div>

            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              Minor Protection Policy
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Because the student is under 18 years old, a parent or legal guardian must provide contact details and approve the parental consent agreement before enrollment and tuition payment can proceed.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Parent / Guardian Full Name *
              </label>
              <input
                type="text"
                required={isMinor}
                placeholder="e.g. Mrs. Ngozi Eze"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Relationship to Learner *
              </label>
              <select
                value={parentRelationship}
                onChange={(e) => setParentRelationship(e.target.value as any)}
                className="form-input"
                style={{ cursor: 'pointer' }}
              >
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Legal Guardian">Legal Guardian</option>
                <option value="Other">Other Family Representative</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Parent WhatsApp / Phone Number *
              </label>
              <input
                type="text"
                required={isMinor}
                placeholder="+358 0465695068 or phone"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Parent Email Address *
              </label>
              <input
                type="email"
                required={isMinor}
                placeholder="parent@gmail.com"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Parental Consent Agreement Box */}
          <div
            style={{
              background: parentalConsentApproved
                ? 'rgba(16, 185, 129, 0.08)'
                : 'rgba(15, 23, 42, 0.65)',
              border: parentalConsentApproved
                ? '1px solid rgba(16, 185, 129, 0.4)'
                : '1px solid var(--border-subtle)',
              borderRadius: '0.85rem',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="parental-consent-checkbox"
                checked={parentalConsentApproved}
                onChange={(e) => setParentalConsentApproved(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  accentColor: 'var(--accent-emerald)',
                  cursor: 'pointer',
                  marginTop: '2px',
                  flexShrink: 0,
                }}
              />
              <label
                htmlFor="parental-consent-checkbox"
                style={{
                  fontSize: '0.85rem',
                  lineHeight: 1.55,
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.25rem' }}>
                  Parental Consent & Academic Mentorship Agreement
                </strong>
                I,{' '}
                <strong style={{ color: '#38bdf8' }}>{parentName || '[Parent / Guardian Name]'}</strong>, hereby
                confirm that I am the {parentRelationship.toLowerCase()} / legal guardian of{' '}
                <strong style={{ color: '#34d399' }}>{learnerName || '[Learner Name]'}</strong> (Age{' '}
                {age || 'under 18'}). I grant full consent for my child to participate in 1-on-1 Direct Tutoring
                sessions at ReactJav Academy, including real-time code pairing, screen sharing, and audio/video
                interaction with certified faculty mentors under the ReactJav Minor Safety and Dual Sign-off Policy.
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                * Consent is electronically timestamped and archived with the Bursar and Registrar.
              </span>
              <button
                type="button"
                onClick={() => setShowConsentTermsModal(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                View Full Minor Safety Terms
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ADULT SCHOLAR CONTACT SECTION (AGE 18+) */
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1rem',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} color="var(--accent-emerald)" />
            <h4 style={{ margin: 0, fontSize: '0.925rem', fontWeight: 800, color: '#ffffff' }}>
              Scholar Direct Contact Information (Adult Self-Enrollment)
            </h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Contact Phone / WhatsApp *
              </label>
              <input
                type="text"
                required={!isMinor}
                placeholder="+358 0465695068"
                value={learnerPhone}
                onChange={(e) => setLearnerPhone(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Direct Email Address *
              </label>
              <input
                type="email"
                required={!isMinor}
                placeholder="learner@example.com"
                value={learnerEmail}
                onChange={(e) => setLearnerEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. Optional Goals & Notes */}
      <div>
        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          Specific Goals, Hobbies or Project Ideas (Optional)
        </label>
        <textarea
          rows={2}
          placeholder="e.g. Preparing for USACO, wants to build 2D game in Python, needs help with school math & logic..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="form-input"
          style={{ resize: 'vertical' }}
        />
      </div>

      {/* 7. Action Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting || (isMinor && !parentalConsentApproved)}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '0.95rem 1.75rem',
            fontSize: '1rem',
            fontWeight: 800,
            background: isMinor && !parentalConsentApproved
              ? 'rgba(100, 116, 139, 0.4)'
              : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            cursor: isMinor && !parentalConsentApproved ? 'not-allowed' : 'pointer',
            boxShadow: isMinor && !parentalConsentApproved
              ? 'none'
              : '0 4px 14px -2px rgba(16, 185, 129, 0.4)',
            transition: 'all 0.2s ease',
          }}
        >
          {isSubmitting ? (
            <span>Processing Enrollment...</span>
          ) : isMinor && !parentalConsentApproved ? (
            <>
              <Lock size={18} />
              <span>Parental Consent Required to Continue</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Submit Enrolment & Proceed to Tuition Payment</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <p style={{ margin: '0.75rem 0 0', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {isMinor
            ? 'Parent approval verified. Submission securely redirects to tuition payment & intranet credentialing.'
            : 'Submission securely redirects to tuition payment & intranet credentialing.'}
        </p>
      </div>

      {/* MINOR SAFETY & PARENTAL CONSENT MODAL */}
      {showConsentTermsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setShowConsentTermsModal(false)}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-accent)',
              borderRadius: '1.25rem',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={24} color="var(--accent-emerald)" />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                ReactJav Minor Safety & Safeguarding Standards
              </h3>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ margin: 0 }}>
                ReactJav Academy is dedicated to providing an encouraging, world-class, and safe online learning environment for young engineers:
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <li>
                  <strong style={{ color: '#ffffff' }}>Faculty Vetting:</strong> All instructors pass identity checks, background screening, and specialized pedagogical training for kids and teens.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Dual Sign-Off Rule:</strong> Attendance and lesson minutes are verifiable only when both student and instructor acknowledge the ledger.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Parent Transparency:</strong> Parents can request session recordings, view attendance transcripts, and message instructors directly.
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Data Privacy:</strong> Student projects and credentials are held under strict zero-commercial-disclosure student privacy protocols.
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setParentalConsentApproved(true);
                setShowConsentTermsModal(false);
              }}
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                padding: '0.75rem',
                fontWeight: 700,
              }}
            >
              I Understand & Approve Consent
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
