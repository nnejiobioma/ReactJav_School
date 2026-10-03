-- Stores admin-edited CMS content (site copy, courses, academy tracks) as JSON.
-- Run this once in the Supabase SQL Editor.
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
create policy "Admins can insert site data."
  on public.site_data for insert with check (public.is_admin(auth.uid()));

drop policy if exists "Admins can update site data." on public.site_data;
create policy "Admins can update site data."
  on public.site_data for update using (public.is_admin(auth.uid()));

drop policy if exists "Admins can delete site data." on public.site_data;
create policy "Admins can delete site data."
  on public.site_data for delete using (public.is_admin(auth.uid()));
