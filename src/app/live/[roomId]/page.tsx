'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor,
  ScreenShare,
  ScreenShareOff, 
  Hand, 
  Smile, 
  MessageSquare, 
  Users, 
  HelpCircle, 
  PhoneOff, 
  PenTool, 
  Code2, 
  LayoutGrid, 
  Send, 
  Download, 
  RotateCcw, 
  Check, 
  ThumbsUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Disc,
  Pause,
  Play,
  Trash,
  X,
  Clock,
  Radio,
  DoorOpen
} from 'lucide-react';
import { LiveRoom, LiveParticipant, LiveChatMessage, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

export default function VirtualMeetingRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const [room, setRoom] = useState<LiveRoom | null>(null);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  // Meeting Modes: 'video' | 'whiteboard' | 'code' | 'screenshare'
  const [activeStage, setActiveStage] = useState<'video' | 'whiteboard' | 'code' | 'screenshare'>('video');

  // Media controls state
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenShareSource, setScreenShareSource] = useState<'live' | 'demo'>('live');
  const [screenShareSharer, setScreenShareSharer] = useState<string>('You');
  const [demoSlideIndex, setDemoSlideIndex] = useState(0);
  const [hasHandRaised, setHasHandRaised] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Meeting Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingPaused, setIsRecordingPaused] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [savedRecordingInfo, setSavedRecordingInfo] = useState<{
    id: string;
    duration: string;
    size: string;
    timestamp: string;
    url: string;
  } | null>(null);

  // Breakout Rooms State
  interface BreakoutRoom {
    id: string;
    name: string;
    topic: string;
    participants: { id: string; name: string; avatar_url: string; role: string }[];
    timeLeftSeconds: number;
  }

  const [breakoutRooms, setBreakoutRooms] = useState<BreakoutRoom[]>([
    {
      id: 'br_1',
      name: 'Breakout 1: Advanced SQL & Database RLS',
      topic: 'Optimizing Supabase queries, connection pools, and PostgreSQL security policies',
      participants: [
        { id: 'p_1', name: 'Sophia Zhang', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', role: 'student' },
        { id: 'p_2', name: 'Liam Patel', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', role: 'student' },
        { id: 'p_3', name: 'Marcus Vance', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', role: 'student' },
      ],
      timeLeftSeconds: 840,
    },
    {
      id: 'br_2',
      name: 'Breakout 2: Next.js 15 Server Actions & WebSockets',
      topic: 'Live streaming state updates and sub-50ms SSR latency',
      participants: [
        { id: 'p_4', name: 'Amara Okafor', avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80', role: 'student' },
        { id: 'p_5', name: 'Alex Rivera', avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80', role: 'student' },
      ],
      timeLeftSeconds: 840,
    },
    {
      id: 'br_3',
      name: 'Breakout 3: Collaborative Code Debugging',
      topic: 'Pair programming on the compiler sandbox & AST parsing',
      participants: [
        { id: 'p_6', name: 'Chloe Kim', avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80', role: 'student' },
        { id: 'p_7', name: 'David Miller', avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80', role: 'student' },
      ],
      timeLeftSeconds: 840,
    },
  ]);

  const [activeBreakoutRoomId, setActiveBreakoutRoomId] = useState<string | null>(null);
  const [showBreakoutModal, setShowBreakoutModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastAlert, setBroadcastAlert] = useState<string | null>(null);

  // Screen Annotation Pens & Laser State
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [annotationTool, setAnnotationTool] = useState<'pen' | 'highlighter' | 'laser' | 'eraser'>('pen');
  const [annotationColor, setAnnotationColor] = useState('#06b6d4');
  const [annotationSize, setAnnotationSize] = useState(4);
  const annotationCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnnotationDrawing, setIsAnnotationDrawing] = useState(false);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number } | null>(null);

  // Screen share stream & stage refs
  const screenStreamRef = useRef<MediaStream | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);

  // Floating reactions state
  const [reactions, setReactions] = useState<{ id: number; emoji: string; left: number }[]>([]);

  // Right sidebar state: 'chat' | 'participants' | 'qa'
  const [sidebarTab, setSidebarTab] = useState<'chat' | 'participants' | 'qa'>('chat');

  // Chat messages
  const [messages, setMessages] = useState<LiveChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Participants
  const [participants, setParticipants] = useState<LiveParticipant[]>([]);

  // Q&A list
  const [qaList, setQaList] = useState<{ id: string; student: string; question: string; upvotes: number; answered: boolean }[]>([
    {
      id: 'qa_1',
      student: 'Sophia Zhang',
      question: 'How do we handle connection pooling when 10,000 students query Supabase simultaneously?',
      upvotes: 6,
      answered: true,
    },
    {
      id: 'qa_2',
      student: 'Liam Patel',
      question: 'Can RLS policies access custom session claims stored in JWT cookies?',
      upvotes: 4,
      answered: false,
    },
  ]);
  const [qaInput, setQaInput] = useState('');

  // Whiteboard Canvas ref and states
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#8b5cf6');
  const [penSize, setPenSize] = useState(3);

  // Shared Code Editor state
  const [codeContent, setCodeContent] = useState(`// Real-time Architecture Demonstration
// Collaborative Code Editor between Instructor & Students

import { createClient } from '@supabase/supabase-js';

export async function fetchEnrolledCourses(studentId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Postgres RLS automatically filters rows where auth.uid() = studentId
  const { data, error } = await supabase
    .from('enrollments')
    .select('id, course:courses(*)')
    .eq('user_id', studentId);

  if (error) throw error;
  return data;
}`);
  const [codeLanguage, setCodeLanguage] = useState('TypeScript');
  const [runOutput, setRunOutput] = useState<string | null>(null);

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);

    const foundRoom = LocalDataService.getLiveRoomById(roomId);
    if (foundRoom) {
      setRoom(foundRoom);
    } else {
      // Fallback virtual room
      setRoom({
        id: roomId,
        title: 'Interactive Engineering Office Hours',
        description: 'Live virtual classroom connecting instructors and students.',
        instructor_id: 'usr_instructor_001',
        instructor_name: 'Dr. Elena Chen',
        instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        is_active: true,
        scheduled_time: 'Live Right Now',
        participant_count: 5,
        tags: ['Live Room', 'Office Hours'],
        created_at: new Date().toISOString(),
      });
    }

    setParticipants(LocalDataService.getRoomParticipants(roomId));
    setMessages(LocalDataService.getRoomMessages(roomId));
  }, [roomId]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Whiteboard Canvas Init
  useEffect(() => {
    if (activeStage === 'whiteboard' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penSize;
      }
    }
  }, [activeStage, penColor, penSize]);

  const triggerReaction = (emoji: string) => {
    const newReaction = {
      id: Date.now() + Math.random(),
      emoji,
      left: 15 + Math.random() * 70, // percent
    };
    setReactions((prev) => [...prev, newReaction]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !currentUser || !room) return;

    const newMsg: LiveChatMessage = {
      id: `msg_${Date.now()}`,
      room_id: room.id,
      sender_id: currentUser.id,
      sender_name: currentUser.full_name || 'Participant',
      sender_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      sender_role: currentUser.role,
      message: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = LocalDataService.sendRoomMessage(room.id, newMsg);
    setMessages([...updated]);
    setChatInput('');
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaInput.trim() || !currentUser) return;
    setQaList((prev) => [
      ...prev,
      {
        id: `qa_${Date.now()}`,
        student: currentUser.full_name || 'Student',
        question: qaInput.trim(),
        upvotes: 1,
        answered: false,
      },
    ]);
    setQaInput('');
  };

  const handleUpvoteQuestion = (id: string) => {
    setQaList((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleRunCode = () => {
    setRunOutput('Compiling module with Bun/Next.js runtime...\n[SUCCESS] TypeScript AST parsed.\n[DB] Query executed successfully via Supabase RLS.\nReturned 3 course records in 2.4ms.');
  };

  // Screen Share Demo Slides Data
  const demoSlides = [
    {
      title: 'ReactJav: High-Performance LMS Architecture',
      subtitle: 'Next.js 15 App Router • Supabase PostgreSQL • WebRTC Real-Time Gateway',
      badge: 'Slide 1 / 3 • Core System Design',
      points: [
        'Edge SSR & Incremental Static Regeneration for sub-50ms page loads',
        'Row-Level Security (RLS) policies protecting quizzes, exams, and enrolled content',
        'Sub-second broadcast channels syncing live chat, reactions, and peer stages',
      ],
      codeSnippet: `// Supabase Real-Time Broadcast Hook
const channel = supabase.channel('room_${roomId}')
  .on('broadcast', { event: 'screen_frame' }, ({ payload }) => {
    renderPeerFrame(payload);
  })
  .subscribe((status) => console.log('Realtime status:', status));`,
    },
    {
      title: 'PostgreSQL RLS Policies & Scalable Connection Pools',
      subtitle: 'Multi-Tenant Security Model with pgvector & Supavisor',
      badge: 'Slide 2 / 3 • Database & Security',
      points: [
        'Automatic student isolation using auth.uid() in PostgreSQL policies',
        'Anti-cheat CBT exam verification with server-side time-check bounds',
        'Resilient database failover with connection pooling supporting 10k+ users',
      ],
      codeSnippet: `CREATE POLICY "Students can only access enrolled courses"
ON lessons FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM enrollments
    WHERE enrollments.course_id = lessons.course_id
      AND enrollments.user_id = auth.uid()
  )
);`,
    },
    {
      title: 'Ultra-Low Latency Screen Sharing & Canvas Collaboration',
      subtitle: 'Hardware-Accelerated DisplayMedia with Dual-Stream Spotlight',
      badge: 'Slide 3 / 3 • Meeting Engine',
      points: [
        'Browser getDisplayMedia API capturing 1080p 60fps windows or whole screens',
        'Adaptive Picture-in-Picture (PiP) floating presenter camera feed',
        'Collaborative vector whiteboard and live runnable code playground',
      ],
      codeSnippet: `// Native Display Media Capture
const displayStream = await navigator.mediaDevices.getDisplayMedia({
  video: { displaySurface: 'monitor', frameRate: { ideal: 60 } },
  audio: false
});
videoElement.srcObject = displayStream;`,
    },
  ];

  // Callback ref to attach screen stream to video element
  const attachScreenStream = (el: HTMLVideoElement | null) => {
    screenVideoRef.current = el;
    if (el && screenStreamRef.current) {
      el.srcObject = screenStreamRef.current;
    }
  };

  // Keep video srcObject updated when screen sharing or switching stages
  useEffect(() => {
    if (isScreenSharing && screenStreamRef.current && screenVideoRef.current) {
      screenVideoRef.current.srcObject = screenStreamRef.current;
    }
  }, [isScreenSharing, activeStage, screenShareSource]);

  // Clean up screen tracks on component unmount
  useEffect(() => {
    return () => {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => {
          try {
            track.stop();
          } catch (e) {
            // ignore
          }
        });
      }
    };
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const sendShareAnnouncement = () => {
    if (room && currentUser) {
      const announceMsg: LiveChatMessage = {
        id: `msg_${Date.now()}`,
        room_id: room.id,
        sender_id: currentUser.id,
        sender_name: currentUser.full_name || 'Presenter',
        sender_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        sender_role: currentUser.role,
        message: `🖥️ ${currentUser.full_name || 'Presenter'} started sharing their screen. Click the "Screen Share" stage to view!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_announcement: true,
      };
      const updated = LocalDataService.sendRoomMessage(room.id, announceMsg);
      setMessages([...updated]);
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          // ignore
        }
      });
      screenStreamRef.current = null;
    }
    if (screenVideoRef.current) {
      screenVideoRef.current.srcObject = null;
    }
    setIsScreenSharing(false);
    if (activeStage === 'screenshare') {
      setActiveStage('video');
    }

    if (room && currentUser) {
      const announceMsg: LiveChatMessage = {
        id: `msg_${Date.now()}`,
        room_id: room.id,
        sender_id: currentUser.id,
        sender_name: currentUser.full_name || 'Presenter',
        sender_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        sender_role: currentUser.role,
        message: '⏹️ Screen share ended. Returned to standard video grid.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_announcement: true,
      };
      const updated = LocalDataService.sendRoomMessage(room.id, announceMsg);
      setMessages([...updated]);
    }
  };

  const startScreenShare = async (forceDemo: boolean = false) => {
    if (forceDemo) {
      setIsScreenSharing(true);
      setScreenShareSource('demo');
      setScreenShareSharer(currentUser?.full_name || 'You');
      setActiveStage('screenshare');
      sendShareAnnouncement();
      return;
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            displaySurface: 'monitor',
            frameRate: { ideal: 30, max: 60 },
          } as MediaTrackConstraints,
          audio: false,
        });

        screenStreamRef.current = stream;
        setIsScreenSharing(true);
        setScreenShareSource('live');
        setScreenShareSharer(currentUser?.full_name || 'You');
        setActiveStage('screenshare');

        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.onended = () => {
            stopScreenShare();
          };
        }

        sendShareAnnouncement();
      } else {
        // Fallback to interactive slide presentation
        setIsScreenSharing(true);
        setScreenShareSource('demo');
        setScreenShareSharer(currentUser?.full_name || 'You');
        setActiveStage('screenshare');
        sendShareAnnouncement();
      }
    } catch (err: any) {
      console.warn('Screen share request:', err);
      if (err?.name === 'NotAllowedError') {
        // User cancelled picker dialog
        return;
      }
      // Any other browser restriction, activate interactive slide deck
      setIsScreenSharing(true);
      setScreenShareSource('demo');
      setScreenShareSharer(currentUser?.full_name || 'You');
      setActiveStage('screenshare');
      sendShareAnnouncement();
    }
  };

  const handleToggleScreenShare = () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      startScreenShare(false);
    }
  };

  const toggleFullscreen = () => {
    if (!stageContainerRef.current) return;
    if (!document.fullscreenElement) {
      stageContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // ==========================================
  // Meeting Recording Simulation Handlers
  // ==========================================
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording && !isRecordingPaused) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isRecordingPaused]);

  const formatRecordingTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startMeetingRecording = () => {
    setIsRecording(true);
    setIsRecordingPaused(false);
    setRecordingSeconds(0);

    if (room && currentUser) {
      const announceMsg: LiveChatMessage = {
        id: `msg_${Date.now()}`,
        room_id: room.id,
        sender_id: currentUser.id,
        sender_name: currentUser.full_name || 'Host',
        sender_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        sender_role: currentUser.role,
        message: '🔴 Cloud meeting recording started by Host.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_announcement: true,
      };
      const updated = LocalDataService.sendRoomMessage(room.id, announceMsg);
      setMessages([...updated]);
    }
  };

  const stopMeetingRecording = () => {
    const durationStr = formatRecordingTime(recordingSeconds);
    const sizeMb = ((recordingSeconds * 0.28) + 8.4).toFixed(1);
    setIsRecording(false);
    setIsRecordingPaused(false);
    setSavedRecordingInfo({
      id: `rec_${Date.now()}`,
      duration: durationStr,
      size: `${sizeMb} MB`,
      timestamp: new Date().toLocaleString(),
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    });
    setShowRecordingModal(true);

    if (room && currentUser) {
      const announceMsg: LiveChatMessage = {
        id: `msg_${Date.now()}`,
        room_id: room.id,
        sender_id: currentUser.id,
        sender_name: currentUser.full_name || 'Host',
        sender_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        sender_role: currentUser.role,
        message: `⏹️ Meeting recording stopped (${durationStr}) and uploaded to Supabase Storage.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_announcement: true,
      };
      const updated = LocalDataService.sendRoomMessage(room.id, announceMsg);
      setMessages([...updated]);
    }
  };

  // ==========================================
  // Breakout Rooms Handlers
  // ==========================================
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeBreakoutRoomId) {
      interval = setInterval(() => {
        setBreakoutRooms((prev) =>
          prev.map((br) =>
            br.id === activeBreakoutRoomId && br.timeLeftSeconds > 0
              ? { ...br, timeLeftSeconds: br.timeLeftSeconds - 1 }
              : br
          )
        );
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeBreakoutRoomId]);

  const formatSecondsToMs = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const joinBreakoutRoom = (brId: string) => {
    setActiveBreakoutRoomId(brId);
    setShowBreakoutModal(false);
    const targetRoom = breakoutRooms.find((r) => r.id === brId);
    if (room && currentUser && targetRoom) {
      const announceMsg: LiveChatMessage = {
        id: `msg_${Date.now()}`,
        room_id: room.id,
        sender_id: currentUser.id,
        sender_name: currentUser.full_name || 'Participant',
        sender_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        sender_role: currentUser.role,
        message: `🚪 Joined ${targetRoom.name}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_announcement: true,
      };
      const updated = LocalDataService.sendRoomMessage(room.id, announceMsg);
      setMessages([...updated]);
    }
  };

  const leaveBreakoutRoom = () => {
    const currentBr = breakoutRooms.find((r) => r.id === activeBreakoutRoomId);
    setActiveBreakoutRoomId(null);
    if (room && currentUser && currentBr) {
      const announceMsg: LiveChatMessage = {
        id: `msg_${Date.now()}`,
        room_id: room.id,
        sender_id: currentUser.id,
        sender_name: currentUser.full_name || 'Participant',
        sender_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        sender_role: currentUser.role,
        message: `🚪 Returned to Main Virtual Classroom from ${currentBr.name}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_announcement: true,
      };
      const updated = LocalDataService.sendRoomMessage(room.id, announceMsg);
      setMessages([...updated]);
    }
  };

  const handleBroadcastMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    const msg = broadcastMessage.trim();
    setBroadcastAlert(msg);
    setBroadcastMessage('');
    setTimeout(() => {
      setBroadcastAlert(null);
    }, 7000);

    if (room && currentUser) {
      const announceMsg: LiveChatMessage = {
        id: `msg_${Date.now()}`,
        room_id: room.id,
        sender_id: currentUser.id,
        sender_name: `${currentUser.full_name || 'Host'} (Host Broadcast)`,
        sender_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        sender_role: 'instructor',
        message: `📢 [BROADCAST TO ALL BREAKOUT ROOMS]: ${msg}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        is_announcement: true,
      };
      const updated = LocalDataService.sendRoomMessage(room.id, announceMsg);
      setMessages([...updated]);
    }
  };

  // ==========================================
  // Screen Annotation Pens & Laser Handlers
  // ==========================================
  useEffect(() => {
    if (isAnnotating && annotationCanvasRef.current) {
      const canvas = annotationCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isAnnotating, annotationTool, annotationColor, annotationSize]);

  const startAnnotationDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isAnnotating) return;
    const canvas = annotationCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (annotationTool === 'laser') {
      setLaserPos({ x, y });
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsAnnotationDrawing(true);
  };

  const drawAnnotation = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isAnnotating) return;
    const canvas = annotationCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (annotationTool === 'laser') {
      setLaserPos({ x, y });
      return;
    }

    if (!isAnnotationDrawing) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (annotationTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = annotationSize * 4;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (annotationTool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = annotationColor;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = annotationSize * 3.5;
      ctx.lineCap = 'square';
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      // Pen
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = annotationColor;
      ctx.globalAlpha = 1.0;
      ctx.lineWidth = annotationSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopAnnotationDrawing = () => {
    setIsAnnotationDrawing(false);
  };

  const clearAnnotationCanvas = () => {
    const canvas = annotationCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  if (!room) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ color: '#ffffff' }}>Connecting to Virtual Room...</h2>
      </div>
    );
  }

  return (
    <div style={{
      height: 'calc(100vh - var(--header-height, 8.75rem))',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-main)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Floating Emoji Particles Layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100, overflow: 'hidden' }}>
        {reactions.map((r) => (
          <div
            key={r.id}
            style={{
              position: 'absolute',
              bottom: '5rem',
              left: `${r.left}%`,
              fontSize: '2.5rem',
              animation: 'floatUp 2.5s ease-out forwards',
            }}
          >
            {r.emoji}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 1; transform: translateY(-30px) scale(1.2); }
          100% { transform: translateY(-400px) scale(1); opacity: 0; }
        }
      `}</style>

      {/* Top Meeting Header */}
      <header style={{
        height: '3.75rem',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-pink)', boxShadow: '0 0 10px var(--accent-pink)' }} />
            <span className="badge" style={{ background: 'rgba(236,72,153,0.15)', color: 'var(--accent-pink)', border: '1px solid rgba(236,72,153,0.3)' }}>
              LIVE ROOM
            </span>
          </div>

          <div>
            <h2 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 1.2 }}>
              {room.title}
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Host: {room.instructor_name} • {participants.length} connected
            </span>
          </div>

          {/* Active Breakout Room Badge if Inside Breakout */}
          {activeBreakoutRoomId && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '0.5rem',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: 'var(--accent-amber)',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              <DoorOpen size={13} />
              <span>{breakoutRooms.find((b) => b.id === activeBreakoutRoomId)?.name.split(':')[0]}</span>
              <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                ({formatSecondsToMs(breakoutRooms.find((b) => b.id === activeBreakoutRoomId)?.timeLeftSeconds || 0)})
              </span>
              <button
                onClick={leaveBreakoutRoom}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  borderRadius: '0.25rem',
                  padding: '0.1rem 0.4rem',
                  fontSize: '0.65rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Return
              </button>
            </div>
          )}
        </div>

        {/* Center: Stage Switcher Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-surface)',
          padding: '0.25rem',
          borderRadius: '0.65rem',
          border: '1px solid var(--border-subtle)',
        }}>
          <button
            onClick={() => setActiveStage('video')}
            className="btn btn-sm"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              background: activeStage === 'video' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeStage === 'video' ? 'var(--primary)' : 'var(--text-muted)',
              border: activeStage === 'video' ? '1px solid var(--border-accent)' : 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
            }}
          >
            <LayoutGrid size={14} />
            <span>Video Grid</span>
          </button>

          <button
            onClick={() => setActiveStage('whiteboard')}
            className="btn btn-sm"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              background: activeStage === 'whiteboard' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeStage === 'whiteboard' ? 'var(--accent-purple)' : 'var(--text-muted)',
              border: activeStage === 'whiteboard' ? '1px solid var(--border-accent)' : 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
            }}
          >
            <PenTool size={14} />
            <span>Whiteboard</span>
          </button>

          <button
            onClick={() => setActiveStage('code')}
            className="btn btn-sm"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              background: activeStage === 'code' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeStage === 'code' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              border: activeStage === 'code' ? '1px solid var(--border-accent)' : 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
            }}
          >
            <Code2 size={14} />
            <span>Shared Code</span>
          </button>

          <button
            onClick={() => {
              setActiveStage('screenshare');
              if (!isScreenSharing && !screenStreamRef.current) {
                setScreenShareSource('demo');
                setIsScreenSharing(true);
              }
            }}
            className="btn btn-sm"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8rem',
              background: activeStage === 'screenshare' ? 'var(--bg-surface-elevated)' : 'transparent',
              color: activeStage === 'screenshare' ? '#38bdf8' : isScreenSharing ? '#38bdf8' : 'var(--text-muted)',
              border: activeStage === 'screenshare' ? '1px solid #38bdf8' : 'none',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <ScreenShare size={14} />
            <span>Screen Share</span>
            {isScreenSharing && (
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#38bdf8',
                boxShadow: '0 0 8px #38bdf8',
              }} />
            )}
          </button>
        </div>

        {/* Right Header Actions: Recording, Breakouts & Leave */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Recording Status / Trigger */}
          {isRecording ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              padding: '0.25rem 0.6rem',
              borderRadius: '0.5rem',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 8px #ef4444',
                animation: isRecordingPaused ? 'none' : 'pulse 1s infinite',
              }} />
              <span style={{ fontSize: '0.75rem', color: '#fca5a5', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                REC {formatRecordingTime(recordingSeconds)}
              </span>
              <button
                onClick={() => setIsRecordingPaused(!isRecordingPaused)}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', padding: 0 }}
                title={isRecordingPaused ? 'Resume Recording' : 'Pause Recording'}
              >
                {isRecordingPaused ? <Play size={12} fill="#ffffff" /> : <Pause size={12} fill="#ffffff" />}
              </button>
              <button
                onClick={stopMeetingRecording}
                style={{
                  background: '#ef4444',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '0.25rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                title="Stop and Save Recording"
              >
                STOP
              </button>
            </div>
          ) : (
            <button
              onClick={startMeetingRecording}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              title="Record Meeting Session"
            >
              <Disc size={14} color="#ef4444" />
              <span>Record</span>
            </button>
          )}

          {/* Breakout Rooms Button */}
          <button
            onClick={() => setShowBreakoutModal(true)}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            title="Manage Breakout Sessions"
          >
            <DoorOpen size={14} color="var(--accent-amber)" />
            <span>Breakouts</span>
          </button>

          {/* Leave Session */}
          <Link
            href="/live"
            className="btn btn-sm"
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.4)',
            }}
          >
            <PhoneOff size={14} />
            <span>Leave</span>
          </Link>
        </div>
      </header>

      {/* Host Broadcast Banner Alert if Active */}
      {broadcastAlert && (
        <div style={{
          background: 'linear-gradient(90deg, #f59e0b, #d97706)',
          color: '#ffffff',
          padding: '0.5rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          fontWeight: 600,
          boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
          zIndex: 60,
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Radio size={16} />
            <span><strong>HOST ANNOUNCEMENT TO ALL ROOMS:</strong> {broadcastAlert}</span>
          </div>
          <button
            onClick={() => setBroadcastAlert(null)}
            style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Workspace Body */}
      <div style={{
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 360px',
        overflow: 'hidden',
      }}>
        {/* Left / Center Stage Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
          background: '#0a0d14',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Active Stage View */}
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* View 1: Video Grid Mode */}
            {activeStage === 'video' && (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '1rem',
                position: 'relative',
              }}>
                {/* Screen Share Active Alert Banner */}
                {isScreenSharing && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    right: '1rem',
                    zIndex: 25,
                    padding: '0.65rem 1.25rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(2, 132, 199, 0.92)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #38bdf8',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        animation: 'pulse 1.5s infinite',
                      }} />
                      <ScreenShare size={17} color="#ffffff" />
                      <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
                        {screenShareSharer} is sharing their screen
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveStage('screenshare')}
                      className="btn btn-sm"
                      style={{
                        background: '#ffffff',
                        color: '#0284c7',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        padding: '0.3rem 0.85rem',
                        borderRadius: '0.4rem',
                      }}
                    >
                      View Screen Share Stage
                    </button>
                  </div>
                )}
                {/* Main Spotlight Video: Instructor */}
                <div style={{
                  position: 'relative',
                  background: '#000000',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '2px solid rgba(236, 72, 153, 0.4)',
                  boxShadow: '0 0 30px rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <video
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    autoPlay
                    loop
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Instructor Spotlight Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>
                      Dr. Elena Chen (Host • Speaking)
                    </span>
                  </div>

                  {/* Presentation Slide / Live Camera Sub-badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '0.4rem',
                    fontSize: '0.75rem',
                    color: '#c7d2fe',
                  }}>
                    Live Stream: Architecture Diagramming & Code Review
                  </div>
                </div>

                {/* Secondary Student Tiles Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateRows: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                }}>
                  {participants.slice(1).map((p) => (
                    <div
                      key={p.id}
                      style={{
                        position: 'relative',
                        background: 'var(--bg-surface)',
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                        border: p.has_hand_raised ? '2px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={p.avatar_url}
                        alt={p.name}
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid rgba(255,255,255,0.1)',
                        }}
                      />

                      <div style={{
                        position: 'absolute',
                        bottom: '0.5rem',
                        left: '0.5rem',
                        right: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '0.35rem',
                        fontSize: '0.75rem',
                        color: '#ffffff',
                      }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {p.name}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          {p.has_hand_raised && <Hand size={12} color="var(--accent-amber)" />}
                          {p.is_muted ? <MicOff size={12} color="var(--accent-rose)" /> : <Mic size={12} color="var(--accent-emerald)" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 2: Collaborative Whiteboard */}
            {activeStage === 'whiteboard' && (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-surface)',
                borderRadius: '1rem',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
              }}>
                {/* Whiteboard Toolbar */}
                <div style={{
                  padding: '0.75rem 1.25rem',
                  background: 'var(--bg-surface-elevated)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Collaborative Whiteboard
                    </span>

                    {/* Color Palette */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {['#4f46e5', '#059669', '#d97706', '#0284c7', '#db2777', '#0f172a'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setPenColor(color)}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: color,
                            border: penColor === color ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </div>

                    {/* Line Width */}
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={penSize}
                      onChange={(e) => setPenSize(parseInt(e.target.value))}
                      style={{ width: '70px', accentColor: 'var(--primary)' }}
                      title="Pen Width"
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <button
                      onClick={clearCanvas}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                    >
                      <RotateCcw size={13} />
                      <span>Clear Canvas</span>
                    </button>
                  </div>
                </div>

                {/* Drawing Area */}
                <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
                  <canvas
                    ref={canvasRef}
                    width={900}
                    height={550}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{
                      width: '100%',
                      height: '100%',
                      cursor: 'crosshair',
                      background: 'radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>
              </div>
            )}

            {/* View 3: Shared Code Editor & Playground */}
            {activeStage === 'code' && (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: '#0d121f',
                borderRadius: '1rem',
                border: '1px solid var(--border-accent)',
                overflow: 'hidden',
              }}>
                {/* Code Toolbar */}
                <div style={{
                  padding: '0.75rem 1.25rem',
                  background: 'var(--bg-surface-elevated)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Code2 size={18} color="var(--accent-cyan)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Shared Live Code Workspace
                    </span>
                    <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                      {codeLanguage}
                    </span>
                  </div>

                  <button
                    onClick={handleRunCode}
                    className="btn btn-primary btn-sm"
                    style={{ background: 'var(--grad-emerald)' }}
                  >
                    <span>Execute Code Snippet</span>
                  </button>
                </div>

                {/* Code Textarea */}
                <div style={{ flexGrow: 1, display: 'grid', gridTemplateRows: '1fr auto', overflow: 'hidden' }}>
                  <textarea
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#a5b4fc',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      padding: '1.25rem',
                      lineHeight: 1.6,
                      resize: 'none',
                    }}
                  />

                  {runOutput && (
                    <div style={{
                      background: 'rgba(0,0,0,0.5)',
                      borderTop: '1px solid var(--border-subtle)',
                      padding: '1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: '#6ee7b7',
                      whiteSpace: 'pre-line',
                    }}>
                      {runOutput}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* View 4: Screen Share Stage */}
            {activeStage === 'screenshare' && (
              <div
                ref={stageContainerRef}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#04070d',
                  borderRadius: '1rem',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  boxShadow: '0 0 40px rgba(6, 182, 212, 0.15)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Stage Top Bar Overlay */}
                <div style={{
                  padding: '0.65rem 1.25rem',
                  background: 'rgba(10, 15, 26, 0.95)',
                  backdropFilter: 'blur(12px)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 20,
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}>
                  {/* Left: Stream Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#06b6d4',
                        boxShadow: '0 0 10px #06b6d4',
                        animation: 'pulse 1.5s infinite',
                      }} />
                      <span className="badge badge-cyan" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                        {screenShareSource === 'live' ? 'LIVE SCREEN CAPTURE' : 'PRESENTATION SLIDES'}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
                      {screenShareSharer}&apos;s Screen
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      • 1080p 60fps
                    </span>
                  </div>

                  {/* Center: Source Switcher */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.2rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <button
                      onClick={() => {
                        if (!screenStreamRef.current) {
                          startScreenShare(false);
                        } else {
                          setScreenShareSource('live');
                        }
                      }}
                      style={{
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.75rem',
                        borderRadius: '0.35rem',
                        background: screenShareSource === 'live' ? 'var(--bg-surface-elevated)' : 'transparent',
                        color: screenShareSource === 'live' ? '#38bdf8' : 'var(--text-muted)',
                        border: screenShareSource === 'live' ? '1px solid #38bdf8' : 'none',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Monitor size={13} />
                      <span>Live Display</span>
                    </button>

                    <button
                      onClick={() => setScreenShareSource('demo')}
                      style={{
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.75rem',
                        borderRadius: '0.35rem',
                        background: screenShareSource === 'demo' ? 'var(--bg-surface-elevated)' : 'transparent',
                        color: screenShareSource === 'demo' ? '#a5b4fc' : 'var(--text-muted)',
                        border: screenShareSource === 'demo' ? '1px solid var(--accent-indigo)' : 'none',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Sparkles size={13} />
                      <span>Slide Deck</span>
                    </button>
                  </div>

                  {/* Right: Controls (Annotate, Fullscreen & Stop) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => setIsAnnotating(!isAnnotating)}
                      className={`btn btn-sm ${isAnnotating ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        padding: '0.3rem 0.75rem',
                        fontSize: '0.75rem',
                        background: isAnnotating ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)' : undefined,
                        borderColor: isAnnotating ? '#a855f7' : undefined,
                        boxShadow: isAnnotating ? '0 0 14px rgba(168, 85, 247, 0.45)' : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                      title={isAnnotating ? 'Close Screen Annotation' : 'Annotate on Screen with Pens & Laser'}
                    >
                      <PenTool size={13} />
                      <span>{isAnnotating ? 'Close Pens' : 'Annotate'}</span>
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                      title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Stage'}
                    >
                      {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                      <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
                    </button>

                    <button
                      onClick={stopScreenShare}
                      className="btn btn-sm"
                      style={{
                        padding: '0.3rem 0.75rem',
                        fontSize: '0.75rem',
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#f87171',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                      }}
                    >
                      <ScreenShareOff size={13} />
                      <span>Stop Sharing</span>
                    </button>
                  </div>
                </div>

                {/* Stage Screen Body */}
                <div style={{
                  flexGrow: 1,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#000000',
                  overflow: 'hidden',
                }}>
                  {/* If LIVE Stream is selected */}
                  {screenShareSource === 'live' && (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <video
                        ref={attachScreenStream}
                        autoPlay
                        playsInline
                        muted
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          display: screenStreamRef.current ? 'block' : 'none',
                        }}
                      />

                      {!screenStreamRef.current && (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                          <Monitor size={48} color="var(--accent-cyan)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                          <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>No Screen Currently Captured</h3>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                            Select an application window, browser tab, or entire display to share with everyone in the room.
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                            <button
                              onClick={() => startScreenShare(false)}
                              className="btn btn-primary btn-sm"
                              style={{ background: 'var(--grad-cyan)' }}
                            >
                              <ScreenShare size={15} />
                              <span>Choose Screen to Share</span>
                            </button>
                            <button
                              onClick={() => setScreenShareSource('demo')}
                              className="btn btn-secondary btn-sm"
                            >
                              <Sparkles size={15} />
                              <span>View Slide Deck</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* If DEMO Presentation Slides are selected */}
                  {screenShareSource === 'demo' && (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: 'radial-gradient(ellipse at center, #0f172a 0%, #030712 100%)',
                      position: 'relative',
                    }}>
                      {/* Slide Header */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                          <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
                            {demoSlides[demoSlideIndex].badge}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Presenter: {screenShareSharer} & Instructors
                          </span>
                        </div>
                        <h2 style={{ fontSize: '1.75rem', color: '#ffffff', fontWeight: 800, marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                          {demoSlides[demoSlideIndex].title}
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                          {demoSlides[demoSlideIndex].subtitle}
                        </p>
                      </div>

                      {/* Slide Content Grid: Points & Live Code Box */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1fr',
                        gap: '1.5rem',
                        margin: '1.5rem 0',
                        alignItems: 'center',
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                          {demoSlides[demoSlideIndex].points.map((pt, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                padding: '0.85rem 1rem',
                                borderRadius: '0.65rem',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                              }}
                            >
                              <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: 'rgba(6, 182, 212, 0.15)',
                                color: '#38bdf8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                flexShrink: 0,
                              }}>
                                {idx + 1}
                              </div>
                              <span style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                                {pt}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Code Highlight Box */}
                        <div style={{
                          background: '#070a12',
                          borderRadius: '0.75rem',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            padding: '0.5rem 1rem',
                            background: 'rgba(255,255,255,0.04)',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                              architecture.ts
                            </span>
                          </div>
                          <pre style={{
                            padding: '1rem',
                            margin: 0,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            color: '#67e8f9',
                            overflowX: 'auto',
                            lineHeight: 1.5,
                          }}>
                            <code>{demoSlides[demoSlideIndex].codeSnippet}</code>
                          </pre>
                        </div>
                      </div>

                      {/* Slide Footer: Navigation Prev / Next */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        paddingTop: '1rem',
                      }}>
                        <button
                          onClick={() => setDemoSlideIndex((prev) => (prev > 0 ? prev - 1 : demoSlides.length - 1))}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          <ChevronLeft size={14} />
                          <span>Previous Slide</span>
                        </button>

                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          {demoSlides.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setDemoSlideIndex(i)}
                              style={{
                                width: '28px',
                                height: '8px',
                                borderRadius: '4px',
                                background: demoSlideIndex === i ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => setDemoSlideIndex((prev) => (prev < demoSlides.length - 1 ? prev + 1 : 0))}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          <span>Next Slide</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Floating Picture-in-Picture (PiP) Presenter Camera Tile */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    width: '190px',
                    height: '120px',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    background: '#090d16',
                    border: '2px solid rgba(56, 189, 248, 0.4)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
                    zIndex: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    {isCameraOn ? (
                      <video
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        autoPlay
                        loop
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                      />
                    ) : (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#111827',
                      }}>
                        <img
                          src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                          alt="Presenter"
                          style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      </div>
                    )}

                    {/* Top PiP overlay */}
                    <div style={{
                      position: 'relative',
                      padding: '0.35rem 0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
                      zIndex: 2,
                    }}>
                      <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: 700 }}>
                        SPEAKER PiP
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                      </div>
                    </div>

                    {/* Bottom PiP overlay */}
                    <div style={{
                      position: 'relative',
                      padding: '0.35rem 0.5rem',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      zIndex: 2,
                    }}>
                      <span style={{ fontSize: '0.7rem', color: '#ffffff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {room.instructor_name}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        {isMicMuted ? <MicOff size={11} color="var(--accent-rose)" /> : <Mic size={11} color="var(--accent-emerald)" />}
                      </div>
                    </div>

                    {/* Screen Annotation Canvas Layer */}
                    <canvas
                      ref={annotationCanvasRef}
                      width={1280}
                      height={720}
                      onMouseDown={startAnnotationDrawing}
                      onMouseMove={drawAnnotation}
                      onMouseUp={stopAnnotationDrawing}
                      onMouseLeave={stopAnnotationDrawing}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 25,
                        cursor: isAnnotating
                          ? annotationTool === 'laser'
                            ? 'crosshair'
                            : 'crosshair'
                          : 'default',
                        pointerEvents: isAnnotating ? 'auto' : 'none',
                      }}
                    />

                    {/* Laser Pointer Indicator */}
                    {isAnnotating && annotationTool === 'laser' && laserPos && (
                      <div
                        style={{
                          position: 'absolute',
                          left: laserPos.x - 7,
                          top: laserPos.y - 7,
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: '#ef4444',
                          boxShadow: '0 0 16px 4px #ef4444, 0 0 4px #ffffff',
                          pointerEvents: 'none',
                          zIndex: 35,
                          transition: 'opacity 0.2s ease',
                        }}
                      />
                    )}

                    {/* Floating Screen Annotation Palette Toolbar */}
                    {isAnnotating && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '1.25rem',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'rgba(13, 18, 30, 0.95)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(139, 92, 246, 0.4)',
                          boxShadow: '0 10px 35px rgba(0, 0, 0, 0.7)',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '9999px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                          zIndex: 40,
                          animation: 'fadeIn 0.2s ease',
                        }}
                      >
                        {/* Tools Selector */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <button
                            onClick={() => setAnnotationTool('pen')}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '9999px',
                              background: annotationTool === 'pen' ? '#8b5cf6' : 'transparent',
                              color: annotationTool === 'pen' ? '#ffffff' : 'var(--text-muted)',
                              border: 'none',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                            }}
                          >
                            <PenTool size={13} />
                            <span>Pen</span>
                          </button>

                          <button
                            onClick={() => setAnnotationTool('highlighter')}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '9999px',
                              background: annotationTool === 'highlighter' ? '#f59e0b' : 'transparent',
                              color: annotationTool === 'highlighter' ? '#ffffff' : 'var(--text-muted)',
                              border: 'none',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                            }}
                          >
                            <Sparkles size={13} />
                            <span>Highlight</span>
                          </button>

                          <button
                            onClick={() => setAnnotationTool('laser')}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '9999px',
                              background: annotationTool === 'laser' ? '#ef4444' : 'transparent',
                              color: annotationTool === 'laser' ? '#ffffff' : 'var(--text-muted)',
                              border: 'none',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                            }}
                          >
                            <Radio size={13} />
                            <span>Laser</span>
                          </button>

                          <button
                            onClick={() => setAnnotationTool('eraser')}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '9999px',
                              background: annotationTool === 'eraser' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                              color: annotationTool === 'eraser' ? '#ffffff' : 'var(--text-muted)',
                              border: 'none',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                            }}
                          >
                            <Trash size={13} />
                            <span>Eraser</span>
                          </button>
                        </div>

                        {/* Color Picker (for Pen & Highlighter) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '0.65rem' }}>
                          {['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ffffff'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setAnnotationColor(color)}
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: color,
                                border: annotationColor === color ? '2px solid #ffffff' : '1px solid transparent',
                                cursor: 'pointer',
                                padding: 0,
                              }}
                            />
                          ))}
                        </div>

                        {/* Stroke Size */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '0.65rem' }}>
                          {[2, 5, 10].map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setAnnotationSize(sz)}
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: annotationSize === sz ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                border: 'none',
                                color: annotationSize === sz ? '#ffffff' : 'var(--text-muted)',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>

                        {/* Actions: Clear & Close */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '0.65rem' }}>
                          <button
                            onClick={clearAnnotationCanvas}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-muted)',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                            }}
                            title="Clear All Annotations"
                          >
                            <RotateCcw size={12} />
                            <span>Clear</span>
                          </button>

                          <button
                            onClick={() => setIsAnnotating(false)}
                            style={{
                              background: '#8b5cf6',
                              border: 'none',
                              color: '#ffffff',
                              borderRadius: '9999px',
                              padding: '0.2rem 0.6rem',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                            }}
                          >
                            <Check size={12} />
                            <span>Done</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Meeting Control Dock */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'rgba(17, 23, 38, 0.95)',
            borderRadius: '1rem',
            border: '1px solid var(--border-subtle)',
            marginTop: '1rem',
            flexWrap: 'wrap',
          }}>
            {/* Mic Toggle */}
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`btn btn-sm ${isMicMuted ? 'btn-secondary' : 'btn-primary'}`}
              style={{
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                background: isMicMuted ? 'rgba(239, 68, 68, 0.2)' : undefined,
                color: isMicMuted ? '#f87171' : undefined,
                borderColor: isMicMuted ? 'rgba(239, 68, 68, 0.4)' : undefined,
              }}
            >
              {isMicMuted ? <MicOff size={16} /> : <Mic size={16} />}
              <span>{isMicMuted ? 'Unmute' : 'Mute'}</span>
            </button>

            {/* Camera Toggle */}
            <button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`btn btn-sm ${!isCameraOn ? 'btn-secondary' : 'btn-secondary'}`}
              style={{
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                background: !isCameraOn ? 'rgba(239, 68, 68, 0.2)' : undefined,
                color: !isCameraOn ? '#f87171' : undefined,
                borderColor: !isCameraOn ? 'rgba(239, 68, 68, 0.4)' : undefined,
              }}
            >
              {isCameraOn ? <Video size={16} /> : <VideoOff size={16} />}
              <span>{isCameraOn ? 'Camera On' : 'Camera Off'}</span>
            </button>

            {/* Screen Share Toggle */}
            <button
              onClick={handleToggleScreenShare}
              className={`btn btn-sm ${isScreenSharing ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: '9999px',
                padding: '0.5rem 1.15rem',
                background: isScreenSharing
                  ? 'linear-gradient(135deg, #0284c7, #2563eb)'
                  : 'var(--bg-surface-elevated)',
                color: isScreenSharing ? '#ffffff' : 'var(--text-primary)',
                border: isScreenSharing ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                boxShadow: isScreenSharing
                  ? '0 0 18px rgba(56, 189, 248, 0.45)'
                  : undefined,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title={isScreenSharing ? 'Stop sharing screen' : 'Share your screen with the room'}
            >
              {isScreenSharing ? <ScreenShareOff size={16} /> : <ScreenShare size={16} />}
              <span>{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</span>
              {isScreenSharing && (
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 0 8px #ffffff',
                  animation: 'pulse 1.5s infinite',
                }} />
              )}
            </button>

            {/* Breakout Rooms Button */}
            <button
              onClick={() => setShowBreakoutModal(true)}
              className="btn btn-secondary btn-sm"
              style={{
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                background: activeBreakoutRoomId ? 'rgba(245, 158, 11, 0.25)' : undefined,
                color: activeBreakoutRoomId ? '#fcd34d' : undefined,
                borderColor: activeBreakoutRoomId ? 'var(--accent-amber)' : undefined,
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
              title="Breakout Rooms Manager"
            >
              <DoorOpen size={16} />
              <span>{activeBreakoutRoomId ? 'In Breakout' : 'Breakouts'}</span>
            </button>

            {/* Record Meeting Button */}
            <button
              onClick={isRecording ? stopMeetingRecording : startMeetingRecording}
              className={`btn btn-sm ${isRecording ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                background: isRecording ? 'rgba(239, 68, 68, 0.25)' : undefined,
                color: isRecording ? '#fca5a5' : undefined,
                borderColor: isRecording ? '#ef4444' : undefined,
                boxShadow: isRecording ? '0 0 14px rgba(239, 68, 68, 0.4)' : undefined,
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
              title={isRecording ? 'Stop Recording' : 'Start Recording'}
            >
              <Disc size={16} color={isRecording ? '#ef4444' : undefined} />
              <span>{isRecording ? `REC ${formatRecordingTime(recordingSeconds)}` : 'Record'}</span>
            </button>

            {/* Raise Hand Toggle */}
            <button
              onClick={() => {
                setHasHandRaised(!hasHandRaised);
                triggerReaction('✋');
              }}
              className="btn btn-secondary btn-sm"
              style={{
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                background: hasHandRaised ? 'rgba(245, 158, 11, 0.25)' : undefined,
                color: hasHandRaised ? '#fcd34d' : undefined,
                borderColor: hasHandRaised ? 'var(--accent-amber)' : undefined,
              }}
            >
              <Hand size={16} />
              <span>{hasHandRaised ? 'Lower Hand' : 'Raise Hand'}</span>
            </button>

            {/* Quick Emoji Reactions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--bg-surface)',
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
            }}>
              {['👏', '🚀', '❤️', '💡', '🔥'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => triggerReaction(emoji)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.15rem',
                    cursor: 'pointer',
                    padding: '0.2rem 0.35rem',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Chat, Participants, Q&A */}
        <aside style={{
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}>
          {/* Sidebar Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-elevated)',
          }}>
            <button
              onClick={() => setSidebarTab('chat')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                background: 'none',
                border: 'none',
                borderBottom: sidebarTab === 'chat' ? '2px solid var(--primary)' : '2px solid transparent',
                color: sidebarTab === 'chat' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
              }}
            >
              <MessageSquare size={14} />
              <span>Chat</span>
            </button>

            <button
              onClick={() => setSidebarTab('participants')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                background: 'none',
                border: 'none',
                borderBottom: sidebarTab === 'participants' ? '2px solid var(--primary)' : '2px solid transparent',
                color: sidebarTab === 'participants' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
              }}
            >
              <Users size={14} />
              <span>People ({participants.length})</span>
            </button>

            <button
              onClick={() => setSidebarTab('qa')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                background: 'none',
                border: 'none',
                borderBottom: sidebarTab === 'qa' ? '2px solid var(--primary)' : '2px solid transparent',
                color: sidebarTab === 'qa' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
              }}
            >
              <HelpCircle size={14} />
              <span>Q&A</span>
            </button>
          </div>

          {/* Tab 1: Live Chat */}
          {sidebarTab === 'chat' && (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: 'calc(100% - 3rem)' }}>
              {/* Message History */}
              <div style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.875rem',
              }}>
                {messages.map((m) => {
                  const isInstructor = m.sender_role === 'instructor';
                  return (
                    <div
                      key={m.id}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '0.65rem',
                        background: m.is_announcement ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
                        border: m.is_announcement ? '1px solid var(--border-accent)' : '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <img
                            src={m.sender_avatar}
                            alt={m.sender_name}
                            style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isInstructor ? '#6ee7b7' : '#ffffff' }}>
                            {m.sender_name}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.timestamp}</span>
                      </div>

                      <p style={{ fontSize: '0.825rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                        {m.message}
                      </p>
                    </div>
                  );
                })}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleSendMessage}
                style={{
                  padding: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface-elevated)',
                  display: 'flex',
                  gap: '0.5rem',
                }}
              >
                <input
                  type="text"
                  placeholder="Send message to room..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.825rem', padding: '0.5rem 0.75rem' }}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="btn btn-primary btn-sm"
                  style={{ padding: '0.5rem' }}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Participants List */}
          {sidebarTab === 'participants' && (
            <div style={{ flexGrow: 1, padding: '1rem', overflowY: 'auto' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>
                Active Session Attendees
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {participants.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.75rem',
                      borderRadius: '0.5rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img
                        src={p.avatar_url}
                        alt={p.name}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#ffffff', display: 'block' }}>
                          {p.name}
                        </span>
                        <span className={`badge ${p.role === 'instructor' ? 'badge-emerald' : 'badge-primary'}`} style={{ fontSize: '0.6rem', padding: '0.05rem 0.35rem' }}>
                          {p.role}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {p.has_hand_raised && <Hand size={14} color="var(--accent-amber)" />}
                      {p.is_muted ? <MicOff size={14} color="var(--accent-rose)" /> : <Mic size={14} color="var(--accent-emerald)" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Live Q&A Queue */}
          {sidebarTab === 'qa' && (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: 'calc(100% - 3rem)', padding: '1rem' }}>
              <form onSubmit={handleAddQuestion} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={qaInput}
                  onChange={(e) => setQaInput(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.825rem', padding: '0.5rem 0.75rem' }}
                />
                <button type="submit" disabled={!qaInput.trim()} className="btn btn-primary btn-sm">
                  Post
                </button>
              </form>

              <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {qaList.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.65rem',
                      background: q.answered ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface-elevated)',
                      border: q.answered ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.student}</span>
                      {q.answered && (
                        <span className="badge badge-emerald" style={{ fontSize: '0.6rem' }}>
                          Answered Live
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.825rem', color: '#ffffff', marginBottom: '0.6rem' }}>
                      {q.question}
                    </p>
                    <button
                      onClick={() => handleUpvoteQuestion(q.id)}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                    >
                      <ThumbsUp size={12} />
                      <span>{q.upvotes} Upvotes</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Modal 1: Recording Saved Dialog */}
      {showRecordingModal && savedRecordingInfo && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem',
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '1.25rem',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(239, 68, 68, 0.2)',
            maxWidth: '520px',
            width: '100%',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(0, 0, 0, 0.4))',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Disc size={18} color="#ef4444" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 700 }}>
                    Session Recording Ready
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#fca5a5' }}>
                    Uploaded & Verified • Cloud Archive
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowRecordingModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Your virtual classroom session has been processed into a high-definition 1080p MP4 archive with synchronized audio and screen capture.
              </p>

              <div style={{
                background: 'var(--bg-surface-elevated)',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-subtle)',
                padding: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>RECORDING LENGTH</span>
                  <span style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>{savedRecordingInfo.duration}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>FILE SIZE</span>
                  <span style={{ fontSize: '1rem', color: '#6ee7b7', fontWeight: 700 }}>{savedRecordingInfo.size}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>RESOLUTION</span>
                  <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>1080p 60fps WebM / MP4</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>STORAGE LOCATION</span>
                  <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>Supabase Storage</span>
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                wordBreak: 'break-all',
                marginBottom: '1.5rem',
              }}>
                supabase-storage://virtual-rooms/recordings/{room.id}-{Date.now().toString().slice(-6)}.mp4
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowRecordingModal(false)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Close
                </button>
                <a
                  href={savedRecordingInfo.url}
                  download={`ReactJav-Session-${room.id}.mp4`}
                  className="btn btn-primary"
                  style={{ background: 'var(--grad-primary)', fontSize: '0.85rem' }}
                  onClick={() => setShowRecordingModal(false)}
                >
                  <Download size={15} />
                  <span>Download Recording</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Breakout Rooms Manager */}
      {showBreakoutModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem',
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-accent)',
            borderRadius: '1.25rem',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.2)',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'var(--bg-surface-elevated)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <DoorOpen size={18} color="var(--accent-amber)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 700 }}>
                    Breakout Sessions Manager
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Small group peer collaboration & instructor office hours
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowBreakoutModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Broadcast Form (Instructor Broadcast to All Rooms) */}
            <div style={{
              padding: '1rem 1.5rem',
              background: 'rgba(245, 158, 11, 0.08)',
              borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
            }}>
              <span style={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                BROADCAST ANNOUNCEMENT TO ALL BREAKOUT SESSIONS
              </span>
              <form onSubmit={handleBroadcastMessage} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Type an announcement to broadcast across all breakout groups..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem', flexGrow: 1 }}
                />
                <button
                  type="submit"
                  disabled={!broadcastMessage.trim()}
                  className="btn btn-primary btn-sm"
                  style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', whiteSpace: 'nowrap' }}
                >
                  <Radio size={13} />
                  <span>Broadcast</span>
                </button>
              </form>
            </div>

            {/* Breakout Rooms List */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {breakoutRooms.map((br) => {
                const isCurrent = activeBreakoutRoomId === br.id;
                return (
                  <div
                    key={br.id}
                    style={{
                      background: isCurrent ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-surface-elevated)',
                      border: isCurrent ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                      borderRadius: '0.85rem',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <h4 style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 700 }}>
                            {br.name}
                          </h4>
                          {isCurrent && (
                            <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                              You are here
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {br.topic}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fcd34d', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>
                        <Clock size={14} />
                        <span style={{ fontFamily: 'var(--font-mono)' }}>{formatSecondsToMs(br.timeLeftSeconds)} left</span>
                      </div>
                    </div>

                    {/* Participants Roster */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '0.75rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
                          {br.participants.map((p, i) => (
                            <img
                              key={p.id}
                              src={p.avatar_url}
                              alt={p.name}
                              title={p.name}
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid var(--bg-surface)',
                                marginLeft: i > 0 ? '-8px' : '0',
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {br.participants.map((p) => p.name.split(' ')[0]).join(', ')}
                        </span>
                      </div>

                      <div>
                        {isCurrent ? (
                          <button
                            onClick={leaveBreakoutRoom}
                            className="btn btn-outline btn-sm"
                            style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}
                          >
                            <span>Return to Main Room</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => joinBreakoutRoom(br.id)}
                            className="btn btn-primary btn-sm"
                            style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', background: 'var(--grad-primary)' }}
                          >
                            <DoorOpen size={13} />
                            <span>Join Breakout</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{
              padding: '1rem 1.5rem',
              background: 'var(--bg-surface-elevated)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {activeBreakoutRoomId ? 'Currently participating in a breakout group' : 'You are in the main meeting auditorium'}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {activeBreakoutRoomId && (
                  <button
                    onClick={leaveBreakoutRoom}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.8rem' }}
                  >
                    Leave Breakout
                  </button>
                )}
                <button
                  onClick={() => setShowBreakoutModal(false)}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.8rem' }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
