'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Video, 
  Users, 
  Calendar, 
  Sparkles, 
  Plus, 
  Radio, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare,
  PenTool,
  Code2,
  X
} from 'lucide-react';
import { LiveRoom, Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import IntranetGuard from '@/components/intranet/IntranetGuard';

export default function VirtualRoomsHubPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [rooms, setRooms] = useState<LiveRoom[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New room form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseTitle, setCourseTitle] = useState('Full-Stack Modern Web Engineering with Next.js 15 & Supabase');

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    setCurrentUser(user);
    setRooms(LocalDataService.getLiveRooms());
  }, []);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !currentUser) return;

    const newRoom: LiveRoom = {
      id: `room_${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Interactive virtual classroom and real-time collaboration space.',
      instructor_id: currentUser.id,
      instructor_name: currentUser.full_name || 'Instructor',
      instructor_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      course_title: courseTitle,
      is_active: true,
      scheduled_time: 'Live Right Now',
      participant_count: 1,
      tags: ['Live Room', 'Q&A', 'Whiteboard'],
      created_at: new Date().toISOString(),
    };

    LocalDataService.createLiveRoom(newRoom);
    setRooms(LocalDataService.getLiveRooms());
    setShowCreateModal(false);
    router.push(`/live/${newRoom.id}`);
  };

  const activeRooms = rooms.filter((r) => r.is_active);
  const upcomingRooms = rooms.filter((r) => !r.is_active);

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
      {/* Top Banner */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 1rem',
          borderRadius: '9999px',
          background: 'rgba(236, 72, 153, 0.1)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          color: '#f472b6',
          fontWeight: 600,
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899', boxShadow: '0 0 10px #ec4899' }} />
          <span>Interactive Virtual Classroom & Office Hours Space</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}>
          Meet, Collaborate & Learn <span className="text-gradient">In Real Time</span>
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          margin: '0 auto',
          fontSize: '1rem',
          lineHeight: 1.6,
        }}>
          Direct virtual meeting rooms connecting students and instructors simultaneously. Features multi-participant video grids, collaborative drawing whiteboards, shared code playgrounds, and live Q&A queues.
        </p>
      </div>

      {/* Action Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.75rem',
            background: 'rgba(236, 72, 153, 0.15)',
            borderRadius: '9999px',
            color: '#f472b6',
            fontSize: '0.8rem',
            fontWeight: 700,
          }}>
            <Radio size={14} className="animate-pulse" />
            <span>{activeRooms.length} Rooms Live Now</span>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
          style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', boxShadow: '0 4px 18px rgba(236, 72, 153, 0.35)' }}
        >
          <Plus size={16} />
          <span>Create Virtual Room</span>
        </button>
      </div>

      {/* Active Live Rooms Grid */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px #10b981' }} />
          <span>Active Sessions In Progress</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
        }}>
          {activeRooms.map((room) => (
            <div
              key={room.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem',
                border: '1px solid rgba(236, 72, 153, 0.3)',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
              }}
            >
              <div>
                {/* Live Pill & Participants */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                    LIVE NOW
                  </span>

                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Users size={14} color="#f472b6" />
                    <strong>{room.participant_count}</strong> participants inside
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {room.title}
                </h3>

                {room.course_title && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                    {room.course_title}
                  </span>
                )}

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {room.description}
                </p>

                {/* Host Details */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '0.65rem',
                  marginBottom: '1.5rem',
                }}>
                  <img
                    src={room.instructor_avatar}
                    alt={room.instructor_name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
                  />
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Meeting Host</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{room.instructor_name}</span>
                  </div>
                </div>

                {/* Feature Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {room.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{
                      fontSize: '0.7rem',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.35rem',
                      color: 'var(--text-muted)',
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/live/${room.id}`}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                }}
              >
                <Video size={16} />
                <span>Join Virtual Room Now</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Scheduled Sessions */}
      {upcomingRooms.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="var(--accent-amber)" />
            <span>Upcoming Scheduled Office Hours</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingRooms.map((room) => (
              <div
                key={room.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  padding: '1.25rem 1.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <img
                    src={room.instructor_avatar}
                    alt={room.instructor_name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {room.title}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Hosted by {room.instructor_name} • {room.scheduled_time}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="badge badge-amber">
                    <Clock size={12} />
                    {room.scheduled_time}
                  </span>

                  <Link
                    href={`/live/${room.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>Enter Waiting Room</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Virtual Room Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 600,
          padding: '1.5rem',
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '560px',
            background: 'var(--bg-surface-elevated)',
            border: '2px solid rgba(236, 72, 153, 0.4)',
            padding: '2rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Video size={20} color="#ec4899" />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Create Virtual Meeting Room</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateRoom} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Room Title / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js 15 App Architecture & Database Q&A"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Associated Curriculum
                </label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Session Agenda & Overview
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain what topics students can bring to this session..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{
                background: 'var(--bg-surface)',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <Sparkles size={16} color="var(--primary)" />
                <span>Room includes live video stage, drawing whiteboard, code playground & chat!</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title.trim()}
                  className="btn btn-primary btn-sm"
                  style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' }}
                >
                  <span>Launch Room Immediately</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
