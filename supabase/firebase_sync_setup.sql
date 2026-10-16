-- ==============================================================================
-- ReactJav School - Firebase Authentication + Supabase Database Sync Setup
-- Run this script in your Supabase Dashboard > SQL Editor (New Query) > Click "Run"
-- ==============================================================================

-- 1. PROFILES TABLE:
-- Drop the foreign key constraint to Supabase internal auth.users table.
-- This enables users authenticated via Firebase (Google Sign-In & Email/Password)
-- to be stored directly in Supabase profiles without FK mismatch errors.
alter table public.profiles drop constraint if exists profiles_id_fkey;

-- Ensure all necessary fields exist on public.profiles
alter table public.profiles add column if not exists firebase_uid text;
alter table public.profiles add column if not exists registration_completed boolean default false;
alter table public.profiles add column if not exists privacy_accepted boolean default false;
alter table public.profiles add column if not exists privacy_accepted_at text;
alter table public.profiles add column if not exists terms_accepted boolean default false;
alter table public.profiles add column if not exists terms_accepted_at text;
alter table public.profiles add column if not exists subscription_status text default 'none';
alter table public.profiles add column if not exists subscription_plan text;
alter table public.profiles add column if not exists payment_reference text;
alter table public.profiles add column if not exists payment_date text;
alter table public.profiles add column if not exists admin_granted boolean default false;
alter table public.profiles add column if not exists tutoring_enrolled boolean default false;
alter table public.profiles add column if not exists tutoring_track_id text;
alter table public.profiles add column if not exists tutoring_track_name text;

-- Fast index lookups by email and Firebase UID
create index if not exists idx_profiles_email_lower on public.profiles(lower(email));
create index if not exists idx_profiles_firebase_uid on public.profiles(firebase_uid);

-- 2. ROW LEVEL SECURITY (RLS) FOR PROFILES:
alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." 
  on public.profiles for select using (true);

drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Allow profile inserts from app" on public.profiles;
create policy "Allow profile inserts from app"
  on public.profiles for insert with check (true);

drop policy if exists "Users can update their own profile." on public.profiles;
drop policy if exists "Allow profile updates from app" on public.profiles;
create policy "Allow profile updates from app"
  on public.profiles for update using (true);

-- 3. SITE DATA (Courses, Tracks, CMS content persistence):
create table if not exists public.site_data (
  key text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.site_data enable row level security;

drop policy if exists "Anyone can read site data." on public.site_data;
create policy "Anyone can read site data."
  on public.site_data for select using (true);

drop policy if exists "Admins can insert site data." on public.site_data;
drop policy if exists "Admins can update site data." on public.site_data;
drop policy if exists "Admins can delete site data." on public.site_data;
drop policy if exists "Allow site data upsert" on public.site_data;
create policy "Allow site data upsert"
  on public.site_data for all using (true);

-- 4. ENROLLMENTS & TUTORING:
-- Drop foreign key constraint on enrollments so Firebase user IDs can be enrolled
alter table public.enrollments drop constraint if exists enrollments_user_id_fkey;

alter table public.enrollments enable row level security;

drop policy if exists "Anyone can read enrollments." on public.enrollments;
create policy "Anyone can read enrollments."
  on public.enrollments for select using (true);

drop policy if exists "Allow enrollments upsert" on public.enrollments;
create policy "Allow enrollments upsert"
  on public.enrollments for all using (true);

-- 5. LESSON PROGRESS & LEARNING SAVE STATE:
-- Tracks completion, playback seconds, and personal student notes
create table if not exists public.lesson_progress (
  id text primary key,
  user_id uuid,
  lesson_id text not null,
  course_id text,
  is_completed boolean default false,
  last_position_seconds integer default 0,
  user_notes text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Relax any foreign key constraint to internal auth.users
alter table public.lesson_progress drop constraint if exists lesson_progress_user_id_fkey;
alter table public.lesson_progress drop constraint if exists lesson_progress_lesson_id_fkey;

alter table public.lesson_progress enable row level security;

drop policy if exists "Anyone can read their own lesson progress." on public.lesson_progress;
create policy "Anyone can read their own lesson progress."
  on public.lesson_progress for select using (true);

drop policy if exists "Allow lesson progress upsert" on public.lesson_progress;
create policy "Allow lesson progress upsert"
  on public.lesson_progress for all using (true);

create index if not exists idx_lesson_progress_user on public.lesson_progress(user_id);
create index if not exists idx_lesson_progress_lesson on public.lesson_progress(lesson_id);

-- 6. ROLE CONSTRAINTS & ADMIN ROLE RPC:
-- Ensure role supports all 4 tiers: student, instructor, admin, super_admin
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check 
  check (role in ('student', 'instructor', 'admin', 'super_admin'));

-- Stored procedure to reliably update user roles across IDs & Firebase UIDs
create or replace function public.admin_set_user_role(target_user_id text, target_role text)
returns void as $$
begin
  update public.profiles
  set role = target_role
  where id = target_user_id or firebase_uid = target_user_id;
end;
$$ language plpgsql security definer;


