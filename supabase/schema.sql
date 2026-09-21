-- ==============================================================================
-- Supabase Schema for Modern Learning Platform (LMS) - ReactJav School
-- Includes:
-- 1. Profiles (linked to auth.users with RBAC: student, instructor, admin)
-- 2. Courses
-- 3. Enrollments (Created BEFORE lessons to satisfy RLS dependencies)
-- 4. Sections & Lessons (Video, Article, Quiz)
-- 5. Lesson Progress Tracking
-- 6. Quizzes & Submissions
-- 7. Course Reviews & Ratings
-- 8. CBT (Computer-Based Testing) Engine
-- 9. Live Virtual Rooms & Chat
-- 10. Campus Intranet & Tutoring Attendance Ledger
-- 11. Row Level Security (RLS) Policies (Idempotent with DROP POLICY IF EXISTS)
-- 12. Automatic Profile Creation Trigger on Auth Signup
-- ==============================================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES
-- ------------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'instructor', 'admin', 'super_admin')),
  bio text,
  subscription_status text default 'none',
  subscription_plan text,
  payment_reference text,
  payment_date text,
  admin_granted boolean default false,
  granted_at text,
  granted_by text,
  rejection_reason text,
  tutoring_enrolled boolean default false,
  tutoring_track_id text,
  tutoring_track_name text,
  tutoring_enrolled_at text,
  tutoring_frequency text,
  tutoring_mentor_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure 4-tier role constraint exists if table was created in a prior run
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('student', 'instructor', 'admin', 'super_admin'));

-- Ensure columns exist if table was partially created in a prior run
alter table public.profiles add column if not exists subscription_status text default 'none';
alter table public.profiles add column if not exists subscription_plan text;
alter table public.profiles add column if not exists payment_reference text;
alter table public.profiles add column if not exists payment_date text;
alter table public.profiles add column if not exists admin_granted boolean default false;
alter table public.profiles add column if not exists granted_at text;
alter table public.profiles add column if not exists granted_by text;
alter table public.profiles add column if not exists rejection_reason text;
alter table public.profiles add column if not exists tutoring_enrolled boolean default false;
alter table public.profiles add column if not exists tutoring_track_id text;
alter table public.profiles add column if not exists tutoring_track_name text;
alter table public.profiles add column if not exists tutoring_enrolled_at text;
alter table public.profiles add column if not exists tutoring_frequency text;
alter table public.profiles add column if not exists tutoring_mentor_name text;

-- ------------------------------------------------------------------------------
-- RBAC HELPER FUNCTIONS (Security Definer to prevent recursive RLS)
-- ------------------------------------------------------------------------------
create or replace function public.is_super_admin(p_user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles where id = p_user_id and role = 'super_admin'
  );
end;
$$ language plpgsql security definer;

create or replace function public.is_admin(p_user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles where id = p_user_id and role in ('admin', 'super_admin')
  );
end;
$$ language plpgsql security definer;

create or replace function public.is_faculty(p_user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles where id = p_user_id and role in ('instructor', 'admin', 'super_admin')
  );
end;
$$ language plpgsql security definer;

-- RLS: Profiles
alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." 
  on public.profiles for select using (true);

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile."
  on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update their own profile." on public.profiles;
create policy "Users can update their own profile." 
  on public.profiles for update using (auth.uid() = id);

drop policy if exists "Super Admins can update any profile." on public.profiles;
drop policy if exists "Super Admins can manage all profiles." on public.profiles;
create policy "Super Admins can manage all profiles."
  on public.profiles for update using (public.is_super_admin(auth.uid()));

drop policy if exists "Admins can update member profiles." on public.profiles;

-- Security Trigger: Guarantee all new user profiles start as 'student', and only super admins can change roles
create or replace function public.handle_profile_role_security()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    if not (auth.uid() is not null and public.is_super_admin(auth.uid())) then
      NEW.role := 'student';
    end if;
  elsif TG_OP = 'UPDATE' and NEW.role <> OLD.role then
    if not (auth.uid() is not null and public.is_super_admin(auth.uid())) then
      raise exception 'Access Denied: Only Super Administrators hold rights to alter user roles.';
    end if;
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

drop trigger if exists tr_profile_role_security on public.profiles;
create trigger tr_profile_role_security
  before insert or update on public.profiles
  for each row execute function public.handle_profile_role_security();

-- ------------------------------------------------------------------------------
-- 2. COURSES
-- ------------------------------------------------------------------------------
create table if not exists public.courses (
  id uuid default gen_random_uuid() primary key,
  instructor_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  slug text unique not null,
  description text,
  category text default 'Web Development',
  level text default 'Beginner' check (level in ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
  price numeric(10, 2) default 0.00,
  thumbnail_url text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Courses
alter table public.courses enable row level security;

drop policy if exists "Anyone can view published courses." on public.courses;
create policy "Anyone can view published courses." 
  on public.courses for select using (is_published = true or auth.uid() = instructor_id or public.is_admin(auth.uid()));

drop policy if exists "Instructors can create courses." on public.courses;
create policy "Instructors can create courses." 
  on public.courses for insert with check (
    auth.uid() = instructor_id and public.is_faculty(auth.uid())
  );

drop policy if exists "Instructors can update their own courses." on public.courses;
create policy "Instructors can update their own courses." 
  on public.courses for update using (auth.uid() = instructor_id or public.is_admin(auth.uid()));

drop policy if exists "Instructors can delete their own courses." on public.courses;
create policy "Instructors can delete their own courses." 
  on public.courses for delete using (auth.uid() = instructor_id or public.is_admin(auth.uid()));

-- ------------------------------------------------------------------------------
-- 3. ENROLLMENTS (Defined BEFORE lessons to satisfy foreign and RLS relations)
-- ------------------------------------------------------------------------------
create table if not exists public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, course_id)
);

-- RLS: Enrollments
alter table public.enrollments enable row level security;

drop policy if exists "Users can view their own enrollments." on public.enrollments;
create policy "Users can view their own enrollments."
  on public.enrollments for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "Instructors can view enrollments in their courses." on public.enrollments;
create policy "Instructors can view enrollments in their courses."
  on public.enrollments for select using (
    exists (
      select 1 from public.courses 
      where courses.id = enrollments.course_id and (courses.instructor_id = auth.uid() or public.is_admin(auth.uid()))
    )
  );

drop policy if exists "Users can enroll themselves into courses." on public.enrollments;
create policy "Users can enroll themselves into courses."
  on public.enrollments for insert with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 4. SECTIONS
-- ------------------------------------------------------------------------------
create table if not exists public.sections (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  position integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Sections
alter table public.sections enable row level security;

drop policy if exists "Sections are viewable by anyone who can view the course." on public.sections;
create policy "Sections are viewable by anyone who can view the course."
  on public.sections for select using (
    exists (
      select 1 from public.courses 
      where courses.id = sections.course_id 
      and (courses.is_published = true or courses.instructor_id = auth.uid())
    )
  );

drop policy if exists "Instructors can manage sections in their courses." on public.sections;
create policy "Instructors can manage sections in their courses."
  on public.sections for all using (
    exists (
      select 1 from public.courses 
      where courses.id = sections.course_id and courses.instructor_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- 5. LESSONS (Now safe to reference public.enrollments in RLS)
-- ------------------------------------------------------------------------------
create table if not exists public.lessons (
  id uuid default gen_random_uuid() primary key,
  section_id uuid references public.sections(id) on delete cascade not null,
  title text not null,
  type text not null default 'video' check (type in ('video', 'article', 'quiz')),
  video_url text,
  content text,
  duration_seconds integer default 300,
  position integer not null default 0,
  is_free_preview boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Lessons
alter table public.lessons enable row level security;

drop policy if exists "Free preview lessons are viewable by anyone." on public.lessons;
create policy "Free preview lessons are viewable by anyone."
  on public.lessons for select using (
    is_free_preview = true or exists (
      select 1 from public.sections
      join public.courses on courses.id = sections.course_id
      where sections.id = lessons.section_id and courses.instructor_id = auth.uid()
    ) or exists (
      select 1 from public.sections
      join public.enrollments on enrollments.course_id = sections.course_id
      where sections.id = lessons.section_id and enrollments.user_id = auth.uid()
    )
  );

drop policy if exists "Instructors can manage lessons in their courses." on public.lessons;
create policy "Instructors can manage lessons in their courses."
  on public.lessons for all using (
    exists (
      select 1 from public.sections
      join public.courses on courses.id = sections.course_id
      where sections.id = lessons.section_id and courses.instructor_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- 6. LESSON PROGRESS
-- ------------------------------------------------------------------------------
create table if not exists public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  is_completed boolean default false not null,
  last_position_seconds integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, lesson_id)
);

-- RLS: Lesson Progress
alter table public.lesson_progress enable row level security;

drop policy if exists "Users can view their own lesson progress." on public.lesson_progress;
create policy "Users can view their own lesson progress."
  on public.lesson_progress for select using (auth.uid() = user_id);

drop policy if exists "Users can insert/update their own lesson progress." on public.lesson_progress;
create policy "Users can insert/update their own lesson progress."
  on public.lesson_progress for all using (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 7. QUIZ QUESTIONS & SUBMISSIONS
-- ------------------------------------------------------------------------------
create table if not exists public.quiz_questions (
  id uuid default gen_random_uuid() primary key,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  question text not null,
  options jsonb not null, -- Array of strings e.g. ["Option A", "Option B", "Option C"]
  correct_option_index integer not null,
  explanation text,
  position integer default 0
);

alter table public.quiz_questions enable row level security;

drop policy if exists "Students can view quiz questions for lessons they can access." on public.quiz_questions;
create policy "Students can view quiz questions for lessons they can access."
  on public.quiz_questions for select using (
    exists (
      select 1 from public.lessons where lessons.id = quiz_questions.lesson_id
    )
  );

drop policy if exists "Instructors can manage quiz questions." on public.quiz_questions;
create policy "Instructors can manage quiz questions."
  on public.quiz_questions for all using (
    exists (
      select 1 from public.lessons
      join public.sections on sections.id = lessons.section_id
      join public.courses on courses.id = sections.course_id
      where lessons.id = quiz_questions.lesson_id and courses.instructor_id = auth.uid()
    )
  );

create table if not exists public.quiz_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  score integer not null, -- percentage 0-100
  passed boolean default false not null,
  answers jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.quiz_submissions enable row level security;

drop policy if exists "Users can view their own quiz submissions." on public.quiz_submissions;
create policy "Users can view their own quiz submissions."
  on public.quiz_submissions for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their own quiz submissions." on public.quiz_submissions;
create policy "Users can insert their own quiz submissions."
  on public.quiz_submissions for insert with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 8. REVIEWS
-- ------------------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, course_id)
);

alter table public.reviews enable row level security;

drop policy if exists "Anyone can read reviews." on public.reviews;
create policy "Anyone can read reviews."
  on public.reviews for select using (true);

drop policy if exists "Enrolled users can leave reviews." on public.reviews;
create policy "Enrolled users can leave reviews."
  on public.reviews for insert with check (
    auth.uid() = user_id and exists (
      select 1 from public.enrollments where enrollments.course_id = reviews.course_id and enrollments.user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- 9. AUTH TRIGGER: Auto-create Profile on Signup
-- ------------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'),
    case 
      when new.raw_user_meta_data->>'role' in ('student', 'instructor', 'admin', 'super_admin') 
        then new.raw_user_meta_data->>'role'
      else 'student'
    end
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 10. HELPER FUNCTION: Course Progress Calculation
-- ------------------------------------------------------------------------------
create or replace function public.get_course_progress(p_user_id uuid, p_course_id uuid)
returns json as $$
declare
  total_lessons integer;
  completed_lessons integer;
  percentage integer;
begin
  select count(lessons.id) into total_lessons
  from public.lessons
  join public.sections on sections.id = lessons.section_id
  where sections.course_id = p_course_id;

  select count(lesson_progress.id) into completed_lessons
  from public.lesson_progress
  join public.lessons on lessons.id = lesson_progress.lesson_id
  join public.sections on sections.id = lessons.section_id
  where sections.course_id = p_course_id
    and lesson_progress.user_id = p_user_id
    and lesson_progress.is_completed = true;

  if total_lessons = 0 then
    percentage := 0;
  else
    percentage := round((completed_lessons::numeric / total_lessons::numeric) * 100);
  end if;

  return json_build_object(
    'total_lessons', total_lessons,
    'completed_lessons', completed_lessons,
    'percentage', percentage
  );
end;
$$ language plpgsql security definer;

-- ------------------------------------------------------------------------------
-- 11. CBT (COMPUTER-BASED TESTING) MODULE
-- ------------------------------------------------------------------------------

create table if not exists public.cbt_exams (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text,
  category text default 'Web Development',
  duration_minutes integer not null default 30,
  passing_score_percent integer not null default 70,
  difficulty text default 'Intermediate' check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.cbt_exams enable row level security;

drop policy if exists "Anyone can view available CBT exams." on public.cbt_exams;
create policy "Anyone can view available CBT exams."
  on public.cbt_exams for select using (true);

create table if not exists public.cbt_questions (
  id uuid default gen_random_uuid() primary key,
  exam_id uuid references public.cbt_exams(id) on delete cascade not null,
  question text not null,
  options jsonb not null, -- Array of strings e.g. ["A", "B", "C", "D"]
  correct_option_index integer not null,
  explanation text,
  topic text default 'General',
  position integer default 0
);

alter table public.cbt_questions enable row level security;

drop policy if exists "Anyone can read CBT questions during active examination." on public.cbt_questions;
create policy "Anyone can read CBT questions during active examination."
  on public.cbt_questions for select using (true);

create table if not exists public.cbt_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  exam_id uuid references public.cbt_exams(id) on delete cascade not null,
  exam_title text not null,
  score integer not null, -- percentage
  passed boolean default false not null,
  total_questions integer not null,
  answered_count integer not null,
  correct_count integer not null,
  time_spent_seconds integer not null,
  answers jsonb, -- Map of question_id -> option_index
  flagged_questions jsonb, -- Array of question_ids
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.cbt_attempts enable row level security;

drop policy if exists "Users can view their own CBT attempts." on public.cbt_attempts;
create policy "Users can view their own CBT attempts."
  on public.cbt_attempts for select using (auth.uid() = user_id);

drop policy if exists "Users can record their own CBT attempts." on public.cbt_attempts;
create policy "Users can record their own CBT attempts."
  on public.cbt_attempts for insert with check (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 12. VIRTUAL ROOMS & LIVE INSTRUCTOR OFFICE HOURS
-- ------------------------------------------------------------------------------

create table if not exists public.live_rooms (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  instructor_id uuid references public.profiles(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete set null,
  is_active boolean default true not null,
  scheduled_time timestamp with time zone default timezone('utc'::text, now()) not null,
  tags jsonb default '["Office Hours", "Live Q&A"]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.live_rooms enable row level security;

drop policy if exists "Anyone can view live rooms." on public.live_rooms;
create policy "Anyone can view live rooms."
  on public.live_rooms for select using (true);

drop policy if exists "Instructors can create and manage live rooms." on public.live_rooms;
drop policy if exists "Instructors and Admins can create and manage live rooms." on public.live_rooms;
create policy "Instructors and Admins can create and manage live rooms."
  on public.live_rooms for all using (auth.uid() = instructor_id or public.is_admin(auth.uid()));

create table if not exists public.live_room_messages (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references public.live_rooms(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  is_announcement boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.live_room_messages enable row level security;

drop policy if exists "Participants can read room messages." on public.live_room_messages;
create policy "Participants can read room messages."
  on public.live_room_messages for select using (true);

drop policy if exists "Participants can send room messages." on public.live_room_messages;
create policy "Participants can send room messages."
  on public.live_room_messages for insert with check (auth.uid() = sender_id);

-- ------------------------------------------------------------------------------
-- 13. CAMPUS INTRANET & TUTORING CLEARANCE AUDIT
-- ------------------------------------------------------------------------------

create table if not exists public.intranet_access_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  user_name text not null,
  user_email text not null,
  user_avatar text,
  plan_id text not null,
  plan_name text not null,
  amount_paid numeric(10, 2) default 0.00,
  payment_method text not null,
  payment_reference text not null,
  payment_date timestamp with time zone default timezone('utc'::text, now()) not null,
  status text not null default 'pending_approval' check (status in ('pending_approval', 'active', 'rejected', 'expired')),
  admin_granted boolean default false,
  reviewed_at timestamp with time zone,
  reviewed_by text,
  rejection_reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.intranet_access_requests enable row level security;

drop policy if exists "Users can view their own intranet requests." on public.intranet_access_requests;
create policy "Users can view their own intranet requests."
  on public.intranet_access_requests for select using (
    auth.uid() = user_id or public.is_faculty(auth.uid())
  );

drop policy if exists "Users can submit intranet requests." on public.intranet_access_requests;
create policy "Users can submit intranet requests."
  on public.intranet_access_requests for insert with check (auth.uid() = user_id);

drop policy if exists "Admins can update intranet requests." on public.intranet_access_requests;
create policy "Admins can update intranet requests."
  on public.intranet_access_requests for update using (
    public.is_admin(auth.uid())
  );
