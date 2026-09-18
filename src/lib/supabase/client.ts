import { createBrowserClient } from '@supabase/ssr';
import { 
  Course, 
  LessonProgress, 
  Profile, 
  QuizSubmission, 
  UserRole, 
  CBTExam, 
  CBTAttempt, 
  LiveRoom, 
  LiveParticipant, 
  LiveChatMessage,
  IntranetAccessRequest,
  IntranetBulletin,
  SubscriptionPlan,
  SubscriptionStatus
} from '@/types';
import { 
  DEMO_PROFILES, 
  INITIAL_COURSES, 
  SAMPLE_CBT_EXAMS, 
  SAMPLE_CBT_ATTEMPTS,
  SAMPLE_LIVE_ROOMS, 
  INITIAL_ROOM_PARTICIPANTS, 
  INITIAL_ROOM_MESSAGES,
  SUBSCRIPTION_PLANS,
  SAMPLE_INTRANET_REQUESTS,
  CAMPUS_BULLETINS
} from './mockData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return (
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id')
  );
};

export const createClient = () => {
  if (isSupabaseConfigured()) {
    return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
  }
  return null;
};

// Local storage keys for local demo mode
const STORAGE_KEYS = {
  CURRENT_USER: 'reactjav_current_user',
  COURSES: 'reactjav_courses',
  PROGRESS: 'reactjav_lesson_progress',
  ENROLLMENTS: 'reactjav_enrollments',
  QUIZ_SUBMISSIONS: 'reactjav_quiz_submissions',
  CBT_EXAMS: 'reactjav_cbt_exams',
  CBT_ATTEMPTS: 'reactjav_cbt_attempts',
  LIVE_ROOMS: 'reactjav_live_rooms',
  LIVE_MESSAGES: 'reactjav_live_messages',
  INTRANET_REQUESTS: 'reactjav_intranet_requests',
  CAMPUS_BULLETINS: 'reactjav_campus_bulletins',
};

// Client-side Local State Store (Local Persistence Fallback)
export class LocalDataService {
  static getCurrentUser(): Profile {
    if (typeof window === 'undefined') return DEMO_PROFILES.student;
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    this.setCurrentUser(DEMO_PROFILES.student);
    return DEMO_PROFILES.student;
  }

  static setCurrentUser(profile: Profile): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(profile));
  }

  static switchDemoRole(role: UserRole): Profile {
    const profile = DEMO_PROFILES[role] || DEMO_PROFILES.student;
    this.setCurrentUser(profile);
    return profile;
  }

  static getCourses(): Course[] {
    if (typeof window === 'undefined') return INITIAL_COURSES;
    const stored = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (stored) {
      try {
        const parsed: Course[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_COURSES.length && parsed.some(c => c.track)) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    return INITIAL_COURSES;
  }

  static getCourseBySlug(slug: string): Course | undefined {
    const courses = this.getCourses();
    return courses.find((c) => c.slug === slug || c.id === slug);
  }

  static getCourseById(id: string): Course | undefined {
    const courses = this.getCourses();
    return courses.find((c) => c.id === id);
  }

  static saveCourse(updatedCourse: Course): void {
    if (typeof window === 'undefined') return;
    const courses = this.getCourses();
    const index = courses.findIndex((c) => c.id === updatedCourse.id);
    if (index >= 0) {
      courses[index] = updatedCourse;
    } else {
      courses.unshift(updatedCourse);
    }
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }

  static getEnrollments(userId: string): string[] {
    if (typeof window === 'undefined') return [INITIAL_COURSES[0].id];
    const stored = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
    if (stored) {
      try {
        const map = JSON.parse(stored) as Record<string, string[]>;
        return map[userId] || [INITIAL_COURSES[0].id];
      } catch {
        // fallback
      }
    }
    const defaultEnrollments: Record<string, string[]> = {
      [userId]: [INITIAL_COURSES[0].id],
    };
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(defaultEnrollments));
    return defaultEnrollments[userId];
  }

  static enroll(userId: string, courseId: string): void {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
    const map = stored ? JSON.parse(stored) : {};
    const userList = new Set<string>(map[userId] || []);
    userList.add(courseId);
    map[userId] = Array.from(userList);
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(map));
  }

  static isEnrolled(userId: string, courseId: string): boolean {
    const list = this.getEnrollments(userId);
    return list.includes(courseId);
  }

  static getProgress(userId: string): Record<string, LessonProgress> {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (stored) {
      try {
        const allProgress = JSON.parse(stored);
        return allProgress[userId] || {};
      } catch {
        // fallback
      }
    }
    return {};
  }

  static updateLessonProgress(
    userId: string,
    lessonId: string,
    isCompleted: boolean,
    lastPositionSeconds: number = 0
  ): void {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    const all = stored ? JSON.parse(stored) : {};
    if (!all[userId]) all[userId] = {};

    all[userId][lessonId] = {
      id: `prog_${userId}_${lessonId}`,
      user_id: userId,
      lesson_id: lessonId,
      is_completed: isCompleted,
      last_position_seconds: Math.floor(lastPositionSeconds),
      updated_at: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
  }

  static saveQuizSubmission(submission: QuizSubmission): void {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_SUBMISSIONS);
    const list: QuizSubmission[] = stored ? JSON.parse(stored) : [];
    list.push(submission);
    localStorage.setItem(STORAGE_KEYS.QUIZ_SUBMISSIONS, JSON.stringify(list));
  }

  static getCourseStats(courseId: string, userId: string): { totalLessons: number; completedLessons: number; percentage: number } {
    const course = this.getCourseById(courseId);
    if (!course || !course.sections) {
      return { totalLessons: 0, completedLessons: 0, percentage: 0 };
    }

    const allLessons = course.sections.flatMap((s) => s.lessons || []);
    const userProgress = this.getProgress(userId);

    const totalLessons = allLessons.length;
    const completedLessons = allLessons.filter(
      (l) => userProgress[l.id]?.is_completed
    ).length;

    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    return { totalLessons, completedLessons, percentage };
  }

  // ==========================================
  // CBT Methods
  // ==========================================

  static getCBTExams(): CBTExam[] {
    if (typeof window === 'undefined') return SAMPLE_CBT_EXAMS;
    const stored = localStorage.getItem(STORAGE_KEYS.CBT_EXAMS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.CBT_EXAMS, JSON.stringify(SAMPLE_CBT_EXAMS));
    return SAMPLE_CBT_EXAMS;
  }

  static getCBTExamById(id: string): CBTExam | undefined {
    const exams = this.getCBTExams();
    return exams.find((e) => e.id === id || e.slug === id);
  }

  static saveCBTAttempt(attempt: CBTAttempt): void {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEYS.CBT_ATTEMPTS);
    const attempts: CBTAttempt[] = stored ? JSON.parse(stored) : [];
    attempts.unshift(attempt);
    localStorage.setItem(STORAGE_KEYS.CBT_ATTEMPTS, JSON.stringify(attempts));
  }

  static getCBTAttempts(userId: string): CBTAttempt[] {
    if (typeof window === 'undefined') return SAMPLE_CBT_ATTEMPTS.filter((a) => a.user_id === userId);
    const stored = localStorage.getItem(STORAGE_KEYS.CBT_ATTEMPTS);
    if (stored) {
      try {
        const all: CBTAttempt[] = JSON.parse(stored);
        return all.filter((a) => a.user_id === userId);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.CBT_ATTEMPTS, JSON.stringify(SAMPLE_CBT_ATTEMPTS));
    return SAMPLE_CBT_ATTEMPTS.filter((a) => a.user_id === userId);
  }

  static getCBTAttemptById(attemptId: string): CBTAttempt | undefined {
    if (typeof window === 'undefined') return undefined;
    const stored = localStorage.getItem(STORAGE_KEYS.CBT_ATTEMPTS);
    if (stored) {
      try {
        const all: CBTAttempt[] = JSON.parse(stored);
        return all.find((a) => a.id === attemptId);
      } catch {
        // fallback
      }
    }
    return undefined;
  }

  // ==========================================
  // Live Virtual Rooms & Office Hours
  // ==========================================

  static getLiveRooms(): LiveRoom[] {
    if (typeof window === 'undefined') return SAMPLE_LIVE_ROOMS;
    const stored = localStorage.getItem(STORAGE_KEYS.LIVE_ROOMS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.LIVE_ROOMS, JSON.stringify(SAMPLE_LIVE_ROOMS));
    return SAMPLE_LIVE_ROOMS;
  }

  static getLiveRoomById(id: string): LiveRoom | undefined {
    const rooms = this.getLiveRooms();
    return rooms.find((r) => r.id === id);
  }

  static createLiveRoom(room: LiveRoom): void {
    if (typeof window === 'undefined') return;
    const rooms = this.getLiveRooms();
    rooms.unshift(room);
    localStorage.setItem(STORAGE_KEYS.LIVE_ROOMS, JSON.stringify(rooms));
  }

  static getRoomParticipants(roomId: string): LiveParticipant[] {
    return INITIAL_ROOM_PARTICIPANTS[roomId] || [
      {
        id: 'usr_instructor_001',
        name: 'Dr. Elena Chen (Host)',
        avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        role: 'instructor',
        is_speaking: true,
        is_muted: false,
        is_camera_on: true,
      },
      {
        id: 'usr_student_001',
        name: 'Alex Morgan (You)',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'student',
        is_speaking: false,
        is_muted: true,
        is_camera_on: true,
      },
    ];
  }

  static getRoomMessages(roomId: string): LiveChatMessage[] {
    if (typeof window === 'undefined') return INITIAL_ROOM_MESSAGES[roomId] || [];
    const stored = localStorage.getItem(`${STORAGE_KEYS.LIVE_MESSAGES}_${roomId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    const initial = INITIAL_ROOM_MESSAGES[roomId] || [];
    localStorage.setItem(`${STORAGE_KEYS.LIVE_MESSAGES}_${roomId}`, JSON.stringify(initial));
    return initial;
  }

  static sendRoomMessage(roomId: string, message: LiveChatMessage): LiveChatMessage[] {
    const messages = this.getRoomMessages(roomId);
    messages.push(message);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEYS.LIVE_MESSAGES}_${roomId}`, JSON.stringify(messages));
    }
    return messages;
  }

  // ==========================================
  // Intranet & Subscription Clearance Services
  // ==========================================

  static getSubscriptionPlans(): SubscriptionPlan[] {
    return SUBSCRIPTION_PLANS;
  }

  static getIntranetRequests(): IntranetAccessRequest[] {
    if (typeof window === 'undefined') return SAMPLE_INTRANET_REQUESTS;
    const stored = localStorage.getItem(STORAGE_KEYS.INTRANET_REQUESTS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.INTRANET_REQUESTS, JSON.stringify(SAMPLE_INTRANET_REQUESTS));
    return SAMPLE_INTRANET_REQUESTS;
  }

  static saveIntranetRequests(requests: IntranetAccessRequest[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.INTRANET_REQUESTS, JSON.stringify(requests));
  }

  static submitSubscriptionPayment(
    planId: 'term' | 'annual' | 'lifetime',
    paymentMethod: 'credit_card' | 'bank_transfer' | 'campus_voucher',
    paymentRef: string
  ): { user: Profile; request: IntranetAccessRequest } {
    const user = this.getCurrentUser();
    const plans = this.getSubscriptionPlans();
    const selectedPlan = plans.find((p) => p.id === planId) || plans[1];

    const updatedUser: Profile = {
      ...user,
      subscription_status: 'pending_approval',
      subscription_plan: planId,
      payment_reference: paymentRef,
      payment_date: new Date().toISOString(),
      admin_granted: false,
      rejection_reason: undefined,
    };
    this.setCurrentUser(updatedUser);

    // Add or update entry in Intranet Requests queue
    const requests = this.getIntranetRequests();
    const existingIndex = requests.findIndex((r) => r.user_id === user.id);

    const newRequest: IntranetAccessRequest = {
      id: existingIndex >= 0 ? requests[existingIndex].id : `req_${Date.now()}`,
      user_id: user.id,
      user_name: user.full_name || 'Student Candidate',
      user_email: user.email,
      user_avatar: user.avatar_url || undefined,
      plan_id: planId,
      plan_name: selectedPlan.name,
      amount_paid: selectedPlan.price,
      payment_method: paymentMethod,
      payment_reference: paymentRef,
      payment_date: new Date().toISOString(),
      status: 'pending_approval',
      admin_granted: false,
    };

    if (existingIndex >= 0) {
      requests[existingIndex] = newRequest;
    } else {
      requests.unshift(newRequest);
    }
    this.saveIntranetRequests(requests);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
    }

    return { user: updatedUser, request: newRequest };
  }

  static grantIntranetAccess(
    requestIdOrUserId: string,
    adminId: string = 'usr_admin_001'
  ): { success: boolean; request?: IntranetAccessRequest } {
    const requests = this.getIntranetRequests();
    const target = requests.find(
      (r) => r.id === requestIdOrUserId || r.user_id === requestIdOrUserId
    );

    if (!target) return { success: false };

    target.status = 'active';
    target.admin_granted = true;
    target.reviewed_at = new Date().toISOString();
    target.reviewed_by = adminId;
    target.rejection_reason = undefined;
    this.saveIntranetRequests(requests);

    // If current user is this student, also update their active profile
    const currentUser = this.getCurrentUser();
    if (currentUser.id === target.user_id) {
      const updatedUser: Profile = {
        ...currentUser,
        subscription_status: 'active',
        subscription_plan: target.plan_id,
        payment_reference: target.payment_reference,
        admin_granted: true,
        granted_at: new Date().toISOString(),
        granted_by: adminId,
        rejection_reason: undefined,
      };
      this.setCurrentUser(updatedUser);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
    }

    return { success: true, request: target };
  }

  static rejectIntranetAccess(
    requestIdOrUserId: string,
    reason: string = 'Tuition payment reference could not be verified by bursar.',
    adminId: string = 'usr_admin_001'
  ): { success: boolean; request?: IntranetAccessRequest } {
    const requests = this.getIntranetRequests();
    const target = requests.find(
      (r) => r.id === requestIdOrUserId || r.user_id === requestIdOrUserId
    );

    if (!target) return { success: false };

    target.status = 'rejected';
    target.admin_granted = false;
    target.reviewed_at = new Date().toISOString();
    target.reviewed_by = adminId;
    target.rejection_reason = reason;
    this.saveIntranetRequests(requests);

    const currentUser = this.getCurrentUser();
    if (currentUser.id === target.user_id) {
      const updatedUser: Profile = {
        ...currentUser,
        subscription_status: 'rejected',
        admin_granted: false,
        rejection_reason: reason,
      };
      this.setCurrentUser(updatedUser);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
    }

    return { success: true, request: target };
  }

  static revokeIntranetAccess(userId: string): boolean {
    const requests = this.getIntranetRequests();
    const target = requests.find((r) => r.user_id === userId);
    if (target) {
      target.status = 'none';
      target.admin_granted = false;
      this.saveIntranetRequests(requests);
    }

    const currentUser = this.getCurrentUser();
    if (currentUser.id === userId) {
      const updatedUser: Profile = {
        ...currentUser,
        subscription_status: 'none',
        admin_granted: false,
        granted_at: undefined,
        granted_by: undefined,
      };
      this.setCurrentUser(updatedUser);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
    }
    return true;
  }

  static getCampusBulletins(): IntranetBulletin[] {
    if (typeof window === 'undefined') return CAMPUS_BULLETINS;
    const stored = localStorage.getItem(STORAGE_KEYS.CAMPUS_BULLETINS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.CAMPUS_BULLETINS, JSON.stringify(CAMPUS_BULLETINS));
    return CAMPUS_BULLETINS;
  }

  static enrollInDirectTutoring(
    userId?: string,
    track?: { id: string; name: string },
    details?: {
      learnerName?: string;
      frequency?: string;
      notes?: string;
    }
  ): { success: boolean; user: Profile } {
    const currentUser = this.getCurrentUser();
    const targetUserId = userId || currentUser.id;
    const trackId = track?.id || 'python-engineering';
    const trackName = track?.name || 'Python Engineering';

    const updatedUser: Profile = {
      ...currentUser,
      id: targetUserId,
      full_name: details?.learnerName?.trim() || currentUser.full_name || 'Tutoring Scholar',
      tutoring_enrolled: true,
      tutoring_track_id: trackId,
      tutoring_track_name: trackName,
      tutoring_enrolled_at: new Date().toISOString(),
      tutoring_frequency: details?.frequency || '2x per week (Recommended)',
      subscription_status: 'active',
      subscription_plan: 'annual',
      admin_granted: true,
      granted_at: new Date().toISOString(),
      granted_by: 'Academic Lead (Direct Tutoring Desk)',
      payment_reference: 'DIR-TUT-' + Date.now().toString(36).toUpperCase(),
      payment_date: new Date().toISOString(),
    };

    this.setCurrentUser(updatedUser);

    // 1. Auto-enroll student into corresponding track courses so studies, lessons, and records are tracked immediately
    const courses = this.getCourses();
    if (courses.length > 0) {
      const matchingCourse = courses.find(c => 
        c.title.toLowerCase().includes(trackName.toLowerCase()) || 
        (c.track && c.track.toLowerCase().includes(trackName.toLowerCase())) ||
        (c.category && c.category.toLowerCase().includes(trackName.toLowerCase()))
      ) || courses[0];

      this.enroll(updatedUser.id, matchingCourse.id);
      if (courses[1] && courses[1].id !== matchingCourse.id) {
        this.enroll(updatedUser.id, courses[1].id);
      }
    }

    // 2. Auto-provision a dedicated 1-on-1 Live Mentoring Room for direct tutoring
    try {
      const existingRooms = this.getLiveRooms();
      const tutoringRoomId = `room_tutoring_${trackId}`;
      const hasRoom = existingRooms.some(r => r.id === tutoringRoomId);
      if (!hasRoom) {
        const tutoringRoom: LiveRoom = {
          id: tutoringRoomId,
          title: `1-on-1 Mentoring Pod: ${trackName}`,
          description: `Dedicated 1-on-1 direct tutoring and code pairing room for ${updatedUser.full_name}. Real-time screen share, shared code editor, and interactive whiteboard enabled.`,
          instructor_id: 'usr_instructor_001',
          instructor_name: 'Dr. Elena Chen (Faculty Lead)',
          instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
          course_title: trackName,
          is_active: true,
          scheduled_time: 'Live On-Demand (Tutoring Session)',
          participant_count: 2,
          tags: ['1-on-1 Tutoring', 'Screen Share', 'Code Pairing', trackName],
          created_at: new Date().toISOString(),
        };
        this.createLiveRoom(tutoringRoom);
      }
    } catch {
      // ignore room provision errors
    }

    // 3. Post an official Campus Intranet Bulletin welcoming the tutoring fellow
    try {
      const bulletins = this.getCampusBulletins();
      const newBulletin: IntranetBulletin = {
        id: `blt_tut_${Date.now()}`,
        title: `Direct Tutoring Fellow Onboarded: ${updatedUser.full_name} (${trackName})`,
        category: 'Admission',
        priority: 'high',
        author: 'Academic Registrar',
        author_role: 'Office of Direct Tutoring & Mentorship',
        content: `Academic Clearance and unrestricted Campus Intranet fellowship privileges granted for ${updatedUser.full_name} in the ${trackName} track. CBT certifications, 1-on-1 live rooms, and transcript tracking active.`,
        created_at: new Date().toISOString(),
      };
      bulletins.unshift(newBulletin);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.CAMPUS_BULLETINS, JSON.stringify(bulletins));
      }
    } catch {
      // ignore bulletin errors
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
    }

    return { success: true, user: updatedUser };
  }

  static checkIntranetAccess(user?: Profile | null): {
    hasAccess: boolean;
    status: SubscriptionStatus;
    reason: string;
  } {
    const target = user || this.getCurrentUser();
    if (!target) {
      return {
        hasAccess: false,
        status: 'none',
        reason: 'Authentication required. Please log in or sign up.',
      };
    }

    // Faculty & Administrators have direct system-wide clearance
    if (target.role === 'admin' || target.role === 'instructor') {
      return {
        hasAccess: true,
        status: 'active',
        reason: 'Faculty & Administrative clearance granted.',
      };
    }

    // Direct Tutoring Fellows have automatic guaranteed Intranet clearance & study tracking
    if (target.tutoring_enrolled) {
      return {
        hasAccess: true,
        status: 'active',
        reason: `Direct Tutoring Fellow (${target.tutoring_track_name || 'Active Track'}) - Intranet clearance & study tracking active.`,
      };
    }

    // For students: requires active subscription AND admin grant
    const status = target.subscription_status || 'none';

    if (status === 'active' && target.admin_granted) {
      return {
        hasAccess: true,
        status: 'active',
        reason: 'Verified Student Intranet Fellowship clearance.',
      };
    }

    if (status === 'pending_approval') {
      return {
        hasAccess: false,
        status: 'pending_approval',
        reason: 'Tuition payment received. Awaiting Administrator verification and clearance grant.',
      };
    }

    if (status === 'rejected') {
      return {
        hasAccess: false,
        status: 'rejected',
        reason: target.rejection_reason || 'Tuition submission rejected by Administrator.',
      };
    }

    return {
      hasAccess: false,
      status: 'none',
      reason: 'No active student subscription. Tuition payment and administrative clearance required.',
    };
  }
}



