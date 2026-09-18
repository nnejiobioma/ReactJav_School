export type UserRole = 'student' | 'instructor' | 'admin';

export type SubscriptionStatus = 'none' | 'pending_approval' | 'active' | 'rejected' | 'expired';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  bio?: string | null;
  created_at: string;
  // Intranet & Subscription Clearance
  subscription_status?: SubscriptionStatus;
  subscription_plan?: 'term' | 'annual' | 'lifetime';
  payment_reference?: string;
  payment_date?: string;
  admin_granted?: boolean;
  granted_at?: string;
  granted_by?: string;
  rejection_reason?: string;
  // Direct Tutoring & Track Study Records
  tutoring_enrolled?: boolean;
  tutoring_track_id?: string;
  tutoring_track_name?: string;
  tutoring_enrolled_at?: string;
  tutoring_frequency?: string;
  tutoring_mentor_name?: string;
}

export interface Course {
  id: string;
  instructor_id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  thumbnail_url: string;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
  instructor?: Profile;
  sections?: Section[];
  enrollments_count?: number;
  average_rating?: number;
  reviews_count?: number;
  // REACTJav Track & Programme Metadata
  track?: string;
  outcome_hook?: string;
  duration_weeks?: number;
  weekly_hours?: string;
  skills?: string[];
  sponsorship_note?: string;
  is_now_open?: boolean;
  is_popular?: boolean;
  cohort_date?: string;
}

export interface Section {
  id: string;
  course_id: string;
  title: string;
  position: number;
  created_at?: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  section_id: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  video_url?: string | null;
  content?: string | null;
  duration_seconds: number;
  position: number;
  is_free_preview: boolean;
  created_at?: string;
  is_completed?: boolean;
  last_position_seconds?: number;
  quiz_questions?: QuizQuestion[];
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  course?: Course;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  is_completed: boolean;
  last_position_seconds: number;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  lesson_id: string;
  question: string;
  options: string[];
  correct_option_index: number;
  explanation?: string;
  position: number;
}

export interface QuizSubmission {
  id: string;
  user_id: string;
  lesson_id: string;
  score: number;
  passed: boolean;
  answers: Record<string, number>;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user?: Profile;
}

// ==========================================
// CBT (Computer-Based Testing) Types
// ==========================================

export interface CBTQuestion {
  id: string;
  exam_id: string;
  question: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
  topic: string;
  position: number;
}

export interface CBTExam {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  duration_minutes: number;
  passing_score_percent: number;
  total_questions: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: CBTQuestion[];
  created_at: string;
}

export interface CBTAttempt {
  id: string;
  user_id: string;
  exam_id: string;
  exam_title: string;
  score: number; // percentage e.g. 85
  passed: boolean;
  total_questions: number;
  answered_count: number;
  correct_count: number;
  time_spent_seconds: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  flagged_questions: string[]; // questionIds flagged for review
  created_at: string;
}

// ==========================================
// Live Virtual Room & Office Hours Types
// ==========================================

export interface LiveParticipant {
  id: string;
  name: string;
  avatar_url: string;
  role: 'instructor' | 'student' | 'admin';
  is_speaking?: boolean;
  is_muted?: boolean;
  is_camera_on?: boolean;
  has_hand_raised?: boolean;
}

export interface LiveChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar: string;
  sender_role: 'instructor' | 'student' | 'admin';
  message: string;
  timestamp: string;
  is_announcement?: boolean;
}

export interface LiveRoom {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  instructor_name: string;
  instructor_avatar: string;
  course_id?: string;
  course_title?: string;
  is_active: boolean;
  scheduled_time: string;
  participant_count: number;
  tags: string[];
  created_at: string;
}

// ==========================================
// Intranet & Subscription Clearance Types
// ==========================================

export interface SubscriptionPlan {
  id: 'term' | 'annual' | 'lifetime';
  name: string;
  tagline: string;
  price: number;
  period: string;
  popular?: boolean;
  features: string[];
  intranet_perks: string[];
}

export interface IntranetAccessRequest {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_avatar?: string;
  plan_id: 'term' | 'annual' | 'lifetime';
  plan_name: string;
  amount_paid: number;
  payment_method: 'credit_card' | 'bank_transfer' | 'campus_voucher';
  payment_reference: string;
  payment_date: string;
  status: SubscriptionStatus;
  admin_granted: boolean;
  reviewed_at?: string;
  reviewed_by?: string;
  rejection_reason?: string;
}

export interface IntranetBulletin {
  id: string;
  title: string;
  category: 'Exam' | 'Lecture' | 'Maintenance' | 'Admission';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  author: string;
  author_role: string;
  content: string;
  created_at: string;
}



