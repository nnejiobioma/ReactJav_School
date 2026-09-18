'use client';

import React from 'react';
import { Database, Code2, Palette, Rocket, ArrowUpRight, TrendingUp } from 'lucide-react';

interface REACTJavTrackOverviewProps {
  onSelectTrack: (track: string) => void;
}

export default function REACTJavTrackOverview({ onSelectTrack }: REACTJavTrackOverviewProps) {
  const tracks = [
    {
      id: 'AI & Data',
      title: 'AI & Data',
      icon: <Database size={24} color="#38bdf8" />,
      tag: 'Highest Industry Demand',
      description: 'Land high-paying roles in data and AI at a time when every global and African enterprise is racing to hire people who understand both.',
      roles: ['Data Analyst', 'Data Scientist', 'AI Product Manager', 'Prompt Engineer'],
      growth: '+42% YoY Hiring',
      badgeColor: 'rgba(56, 189, 248, 0.15)',
      borderColor: 'rgba(56, 189, 248, 0.3)',
      accentColor: '#38bdf8',
    },
    {
      id: 'Software Engineering',
      title: 'Software Engineering',
      icon: <Code2 size={24} color="#818cf8" />,
      tag: 'Core Tech Backbone',
      description: 'Build robust web, cloud, and distributed architectures powering startups and multinational engineering teams from anywhere.',
      roles: ['Full-Stack Developer', 'DevOps Specialist', 'Frontend Engineer', 'Backend Architect'],
      growth: '+38% YoY Hiring',
      badgeColor: 'rgba(99, 102, 241, 0.15)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      accentColor: '#818cf8',
    },
    {
      id: 'Creative & Design',
      title: 'Creative & Design',
      icon: <Palette size={24} color="#ec4899" />,
      tag: 'Global Freelance & Agency',
      description: 'Get hired as a professional digital creator, UX designer, or start earning independently with a portfolio that proves your craft.',
      roles: ['UI/UX Product Designer', 'Content Strategist', 'Design System Architect', 'Digital Producer'],
      growth: '+29% YoY Hiring',
      badgeColor: 'rgba(236, 72, 153, 0.15)',
      borderColor: 'rgba(236, 72, 153, 0.3)',
      accentColor: '#ec4899',
    },
    {
      id: 'Entrepreneurship',
      title: 'Entrepreneurship',
      icon: <Rocket size={24} color="#f59e0b" />,
      tag: 'Venture & Remote Income',
      description: 'Launch a venture, build something that lasts, or scale high-value freelance retainers that don’t depend on someone else deciding you are ready.',
      roles: ['Startup Founder', 'International Freelancer', 'Operations Consultant', 'Growth Lead'],
      growth: '35K+ Ventures Launched',
      badgeColor: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      accentColor: '#f59e0b',
    },
    {
      id: 'Game Development',
      title: 'Game Development',
      icon: <Rocket size={24} color="#f59e0b" />,
      tag: 'Venture & Remote Income',
      description: 'Launch a venture, build something that lasts, or scale high-value freelance retainers that don’t depend on someone else deciding you are ready.',
      roles: ['Startup Founder', 'International Freelancer', 'Operations Consultant', 'Growth Lead'],
      growth: '35K+ Ventures Launched',
      badgeColor: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      accentColor: '#f59e0b',
    },
  ];

  return (
    <section style={{ margin: '4rem 0 3.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{
          fontSize: '0.8rem',
          color: 'var(--accent-cyan)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 700,
        }}>
          Explore Career Pathways
        </span>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          marginTop: '0.35rem',
          letterSpacing: '-0.02em',
        }}>
          Choose Your High-Growth Pathway
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0.75rem auto 0',
          lineHeight: 1.55,
        }}>
          Every pathway is curated alongside industry hiring partners to deliver proven employment and entrepreneurial independence.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => onSelectTrack(track.id)}
            className="glass-card"
            style={{
              padding: '1.75rem',
              borderRadius: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: `1px solid ${track.borderColor}`,
              background: 'var(--bg-surface)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = `0 16px 32px rgba(15, 23, 42, 0.1), 0 0 20px ${track.badgeColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.85rem',
                  background: track.badgeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${track.borderColor}`,
                }}>
                  {track.icon}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  color: track.accentColor,
                  background: track.badgeColor,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '9999px',
                  border: `1px solid ${track.borderColor}`,
                }}>
                  <TrendingUp size={12} />
                  <span>{track.growth}</span>
                </div>
              </div>

              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}>
                {track.title}
              </h3>

              <p style={{
                fontSize: '0.86rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                marginBottom: '1.5rem',
              }}>
                {track.description}
              </p>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.45rem',
                }}>
                  Typical Target Roles:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {track.roles.map((role) => (
                    <span
                      key={role}
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-surface-elevated)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '0.35rem',
                        border: '1px solid var(--border-subtle)',
                        fontWeight: 500,
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              color: track.accentColor,
              fontWeight: 700,
              fontSize: '0.85rem',
            }}>
              <span>View Track Programmes</span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
