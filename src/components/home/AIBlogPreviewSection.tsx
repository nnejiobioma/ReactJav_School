'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, ArrowUpRight, Radio, Clock, Sparkles } from 'lucide-react';
import { BlogPost } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

export default function AIBlogPreviewSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(LocalDataService.getBlogPosts().slice(0, 3));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section
      style={{
        margin: '4.5rem 0',
        background: 'var(--blog-bg)',
        color: 'var(--blog-text)',
        border: '1px solid var(--blog-border)',
        borderRadius: '1.25rem',
        padding: 'clamp(1.75rem, 3.5vw, 3rem)',
        backgroundImage:
          'linear-gradient(var(--blog-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--blog-grid-line) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        boxShadow: 'var(--shadow-md)',
        transition: 'background-color 0.25s ease, color 0.25s ease',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.25rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--blog-border)',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.28rem 0.75rem',
              background: 'var(--blog-surface)',
              border: '1px solid var(--blog-accent-cyan)',
              borderRadius: '0.3rem',
              color: 'var(--blog-accent-cyan)',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.73rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              letterSpacing: '0.06em',
            }}
          >
            <Radio size={13} color="var(--blog-accent-emerald)" />
            <span>// REACTJAV_AI_TECH_BLOG // LIVE_DISPATCHES</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.85rem, 3.4vw, 2.5rem)',
              fontWeight: 900,
              color: 'var(--blog-text)',
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}
          >
            Latest AI News, Prompt Engineering Tips &{' '}
            <span style={{ color: 'var(--blog-accent-cyan)' }}>Career Signals</span>
          </h2>
          <p
            style={{
              fontSize: '0.96rem',
              color: 'var(--blog-text-secondary)',
              marginTop: '0.5rem',
              maxWidth: '680px',
              marginBottom: 0,
            }}
          >
            Explore deep-dive technical articles on Frontier LLMs, AI Coding & Web Development,
            RLHF Data Annotation, and remote AI job opportunities.
          </p>
        </div>

        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--blog-btn-bg)',
            color: 'var(--blog-btn-text)',
            padding: '0.75rem 1.35rem',
            borderRadius: '0.4rem',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.8rem',
            fontWeight: 800,
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          <Terminal size={15} />
          <span>OPEN AI TECH BLOG</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* 3-Column Theme-Adaptive Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.5rem',
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            style={{
              background: 'var(--blog-surface)',
              border: '1px solid var(--blog-border)',
              borderRadius: '0.6rem',
              padding: '1.35rem',
              textDecoration: 'none',
              color: 'var(--blog-text)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.7rem',
                  color: 'var(--blog-accent-cyan)',
                  marginBottom: '0.65rem',
                }}
              >
                <span>{post.telemetry_id}</span>
                <span
                  style={{
                    color: 'var(--blog-text-muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <Clock size={11} /> {post.reading_time_minutes}m
                </span>
              </div>

              <span
                style={{
                  display: 'inline-block',
                  background: 'var(--blog-btn-bg)',
                  color: 'var(--blog-btn-text)',
                  padding: '0.18rem 0.55rem',
                  borderRadius: '0.2rem',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  marginBottom: '0.75rem',
                }}
              >
                {post.category}
              </span>

              <h3
                style={{
                  fontSize: '1.12rem',
                  fontWeight: 800,
                  color: 'var(--blog-text)',
                  lineHeight: 1.35,
                  marginBottom: '0.6rem',
                }}
              >
                {post.title}
              </h3>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--blog-text-secondary)',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {post.excerpt}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.85rem',
                borderTop: '1px solid var(--blog-border)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: 'var(--blog-accent-emerald)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={12} /> AI_TL;DR INCLUDED
              </span>
              <span
                style={{
                  color: 'var(--blog-text)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                READ <ArrowUpRight size={13} color="var(--blog-accent-cyan)" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
