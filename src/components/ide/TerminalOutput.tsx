'use client';

import React, { useState } from 'react';
import { 
  Terminal, 
  Globe, 
  Table2, 
  Trash2, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { ExecutionResult } from '@/types/ide';

interface TerminalOutputProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  onClear: () => void;
  language: string;
}

export default function TerminalOutput({
  result,
  isRunning,
  onClear,
  language,
}: TerminalOutputProps) {
  const [activeTab, setActiveTab] = useState<'console' | 'preview' | 'table'>('console');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Auto-switch tabs based on output type
  React.useEffect(() => {
    if (result?.outputType === 'html') {
      setActiveTab('preview');
    } else if (result?.outputType === 'table') {
      setActiveTab('table');
    } else if (result) {
      setActiveTab('console');
    }
  }, [result]);

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = result.hasError 
      ? (result.stdout ? result.stdout + '\n' : '') + result.stderr 
      : result.stdout;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
    }}>
      {/* Terminal Tab Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.4rem 1rem',
        background: 'var(--bg-surface-elevated)',
        borderBottom: '1px solid var(--border-subtle)',
        flexShrink: 0,
        gap: '0.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {/* Console Tab */}
          <button
            onClick={() => setActiveTab('console')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: activeTab === 'console' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'console' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'console' ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'console' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <Terminal size={14} />
            <span>Terminal / Console</span>
          </button>

          {/* Web Preview Tab (Available for HTML or when preview exists) */}
          {(language === 'html' || result?.htmlPreview) && (
            <button
              onClick={() => setActiveTab('preview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: activeTab === 'preview' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'preview' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'preview' ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'preview' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <Globe size={14} />
              <span>Web Preview</span>
            </button>
          )}

          {/* Database Table Tab (Available for SQL or table output) */}
          {(language === 'sql' || result?.tableData) && (
            <button
              onClick={() => setActiveTab('table')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: activeTab === 'table' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'table' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'table' ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'table' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <Table2 size={14} />
              <span>Table Results</span>
              {result?.tableData && (
                <span className="badge badge-emerald" style={{ fontSize: '0.625rem', padding: '0.05rem 0.35rem' }}>
                  {result.tableData.rowCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Right Status & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Execution Time Status */}
          {isRunning ? (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              color: 'var(--primary)',
              fontWeight: 600,
            }}>
              <RefreshCw size={12} className="spin" />
              <span>Executing code...</span>
            </span>
          ) : result ? (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              color: result.hasError ? 'var(--accent-rose)' : 'var(--accent-emerald)',
              fontWeight: 600,
            }}>
              {result.hasError ? <AlertTriangle size={13} /> : <CheckCircle2 size={13} />}
              <span>{result.hasError ? 'Execution Error' : 'Success'} ({result.executionTimeMs}ms)</span>
            </span>
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Terminal Ready
            </span>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            disabled={!result}
            title="Copy Output"
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.25rem 0.55rem',
              fontSize: '0.75rem',
              borderRadius: '0.4rem',
              opacity: result ? 1 : 0.4,
              cursor: result ? 'pointer' : 'default',
            }}
          >
            {copied ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
          </button>

          {/* Clear Console Button */}
          <button
            onClick={onClear}
            disabled={!result}
            title="Clear Console"
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.25rem 0.55rem',
              fontSize: '0.75rem',
              borderRadius: '0.4rem',
              opacity: result ? 1 : 0.4,
              cursor: result ? 'pointer' : 'default',
            }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {/* 1. CONSOLE TAB */}
        {activeTab === 'console' && (
          <div style={{
            padding: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            minHeight: '100%',
          }}>
            {!result && !isRunning ? (
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                padding: '2.5rem 1rem',
                textAlign: 'center',
              }}>
                <Terminal size={36} style={{ opacity: 0.35, marginBottom: '0.75rem' }} />
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Console Ready</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  Press <kbd style={{ padding: '0.15rem 0.4rem', background: 'var(--bg-surface-elevated)', borderRadius: '0.3rem', border: '1px solid var(--border-subtle)' }}>Ctrl+Enter</kbd> or click <strong>Run Code</strong> to evaluate your script.
                </p>
              </div>
            ) : isRunning ? (
              <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 0' }}>
                <RefreshCw size={16} className="spin" />
                <span>Running {language} sandbox pipeline...</span>
              </div>
            ) : (
              <div>
                {/* Standard Output */}
                {result?.stdout && (
                  <pre style={{
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    color: 'var(--text-primary)',
                  }}>
                    {result.stdout}
                  </pre>
                )}

                {/* Standard Error */}
                {result?.hasError && result?.stderr && (
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: 'var(--accent-rose)',
                  }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <AlertTriangle size={14} />
                      <span>Runtime Traceback / Error:</span>
                    </div>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.825rem' }}>
                      {result.stderr}
                    </pre>
                  </div>
                )}

                <div style={{
                  marginTop: '1.25rem',
                  paddingTop: '0.5rem',
                  borderTop: '1px dashed var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                }}>
                  <span>Timestamp: {result?.timestamp}</span>
                  <span>•</span>
                  <span>Execution: {result?.executionTimeMs}ms</span>
                  <span>•</span>
                  <span>Status: {result?.hasError ? 'Failed (Exit Code 1)' : 'Completed (Exit Code 0)'}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. WEB PREVIEW TAB */}
        {activeTab === 'preview' && (
          <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              padding: '0.35rem 0.75rem',
              background: 'var(--bg-surface-elevated)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}>
              <span>Live Application Sandboxed Container</span>
              <button
                onClick={() => setIframeKey(k => k + 1)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', gap: '0.3rem' }}
              >
                <RefreshCw size={11} />
                <span>Reload Frame</span>
              </button>
            </div>
            <iframe
              key={iframeKey}
              srcDoc={result?.htmlPreview || '<body style="font-family:sans-serif;padding:2rem;text-align:center;color:#64748b;">Click <strong>Run Code</strong> to generate live application view.</body>'}
              title="Interactive App Preview"
              sandbox="allow-scripts allow-modals"
              style={{
                flex: 1,
                width: '100%',
                border: 'none',
                background: '#ffffff',
              }}
            />
          </div>
        )}

        {/* 3. SQL TABLE TAB */}
        {activeTab === 'table' && (
          <div style={{ padding: '1rem', height: '100%', overflow: 'auto' }}>
            {result?.tableData ? (
              <div>
                <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Query Result: {result.tableData.rowCount} records returned
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {result.executionTimeMs}ms execution
                  </span>
                </div>

                <div style={{
                  overflowX: 'auto',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                        {result.tableData.columns.map((col) => (
                          <th key={col} style={{ padding: '0.65rem 0.95rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.tableData.rows.length === 0 ? (
                        <tr>
                          <td colSpan={result.tableData.columns.length} style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No rows matched query criteria.
                          </td>
                        </tr>
                      ) : (
                        result.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} style={{
                            borderBottom: '1px solid var(--border-subtle)',
                            background: rIdx % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.015)',
                          }}>
                            {result.tableData!.columns.map((col) => (
                              <td key={col} style={{ padding: '0.65rem 0.95rem', color: 'var(--text-primary)', fontFamily: typeof row[col] === 'number' ? 'var(--font-mono)' : 'inherit' }}>
                                {row[col] !== null && row[col] !== undefined ? String(row[col]) : '<NULL>'}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Execute a SQL query to view relational table records.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
