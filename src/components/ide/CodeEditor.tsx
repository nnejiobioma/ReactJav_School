'use client';

import React, { useRef, useEffect } from 'react';
import { IDELanguage } from '@/types/ide';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  language: IDELanguage;
  onRun?: () => void;
  fontSize?: number;
}

export default function CodeEditor({
  code,
  onChange,
  language,
  onRun,
  fontSize = 14,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = code.split('\n');
  const lineCount = lines.length || 1;

  // Sync scrolling between line numbers and textarea
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Keyboard shortcut & Tab indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Run code shortcut: Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (onRun) onRun();
      return;
    }

    // Tab key inserts 4 spaces for Python, 2 for JS/HTML/SQL
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const indent = language === 'python' ? '    ' : '  ';

      const updatedCode = code.substring(0, start) + indent + code.substring(end);
      onChange(updatedCode);

      // Reset cursor position after React re-renders
      setTimeout(() => {
        if (target) {
          target.selectionStart = target.selectionEnd = start + indent.length;
        }
      }, 0);
    }
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      height: '100%',
      width: '100%',
      background: 'var(--bg-main)',
      fontFamily: 'var(--font-mono)',
      fontSize: `${fontSize}px`,
      overflow: 'hidden',
    }}>
      {/* Line Numbers Column */}
      <div
        ref={lineNumbersRef}
        aria-hidden="true"
        style={{
          width: '3.5rem',
          padding: '1rem 0.6rem 1rem 0',
          textAlign: 'right',
          color: 'var(--text-muted)',
          userSelect: 'none',
          background: 'rgba(0, 0, 0, 0.03)',
          borderRight: '1px solid var(--border-subtle)',
          lineHeight: '1.6',
          overflow: 'hidden',
          flexShrink: 0,
          fontWeight: 500,
          fontSize: `${fontSize - 1}px`,
        }}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i + 1} style={{ height: '1.6em', opacity: 0.7 }}>
            {i + 1}
          </div>
        ))}
      </div>

      {/* Code Input Area */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        spellCheck={false}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        placeholder={`Write ${language} code here...`}
        style={{
          flex: 1,
          height: '100%',
          padding: '1rem',
          margin: 0,
          background: 'transparent',
          color: 'var(--text-primary)',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: '1.6',
          whiteSpace: 'pre',
          overflowWrap: 'normal',
          overflowX: 'auto',
          tabSize: language === 'python' ? 4 : 2,
        }}
      />
    </div>
  );
}
