'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  GraduationCap, 
  User, 
  Phone, 
  Globe, 
  MapPin, 
  BookOpen, 
  Compass, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw,
  Award,
  AlertCircle,
  HeartHandshake
} from 'lucide-react';
import { Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import DirectTutoringEnrollmentForm from '@/components/academy/DirectTutoringEnrollmentForm';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');

  // Detect if user has a tutoring intent
  const isTutoringInitial = searchParams.get('mode') === 'tutoring' || (redirectUrl?.includes('tutoring') ?? false);
  const [enrollmentType, setEnrollmentType] = useState<'programme' | 'tutoring'>(
    isTutoringInitial ? 'tutoring' : 'programme'
  );

  let initialTutoringTrackId: string | undefined;
  if (redirectUrl) {
    const match = redirectUrl.match(/[?&]tutoringTrackId=([^&]+)/) || redirectUrl.match(/[?&]trackId=([^&]+)/);
    if (match) {
      initialTutoringTrackId = decodeURIComponent(match[1]);
    }
  }

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields for standard programmes
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [state, setState] = useState('');
  const [educationLevel, setEducationLevel] = useState("Bachelor's Degree (B.Sc / B.Tech)");
  const [preferredTrack, setPreferredTrack] = useState('Software Engineering');
  const [experienceLevel, setExperienceLevel] = useState('Beginner (Zero / Limited Coding)');
  const [careerGoal, setCareerGoal] = useState('Transition into Software Engineering / Land a Tech Job');
  const [emergencyContact, setEmergencyContact] = useState('');

  useEffect(() => {
    const user = LocalDataService.getCurrentUser();
    if (!user || user.id === 'guest') {
      const authRedirect = redirectUrl 
        ? `/auth?mode=signup&redirect=${encodeURIComponent(redirectUrl)}`
        : '/auth?mode=signup&redirect=/onboarding';
      router.push(authRedirect);
      return;
    }
    setCurrentUser(user);
    if (user.full_name) setFullName(user.full_name);
    if (user.phone) setPhone(user.phone);
    if (user.country) setCountry(user.country);
    if (user.state) setState(user.state);
    if (user.education_level) setEducationLevel(user.education_level);
    if (user.preferred_track) setPreferredTrack(user.preferred_track);
    if (user.experience_level) setExperienceLevel(user.experience_level);
    if (user.career_goal) setCareerGoal(user.career_goal);
    if (user.emergency_contact) setEmergencyContact(user.emergency_contact);

    setIsLoading(false);
  }, [redirectUrl, router]);

  const handleSubmitProgramme = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !phone.trim() || !country.trim() || !state.trim()) {
      setErrorMessage('Please complete all required fields including your contact phone, country, and state.');
      return;
    }

    if (!currentUser) return;
    setIsSubmitting(true);

    try {
      const res = LocalDataService.updateRegistrationDetails(currentUser.id, {
        full_name: fullName.trim(),
        phone: phone.trim(),
        country: country.trim(),
        state: state.trim(),
        education_level: educationLevel,
        preferred_track: preferredTrack,
        experience_level: experienceLevel,
        career_goal: careerGoal,
        emergency_contact: emergencyContact.trim(),
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push('/courses');
          }
        }, 1200);
      } else {
        setErrorMessage('Failed to save registration profile. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration submission failed';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <RefreshCw className="animate-spin" size={28} style={{ margin: '0 auto', color: 'var(--primary)' }} />
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Loading registration profile...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3.5rem 1rem 6rem', maxWidth: '820px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: '#a5b4fc',
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '0.75rem',
        }}>
          <Sparkles size={14} color="var(--primary)" />
          <span>Step 1 of 2: Student Registration Profile</span>
        </div>

        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          {enrollmentType === 'tutoring'
            ? 'Direct Tutoring Enrolment Profile'
            : 'Complete Your Student Registration'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto' }}>
          {enrollmentType === 'tutoring'
            ? 'Personalized 1-on-1 tutoring configuration for learners of all ages (Ages 5–17+ with parental consent for minors).'
            : 'Please provide your academic background details. Once saved, you will proceed to the programmes catalog to choose your course.'}
        </p>
      </div>

      {/* Track Category Mode Selector */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '0.75rem',
        marginBottom: '2rem',
      }}>
        <button
          type="button"
          onClick={() => setEnrollmentType('programme')}
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '1rem',
            border: enrollmentType === 'programme'
              ? '2px solid var(--primary)'
              : '1px solid var(--border-subtle)',
            background: enrollmentType === 'programme'
              ? 'rgba(99, 102, 241, 0.12)'
              : 'var(--bg-surface)',
            color: enrollmentType === 'programme' ? '#ffffff' : 'var(--text-secondary)',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: enrollmentType === 'programme' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <GraduationCap size={18} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800 }}>
              Academic Programmes
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Adult / Career / Full Curriculum Courses
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setEnrollmentType('tutoring')}
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '1rem',
            border: enrollmentType === 'tutoring'
              ? '2px solid var(--accent-emerald)'
              : '1px solid var(--border-subtle)',
            background: enrollmentType === 'tutoring'
              ? 'rgba(16, 185, 129, 0.12)'
              : 'var(--bg-surface)',
            color: enrollmentType === 'tutoring' ? '#ffffff' : 'var(--text-secondary)',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: enrollmentType === 'tutoring' ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.05)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800 }}>
              1-on-1 Direct Tutoring
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              All Ages (5–17+), Minor Safety & Consent
            </span>
          </div>
        </button>
      </div>

      {/* Progress Milestone Indicator (for Programme Mode) */}
      {enrollmentType === 'programme' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            borderRadius: '0.85rem',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}>
            <div style={{
              width: '1.75rem',
              height: '1.75rem',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}>
              1
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                Student Registration
              </span>
              <span style={{ fontSize: '0.72rem', color: '#a5b4fc' }}>Current step</span>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.85rem',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            opacity: 0.65,
          }}>
            <div style={{
              width: '1.75rem',
              height: '1.75rem',
              borderRadius: '50%',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}>
              2
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Programme & Tuition
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Next: Select programme & pay</span>
            </div>
          </div>
        </div>
      )}

      {/* DIRECT TUTORING FORM VIEW */}
      {enrollmentType === 'tutoring' ? (
        <div className="glass-card" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', borderRadius: '1.5rem', border: '1px solid var(--border-accent)' }}>
          <DirectTutoringEnrollmentForm initialTrackId={initialTutoringTrackId} />
        </div>
      ) : (
        /* PROGRAMMES FORM VIEW */
        <div className="glass-card" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', borderRadius: '1.5rem', border: '1px solid var(--border-accent)' }}>
          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 1.25rem',
              borderRadius: '0.75rem',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#fca5a5',
              fontSize: '0.86rem',
              marginBottom: '1.5rem',
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {success && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              borderRadius: '0.75rem',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
            }}>
              <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
              <span>Registration details saved successfully! Directing to programmes...</span>
            </div>
          )}

          <form onSubmit={handleSubmitProgramme} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} color="var(--primary)" />
                <span>1. Personal & Contact Details</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Eze"
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Primary Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 803 123 4567"
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Country of Residence *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Nigeria"
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    State / Province / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Lagos State"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={18} color="var(--primary)" />
                <span>2. Educational Background & Career Goal</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Highest Education Attainment
                  </label>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="High School / Secondary School">High School / Secondary School</option>
                    <option value="Diploma / OND / HND">Diploma / OND / HND</option>
                    <option value="Bachelor's Degree (B.Sc / B.Tech)">Bachelor&apos;s Degree (B.Sc / B.Tech)</option>
                    <option value="Master's / Postgraduate">Master&apos;s / Postgraduate</option>
                    <option value="Other Professional">Other Professional</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Coding & Tech Experience
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Beginner (Zero / Limited Coding)">Beginner (Zero / Limited Coding)</option>
                    <option value="Intermediate (Basic HTML/CSS/JS/Python)">Intermediate (Basic HTML/CSS/JS/Python)</option>
                    <option value="Advanced (Software Engineer looking to specialize)">Advanced (Software Engineer looking to specialize)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Preferred Engineering Track
                  </label>
                  <select
                    value={preferredTrack}
                    onChange={(e) => setPreferredTrack(e.target.value)}
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Software Engineering">Software Engineering (Full Stack)</option>
                    <option value="Frontend Development">Frontend Development (React / Next.js)</option>
                    <option value="Backend Development">Backend Engineering (Java / Node.js / SQL)</option>
                    <option value="Python & AI Engineering">Python & AI Engineering</option>
                    <option value="Cloud & DevOps">Cloud & DevOps Systems</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Primary Academic / Career Goal
                  </label>
                  <select
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="Transition into Software Engineering / Land a Tech Job">Transition into Software Engineering / Land a Tech Job</option>
                    <option value="Upskill for Career Promotion / Salary Increase">Upskill for Career Promotion / Salary Increase</option>
                    <option value="Build a Startup / Software Product">Build a Startup / Software Product</option>
                    <option value="Academic Certification & University Preparation">Academic Certification & University Preparation</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Emergency Contact / Next of Kin (Phone or Name)
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="e.g. Jane Eze (Sister) - +234 802 000 0000"
                  className="form-input"
                />
              </div>
            </div>

            <div style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: '0.75rem',
              padding: '0.9rem 1.15rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}>
              <ShieldCheck size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                By submitting this registration, your student account profile will be created. Next, you will choose your programme on the catalog page and complete tuition payment to unlock lessons and campus intranet access.
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', justifyContent: 'center', fontSize: '0.95rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  <span>Saving Registration Profile...</span>
                </>
              ) : (
                <>
                  <span>Save Profile & Proceed to Programmes</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function StudentOnboardingPage() {
  return (
    <Suspense fallback={
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <RefreshCw className="animate-spin" size={28} style={{ margin: '0 auto', color: 'var(--primary)' }} />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
