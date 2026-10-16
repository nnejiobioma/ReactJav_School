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
