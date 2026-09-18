import { ExecutionResult, SQLTableResult } from '@/types/ide';

// Pre-seeded Relational Dataset for SQL Sandbox
export const MOCK_DB = {
  students: [
    { id: 1, full_name: 'Ahmed El-Mansouri', email: 'ahmed@reactjav.edu', track: 'Software Engineering', gpa: 3.92, completed_credits: 48, cohort: '2026-A' },
    { id: 2, full_name: 'Chris Okoth', email: 'chris@reactjav.edu', track: 'Software Engineering', gpa: 3.84, completed_credits: 44, cohort: '2026-A' },
    { id: 3, full_name: 'Amina Bello', email: 'amina@reactjav.edu', track: 'Data Analytics', gpa: 3.95, completed_credits: 40, cohort: '2026-B' },
    { id: 4, full_name: 'David Chen', email: 'david@reactjav.edu', track: 'Cloud Architecture', gpa: 3.65, completed_credits: 36, cohort: '2026-A' },
    { id: 5, full_name: 'Fatima Zahra', email: 'fatima@reactjav.edu', track: 'AI Career Essentials', gpa: 3.88, completed_credits: 42, cohort: '2026-B' },
    { id: 6, full_name: 'Emmanuel Adeyemi', email: 'emmanuel@reactjav.edu', track: 'Data Analytics', gpa: 3.45, completed_credits: 32, cohort: '2026-C' },
    { id: 7, full_name: 'Sara Lindqvist', email: 'sara@reactjav.edu', track: 'Software Engineering', gpa: 3.79, completed_credits: 46, cohort: '2026-A' },
    { id: 8, full_name: 'Kofi Mensah', email: 'kofi@reactjav.edu', track: 'Cloud Architecture', gpa: 3.52, completed_credits: 30, cohort: '2026-C' },
  ],
  courses: [
    { id: 101, code: 'CS-301', title: 'Full-Stack Next.js & Cloud Systems', level: 'Intermediate', instructor: 'Dr. Farida K.', enrolled_count: 245, capacity: 250, credits: 4 },
    { id: 102, code: 'DA-204', title: 'Data Analytics & Predictive Modeling', level: 'Beginner', instructor: 'Prof. Marcus Vance', enrolled_count: 180, capacity: 200, credits: 3 },
    { id: 103, code: 'AI-105', title: 'Applied AI & LLM Engineering', level: 'Advanced', instructor: 'Dr. Leila T.', enrolled_count: 298, capacity: 300, credits: 4 },
    { id: 104, code: 'SEC-402', title: 'Enterprise Cryptography & Security', level: 'Advanced', instructor: 'Eng. Kwame O.', enrolled_count: 120, capacity: 150, credits: 3 },
    { id: 105, code: 'UI-102', title: 'Modern UI/UX & Responsive Systems', level: 'Beginner', instructor: 'Elena Rostova', enrolled_count: 195, capacity: 220, credits: 2 },
  ],
  cbt_results: [
    { id: 501, student_id: 1, exam_code: 'CBT-SYS-01', score: 96, status: 'PASSED', completion_time_min: 42 },
    { id: 502, student_id: 2, exam_code: 'CBT-SYS-01', score: 91, status: 'PASSED', completion_time_min: 48 },
    { id: 503, student_id: 3, exam_code: 'CBT-DATA-02', score: 98, status: 'PASSED', completion_time_min: 39 },
    { id: 504, student_id: 4, exam_code: 'CBT-CLOUD-01', score: 84, status: 'PASSED', completion_time_min: 52 },
    { id: 505, student_id: 5, exam_code: 'CBT-AI-01', score: 94, status: 'PASSED', completion_time_min: 45 },
  ]
};

// Singleton Pyodide instance
let pyodideInstance: any = null;
let isPyodideLoading = false;
let pyodideLoadPromise: Promise<any> | null = null;

export async function initPyodide(): Promise<any> {
  if (pyodideInstance) return pyodideInstance;
  if (typeof window === 'undefined') return null;

  if (pyodideLoadPromise) return pyodideLoadPromise;

  pyodideLoadPromise = new Promise(async (resolve, reject) => {
    try {
      isPyodideLoading = true;
      // Load script if not already on page
      if (!(window as any).loadPyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
        script.async = true;
        document.head.appendChild(script);

        await new Promise((res, rej) => {
          script.onload = res;
          script.onerror = () => rej(new Error('Failed to load Pyodide WebAssembly runtime from CDN.'));
        });
      }

      const pyodide = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
      });

      pyodideInstance = pyodide;
      isPyodideLoading = false;
      resolve(pyodide);
    } catch (err) {
      isPyodideLoading = false;
      reject(err);
    }
  });

  return pyodideLoadPromise;
}

export function isPyodideReady(): boolean {
  return !!pyodideInstance;
}

// ----------------------------------------------------
// Python Execution Engine
// ----------------------------------------------------
export async function executePythonCode(code: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  const timestamp = new Date().toLocaleTimeString();

  try {
    const pyodide = await initPyodide();

    // Prepare wrapper that captures stdout and stderr via io.StringIO
    const wrappedCode = `
import sys
import io

_captured_stdout = io.StringIO()
_captured_stderr = io.StringIO()
_old_stdout = sys.stdout
_old_stderr = sys.stderr
sys.stdout = _captured_stdout
sys.stderr = _captured_stderr

_execution_result = None
_has_exception = False
_err_message = ""

try:
${code.split('\n').map(line => '    ' + line).join('\n')}
except Exception as e:
    import traceback
    _has_exception = True
    _err_message = traceback.format_exc()
finally:
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr

_captured_output = _captured_stdout.getvalue()
_captured_error = _captured_stderr.getvalue()
`;

    await pyodide.runPythonAsync(wrappedCode);

    const stdout = pyodide.globals.get('_captured_output') || '';
    const stderr = pyodide.globals.get('_captured_error') || '';
    const hasException = pyodide.globals.get('_has_exception') || false;
    const errMessage = pyodide.globals.get('_err_message') || '';

    const executionTimeMs = Math.round(performance.now() - startTime);

    if (hasException) {
      return {
        stdout: stdout ? stdout + '\n' : '',
        stderr: errMessage || stderr || 'Execution error occurred.',
        outputType: 'text',
        executionTimeMs,
        hasError: true,
        timestamp
      };
    }

    return {
      stdout: stdout || '(Program executed successfully with no console output)',
      stderr: stderr || '',
      outputType: 'text',
      executionTimeMs,
      hasError: false,
      timestamp
    };
  } catch (err: any) {
    // If Pyodide CDN loading fails or network is disconnected, fallback to simulated runner
    const executionTimeMs = Math.round(performance.now() - startTime);
    return fallbackPythonRunner(code, executionTimeMs, timestamp, err.message);
  }
}

// Lightweight fallback interpreter in case network CDN is blocked or loading
function fallbackPythonRunner(code: string, executionTimeMs: number, timestamp: string, networkError?: string): ExecutionResult {
  const logs: string[] = [];
  const errors: string[] = [];

  try {
    // Simple evaluation of print statements and expressions
    const lines = code.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
        const inner = trimmed.substring(6, trimmed.length - 1);
        try {
          // evaluate clean string or numbers
          if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
            logs.push(inner.substring(1, inner.length - 1));
          } else {
            logs.push(inner);
          }
        } catch {
          logs.push(inner);
        }
      }
    }

    if (logs.length === 0) {
      logs.push("⚡ Pyodide WebAssembly is downloading in the background. Initial run captured basic syntax.");
      if (networkError) {
        logs.push(`Note: ${networkError}`);
      }
    }

    return {
      stdout: logs.join('\n'),
      stderr: '',
      outputType: 'text',
      executionTimeMs,
      hasError: false,
      timestamp
    };
  } catch (e: any) {
    return {
      stdout: '',
      stderr: e.message,
      outputType: 'text',
      executionTimeMs,
      hasError: true,
      timestamp
    };
  }
}

// ----------------------------------------------------
// JavaScript Execution Engine
// ----------------------------------------------------
export async function executeJavaScriptCode(code: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  const timestamp = new Date().toLocaleTimeString();
  const logs: string[] = [];
  const errors: string[] = [];

  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;

  try {
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };
    console.info = (...args) => {
      logs.push('[INFO] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };
    console.warn = (...args) => {
      logs.push('[WARN] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };
    console.error = (...args) => {
      errors.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };

    // Support async/await code
    const isAsync = code.includes('await ') || code.includes('async ');
    if (isAsync) {
      const asyncWrapper = new Function(`return (async () => { ${code} })();`);
      await asyncWrapper();
    } else {
      const fn = new Function(code);
      fn();
    }

    const executionTimeMs = Math.round(performance.now() - startTime);

    return {
      stdout: logs.join('\n') || (errors.length === 0 ? '(Code executed with 0 console output)' : ''),
      stderr: errors.join('\n'),
      outputType: 'text',
      executionTimeMs,
      hasError: errors.length > 0,
      timestamp
    };
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    return {
      stdout: logs.join('\n'),
      stderr: err.stack || err.message,
      outputType: 'text',
      executionTimeMs,
      hasError: true,
      timestamp
    };
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    console.info = originalInfo;
  }
}

// ----------------------------------------------------
// SQL In-Memory Relational Engine
// ----------------------------------------------------
export function executeSQLCode(query: string): ExecutionResult {
  const startTime = performance.now();
  const timestamp = new Date().toLocaleTimeString();

  const cleanQuery = query
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join(' ')
    .trim();

  if (!cleanQuery) {
    return {
      stdout: '',
      stderr: 'Query is empty. Please enter a valid SQL statement.',
      outputType: 'text',
      executionTimeMs: 0,
      hasError: true,
      timestamp
    };
  }

  try {
    const upperQuery = cleanQuery.toUpperCase();

    // Determine target table
    let tableKey: keyof typeof MOCK_DB | null = null;
    if (upperQuery.includes('FROM STUDENTS')) tableKey = 'students';
    else if (upperQuery.includes('FROM COURSES')) tableKey = 'courses';
    else if (upperQuery.includes('FROM CBT_RESULTS')) tableKey = 'cbt_results';

    if (!tableKey) {
      return {
        stdout: '',
        stderr: `Table not recognized. Available tables in Campus DB:\n  - students\n  - courses\n  - cbt_results`,
        outputType: 'text',
        executionTimeMs: Math.round(performance.now() - startTime),
        hasError: true,
        timestamp
      };
    }

    let records: any[] = JSON.parse(JSON.stringify(MOCK_DB[tableKey]));

    // WHERE filtering
    if (upperQuery.includes('WHERE')) {
      if (upperQuery.includes('GPA >=')) {
        const match = cleanQuery.match(/gpa\s*>=\s*([0-9.]+)/i);
        if (match) {
          const threshold = parseFloat(match[1]);
          records = records.filter(r => (r.gpa || 0) >= threshold);
        }
      } else if (upperQuery.includes("TRACK =") || upperQuery.includes("TRACK LIKE")) {
        const match = cleanQuery.match(/track\s*=\s*['"]([^'"]+)['"]/i);
        if (match) {
          const trackVal = match[1].toLowerCase();
          records = records.filter(r => (r.track || '').toLowerCase() === trackVal);
        }
      } else if (upperQuery.includes("STATUS =")) {
        const match = cleanQuery.match(/status\s*=\s*['"]([^'"]+)['"]/i);
        if (match) {
          const statusVal = match[1].toUpperCase();
          records = records.filter(r => (r.status || '').toUpperCase() === statusVal);
        }
      }
    }

    // ORDER BY
    if (upperQuery.includes('ORDER BY')) {
      const isDesc = upperQuery.includes('DESC');
      if (upperQuery.includes('GPA')) {
        records.sort((a, b) => isDesc ? b.gpa - a.gpa : a.gpa - b.gpa);
      } else if (upperQuery.includes('ENROLLED_COUNT') || upperQuery.includes('FILL_RATE')) {
        records.sort((a, b) => isDesc ? (b.enrolled_count || 0) - (a.enrolled_count || 0) : (a.enrolled_count || 0) - (b.enrolled_count || 0));
      } else if (upperQuery.includes('SCORE')) {
        records.sort((a, b) => isDesc ? b.score - a.score : a.score - b.score);
      }
    }

    // LIMIT
    if (upperQuery.includes('LIMIT')) {
      const match = cleanQuery.match(/LIMIT\s+([0-9]+)/i);
      if (match) {
        const limit = parseInt(match[1], 10);
        records = records.slice(0, limit);
      }
    }

    // Add calculated fields if requested
    if (upperQuery.includes('FILL_RATE') || upperQuery.includes('ROUND(')) {
      records = records.map(r => ({
        ...r,
        fill_rate_percent: r.capacity ? `${((r.enrolled_count / r.capacity) * 100).toFixed(1)}%` : 'N/A'
      }));
    }

    const columns = records.length > 0 ? Object.keys(records[0]) : ['result'];
    const tableData: SQLTableResult = {
      columns,
      rows: records,
      rowCount: records.length
    };

    const executionTimeMs = Math.round(performance.now() - startTime);

    return {
      stdout: `Query OK: ${records.length} row(s) returned from '${tableKey}'`,
      stderr: '',
      outputType: 'table',
      executionTimeMs,
      hasError: false,
      tableData,
      timestamp
    };
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    return {
      stdout: '',
      stderr: `SQL Parse Error: ${err.message}`,
      outputType: 'text',
      executionTimeMs,
      hasError: true,
      timestamp
    };
  }
}

// ----------------------------------------------------
// HTML / CSS / Web App Preview Builder
// ----------------------------------------------------
export function buildHtmlPreview(htmlContent: string): ExecutionResult {
  const startTime = performance.now();
  const timestamp = new Date().toLocaleTimeString();

  return {
    stdout: '✓ Web Application Live Preview compiled successfully.',
    stderr: '',
    outputType: 'html',
    executionTimeMs: Math.round(performance.now() - startTime),
    hasError: false,
    htmlPreview: htmlContent,
    timestamp
  };
}
