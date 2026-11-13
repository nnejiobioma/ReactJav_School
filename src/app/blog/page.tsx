'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Terminal,
  Cpu,
  Search,
  Sparkles,
  Clock,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Plus,
  Edit3,
  Trash2,
  X,
  Radio,
  Code2,
  ShieldCheck,
  Briefcase,
  Send,
} from 'lucide-react';
import { BlogPost, BlogCategory, Profile } from '@/types';
import { BLOG_CATEGORIES } from '@/data/blogPosts';
import { LocalDataService, isFaculty } from '@/lib/supabase/client';

export default function AIBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Dispatches');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTldrIds, setExpandedTldrIds] = useState<Record<string, boolean>>({
    blog_ai_reasoning_agents_01: true,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Admin / Instructor Blog Editor Modal State
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formCategory, setFormCategory] = useState<BlogCategory>('AI News & Frontier Models');
  const [formTags, setFormTags] = useState('');
  const [formTldr, setFormTldr] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCodeLabel, setFormCodeLabel] = useState('');
  const [formCodeSnippet, setFormCodeSnippet] = useState('');
  const [formReadingTime, setFormReadingTime] = useState(5);
  const [formThumbnail, setFormThumbnail] = useState(
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80'
  );
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  useEffect(() => {
    setPosts(LocalDataService.getBlogPosts());
    setCurrentUser(LocalDataService.getCurrentUser());

    const handleStorage = () => {
      setPosts(LocalDataService.getBlogPosts());
      setCurrentUser(LocalDataService.getCurrentUser());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const canManageBlog = isFaculty(currentUser);

  const toggleTldr = (id: string) => {
    setExpandedTldrIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormExcerpt('');
    setFormCategory('AI News & Frontier Models');
    setFormTags('LLMs, AI Engineering, Prompting');
    setFormTldr(
      'Key takeaway 1: Core architectural insight.\nKey takeaway 2: Practical workflow implementation.\nKey takeaway 3: Career and production impact.'
    );
    setFormContent(
      '### 1. Architectural Overview\n\nWrite your technical analysis here...\n\n### 2. Implementation Blueprint\n\nExplain the step-by-step AI system design and verification metrics.'
    );
    setFormCodeLabel('AI_PIPELINE_CONFIG.ts // Technical Snippet');
    setFormCodeSnippet('// Optional code or prompt template\nconst model = "frontier-llm-v3";');
    setFormReadingTime(5);
    setFormThumbnail(
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80'
    );
    setFormIsFeatured(false);
    setShowEditorModal(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSubtitle(post.subtitle);
    setFormExcerpt(post.excerpt);
    setFormCategory(post.category);
    setFormTags(post.tags.join(', '));
    setFormTldr(post.tldr.join('\n'));
    setFormContent(post.content);
    setFormCodeLabel(post.code_snippet?.label || '');
    setFormCodeSnippet(post.code_snippet?.code || '');
    setFormReadingTime(post.reading_time_minutes);
    setFormThumbnail(post.thumbnail_url);
    setFormIsFeatured(!!post.is_featured);
    setShowEditorModal(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const slug =
      editingPost?.slug ||
      formTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const newPost: BlogPost = {
      id: editingPost?.id || `blog_ai_${Date.now()}`,
      slug,
      telemetry_id: editingPost?.telemetry_id || `SYS-DISPATCH-00${posts.length + 1}`,
      title: formTitle.trim(),
      subtitle: formSubtitle.trim() || formExcerpt.trim(),
      excerpt: formExcerpt.trim() || formSubtitle.trim(),
      tldr: formTldr
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      content: formContent,
      code_snippet: formCodeSnippet.trim()
        ? {
            language: 'typescript',
            label: formCodeLabel.trim() || 'TERMINAL_SNIPPET.ts',
            code: formCodeSnippet,
          }
        : undefined,
      category: formCategory,
      tags: formTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      author_name: currentUser?.full_name || 'Dr. Elena Chen',
      author_role: editingPost?.author_role || 'AI Research & Engineering Faculty',
      author_avatar:
        currentUser?.avatar_url ||
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      published_at: editingPost?.published_at || new Date().toISOString(),
      reading_time_minutes: Number(formReadingTime) || 5,
      is_featured: formIsFeatured,
      thumbnail_url:
        formThumbnail.trim() ||
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
      related_course_slugs: editingPost?.related_course_slugs || [
        'ai-prompting-and-data-annotation',
        'intro-to-large-language-models-llm',
        'coding-with-ai',
      ],
    };

    const updated = LocalDataService.saveBlogPost(newPost);
    setPosts(updated);
    setShowEditorModal(false);
  };

  const handleDeletePost = (id: string) => {
    const updated = LocalDataService.deleteBlogPost(id);
    setPosts(updated);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All Dispatches' || post.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const featuredPost =
    filteredPosts.find((p) => p.is_featured) || filteredPosts[0] || null;
  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  const getCategoryIcon = (cat: BlogCategory) => {
    switch (cat) {
      case 'AI News & Frontier Models':
        return <Cpu size={13} color="var(--blog-accent-cyan)" />;
      case 'Prompt Engineering & Workflows':
        return <Sparkles size={13} color="var(--blog-accent-emerald)" />;
      case 'AI Coding & Web Dev':
        return <Code2 size={13} color="var(--blog-accent-cyan)" />;
      case 'AI Ethics, Safety & RLHF':
        return <ShieldCheck size={13} color="#a855f7" />;
      case 'AI Jobs & Careers':
        return <Briefcase size={13} color="#f59e0b" />;
      default:
        return <Terminal size={13} color="var(--blog-accent-cyan)" />;
    }
  };

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
        position: 'relative',
        transition: 'background-color 0.25s ease, color 0.25s ease',
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* ================= TOP TELEMETRY STATUS BAR ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '0.75rem 1.15rem',
            background: 'var(--blog-surface)',
            border: '1px solid var(--blog-border)',
            borderRadius: '0.5rem',
            marginBottom: '2.5rem',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.76rem',
            letterSpacing: '0.06em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--blog-accent-emerald)',
                fontWeight: 700,
              }}
            >
              <Radio size={14} color="var(--blog-accent-emerald)" />
              <span>SYS.ONLINE // REACTJAV_AI_RESEARCH_LAB</span>
            </span>
            <span style={{ color: 'var(--blog-text-muted)' }}>|</span>
            <span style={{ color: 'var(--blog-text-secondary)' }}>
              STREAM: <strong style={{ color: 'var(--blog-accent-cyan)' }}>FRONTIER_AI_DISPATCHES</strong>
            </span>
            <span style={{ color: 'var(--blog-text-muted)' }}>|</span>
            <span style={{ color: 'var(--blog-text-muted)' }}>
              INDEXED_NODES: {posts.length} ARTICLES
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={openCreateModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--blog-btn-bg)',
                color: 'var(--blog-btn-text)',
                border: '1px solid var(--blog-border-strong)',
                borderRadius: '0.35rem',
                padding: '0.38rem 0.85rem',
                fontSize: '0.74rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono), monospace',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              <Plus size={14} />
              <span>+ Publish AI Dispatch</span>
            </button>
          </div>
        </div>

        {/* ================= HERO TERMINAL HEADER ================= */}
        <div
          style={{
            borderLeft: '3px solid var(--blog-accent-cyan)',
            paddingLeft: '1.5rem',
            marginBottom: '2.75rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.28rem 0.75rem',
              background: 'var(--blog-surface)',
              border: '1px solid var(--blog-accent-cyan)',
              borderRadius: '0.25rem',
              color: 'var(--blog-accent-cyan)',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.73rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}
          >
            <Terminal size={13} />
            <span>// REACTJAV.COM AI TECHNOLOGY & ENGINEERING JOURNAL</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4.8vw, 3.75rem)',
              fontWeight: 900,
              color: 'var(--blog-text)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '0 0 1rem 0',
            }}
          >
            AI Intelligence, Prompt Architecture &{' '}
            <span style={{ color: 'var(--blog-accent-cyan)' }}>
              Frontier Systems.
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.08rem',
              color: 'var(--blog-text-secondary)',
              maxWidth: '780px',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Deep-dive technical dispatches on Large Language Models, Production Prompt Engineering,
            AI-First Website & Software Coding, RLHF Data Alignment, and Global AI Career Signals.
          </p>
        </div>

        {/* ================= SEARCH & CATEGORY FILTER MATRIX ================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.15rem',
            padding: '1.25rem',
            background: 'var(--blog-surface)',
            border: '1px solid var(--blog-border)',
            borderRadius: '0.65rem',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'var(--blog-bg)',
              border: '1px solid var(--blog-border)',
              borderRadius: '0.45rem',
              padding: '0.7rem 1rem',
            }}
          >
            <Search size={18} color="var(--blog-accent-cyan)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="QUERY_INDEX // Search AI articles, prompt templates, LLMs, RAG, coding, or AI jobs..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--blog-text)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.88rem',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--blog-text-muted)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.75rem',
                }}
              >
                [CLEAR]
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['All Dispatches', ...BLOG_CATEGORIES].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.48rem 0.95rem',
                    borderRadius: '0.35rem',
                    background: active ? 'var(--blog-btn-bg)' : 'var(--blog-bg)',
                    color: active ? 'var(--blog-btn-text)' : 'var(--blog-text)',
                    border: active
                      ? '1px solid var(--blog-border-strong)'
                      : '1px solid var(--blog-border)',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.76rem',
                    fontWeight: active ? 800 : 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= FEATURED / PINNED HERO DISPATCH ================= */}
        {featuredPost && (
          <div
            style={{
              background: 'var(--blog-card)',
              border: '1px solid var(--blog-border)',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              marginBottom: '3.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 1.25rem',
                background: 'var(--blog-surface-elevated)',
                borderBottom: '1px solid var(--blog-border)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.74rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--blog-accent-cyan)',
                  }}
                />
                <span style={{ color: 'var(--blog-accent-cyan)', fontWeight: 700 }}>
                  PINNED_FEATURED_DISPATCH // {featuredPost.telemetry_id}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--blog-text-muted)' }}>
                  {new Date(featuredPost.published_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                {canManageBlog && (
                  <button
                    onClick={() => openEditModal(featuredPost)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--blog-border)',
                      color: 'var(--blog-text)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Edit3 size={11} /> Edit
                  </button>
                )}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              }}
            >
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.25rem 0.7rem',
                      border: '1px solid var(--blog-border)',
                      borderRadius: '0.25rem',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.72rem',
                      color: 'var(--blog-text)',
                      marginBottom: '1rem',
                    }}
                  >
                    {getCategoryIcon(featuredPost.category)}
                    <span>{featuredPost.category}</span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    style={{ textDecoration: 'none', color: 'var(--blog-text)' }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(1.55rem, 2.6vw, 2.15rem)',
                        fontWeight: 900,
                        color: 'var(--blog-text)',
                        lineHeight: 1.2,
                        marginBottom: '0.85rem',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p
                    style={{
                      fontSize: '0.98rem',
                      color: 'var(--blog-text-secondary)',
                      lineHeight: 1.65,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {featuredPost.excerpt}
                  </p>

                  {/* Interactive AI TL;DR Summary Box */}
                  <div
                    style={{
                      background: 'var(--blog-surface)',
                      border: '1px solid var(--blog-accent-cyan)',
                      borderRadius: '0.5rem',
                      padding: '0.9rem 1.1rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <button
                      onClick={() => toggleTldr(featuredPost.id)}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--blog-accent-cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                        <Sparkles size={14} />
                        <span>[AI_NEURAL_TL;DR_SUMMARY // {featuredPost.tldr.length} KEY VECTORS]</span>
                      </span>
                      {expandedTldrIds[featuredPost.id] ? (
                        <ChevronUp size={15} />
                      ) : (
                        <ChevronDown size={15} />
                      )}
                    </button>

                    {expandedTldrIds[featuredPost.id] && (
                      <ul
                        style={{
                          margin: '0.85rem 0 0 0',
                          paddingLeft: '1.15rem',
                          color: 'var(--blog-text)',
                          fontSize: '0.86rem',
                          lineHeight: 1.6,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.45rem',
                        }}
                      >
                        {featuredPost.tldr.map((point, idx) => (
                          <li key={idx} style={{ color: 'var(--blog-text-secondary)' }}>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--blog-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={featuredPost.author_avatar}
                      alt={featuredPost.author_name}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid var(--blog-border-strong)',
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blog-text)' }}>
                        {featuredPost.author_name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--blog-text-muted)',
                          fontFamily: 'var(--font-mono), monospace',
                        }}
                      >
                        <Clock size={11} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {featuredPost.reading_time_minutes} MIN READ
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'var(--blog-btn-bg)',
                      color: 'var(--blog-btn-text)',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '0.35rem',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>READ FULL DISPATCH</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Terminal Code Preview & Visual */}
              <div
                style={{
                  background: 'var(--blog-surface)',
                  borderLeft: '1px solid var(--blog-border)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    height: '200px',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    border: '1px solid var(--blog-border)',
                  }}
                >
                  <img
                    src={featuredPost.thumbnail_url}
                    alt={featuredPost.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(30%) contrast(115%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.82) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: 'rgba(0,0,0,0.85)',
                            border: '1px solid rgba(255,255,255,0.35)',
                            color: '#ffffff',
                            padding: '0.18rem 0.55rem',
                            borderRadius: '0.2rem',
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '0.68rem',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {featuredPost.code_snippet && (
                  <div
                    style={{
                      background: 'var(--blog-code-bg)',
                      border: '1px solid var(--blog-border)',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.45rem 0.85rem',
                        background: 'var(--blog-code-header)',
                        borderBottom: '1px solid rgba(255,255,255,0.14)',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.7rem',
                        color: '#10b981',
                      }}
                    >
                      <span>{featuredPost.code_snippet.label}</span>
                      <button
                        onClick={() =>
                          handleCopyCode(featuredPost.id, featuredPost.code_snippet!.code)
                        }
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#ffffff',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontFamily: 'var(--font-mono), monospace',
                          fontSize: '0.68rem',
                        }}
                      >
                        {copiedId === featuredPost.id ? (
                          <>
                            <Check size={12} color="#10b981" /> COPIED
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> COPY
                          </>
                        )}
                      </button>
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        padding: '0.9rem',
                        fontSize: '0.74rem',
                        lineHeight: 1.5,
                        color: 'var(--blog-code-text)',
                        fontFamily: 'var(--font-mono), monospace',
                        overflowX: 'auto',
                        maxHeight: '190px',
                      }}
                    >
                      <code>{featuredPost.code_snippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TECHNICAL DISPATCHES GRID ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--blog-border)',
            paddingBottom: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--blog-text)',
              letterSpacing: '0.06em',
            }}
          >
            // LATEST_AI_TECHNICAL_DISPATCHES ({gridPosts.length})
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '0.74rem',
              color: 'var(--blog-text-muted)',
            }}
          >
            SORT: CHRONOLOGICAL_DESC
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '1.75rem',
            marginBottom: '4.5rem',
          }}
        >
          {gridPosts.map((post) => (
            <article
              key={post.id}
              style={{
                background: 'var(--blog-card)',
                border: '1px solid var(--blog-border)',
                borderRadius: '0.65rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div>
                {/* Top Card Telemetry Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 1rem',
                    background: 'var(--blog-surface-elevated)',
                    borderBottom: '1px solid var(--blog-border)',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.7rem',
                    color: 'var(--blog-text-secondary)',
                  }}
                >
                  <span style={{ color: 'var(--blog-accent-cyan)', fontWeight: 700 }}>
                    {post.telemetry_id}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{post.reading_time_minutes} MIN READ</span>
                    {canManageBlog && (
                      <>
                        <button
                          onClick={() => openEditModal(post)}
                          title="Edit Post"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--blog-text)',
                            cursor: 'pointer',
                            padding: '0.1rem',
                          }}
                        >
                          <Edit3 size={12} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          title="Delete Post"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#f87171',
                            cursor: 'pointer',
                            padding: '0.1rem',
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Thumbnail */}
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ display: 'block', position: 'relative', height: '185px', overflow: 'hidden' }}
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
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      background: 'var(--blog-bg)',
                      border: '1px solid var(--blog-border-strong)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '0.25rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.68rem',
                      color: 'var(--blog-text)',
                      fontWeight: 700,
                    }}
                  >
                    {getCategoryIcon(post.category)}
                    <span>{post.category}</span>
                  </div>
                </Link>

                {/* Body */}
                <div style={{ padding: '1.35rem' }}>
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ textDecoration: 'none', color: 'var(--blog-text)' }}
                  >
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: 'var(--blog-text)',
                        lineHeight: 1.32,
                        marginBottom: '0.65rem',
                      }}
                    >
                      {post.title}
                    </h3>
                  </Link>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--blog-text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Interactive TL;DR Toggle */}
                  <div
                    style={{
                      background: 'var(--blog-surface)',
                      border: '1px solid var(--blog-border)',
                      borderRadius: '0.4rem',
                      padding: '0.6rem 0.8rem',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <button
                      onClick={() => toggleTldr(post.id)}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--blog-accent-emerald)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '0.71rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <span>&gt;_ AI_TL;DR ({post.tldr.length} POINTS)</span>
                      {expandedTldrIds[post.id] ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>

                    {expandedTldrIds[post.id] && (
                      <ul
                        style={{
                          margin: '0.65rem 0 0 0',
                          paddingLeft: '1rem',
                          fontSize: '0.78rem',
                          color: 'var(--blog-text-secondary)',
                          lineHeight: 1.5,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem',
                        }}
                      >
                        {post.tldr.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono), monospace',
                          color: 'var(--blog-text-secondary)',
                          background: 'var(--blog-surface)',
                          border: '1px solid var(--blog-border)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '0.2rem',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                style={{
                  padding: '0.9rem 1.35rem',
                  borderTop: '1px solid var(--blog-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--blog-surface)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.72rem',
                    color: 'var(--blog-text-muted)',
                  }}
                >
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--blog-text)',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textDecoration: 'none',
                  }}
                >
                  <span>EXECUTE_READ</span>
                  <ArrowUpRight size={14} color="var(--blog-accent-cyan)" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ================= AI DISPATCH NEWSLETTER TERMINAL ================= */}
        <div
          style={{
            background: 'var(--blog-surface)',
            border: '1px solid var(--blog-border-strong)',
            borderRadius: '0.75rem',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.74rem',
                color: 'var(--blog-accent-emerald)',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              // SUBSCRIBE_TO_AI_DISPATCH_STREAM
            </div>
            <h3
              style={{
                fontSize: '1.65rem',
                fontWeight: 900,
                color: 'var(--blog-text)',
                margin: '0 0 0.6rem 0',
              }}
            >
              Get Weekly Frontier AI Briefings, Prompt Templates & Remote AI Job Alerts
            </h3>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--blog-text-secondary)',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Zero fluff. Pure technical breakdowns on LLMs, AI coding workflows, data annotation
              rubrics, and open AI roles sent straight to your inbox.
            </p>
          </div>

          <div>
            {newsletterSubscribed ? (
              <div
                style={{
                  padding: '1rem 1.25rem',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid var(--blog-accent-emerald)',
                  borderRadius: '0.45rem',
                  color: 'var(--blog-text)',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.84rem',
                }}
              >
                [STATUS: CONFIRMED] // Node registered for weekly ReactJav AI Tech Dispatches.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim()) setNewsletterSubscribed(true);
                }}
                style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="engineer@domain.ai"
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    background: 'var(--blog-bg)',
                    border: '1px solid var(--blog-border)',
                    borderRadius: '0.4rem',
                    padding: '0.8rem 1rem',
                    color: 'var(--blog-text)',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.86rem',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--blog-btn-bg)',
                    color: 'var(--blog-btn-text)',
                    border: '1px solid var(--blog-border-strong)',
                    borderRadius: '0.4rem',
                    padding: '0.8rem 1.35rem',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <Send size={14} />
                  <span>SUBSCRIBE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ================= BLOG STUDIO EDITOR MODAL ================= */}
      {showEditorModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          <div
            style={{
              background: 'var(--blog-bg)',
              border: '1px solid var(--blog-border-strong)',
              borderRadius: '0.75rem',
              width: '100%',
              maxWidth: '780px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              color: 'var(--blog-text)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                paddingBottom: '0.85rem',
                borderBottom: '1px solid var(--blog-border)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  color: 'var(--blog-accent-cyan)',
                }}
              >
                {editingPost ? '// EDIT_AI_DISPATCH' : '// PUBLISH_NEW_AI_DISPATCH'}
              </span>
              <button
                onClick={() => setShowEditorModal(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--blog-border)',
                  color: 'var(--blog-text)',
                  borderRadius: '0.3rem',
                  padding: '0.3rem',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  ARTICLE TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Building Autonomous AI Workflows with Function Calling"
                  style={{
                    width: '100%',
                    background: 'var(--blog-surface)',
                    border: '1px solid var(--blog-border)',
                    borderRadius: '0.35rem',
                    padding: '0.65rem 0.85rem',
                    color: 'var(--blog-text)',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                    CATEGORY
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as BlogCategory)}
                    style={{
                      width: '100%',
                      background: 'var(--blog-surface)',
                      border: '1px solid var(--blog-border)',
                      borderRadius: '0.35rem',
                      padding: '0.65rem 0.85rem',
                      color: 'var(--blog-text)',
                    }}
                  >
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                    TAGS (COMMA SEPARATED)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="LLMs, Prompt Engineering, AI Jobs"
                    style={{
                      width: '100%',
                      background: 'var(--blog-surface)',
                      border: '1px solid var(--blog-border)',
                      borderRadius: '0.35rem',
                      padding: '0.65rem 0.85rem',
                      color: 'var(--blog-text)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  EXCERPT / SUMMARY *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--blog-surface)',
                    border: '1px solid var(--blog-border)',
                    borderRadius: '0.35rem',
                    padding: '0.65rem 0.85rem',
                    color: 'var(--blog-text)',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  AI TL;DR KEY POINTS (ONE PER LINE)
                </label>
                <textarea
                  rows={3}
                  value={formTldr}
                  onChange={(e) => setFormTldr(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--blog-surface)',
                    border: '1px solid var(--blog-border)',
                    borderRadius: '0.35rem',
                    padding: '0.65rem 0.85rem',
                    color: 'var(--blog-text)',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.82rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  FULL ARTICLE CONTENT (SUPPORTS ### HEADINGS & PARAGRAPHS) *
                </label>
                <textarea
                  rows={7}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--blog-surface)',
                    border: '1px solid var(--blog-border)',
                    borderRadius: '0.35rem',
                    padding: '0.65rem 0.85rem',
                    color: 'var(--blog-text)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  OPTIONAL CODE / PROMPT SNIPPET
                </label>
                <textarea
                  rows={4}
                  value={formCodeSnippet}
                  onChange={(e) => setFormCodeSnippet(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--blog-code-bg)',
                    border: '1px solid var(--blog-border)',
                    borderRadius: '0.35rem',
                    padding: '0.65rem 0.85rem',
                    color: '#10b981',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '0.8rem',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono), monospace', fontSize: '0.78rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                  />
                  <span>PIN AS FEATURED HERO DISPATCH</span>
                </label>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowEditorModal(false)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--blog-border)',
                      color: 'var(--blog-text)',
                      padding: '0.65rem 1.2rem',
                      borderRadius: '0.35rem',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: 'var(--blog-btn-bg)',
                      border: '1px solid var(--blog-border-strong)',
                      color: 'var(--blog-btn-text)',
                      padding: '0.65rem 1.4rem',
                      borderRadius: '0.35rem',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    {editingPost ? 'UPDATE DISPATCH' : 'PUBLISH DISPATCH'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
