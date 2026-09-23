'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  X, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Building, 
  ArrowRight, 
  RefreshCw, 
  BookOpen, 
  Terminal, 
  Award,
  Zap,
  Clock
} from 'lucide-react';
import { Course, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

interface ProgrammeCheckoutModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ProgrammeCheckoutModal({
  course,
  isOpen,
  onClose,
  onSuccess,
}: ProgrammeCheckoutModalProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'demo'>('demo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [paymentRef, setPaymentRef] = useState('');

  // Form mock state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [transferRef, setTransferRef] = useState('');

  useEffect(() => {
    setCurrentUser(LocalDataService.getCurrentUser());
    setPaymentRef(`RJ-ENR-${Math.floor(100000 + Math.random() * 900000)}`);
  }, [isOpen]);

  if (!isOpen || !course) return null;

  const firstLessonId = course.sections?.[0]?.lessons?.[0]?.id || 'overview';
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(course.price || 120000);

  const handleCompletePayment = async () => {
    if (!currentUser || currentUser.id === 'guest') {
      onClose();
      router.push(`/auth?mode=signup&courseId=${course.id}&redirect=${encodeURIComponent(`/subscribe?courseId=${course.id}`)}`);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const ref = paymentMethod === 'transfer' && transferRef.trim() ? transferRef.trim() : paymentRef;
      const res = LocalDataService.processProgrammePayment(currentUser.id, course.id, course.price, ref);

      setIsProcessing(false);
      setIsSuccess(true);
      setSuccessMessage(res.message);
      if (onSuccess) onSuccess();
    }, 1000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 7, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 500,
      padding: '1rem',
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{
        background: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-accent)',
        borderRadius: '1.25rem',
        maxWidth: '620px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
      }}>
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--text-secondary)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
          }}
          aria-label="Close checkout"
        >
          <X size={16} />
        </button>

        {!isSuccess ? (
          <div style={{ padding: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                {course.track || 'Engineering Track'}
              </span>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                Cohort Enrollment Open
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
              Enroll in {course.title}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, marginBottom: '1.5rem' }}>
              Tuition payment grants verified admission, unlocks full course modules, code sandboxes, and campus intranet access.
            </p>

            {/* Price & Summary Box */}
            <div style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: '1rem',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                  Programme Tuition Fee
                </span>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                  {formattedPrice}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  One-time cohort tuition fee (Includes Intranet & Certification)
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <Clock size={14} color="var(--primary)" />
                  <span>{course.duration_weeks || 12} Weeks Intensive</span>
                </div>
                <div style={{ display: 'block', fontSize: '0.75rem', color: '#34d399', marginTop: '0.25rem' }}>
                  Reference: <code>{paymentRef}</code>
                </div>
              </div>
            </div>

            {/* Benefits Included Checklist */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '0.85rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              <span style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
                What this enrollment unlocks immediately:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#10b981" />
                <span>All {course.sections?.length || 8} structured curriculum modules, code repositories & video tutorials</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#10b981" />
                <span><strong>Campus Intranet Clearance</strong> (IDE Sandbox, CBT Exam Hub, Live Pairing Studio)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="#10b981" />
                <span>Verified Certificate of Programme Completion upon coursework submission</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.6rem' }}>
                Select Payment Channel
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('demo')}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: '0.75rem',
                    background: paymentMethod === 'demo' ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-surface)',
                    border: paymentMethod === 'demo' ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                    color: paymentMethod === 'demo' ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  <Zap size={18} color={paymentMethod === 'demo' ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span>Instant Test (1-Click)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: '0.75rem',
                    background: paymentMethod === 'card' ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-surface)',
                    border: paymentMethod === 'card' ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                    color: paymentMethod === 'card' ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  <CreditCard size={18} color={paymentMethod === 'card' ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span>Card / Online</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: '0.75rem',
                    background: paymentMethod === 'transfer' ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-surface)',
                    border: paymentMethod === 'transfer' ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                    color: paymentMethod === 'transfer' ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  <Building size={18} color={paymentMethod === 'transfer' ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span>Bank Transfer</span>
                </button>
              </div>
            </div>

            {/* Payment Details Panel */}
            {paymentMethod === 'card' && (
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.85rem',
                padding: '1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'transfer' && (
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.85rem',
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  Bursar Bank Account Details:
                </span>
                <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>
                    Bank: Zenith Bank / ReactJav Academy
                  </p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#a5b4fc', fontFamily: 'monospace' }}>
                    Account: 1029384756
                  </p>
                </div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Enter Bank Transaction Reference
                </label>
                <input
                  type="text"
                  placeholder="e.g. TXN-99882233"
                  value={transferRef}
                  onChange={(e) => setTransferRef(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            )}

            {paymentMethod === 'demo' && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '0.85rem',
                padding: '0.9rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.825rem',
                color: '#a7f3d0',
              }}>
                <Zap size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <span>
                  Instant Simulation: Generates verified tuition payment clearance immediately without external card charges.
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
                disabled={isProcessing}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCompletePayment}
                className="btn btn-primary"
                style={{ flex: 2, justifyContent: 'center', gap: '0.5rem' }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    <span>Confirming Tuition Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Pay {formattedPrice} & Enroll</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <div style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.3))',
              border: '2px solid rgba(16, 185, 129, 0.5)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
            }}>
              <CheckCircle2 size={40} color="#10b981" />
            </div>

            <span className="badge badge-emerald" style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>
              Payment Confirmed & Clearance Granted
            </span>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              Welcome to {course.title}!
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 2rem' }}>
              {successMessage || `Your tuition payment has been verified. You are now officially enrolled in ${course.title} and your Campus Intranet fellowship clearance is fully active.`}
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxWidth: '380px',
              margin: '0 auto',
            }}>
              <Link
                href={`/learn/${course.id}/${firstLessonId}`}
                onClick={onClose}
                className="btn btn-primary"
                style={{ justifyContent: 'center', gap: '0.5rem', padding: '0.85rem' }}
              >
                <BookOpen size={18} />
                <span>Start Learning Programme Now</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/intranet"
                onClick={onClose}
                className="btn btn-secondary"
                style={{ justifyContent: 'center', gap: '0.5rem', padding: '0.85rem' }}
              >
                <ShieldCheck size={18} color="var(--accent-emerald)" />
                <span>Open Campus Intranet Portal</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
