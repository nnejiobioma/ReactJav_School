'use client';

import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Table,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  Highlighter,
  Palette,
  Minus,
  Eye,
  Columns,
  Edit3,
  Trash2,
  Sparkles,
  Check,
  X,
} from 'lucide-react';
import RichContentRenderer from './RichContentRenderer';

interface RichContentEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  minRows?: number;
  label?: string;
  helperText?: string;
  defaultMode?: 'write' | 'split' | 'preview';
}

const PRESET_AI_ILLUSTRATIONS = [
  {
    label: 'Neural Network & AI Brain',
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Machine Learning Data Pipeline',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Generative AI & Abstract Nodes',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'AI Robotics & Human Collaboration',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Modern Code & Software Architecture',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Team Workshop & AI Strategy',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
  },
];

const TEXT_COLORS = [
  { name: 'Indigo', hex: '#818cf8' },
  { name: 'Emerald', hex: '#34d399' },
  { name: 'Amber', hex: '#fbbf24' },
  { name: 'Cyan', hex: '#22d3ee' },
  { name: 'Rose', hex: '#fb7185' },
];

/**
 * Compresses an uploaded image file via HTML5 Canvas so it can be embedded
 * cleanly and persisted in localStorage / JSON / Supabase without bloat.
 */
export async function compressImageFileToDataUrl(file: File, maxWidth = 1100, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (!result) {
        reject(new Error('Could not read image file'));
        return;
      }
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsDataURL(file);
  });
}

export default function RichContentEditor({
  value,
  onChange,
  placeholder = 'Write formatted course content, paste or upload pictures, add headings, tables, and callouts...',
  minRows = 10,
  label,
  helperText,
  defaultMode = 'write',
}: RichContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [viewMode, setViewMode] = useState<'write' | 'split' | 'preview'>(defaultMode);
  const [showImagePanel, setShowImagePanel] = useState(false);
  const [showLinkPanel, setShowLinkPanel] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Image inserter state
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageCaptionInput, setImageCaptionInput] = useState('');
  const [imageWidthInput, setImageWidthInput] = useState<'100%' | '70%' | '45%'>('100%');

  // Link inserter state
  const [linkTextInput, setLinkTextInput] = useState('');
  const [linkUrlInput, setLinkUrlInput] = useState('https://');

  const insertAtSelection = (prefix: string, suffix: string = '', defaultSelection: string = 'text') => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(`${value}${value.endsWith('\n') || !value ? '' : '\n'}${prefix}${defaultSelection}${suffix}`);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || defaultSelection;
    const before = value.substring(0, start);
    const after = value.substring(end);
    const updated = `${before}${prefix}${selected}${suffix}${after}`;
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 20);
  };

  const insertBlockSnippet = (snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(`${value}${value ? '\n\n' : ''}${snippet}\n`);
      return;
    }
    const start = textarea.selectionStart;
    const before = value.substring(0, start);
    const after = value.substring(textarea.selectionEnd);
    const needsLeadingNewline = before.length > 0 && !before.endsWith('\n');
    const updated = `${before}${needsLeadingNewline ? '\n\n' : ''}${snippet}\n${after}`;
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
    }, 20);
  };

  const insertImageMarkdown = (src: string, caption: string, width: '100%' | '70%' | '45%') => {
    const cleanCaption = (caption || 'Course visual').replace(/\]/g, '');
    const altMeta = width === '100%' ? cleanCaption : `${cleanCaption}|width=${width}`;
    const snippet = `![${altMeta}](${src})`;
    insertBlockSnippet(snippet);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploadingImage(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        const dataUrl = await compressImageFileToDataUrl(file);
        const defaultCaption = imageCaptionInput.trim() || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        insertImageMarkdown(dataUrl, defaultCaption, imageWidthInput);
      }
      setImageCaptionInput('');
      setShowImagePanel(false);
    } catch (err) {
      console.error('Image upload error:', err);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          setIsUploadingImage(true);
          try {
            const dataUrl = await compressImageFileToDataUrl(file);
            insertImageMarkdown(dataUrl, 'Pasted screenshot', imageWidthInput);
          } finally {
            setIsUploadingImage(false);
          }
        }
        return;
      }
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileUpload(e.dataTransfer.files);
    }
  };

  // Extract embedded markdown images so user can resize or remove them visually
  const embeddedImages: { fullMatch: string; caption: string; width: string; src: string }[] = [];
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = imgRegex.exec(value || '')) !== null) {
    const rawAlt = m[1] || '';
    const parts = rawAlt.split('|');
    const caption = parts[0]?.trim() || 'Image';
    const wPart = parts.find((p) => p.trim().startsWith('width='));
    const width = wPart ? wPart.trim().replace('width=', '') : '100%';
    embeddedImages.push({
      fullMatch: m[0],
      caption,
      width,
      src: m[2],
    });
  }

  const updateEmbeddedImageWidth = (targetMatch: string, caption: string, src: string, newWidth: string) => {
    const altMeta = newWidth === '100%' ? caption : `${caption}|width=${newWidth}`;
    const replacement = `![${altMeta}](${src})`;
    onChange(value.replace(targetMatch, replacement));
  };

  const removeEmbeddedImage = (targetMatch: string) => {
    onChange(value.replace(targetMatch, '').replace(/\n{3,}/g, '\n\n'));
  };

  const toolBtnStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    borderRadius: '0.4rem',
    padding: '0.35rem 0.5rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.28rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    transition: 'all 0.15s ease',
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={handleDrop}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        border: isDraggingOver ? '2px dashed var(--primary)' : '1px solid var(--border-subtle)',
        borderRadius: '0.85rem',
        background: 'var(--bg-surface)',
        overflow: 'hidden',
        transition: 'border 0.15s ease',
      }}
    >
      {/* Optional Top Label Header */}
      {(label || helperText) && (
        <div
          style={{
            padding: '0.75rem 1rem 0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div>
            {label && (
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {label}
              </label>
            )}
            {helperText && (
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                {helperText}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Rich Formatting & Image Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.4rem',
          padding: '0.6rem 0.85rem',
          background: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.3rem' }}>
          {/* Headings */}
          <button
            type="button"
            onClick={() => insertAtSelection('## ', '', 'Section Heading')}
            style={toolBtnStyle}
            title="Heading 2"
          >
            <Heading1 size={14} />
            <span>H1</span>
          </button>
          <button
            type="button"
            onClick={() => insertAtSelection('### ', '', 'Subheading')}
            style={toolBtnStyle}
            title="Heading 3"
          >
            <Heading2 size={14} />
            <span>H2</span>
          </button>
          <button
            type="button"
            onClick={() => insertAtSelection('#### ', '', 'Topic Title')}
            style={toolBtnStyle}
            title="Heading 4"
          >
            <Heading3 size={14} />
            <span>H3</span>
          </button>

          <span style={{ width: '1px', height: '18px', background: 'var(--border-subtle)', margin: '0 0.15rem' }} />

          {/* Text Formatting */}
          <button
            type="button"
            onClick={() => insertAtSelection('**', '**', 'bold text')}
            style={toolBtnStyle}
            title="Bold"
          >
            <Bold size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertAtSelection('*', '*', 'italic text')}
            style={toolBtnStyle}
            title="Italic"
          >
            <Italic size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertAtSelection('<u>', '</u>', 'underlined text')}
            style={toolBtnStyle}
            title="Underline"
          >
            <Underline size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertAtSelection('~~', '~~', 'strikethrough')}
            style={toolBtnStyle}
            title="Strikethrough"
          >
            <Strikethrough size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertAtSelection('==', '==', 'highlighted key concept')}
            style={toolBtnStyle}
            title="Highlight Text"
          >
            <Highlighter size={14} color="#fbbf24" />
          </button>

          {/* Text Color Picker */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowColorMenu(!showColorMenu)}
              style={toolBtnStyle}
              title="Text Color"
            >
              <Palette size={14} color="#a5b4fc" />
            </button>
            {showColorMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  left: 0,
                  zIndex: 50,
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: '0.5rem',
                  padding: '0.4rem',
                  display: 'flex',
                  gap: '0.35rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                }}
              >
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      insertAtSelection(`<span style="color:${c.hex}">`, '</span>', 'colored text');
                      setShowColorMenu(false);
                    }}
                    title={c.name}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: c.hex,
                      border: '2px solid rgba(255,255,255,0.4)',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <span style={{ width: '1px', height: '18px', background: 'var(--border-subtle)', margin: '0 0.15rem' }} />

          {/* Lists, Quote, Code, Table, Divider */}
          <button
            type="button"
            onClick={() => insertAtSelection('- ', '', 'Bullet point item')}
            style={toolBtnStyle}
            title="Bullet List"
          >
            <List size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertAtSelection('1. ', '', 'Numbered step')}
            style={toolBtnStyle}
            title="Numbered List"
          >
            <ListOrdered size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertAtSelection('> **Key Takeaway:** ', '', 'Important callout note for learners.')}
            style={toolBtnStyle}
            title="Callout / Quote Box"
          >
            <Quote size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertBlockSnippet('```text\n// Example or diagram\n```')}
            style={toolBtnStyle}
            title="Code / Diagram Block"
          >
            <Code size={14} />
          </button>
          <button
            type="button"
            onClick={() =>
              insertBlockSnippet(
                '| Concept | Description | Example |\n| :--- | :--- | :--- |\n| **Point 1** | Key explanation here | Real-world use |\n| **Point 2** | Second explanation | Everyday tool |'
              )
            }
            style={toolBtnStyle}
            title="Insert Formatted Table"
          >
            <Table size={14} />
          </button>
          <button
            type="button"
            onClick={() => insertBlockSnippet('---')}
            style={toolBtnStyle}
            title="Horizontal Divider"
          >
            <Minus size={14} />
          </button>

          {/* Link Button */}
          <button
            type="button"
            onClick={() => {
              setShowLinkPanel(!showLinkPanel);
              setShowImagePanel(false);
            }}
            style={{
              ...toolBtnStyle,
              borderColor: showLinkPanel ? 'var(--primary)' : 'var(--border-subtle)',
            }}
            title="Insert Web Link"
          >
            <LinkIcon size={14} />
          </button>

          {/* Add Picture / Image Studio Button */}
          <button
            type="button"
            onClick={() => {
              setShowImagePanel(!showImagePanel);
              setShowLinkPanel(false);
            }}
            style={{
              ...toolBtnStyle,
              background: showImagePanel
                ? 'var(--primary)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
              borderColor: 'rgba(99, 102, 241, 0.45)',
              color: '#ffffff',
              padding: '0.35rem 0.7rem',
            }}
            title="Upload or Insert Picture / Illustration"
          >
            <ImageIcon size={14} color="#34d399" />
            <span>+ Add Picture</span>
          </button>
        </div>

        {/* Mode Switcher: Write | Split | Preview */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            background: 'var(--bg-surface)',
            padding: '0.2rem',
            borderRadius: '0.45rem',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <button
            type="button"
            onClick={() => setViewMode('write')}
            style={{
              border: 'none',
              background: viewMode === 'write' ? 'var(--primary)' : 'transparent',
              color: viewMode === 'write' ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: '0.3rem',
              padding: '0.25rem 0.55rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <Edit3 size={12} />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('split')}
            style={{
              border: 'none',
              background: viewMode === 'split' ? 'var(--primary)' : 'transparent',
              color: viewMode === 'split' ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: '0.3rem',
              padding: '0.25rem 0.55rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <Columns size={12} />
            <span>Split</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            style={{
              border: 'none',
              background: viewMode === 'preview' ? 'var(--primary)' : 'transparent',
              color: viewMode === 'preview' ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: '0.3rem',
              padding: '0.25rem 0.55rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <Eye size={12} />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Expandable Link Inserter Drawer */}
      {showLinkPanel && (
        <div
          style={{
            padding: '0.85rem 1rem',
            background: 'rgba(99, 102, 241, 0.08)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '0.65rem',
          }}
        >
          <div style={{ flex: '1 1 180px' }}>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>
              Link Label
            </label>
            <input
              type="text"
              placeholder="e.g. Google Teachable Machine"
              value={linkTextInput}
              onChange={(e) => setLinkTextInput(e.target.value)}
              className="form-input"
              style={{ padding: '0.4rem 0.65rem', fontSize: '0.82rem' }}
            />
          </div>
          <div style={{ flex: '2 1 240px' }}>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>
              Destination URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={linkUrlInput}
              onChange={(e) => setLinkUrlInput(e.target.value)}
              className="form-input"
              style={{ padding: '0.4rem 0.65rem', fontSize: '0.82rem' }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (!linkUrlInput.trim()) return;
              insertAtSelection(`[${linkTextInput.trim() || 'Resource Link'}](`, ')', linkUrlInput.trim());
              setLinkTextInput('');
              setLinkUrlInput('https://');
              setShowLinkPanel(false);
            }}
            className="btn btn-primary btn-sm"
          >
            <Check size={14} />
            <span>Insert Link</span>
          </button>
          <button
            type="button"
            onClick={() => setShowLinkPanel(false)}
            className="btn btn-secondary btn-sm"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Expandable Picture / Image Uploader & Gallery Drawer */}
      {showImagePanel && (
        <div
          style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.06) 100%)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={17} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Insert Picture into Course Content
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                (Upload from computer, paste image URL, or pick a diagram — you can also drag & drop or Ctrl+V paste images!)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowImagePanel(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Caption & Display Width Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Image Caption / Alt Text (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Figure 1: The AI, ML, DL, and GenAI Concentric Map"
                value={imageCaptionInput}
                onChange={(e) => setImageCaptionInput(e.target.value)}
                className="form-input"
                style={{ padding: '0.45rem 0.7rem', fontSize: '0.82rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Display Size in Lesson
              </label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {(['45%', '70%', '100%'] as const).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setImageWidthInput(w)}
                    style={{
                      flex: 1,
                      padding: '0.42rem 0.5rem',
                      borderRadius: '0.45rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: imageWidthInput === w ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                      background: imageWidthInput === w ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-surface)',
                      color: imageWidthInput === w ? '#ffffff' : 'var(--text-secondary)',
                    }}
                  >
                    {w === '45%' ? 'Small (45%)' : w === '70%' ? 'Medium (70%)' : 'Full Width (100%)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Option 1: Upload from Device + Option 2: Paste Image URL */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', alignItems: 'end' }}>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImage}
                className="btn btn-primary btn-sm"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.55rem 0.85rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderColor: '#059669',
                  gap: '0.45rem',
                }}
              >
                <Upload size={15} />
                <span>{isUploadingImage ? 'Optimizing & Inserting...' : 'Upload Picture from Computer'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.45rem' }}>
              <input
                type="text"
                placeholder="Or paste image URL (https://...)"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="form-input"
                style={{ flex: 1, padding: '0.45rem 0.7rem', fontSize: '0.82rem' }}
              />
              <button
                type="button"
                disabled={!imageUrlInput.trim()}
                onClick={() => {
                  insertImageMarkdown(imageUrlInput.trim(), imageCaptionInput.trim() || 'Course illustration', imageWidthInput);
                  setImageUrlInput('');
                  setImageCaptionInput('');
                  setShowImagePanel(false);
                }}
                className="btn btn-primary btn-sm"
                style={{ whiteSpace: 'nowrap' }}
              >
                Insert URL
              </button>
            </div>
          </div>

          {/* Option 3: Quick AI & Engineering Visuals Gallery */}
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.4rem' }}>
              <Sparkles size={12} color="var(--primary)" />
              <span>Quick-Insert Course Illustrations:</span>
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {PRESET_AI_ILLUSTRATIONS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    insertImageMarkdown(item.url, imageCaptionInput.trim() || item.label, imageWidthInput);
                    setImageCaptionInput('');
                    setShowImagePanel(false);
                  }}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.5rem',
                    padding: '0.3rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                  title={`Click to insert "${item.label}"`}
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    style={{ width: '100%', height: '54px', objectFit: 'cover', borderRadius: '0.35rem', marginBottom: '0.25rem' }}
                  />
                  <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Editor / Split / Preview Body */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'split' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
          gap: '0',
        }}
      >
        {(viewMode === 'write' || viewMode === 'split') && (
          <div style={{ borderRight: viewMode === 'split' ? '1px solid var(--border-subtle)' : 'none' }}>
            <textarea
              ref={textareaRef}
              rows={minRows}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onPaste={handlePaste}
              placeholder={placeholder}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                lineHeight: 1.7,
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div
            style={{
              padding: '1.15rem 1.25rem',
              background: 'rgba(255, 255, 255, 0.015)',
              minHeight: `${minRows * 24}px`,
              maxHeight: '560px',
              overflowY: 'auto',
            }}
          >
            {viewMode === 'split' && (
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>
                Live Rich Text & Picture Preview
              </div>
            )}
            {value && value.trim() ? (
              <RichContentRenderer content={value} />
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontStyle: 'italic' }}>
                Nothing to preview yet. Use the toolbar above to format text or add pictures.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Embedded Pictures Quick-Manager Bar */}
      {embeddedImages.length > 0 && (
        <div
          style={{
            padding: '0.6rem 0.9rem',
            background: 'var(--bg-surface-elevated)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            overflowX: 'auto',
          }}
        >
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Pictures in Content ({embeddedImages.length}):
          </span>
          {embeddedImages.map((img, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.45rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                flexShrink: 0,
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                style={{ width: '28px', height: '22px', objectFit: 'cover', borderRadius: '0.25rem' }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {img.caption}
              </span>
              {(['45%', '70%', '100%'] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => updateEmbeddedImageWidth(img.fullMatch, img.caption, img.src, w)}
                  style={{
                    border: 'none',
                    borderRadius: '0.25rem',
                    padding: '0.1rem 0.3rem',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: img.width === w ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                    color: img.width === w ? '#ffffff' : 'var(--text-muted)',
                  }}
                  title={`Resize image to ${w}`}
                >
                  {w}
                </button>
              ))}
              <button
                type="button"
                onClick={() => removeEmbeddedImage(img.fullMatch)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f87171',
                  cursor: 'pointer',
                  padding: '0.1rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Remove picture from content"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

