'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Terminal,
  Sparkles,
  Clock,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowUpRight,
  Radio,
  Share2,
  Send,
} from 'lucide-react';
import { BlogPost, Course } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

export default function AIBlogArticlePage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [otherPosts, setOtherPosts] = useState<BlogPost[]>([]);
  const [tldrOpen, setTldrOpen] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const found = LocalDataService.getBlogPostBySlug(slug);
    const allPosts = LocalDataService.getBlogPosts();
    const allCourses = LocalDataService.getCourses();

    if (found) {
      setPost(found);
      setOtherPosts(allPosts.filter((p) => p.id !== found.id).slice(0, 3));
      const matchedCourses = allCourses.filter((c) =>
        found.related_course_slugs?.includes(c.slug)
      );
      setRelatedCourses(matchedCourses.length > 0 ? matchedCourses : allCourses.slice(0, 3));
    } else if (allPosts.length > 0) {
      setPost(allPosts[0]);
      setOtherPosts(allPosts.slice(1, 4));
      setRelatedCourses(allCourses.slice(0, 3));
    }
  }, [slug]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  if (!post) {
    return (
      <div
        style={{
          backgroundColor: 'var(--blog-bg)',
          color: 'var(--blog-text)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono), monospace',
        }}
      >
        LOADING_AI_DISPATCH_STREAM...
      </div>
    );
  }

  // Render content paragraphs and headings cleanly
  const contentBlocks = post.content.split('\n\n').map((block, idx) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('#### ')) {
      return (
        <h3
          key={idx}
          style={{
            fontSize: '1.22rem',
            fontWeight: 800,
            color: 'var(--blog-accent-cyan)',
            marginTop: '1.75rem',
            marginBottom: '0.65rem',
            fontFamily: 'var(--font-mono), monospace',
          }}
        >
          {trimmed.replace('#### ', '')}
        </h3>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h2
          key={idx}
          style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            color: 'var(--blog-text)',
            marginTop: '2.25rem',
            marginBottom: '0.85rem',
            paddingBottom: '0.45rem',
            borderBottom: '1px solid var(--blog-border)',
          }}
        >
          {trimmed.replace('### ', '')}
        </h2>
      );
    }
    return (
      <p
        key={idx}
        style={{
          fontSize: '1.05rem',
          color: 'var(--blog-text-secondary)',
          lineHeight: 1.8,
          marginBottom: '1.25rem',
          whiteSpace: 'pre-line',
        }}
      >
        {trimmed}
      </p>
    );
  });

  return (
    <div
      style={{
        backgroundColor: 'var(--blog-bg)',
        color: 'var(--blog-text)',
        minHeight: '100vh',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        marginTop: '-2rem',
        paddingTop: '2.5rem',
        paddingBottom: '6rem',
        backgroundImage:
          'linear-gradient(var(--blog-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--blog-grid-line) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        transition: 'background-color 0.25s ease, color 0.25s ease',
      }}
    >
      <div className="container" style={{ maxWidth: '920px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Back Navigation & Telemetry Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--blog-border)',
          }}
        >
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--blog-text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.45rem 0.9rem',
              border: '1px solid var(--blog-border)',
              borderRadius: '0.35rem',
              background: 'var(--blog-surface)',
            }}
          >
            <ArrowLeft size={14} />
            <span>RETURN_TO_DISPATCH_INDEX</span>
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.75rem',
            }}
          >
            <span
              style={{
                color: 'var(--blog-accent-emerald)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Radio size={13} /> {post.telemetry_id}
            </span>
            <button
              onClick={handleShareUrl}
              style={{
                background: 'var(--blog-surface)',
                border: '1px solid var(--blog-border)',
                color: 'var(--blog-text)',
                padding: '0.38rem 0.75rem',
                borderRadius: '0.3rem',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Share2 size={12} />
              <span>{copiedUrl ? 'LINK_COPIED' : 'SHARE'}</span>
            </button>
          </div>
        </div>

        {/* Category & Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span
            style={{
              background: 'var(--blog-btn-bg)',
              color: 'var(--blog-btn-text)',
              padding: '0.28rem 0.75rem',
              borderRadius: '0.25rem',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            {post.category}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: 'var(--blog-surface)',
                border: '1px solid var(--blog-border)',
                color: 'var(--blog-text-secondary)',
                padding: '0.22rem 0.6rem',
                borderRadius: '0.25rem',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.72rem',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Article Title & Subtitle */}
        <h1
          style={{
            fontSize: 'clamp(1.9rem, 4vw, 2.9rem)',
            fontWeight: 900,
            color: 'var(--blog-text)',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            marginBottom: '1rem',
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--blog-text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
          }}
        >
          {post.subtitle}
        </p>

        {/* Author & Metadata Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem 1.25rem',
            background: 'var(--blog-surface)',
            border: '1px solid var(--blog-border)',
            borderRadius: '0.5rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img
              src={post.author_avatar}
              alt={post.author_name}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--blog-border-strong)',
              }}
            />
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--blog-text)' }}>
                {post.author_name}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--blog-text-muted)' }}>
                {post.author_role}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.76rem',
              color: 'var(--blog-text-secondary)',
            }}
          >
            <span>
              PUBLISHED:{' '}
              {new Date(post.published_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>•</span>
            <span
              style={{
                color: 'var(--blog-accent-cyan)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Clock size={13} /> {post.reading_time_minutes} MIN READ
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div
          style={{
            height: '340px',
            borderRadius: '0.65rem',
            overflow: 'hidden',
            border: '1px solid var(--blog-border)',
            marginBottom: '2.25rem',
          }}
        >
          <img
            src={post.thumbnail_url}
            alt={post.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(25%) contrast(112%)',
            }}
          />
        </div>

        {/* Interactive AI Neural TL;DR Summary Box */}
        {post.tldr && post.tldr.length > 0 && (
          <div
            style={{
              background: 'var(--blog-surface)',
              border: '1px solid var(--blog-accent-cyan)',
              borderRadius: '0.6rem',
              padding: '1.25rem 1.5rem',
              marginBottom: '2.25rem',
            }}
          >
            <button
              onClick={() => setTldrOpen(!tldrOpen)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--blog-accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={15} />
                <span>[AI_EXECUTIVE_SYNTHESIS // TL;DR KEY TAKEAWAYS]</span>
              </span>
              {tldrOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {tldrOpen && (
              <ul
                style={{
                  margin: '1rem 0 0 0',
                  paddingLeft: '1.25rem',
                  color: 'var(--blog-text)',
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                }}
              >
                {post.tldr.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Main Technical Article Content */}
        <div style={{ marginBottom: '2.5rem' }}>{contentBlocks}</div>

        {/* Copyable Code / Prompt Terminal Block */}
        {post.code_snippet && (
          <div
            style={{
              background: 'var(--blog-code-bg)',
              border: '1px solid var(--blog-border)',
              borderRadius: '0.6rem',
              overflow: 'hidden',
              marginBottom: '3rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 1.15rem',
                background: 'var(--blog-code-header)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.75rem',
                color: '#10b981',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <Terminal size={14} />
                <span>{post.code_snippet.label}</span>
              </span>
              <button
                onClick={() => handleCopyCode(post.code_snippet!.code)}
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '0.25rem',
                  padding: '0.28rem 0.65rem',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                {copiedCode ? (
                  <>
                    <Check size={12} /> COPIED
                  </>
                ) : (
                  <>
                    <Copy size={12} /> COPY SNIPPET
                  </>
                )}
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '1.25rem',
                fontSize: '0.84rem',
                lineHeight: 1.6,
                color: 'var(--blog-code-text)',
                fontFamily: 'var(--font-mono), monospace',
                overflowX: 'auto',
              }}
            >
              <code>{post.code_snippet.code}</code>
            </pre>
          </div>
        )}

        {/* ================= RELATED AI COURSES CALLOUT ================= */}
        <div
          style={{
            background: 'var(--blog-surface)',
            border: '1px solid var(--blog-border-strong)',
            borderRadius: '0.75rem',
            padding: '2rem',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.74rem',
                  color: 'var(--blog-accent-cyan)',
                  fontWeight: 700,
                }}
              >
                // BUILD_THESE_SKILLS_HANDS_ON
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--blog-text)', margin: '0.25rem 0 0 0' }}>
                Related ReactJav AI Courses
              </h3>
            </div>
            <Link
              href="/courses"
              style={{
                color: 'var(--blog-text)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.76rem',
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              VIEW ALL 14 AI COURSES &rarr;
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1rem',
            }}
          >
            {relatedCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                style={{
                  background: 'var(--blog-card)',
                  border: '1px solid var(--blog-border)',
                  borderRadius: '0.5rem',
                  padding: '1.15rem',
                  textDecoration: 'none',
                  color: 'var(--blog-text)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.68rem',
                      color: 'var(--blog-accent-emerald)',
                      fontWeight: 700,
                    }}
                  >
                    [{course.level.toUpperCase()} // {course.duration_weeks} WEEKS]
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--blog-text)', margin: '0.35rem 0' }}>
                    {course.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--blog-text-secondary)', margin: 0, lineHeight: 1.45 }}>
                    {course.outcome_hook}
                  </p>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: 'var(--blog-accent-cyan)',
                  }}
                >
                  <BookOpen size={13} />
                  <span>ENROLL / PREVIEW</span>
                  <ArrowUpRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= MORE DISPATCHES ================= */}
        {otherPosts.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.9rem',
                fontWeight: 800,
                color: 'var(--blog-text)',
                marginBottom: '1rem',
              }}
            >
              // CONTINUE_READING_DISPATCH_STREAM
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '1rem',
              }}
            >
              {otherPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  style={{
                    background: 'var(--blog-surface)',
                    border: '1px solid var(--blog-border)',
                    borderRadius: '0.5rem',
                    padding: '1.1rem',
                    textDecoration: 'none',
                    color: 'var(--blog-text)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.68rem',
                      color: 'var(--blog-accent-cyan)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {p.telemetry_id} // {p.category}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.35 }}>
                    {p.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ================= NEWSLETTER SUBSCRIPTION ================= */}
        <div
          style={{
            background: 'var(--blog-surface)',
            border: '1px solid var(--blog-border)',
            borderRadius: '0.65rem',
            padding: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.72rem', color: 'var(--blog-accent-emerald)', fontWeight: 700 }}>
              // WEEKLY_AI_BRIEFING
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--blog-text)' }}>
              Subscribe to ReactJav AI Tech Dispatches & Job Alerts
            </div>
          </div>
          {newsletterSubscribed ? (
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.8rem', color: 'var(--blog-accent-emerald)' }}>
              [SUBSCRIBED_SUCCESSFULLY]
            </span>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail.trim()) setNewsletterSubscribed(true);
              }}
              style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@domain.ai"
                style={{
                  background: 'var(--blog-bg)',
                  border: '1px solid var(--blog-border)',
                  borderRadius: '0.35rem',
                  padding: '0.6rem 0.9rem',
                  color: 'var(--blog-text)',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.82rem',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--blog-btn-bg)',
                  color: 'var(--blog-btn-text)',
                  border: '1px solid var(--blog-border-strong)',
                  borderRadius: '0.35rem',
                  padding: '0.6rem 1.1rem',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <Send size={13} /> SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
