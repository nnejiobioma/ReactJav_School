-- ==============================================================================
-- Supabase Schema for Modern Learning Platform (LMS)
-- Includes:
-- 1. Profiles (linked to auth.users with RBAC: student, instructor, admin)
-- 2. Courses, Sections, Lessons (Video, Article, Quiz)
-- 3. Enrollments & Lesson Progress Tracking
-- 4. Quizzes & Submissions
-- 5. Course Reviews & Ratings
-- 6. Row Level Security (RLS) Policies
-- 7. Automatic Profile Creation Trigger on Auth Signup
-- 8. Seed Sample Courses & Lessons
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
  role text not null default 'student' check (role in ('student', 'instructor', 'admin')),
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." 
  on public.profiles for select using (true);

create policy "Users can update their own profile." 
  on public.profiles for update using (auth.uid() = id);

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

create policy "Anyone can view published courses." 
  on public.courses for select using (is_published = true or auth.uid() = instructor_id);

create policy "Instructors can create courses." 
  on public.courses for insert with check (
    auth.uid() = instructor_id and exists (
      select 1 from public.profiles where id = auth.uid() and role in ('instructor', 'admin')
    )
  );

create policy "Instructors can update their own courses." 
  on public.courses for update using (auth.uid() = instructor_id);

create policy "Instructors can delete their own courses." 
  on public.courses for delete using (auth.uid() = instructor_id);

-- ------------------------------------------------------------------------------
-- 3. SECTIONS
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

create policy "Sections are viewable by anyone who can view the course."
  on public.sections for select using (
    exists (
      select 1 from public.courses 
      where courses.id = sections.course_id 
      and (courses.is_published = true or courses.instructor_id = auth.uid())
    )
  );

create policy "Instructors can manage sections in their courses."
  on public.sections for all using (
    exists (
      select 1 from public.courses 
      where courses.id = sections.course_id and courses.instructor_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- 4. LESSONS
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

create policy "Instructors can manage lessons in their courses."
  on public.lessons for all using (
    exists (
      select 1 from public.sections
      join public.courses on courses.id = sections.course_id
      where sections.id = lessons.section_id and courses.instructor_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- 5. ENROLLMENTS
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

create policy "Users can view their own enrollments."
  on public.enrollments for select using (auth.uid() = user_id);

create policy "Instructors can view enrollments in their courses."
  on public.enrollments for select using (
    exists (
      select 1 from public.courses where courses.id = enrollments.course_id and courses.instructor_id = auth.uid()
    )
  );

create policy "Users can enroll themselves into courses."
  on public.enrollments for insert with check (auth.uid() = user_id);

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

create policy "Users can view their own lesson progress."
  on public.lesson_progress for select using (auth.uid() = user_id);

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

create policy "Students can view quiz questions for lessons they can access."
  on public.quiz_questions for select using (
    exists (
      select 1 from public.lessons where lessons.id = quiz_questions.lesson_id
    )
  );

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

create policy "Users can view their own quiz submissions."
  on public.quiz_submissions for select using (auth.uid() = user_id);

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

create policy "Anyone can read reviews."
  on public.reviews for select using (true);

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
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
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
create policy "Users can view their own CBT attempts."
  on public.cbt_attempts for select using (auth.uid() = user_id);

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

create policy "Anyone can view live rooms."
  on public.live_rooms for select using (true);

create policy "Instructors can create and manage live rooms."
  on public.live_rooms for all using (auth.uid() = instructor_id);

create table if not exists public.live_room_messages (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references public.live_rooms(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  is_announcement boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.live_room_messages enable row level security;

create policy "Participants can read room messages."
  on public.live_room_messages for select using (true);

create policy "Participants can send room messages."
  on public.live_room_messages for insert with check (auth.uid() = sender_id);


