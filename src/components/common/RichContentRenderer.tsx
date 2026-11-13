'use client';

import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';

interface RichContentRendererProps {
  content?: string | null;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Converts Markdown + inline HTML (including images, tables, code blocks,
 * headings, lists, blockquotes, highlights, colored text, and links) into
 * clean, safe, styled React elements.
 */
function parseInlineFormatting(text: string): React.ReactNode[] {
  if (!text) return [];

  // Tokenize inline elements:
  // 1. Markdown images with optional width in alt: ![caption|width=50%](url) or ![alt](url)
  // 2. HTML <img> tags: <img src="..." alt="..." width="..." />
  // 3. Links: [label](url)
  // 4. Inline code: `code`
  // 5. Bold + Italic: ***text***
  // 6. Bold: **text** or <b>text</b> or <strong>text</strong>
  // 7. Italic: *text* or <i>text</i> or <em>text</em>
  // 8. Underline: <u>text</u>
  // 9. Strikethrough: ~~text~~
  // 10. Highlight: ==text== or <mark>text</mark>
  // 11. Colored span: <span style="color:...">text</span>
  const pattern =
    /(!\[([^\]]*)\]\(([^)]+)\)|<img\s+[^>]*src=["']([^"']+)["'][^>]*>)|(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)|(\*\*\*([^*]+)\*\*\*)|(\*\*([^*]+)\*\*|<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>)|(\*([^*]+)\*|<(?:i|em)>([\s\S]*?)<\/(?:i|em)>)|(<u>([\s\S]*?)<\/u>)|(~~([^~]+)~~)|(==([^=]+)==|<mark>([\s\S]*?)<\/mark>)|(<span\s+style=["']color:\s*([^;"']+)["']\s*>([\s\S]*?)<\/span>)/gi;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const fullMatch = match[0];

    // 1. Image (Markdown or HTML)
    if (match[1]) {
      if (match[3]) {
        // Markdown image: ![alt|width=60%](src)
        const rawAlt = match[2] || '';
        const src = match[3].trim();
        let altText = rawAlt;
        let widthStyle = '100%';
        if (rawAlt.includes('|')) {
          const parts = rawAlt.split('|');
          altText = parts[0].trim();
          const wPart = parts.find((p) => p.trim().startsWith('width='));
          if (wPart) {
            widthStyle = wPart.trim().replace('width=', '');
          }
        }
        nodes.push(
          <figure
            key={`img-${keyCounter++}`}
            style={{
              margin: '1.25rem 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={src}
              alt={altText || 'Course illustration'}
              data-zoomable="true"
              style={{
                maxWidth: widthStyle,
                width: widthStyle === '100%' ? 'auto' : widthStyle,
                maxHeight: '520px',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.28)',
                objectFit: 'contain',
                cursor: 'zoom-in',
              }}
            />
            {altText && (
              <figcaption
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.45rem',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}
              >
                {altText}
              </figcaption>
            )}
          </figure>
        );
      } else if (match[4]) {
        // HTML <img src="..." />
        const src = match[4];
        const altMatch = fullMatch.match(/alt=["']([^"']*)["']/i);
        const widthMatch = fullMatch.match(/width=["']([^"']*)["']/i);
        const altText = altMatch ? altMatch[1] : '';
        const widthVal = widthMatch ? widthMatch[1] : '100%';
        nodes.push(
          <figure
            key={`himg-${keyCounter++}`}
            style={{
              margin: '1.25rem 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={src}
              alt={altText || 'Course illustration'}
              data-zoomable="true"
              style={{
                maxWidth: widthVal,
                maxHeight: '520px',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-subtle)',
                objectFit: 'contain',
                cursor: 'zoom-in',
              }}
            />
            {altText && (
              <figcaption
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.45rem',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}
              >
                {altText}
              </figcaption>
            )}
          </figure>
        );
      }
    }
    // 2. Link [label](url)
    else if (match[5]) {
      const label = match[6];
      const href = match[7];
      nodes.push(
        <a
          key={`lnk-${keyCounter++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--primary)',
            textDecoration: 'underline',
            fontWeight: 600,
          }}
        >
          {label}
        </a>
      );
    }
    // 3. Inline code `code`
    else if (match[8]) {
      nodes.push(
        <code
          key={`code-${keyCounter++}`}
          style={{
            background: 'rgba(99, 102, 241, 0.14)',
            color: '#a5b4fc',
            padding: '0.15rem 0.45rem',
            borderRadius: '0.35rem',
            fontSize: '0.88em',
            fontFamily: 'monospace',
            border: '1px solid rgba(99, 102, 241, 0.25)',
          }}
        >
          {match[9]}
        </code>
      );
    }
    // 4. Bold + Italic ***text***
    else if (match[10]) {
      nodes.push(
        <strong key={`bi-${keyCounter++}`} style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>
          {match[11]}
        </strong>
      );
    }
    // 5. Bold **text** or <b>/<strong>
    else if (match[12]) {
      const inner = match[13] ?? match[14] ?? '';
      nodes.push(
        <strong key={`b-${keyCounter++}`} style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
          {parseInlineFormatting(inner)}
        </strong>
      );
    }
    // 6. Italic *text* or <i>/<em>
    else if (match[15]) {
      const inner = match[16] ?? match[17] ?? '';
      nodes.push(
        <em key={`i-${keyCounter++}`} style={{ fontStyle: 'italic' }}>
          {parseInlineFormatting(inner)}
        </em>
      );
    }
    // 7. Underline <u>text</u>
    else if (match[18]) {
      nodes.push(
        <u key={`u-${keyCounter++}`} style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          {parseInlineFormatting(match[19])}
        </u>
      );
    }
    // 8. Strikethrough ~~text~~
    else if (match[20]) {
      nodes.push(
        <del key={`s-${keyCounter++}`} style={{ opacity: 0.75 }}>
          {parseInlineFormatting(match[21])}
        </del>
      );
    }
    // 9. Highlight ==text== or <mark>text</mark>
    else if (match[22]) {
      const inner = match[23] ?? match[24] ?? '';
      nodes.push(
        <mark
          key={`m-${keyCounter++}`}
          style={{
            background: 'rgba(245, 158, 11, 0.25)',
            color: 'var(--text-primary)',
            padding: '0.1rem 0.35rem',
            borderRadius: '0.25rem',
          }}
        >
          {parseInlineFormatting(inner)}
        </mark>
      );
    }
    // 10. Colored span
    else if (match[25]) {
      const color = match[26];
      const inner = match[27];
      nodes.push(
        <span key={`col-${keyCounter++}`} style={{ color, fontWeight: 600 }}>
          {parseInlineFormatting(inner)}
        </span>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export default function RichContentRenderer({
  content,
  className,
  style,
}: RichContentRendererProps) {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  if (!content) return null;

  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Fenced Code Block ```lang ... ```
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      blocks.push(
        <div
          key={`codeblock-${i}`}
          style={{
            margin: '1.1rem 0',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            background: 'rgba(10, 14, 26, 0.92)',
          }}
        >
          {lang && (
            <div
              style={{
                padding: '0.4rem 0.9rem',
                background: 'rgba(255, 255, 255, 0.04)',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#a5b4fc',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontFamily: 'monospace',
              }}
            >
              {lang}
            </div>
          )}
          <pre
            style={{
              margin: 0,
              padding: '1rem 1.15rem',
              overflowX: 'auto',
              fontSize: '0.86rem',
              lineHeight: 1.6,
              color: '#e2e8f0',
              fontFamily: 'monospace',
            }}
          >
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    // 2. Horizontal Rule --- or ***
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push(
        <hr
          key={`hr-${i}`}
          style={{
            border: 'none',
            borderTop: '1px solid var(--border-subtle)',
            margin: '1.5rem 0',
          }}
        />
      );
      i++;
      continue;
    }

    // 3. Headings (#, ##, ###, ####, #####)
    const headingMatch = trimmed.match(/^(#{1,5})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      const sizes: Record<number, string> = {
        1: '1.6rem',
        2: '1.38rem',
        3: '1.18rem',
        4: '1.04rem',
        5: '0.95rem',
      };
      blocks.push(
        <div
          key={`h-${i}`}
          style={{
            fontSize: sizes[level] || '1.1rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginTop: level <= 3 ? '1.4rem' : '1rem',
            marginBottom: '0.55rem',
            lineHeight: 1.35,
          }}
        >
          {parseInlineFormatting(headingText)}
        </div>
      );
      i++;
      continue;
    }

    // 4. Markdown Table (| Col 1 | Col 2 |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && i + 1 < lines.length && lines[i + 1].trim().includes('---')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) =>
          rowStr
            .replace(/^\||\|$/g, '')
            .split('|')
            .map((cell) => cell.trim());

        const headers = parseRow(tableLines[0]);
        const bodyRows = tableLines.slice(2).map(parseRow);

        blocks.push(
          <div
            key={`tbl-${i}`}
            style={{
              overflowX: 'auto',
              margin: '1.15rem 0',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.9rem',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                  {headers.map((h, hIdx) => (
                    <th
                      key={hIdx}
                      style={{
                        padding: '0.75rem 1rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {parseInlineFormatting(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    style={{
                      borderBottom: rIdx < bodyRows.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      background: rIdx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                    }}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        style={{
                          padding: '0.7rem 1rem',
                          color: 'var(--text-secondary)',
                          verticalAlign: 'top',
                          lineHeight: 1.55,
                        }}
                      >
                        {parseInlineFormatting(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 5. Blockquote / Callout (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(
        <blockquote
          key={`q-${i}`}
          style={{
            margin: '1.1rem 0',
            padding: '0.95rem 1.25rem',
            borderRadius: '0.65rem',
            background: 'rgba(99, 102, 241, 0.08)',
            borderLeft: '4px solid var(--primary)',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            lineHeight: 1.65,
          }}
        >
          {quoteLines.map((ql, qIdx) => (
            <div key={qIdx} style={{ marginBottom: qIdx < quoteLines.length - 1 ? '0.4rem' : 0 }}>
              {parseInlineFormatting(ql)}
            </div>
          ))}
        </blockquote>
      );
      continue;
    }

    // 6. Unordered List (- item or * item)
    if (/^[-*•]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul
          key={`ul-${i}`}
          style={{
            margin: '0.65rem 0 1rem',
            paddingLeft: '1.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            color: 'var(--text-primary)',
          }}
        >
          {items.map((item, idx) => (
            <li key={idx} style={{ lineHeight: 1.65 }}>
              {parseInlineFormatting(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 7. Ordered List (1. item)
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol
          key={`ol-${i}`}
          style={{
            margin: '0.65rem 0 1rem',
            paddingLeft: '1.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            color: 'var(--text-primary)',
          }}
        >
          {items.map((item, idx) => (
            <li key={idx} style={{ lineHeight: 1.65 }}>
              {parseInlineFormatting(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. Standard Paragraph (or standalone image line)
    blocks.push(
      <div
        key={`p-${i}`}
        style={{
          marginBottom: '0.75rem',
          lineHeight: 1.75,
          color: 'var(--text-primary)',
        }}
      >
        {parseInlineFormatting(line)}
      </div>
    );
    i++;
  }

  return (
    <>
      <div
        className={className}
        style={{
          fontSize: '1rem',
          lineHeight: 1.75,
          color: 'var(--text-primary)',
          ...style,
        }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'IMG' && target.getAttribute('data-zoomable') === 'true') {
            const img = target as HTMLImageElement;
            setZoomedImage({ src: img.src, alt: img.alt || 'Course Image' });
          }
        }}
      >
        {blocks}
      </div>

      {/* Lightbox Image Zoom Modal */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            background: 'rgba(5, 8, 20, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'zoom-out',
          }}
        >
          <button
            type="button"
            onClick={() => setZoomedImage(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title="Close preview"
          >
            <X size={20} />
          </button>
          <img
            src={zoomedImage.src}
            alt={zoomedImage.alt}
            style={{
              maxWidth: '92vw',
              maxHeight: '82vh',
              borderRadius: '0.85rem',
              objectFit: 'contain',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7)',
            }}
          />
          {zoomedImage.alt && (
            <p style={{ color: '#e2e8f0', marginTop: '0.85rem', fontSize: '0.9rem' }}>
              {zoomedImage.alt}
            </p>
          )}
        </div>
      )}
    </>
  );
}

