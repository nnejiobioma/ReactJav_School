'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Building,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Globe,
  Headphones,
} from 'lucide-react';
import { getTutoringWhatsAppUrl, TUTORING_WHATSAPP_DISPLAY } from '@/data/academyTracks';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'admissions',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const primaryEmail = 'admissions@reactjav.com';
  const whatsappUrl = getTutoringWhatsAppUrl('General Admissions Inquiry');

  const channels = [
    {
      title: 'Admissions & Curricula',
      email: 'admissions@reactjav.com',
      desc: 'Questions about tracks, course syllabi, prerequisites, and enrollment start dates.',
      icon: GraduationCap,
      color: '#38bdf8',
      actionText: 'admissions@reactjav.com',
      actionHref: 'mailto:admissions@reactjav.com?subject=Admissions%20Inquiry',
    },
    {
      title: 'WhatsApp Live Hotline',
      email: TUTORING_WHATSAPP_DISPLAY,
      desc: 'Chat directly with our academic mentors and student advisors for rapid guidance.',
      icon: MessageSquare,
      color: '#10b981',
      actionText: 'Chat on WhatsApp',
      actionHref: whatsappUrl,
      isExternal: true,
    },
    {
      title: 'Scholarships & Grants',
      email: 'grants@reactjav.com',
      desc: 'Apply for foundation sponsorships, corporate subsidized tuition, and fee waivers.',
      icon: HeartHandshake,
      color: '#f59e0b',
      actionText: 'grants@reactjav.com',
      actionHref: 'mailto:grants@reactjav.com?subject=Scholarship%20Grant%20Inquiry',
    },
    {
      title: 'Registrar & Certifications',
      email: 'registrar@reactjav.com',
      desc: 'CBT examination scores, employer credential verification, and transcript records.',
      icon: ShieldCheck,
      color: '#c084fc',
      actionText: 'registrar@reactjav.com',
      actionHref: 'mailto:registrar@reactjav.com?subject=Credential%20Verification%20Request',
    },
  ];

  const faqs = [
    {
      q: 'How quickly will the admissions team respond to my inquiry?',
      a: 'Our admissions desk operates across European and African time zones (UTC+0 to UTC+3). We reply to all email inquiries within 24 business hours. If you need immediate assistance or course guidance, our WhatsApp hotline connects directly with an academic mentor during active hours.',
    },
    {
      q: 'Can I schedule a live 1-on-1 video consultation with an instructor?',
      a: 'Yes. If you are exploring our Direct Tutoring programmes or need curriculum recommendations based on your current technical experience, select "1-on-1 Direct Tutoring" in the contact form or chat on WhatsApp to schedule a 20-minute Zoom/Google Meet consultation.',
    },
    {
      q: 'How can employers verify a student’s ReactJav CBT certification?',
      a: 'Employers can email registrar@reactjav.com with the student’s full name and certificate verification ID, or scan the cryptographic verification QR code present on all official ReactJav certificates for instant verification.',
    },
    {
      q: 'Do you offer corporate cohort training for engineering teams?',
      a: 'Yes! We design bespoke technical workshops on PostgreSQL architecture, Next.js full-stack development, and cloud security for corporate engineering departments. Select "Enterprise & Hiring Partnerships" in the form above.',
    },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(primaryEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in your name, email, and message before sending.');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch & log to local records
    setTimeout(() => {
      try {
        const inquiries = JSON.parse(localStorage.getItem('reactjav_inquiries') || '[]');
        inquiries.push({
          ...formData,
          id: 'inq_' + Date.now(),
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('reactjav_inquiries', JSON.stringify(inquiries));
      } catch {}

      setIsSubmitting(false);
      setSubmitted(true);
    }, 750);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.25rem 7rem', maxWidth: '1180px' }}>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link
          href="/"
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.8rem', gap: '0.4rem', borderRadius: '0.5rem' }}
          id="contact-breadcrumb-home"
        >
          <span>Home</span>
        </Link>
        <span style={{ color: 'var(--border-subtle)' }}>/</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700 }}>
          Contact Us
        </span>
      </nav>

      {/* ========================================================================= */}
      {/* 1. HERO HEADER */}
      {/* ========================================================================= */}
      <header style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1.1rem',
          borderRadius: '9999px',
          background: 'rgba(79, 70, 229, 0.1)',
          border: '1px solid rgba(79, 70, 229, 0.28)',
          color: 'var(--primary)',
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '1.25rem',
        }}>
          <Headphones size={14} />
          <span>Admissions, Advisory & Student Support</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.8vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          maxWidth: '840px',
          margin: '0 auto 1.25rem',
          letterSpacing: '-0.03em',
        }}>
          We’re Here to Help You <br />
          <span className="text-gradient">Launch Your Tech Career.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(0.98rem, 1.8vw, 1.15rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '720px',
          margin: '0 auto 2rem',
        }}>
          Have questions about our syllabus, 1-on-1 mentorship, foundation sponsorship grants, or platform access? Our admissions and academic faculty are ready to assist.
        </p>

        {/* Quick Email Copy Chip */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--bg-surface)',
          padding: '0.55rem 1.15rem',
          borderRadius: '9999px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <Mail size={16} color="var(--primary)" />
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {primaryEmail}
          </span>
          <button
            onClick={handleCopyEmail}
            className="btn btn-sm"
            style={{
              padding: '0.25rem 0.65rem',
              fontSize: '0.75rem',
              borderRadius: '9999px',
              background: copiedEmail ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface-elevated)',
              color: copiedEmail ? '#10b981' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              gap: '0.35rem',
            }}
            title="Copy Admissions Email"
            id="contact-copy-email-button"
          >
            {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
            <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CHANNELS DIRECTORY GRID */}
      {/* ========================================================================= */}
      <section aria-label="Official Communication Channels" style={{ marginBottom: '5.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.25rem',
        }}>
          {channels.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '2rem 1.6rem',
                  borderRadius: '1.25rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div>
                  <div style={{
                    width: '3.2rem',
                    height: '3.2rem',
                    borderRadius: '0.85rem',
                    background: `${ch.color}15`,
                    border: `1px solid ${ch.color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}>
                    <Icon size={22} color={ch.color} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                    {ch.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {ch.desc}
                  </p>
                </div>

                <a
                  href={ch.actionHref}
                  target={ch.isExternal ? '_blank' : undefined}
                  rel={ch.isExternal ? 'noopener noreferrer' : undefined}
                  className="btn btn-secondary btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    borderRadius: '0.75rem',
                    gap: '0.45rem',
                    color: ch.color,
                  }}
                  id={`contact-channel-${idx}`}
                >
                  <span>{ch.actionText}</span>
                  {ch.isExternal ? <ExternalLink size={13} /> : <ArrowRight size={14} />}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN FORM & ADMISSION DESK SPLIT */}
      {/* ========================================================================= */}
      <section style={{ marginBottom: '6.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'flex-start',
        }}>
          
          {/* Left Column: Interactive Contact Form */}
          <div className="glass-card" style={{
            padding: '2.5rem',
            borderRadius: '1.5rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.4rem',
              }}>
                <Send size={13} />
                <span>Online Dispatch Desk</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                Send Us an Inquiry
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Fill in the details below and an admissions officer will respond to your inbox.
              </p>
            </div>

            {submitted ? (
              <div style={{
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                borderRadius: '1.25rem',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}>
                <div style={{
                  width: '3.75rem',
                  height: '3.75rem',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <CheckCircle2 size={36} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Inquiry Dispatched Successfully!
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been routed to our <strong>{formData.department.replace('_', ' ').toUpperCase()}</strong> office. We will reach back to <strong>{formData.email}</strong> within 24 hours.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        department: 'admissions',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="btn btn-secondary btn-sm"
                    id="contact-send-another"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ background: '#10b981', borderColor: '#10b981', gap: '0.45rem' }}
                    id="contact-instant-whatsapp"
                  >
                    <MessageSquare size={14} />
                    <span>Open Instant WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      Full Name <span style={{ color: '#f43f5e' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-main)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      Email Address <span style={{ color: '#f43f5e' }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-main)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label htmlFor="contact-phone" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      placeholder="+358 ... or local number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-main)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-department" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      Inquiry Department <span style={{ color: '#f43f5e' }}>*</span>
                    </label>
                    <select
                      id="contact-department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-main)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    >
                      <option value="admissions">Admissions & Course Inquiries</option>
                      <option value="tutoring">1-on-1 Direct Tutoring Track</option>
                      <option value="scholarships">Foundation Scholarship Grants</option>
                      <option value="enterprise">Enterprise & Hiring Partnerships</option>
                      <option value="registrar">CBT Verification & Certificates</option>
                      <option value="technical">Technical Support & Campus Access</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    placeholder="e.g. Inquiring about PostgreSQL Cloud track starting date"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-main)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Your Message <span style={{ color: '#f43f5e' }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell us about your background, desired learning pathway, and any questions you have for our admissions faculty..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-main)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    padding: '0.85rem 1.5rem',
                    fontSize: '0.95rem',
                    borderRadius: '0.75rem',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                  id="contact-submit-button"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Dispatching Inquiry...' : 'Submit Academic Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office Location & Quick Contact Guide */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Global Campus Office Card */}
            <div className="glass-card" style={{
              padding: '2rem',
              borderRadius: '1.25rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.65rem',
                  background: 'rgba(79, 70, 229, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Globe size={18} color="var(--primary)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    ReactJav Global Academic Hubs
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Helsinki, Finland & Worldwide Remote Pods
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={17} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Executive Campus Operations:</strong>
                    <div>Helsinki Innovation Quarter, Uusimaa, Finland</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Clock size={17} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Admissions Desk Hours:</strong>
                    <div>Monday – Friday: 08:00 – 19:00 (UTC+2)</div>
                    <div>Saturday: 09:00 – 15:00 (UTC+2)</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <ShieldCheck size={17} color="#c084fc" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>24-Hour SLA Commitment:</strong>
                    <div>Every technical ticket and inquiry receives a verified human response within 24 hours.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout Banner */}
            <div className="glass-card" style={{
              padding: '2rem',
              borderRadius: '1.25rem',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.05) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <MessageSquare size={20} color="#10b981" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Prefer Live WhatsApp Chat?
                </h3>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Get real-time feedback on curriculum tracks, tuition plans, or technical requirements directly from our faculty team on WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  background: '#10b981',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                }}
                id="contact-whatsapp-direct-link"
              >
                <MessageSquare size={16} />
                <span>Chat via WhatsApp ({TUTORING_WHATSAPP_DISPLAY})</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Student Intranet Direct Help */}
            <div style={{
              padding: '1.5rem',
              borderRadius: '1.25rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                <Sparkles size={16} color="var(--primary)" />
                <span>Already an Enrolled Fellow?</span>
              </div>
              <p style={{ margin: '0 0 0.85rem 0', lineHeight: 1.5 }}>
                For technical issues inside the Campus Intranet, CBT exam reviews, or live breakout pairing access, sign into your student dashboard for priority ticket escalation.
              </p>
              <Link
                href="/dashboard"
                style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                id="contact-student-portal-link"
              >
                <span>Go to Student Dashboard</span>
                <ArrowRight size={13} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--accent-amber)',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.5rem',
          }}>
            <HelpCircle size={14} />
            <span>Admissions Clarifications</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Quick answers to common questions about admissions, response times, and mentorship.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="glass-card"
                style={{
                  borderRadius: '1rem',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  aria-expanded={isOpen}
                  id={`contact-faq-toggle-${i}`}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    color="var(--text-muted)"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.35rem',
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '1rem',
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BOTTOM NAVIGATION CTA */}
      {/* ========================================================================= */}
      <section style={{ textAlign: 'center' }}>
        <div style={{
          padding: '3.5rem 2rem',
          borderRadius: '1.75rem',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.25)',
          boxShadow: 'var(--shadow-md)',
        }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Ready to Begin Your Technical Journey?
          </h2>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Browse our open engineering specializations, or connect with our academic team for immediate track recommendations.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/courses"
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.75rem', borderRadius: '0.85rem', gap: '0.5rem' }}
              id="contact-bottom-browse-programmes"
            >
              <span>Browse All Programmes</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/academy"
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.75rem', borderRadius: '0.85rem', gap: '0.5rem' }}
              id="contact-bottom-direct-tutoring"
            >
              <GraduationCap size={18} color="var(--accent-emerald)" />
              <span>1-on-1 Direct Tutoring</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
