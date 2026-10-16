'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  ArrowLeft, 
  ArrowRight,
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  GraduationCap, 
  Sparkles, 
  Database, 
  Eye, 
  Clock, 
  Globe, 
  Mail, 
  Building,
  KeyRound,
  HeartHandshake,
  Scale,
  Award,
  CreditCard,
  Ban
} from 'lucide-react';

export default function TermsOfServicePage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const lastUpdatedDate = 'October 16, 2026';
  const effectiveDate = 'October 16, 2026';

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms & Educational Agreement' },
    { id: 'eligibility', title: '2. Eligibility & Account Security' },
    { id: 'honor-code', title: '3. Academic Integrity & Student Honor Code' },
    { id: 'intranet-conduct', title: '4. Campus Intranet, Live Rooms & Cloud IDE Conduct' },
    { id: 'cbt-testing', title: '5. Computer-Based Testing (CBT) & Certification Rules' },
    { id: 'tuition-billing', title: '6. Tuition Fees, Subscriptions & Payment Processing' },
    { id: 'refunds-withdrawal', title: '7. Cancellation, Refund & Academic Withdrawal' },
    { id: 'intellectual-property', title: '8. Intellectual Property & Code Ownership' },
    { id: 'termination', title: '9. Suspension & Disciplinary Termination' },
    { id: 'disclaimers', title: '10. Career Disclaimers & Limitation of Liability' },
    { id: 'governing-law', title: '11. Governing Law & Dispute Resolution' },
    { id: 'contact', title: '12. Legal Inquiries & School Administration' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.25rem 6rem', maxWidth: '960px' }}>
      {/* Top Navigation & Breadcrumbs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--primary)',
            fontSize: '0.86rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handlePrint}
            className="btn btn-secondary btn-sm"
            style={{ gap: '0.4rem', fontSize: '0.82rem' }}
          >
            <Printer size={14} />
            <span>Print or Save PDF</span>
          </button>

          <Link
            href="/auth?mode=signup"
            className="btn btn-primary btn-sm"
            style={{ gap: '0.4rem', fontSize: '0.82rem' }}
          >
            <KeyRound size={14} />
            <span>Create Account</span>
          </Link>
        </div>
      </div>

      {/* Main Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, var(--bg-surface) 100%)',
        border: '1px solid var(--border-accent)',
        borderRadius: '1.5rem',
        padding: 'clamp(2rem, 4vw, 3rem)',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg), 0 0 35px rgba(124, 58, 237, 0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(129, 140, 248, 0.35)',
            color: '#a5b4fc',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <Scale size={13} />
            Academic & Legal Agreement
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}>
            <CheckCircle2 size={12} />
            Version 2.4 Active
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.15,
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          Terms of Service & Enrollment Agreement
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '720px',
          marginBottom: '1.75rem',
        }}>
          Welcome to ReactJav School. These Terms of Service constitute a legally binding agreement between you and ReactJav Academy. 
          By creating an account, paying tuition, or accessing our online learning management system, proctored computer-based testing, 
          and campus intranet, you agree to comply with and be bound by these terms.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Clock size={15} color="var(--primary)" />
            <span>Effective Date: <strong style={{ color: '#ffffff' }}>{effectiveDate}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Building size={15} color="var(--primary)" />
            <span>Institution: <strong style={{ color: '#ffffff' }}>ReactJav Institute of Software Engineering</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <FileText size={15} color="var(--primary)" />
            <span>Related: <Link href="/privacy" style={{ color: '#a5b4fc', textDecoration: 'underline' }}>Privacy Policy</Link></span>
          </div>
        </div>
      </div>

      {/* Mandatory Acceptance Notice Banner */}
      <div style={{
        background: 'rgba(99, 102, 241, 0.08)',
        border: '1px solid rgba(129, 140, 248, 0.25)',
        borderRadius: '1rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
      }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '0.75rem',
          background: 'rgba(99, 102, 241, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Lock size={20} color="#a5b4fc" />
        </div>
        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>
            Mandatory Acceptance Requirement
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
            Under institutional policy, acceptance of both these <strong>Terms of Service</strong> and our <strong>Privacy Policy</strong> is required during registration. Access to coursework, live instructor lectures, CBT certifications, and the campus student intranet will <strong>not be granted</strong> if you do not agree to these terms.
          </p>
        </div>
      </div>

      {/* Quick Navigation Drawer */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '1rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '3rem',
      }}>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'block',
          marginBottom: '0.85rem',
        }}>
          Table of Contents
        </span>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '0.5rem 1.5rem',
        }}>
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              style={{
                fontSize: '0.84rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '0.25rem 0',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#a5b4fc')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {sec.title}
            </a>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Section 1 */}
        <section id="acceptance" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                1. Acceptance of Terms & Educational Agreement
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              These Terms of Service (the &quot;Terms&quot;) govern your access to and use of all websites, learning portals, interactive coding workspaces, campus intranet channels, automated grading systems, and educational services operated by ReactJav School (collectively, the &quot;Platform&quot;).
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
              By registering an account, submitting an application, clicking &quot;I Agree&quot;, or participating in classes, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <Link href="/privacy" style={{ color: '#a5b4fc', textDecoration: 'underline' }}>Privacy Policy</Link>. If you do not agree, you are not authorized to access ReactJav services and account registration will be denied.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section id="eligibility" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                2. Eligibility & Account Security
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              <strong>2.1 General Age Requirement:</strong> You must be at least 18 years of age or possess legal parental/guardian consent to register for adult career tracks. For youth programmes (such as <em>Junior Dev Zone 01</em>), enrollment must be completed by a parent, school sponsor, or legal guardian.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              <strong>2.2 One Individual per Account:</strong> Each student account is personal to the registered learner. You may not share your login credentials, API access tokens, or intranet clearance with any third party. Sharing accounts for multiple simultaneous test takers or course viewers is strictly prohibited and leads to immediate account termination without refund.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
              <strong>2.3 Accuracy of Information:</strong> You agree to provide true, accurate, current, and complete information during registration and to promptly update your student profile upon changes.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="honor-code" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                3. Academic Integrity & Student Honor Code
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              ReactJav upholds the highest standards of engineering rigor and academic honesty. Every student commits to the ReactJav Honor Code upon enrollment:
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, paddingLeft: '1.25rem', margin: '0 0 1rem' }}>
              <li><strong>Original Work:</strong> All code, essays, algorithms, capstone repositories, and answers submitted must be the student&apos;s own independent work, unless explicitly designated as group collaboration by faculty.</li>
              <li><strong>Generative AI Policy:</strong> AI coding assistants (e.g., Copilot, LLM code generators) may only be used when permitted by the specific curriculum module. Employing AI to bypass proctored tests, solve timed challenges, or generate uncredited code submissions constitutes academic fraud.</li>
              <li><strong>Zero Plagiarism:</strong> Copying code verbatim from public repositories or peer submissions without attribution is grounds for a zero score, suspension, or expulsion.</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section id="intranet-conduct" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                4. Campus Intranet, Live Rooms & Cloud IDE Conduct
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              The ReactJav Campus Intranet and integrated web IDE are reserved exclusively for authorized, active students and faculty. When interacting on our network, you agree to:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ display: 'block', color: '#ffffff', fontSize: '0.88rem', marginBottom: '0.25rem' }}>Respectful Community</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Zero tolerance for harassment, hate speech, bullying, or intimidation of fellow learners or staff.</span>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ display: 'block', color: '#ffffff', fontSize: '0.88rem', marginBottom: '0.25rem' }}>No System Abuse</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>No cryptocurrency mining, denial-of-service testing, or port scanning against ReactJav sandbox servers.</span>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg-surface)', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ display: 'block', color: '#ffffff', fontSize: '0.88rem', marginBottom: '0.25rem' }}>No Spam or Solicitations</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Intranet channels cannot be used for commercial advertising, marketing campaigns, or unauthorized recruitment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="cbt-testing" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                5. Computer-Based Testing (CBT) & Certification Rules
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              ReactJav issues digital course diplomas, industry certificates, and exam score transcripts based on performance in our proprietary CBT engine:
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, paddingLeft: '1.25rem', margin: '0 0 1rem' }}>
              <li><strong>Proctoring Telemetry:</strong> By starting a CBT exam, you consent to automatic logging of browser visibility states, window blur events, and attempt duration to ensure exam validity.</li>
              <li><strong>Assessment Integrity Violations:</strong> Exiting the examination tab beyond permitted limits, attempting to capture questions, or utilizing external unauthorized assistance will result in automatic test invalidation.</li>
              <li><strong>Certificate Authenticity:</strong> All ReactJav certificates carry unique verification hashes verifiable on our public validation registry. Falsifying or modifying certificates will result in permanent ban and notice to industry partners.</li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section id="tuition-billing" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                6. Tuition Fees, Subscriptions & Payment Processing
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              <strong>6.1 Tuition Structure:</strong> Course fees, cohort seat deposits, and monthly subscriptions are listed on the enrollment checkout page. All payments are billed in the stated currency and processed through PCI-DSS compliant gateways (such as Stripe and Paystack).
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              <strong>6.2 Recurring Subscriptions:</strong> Ongoing learning club and lab compute subscriptions renew automatically on your billing cycle unless cancelled prior to the renewal date via your billing portal.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
              <strong>6.3 Payment Delinquency:</strong> Failure to settle tuition installments or declined payment renewals may result in temporary suspension of course access, lab compute environments, and intranet privileges until the account balance is rectified.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="refunds-withdrawal" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scale size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                7. Cancellation, Refund & Academic Withdrawal
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              We believe in the transformative value of our courses and offer clear academic withdrawal guidelines:
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, paddingLeft: '1.25rem', margin: '0 0 1rem' }}>
              <li><strong>14-Day Cohort Evaluation Window:</strong> For live cohort bootcamps, students may request a refund within 14 calendar days of cohort commencement, provided they have attended fewer than 20% of class sessions and completed no more than 2 assignments.</li>
              <li><strong>Self-Paced Courses:</strong> Self-paced digital curriculum purchases are eligible for a full refund within 7 days of purchase if less than 15% of the video curriculum and code exercises have been accessed.</li>
              <li><strong>Non-Refundable Items:</strong> Custom 1-on-1 mentorship hours already delivered, proctored examination sitting fees, and non-refundable cohort seat reservation deposits are not subject to refund.</li>
            </ul>
          </div>
        </section>

        {/* Section 8 */}
        <section id="intellectual-property" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                8. Intellectual Property & Code Ownership
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              <strong>8.1 School Curriculum:</strong> All video lectures, curriculum syllabi, slide decks, instructor repositories, exercises, documentation, and the ReactJav brand are the exclusive property of ReactJav and its licensors. You are granted a limited, personal, non-transferable, non-commercial license to access the materials for your individual education. You may not distribute, re-upload, sell, or mirror school materials.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
              <strong>8.2 Student Project Ownership:</strong> You retain full intellectual property ownership over original software applications, personal projects, capstones, and portfolio code you write during your studies at ReactJav. You may showcase your portfolio to employers, publish to GitHub, or commercialize your creations.
            </p>
          </div>
        </section>

        {/* Section 9 */}
        <section id="termination" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ban size={18} color="#ef4444" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                9. Suspension & Disciplinary Termination
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              ReactJav reserves the right to suspend or terminate any user account, revoke intranet access, and cancel enrollments without notice or refund if:
            </p>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, paddingLeft: '1.25rem', margin: 0 }}>
              <li>The student violates the Academic Honor Code, engages in assessment cheating, or submits plagiarized code.</li>
              <li>The user breaches our community anti-harassment rules or engages in destructive network behavior.</li>
              <li>Tuition payments remain unpaid following written reminder notifications.</li>
              <li>The user attempts to circumvent security controls, scrape school content, or breach student privacy.</li>
            </ul>
          </div>
        </section>

        {/* Section 10 */}
        <section id="disclaimers" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                10. Career Disclaimers & Limitation of Liability
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              <strong>10.1 Career Mentorship & No Guarantee:</strong> ReactJav equips students with cutting-edge engineering skills, resume reviews, and portfolio coaching. However, graduation does not constitute a legal guarantee of employment, specific salary, or visa sponsorship. Career outcomes depend on individual student dedication, interviewing ability, and prevailing market conditions.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
              <strong>10.2 Limitation of Liability:</strong> To the maximum extent permitted by applicable law, ReactJav shall not be liable for any indirect, incidental, special, consequential, or punitive damages. In no event shall our total liability exceed the aggregate tuition fees paid by the student to ReactJav during the six (6) months preceding the claim.
            </p>
          </div>
        </section>

        {/* Section 11 */}
        <section id="governing-law" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scale size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                11. Governing Law & Dispute Resolution
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              These Terms and any non-contractual obligations arising out of or in connection with them shall be governed by and construed in accordance with applicable laws without regard to conflict of law principles.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
              Prior to initiating formal dispute proceedings, student and institution agree to engage in a good-faith informal resolution period of thirty (30) days by contacting school leadership at <strong style={{ color: '#ffffff' }}>legal@reactjav.school</strong>.
            </p>
          </div>
        </section>

        {/* Section 12 */}
        <section id="contact" style={{ scrollMarginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.65rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} color="#a5b4fc" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                12. Legal Inquiries & School Administration
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              For questions regarding enrollment contracts, corporate training agreements, academic appeals, or these Terms of Service, contact the Office of the Registrar and Legal Affairs:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              background: 'var(--bg-surface)',
              borderRadius: '0.85rem',
              border: '1px solid var(--border-subtle)',
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Legal & Compliance</span>
                <strong style={{ color: '#ffffff', fontSize: '0.92rem' }}>legal@reactjav.school</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Office of the Registrar</span>
                <strong style={{ color: '#ffffff', fontSize: '0.92rem' }}>registrar@reactjav.school</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Institutional Headquarters</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>ReactJav Institute of Software Engineering</span>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Bottom Action Footer */}
      <div style={{
        marginTop: '3.5rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%)',
        border: '1px solid var(--border-accent)',
        borderRadius: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>
            Ready to Begin Your Engineering Journey?
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
            Create your student account to register for upcoming cohorts and access our curriculum.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/privacy" className="btn btn-secondary">
            <span>View Privacy Policy</span>
          </Link>
          <Link href="/auth?mode=signup" className="btn btn-primary">
            <span>Accept Terms & Sign Up</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
