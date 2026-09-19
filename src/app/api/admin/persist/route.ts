import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_SITE_CONTENT } from '@/lib/supabase/defaultSiteContent';
import { INITIAL_COURSES } from '@/lib/supabase/mockData';
import { ACADEMY_TRACKS } from '@/data/academyTracks';
import { Course } from '@/types';
import { AcademyTrack } from '@/data/academyTracks';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const SITE_CONTENT_FILE = path.join(DATA_DIR, 'persistedSiteContent.json');
const COURSES_FILE = path.join(DATA_DIR, 'persistedCourses.json');
const TRACKS_FILE = path.join(DATA_DIR, 'persistedAcademyTracks.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`[Persist API] Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile(filePath: string, data: any): void {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const siteContent = readJsonFile(SITE_CONTENT_FILE, DEFAULT_SITE_CONTENT);
    const courses = readJsonFile(COURSES_FILE, INITIAL_COURSES);
    const tracks = readJsonFile(TRACKS_FILE, ACADEMY_TRACKS);

    return NextResponse.json({
      siteContent,
      courses,
      tracks,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    ensureDataDir();

    if (type === 'siteContent') {
      writeJsonFile(SITE_CONTENT_FILE, data);
      return NextResponse.json({ success: true, type: 'siteContent' });
    }

    if (type === 'courses') {
      writeJsonFile(COURSES_FILE, data);
      return NextResponse.json({ success: true, type: 'courses' });
    }

    if (type === 'course') {
      const currentCourses = readJsonFile<Course[]>(COURSES_FILE, INITIAL_COURSES);
      const index = currentCourses.findIndex((c) => c.id === data.id);
      if (index >= 0) {
        currentCourses[index] = data;
      } else {
        currentCourses.unshift(data);
      }
      writeJsonFile(COURSES_FILE, currentCourses);
      return NextResponse.json({ success: true, type: 'course', courseId: data.id });
    }

    if (type === 'tracks') {
      writeJsonFile(TRACKS_FILE, data);
      return NextResponse.json({ success: true, type: 'tracks' });
    }

    if (type === 'track') {
      const currentTracks = readJsonFile<AcademyTrack[]>(TRACKS_FILE, ACADEMY_TRACKS);
      const index = currentTracks.findIndex((t) => t.id === data.id);
      if (index >= 0) {
        currentTracks[index] = data;
      } else {
        currentTracks.push(data);
      }
      writeJsonFile(TRACKS_FILE, currentTracks);
      return NextResponse.json({ success: true, type: 'track', trackId: data.id });
    }

    if (type === 'reset') {
      const { target } = data || {};
      if (target === 'siteContent' || !target) {
        writeJsonFile(SITE_CONTENT_FILE, DEFAULT_SITE_CONTENT);
      }
      if (target === 'courses' || !target) {
        writeJsonFile(COURSES_FILE, INITIAL_COURSES);
      }
      if (target === 'tracks' || !target) {
        writeJsonFile(TRACKS_FILE, ACADEMY_TRACKS);
      }
      return NextResponse.json({ success: true, reset: target || 'all' });
    }

    return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
  } catch (error: any) {
    console.error('[Persist API] Error saving data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
