'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Timer, 
  Code2, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Terminal, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  Sparkles,
  Maximize2,
  FileCode,
  Check,
  Send,
  Mic,
  Monitor
} from 'lucide-react';

export default function InteractiveCampusPreview() {
  const [activeTab, setActiveTab] = useState<'cbt' | 'ide' | 'live'>('cbt');
  
  // Interactive CBT Question State
  const [selectedOption, setSelectedOption] = useState<number | null>(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(true);

  // CBT Question Data
  const cbtQuestion = {
    title: 'PostgreSQL Enterprise Architecture & RLS Security',
    codeSnippet: `CREATE POLICY "User Data Isolation" ON public.student_records\n  FOR ALL\n  TO authenticated\n  ???`,
    prompt: 'Which clause correctly restricts read/write operations so that students can only access records matching their authenticated user ID?',
    options: [
      {
        text: 'USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);',
        isCorrect: true,
        explanation: 'Correct! The USING clause restricts row selection (reads/updates/deletes) and WITH CHECK validates new rows inserted or updated.',
      },
      {
        text: 'WHERE current_user() == student_id ALLOW ALL;',
        isCorrect: false,
        explanation: 'Incorrect. PostgreSQL RLS policies require USING / WITH CHECK expressions, not standard WHERE filter clauses.',
      },
      {
        text: 'GRANT ACCESS TO session_user WITH LEVEL = "student";',
        isCorrect: false,
        explanation: 'Incorrect. GRANT is for role privileges, not table-level Row Level Security policies.',
      },
      {
        text: 'FILTER BY auth.jwt() ->> "sub" = student_id;',
        isCorrect: false,
        explanation: 'Incorrect syntax for Supabase PostgreSQL RLS policy definitions.',
      },
    ],
  };

  return (
    <section style={{
      margin: '5rem 0',
      padding: '3rem 2rem',
      borderRadius: '2rem',
      background: 'linear-gradient(135deg, rgba(22, 25, 56, 0.85) 0%, rgba(14, 16, 38, 0.98) 100%)',
      border: '1px solid rgba(139, 92, 246, 0.35)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xl), 0 0 50px rgba(124, 58, 237, 0.15)',
    }}>
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: '20%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.3rem 0.85rem',
          borderRadius: '9999px',
          background: 'rgba(168, 85, 247, 0.15)',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          color: '#d8b4fe',
          fontSize: '0.78rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          <Sparkles size={13} color="#c084fc" />
          <span>Interactive Campus Facility Preview</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.85rem)',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
        }}>
          Step Inside the <span style={{ color: '#a855f7' }}>Campus Intranet</span>
        </h2>

        <p style={{
          fontSize: '1rem',
          color: '#cbd5e1',
          marginTop: '0.85rem',
          lineHeight: 1.6,
        }}>
          Explore the exact high-performance technical facilities built for our fellows: proctored computerized examinations, in-browser code sandboxes, and virtual pair-programming pods.
        </p>

        {/* Tab Navigation Switcher */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem',
          borderRadius: '9999px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          marginTop: '1.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <button
            onClick={() => setActiveTab('cbt')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'cbt' ? '1px solid #10b981' : '1px solid transparent',
              background: activeTab === 'cbt' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
              color: '#ffffff',
              boxShadow: activeTab === 'cbt' ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <Timer size={16} />
            <span>Timed CBT Exam Center</span>
          </button>

          <button
            onClick={() => setActiveTab('ide')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'ide' ? '1px solid #6366f1' : '1px solid transparent',
              background: activeTab === 'ide' ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'transparent',
              color: '#ffffff',
              boxShadow: activeTab === 'ide' ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <Code2 size={16} />
            <span>In-Browser Cloud IDE</span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'live' ? '1px solid #ec4899' : '1px solid transparent',
              background: activeTab === 'live' ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' : 'transparent',
              color: '#ffffff',
              boxShadow: activeTab === 'live' ? '0 4px 15px rgba(236, 72, 153, 0.4)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <Video size={16} />
            <span>1080p Live Mentor Pods</span>
          </button>
        </div>
      </div>

      {/* Interactive Mockup Viewport */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        background: '#090d16',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
      }}>
        {/* Top Window Chrome */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
            <span style={{
              marginLeft: '0.75rem',
              color: '#94a3b8',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.02em',
            }}>
              reactjav-intranet // {activeTab === 'cbt' ? 'cbt-examination-engine' : activeTab === 'ide' ? 'cloud-workspace' : 'pair-meeting-room'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{
              fontSize: '0.75rem',
              color: '#34d399',
              background: 'rgba(16, 185, 129, 0.15)',
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              Live Simulated Session
            </span>
            <Link
              href="/intranet"
              style={{
                fontSize: '0.78rem',
                color: '#38bdf8',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <span>Go to Full Intranet</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Tab 1: Timed CBT Examination Center */}
        {activeTab === 'cbt' && (
          <div style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)', color: '#f8fafc' }}>
            {/* Exam Header Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              padding: '1rem 1.25rem',
              borderRadius: '0.85rem',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '1.75rem',
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Proctored Certification Assessment
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '0.15rem 0 0' }}>
                  {cbtQuestion.title}
                </h4>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Question Progress</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>18 of 40 (45%)</span>
                </div>
                <div style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '0.65rem',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}>
                  <Timer size={15} />
                  <span>52:19 REMAINING</span>
                </div>
              </div>
            </div>

            {/* Question Box */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.5rem' }}>
                QUESTION 18 • DATABASE ACCESS CONTROL
              </div>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.5, marginBottom: '1rem' }}>
                {cbtQuestion.prompt}
              </p>

              {/* Code Snippet Box */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '1rem',
                borderRadius: '0.65rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.825rem',
                color: '#38bdf8',
                marginBottom: '1.5rem',
                lineHeight: 1.5,
              }}>
                <pre style={{ margin: 0 }}>{cbtQuestion.codeSnippet}</pre>
              </div>

              {/* Multiple Choice Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {cbtQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = option.isCorrect;
                  const showCorrectness = isAnswerSubmitted && isSelected;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        setIsAnswerSubmitted(true);
                      }}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '0.75rem',
                        background: isSelected 
                          ? (isCorrectOption ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)')
                          : 'rgba(15, 23, 42, 0.6)',
                        border: isSelected
                          ? (isCorrectOption ? '1px solid #10b981' : '1px solid #ef4444')
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          background: isSelected 
                            ? (isCorrectOption ? '#10b981' : '#ef4444')
                            : 'rgba(255, 255, 255, 0.1)',
                          color: '#ffffff',
                          flexShrink: 0,
                        }}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <code style={{ fontSize: '0.85rem', color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                          {option.text}
                        </code>
                      </div>

                      {showCorrectness && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: isCorrectOption ? '#10b981' : '#ef4444' }}>
                          {isCorrectOption ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                          <span>{isCorrectOption ? 'VERIFIED CORRECT' : 'INCORRECT'}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Feedback Explanation Banner */}
              {selectedOption !== null && (
                <div style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '0.75rem',
                  background: cbtQuestion.options[selectedOption].isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: cbtQuestion.options[selectedOption].isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#e2e8f0',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  <ShieldCheck size={20} color={cbtQuestion.options[selectedOption].isCorrect ? '#10b981' : '#ef4444'} style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: cbtQuestion.options[selectedOption].isCorrect ? '#34d399' : '#f87171' }}>
                      {cbtQuestion.options[selectedOption].isCorrect ? 'Automated Grading Explanation: ' : 'Review Note: '}
                    </strong>
                    {cbtQuestion.options[selectedOption].explanation}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Tip: Click any option above to experience the instant proctored test evaluation.
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link
                  href="/cbt"
                  className="btn btn-primary btn-sm"
                  style={{ gap: '0.4rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff' }}
                >
                  <Timer size={14} />
                  <span>Launch CBT Exam Hall</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: In-Browser Cloud IDE */}
        {activeTab === 'ide' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(180px, 20vw, 240px) 1fr',
            minHeight: '380px',
            color: '#e2e8f0',
            fontFamily: 'var(--font-mono)',
          }}>
            {/* File Tree Sidebar */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.75)',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '1rem',
              fontSize: '0.78rem',
            }}>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                PROJECT EXPLORER
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontWeight: 600 }}>
                  <FileCode size={14} />
                  <span>auth/route.ts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
                  <FileCode size={14} />
                  <span>supabase/client.ts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
                  <FileCode size={14} />
                  <span>migrations/rls.sql</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
                  <FileCode size={14} />
                  <span>package.json</span>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>GIT BRANCH</span>
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem' }}>feature/supabase-rls</span>
              </div>
            </div>

            {/* Code Viewport & Simulated Terminal */}
            <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(10, 13, 22, 0.95)' }}>
              {/* Code Lines */}
              <div style={{ padding: '1.25rem', fontSize: '0.8rem', lineHeight: 1.6, flex: 1, overflowX: 'auto' }}>
                <div style={{ color: '#64748b' }}>// Next.js 16 App Router - Server-Side RLS Authentication Handler</div>
                <div><span style={{ color: '#f43f5e' }}>import</span> {'{ createServerClient }'} <span style={{ color: '#f43f5e' }}>from</span> <span style={{ color: '#a7f3d0' }}>'@supabase/ssr'</span>;</div>
                <div><span style={{ color: '#f43f5e' }}>import</span> {'{ cookies }'} <span style={{ color: '#f43f5e' }}>from</span> <span style={{ color: '#a7f3d0' }}>'next/headers'</span>;</div>
                <br />
                <div><span style={{ color: '#818cf8' }}>export async function</span> <span style={{ color: '#38bdf8' }}>GET</span>(request: Request) {'{'}</div>
                <div>&nbsp;&nbsp;<span style={{ color: '#818cf8' }}>const</span> cookieStore = <span style={{ color: '#f43f5e' }}>await</span> cookies();</div>
                <div>&nbsp;&nbsp;<span style={{ color: '#818cf8' }}>const</span> supabase = createServerClient(process.env.SUPABASE_URL!, ...);</div>
                <div>&nbsp;&nbsp;<span style={{ color: '#818cf8' }}>const</span> {'{ data: { user } }'} = <span style={{ color: '#f43f5e' }}>await</span> supabase.auth.getUser();</div>
                <div>&nbsp;&nbsp;<span style={{ color: '#f43f5e' }}>return</span> Response.json({'{ status: "authenticated", user_id: user?.id }'});</div>
                <div>{'}'}</div>
              </div>

              {/* Terminal Output */}
              <div style={{
                background: 'rgba(5, 7, 12, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.85rem 1.25rem',
                fontSize: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', marginBottom: '0.35rem' }}>
                  <Terminal size={14} />
                  <span>$ supabase test --policies</span>
                </div>
                <div style={{ color: '#cbd5e1' }}>Running 8 security validation suites across PostgreSQL tables...</div>
                <div style={{ color: '#34d399' }}>✓ [RLS_01] User profile isolation: PASS (8ms)</div>
                <div style={{ color: '#34d399' }}>✓ [RLS_02] Timed examination submissions immutable: PASS (5ms)</div>
                <div style={{ color: '#60a5fa', marginTop: '0.35rem' }}>
                  All security benchmarks satisfied. Build deployed to Vercel preview branch.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: 1080p Live Mentor Pods */}
        {activeTab === 'live' && (
          <div style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)', color: '#f8fafc' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
            }}>
              {/* Virtual Screen Share Mockup */}
              <div style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                position: 'relative',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
                  alt="Live Screen Sharing"
                  style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block', opacity: 0.85 }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(10, 13, 22, 0.95) 100%)',
                }} />

                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                    <Monitor size={12} /> 1080p Screen Shared
                  </span>
                  <span style={{
                    fontSize: '0.7rem',
                    background: 'rgba(239, 68, 68, 0.25)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: '#f87171',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    fontWeight: 700,
                  }}>
                    REC • 00:34:12
                  </span>
                </div>

                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', display: 'block' }}>
                      Pair Programming: Supabase Architecture
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Mentor: Senior Software Architect (ReactJav Core)
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mic size={15} color="#10b981" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Room Info & Chat Feed */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.75)',
                padding: '1.25rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>
                    Active Participants (4/6)
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                    Dual-Audio Latency 14ms
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.78rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
                    <strong style={{ color: '#38bdf8' }}>Mentor Obioma: </strong>
                    <span>"Notice how line 14 validates the bearer token before running the database query."</span>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
                    <strong style={{ color: '#f59e0b' }}>Fellow Amara: </strong>
                    <span>"Got it! That completely avoids race conditions on multi-tenant queries."</span>
                  </div>
                </div>

                <Link
                  href="/live"
                  className="btn btn-primary"
                  style={{
                    gap: '0.45rem',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                  }}
                >
                  <Video size={16} />
                  <span>Enter Live Virtual Campus</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
