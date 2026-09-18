export type IDELanguage = 'python' | 'javascript' | 'html' | 'sql';

export interface IDEFile {
  id: string;
  name: string;
  language: IDELanguage;
  content: string;
  isReadOnly?: boolean;
}

export type ChallengeDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface IDETemplate {
  id: string;
  title: string;
  description: string;
  language: IDELanguage;
  difficulty: ChallengeDifficulty;
  category: string;
  instructions: string;
  expectedOutcome?: string;
  files: IDEFile[];
}

export interface SQLColumn {
  name: string;
  type: string;
}

export interface SQLTableResult {
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  outputType: 'text' | 'html' | 'table';
  executionTimeMs: number;
  hasError: boolean;
  tableData?: SQLTableResult;
  htmlPreview?: string;
  timestamp: string;
}
