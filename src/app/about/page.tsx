'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Code2,
  Rocket,
  Target,
  Users,
  Globe,
  Award,
  BookOpen,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Cpu,
  Laptop,
  Building,
  Layers,
  Lightbulb,
  Compass,
  Mail,
  ChevronDown,
  Timer,
  Video,
  FileCode,
  Shield,
  Zap,
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'practice' | 'access' | 'verification'>('philosophy');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '350,000+', label: 'Learners & Fellows Empowered', icon: Users, color: '#38bdf8' },
    { value: '85%', label: 'Employment & Career Progression Rate', icon: Rocket, color: '#10b981' },
    { value: '54+', label: 'Global Alliance Hubs & Campuses', icon: Globe, color: '#c084fc' },
    { value: '$0 Upfront', label: 'Scholarship Grants & Subsidized Tuition', icon: HeartHandshake, color: '#f59e0b' },
  ];

  const pillars = [
    {
      id: 'pillar-1',
      title: 'Production-Grade Engineering',
      description:
        'We refuse superficial slide-deck teaching. Every student designs PostgreSQL schemas with Row-Level Security, configures Next.js App Router architectures, and deploys scalable production APIs.',
      tag: 'ENTERPRISE ARCHITECTURE',
      icon: Terminal,
      accent: 'rgba(79, 70, 229, 0.15)',
      borderColor: 'rgba(79, 70, 229, 0.35)',
      iconColor: 'var(--primary)',
    },
    {
      id: 'pillar-2',
      title: 'Cohort Accountability & Pods',
      description:
        'Isolation is where self-taught developers stall. At ReactJav, you pair-program in small student squads, conduct peer pull request reviews, and join daily agile checkpoints.',
      tag: 'COLLABORATIVE CULTURE',
      icon: Users,
      accent: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.35)',
      iconColor: '#10b981',
    },
    {
      id: 'pillar-3',
      title: 'Direct 1-on-1 Faculty Mentorship',
      description:
        'Direct, unblocked learning. Our faculty includes principal engineers and cloud architects who review your code line-by-line in live screen-sharing rooms and direct WhatsApp pods.',
      tag: 'PERSONAL GUIDANCE',
      icon: GraduationCap,
      accent: 'rgba(192, 132, 252, 0.15)',
      borderColor: 'rgba(192, 132, 252, 0.35)',
      iconColor: '#c084fc',
    },
    {
      id: 'pillar-4',
      title: 'Proctored CBT & Verifiable Certs',
      description:
        'Certificates are only as valuable as the rigour behind them. Our timed 60-minute Computer-Based Testing center validates real problem-solving with tamper-proof digital credentials.',
      tag: 'VERIFIED CREDENTIALS',
      icon: ShieldCheck,
      accent: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.35)',
      iconColor: '#f59e0b',
    },
  ];

  const journeySteps = [
    {
      step: '01',
      title: 'Deep Foundational Immersion',
      badge: 'Weeks 1 – 4',
      description: 'Master core systems, modern TypeScript, algorithms, and git team workflows before writing application logic.',
    },
    {
      step: '02',
      title: 'Full-Stack Cloud & Database Design',
      badge: 'Weeks 5 – 8',
      description: 'Architect multi-tenant databases in PostgreSQL, implement Supabase RLS policies, and deploy serverless endpoints.',
    },
    {
      step: '03',
      title: 'Timed CBT & Security Clearance',
      badge: 'Weeks 9 – 10',
      description: 'Take timed Computer-Based Testing exams under strict proctoring to earn your accredited digital certification.',
    },
    {
      step: '04',
      title: 'Capstone Delivery & Career Launch',
      badge: 'Weeks 11 – 12',
      description: 'Ship a live, production-grade SaaS product to real users, prepare resume narratives, and enter global job pipelines.',
    },
  ];

  const facultyMembers = [
    {
      name: 'Obioma Nneji',
      role: 'Founding Dean & Principal Systems Architect',
      specialty: 'Distributed Systems, Cloud Infrastructure & RLS Security',
      bio: 'Pioneered ReactJav’s flagship PostgreSQL architecture and dual-campus learning model. Over a decade of engineering leadership across enterprise platforms.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      badge: 'Academic Lead',
    },
    {
      name: 'Dr. Sarah Al-Mansoor',
      role: 'Director of AI & Computational Curricula',
      specialty: 'Machine Learning Pipelines, Python & Data Analytics',
      bio: 'Former senior research scientist leading applied AI cohorts. Passionate about translating complex algorithmic theory into practical production models.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      badge: 'Faculty Chair',
    },
    {
      name: 'Marcus Vance',
      role: 'Lead Cloud & DevOps Faculty',
      specialty: 'Next.js App Router, Microservices & Docker Infrastructure',
      bio: 'Senior full-stack engineering consultant who has mentored over 1,200 junior developers into high-impact remote engineering roles.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      badge: 'Industry Mentor',
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Product Design & Human Factors',
      specialty: 'Design Systems, Accessibility (a11y) & UX Research',
      bio: 'Designs intuitive interfaces and teaches engineering fellows how to craft human-centered digital experiences that wow global clients.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      badge: 'Design Director',
    },
  ];

  const faqs = [
    {
      q: 'What sets ReactJav School apart from typical coding bootcamps?',
      a: 'Most bootcamps charge tens of thousands of dollars upfront and leave students stranded in passive video tutorials. ReactJav is an outcome-engineered academy built around "Learning Hard Things First". We combine open public syllabi, a private campus intranet with timed CBT testing, live virtual pairing pods, and foundation-backed sponsorship grants so that world-class software engineering education is accessible to everyone regardless of financial background.',
    },
    {
      q: 'How does the dual Public Catalog and Campus Intranet architecture work?',
      a: 'We believe in complete transparency. Our Public Catalog is open to all visitors to inspect full course outlines, lesson objectives, instructor profiles, and free preview lectures without login requirements. The Campus Intranet is our gated internal facility where enrolled fellows access timed 60-minute proctored CBT examination centers, live virtual breakout rooms with 1080p screen-sharing, and private code repositories.',
    },
    {
      q: 'What is 1-on-1 Direct Tutoring and how can I get enrolled?',
      a: 'Our Direct Tutoring track connects you with dedicated senior software engineers for personalized curriculum pacing, code reviews, and weekly live pairing sessions. Students can apply directly through our Academy portal or connect with our Academic Admissions team via WhatsApp for tailored track placement.',
    },
    {
      q: 'Are the certifications accredited and verifiable by employers?',
      a: 'Yes. Every ReactJav certificate is tied to verifiable project submissions and a passing score on our proctored Computer-Based Testing (CBT) examinations. Certificates feature unique digital verification IDs and cryptographic hashes that employers and academic institutions can validate in real-time.',
    },
    {
      q: 'How do foundation-backed sponsorship grants work?',
      a: 'Through partnerships with global philanthropic foundations and technology industry sponsors, we provide subsidized and 100% sponsored scholarship grants for motivated learners in underrepresented and emerging tech communities worldwide.',
    },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.25rem 7rem', maxWidth: '1180px' }}>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link
          href="/"
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.8rem', gap: '0.4rem', borderRadius: '0.5rem' }}
          id="about-breadcrumb-home"
        >
          <span>Home</span>
        </Link>
        <span style={{ color: 'var(--border-subtle)' }}>/</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700 }}>
          About ReactJav
        </span>
      </nav>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <header style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative' }}>
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
          <Sparkles size={14} />
          <span>Our Ethos, Vision & Academic Architecture</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.3rem, 5.2vw, 3.8rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          maxWidth: '920px',
          margin: '0 auto 1.5rem',
          letterSpacing: '-0.03em',
        }}>
          We Believe in Learning <br />
          <span className="text-gradient">Hard Things First.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '780px',
          margin: '0 auto 2.5rem',
        }}>
          ReactJav was built to eliminate the <em>tutorial hell</em> trap. We combine production-grade engineering curricula, peer-to-peer accountability, timed CBT certifications, and direct 1-on-1 faculty mentorship into a world-class academic institution.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            href="/courses"
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', borderRadius: '0.85rem', gap: '0.5rem' }}
            id="hero-cta-explore-programmes"
          >
            <BookOpen size={18} />
            <span>Explore Curricula</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/academy"
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', borderRadius: '0.85rem', gap: '0.5rem' }}
            id="hero-cta-direct-tutoring"
          >
            <GraduationCap size={18} color="var(--accent-emerald)" />
            <span>1-on-1 Direct Tutoring</span>
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. STATS & GLOBAL IMPACT BAR */}
      {/* ========================================================================= */}
      <section aria-label="Global Impact Metrics" style={{ marginBottom: '5.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.75rem 1.5rem',
                  borderRadius: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div style={{
                  width: '3.25rem',
                  height: '3.25rem',
                  borderRadius: '0.85rem',
                  background: `${s.color}15`,
                  border: `1px solid ${s.color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={24} color={s.color} />
                </div>
                <div>
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginBottom: '0.25rem',
                  }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR STORY & THE PROBLEM WE SOLVE */}
      {/* ========================================================================= */}
      <section style={{ marginBottom: '6rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--primary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.75rem',
            }}>
              <Compass size={14} />
              <span>Genesis & Purpose</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              color: 'var(--text-primary)',
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}>
              Why We Founded <br />
              <span className="text-gradient">ReactJav School</span>
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              The modern tech education industry is divided between two extremes: expensive bootcamps charging over $20,000 with predatory loan contracts, and low-cost pre-recorded video sites where 92% of students drop out due to lack of feedback, accountability, and real code review.
            </p>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              We founded ReactJav on a fundamentally different premise: <strong>Software engineering is a craft best mastered through deliberate practice, architectural feedback, and rigorous evaluation.</strong> By pairing a transparent Public Curriculum with an internal Campus Intranet for proctored examinations and live code defense, we prepare students to excel in high-stakes engineering environments from day one.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Zero Synthetic Code: Every exercise is based on real production architectures.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Foundation Backing: Scholarships and grants available for high-aptitude fellows.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Cryptographically Verified Credentials: No participation trophies. Only proven competence.
                </span>
              </div>
            </div>
          </div>

          {/* Architectural Blueprint Visual Card */}
          <div className="glass-card" style={{
            padding: '2.5rem',
            borderRadius: '1.5rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '0.5rem',
                  background: 'var(--grad-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Layers size={14} color="#ffffff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  ReactJav Dual Campus System
                </span>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                Production Model
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                padding: '1.1rem',
                borderRadius: '0.85rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <Globe size={15} />
                  <span>Partition 1: The Public Educational Catalog</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Open syllabus exploration, instructor profiles, free preview lectures, and zero paywalls for curriculum transparency.
                </p>
              </div>

              <div style={{
                padding: '1.1rem',
                borderRadius: '0.85rem',
                background: 'rgba(168, 85, 247, 0.08)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <ShieldCheck size={15} />
                  <span>Partition 2: The Gated Campus Intranet</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Timed 60-min CBT proctored exams, certificate generation, WebRTC live virtual pairing pods, and internal code repositories.
                </p>
              </div>

              <div style={{
                padding: '1.1rem',
                borderRadius: '0.85rem',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <GraduationCap size={15} />
                  <span>Partition 3: 1-on-1 Faculty Mentorship</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Direct screen-sharing, bespoke curriculum pathways, portfolio reviews, and mock technical interview simulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE FOUR PILLARS */}
      {/* ========================================================================= */}
      <section style={{ marginBottom: '6.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--accent-emerald)',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.5rem',
          }}>
            <Target size={14} />
            <span>The Academic Framework</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.85rem, 3vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '0.75rem',
          }}>
            Engineered for Real-World Competence
          </h2>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every component of our curriculum and campus architecture exists to produce confident, high-agency builders who thrive in modern engineering teams.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="glass-card"
                style={{
                  padding: '2rem 1.75rem',
                  borderRadius: '1.25rem',
                  border: `1px solid ${p.borderColor}`,
                  background: 'var(--bg-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.85rem',
                    background: p.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}>
                    <Icon size={22} color={p.iconColor} />
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: p.iconColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}>
                    {p.tag}
                  </div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE ETHOS / VALUES TABS */}
      {/* ========================================================================= */}
      <section style={{ marginBottom: '6.5rem' }}>
        <div className="glass-card" style={{
          padding: '3rem 2rem',
          borderRadius: '1.5rem',
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Our Philosophical Tenets
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              Click through our educational principles to understand how we structure curricula and evaluate technical talent.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}>
            {[
              { id: 'philosophy', label: '1. Learn Hard Things First', icon: Zap },
              { id: 'practice', label: '2. Zero Tutorial Hell', icon: Code2 },
              { id: 'access', label: '3. Radical Inclusivity', icon: HeartHandshake },
              { id: 'verification', label: '4. Verifiable Competence', icon: Award },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="btn btn-sm"
                  style={{
                    padding: '0.55rem 1.15rem',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    background: isActive ? 'var(--primary)' : 'var(--bg-surface)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    gap: '0.45rem',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 4px 14px rgba(79, 70, 229, 0.25)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                  id={`about-tab-${tab.id}`}
                >
                  <TabIcon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Active Content */}
          <div style={{
            maxWidth: '780px',
            margin: '0 auto',
            background: 'var(--bg-surface)',
            padding: '2rem 2.25rem',
            borderRadius: '1.25rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            {activeTab === 'philosophy' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
                  Starting with First Principles
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Many learning platforms start with toy abstractions and visual drag-and-drop builders that fail to explain what is happening under the hood. When students enter production environments, they break under the pressure of memory limits, race conditions, and network latency.
                </p>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  At ReactJav, we introduce foundational concepts early: database normalization, distributed state management, asynchronous execution, and cryptographic integrity. When you master hard things first, everyday software engineering becomes intuitive.
                </p>
              </div>
            )}

            {activeTab === 'practice' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
                  Breaking the Passive Video Loop
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Watching an instructor code a project at 1.5x speed creates an illusion of understanding. The true test of an engineer begins when the terminal outputs an unhandled rejection and there is no video to scrub through.
                </p>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Every ReactJav lesson includes mandatory code checkpoints, unguided architectural challenges, and automated verification suites that require students to debug and reason independently.
                </p>
              </div>
            )}

            {activeTab === 'access' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
                  Democratizing World-Class Tech Talent
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Brilliant technical minds are distributed evenly across the globe, but high-end engineering mentorship has traditionally been locked behind elite universities and geography-specific networks.
                </p>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Through strategic alliances with philanthropic foundations and technology enterprises, we offer fully sponsored grants ($0 upfront) so that high-potential students in developing regions can build high-paying global careers.
                </p>
              </div>
            )}

            {activeTab === 'verification' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
                  Zero Fake Credentials
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  The web is flooded with meaningless certificates of completion that only prove a video was played to the end. Industry employers have grown rightfully skeptical of portfolio claims.
                </p>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  ReactJav certifications are backed by timed Computer-Based Testing (CBT) proctoring, live verbal code defense in virtual rooms, and deployed production deliverables that can be independently audited via public URLs.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE 4-STAGE STUDENT JOURNEY TIMELINE */}
      {/* ========================================================================= */}
      <section style={{ marginBottom: '6.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--accent-purple)',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.5rem',
          }}>
            <Rocket size={14} />
            <span>Path to Mastery</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            The 12-Week Fellowship Pathway
          </h2>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)' }}>
            A structured roadmap transforming curious beginners and junior developers into confident, senior-caliber engineering contributors.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          position: 'relative',
        }}>
          {journeySteps.map((j) => (
            <div
              key={j.step}
              className="glass-card"
              style={{
                padding: '2rem 1.5rem',
                borderRadius: '1.25rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1,
                  }}>
                    {j.step}
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}>
                    {j.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                  {j.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {j.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FACULTY LEADERSHIP SHOWCASE */}
      {/* ========================================================================= */}
      <section style={{ marginBottom: '6.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--accent-cyan)',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.5rem',
          }}>
            <Users size={14} />
            <span>Academic Leadership</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Learn from Practitioners, Not Theorists
          </h2>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)' }}>
            Our faculty members have led engineering teams, authored widely adopted libraries, and architected cloud infrastructures serving millions of users.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {facultyMembers.map((f, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease',
              }}
            >
              <div style={{
                height: '180px',
                width: '100%',
                backgroundImage: `url(${f.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 15, 29, 0.75) 0%, transparent 60%)',
                }} />
                <span style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  left: '1rem',
                  background: 'rgba(37, 99, 235, 0.9)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {f.badge}
                </span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    {f.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.65rem' }}>
                    {f.role}
                  </div>
                  <div style={{
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    marginBottom: '0.75rem',
                  }}>
                    {f.specialty}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {f.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ENTERPRISE CLOUD ARCHITECTURE & ALLIANCES */}
      {/* ========================================================================= */}
      <section style={{ marginBottom: '6.5rem' }}>
        <div style={{
          padding: '3rem 2rem',
          borderRadius: '1.5rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Built on Industry-Standard Technology Infrastructure
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            ReactJav fellows write and deploy on the exact cloud platforms and database foundations powering modern Silicon Valley scale-ups.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { title: 'Next.js 16 & Turbopack', desc: 'Hybrid SSR & React Server Components', icon: Laptop },
              { title: 'PostgreSQL & Supabase', desc: 'Row-Level Security & Cloud Storage', icon: Building },
              { title: 'Google Firebase Auth', desc: 'Secure OAuth & JWT Custom Claims', icon: Shield },
              { title: 'WebRTC Live Video', desc: 'Ultra Low-Latency Virtual Breakouts', icon: Video },
            ].map((tech, i) => {
              const TechIcon = tech.icon;
              return (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem 1rem',
                    borderRadius: '1rem',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <TechIcon size={24} color="var(--primary)" />
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {tech.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {tech.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section style={{ marginBottom: '6.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.75rem' }}>
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
            <Lightbulb size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Everything you need to know about our admissions, academic tracks, and learning structure.
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
                  id={`faq-toggle-${i}`}
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
      {/* 10. FINAL ENROLLMENT CTA */}
      {/* ========================================================================= */}
      <section style={{ textAlign: 'center' }}>
        <div style={{
          padding: '4rem 2rem',
          borderRadius: '1.75rem',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(124, 58, 237, 0.12) 50%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.3)',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            background: 'rgba(37, 99, 235, 0.2)',
            border: '1px solid rgba(37, 99, 235, 0.4)',
            color: 'var(--primary)',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1.25rem',
          }}>
            <Sparkles size={14} />
            <span>Join 350,000+ Driven Engineers</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            Ready to Build Production Systems That Matter?
          </h2>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto 2.25rem',
          }}>
            Whether you want to explore our open public syllabi, apply for a 100% sponsored foundation grant, or enroll in direct 1-on-1 faculty mentorship, your next career chapter starts here.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/courses"
              className="btn btn-primary"
              style={{ padding: '0.9rem 1.85rem', fontSize: '0.95rem', borderRadius: '0.85rem', gap: '0.5rem' }}
              id="about-bottom-cta-courses"
            >
              <BookOpen size={18} />
              <span>Browse All Programmes</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/academy"
              className="btn btn-secondary"
              style={{ padding: '0.9rem 1.85rem', fontSize: '0.95rem', borderRadius: '0.85rem', gap: '0.5rem' }}
              id="about-bottom-cta-tutoring"
            >
              <GraduationCap size={18} color="var(--accent-emerald)" />
              <span>Apply for Direct Tutoring</span>
            </Link>
            <Link
              href="/auth"
              className="btn btn-secondary"
              style={{ padding: '0.9rem 1.85rem', fontSize: '0.95rem', borderRadius: '0.85rem', gap: '0.5rem' }}
              id="about-bottom-cta-auth"
            >
              <span>Student Sign In</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
