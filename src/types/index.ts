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
  parent_lesson_id?: string | null;
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
  sub_lessons?: Lesson[];
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

// ==========================================
// Direct Tutoring Attendance Tracking Types
// ==========================================

export interface TutoringAttendanceSession {
  id: string;
  student_id: string;
  student_name: string;
  student_avatar?: string;
  instructor_id: string;
  instructor_name: string;
  instructor_avatar?: string;
  track_id: string;
  track_name: string;
  session_date: string; // YYYY-MM-DD e.g. "2026-09-04"
  session_time: string; // e.g. "14:00 - 15:30 GMT"
  session_title: string;
  month: string; // YYYY-MM e.g. "2026-09"

  // DUAL-SIGNOFF MECHANISM:
  // Attendance is only valid/accepted if BOTH student and instructor have checked the box!
  student_checked: boolean;
  student_checked_at?: string;
  instructor_checked: boolean;
  instructor_checked_at?: string;

  // Computed validity (strictly requires student_checked && instructor_checked)
  is_valid: boolean;

  topic_summary?: string;
  notes?: string;
  created_at: string;
}

export interface MonthlyAttendanceSummary {
  month: string; // YYYY-MM
  month_label: string; // e.g. "September 2026"
  total_sessions: number;
  valid_sessions: number;
  pending_sessions: number;
  unconfirmed_sessions: number;
  attendance_percentage: number;
  audit_status: 'Compliant' | 'Pending Review' | 'Critical Attendance Warning';
}

// ==========================================
// Site-Wide Content Management (CMS) Types
// ==========================================

export interface SiteHeroContent {
  announcement_badge: string;
  announcement_text: string;
  announcement_link_text: string;
  eyebrow: string;
  title_prefix: string;
  title_highlight: string;
  subtitle: string;
  search_placeholder: string;
  metric_1_value: string;
  metric_1_label: string;
  metric_2_value: string;
  metric_2_label: string;
  metric_3_value: string;
  metric_3_label: string;
  metric_4_value: string;
  metric_4_label: string;
}

export interface SiteFlagshipContent {
  badge: string;
  title: string;
  description: string;
  next_intake: string;
  duration: string;
  sponsorship: string;
  partner_badge: string;
  enrolled_count_text: string;
  cta_primary_text: string;
  cta_secondary_text: string;
  thumbnail_url?: string;
}

export interface SiteCatalogHeaderContent {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface SitePartitionGatewayContent {
  eyebrow: string;
  title_prefix: string;
  title_public_highlight: string;
  title_intranet_highlight: string;
  subtitle: string;
  public_title: string;
  public_badge: string;
  public_description: string;
  public_bullets: string[];
  public_cta_1_text: string;
  public_cta_2_text: string;
  intranet_title: string;
  intranet_badge: string;
  intranet_description: string;
  intranet_bullets: string[];
  intranet_cta_text: string;
}

export interface SiteLearningPillar {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface SiteLearningModelContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  pillars: SiteLearningPillar[];
}

export interface SiteDirectTutoringContent {
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  zone_1_title: string;
  zone_1_desc: string;
  zone_2_title: string;
  zone_2_desc: string;
  zone_3_title: string;
  zone_3_desc: string;
  cta_primary_text: string;
  cta_whatsapp_text: string;
  whatsapp_number?: string;
}

export interface SiteTestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  outcome: string;
}

export interface SiteTestimonialsContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: SiteTestimonialItem[];
}

export interface SiteFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteFaqContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: SiteFaqItem[];
}

export interface SiteBottomCtaContent {
  title_prefix: string;
  title_highlight: string;
  subtitle: string;
  cta_primary_text: string;
  cta_secondary_text: string;
}

export interface SiteFooterContent {
  brand_tagline: string;
  mission_badge: string;
  copyright_text: string;
  alliance_1: string;
  alliance_2: string;
  alliance_3: string;
}

export interface SiteTutoringHeroContent {
  badge: string;
  title_prefix: string;
  title_highlight: string;
  subtitle: string;
  cta_primary_text: string;
  cta_secondary_text: string;
  cta_whatsapp_text: string;
  whatsapp_number?: string;
}

export interface SiteTutoringZonesContent {
  zone_1_badge: string;
  zone_1_title: string;
  zone_1_subtitle: string;
  zone_2_badge: string;
  zone_2_title: string;
  zone_2_subtitle: string;
}

export interface SiteTutoringMetricsContent {
  metric_1_value: string;
  metric_1_label: string;
  metric_1_sub: string;
  metric_2_value: string;
  metric_2_label: string;
  metric_2_sub: string;
  metric_3_value: string;
  metric_3_label: string;
  metric_3_sub: string;
  metric_4_value: string;
  metric_4_label: string;
  metric_4_sub: string;
}

export interface SiteTutoringPerksContent {
  badge: string;
  title: string;
  subtitle: string;
  perk_1_title: string;
  perk_1_desc: string;
  perk_2_title: string;
  perk_2_desc: string;
  perk_3_title: string;
  perk_3_desc: string;
  perk_4_title: string;
  perk_4_desc: string;
}

export interface SiteTutoringBottomCtaContent {
  title: string;
  subtitle: string;
  cta_primary_text: string;
  cta_whatsapp_text: string;
  whatsapp_number?: string;
}

export interface SiteContentConfig {
  hero: SiteHeroContent;
  flagship: SiteFlagshipContent;
  catalog_header: SiteCatalogHeaderContent;
  partition_gateway: SitePartitionGatewayContent;
  learning_model: SiteLearningModelContent;
  direct_tutoring: SiteDirectTutoringContent;
  testimonials: SiteTestimonialsContent;
  faq: SiteFaqContent;
  bottom_cta: SiteBottomCtaContent;
  footer: SiteFooterContent;
  tutoring_hero?: SiteTutoringHeroContent;
  tutoring_zones?: SiteTutoringZonesContent;
  tutoring_metrics?: SiteTutoringMetricsContent;
  tutoring_perks?: SiteTutoringPerksContent;
  tutoring_bottom_cta?: SiteTutoringBottomCtaContent;
}

