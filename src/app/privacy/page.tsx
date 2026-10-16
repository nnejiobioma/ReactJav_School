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
  HeartHandshake
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const lastUpdatedDate = 'October 16, 2026';
  const effectiveDate = 'October 16, 2026';

  const sections = [
    { id: 'scope', title: '1. Scope & Educational Mission' },
    { id: 'controller', title: '2. Data Controller & Governance' },
    { id: 'collected-data', title: '3. Personal & Academic Data We Collect' },
    { id: 'usage', title: '4. How We Process & Use Your Information' },
    { id: 'cbt-proctoring', title: '5. Proctored CBT & Assessment Integrity' },
    { id: 'minors', title: '6. Children & Minors Privacy (COPPA & GDPR-K)' },
    { id: 'security-rls', title: '7. PostgreSQL Row-Level Security & Technical Controls' },
    { id: 'subprocessors', title: '8. Subprocessors & Service Providers' },
    { id: 'retention', title: '9. Data Retention & Erasure' },
    { id: 'your-rights', title: '10. Your Statutory Rights & Data Portability' },
    { id: 'contact', title: '11. Contact Our Data Protection Officer' },
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
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            color: '#c084fc',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            <ShieldCheck size={14} color="#a855f7" />
            <span>Student Data Protection Charter</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Version 2.4 • Legally Binding
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          marginBottom: '1rem',
        }}>
          ReactJav Online School{' '}
          <span className="text-gradient">Privacy Policy</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '750px',
          margin: 0,
        }}>
          This Privacy Policy describes how ReactJav School collects, protects, uses, and guarantees sovereignty over your personal, academic, and testing records when accessing our learning management systems, computer-based testing (CBT) engines, in-browser cloud IDEs, and 1-on-1 tutoring pods.
        </p>

        {/* Timestamps Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.85rem',
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Effective Date</span>
            <strong style={{ color: 'var(--text-primary)' }}>{effectiveDate}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Last Reviewed & Updated</span>
            <strong style={{ color: '#10b981' }}>{lastUpdatedDate}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Compliance Framework</span>
            <strong style={{ color: 'var(--primary)' }}>GDPR, NDPR, FERPA & COPPA Aligned</strong>
          </div>
        </div>
      </div>

      {/* Mandatory Acceptance Summary Box */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        borderRadius: '1.1rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
      }}>
        <CheckCircle2 size={24} color="#10b981" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
        <div>
          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Mandatory Acceptance Notice for All Learners & Faculty
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0', lineHeight: 1.55 }}>
            By registering an account on ReactJav, enrolling in academic courses, or utilizing the campus intranet, you must explicitly accept these terms. <strong>If you do not accept this Privacy Policy, your account creation will be declined and access to all protected facilities, examinations, and code repositories will not be granted.</strong>
          </p>
        </div>
      </div>

      {/* Quick Jump Table of Contents */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        marginBottom: '3rem',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
          Table of Contents
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '0.65rem',
          fontSize: '0.85rem',
        }}>
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '0.35rem 0.65rem',
                borderRadius: '0.5rem',
                background: 'var(--bg-surface-elevated)',
                display: 'block',
                fontWeight: 600,
                transition: 'all 0.15s ease',
              }}
            >
              {sec.title}
            </a>
          ))}
        </div>
      </div>

      {/* ================= SECTION CONTENT ================= */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
        
        {/* Section 1 */}
        <section id="scope" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={22} color="var(--primary)" />
            <span>1. Scope & Educational Mission</span>
          </h2>
          <p>
            ReactJav School operates an international digital academy and technical vocational institution. We provide comprehensive education in Software Engineering, AI & Data Science, Cloud Infrastructure, Game Development, and UI/UX Architecture.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            This Privacy Policy applies to all services provided under the ReactJav brand, including:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>The public course catalog and syllabus previews located at <code>/courses</code>.</li>
            <li>The gated Campus Intranet, lesson player, and in-browser code sandboxes at <code>/intranet</code>.</li>
            <li>The Computer-Based Testing (CBT) certification examination system at <code>/cbt</code>.</li>
            <li>Direct 1-on-1 tutoring, code-pairing sessions, and attendance tracking at <code>/academy</code> and <code>/tutoring</code>.</li>
            <li>Student dashboards, tuition sponsorships, and billing facilities at <code>/subscribe</code>.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="controller" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building size={22} color="var(--accent-purple)" />
            <span>2. Data Controller & Governance</span>
          </h2>
          <p>
            ReactJav School is the designated <strong>Data Controller</strong> responsible for your personal information. We maintain rigorous administrative, technical, and physical safeguards designed to guarantee the confidentiality, integrity, and availability of all learner and institutional records.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            We adhere to strict data-minimization principles: we only collect information directly necessary to establish student enrollment, administer examinations, issue verified credentials, and guarantee safe, proctored virtual learning environments.
          </p>
        </section>

        {/* Section 3 */}
        <section id="collected-data" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={22} color="var(--accent-cyan)" />
            <span>3. Personal & Academic Data We Collect</span>
          </h2>
          <p>Depending on your persona (student, parent/guardian, or instructor), we collect the following categories of data:</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}>
            <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                A. Identity & Registration Data
              </strong>
              <span style={{ fontSize: '0.85rem' }}>
                Full name, verified email address, phone number, geographic country and state, highest completed education level, career objective, and account authentication credentials (salted and hashed).
              </span>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                B. Learning & Academic Progress
              </strong>
              <span style={{ fontSize: '0.85rem' }}>
                Course enrollment records, completed lesson modules, quiz submissions, project milestone deliverables, live code execution history, and GitHub/GitLab portfolio links.
              </span>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                C. Proctored CBT Testing Telemetry
              </strong>
              <span style={{ fontSize: '0.85rem' }}>
                Timed exam session start/end timestamps, answer choices, score percentiles, tamper-verification hashes, and cryptographically signed certificate serials.
              </span>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: '0.85rem', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                D. 1-on-1 Tutoring & Parental Data
              </strong>
              <span style={{ fontSize: '0.85rem' }}>
                For minors and tutoring scholars: parent/guardian full name, contact phone, verified email consent, age tier, mentor pairing notes, and dual-signoff monthly attendance ledgers.
              </span>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="usage" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={22} color="var(--primary)" />
            <span>4. How We Process & Use Your Information</span>
          </h2>
          <p>We process your data strictly on the lawful bases of <strong>Contractual Performance</strong> (delivering tuition and courses), <strong>Legal Compliance</strong>, and <strong>Explicit Consent</strong>:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Curriculum Delivery:</strong> Granting authenticated access to enrolled video streams, interactive syllabi, and cloud sandboxes.</li>
            <li><strong>Certification:</strong> Evaluating exam answers, computing GPA/grades, and rendering verifiable certificates of technical accomplishment.</li>
            <li><strong>Mentorship Scheduling:</strong> Coordinating live audio/video breakout rooms and pairing fellows with qualified instructors.</li>
            <li><strong>Financial Auditing & Grants:</strong> Verifying eligibility for foundation-backed sponsorship grants and processing tuition subscriptions.</li>
            <li><strong>Security & Abuse Prevention:</strong> Detecting fraudulent exam circumvention, unauthorized account sharing, and network intrusions.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section id="cbt-proctoring" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={22} color="#f59e0b" />
            <span>5. Proctored CBT & Assessment Integrity</span>
          </h2>
          <p>
            ReactJav certificates carry weight with international engineering employers because our Computer-Based Testing (CBT) engine enforces strict proctoring integrity. During a timed assessment:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>We record countdown telemetry, question transition velocity, and answer selections.</li>
            <li>Browser window focus and tab switches may be logged to guarantee test isolation.</li>
            <li><strong>We do NOT install invasive spyware, kernel-level drivers, or record continuous ambient room video without permission.</strong> Proctoring telemetry is deleted or archived once certification grades are verified.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section id="minors" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={22} color="#10b981" />
            <span>6. Children & Minors Privacy (COPPA & GDPR-K Compliance)</span>
          </h2>
          <p>
            ReactJav Academy proudly offers foundational coding tracks for younger learners (Zone 01: Junior Dev, ages 5–10; and Zone 02: Teens, ages 11–17). In compliance with the Children’s Online Privacy Protection Act (COPPA) and international child privacy regulations:
          </p>
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '0.85rem',
            padding: '1.25rem',
            marginTop: '0.75rem',
          }}>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.88rem' }}>
              <li>Accounts for learners under 18 require verifiable <strong>Parental or Legal Guardian Consent</strong>.</li>
              <li>A parent or legal guardian must provide their verified email address and telephone contact during direct tutoring enrollment.</li>
              <li>Parents maintain the unilateral right to inspect, review, or request the immediate deletion of their child’s personal records at any time.</li>
              <li>Under no circumstances is minor student data shared with third-party advertisers or commercial marketing brokers.</li>
            </ul>
          </div>
        </section>

        {/* Section 7 */}
        <section id="security-rls" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={22} color="var(--primary)" />
            <span>7. PostgreSQL Row-Level Security & Technical Controls</span>
          </h2>
          <p>
            Unlike conventional platforms that rely purely on application-level routing, ReactJav implements database-grade security architecture:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li><strong>PostgreSQL Row-Level Security (RLS):</strong> Every student database table enforces strict policies requiring <code>auth.uid() = user_id</code>. No user or fellow can read or query records belonging to another student.</li>
            <li><strong>End-to-End Transport Encryption:</strong> All platform data in transit is encrypted with TLS 1.3/HTTPS using modern SHA-256 cipher suites.</li>
            <li><strong>Encrypted At-Rest Storage:</strong> Database volumes, backup archives, and code sandboxes are encrypted at rest using AES-256 standards.</li>
            <li><strong>Zero Plaintext Passwords:</strong> Authentication utilizes cryptographically secure salted hashes through enterprise Supabase Auth infrastructure.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section id="subprocessors" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HeartHandshake size={22} color="var(--accent-purple)" />
            <span>8. Subprocessors & Service Providers</span>
          </h2>
          <p>
            We never sell or rent your personal information. We only share necessary data with trusted cloud infrastructure providers who agree to identical data protection covenants:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Supabase:</strong> Managed PostgreSQL cloud database, authentication service, and row-level security policy engine.</li>
            <li><strong>Vercel:</strong> Global serverless edge hosting and dynamic application routing.</li>
            <li><strong>Daily / WebRTC:</strong> Peer-to-peer real-time video and audio streaming for live breakout classrooms.</li>
          </ul>
        </section>

        {/* Section 9 */}
        <section id="retention" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={22} color="var(--accent-cyan)" />
            <span>9. Data Retention & Erasure</span>
          </h2>
          <p>
            We retain active student accounts for as long as you maintain enrollment or certification status with ReactJav. Upon student withdrawal or account deletion requests:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Authentication identifiers and personal profile details are permanently purged within 30 calendar days.</li>
            <li>Issued certificate verification records (certificate serial numbers and milestone proofs) remain permanently verifiable so that your past achievements remain valid for prospective employers.</li>
          </ul>
        </section>

        {/* Section 10 */}
        <section id="your-rights" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={22} color="#10b981" />
            <span>10. Your Statutory Rights & Data Portability</span>
          </h2>
          <p>As a ReactJav scholar or parent, you enjoy comprehensive data protection rights:</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}>
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--primary)' }}>Right to Access & Export:</strong>
              <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0' }}>Request a complete digital export of your study records, CBT exam attempts, and certificates.</p>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--primary)' }}>Right to Rectification:</strong>
              <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0' }}>Update inaccurate or outdated contact, telephone, or education records at any time via your student profile.</p>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--primary)' }}>Right to Erasure:</strong>
              <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0' }}>Request the total deletion of your personal account data when leaving the institution.</p>
            </div>
          </div>
        </section>

        {/* Section 11 */}
        <section id="contact" style={{ scrollMarginTop: '6rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={22} color="var(--primary)" />
            <span>11. Contact Our Data Protection Officer</span>
          </h2>
          <p>
            For privacy inquiries, parental consent verification, or exercising your statutory rights under GDPR, NDPR, or COPPA, please contact our Institutional Data Protection Office:
          </p>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-accent)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.9rem',
          }}>
            <div><strong>Institutional Authority:</strong> ReactJav School Global Data Office</div>
            <div><strong>Official Inquiries Email:</strong> <code style={{ color: 'var(--primary)' }}>privacy@reactjav.school</code> / <code style={{ color: 'var(--primary)' }}>compliance@reactjav.com</code></div>
            <div><strong>Academy Support Hotline:</strong> +358 0465695068</div>
            <div><strong>Response Standard:</strong> Formal inquiries acknowledged within 48 business hours.</div>
          </div>
        </section>
      </div>

      {/* Bottom Affirmation CTA Box */}
      <div style={{
        marginTop: '4rem',
        padding: '2.5rem 2rem',
        borderRadius: '1.5rem',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
        border: '1px solid var(--border-accent)',
        textAlign: 'center',
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 0.5rem' }}>
          Ready to Begin Your Technical Journey?
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
          Create your verified student account, accept the Privacy Policy, and unlock full access to our curricula, live coding environments, and mentorship.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            href="/auth?mode=signup"
            className="btn btn-primary"
            style={{ padding: '0.85rem 2rem', fontWeight: 800, borderRadius: '9999px', gap: '0.5rem' }}
          >
            <span>Proceed to Account Registration</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/courses"
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.75rem', borderRadius: '9999px' }}
          >
            <span>Explore Curricula First</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
