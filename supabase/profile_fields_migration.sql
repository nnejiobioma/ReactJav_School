-- ==============================================================================
-- ReactJav School - Profile Extended Fields Migration
-- If you want all profile fields (phone, country, state, education, etc.) stored
-- in your Supabase Postgres database, run this snippet in your Supabase SQL Editor:
-- ==============================================================================

alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists country text;
alter table public.profiles add column if not exists state text;
alter table public.profiles add column if not exists education_level text;
alter table public.profiles add column if not exists preferred_track text;
alter table public.profiles add column if not exists experience_level text;
alter table public.profiles add column if not exists career_goal text;
alter table public.profiles add column if not exists emergency_contact text;
