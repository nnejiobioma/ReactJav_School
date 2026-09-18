'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Laptop, Check, ChevronDown } from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'system';

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply theme to document and update state
  const applyTheme = (mode: ThemeMode) => {
    let target: 'light' | 'dark' = 'light';

    if (mode === 'system') {
      const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      target = isSystemDark ? 'dark' : 'light';
    } else {
      target = mode;
    }

    setResolvedTheme(target);
    document.documentElement.setAttribute('data-theme', target);
    window.dispatchEvent(new Event('themechange'));
  };

  // Select a theme mode
  const handleSelectMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem('app-theme', mode);
    applyTheme(mode);
    setIsOpen(false);
  };

  // Initial load and listen to system preference changes
  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem('app-theme') as ThemeMode) || 'system';
    setThemeMode(saved);
    applyTheme(saved);

    // Media query listener for real-time OS theme switching
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const currentSaved = (localStorage.getItem('app-theme') as ThemeMode) || 'system';
      if (currentSaved === 'system') {
        const target = e.matches ? 'dark' : 'light';
        setResolvedTheme(target);
        document.documentElement.setAttribute('data-theme', target);
        window.dispatchEvent(new Event('themechange'));
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      mediaQuery.addListener(handleSystemChange);
    }

    // Close popover when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else {
        mediaQuery.removeListener(handleSystemChange);
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const options: { mode: ThemeMode; label: string; description: string; icon: any; color: string }[] = [
    {
      mode: 'light',
      label: 'Light Mode',
      description: 'Bright, clean high-contrast canvas',
      icon: Sun,
      color: '#d97706',
    },
    {
      mode: 'dark',
      label: 'Dark Mode',
      description: 'Deep cyber luxury aesthetic',
      icon: Moon,
      color: '#818cf8',
    },
    {
      mode: 'system',
      label: 'System Preference',
      description: `Follows device OS (${resolvedTheme === 'dark' ? 'Dark' : 'Light'} detected)`,
      icon: Laptop,
      color: '#06b6d4',
    },
  ];

  // Active trigger icon
  const ActiveIcon = !mounted ? Laptop : themeMode === 'light' ? Sun : themeMode === 'dark' ? Moon : Laptop;
  const activeColor = !mounted ? '#06b6d4' : themeMode === 'light' ? '#d97706' : themeMode === 'dark' ? '#818cf8' : '#06b6d4';

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-secondary btn-sm"
        title={mounted ? `Current Theme: ${themeMode} (${resolvedTheme}) - Click to change` : 'Select Theme Mode'}
        aria-label="Select Theme Mode"
        style={{
          width: '42px',
          height: '42px',
          padding: 0,
          borderRadius: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: activeColor,
          cursor: 'pointer',
          border: '1px solid var(--border-subtle)',
          position: 'relative',
        }}
      >
        <ActiveIcon size={19} />
        {mounted && themeMode === 'system' && (
          <span style={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: activeColor,
            boxShadow: `0 0 6px ${activeColor}`,
          }} />
        )}
      </button>

      {/* Floating Theme Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 0.6rem)',
          width: '260px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-accent)',
          borderRadius: '1rem',
          padding: '0.6rem',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 250,
          animation: 'fadeIn 0.15s ease',
        }}>
          <div style={{
            padding: '0.4rem 0.6rem 0.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '0.4rem',
          }}>
            <p style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              margin: 0,
            }}>
              Color Theme
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = themeMode === opt.mode;

              return (
                <button
                  key={opt.mode}
                  onClick={() => handleSelectMode(opt.mode)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '0.65rem',
                    border: 'none',
                    background: isSelected ? 'var(--bg-surface-elevated)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '0.5rem',
                      background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(0,0,0,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Icon size={16} color={opt.color} />
                    </div>
                    <div>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: isSelected ? 700 : 600,
                        color: 'var(--text-primary)',
                        display: 'block',
                      }}>
                        {opt.label}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        display: 'block',
                      }}>
                        {opt.description}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
