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
    { value: '350,000+', label: 'Learners & Builders Using AI', icon: Users, color: '#38bdf8' },
    { value: '14 Courses', label: 'Beginner to AI Engineering Tracks', icon: Rocket, color: '#10b981' },
    { value: '54+', label: 'Global AI Hubs & Learning Pods', icon: Globe, color: '#c084fc' },
    { value: '$0 Upfront', label: 'Free AI Foundations & Grants', icon: HeartHandshake, color: '#f59e0b' },
  ];

  const pillars = [
    {
      id: 'pillar-1',
      title: 'Practical AI Literacy for Everyone',
      description:
        'We demystify AI without jargon. Starting from AI Foundations (zero coding required), anyone can learn what AI is, how models learn from data, how to spot hallucinations, and how to apply AI responsibly.',
      tag: 'AI LITERACY & FOUNDATIONS',
      icon: Terminal,
      accent: 'rgba(79, 70, 229, 0.15)',
      borderColor: 'rgba(79, 70, 229, 0.35)',
      iconColor: 'var(--primary)',
    },
    {
      id: 'pillar-2',
      title: 'Developing Real AI Technology',
      description:
        'Beyond consuming chatbots, we teach learners and engineers how to design AI-first websites, integrate LLM APIs, build RAG pipelines, and ship production AI-powered applications.',
      tag: 'AI ENGINEERING & BUILDING',
      icon: Cpu,
      accent: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.35)',
      iconColor: '#10b981',
    },
    {
      id: 'pillar-3',
      title: 'Human-Centered & Responsible AI',
      description:
        'Great AI keeps humans in the loop. Every course emphasizes data quality, bias auditing, privacy protection, and independent verification so people stay in charge of every decision.',
      tag: 'ETHICS & VERIFICATION',
      icon: ShieldCheck,
      accent: 'rgba(192, 132, 252, 0.15)',
      borderColor: 'rgba(192, 132, 252, 0.35)',
      iconColor: 'var(--accent-purple)',
    },
    {
      id: 'pillar-4',
      title: 'Proctored CBT & Open Badge Credentials',
      description:
        'Our authentic assessments, randomized question-bank checks, and timed Computer-Based Testing (CBT) validate real AI mastery with Open Badges and verifiable certificates.',
      tag: 'VERIFIED CREDENTIALS',
      icon: Award,
      accent: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.35)',
      iconColor: '#f59e0b',
    },
  ];

  const journeySteps = [
    {
      step: '01',
      title: 'AI Foundations & Literacy',
      badge: 'Stage 1 • Beginner',
      description: 'Understand AI, Machine Learning, Deep Learning, and Generative AI, spot hallucinations, and audit everyday AI systems.',
    },
    {
      step: '02',
      title: 'Prompting, Workflows & Ethics',
      badge: 'Stage 2 • Practitioner',
      description: 'Master structured prompting, automate daily workflows, and apply responsible-use rules for work, study, and business.',
    },
    {
      step: '03',
      title: 'Web Design, Coding & AI Integration',
      badge: 'Stage 3 • Builder',
      description: 'Use AI to design websites, write and debug code faster, and integrate live AI features directly into your own web apps.',
    },
    {
      step: '04',
      title: 'AI Engineering & Capstone Launch',
      badge: 'Stage 4 • Developer',
      description: 'Build LLM applications with RAG, pass proctored CBT certifications, and ship real AI technology to users worldwide.',
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
      q: 'What is ReactJav’s mission in the age of Artificial Intelligence?',
      a: 'ReactJav exists to develop practical AI technology and empower everyday people, creators, and engineers to understand, evaluate, and utilize the power of AI. From our free, no-code AI Foundations course to advanced LLM and AI-integrated web development tracks, we bridge the gap between hype and real-world capability.',
    },
    {
      q: 'Do I need coding experience to start learning AI at ReactJav?',
      a: 'Not at all! Course 1 (AI Foundations: Getting Started with AI) requires zero coding and no prerequisites. You learn through plain-language written lessons, no-code hands-on labs (like Google Teachable Machine), and everyday AI audits before deciding whether to explore Prompt Engineering, Web Design with AI, or Coding with AI.',
    },
    {
      q: 'How does the dual Public Catalog and Campus Intranet architecture work?',
      a: 'Our Public Catalog and AI Tech Blog are open to all visitors to explore full course syllabi, free preview lessons, and daily AI insights without login barriers. Inside the Campus Intranet, enrolled learners access guided labs, timed Computer-Based Testing (CBT) exams, live virtual breakout rooms, and 1-on-1 faculty mentorship.',
    },
    {
      q: 'Are the AI certificates and Open Badges verifiable by employers?',
      a: 'Yes. Every ReactJav certificate and Open Badge is tied to randomized question-bank checks, authentic real-world deliverables (such as our “AI in My Life” Audit), and proctored CBT assessments, with metadata you can share directly on LinkedIn or your CV.',
    },
    {
      q: 'How do free access and foundation-backed sponsorship grants work?',
      a: 'Our flagship AI Foundations course is 100% free and uses free, no-login tools so cost and privacy are never barriers. For advanced AI engineering tracks, our philanthropic and industry partnerships provide subsidized and fully sponsored grants for motivated learners worldwide.',
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
          <span>Developing AI Technology • Empowering People With AI</span>
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
          Helping Everyone Learn &amp; <br />
          <span className="text-gradient">Build With the Power of AI.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '780px',
          margin: '0 auto 2.5rem',
        }}>
          ReactJav is dedicated to <strong>developing AI technology</strong> and <strong>assisting people to learn and utilize the power of AI</strong>—from plain-language AI literacy and responsible everyday use, to designing websites, writing code, and shipping production AI applications.
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
              Our AI Mission at <br />
              <span className="text-gradient">ReactJav Academy</span>
            </h2>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              Artificial Intelligence is reshaping every profession, classroom, and business—yet most people are left either intimidated by technical jargon or misled by hype. Meanwhile, builders need practical skills to integrate AI reliably into real products.
            </p>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              We built ReactJav around a dual commitment: <strong>developing accessible AI technology</strong> and <strong>guiding people step by step to master and utilize AI</strong>. Whether you are taking your first no-code steps in <em>AI Foundations</em> or engineering LLM workflows and AI-powered web apps, you learn by testing real tools, verifying outputs, and building with human judgment at the center.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  AI for Everyone: Free, no-coding AI Foundations with plain-language written lessons.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Builders &amp; Innovators: Web Design with AI, Coding with AI, and AI App Integration.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Open Badges &amp; Verified Competence: Real-world audits, hallucination tests, and proctored CBT.
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
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
            Built to Demystify &amp; Deploy AI
          </h2>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every part of our curriculum and technology platform is designed to help learners understand AI clearly, verify it critically, and build with it confidently.
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
              Our AI Learning Principles
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              Click through the principles guiding how we teach AI literacy, build AI technology, and verify real-world skills.
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
              { id: 'philosophy', label: '1. Plain-Language Clarity', icon: Zap },
              { id: 'practice', label: '2. Hands-On AI Building', icon: Code2 },
              { id: 'access', label: '3. AI Access for All', icon: HeartHandshake },
              { id: 'verification', label: '4. Verify & Human-in-Loop', icon: Award },
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
                  Starting with Clear Mental Models
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Too much AI education hides behind intimidating math or shallow hype. People deserve to understand what AI actually is—how models learn from data, why they make predictions, and why chatbots sometimes hallucinate—in plain, everyday language.
                </p>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  At ReactJav, every concept starts with everyday analogies before moving into technical implementation, so both non-technical learners and software engineers build lasting confidence.
                </p>
              </div>
            )}

            {activeTab === 'practice' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
                  Learn by Testing, Auditing &amp; Building
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Reading headlines about AI is not the same as using it well. True AI fluency comes from training your own classifier, stress-testing chatbots with tricky prompts, designing AI-assisted websites, and integrating real AI models into software.
                </p>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Every ReactJav course pairs structured lessons with hands-on labs, interactive workspaces, and authentic real-world deliverables.
                </p>
              </div>
            )}

            {activeTab === 'access' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
                  Democratizing AI Literacy &amp; Tools
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  AI should empower people everywhere—not only engineers at giant tech companies. That is why we design beginner tracks around free, no-login tools and written lessons with full alt-text accessibility.
                </p>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Through open public syllabi, our free AI Tech Blog, and foundation-backed scholarship grants ($0 upfront), learners worldwide can step into the AI economy without financial or technical barriers.
                </p>
              </div>
            )}

            {activeTab === 'verification' && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
                  Verification First, Humans in Charge
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Because AI systems can hallucinate facts and inherit training-data bias, our 4-Step Verification Habit and 5-Point Responsible-Use Checklist are woven into every track.
                </p>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Likewise, ReactJav certifications and Open Badges are backed by randomized question banks, mixed-model rubric grading, and timed Computer-Based Testing (CBT) so employers know your AI skills are proven.
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
            From AI Literacy to Building AI Technology
          </h2>
          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)' }}>
            A clear, modular pathway guiding beginners, professionals, and developers from understanding AI to building with it.
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
            Ready to Learn &amp; Harness the Power of AI?
          </h2>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto 2.25rem',
          }}>
            Start for free with <strong>AI Foundations</strong>, explore our <strong>AI Tech Blog</strong>, or enroll in hands-on courses for building websites, workflows, and applications powered by AI.
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
