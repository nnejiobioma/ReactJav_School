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
  AlertCircle
} from 'lucide-react';
import { Profile } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || searchParams.get('callbackUrl');

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields
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
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
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
          // Direct to redirect url if specified, else programmes catalog
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
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem', maxWidth: '720px' }}>
      {/* Onboarding Header Banner */}
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
          Complete Your Student Registration
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto' }}>
          Please provide your student details to set up your academic profile. Once submitted, you will proceed to the programmes catalog to choose your track and enroll.
        </p>
      </div>

      {/* Progress Milestone Indicator */}
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

      {/* Error Banner */}
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

      {/* Success Notification */}
      {success && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderRadius: '0.85rem',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#34d399',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '2rem',
          animation: 'fadeIn 0.2s ease',
        }}>
          <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
          <div>
            <span style={{ display: 'block', color: '#ffffff' }}>Student Registration Profile Saved!</span>
            <span style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Redirecting to the Programmes catalog to choose your track...</span>
          </div>
        </div>
      )}

      {/* Registration Form Card */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Section 1: Personal & Contact Details */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} color="var(--primary)" />
              <span>Personal & Contact Information</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Used for official student record keeping, certificate issuance, and communications.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Full Legal Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="First and Last Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Contact Phone Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    placeholder="e.g. +234 801 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Country of Residence <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nigeria, Ghana, UK"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    State / City <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lagos, Abuja, London"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

          {/* Section 2: Educational & Academic Background */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap size={18} color="var(--accent-emerald)" />
              <span>Academic Background & Technical Experience</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Helps faculty leads tailor practical tutorials and course pacing.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Highest Educational Qualification
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="form-input"
                  style={{ background: 'var(--bg-surface-elevated)', color: '#ffffff' }}
                >
                  <option value="High School / Secondary School">High School / Secondary School Certificate</option>
                  <option value="National Diploma / Associate Degree">National Diploma / Associate Degree</option>
                  <option value="Bachelor's Degree (B.Sc / B.Tech)">Bachelor's Degree (B.Sc / B.Tech / B.Eng)</option>
                  <option value="Master's Degree (M.Sc / MBA)">Master's Degree (M.Sc / MBA)</option>
                  <option value="Doctorate (Ph.D)">Doctorate (Ph.D)</option>
                  <option value="Self-Taught / Non-Formal">Self-Taught / Practical Developer</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Current Coding / Technical Experience
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="form-input"
                  style={{ background: 'var(--bg-surface-elevated)', color: '#ffffff' }}
                >
                  <option value="Beginner (Zero / Limited Coding)">Beginner - New to programming & computer science</option>
                  <option value="Intermediate (Knows basics of HTML/JS/Java)">Intermediate - Knows syntax & built small projects</option>
                  <option value="Advanced (Professional Developer)">Advanced - Professional looking to master React, Java & Cloud</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

          {/* Section 3: Programme Goals & Track Preference */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={18} color="var(--accent-amber)" />
              <span>Preferred Track & Learning Objectives</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Indicate the programme you plan to enroll in on the next page.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Target Academic Programme
                </label>
                <select
                  value={preferredTrack}
                  onChange={(e) => setPreferredTrack(e.target.value)}
                  className="form-input"
                  style={{ background: 'var(--bg-surface-elevated)', color: '#ffffff' }}
                >
                  <option value="Software Engineering">Software Engineering (Java Spring Boot & React Full Stack)</option>
                  <option value="AI & Data">AI, Machine Learning & Deep Neural Analytics</option>
                  <option value="Creative & Design">Creative Design & Frontend User Interfaces</option>
                  <option value="Cloud & DevOps">Cloud Infrastructure, Kubernetes & DevOps Pods</option>
                  <option value="Cybersecurity">Cybersecurity, Threat Defence & Identity Governance</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Primary Career Goal / Target Outcome
                </label>
                <select
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  className="form-input"
                  style={{ background: 'var(--bg-surface-elevated)', color: '#ffffff' }}
                >
                  <option value="Transition into Software Engineering / Land a Tech Job">Transition into Tech / Land an Engineering Job</option>
                  <option value="Promote & Accelerate in Existing Tech Role">Promote & Accelerate in Existing Tech Role</option>
                  <option value="Build a Scalable SaaS or Startup Product">Build a Scalable Startup / SaaS Product</option>
                  <option value="Academic Research & Professional Certification">Academic Excellence & Global Certification</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Emergency Contact / Next of Kin (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe (+234 802 345 6789)"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '0.85rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            fontSize: '0.825rem',
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
