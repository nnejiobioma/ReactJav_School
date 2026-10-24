import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { DEFAULT_SITE_CONTENT } from '@/lib/supabase/defaultSiteContent';
import { INITIAL_COURSES } from '@/lib/supabase/mockData';
import { ACADEMY_TRACKS } from '@/data/academyTracks';
import { Course, Profile } from '@/types';
import { AcademyTrack } from '@/data/academyTracks';
import { toValidUuid } from '@/lib/utils';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const SITE_CONTENT_FILE = path.join(DATA_DIR, 'persistedSiteContent.json');
const COURSES_FILE = path.join(DATA_DIR, 'persistedCourses.json');
const TRACKS_FILE = path.join(DATA_DIR, 'persistedAcademyTracks.json');
const PROFILES_FILE = path.join(DATA_DIR, 'persistedProfiles.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'persistedTutoringInquiries.json');

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfhmqodrjnsabpyxbgnn.supabase.co';
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaG1xb2Ryam5zYWJweXhiZ25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDExMzQsImV4cCI6MjEwNTQ3NzEzNH0.ovZdP0xuywAWJUwg2Yx9ilRXhLwCYe8uTw4MSXaUjB0';

function getSupabaseServerClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  try {
    return createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch {
    return null;
  }
}

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {}
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    // Readonly on Vercel or missing file
  }
  return fallback;
}

function writeJsonFile(filePath: string, data: any): void {
  try {
    ensureDataDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // Non-fatal on serverless hosts like Vercel with read-only filesystems
  }
}

export async function GET() {
  try {
    let siteContent = readJsonFile(SITE_CONTENT_FILE, DEFAULT_SITE_CONTENT);
    let courses = readJsonFile(COURSES_FILE, INITIAL_COURSES);
    let tracks = readJsonFile(TRACKS_FILE, ACADEMY_TRACKS);
    let profiles = readJsonFile<Profile[]>(PROFILES_FILE, []);
    let inquiries = readJsonFile<any[]>(INQUIRIES_FILE, []);

    // Enhance with live Supabase database content
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const { data: dbProfiles, error: pErr } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (!pErr && dbProfiles && dbProfiles.length > 0) {
          const profileMap = new Map<string, Profile>();
          profiles.forEach((p) => profileMap.set(p.id, p));
          dbProfiles.forEach((p: any) => {
            const mapped: Profile = {
              id: p.id,
              firebase_uid: p.firebase_uid || undefined,
              email: p.email,
              full_name: p.full_name || p.email?.split('@')[0] || 'Learner',
              avatar_url: p.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(p.full_name || p.email)}`,
              bio: p.bio || undefined,
              phone: p.phone || undefined,
              country: p.country || undefined,
              state: p.state || undefined,
              education_level: p.education_level || undefined,
              preferred_track: p.preferred_track || undefined,
              experience_level: p.experience_level || undefined,
              career_goal: p.career_goal || undefined,
              emergency_contact: p.emergency_contact || undefined,
              role: p.role || 'student',
              subscription_status: p.subscription_status || 'none',
              subscription_plan: p.subscription_plan || undefined,
              payment_reference: p.payment_reference || undefined,
              payment_date: p.payment_date || undefined,
              admin_granted: !!p.admin_granted,
              granted_at: p.granted_at || undefined,
              granted_by: p.granted_by || undefined,
              rejection_reason: p.rejection_reason || undefined,
              tutoring_enrolled: !!p.tutoring_enrolled,
              tutoring_track_id: p.tutoring_track_id || undefined,
              tutoring_track_name: p.tutoring_track_name || undefined,
              registration_completed: !!p.registration_completed,
              privacy_accepted: p.privacy_accepted !== undefined ? !!p.privacy_accepted : false,
              privacy_accepted_at: p.privacy_accepted_at || undefined,
              terms_accepted: p.terms_accepted !== undefined ? !!p.terms_accepted : false,
              terms_accepted_at: p.terms_accepted_at || undefined,
              created_at: p.created_at || new Date().toISOString(),
            };
            profileMap.set(mapped.id, mapped);
            if (mapped.email) profileMap.set(mapped.email.toLowerCase(), mapped);
          });
          profiles = Array.from(new Set(profileMap.values()));
        }

        const { data: dbSiteData, error: sErr } = await supabase.from('site_data').select('key, data');
        if (!sErr && dbSiteData) {
          dbSiteData.forEach((row: any) => {
            if (row.key === 'siteContent' && row.data) siteContent = row.data;
            if (row.key === 'courses' && Array.isArray(row.data)) courses = row.data;
            if (row.key === 'tracks' && Array.isArray(row.data)) tracks = row.data;
            if (row.key === 'inquiries' && Array.isArray(row.data)) inquiries = row.data;
          });
        }
      } catch (dbErr) {
        console.warn('[Persist API] Supabase fetch fallback:', dbErr);
      }
    }

    return NextResponse.json({
      siteContent,
      courses,
      tracks,
      profiles,
      inquiries,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;
    const supabase = getSupabaseServerClient();

    if (type === 'siteContent') {
      writeJsonFile(SITE_CONTENT_FILE, data);
      if (supabase) {
        try {
          await supabase.from('site_data').upsert({
            key: 'siteContent',
            data,
            updated_at: new Date().toISOString(),
          });
        } catch {}
      }
      return NextResponse.json({ success: true, type: 'siteContent' });
    }

    if (type === 'profiles') {
      writeJsonFile(PROFILES_FILE, data);
      return NextResponse.json({ success: true, type: 'profiles' });
    }

    if (type === 'profile') {
      const currentProfiles = readJsonFile<Profile[]>(PROFILES_FILE, []);
      const index = currentProfiles.findIndex(
        (p) => p.id === data.id || (p.email && data.email && p.email.toLowerCase() === data.email.toLowerCase())
      );
      if (index >= 0) {
        currentProfiles[index] = { ...currentProfiles[index], ...data };
      } else {
        currentProfiles.push(data);
      }
      writeJsonFile(PROFILES_FILE, currentProfiles);

      // Persist directly to Supabase profiles table
      if (supabase && data.email) {
        try {
          const cleanEmail = data.email.toLowerCase().trim();
          const profileId = toValidUuid(data.id);
          const payload: Record<string, any> = {
            id: profileId,
            firebase_uid: data.firebase_uid || data.id,
            email: cleanEmail,
            full_name: data.full_name || 'Learner',
            avatar_url: data.avatar_url || null,
            bio: data.bio || null,
            phone: data.phone || null,
            country: data.country || null,
            state: data.state || null,
            education_level: data.education_level || null,
            preferred_track: data.preferred_track || null,
            experience_level: data.experience_level || null,
            career_goal: data.career_goal || null,
            emergency_contact: data.emergency_contact || null,
            role: data.role || 'student',
            subscription_status: data.subscription_status || 'none',
            subscription_plan: data.subscription_plan || null,
            payment_reference: data.payment_reference || null,
            admin_granted: !!data.admin_granted,
            tutoring_enrolled: !!data.tutoring_enrolled,
            tutoring_track_id: data.tutoring_track_id || null,
            tutoring_track_name: data.tutoring_track_name || null,
            registration_completed: !!data.registration_completed,
            privacy_accepted: data.privacy_accepted !== undefined ? !!data.privacy_accepted : false,
            privacy_accepted_at: data.privacy_accepted_at || null,
            terms_accepted: data.terms_accepted !== undefined ? !!data.terms_accepted : false,
            terms_accepted_at: data.terms_accepted_at || null,
            updated_at: new Date().toISOString(),
          };

          // 1. Try to update existing record matching by email first
          const { data: updatedRows, error: updateErr } = await supabase
            .from('profiles')
            .update({
              full_name: payload.full_name,
              avatar_url: payload.avatar_url,
              bio: payload.bio,
              phone: payload.phone,
              country: payload.country,
              state: payload.state,
              education_level: payload.education_level,
              preferred_track: payload.preferred_track,
              experience_level: payload.experience_level,
              career_goal: payload.career_goal,
              emergency_contact: payload.emergency_contact,
              updated_at: new Date().toISOString(),
            })
            .eq('email', cleanEmail)
            .select('id');

          // 2. If no record was updated, insert or upsert by id
          if (updateErr || !updatedRows || updatedRows.length === 0) {
            await supabase.from('profiles').upsert(payload, { onConflict: 'id' });
          }
        } catch (dbErr) {
          console.warn('[Persist API] Supabase profile upsert error:', dbErr);
        }
      }

      return NextResponse.json({ success: true, type: 'profile', profileId: data.id });
    }

    if (type === 'lesson_progress') {
      if (supabase && data) {
        try {
          const validUid = toValidUuid(data.user_id);
          await supabase.from('lesson_progress').upsert(
            {
              id: data.id || `prog_${validUid}_${data.lesson_id}`,
              user_id: validUid,
              lesson_id: data.lesson_id,
              course_id: data.course_id || null,
              is_completed: !!data.is_completed,
              last_position_seconds: Math.floor(data.last_position_seconds || 0),
              user_notes: data.user_notes || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          );
        } catch (dbErr) {
          console.warn('[Persist API] Supabase progress upsert error:', dbErr);
        }
      }
      return NextResponse.json({ success: true, type: 'lesson_progress' });
    }

    if (type === 'inquiry') {
      const currentInquiries = readJsonFile<any[]>(INQUIRIES_FILE, []);
      const index = currentInquiries.findIndex((i) => i.id === data.id);
      if (index >= 0) {
        currentInquiries[index] = data;
      } else {
        currentInquiries.unshift(data);
      }
      writeJsonFile(INQUIRIES_FILE, currentInquiries);

      if (supabase) {
        try {
          await supabase.from('site_data').upsert({
            key: 'inquiries',
            data: currentInquiries,
            updated_at: new Date().toISOString(),
          });
        } catch {}
      }

      return NextResponse.json({ success: true, type: 'inquiry', inquiryId: data.id });
    }

    if (type === 'courses') {
      writeJsonFile(COURSES_FILE, data);
      if (supabase) {
        try {
          await supabase.from('site_data').upsert({
            key: 'courses',
            data,
            updated_at: new Date().toISOString(),
          });
        } catch {}
      }
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

      if (supabase) {
        try {
          await supabase.from('site_data').upsert({
            key: 'courses',
            data: currentCourses,
            updated_at: new Date().toISOString(),
          });
        } catch {}
      }

      return NextResponse.json({ success: true, type: 'course', courseId: data.id });
    }

    if (type === 'tracks') {
      writeJsonFile(TRACKS_FILE, data);
      if (supabase) {
        try {
          await supabase.from('site_data').upsert({
            key: 'tracks',
            data,
            updated_at: new Date().toISOString(),
          });
        } catch {}
      }
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

      if (supabase) {
        try {
          await supabase.from('site_data').upsert({
            key: 'tracks',
            data: currentTracks,
            updated_at: new Date().toISOString(),
          });
        } catch {}
      }

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

      if (supabase) {
        try {
          const keysToDelete: string[] = [];
          if (target === 'siteContent' || !target) keysToDelete.push('siteContent');
          if (target === 'courses' || !target) keysToDelete.push('courses');
          if (target === 'tracks' || !target) keysToDelete.push('tracks');
          if (keysToDelete.length) {
            await supabase.from('site_data').delete().in('key', keysToDelete);
          }
        } catch {}
      }

      return NextResponse.json({ success: true, reset: target || 'all' });
    }

    return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
  } catch (error: any) {
    console.error('[Persist API] Error saving data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
