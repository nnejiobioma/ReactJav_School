'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Camera,
  Upload,
  Sparkles,
  Check,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  GraduationCap,
  ArrowLeft,
  MapPin,
  Phone,
  Compass,
  FileText,
  KeyRound,
  ExternalLink,
  Shuffle,
  Trash2,
  Lock,
  Globe,
  Briefcase
} from 'lucide-react';
import { Profile, UserRole } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import { updateUserProfileFirebase } from '@/lib/firebase/auth';
import AccessGuard from '@/components/auth/AccessGuard';

// Curated avatar styles supported by DiceBear
const AVATAR_STYLES = [
  { id: 'initials', name: 'Initials', prefix: 'https://api.dicebear.com/7.x/initials/svg?seed=' },
  { id: 'adventurer', name: 'Adventurer', prefix: 'https://api.dicebear.com/7.x/adventurer/svg?seed=' },
  { id: 'lorelei', name: 'Lorelei', prefix: 'https://api.dicebear.com/7.x/lorelei/svg?seed=' },
  { id: 'bottts', name: 'Bottts (Robot)', prefix: 'https://api.dicebear.com/7.x/bottts/svg?seed=' },
  { id: 'micah', name: 'Micah (Modern)', prefix: 'https://api.dicebear.com/7.x/micah/svg?seed=' },
  { id: 'fun-emoji', name: 'Fun Emoji', prefix: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=' },
];

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
];

export default function ProfileEditPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Profile Form States
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarInputUrl, setAvatarInputUrl] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [state, setState] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [educationLevel, setEducationLevel] = useState("Bachelor's Degree (B.Sc / B.Tech)");
  const [preferredTrack, setPreferredTrack] = useState('Full-Stack Software Engineering');
  const [experienceLevel, setExperienceLevel] = useState('Beginner (Zero / Limited Coding)');
  const [careerGoal, setCareerGoal] = useState('Transition into Software Engineering / Land a Tech Job');

  // Avatar Picker Tab State
  const [avatarTab, setAvatarTab] = useState<'upload' | 'generator' | 'presets' | 'url'>('upload');
  const [selectedGeneratorStyle, setSelectedGeneratorStyle] = useState('adventurer');
  const [generatorSeed, setGeneratorSeed] = useState('');

  // Load User Data
  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setFullName(user.full_name || '');
      setAvatarUrl(user.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.full_name || user.email)}`);
      setAvatarInputUrl(user.avatar_url || '');
      setBio(user.bio || '');
      setPhone(user.phone || '');
      setCountry(user.country || 'Nigeria');
      setState(user.state || '');
      setEmergencyContact(user.emergency_contact || '');
      if (user.education_level) setEducationLevel(user.education_level);
      if (user.preferred_track) setPreferredTrack(user.preferred_track);
      if (user.experience_level) setExperienceLevel(user.experience_level);
      if (user.career_goal) setCareerGoal(user.career_goal);
      setGeneratorSeed(user.full_name || user.email.split('@')[0] || 'scholar');
    }
    setLoading(false);
  }, []);

  // Handle local image file upload and compress to base64 WebP/JPEG data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WebP, or GIF).');
      return;
    }

    // 5MB maximum limit
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB. Please choose a smaller image.');
      return;
    }

    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to crop and compress to optimal avatar dimensions (320x320)
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = 320;
        canvas.height = 320;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Center crop
          const offsetX = (img.width - size) / 2;
          const offsetY = (img.height - size) / 2;
          ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, 320, 320);

          // Export as compressed WebP or JPEG data URL
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setAvatarUrl(compressedDataUrl);
          setAvatarInputUrl(compressedDataUrl);
          setSuccessMessage('Photo uploaded and cropped! Click "Save Changes" to apply.');
          setTimeout(() => setSuccessMessage(null), 4000);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Generate random avatar from seed generator
  const handleRandomizeGenerator = () => {
    const randomSeed = Math.random().toString(36).substring(2, 9);
    setGeneratorSeed(randomSeed);
    const styleObj = AVATAR_STYLES.find((s) => s.id === selectedGeneratorStyle) || AVATAR_STYLES[1];
    const newUrl = `${styleObj.prefix}${encodeURIComponent(randomSeed)}`;
    setAvatarUrl(newUrl);
    setAvatarInputUrl(newUrl);
  };

  const handleSelectGeneratorStyle = (styleId: string) => {
    setSelectedGeneratorStyle(styleId);
    const styleObj = AVATAR_STYLES.find((s) => s.id === styleId) || AVATAR_STYLES[0];
    const seed = generatorSeed || fullName || 'scholar';
    const newUrl = `${styleObj.prefix}${encodeURIComponent(seed)}`;
    setAvatarUrl(newUrl);
    setAvatarInputUrl(newUrl);
  };

  const handleSelectPreset = (presetUrl: string) => {
    setAvatarUrl(presetUrl);
    setAvatarInputUrl(presetUrl);
    setErrorMessage(null);
  };

  const handleApplyCustomUrl = () => {
    if (!avatarInputUrl.trim()) {
      setErrorMessage('Please enter a valid image URL.');
      return;
    }
    setAvatarUrl(avatarInputUrl.trim());
    setErrorMessage(null);
  };

  const handleResetToInitials = () => {
    const nameSeed = fullName.trim() || currentUser?.email || 'Scholar';
    const initialsUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nameSeed)}`;
    setAvatarUrl(initialsUrl);
    setAvatarInputUrl(initialsUrl);
    setErrorMessage(null);
  };

  // Save full profile updates
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!fullName.trim()) {
      setErrorMessage('Full Name is required.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const updates: Partial<Profile> = {
        full_name: fullName.trim(),
        avatar_url: avatarUrl.trim() || null,
        bio: bio.trim() || null,
        phone: phone.trim() || undefined,
        country: country.trim() || undefined,
        state: state.trim() || undefined,
        emergency_contact: emergencyContact.trim() || undefined,
        education_level: educationLevel,
        preferred_track: preferredTrack,
        experience_level: experienceLevel,
        career_goal: careerGoal.trim() || undefined,
      };

      // 1. Update in LocalDataService & Supabase
      const res = await LocalDataService.updateUserProfile(currentUser.id, updates);

      if (!res.success) {
        setErrorMessage(res.error || 'Failed to update profile.');
        setSaving(false);
        return;
      }

      // 2. Update Firebase Auth display info if user signed in with Firebase
      await updateUserProfileFirebase({
        displayName: updates.full_name || undefined,
        photoURL: updates.avatar_url || undefined,
      });

      setCurrentUser(res.profile);
      setSuccessMessage('Profile and avatar updated successfully! All changes are synchronized.');
      window.dispatchEvent(new Event('storage'));

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred while saving your profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <RefreshCw className="animate-spin" size={28} style={{ margin: '0 auto', color: 'var(--primary)' }} />
      </div>
    );
  }

  const roleBadgeStyle = {
    student: 'badge-primary',
    instructor: 'badge-emerald',
    admin: 'badge-amber',
    super_admin: 'badge-purple',
  }[currentUser?.role || 'student'] || 'badge-primary';

  return (
    <AccessGuard level="authenticated" pageTitle="Scholar Profile & Settings">
      <div className="container" style={{ padding: 'clamp(2.5rem, 5vw, 3.5rem) clamp(0.75rem, 3vw, 1.5rem) 4rem', maxWidth: '880px' }}>
        
        {/* Top Navigation & Breadcrumbs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--primary)',
              fontSize: '0.86rem',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Link
              href="/auth?mode=resetPassword"
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem', fontSize: '0.82rem' }}
            >
              <KeyRound size={14} />
              <span>Security & Password</span>
            </Link>
            <Link
              href="/courses"
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem', fontSize: '0.82rem' }}
            >
              <GraduationCap size={14} />
              <span>Programmes</span>
            </Link>
          </div>
        </div>

        {/* Page Header Banner */}
        <div className="glass-card" style={{
          padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className={`badge ${roleBadgeStyle}`}>
                  {currentUser?.role?.toUpperCase() || 'STUDENT'}
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.12)',
                  padding: '0.15rem 0.6rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}>
                  <ShieldCheck size={12} />
                  <span>Verified Identity</span>
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, margin: '0 0 0.35rem', color: 'var(--text-primary)' }}>
                Scholar Profile & Settings
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Manage your public scholar presence, avatar photo, contact coordinates, and learning track.
              </p>
            </div>

            {/* Quick Record Link */}
            <Link
              href="/dashboard"
              className="btn btn-primary btn-sm"
              style={{ gap: '0.45rem', alignSelf: 'flex-start' }}
            >
              <FileText size={15} />
              <span>View Transcript</span>
            </Link>
          </div>
        </div>

        {/* Success & Error Notifications */}
        {successMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderRadius: '0.85rem',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#10b981',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <Check size={20} style={{ flexShrink: 0 }} />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderRadius: '0.85rem',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#f87171',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '1.75rem',
          }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSaveChanges}>
          {/* ================= SECTION 1: AVATAR & PROFILE PICTURE ================= */}
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.25rem)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <Camera size={20} color="var(--primary)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Profile Picture & Avatar
              </h2>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
              alignItems: 'center',
            }}>
              {/* Live Preview Avatar */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                textAlign: 'center',
              }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={fullName || 'Avatar Preview'}
                    onError={() => {
                      // Fallback if URL is invalid or broken
                      setAvatarUrl(`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName || 'User')}`);
                    }}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--primary)',
                      boxShadow: 'var(--shadow-md), 0 0 25px rgba(99, 102, 241, 0.25)',
                      background: 'var(--bg-surface-elevated)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      border: '2px solid var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'transform 0.2s',
                    }}
                    title="Upload new photo"
                  >
                    <Upload size={16} />
                  </button>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.2rem', color: 'var(--text-primary)' }}>
                    {fullName || 'Scholar'}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Visible across courses, campus intranet, and certificates.
                  </p>
                </div>
              </div>

              {/* Avatar Selector Navigation Tabs */}
              <div style={{ width: '100%' }}>
                <div style={{
                  display: 'flex',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: '0.75rem',
                  padding: '0.35rem',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1.25rem',
                  gap: '0.25rem',
                  overflowX: 'auto',
                }}>
                  <button
                    type="button"
                    onClick={() => setAvatarTab('upload')}
                    style={{
                      flex: 1,
                      minWidth: '110px',
                      padding: '0.55rem',
                      borderRadius: '0.5rem',
                      background: avatarTab === 'upload' ? 'var(--bg-surface)' : 'transparent',
                      color: avatarTab === 'upload' ? 'var(--text-primary)' : 'var(--text-muted)',
                      border: avatarTab === 'upload' ? '1px solid var(--border-subtle)' : 'none',
                      boxShadow: avatarTab === 'upload' ? 'var(--shadow-sm)' : 'none',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Upload size={14} />
                    <span>Upload File</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAvatarTab('generator')}
                    style={{
                      flex: 1,
                      minWidth: '125px',
                      padding: '0.55rem',
                      borderRadius: '0.5rem',
                      background: avatarTab === 'generator' ? 'var(--bg-surface)' : 'transparent',
                      color: avatarTab === 'generator' ? 'var(--text-primary)' : 'var(--text-muted)',
                      border: avatarTab === 'generator' ? '1px solid var(--border-subtle)' : 'none',
                      boxShadow: avatarTab === 'generator' ? 'var(--shadow-sm)' : 'none',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Sparkles size={14} />
                    <span>Avatar Generator</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAvatarTab('presets')}
                    style={{
                      flex: 1,
                      minWidth: '100px',
                      padding: '0.55rem',
                      borderRadius: '0.5rem',
                      background: avatarTab === 'presets' ? 'var(--bg-surface)' : 'transparent',
                      color: avatarTab === 'presets' ? 'var(--text-primary)' : 'var(--text-muted)',
                      border: avatarTab === 'presets' ? '1px solid var(--border-subtle)' : 'none',
                      boxShadow: avatarTab === 'presets' ? 'var(--shadow-sm)' : 'none',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Camera size={14} />
                    <span>Portraits</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAvatarTab('url')}
                    style={{
                      flex: 1,
                      minWidth: '100px',
                      padding: '0.55rem',
                      borderRadius: '0.5rem',
                      background: avatarTab === 'url' ? 'var(--bg-surface)' : 'transparent',
                      color: avatarTab === 'url' ? 'var(--text-primary)' : 'var(--text-muted)',
                      border: avatarTab === 'url' ? '1px solid var(--border-subtle)' : 'none',
                      boxShadow: avatarTab === 'url' ? 'var(--shadow-sm)' : 'none',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Globe size={14} />
                    <span>Image URL</span>
                  </button>
                </div>

                {/* Tab 1: Upload File */}
                {avatarTab === 'upload' && (
                  <div style={{
                    border: '2px dashed var(--border-accent)',
                    borderRadius: '1rem',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    background: 'var(--bg-surface-elevated)',
                    transition: 'all 0.2s',
                  }}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="profile-picture-upload-input"
                    />
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                    }}>
                      <Upload size={24} />
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.35rem', color: 'var(--text-primary)' }}>
                      Click to upload or drag & drop photo
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem' }}>
                      Supports PNG, JPG, GIF or WebP (max. 5MB). Photo will be centered & square-cropped automatically.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn btn-primary btn-sm"
                        style={{ gap: '0.45rem' }}
                      >
                        <Camera size={15} />
                        <span>Select Photo from Device</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetToInitials}
                        className="btn btn-secondary btn-sm"
                        style={{ gap: '0.45rem' }}
                      >
                        <Trash2 size={14} />
                        <span>Reset to Initials</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 2: Generator */}
                {avatarTab === 'generator' && (
                  <div style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '1.25rem',
                    borderRadius: '1rem',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                        Select Avatar Style
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {AVATAR_STYLES.map((style) => (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => handleSelectGeneratorStyle(style.id)}
                            style={{
                              padding: '0.45rem 0.85rem',
                              borderRadius: '0.5rem',
                              border: selectedGeneratorStyle === style.id ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                              background: selectedGeneratorStyle === style.id ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface)',
                              color: selectedGeneratorStyle === style.id ? 'var(--primary)' : 'var(--text-secondary)',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                            }}
                          >
                            <span>{style.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={handleRandomizeGenerator}
                        className="btn btn-primary btn-sm"
                        style={{ gap: '0.45rem', flex: 1, justifyContent: 'center' }}
                      >
                        <Shuffle size={15} />
                        <span>Generate Random Seed</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleResetToInitials}
                        className="btn btn-secondary btn-sm"
                        style={{ gap: '0.45rem' }}
                      >
                        <span>Initials</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 3: Presets */}
                {avatarTab === 'presets' && (
                  <div style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '1.25rem',
                    borderRadius: '1rem',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                      Choose a High-Res Scholar Portrait
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
                      gap: '0.75rem',
                    }}>
                      {PRESET_AVATARS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          style={{
                            padding: 0,
                            borderRadius: '50%',
                            border: avatarUrl === preset ? '3px solid var(--primary)' : '2px solid var(--border-subtle)',
                            background: 'transparent',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            width: '68px',
                            height: '68px',
                            margin: '0 auto',
                            position: 'relative',
                            transition: 'transform 0.2s, border-color 0.2s',
                          }}
                        >
                          <img
                            src={preset}
                            alt={`Portrait ${idx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 4: Web Image URL */}
                {avatarTab === 'url' && (
                  <div style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '1.25rem',
                    borderRadius: '1rem',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Paste Public Image Address
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <input
                        type="url"
                        className="form-input"
                        placeholder="https://example.com/avatar.jpg"
                        value={avatarInputUrl}
                        onChange={(e) => setAvatarInputUrl(e.target.value)}
                        style={{ flex: 1, minWidth: '220px' }}
                      />
                      <button
                        type="button"
                        onClick={handleApplyCustomUrl}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0 1.25rem' }}
                      >
                        Apply URL
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= SECTION 2: IDENTITY & BIOGRAPHY ================= */}
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.25rem)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <User size={20} color="var(--primary)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Personal Identification
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Full Legal / Display Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  This name appears on course certificates, transcripts, and classroom discussions.
                </span>
              </div>

              {/* Primary Email (Readonly) */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Primary Registered Email
                  </label>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Lock size={12} /> Managed by Auth Provider
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    disabled
                    className="form-input"
                    value={currentUser?.email || ''}
                    style={{ paddingLeft: '2.5rem', opacity: 0.75, cursor: 'not-allowed', background: 'rgba(0, 0, 0, 0.08)' }}
                  />
                </div>
              </div>

              {/* Bio / Scholar Statement */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Scholar Bio & Career Statement
                </label>
                <textarea
                  className="form-input"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a brief introduction about yourself, your technical ambitions, programming experience, and what you aim to achieve at ReactJav..."
                  style={{ resize: 'vertical', lineHeight: 1.5 }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  Brief statement visible on student profiles and faculty mentorship portals.
                </span>
              </div>
            </div>
          </div>

          {/* ================= SECTION 3: CONTACT & LOCATION ================= */}
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.25rem)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <MapPin size={20} color="var(--primary)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Contact Coordinates & Residence
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}>
              {/* Phone Number */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Phone / WhatsApp Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="tel"
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Country of Residence
                </label>
                <select
                  className="form-input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Other">Other / International</option>
                </select>
              </div>

              {/* State / Province */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  State / Province / Region
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Lagos, Abuja, California"
                />
              </div>

              {/* Emergency Contact */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Emergency Contact (Name & Phone)
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="e.g. Jane Doe (+234 801 234 5678)"
                />
              </div>
            </div>
          </div>

          {/* ================= SECTION 4: ACADEMIC & CAREER TRAJECTORY ================= */}
          <div className="glass-card" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.25rem)', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <Compass size={20} color="var(--primary)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Academic & Engineering Track
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}>
              {/* Education Level */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Highest Education Attainment
                </label>
                <select
                  className="form-input"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                >
                  <option value="High School / Secondary (WAEC/NECO)">High School / Secondary (WAEC/NECO)</option>
                  <option value="Undergraduate (Currently Enrolled)">Undergraduate (Currently Enrolled)</option>
                  <option value="Bachelor's Degree (B.Sc / B.Tech)">Bachelor's Degree (B.Sc / B.Tech)</option>
                  <option value="Polytechnic / Diploma (OND / HND)">Polytechnic / Diploma (OND / HND)</option>
                  <option value="Master's Degree (M.Sc / MBA)">Master's Degree (M.Sc / MBA)</option>
                  <option value="Doctorate (Ph.D)">Doctorate (Ph.D)</option>
                  <option value="Self-Taught / Career Transitioner">Self-Taught / Career Transitioner</option>
                </select>
              </div>

              {/* Preferred Engineering Track */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Primary Engineering Focus
                </label>
                <select
                  className="form-input"
                  value={preferredTrack}
                  onChange={(e) => setPreferredTrack(e.target.value)}
                >
                  <option value="Full-Stack Software Engineering">Full-Stack Software Engineering (React & Java)</option>
                  <option value="Frontend Web Development">Frontend Web Development (Next.js & TypeScript)</option>
                  <option value="Backend Engineering & Cloud">Backend Engineering & Cloud (Java Spring & Postgres)</option>
                  <option value="Mobile App Development">Mobile App Development (React Native)</option>
                  <option value="Data Science & AI Systems">Data Science & AI Systems</option>
                  <option value="DevOps & Cloud Infrastructure">DevOps & Cloud Infrastructure</option>
                </select>
              </div>

              {/* Coding Experience */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Prior Coding Proficiency
                </label>
                <select
                  className="form-input"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="Beginner (Zero / Limited Coding)">Beginner (Zero / Limited Coding)</option>
                  <option value="Intermediate (Built Basic Projects)">Intermediate (Built Basic Projects)</option>
                  <option value="Advanced (Production / Working Developer)">Advanced (Production / Working Developer)</option>
                </select>
              </div>

              {/* Career Goal */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Primary Career Objective
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g. Land first Junior Software Engineer role"
                />
              </div>
            </div>
          </div>

          {/* ================= STICKY / BOTTOM SAVE ACTIONS ================= */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1.25rem 1.5rem',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-accent)',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Changes are synchronized to both local and cloud databases.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link
                href="/dashboard"
                className="btn btn-secondary"
                style={{ fontSize: '0.88rem' }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary"
                style={{
                  fontSize: '0.88rem',
                  gap: '0.45rem',
                  minWidth: '150px',
                  justifyContent: 'center',
                }}
              >
                {saving ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </AccessGuard>
  );
}
