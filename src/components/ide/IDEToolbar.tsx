'use client';

import React from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  BookOpen, 
  ChevronDown,
  Terminal,
  Code2,
  Database,
  Globe,
  Plus,
  Minus
} from 'lucide-react';
import { IDELanguage, IDETemplate } from '@/types/ide';

interface IDEToolbarProps {
  selectedLanguage: IDELanguage;
  onSelectLanguage: (lang: IDELanguage) => void;
  templates: IDETemplate[];
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onRun: () => void;
  isRunning: boolean;
  onReset: () => void;
  onCopy: () => void;
  isCopied: boolean;
  onDownload: () => void;
  fontSize: number;
  onFontSizeChange: (delta: number) => void;
}

export default function IDEToolbar({
  selectedLanguage,
  onSelectLanguage,
  templates,
  selectedTemplateId,
  onSelectTemplate,
  onRun,
  isRunning,
  onReset,
  onCopy,
  isCopied,
  onDownload,
  fontSize,
  onFontSizeChange,
}: IDEToolbarProps) {
  const languageOptions: { lang: IDELanguage; label: string; icon: any; color: string }[] = [
    { lang: 'python', label: 'Python 3', icon: Terminal, color: '#3b82f6' },
    { lang: 'javascript', label: 'JavaScript ES6', icon: Code2, color: '#f59e0b' },
    { lang: 'html', label: 'Web App (HTML/CSS)', icon: Globe, color: '#06b6d4' },
    { lang: 'sql', label: 'SQL Sandbox', icon: Database, color: '#10b981' },
  ];

  const filteredTemplates = templates.filter(t => t.language === selectedLanguage);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.65rem 1rem',
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      flexWrap: 'wrap',
      gap: '0.75rem',
      zIndex: 10,
    }}>
      {/* Left: Language Tabs & Challenge Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
        {/* Language Switcher Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: 'var(--bg-surface-elevated)',
          padding: '0.2rem 0.3rem',
          borderRadius: '0.75rem',
          border: '1px solid var(--border-subtle)',
        }}>
          {languageOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedLanguage === opt.lang;
            return (
              <button
                key={opt.lang}
                onClick={() => onSelectLanguage(opt.lang)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '0.55rem',
                  border: 'none',
                  background: isSelected ? 'var(--bg-surface)' : 'transparent',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={14} color={opt.color} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Practice Challenge Dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            value={selectedTemplateId}
            onChange={(e) => onSelectTemplate(e.target.value)}
            style={{
              padding: '0.45rem 2rem 0.45rem 0.85rem',
              borderRadius: '0.65rem',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              appearance: 'none',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {filteredTemplates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.title} ({tpl.difficulty})
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            color="var(--text-muted)"
            style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
        </div>
      </div>

      {/* Right: Actions (Run, Reset, Copy, Download, Font Size) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {/* Font Size Adjuster */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem',
          background: 'var(--bg-surface-elevated)',
          padding: '0.2rem 0.4rem',
          borderRadius: '0.6rem',
          border: '1px solid var(--border-subtle)',
        }}>
          <button
            onClick={() => onFontSizeChange(-1)}
            disabled={fontSize <= 11}
            title="Decrease Font Size"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: fontSize > 11 ? 'pointer' : 'default',
              padding: '0.15rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Minus size={13} />
          </button>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, minWidth: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            {fontSize}px
          </span>
          <button
            onClick={() => onFontSizeChange(1)}
            disabled={fontSize >= 20}
            title="Increase Font Size"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: fontSize < 20 ? 'pointer' : 'default',
              padding: '0.15rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Plus size={13} />
          </button>
        </div>

        {/* Reset to Challenge Template */}
        <button
          onClick={onReset}
          className="btn btn-secondary btn-sm"
          title="Reset Code to Default Template"
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', gap: '0.4rem' }}
        >
          <RotateCcw size={14} />
          <span style={{ display: 'none', sm: 'inline' }}>Reset</span>
        </button>

        {/* Copy Code */}
        <button
          onClick={onCopy}
          className="btn btn-secondary btn-sm"
          title="Copy Code to Clipboard"
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', gap: '0.4rem' }}
        >
          {isCopied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
          <span>{isCopied ? 'Copied' : 'Copy'}</span>
        </button>

        {/* Download File */}
        <button
          onClick={onDownload}
          className="btn btn-secondary btn-sm"
          title="Download Script File"
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', gap: '0.4rem' }}
        >
          <Download size={14} />
          <span>Save</span>
        </button>

        {/* Primary Action: Run Code */}
        <button
          onClick={onRun}
          disabled={isRunning}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.25rem',
            borderRadius: '0.65rem',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: 'none',
            cursor: isRunning ? 'wait' : 'pointer',
            boxShadow: '0 4px 14px -2px rgba(16, 185, 129, 0.4)',
            transition: 'all 0.15s ease',
          }}
        >
          <Play size={15} fill="#ffffff" />
          <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          <span style={{
            fontSize: '0.68rem',
            padding: '0.1rem 0.35rem',
            background: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '0.3rem',
            marginLeft: '0.2rem',
          }}>
            Ctrl+↵
          </span>
        </button>
      </div>
    </div>
  );
}
