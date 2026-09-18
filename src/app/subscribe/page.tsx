'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Lock,
  Building2,
  Ticket,
  Zap,
  RefreshCw,
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import { Profile, SubscriptionPlan } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

export default function SubscribePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<'term' | 'annual' | 'lifetime'>('annual');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_transfer' | 'campus_voucher'>('credit_card');

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
    if (user.full_name) {
      setCardHolder(user.full_name);
    }
    setPlans(LocalDataService.getSubscriptionPlans());
  }, []);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[1];

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const prefix = paymentMethod === 'credit_card' ? 'TXN-CARD' : paymentMethod === 'bank_transfer' ? 'TXN-WIRE' : 'VCH-CAMPUS';
    const txnRef = `${prefix}-${randomSuffix}`;

    setTimeout(() => {
      LocalDataService.submitSubscriptionPayment(selectedPlanId, paymentMethod, txnRef);
      setGeneratedRef(txnRef);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 900);
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1rem 6rem' }}>
      {/* Page Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
          <span>ReactJav Campus Tuition & Enrollment</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
        }}>
          Subscribe to Unlock the <span className="text-gradient">Campus Intranet</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Gain unrestricted access to internal CBT testing, live virtual classrooms, faculty office hours, and engineering curriculum. All subscriptions undergo rapid Administrator clearance verification.
        </p>
      </div>

      {/* SUCCESS MODAL / OVERLAY */}
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
            Payment Successfully Processed!
          </h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Your tuition for the <strong style={{ color: 'var(--text-primary)' }}>{selectedPlan?.name}</strong> has been logged. Your application reference has been assigned to the Registrar queue for Administrator clearance grant.
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
            <Link href="/intranet" className="btn btn-primary btn-lg">
              <Clock size={18} />
              <span>Go to Campus Intranet Waiting Room</span>
              <ArrowRight size={18} />
            </Link>

            <Link href="/admin/access" className="btn btn-outline btn-lg">
              <ShieldCheck size={18} />
              <span>Review in Admin Clearance Desk</span>
            </Link>
          </div>
        </div>
      )}

      {/* PLAN SELECTOR CARDS */}
      {!isSuccess && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                    padding: '2rem',
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

          {/* CHECKOUT PAYMENT DRAWER */}
          <div className="glass-card" style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            border: '1px solid var(--border-accent)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Selected Plan
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedPlan?.name} — ${selectedPlan?.price}
                </h3>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'block' }}>
                  256-Bit SSL Encrypted
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Admin Clearance Workflow
                </span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
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
                <span>Card (Stripe)</span>
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
                    Memo: <strong>{currentUser?.email || 'student-admission'}</strong>
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
                      <span>Transacting with Campus Bursar...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Submit Payment & Request Intranet Clearance (${selectedPlan?.price})</span>
                    </>
                  )}
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Clearance policy: Subscription will enter <em>Pending Admin Approval</em>. Admin reviews credentials prior to granting campus access.
                </span>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
