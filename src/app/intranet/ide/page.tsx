'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  Code2, 
  ArrowLeft, 
  BookOpen, 
  FileCode, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Info, 
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import IntranetGuard from '@/components/intranet/IntranetGuard';
import CodeEditor from '@/components/ide/CodeEditor';
import TerminalOutput from '@/components/ide/TerminalOutput';
import IDEToolbar from '@/components/ide/IDEToolbar';
import { IDELanguage, IDETemplate, IDEFile, ExecutionResult } from '@/types/ide';
import { IDE_TEMPLATES } from '@/lib/ide/templates';
import { 
  executePythonCode, 
  executeJavaScriptCode, 
  executeSQLCode, 
  buildHtmlPreview 
} from '@/lib/ide/engine';

export default function CampusIDEPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<IDELanguage>('python');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('py-analytics');
  const [activeFileId, setActiveFileId] = useState<string>('main-py');
  const [files, setFiles] = useState<IDEFile[]>([]);
  const [currentCode, setCurrentCode] = useState<string>('');
  
  // Execution & Output state
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [fontSize, setFontSize] = useState<number>(14);
  const [isCopied, setIsCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Active template
  const currentTemplate = IDE_TEMPLATES.find(t => t.id === selectedTemplateId) || IDE_TEMPLATES[0];

  // Initialize or load template
  useEffect(() => {
    loadTemplate(currentTemplate);
  }, []);

  const loadTemplate = (template: IDETemplate) => {
    setSelectedTemplateId(template.id);
    setSelectedLanguage(template.language);
    setFiles(template.files);
    const firstFile = template.files[0];
    setActiveFileId(firstFile?.id || '');

    // Check localStorage for saved draft or use template content
    const saved = localStorage.getItem(`reactjav-ide-${template.id}`);
    const codeToLoad = saved !== null ? saved : (firstFile?.content || '');
    setCurrentCode(codeToLoad);
    setExecutionResult(null);
  };

  const handleLanguageChange = (lang: IDELanguage) => {
    const defaultTpl = IDE_TEMPLATES.find(t => t.language === lang) || IDE_TEMPLATES[0];
    loadTemplate(defaultTpl);
  };

  const handleTemplateChange = (templateId: string) => {
    const tpl = IDE_TEMPLATES.find(t => t.id === templateId);
    if (tpl) {
      loadTemplate(tpl);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCurrentCode(newCode);
    localStorage.setItem(`reactjav-ide-${selectedTemplateId}`, newCode);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset this code to the original challenge template?')) {
      const original = currentTemplate.files[0]?.content || '';
      setCurrentCode(original);
      localStorage.removeItem(`reactjav-ide-${selectedTemplateId}`);
      setExecutionResult(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = {
      python: 'py',
      javascript: 'js',
      html: 'html',
      sql: 'sql'
    }[selectedLanguage] || 'txt';

    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reactjav_${selectedTemplateId}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Run Code Execution
  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);

    try {
      let result: ExecutionResult;
      if (selectedLanguage === 'python') {
        result = await executePythonCode(currentCode);
      } else if (selectedLanguage === 'javascript') {
        result = await executeJavaScriptCode(currentCode);
      } else if (selectedLanguage === 'sql') {
        result = executeSQLCode(currentCode);
      } else {
        result = buildHtmlPreview(currentCode);
      }
      setExecutionResult(result);
    } catch (err: any) {
      setExecutionResult({
        stdout: '',
        stderr: err.message || 'Execution error occurred',
        outputType: 'text',
        executionTimeMs: 0,
        hasError: true,
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <IntranetGuard requiredFeatureTitle="Campus Engineering IDE & Sandbox">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - var(--header-height, 8.75rem))',
        background: 'var(--bg-main)',
        overflow: 'hidden',
      }}>
        {/* Top Breadcrumb & Engine Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1.25rem',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          flexShrink: 0,
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              href="/intranet"
              className="btn btn-secondary btn-sm"
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                gap: '0.4rem',
                borderRadius: '0.5rem',
              }}
            >
              <ArrowLeft size={14} />
              <span>Campus Intranet</span>
            </Link>

            <div style={{ width: '1px', height: '18px', background: 'var(--border-subtle)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '0.4rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Terminal size={14} color="#ffffff" />
              </div>
              <h1 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Campus Engineering IDE & Sandbox
              </h1>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                Secure Intranet Workstation
              </span>
            </div>
          </div>

          {/* Engine Status Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="btn btn-secondary btn-sm"
              style={{
                fontSize: '0.75rem',
                padding: '0.3rem 0.65rem',
                gap: '0.35rem',
                color: showInstructions ? 'var(--primary)' : 'var(--text-secondary)',
              }}
            >
              {showInstructions ? <PanelLeftClose size={13} /> : <PanelLeftOpen size={13} />}
              <span>{showInstructions ? 'Hide Challenge Brief' : 'Show Challenge Brief'}</span>
            </button>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-surface-elevated)',
              padding: '0.3rem 0.65rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
            }}>
              <Zap size={12} color="var(--accent-amber)" />
              <span>Pyodide WASM + Client Sandboxes</span>
            </div>
          </div>
        </div>

        {/* IDE Action Toolbar */}
        <IDEToolbar
          selectedLanguage={selectedLanguage}
          onSelectLanguage={handleLanguageChange}
          templates={IDE_TEMPLATES}
          selectedTemplateId={selectedTemplateId}
          onSelectTemplate={handleTemplateChange}
          onRun={handleRun}
          isRunning={isRunning}
          onReset={handleReset}
          onCopy={handleCopy}
          isCopied={isCopied}
          onDownload={handleDownload}
          fontSize={fontSize}
          onFontSizeChange={(delta) => setFontSize(f => Math.min(22, Math.max(11, f + delta)))}
        />

        {/* Main Workstation Split Pane */}
        <div style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Collapsible Challenge Instructions Sidebar */}
          {showInstructions && (
            <aside style={{
              width: '320px',
              background: 'var(--bg-surface)',
              borderRight: '1px solid var(--border-subtle)',
              overflowY: 'auto',
              flexShrink: 0,
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)', fontWeight: 700 }}>
                    {currentTemplate.category}
                  </span>
                  <span className={`badge ${
                    currentTemplate.difficulty === 'Beginner' ? 'badge-emerald' :
                    currentTemplate.difficulty === 'Intermediate' ? 'badge-primary' : 'badge-amber'
                  }`} style={{ fontSize: '0.625rem' }}>
                    {currentTemplate.difficulty}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                  {currentTemplate.title}
                </h2>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {currentTemplate.description}
                </p>
              </div>

              {/* Instructions Box */}
              <div style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.825rem',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>
                  <Info size={14} />
                  <span>Challenge Instructions</span>
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {currentTemplate.instructions}
                </div>
              </div>

              {/* Expected Outcome */}
              {currentTemplate.expectedOutcome && (
                <div>
                  <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Expected Outcome
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {currentTemplate.expectedOutcome}
                  </p>
                </div>
              )}

              {/* Quick Keyboard Reference */}
              <div style={{
                marginTop: 'auto',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Pro Shortcuts:</div>
                <div>• <kbd style={{ padding: '0.1rem 0.3rem', background: 'var(--bg-surface-elevated)', borderRadius: '0.2rem' }}>Ctrl+Enter</kbd> : Execute code</div>
                <div>• <kbd style={{ padding: '0.1rem 0.3rem', background: 'var(--bg-surface-elevated)', borderRadius: '0.2rem' }}>Tab</kbd> : Indent 4 spaces (Python) / 2 spaces</div>
              </div>
            </aside>
          )}

          {/* Right Editor & Terminal Workstation */}
          <main style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
            height: '100%',
          }}>
            {/* Editor Workspace (Top Half) */}
            <div style={{ flex: '1 1 55%', minHeight: '180px', position: 'relative', overflow: 'hidden' }}>
              <CodeEditor
                code={currentCode}
                onChange={handleCodeChange}
                language={selectedLanguage}
                onRun={handleRun}
                fontSize={fontSize}
              />
            </div>

            {/* Terminal Output Workspace (Bottom Half) */}
            <div style={{ flex: '1 1 45%', minHeight: '160px', position: 'relative', overflow: 'hidden' }}>
              <TerminalOutput
                result={executionResult}
                isRunning={isRunning}
                onClear={() => setExecutionResult(null)}
                language={selectedLanguage}
              />
            </div>
          </main>
        </div>
      </div>
    </IntranetGuard>
  );
}
