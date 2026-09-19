'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, Check, Sparkles } from 'lucide-react';
import { AcademyTrack, ACADEMY_TRACKS } from '@/data/academyTracks';
import { LocalDataService } from '@/lib/supabase/client';

interface AdminTrackEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: AcademyTrack | null;
  onSaved?: (updatedTrack: AcademyTrack) => void;
}

export default function AdminTrackEditorModal({
  isOpen,
  onClose,
  track,
  onSaved,
}: AdminTrackEditorModalProps) {
  const [formData, setFormData] = useState<Partial<AcademyTrack>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && track) {
      setFormData(JSON.parse(JSON.stringify(track)));
    }
  }, [isOpen, track]);

  if (!isOpen || !track) return null;

  const handleChange = (field: keyof AcademyTrack, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field: keyof AcademyTrack, text: string) => {
    const items = text.split('\n').map((t) => t.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      [field]: items,
    }));
  };

  const handleTagsChange = (text: string) => {
    const tags = text.split(',').map((t) => t.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleSave = () => {
    if (!formData.id) return;
    const updated = formData as AcademyTrack;
    LocalDataService.saveAcademyTrack(updated);
    setToastMessage('Track updated and saved live!');
    if (onSaved) onSaved(updated);
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 450);
  };

  const handleReset = () => {
    const defaultTrack = ACADEMY_TRACKS.find((t) => t.id === track.id);
    if (!defaultTrack) return;
    if (confirm(`Reset track "${track.name}" back to original default syllabus and copy?`)) {
      LocalDataService.saveAcademyTrack(defaultTrack);
      setFormData(JSON.parse(JSON.stringify(defaultTrack)));
      setToastMessage('Track reset to original default.');
      if (onSaved) onSaved(defaultTrack);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 8, 16, 0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          borderRadius: '1.25rem',
          border: '1px solid var(--border-accent)',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.2)',
          overflow: 'hidden',
          background: 'var(--bg-surface)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              {formData.icon || '🎓'}
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Edit Academy Track: {track.name}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Direct 1-on-1 Tutoring Syllabus & Meta Editor (Admin)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.35rem',
              borderRadius: '0.4rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '1.75rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            flexGrow: 1,
          }}
        >
          {toastMessage && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#34d399',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Check size={16} />
              <span>{toastMessage}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="form-label">Track Title</label>
              <input
                type="text"
                className="form-input"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Emoji Icon</label>
              <input
                type="text"
                className="form-input"
                value={formData.icon || ''}
                onChange={(e) => handleChange('icon', e.target.value)}
                placeholder="e.g. 👶, 🧠, 🐍"
              />
            </div>
            <div>
              <label className="form-label">Zone</label>
              <select
                className="form-input"
                value={formData.zone || 'zone-01'}
                onChange={(e) => {
                  const z = e.target.value as 'zone-01' | 'zone-02';
                  handleChange('zone', z);
                  handleChange('zoneName', z === 'zone-01' ? 'Foundation & Explorer' : 'Builder & Professional');
                }}
              >
                <option value="zone-01">Zone 01 (Foundation)</option>
                <option value="zone-02">Zone 02 (Builder)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="form-label">Subtitle / Sub-hook</label>
              <input
                type="text"
                className="form-input"
                value={formData.sub || ''}
                onChange={(e) => handleChange('sub', e.target.value)}
                placeholder="e.g. Ages 5–10 or Foundational Thinking Systems"
              />
            </div>
            <div>
              <label className="form-label">Tier / Target Demographic</label>
              <input
                type="text"
                className="form-input"
                value={formData.tier || ''}
                onChange={(e) => handleChange('tier', e.target.value)}
                placeholder="e.g. Foundation (Ages 5–10)"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Short Description</label>
            <textarea
              className="form-input"
              rows={2}
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="form-label">Recommended Schedule</label>
              <input
                type="text"
                className="form-input"
                value={formData.recommendedSchedule || ''}
                onChange={(e) => handleChange('recommendedSchedule', e.target.value)}
                placeholder="e.g. 2x per week (60 mins)"
              />
            </div>
            <div>
              <label className="form-label">Certification Awarded</label>
              <input
                type="text"
                className="form-input"
                value={formData.certification || ''}
                onChange={(e) => handleChange('certification', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="e.g. Algorithmic Logic, Scratch Coding, Cyber Safety"
            />
          </div>

          <div>
            <label className="form-label">Detailed Overview</label>
            <textarea
              className="form-input"
              rows={3}
              value={formData.overview || ''}
              onChange={(e) => handleChange('overview', e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Syllabus Modules (one per line)</label>
            <textarea
              className="form-input"
              rows={4}
              value={Array.isArray(formData.syllabus) ? formData.syllabus.join('\n') : ''}
              onChange={(e) => handleArrayChange('syllabus', e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Key Capstone Projects (one per line)</label>
            <textarea
              className="form-input"
              rows={3}
              value={Array.isArray(formData.projects) ? formData.projects.join('\n') : ''}
              onChange={(e) => handleArrayChange('projects', e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Prerequisites (one per line)</label>
            <textarea
              className="form-input"
              rows={2}
              value={Array.isArray(formData.prerequisites) ? formData.prerequisites.join('\n') : ''}
              onChange={(e) => handleArrayChange('prerequisites', e.target.value)}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary btn-sm"
            style={{
              gap: '0.35rem',
              color: 'var(--text-muted)',
            }}
            title="Reset track to default copy"
          >
            <RotateCcw size={13} />
            <span>Reset Track to Default</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary btn-sm"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 14px -2px rgba(16, 185, 129, 0.4)',
                gap: '0.35rem',
                fontWeight: 700,
              }}
            >
              <Save size={14} />
              <span>Save & Update Track</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
