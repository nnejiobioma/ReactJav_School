'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Lock,
  Building2,
  Ticket,
  RefreshCw,
  Clock,
  BookOpen,
  GraduationCap,
  Award,
  ChevronRight,
  Layers,
  Video
} from 'lucide-react';
import { Profile, Course } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { formatCurrency } from '@/lib/utils';
import { AcademyTrack, ACADEMY_TRACKS } from '@/data/academyTracks';
import AccessGuard from '@/components/auth/AccessGuard';

function SubscribeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId') || searchParams.get('course');
  const tutoringTrackId = searchParams.get('tutoringTrackId') || searchParams.get('trackId');
  const learnerNameParam = searchParams.get('learnerName') || '';
  const frequencyParam = searchParams.get('frequency') || '';
  const contactParam = searchParams.get('contact') || '';
  const parentNameParam = searchParams.get('parentName') || '';
  const ageParam = searchParams.get('age') || '';
  const ageTierParam = searchParams.get('ageTier') || '';
  const objectiveParam = searchParams.get('objective') || '';
  const parentConsentParam = searchParams.get('parentConsent') === 'true';

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_transfer' | 'campus_voucher'>('credit_card');

  // Enrolling course state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Direct Tutoring state
  const [selectedTutoringTrack, setSelectedTutoringTrack] = useState<AcademyTrack | null>(null);
  const [tutoringDetails, setTutoringDetails] = useState({
    learnerName: learnerNameParam,
    frequency: frequencyParam,
    contact: contactParam,
    parentName: parentNameParam,
    age: ageParam ? Number(ageParam) : undefined,
    ageTier: ageTierParam,
    objective: objectiveParam,
    parentConsent: parentConsentParam,
  });

  // Card Form State
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('08/29');
  const [cvc, setCvc] = useState('888');
  const [voucherCode, setVoucherCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedRef, setGeneratedRef] = useState('');

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    if (!user || user.id === 'guest') {
      let returnUrl = '/subscribe';
      if (tutoringTrackId) {
        returnUrl = `/subscribe?tutoringTrackId=${encodeURIComponent(tutoringTrackId)}&learnerName=${encodeURIComponent(learnerNameParam)}&frequency=${encodeURIComponent(frequencyParam)}&contact=${encodeURIComponent(contactParam)}&parentName=${encodeURIComponent(parentNameParam)}`;
      } else if (courseId) {
        returnUrl = `/subscribe?courseId=${encodeURIComponent(courseId)}`;
      }
      router.push(`/auth?mode=signup${courseId ? `&courseId=${courseId}` : ''}&redirect=${encodeURIComponent(returnUrl)}`);
      return;
    }
    setCurrentUser(user);
    if (user && user.full_name) {
      setCardHolder(user.full_name);
    }

    const availableCourses = LocalDataService.getCourses().filter((c) => c.is_published !== false);
    setCourses(availableCourses);

    if (courseId) {
      const course = LocalDataService.getCourseById(courseId);
      if (course) {
        setSelectedCourse(course);
      }
    } else if (!tutoringTrackId && availableCourses.length > 0) {
      setSelectedCourse(availableCourses[0]);
    }

    if (tutoringTrackId) {
      const tracks = LocalDataService.getAcademyTracks();
      const track = tracks.find((t) => t.id === tutoringTrackId) || ACADEMY_TRACKS.find((t) => t.id === tutoringTrackId);
      if (track) {
        setSelectedTutoringTrack(track);
      }
    }
  }, [courseId, tutoringTrackId, learnerNameParam, frequencyParam, contactParam, parentNameParam, router]);

  const payableAmount = selectedTutoringTrack
    ? 149
    : selectedCourse
    ? selectedCourse.price
    : 0;
  const firstLessonId = selectedCourse?.sections?.[0]?.lessons?.[0]?.id || 'overview';

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTutoringTrack && !selectedCourse) return;
    setIsProcessing(true);

    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const prefix = selectedTutoringTrack
      ? 'TUT-FELLOW'
      : 'ENR-PROG';
    const txnRef = `${prefix}-${randomSuffix}`;

    setTimeout(() => {
      const targetUserId = currentUser?.id || `usr_student_${Date.now()}`;

      if (selectedTutoringTrack) {
        // Process 1-on-1 Direct Tutoring tuition payment & grant immediate campus intranet clearance
        LocalDataService.processTutoringPayment(
          targetUserId,
          selectedTutoringTrack.id,
          selectedTutoringTrack.name,
          payableAmount,
          txnRef,
          {
            learnerName: tutoringDetails.learnerName || currentUser?.full_name || 'Tutoring Scholar',
            frequency: tutoringDetails.frequency,
            notes: '',
            age: tutoringDetails.age,
            ageTier: tutoringDetails.ageTier,
            objective: tutoringDetails.objective,
            parentName: tutoringDetails.parentName,
            parentalConsent: tutoringDetails.parentConsent,
          }
        );
      } else if (selectedCourse) {
        // Process Programme tuition payment, auto-enroll student & grant intranet clearance
        LocalDataService.processProgrammePayment(
          targetUserId,
          selectedCourse.id,
          selectedCourse.price,
          txnRef
        );
      }

      setGeneratedRef(txnRef);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 900);
  };

  if (!currentUser || currentUser.id === 'guest') {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', maxWidth: '520px' }}>
        <div className="glass-card" style={{ padding: '3.5rem 2rem' }}>
          <RefreshCw className="animate-spin" size={36} style={{ color: 'var(--primary)', margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
            Account Required for Enrollment
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
            Redirecting to student authentication. Please create an account or sign in to continue with enrollment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3.5rem 1rem 6rem' }}>
      {/* Page Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1.1rem',
          borderRadius: '9999px',
          background: 'rgba(37, 99, 235, 0.1)',
          border: '1px solid rgba(37, 99, 235, 0.25)',
          fontSize: '0.85rem',
          color: 'var(--primary)',
          fontWeight: 600,
          marginBottom: '1rem',
        }}>
          <Sparkles size={16} color="var(--primary)" />
          <span>
            {selectedTutoringTrack
              ? 'ReactJav Academy • 1-on-1 Direct Tutoring Desk'
              : 'ReactJav Campus Tuition & Enrollment Desk'}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.1rem, 4vw, 3.1rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '0.85rem',
        }}>
          {selectedTutoringTrack ? (
            <>1-on-1 Direct Tutoring <span className="text-gradient">Tuition & Intranet Access</span></>
          ) : (
            <>Complete Programme <span className="text-gradient">Tuition Payment</span></>
          )}
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          {selectedTutoringTrack ? (
            `Pay tuition to confirm your 1-on-1 Direct Tutoring enrollment for ${selectedTutoringTrack.name} (${selectedTutoringTrack.tier}). Tuition grants unrestricted Campus Intranet privileges, dedicated live mentoring room, and CBT certification.`
          ) : selectedCourse ? (
            `Pay tuition to confirm your enrollment in ${selectedCourse.title}. Tuition includes full courseware, virtual classrooms, and immediate Campus Intranet access.`
          ) : (
            'Select a programme below and complete your tuition payment for immediate enrollment and Campus Intranet access.'
          )}
        </p>
      </div>

      {/* SUCCESS CONFIRMATION MODAL / BANNER */}
      {isSuccess && (
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 3rem',
          background: 'var(--bg-surface)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '1.25rem',
          padding: '3rem 2.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <CheckCircle2 size={36} color="var(--accent-emerald)" />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--accent-emerald)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
          }}>
            <ShieldCheck size={14} />
            <span>CAMPUS INTRANET CLEARANCE ACTIVATED</span>
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            {selectedTutoringTrack
              ? 'Direct Tutoring Enrolment Confirmed!'
              : 'Programme Enrollment Confirmed!'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            {selectedTutoringTrack ? (
              <>
                Your tuition payment of <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(payableAmount)}</strong> for{' '}
                <strong style={{ color: 'var(--accent-emerald)' }}>{selectedTutoringTrack.name}</strong> 1-on-1 Direct Tutoring has been confirmed. Full fellowship access to the Campus Intranet, CBT certifications, and your personal 1-on-1 Mentoring Pod has been granted!
              </>
            ) : selectedCourse ? (
              <>
                Your payment of <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(selectedCourse.price)}</strong> for{' '}
                <strong style={{ color: 'var(--primary)' }}>{selectedCourse.title}</strong> has been received. Your curriculum lessons and Campus Intranet privileges are now active!
              </>
            ) : (
              <>
                Your tuition payment has been confirmed and your Campus Intranet access is now active.
              </>
            )}
          </p>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.75rem',
            padding: '1rem',
            maxWidth: '380px',
            margin: '0 auto 2rem',
            fontFamily: 'monospace',
            color: 'var(--accent-emerald)',
            fontSize: '1.05rem',
            fontWeight: 700,
          }}>
            REF: {generatedRef}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {selectedTutoringTrack ? (
              <>
                <Link
                  href="/intranet"
                  className="btn btn-primary btn-lg"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}
                >
                  <ShieldCheck size={18} />
                  <span>Enter Campus Intranet</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href={`/live?room=room_tutoring_${selectedTutoringTrack.id}`}
                  className="btn btn-secondary btn-lg"
                  style={{ gap: '0.5rem', textDecoration: 'none', fontWeight: 600 }}
                >
                  <Video size={18} color="var(--accent-emerald)" />
                  <span>1-on-1 Mentoring Pod</span>
                </Link>

                <Link href="/dashboard" className="btn btn-outline btn-lg" style={{ textDecoration: 'none', fontWeight: 600 }}>
                  <GraduationCap size={18} />
                  <span>My Dashboard</span>
                </Link>
              </>
            ) : selectedCourse ? (
              <>
                <Link href={`/learn/${selectedCourse.id}/${firstLessonId}`} className="btn btn-primary btn-lg">
                  <BookOpen size={18} />
                  <span>Start Learning Programme</span>
                  <ArrowRight size={18} />
                </Link>

                <Link href="/intranet" className="btn btn-secondary btn-lg">
                  <Clock size={18} />
                  <span>Open Campus Intranet</span>
                </Link>

                <Link href="/dashboard" className="btn btn-outline btn-lg">
                  <GraduationCap size={18} />
                  <span>My Dashboard</span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/intranet" className="btn btn-primary btn-lg">
                  <Clock size={18} />
                  <span>Go to Campus Intranet</span>
                  <ArrowRight size={18} />
                </Link>

                <Link href="/courses" className="btn btn-outline btn-lg">
                  <BookOpen size={18} />
                  <span>Browse Programmes Catalog</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* SELECTED TUTORING TRACK SUMMARY BANNER */}
      {!isSuccess && selectedTutoringTrack && (
        <div className="glass-card" style={{
          maxWidth: '780px',
          margin: '0 auto 2.5rem',
          background: 'var(--bg-surface)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '1.25rem',
          padding: '1.75rem 2rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={12} />
                  1-on-1 Direct Tutoring
                </span>
                <span className="badge badge-primary">{selectedTutoringTrack.tier}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedTutoringTrack.zoneName}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{selectedTutoringTrack.icon}</span>
                <span>{selectedTutoringTrack.name}</span>
              </h2>
              {tutoringDetails.learnerName && (
                <div style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div>
                    Enrolling Scholar: <strong style={{ color: 'var(--text-primary)' }}>{tutoringDetails.learnerName}</strong>
                    {tutoringDetails.age && (
                      <span style={{ color: 'var(--text-muted)' }}> (Age {tutoringDetails.age} • {tutoringDetails.ageTier || selectedTutoringTrack.tier})</span>
                    )}
                    {' • '}
                    Frequency: <strong style={{ color: 'var(--text-primary)' }}>{tutoringDetails.frequency || '2x per week'}</strong>
                  </div>
                  {tutoringDetails.objective && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Objective: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{tutoringDetails.objective}</span>
                    </div>
                  )}
                  {tutoringDetails.parentConsent && tutoringDetails.parentName && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                      <ShieldCheck size={14} />
                      <span>Parental Consent Approved & On File: {tutoringDetails.parentName}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Tutoring Tuition Fee</span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                {formatCurrency(payableAmount)}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Monthly / Term Fellowship</span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" />
              <span>Dedicated 1-on-1 Mentoring Pod</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--accent-emerald)" />
              <span>Unrestricted Campus Intranet Access</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={16} color="var(--accent-amber)" />
              <span>Dual Sign-Off Study Transcript</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.25rem' }}>
            <Link
              href="/tutoring"
              style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
            >
              Change tutoring track
            </Link>
          </div>
        </div>
      )}

      {/* SELECTED PROGRAMME TUITION SUMMARY BANNER (IF ENROLLING SPECIFIC COURSE) */}
      {!isSuccess && !selectedTutoringTrack && selectedCourse && (
        <div className="glass-card" style={{
          maxWidth: '780px',
          margin: '0 auto 2.5rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-accent)',
          borderRadius: '1.25rem',
          padding: '1.75rem 2rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-primary">Selected Programme</span>
                <span className="badge badge-emerald">{selectedCourse.level || 'All Levels'}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedCourse.track || selectedCourse.category}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {selectedCourse.title}
              </h2>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Tuition Fee</span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                {formatCurrency(selectedCourse.price)}
              </span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" />
              <span>Full Curriculum & Sandboxes</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={16} color="var(--accent-amber)" />
              <span>Verified Course Certificate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--primary)" />
              <span>Unlocks Campus Intranet Access</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.25rem' }}>
            {!courseId && courses.length > 1 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <label htmlFor="programme-select" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Switch Programme:
                </label>
                <select
                  id="programme-select"
                  value={selectedCourse.id}
                  onChange={(e) => {
                    const found = courses.find((c) => c.id === e.target.value);
                    if (found) setSelectedCourse(found);
                  }}
                  className="form-input"
                  style={{ width: 'auto', minWidth: '240px', padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({formatCurrency(c.price)})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <span />
            )}

            <Link
              href="/courses"
              style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
            >
              Browse all programmes
            </Link>
          </div>
        </div>
      )}

      {/* FALLBACK IF NO COURSE SELECTED */}
      {!isSuccess && !selectedCourse && !selectedTutoringTrack && (
        <div className="glass-card" style={{
          maxWidth: '680px',
          margin: '0 auto 2.5rem',
          padding: '2rem',
          borderRadius: '1.25rem',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Choose a Programme to Continue
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
            Select a course from our Programmes catalog to proceed with tuition payment and instant access.
          </p>
          <Link href="/courses" className="btn btn-primary btn-md">
            <BookOpen size={16} />
            <span>Browse Programmes</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* CHECKOUT PAYMENT DRAWER */}
      {!isSuccess && (selectedCourse || selectedTutoringTrack) && (
        <div className="glass-card" style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          borderRadius: '1.5rem',
          border: '1px solid var(--border-accent)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {selectedTutoringTrack
                  ? '1-on-1 Direct Tutoring Tuition'
                  : 'Programme Enrollment Payment'}
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedTutoringTrack
                  ? `${selectedTutoringTrack.name} (1-on-1 Mentorship)`
                  : selectedCourse?.title} — {formatCurrency(payableAmount)}
              </h3>
            </div>

            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'block' }}>
                256-Bit SSL Encrypted
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Instant Access Activation
              </span>
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
            <button
              type="button"
              onClick={() => setPaymentMethod('credit_card')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '0.75rem',
                background: paymentMethod === 'credit_card' ? 'rgba(37, 99, 235, 0.12)' : 'var(--bg-surface-elevated)',
                border: paymentMethod === 'credit_card' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                color: paymentMethod === 'credit_card' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              <CreditCard size={16} />
              <span>Card Payment</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('bank_transfer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '0.75rem',
                background: paymentMethod === 'bank_transfer' ? 'rgba(37, 99, 235, 0.12)' : 'var(--bg-surface-elevated)',
                border: paymentMethod === 'bank_transfer' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                color: paymentMethod === 'bank_transfer' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              <Building2 size={16} />
              <span>Bank Wire</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('campus_voucher')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '0.75rem',
                background: paymentMethod === 'campus_voucher' ? 'rgba(37, 99, 235, 0.12)' : 'var(--bg-surface-elevated)',
                border: paymentMethod === 'campus_voucher' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                color: paymentMethod === 'campus_voucher' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              <Ticket size={16} />
              <span>Scholar Voucher</span>
            </button>
          </div>

          {/* Payment Fields Form */}
          <form onSubmit={handleSubmitPayment}>
            {paymentMethod === 'credit_card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Cardholder Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Alex Morgan"
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="form-input"
                    style={{ fontFamily: 'monospace' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="08/29"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                      CVC Security Code
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="•••"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Campus Bursar Direct Routing Information:
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Bank: <strong>Silicon Valley Academic Trust</strong><br />
                  Routing Number: <strong>021000089</strong><br />
                  Account: <strong>94820199201 (ReactJav LMS Campus)</strong><br />
                  Memo: <strong>{currentUser?.email || 'student-tuition'}</strong>
                </p>
                <p style={{ color: 'var(--accent-amber)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                  * Wire transfers generate a verification reference and are confirmed by Bursar during admin clearance.
                </p>
              </div>
            )}

            {paymentMethod === 'campus_voucher' && (
              <div>
                <label style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Department Scholarship Voucher Code
                </label>
                <input
                  type="text"
                  required
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  placeholder="e.g. CS-DEPT-FELLOWSHIP-2026"
                  className="form-input"
                  style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  Enter scholarship code issued by faculty dean or sponsor.
                </p>
              </div>
            )}

            <div style={{ marginTop: '2rem' }}>
              <button
                type="submit"
                disabled={isProcessing}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    <span>Processing Tuition Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>
                      {selectedTutoringTrack
                        ? `Pay Tutoring Tuition & Unlock Intranet (${formatCurrency(payableAmount)})`
                        : `Pay Tuition & Unlock Programme (${formatCurrency(payableAmount)})`}
                    </span>
                  </>
                )}
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Security Guarantee: 256-bit encrypted checkout. Instant activation of curriculum materials and campus tools.
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading Payment Page...</p>
      </div>
    }>
      <AccessGuard
        level="authenticated"
        pageTitle="Programme Payment Portal"
        customDescription="Programme tuition checkout and bursar payment processing are restricted to authenticated students and registered applicants. Please sign in to complete your payment."
      >
        <SubscribeContent />
      </AccessGuard>
    </Suspense>
  );
}
