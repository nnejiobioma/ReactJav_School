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
  Layers
} from 'lucide-react';
import { Profile, SubscriptionPlan, Course } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { formatCurrency } from '@/lib/utils';

function SubscribeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId') || searchParams.get('course');

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<'term' | 'annual' | 'lifetime'>('annual');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_transfer' | 'campus_voucher'>('credit_card');

  // Enrolling course state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
    setCurrentUser(user);
    if (user && user.full_name) {
      setCardHolder(user.full_name);
    }
    setPlans(LocalDataService.getSubscriptionPlans());

    if (courseId) {
      const course = LocalDataService.getCourseById(courseId);
      if (course) {
        setSelectedCourse(course);
      }
    }
  }, [courseId]);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[1];
  const payableAmount = selectedCourse ? selectedCourse.price : (selectedPlan?.price || 99);
  const firstLessonId = selectedCourse?.sections?.[0]?.lessons?.[0]?.id || 'overview';

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const prefix = selectedCourse
      ? 'ENR-PROG'
      : paymentMethod === 'credit_card'
      ? 'TXN-CARD'
      : paymentMethod === 'bank_transfer'
      ? 'TXN-WIRE'
      : 'VCH-CAMPUS';
    const txnRef = `${prefix}-${randomSuffix}`;

    setTimeout(() => {
      if (selectedCourse) {
        // Process Programme tuition payment, auto-enroll student & grant intranet clearance
        const targetUserId = currentUser?.id || `usr_student_${Date.now()}`;
        LocalDataService.processProgrammePayment(
          targetUserId,
          selectedCourse.id,
          selectedCourse.price,
          txnRef
        );
      } else {
        // Submit standard intranet clearance subscription
        LocalDataService.submitSubscriptionPayment(selectedPlanId, paymentMethod, txnRef);
      }

      setGeneratedRef(txnRef);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 900);
  };

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
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          fontSize: '0.85rem',
          color: '#c7d2fe',
          fontWeight: 600,
          marginBottom: '1rem',
        }}>
          <Sparkles size={16} color="var(--primary)" />
          <span>ReactJav Campus Tuition & Enrollment Desk</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.1rem, 4vw, 3.1rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '0.85rem',
        }}>
          {selectedCourse ? (
            <>Complete Programme <span className="text-gradient">Tuition Payment</span></>
          ) : (
            <>Tuition Plans & <span className="text-gradient">Intranet Access</span></>
          )}
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          {selectedCourse ? (
            `Pay tuition to confirm your enrollment in ${selectedCourse.title}. Tuition includes full courseware, virtual classrooms, and unrestricted Campus Intranet privileges.`
          ) : (
            'Gain unrestricted access to internal CBT testing, live virtual classrooms, faculty office hours, and engineering curriculum.'
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

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            {selectedCourse ? 'Programme Enrollment Confirmed!' : 'Tuition Payment Processed!'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            {selectedCourse ? (
              <>
                Your payment of <strong style={{ color: '#ffffff' }}>{formatCurrency(selectedCourse.price)}</strong> for{' '}
                <strong style={{ color: 'var(--primary)' }}>{selectedCourse.title}</strong> has been received. Your curriculum lessons and Campus Intranet fellowship privileges are now active!
              </>
            ) : (
              <>
                Your tuition for the <strong style={{ color: 'var(--text-primary)' }}>{selectedPlan?.name}</strong> has been logged. Your application reference has been assigned to the Registrar queue.
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
            color: '#34d399',
            fontSize: '1.05rem',
            fontWeight: 700,
          }}>
            REF: {generatedRef}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {selectedCourse ? (
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

      {/* SELECTED PROGRAMME TUITION SUMMARY BANNER (IF ENROLLING SPECIFIC COURSE) */}
      {!isSuccess && selectedCourse && (
        <div style={{
          maxWidth: '780px',
          margin: '0 auto 2.5rem',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.35)',
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {selectedCourse.title}
              </h2>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Tuition Fee</span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.25rem' }}>
            <Link
              href="/subscribe"
              onClick={() => setSelectedCourse(null)}
              style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
            >
              Or view general subscription options instead
            </Link>
          </div>
        </div>
      )}

      {/* PLAN SELECTOR CARDS (SHOWN IF NO SPECIFIC COURSE CHOSEN) */}
      {!isSuccess && !selectedCourse && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}>
            {plans.map((plan) => {
              const isSelected = plan.id === selectedPlanId;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className="glass-card"
                  style={{
                    cursor: 'pointer',
                    padding: 'clamp(1.25rem, 3vw, 2rem)',
                    borderRadius: '1.25rem',
                    position: 'relative',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                    background: isSelected
                      ? 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.95) 75%)'
                      : 'var(--bg-surface)',
                    boxShadow: isSelected ? '0 15px 40px rgba(99, 102, 241, 0.25)' : 'none',
                    transform: isSelected ? 'translateY(-4px)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '24px',
                      background: 'var(--grad-primary)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                    }}>
                      Most Enrolled
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {plan.name}
                    </h3>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid var(--primary)' : '2px solid var(--text-muted)',
                      background: 'var(--bg-surface)',
                    }} />
                  </div>

                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', minHeight: '38px', marginBottom: '1.25rem' }}>
                    {plan.tagline}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>${plan.price}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{plan.period}</span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                      Intranet Perks:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {plan.features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-primary)' }}>
                          <CheckCircle2 size={15} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* CHECKOUT PAYMENT DRAWER */}
      {!isSuccess && (
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
                {selectedCourse ? 'Programme Enrollment' : 'Selected Plan'}
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedCourse ? selectedCourse.title : selectedPlan?.name} — {formatCurrency(payableAmount)}
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
                background: paymentMethod === 'credit_card' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: paymentMethod === 'credit_card' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                color: paymentMethod === 'credit_card' ? '#a5b4fc' : 'var(--text-secondary)',
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
                background: paymentMethod === 'bank_transfer' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: paymentMethod === 'bank_transfer' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                color: paymentMethod === 'bank_transfer' ? '#a5b4fc' : 'var(--text-secondary)',
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
                background: paymentMethod === 'campus_voucher' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: paymentMethod === 'campus_voucher' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                color: paymentMethod === 'campus_voucher' ? '#a5b4fc' : 'var(--text-secondary)',
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
                <p style={{ color: '#fbbf24', fontSize: '0.78rem', marginTop: '0.5rem' }}>
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
                      {selectedCourse ? (
                        `Pay Tuition & Unlock Programme (${formatCurrency(payableAmount)})`
                      ) : (
                        `Submit Payment & Request Intranet Clearance (${formatCurrency(payableAmount)})`
                      )}
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
        <p style={{ color: 'var(--text-secondary)' }}>Loading Tuition & Plans...</p>
      </div>
    }>
      <SubscribeContent />
    </Suspense>
  );
}
