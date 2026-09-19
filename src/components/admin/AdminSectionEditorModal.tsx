'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { SiteContentConfig } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';

interface AdminSectionEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionKey: keyof SiteContentConfig | null;
  sectionTitle: string;
  onSaved?: () => void;
}

export default function AdminSectionEditorModal({
  isOpen,
  onClose,
  sectionKey,
  sectionTitle,
  onSaved,
}: AdminSectionEditorModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && sectionKey) {
      const siteContent = LocalDataService.getSiteContent();
      setFormData(siteContent[sectionKey] ? JSON.parse(JSON.stringify(siteContent[sectionKey])) : {});
    }
  }, [isOpen, sectionKey]);

  if (!isOpen || !sectionKey) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedArrayChange = (arrayKey: string, index: number, field: string, value: any) => {
    setFormData((prev: any) => {
      const arr = Array.isArray(prev[arrayKey]) ? [...prev[arrayKey]] : [];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [arrayKey]: arr };
    });
  };

  const handleBulletsTextareaChange = (field: string, text: string) => {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    setFormData((prev: any) => ({
      ...prev,
      [field]: lines,
    }));
  };

  const handleSave = () => {
    if (!sectionKey) return;
    LocalDataService.updateSiteSection(sectionKey, formData);
    showToast('Section saved successfully! Live changes applied.');
    if (onSaved) onSaved();
    setTimeout(() => {
      onClose();
    }, 450);
  };

  const handleReset = () => {
    if (!sectionKey) return;
    if (confirm(`Reset "${sectionTitle}" back to original default copy?`)) {
      const restored = LocalDataService.resetSiteSection(sectionKey);
      setFormData(JSON.parse(JSON.stringify(restored[sectionKey])));
      showToast('Section reset to default copy.');
      if (onSaved) onSaved();
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.2)',
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
                width: '32px',
                height: '32px',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={16} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Edit Section: {sectionTitle}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Administrator Content Management System (Live In-Place Editor)
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

        {/* Modal Body: Dynamic Fields */}
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

          {/* HERO SECTION FIELDS */}
          {sectionKey === 'hero' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Announcement Badge</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.announcement_badge || ''}
                    onChange={(e) => handleChange('announcement_badge', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Announcement Link Text</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.announcement_link_text || ''}
                    onChange={(e) => handleChange('announcement_link_text', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Announcement Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.announcement_text || ''}
                  onChange={(e) => handleChange('announcement_text', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Hero Eyebrow</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.eyebrow || ''}
                  onChange={(e) => handleChange('eyebrow', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Headline Prefix</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title_prefix || ''}
                    onChange={(e) => handleChange('title_prefix', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Headline Gradient Highlight</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title_highlight || ''}
                    onChange={(e) => handleChange('title_highlight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Subtitle / Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Search Placeholder</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.search_placeholder || ''}
                  onChange={(e) => handleChange('search_placeholder', e.target.value)}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>
                  Hero Metrics (4 Cards)
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Metric 1 Value</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.metric_1_value || ''}
                      onChange={(e) => handleChange('metric_1_value', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 1 Label</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.metric_1_label || ''}
                      onChange={(e) => handleChange('metric_1_label', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Metric 2 Value</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.metric_2_value || ''}
                      onChange={(e) => handleChange('metric_2_value', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 2 Label</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.metric_2_label || ''}
                      onChange={(e) => handleChange('metric_2_label', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Metric 3 Value</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.metric_3_value || ''}
                      onChange={(e) => handleChange('metric_3_value', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 3 Label</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.metric_3_label || ''}
                      onChange={(e) => handleChange('metric_3_label', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Metric 4 Value</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.metric_4_value || ''}
                      onChange={(e) => handleChange('metric_4_value', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 4 Label</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.metric_4_label || ''}
                      onChange={(e) => handleChange('metric_4_label', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* FLAGSHIP SPOTLIGHT SECTION */}
          {sectionKey === 'flagship' && (
            <>
              <div>
                <label className="form-label">Flagship Badge Tag</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.badge || ''}
                  onChange={(e) => handleChange('badge', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Programme Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Next Intake</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.next_intake || ''}
                    onChange={(e) => handleChange('next_intake', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.duration || ''}
                    onChange={(e) => handleChange('duration', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Sponsorship Note</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.sponsorship || ''}
                    onChange={(e) => handleChange('sponsorship', e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Primary CTA Button Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_primary_text || ''}
                    onChange={(e) => handleChange('cta_primary_text', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Secondary CTA Button Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_secondary_text || ''}
                    onChange={(e) => handleChange('cta_secondary_text', e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Partner Badge</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.partner_badge || ''}
                    onChange={(e) => handleChange('partner_badge', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Enrolled Count Text</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.enrolled_count_text || ''}
                    onChange={(e) => handleChange('enrolled_count_text', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Thumbnail Image URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.thumbnail_url || ''}
                  onChange={(e) => handleChange('thumbnail_url', e.target.value)}
                />
              </div>
            </>
          )}

          {/* PARTITION ARCHITECTURE GATEWAY */}
          {sectionKey === 'partition_gateway' && (
            <>
              <div>
                <label className="form-label">Section Eyebrow</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.eyebrow || ''}
                  onChange={(e) => handleChange('eyebrow', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Title Prefix</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title_prefix || ''}
                    onChange={(e) => handleChange('title_prefix', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Public Highlight</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title_public_highlight || ''}
                    onChange={(e) => handleChange('title_public_highlight', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Intranet Highlight</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title_intranet_highlight || ''}
                    onChange={(e) => handleChange('title_intranet_highlight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Subtitle</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              {/* Public Catalog Card */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)', display: 'block', marginBottom: '0.5rem' }}>
                  Part 1: The Public Catalog
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label className="form-label">Card Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.public_title || ''}
                      onChange={(e) => handleChange('public_title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Badge</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.public_badge || ''}
                      onChange={(e) => handleChange('public_badge', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    value={formData.public_description || ''}
                    onChange={(e) => handleChange('public_description', e.target.value)}
                  />
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <label className="form-label">Feature Bullets (one per line)</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={Array.isArray(formData.public_bullets) ? formData.public_bullets.join('\n') : ''}
                    onChange={(e) => handleBulletsTextareaChange('public_bullets', e.target.value)}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
                  <div>
                    <label className="form-label">CTA 1 Label</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.public_cta_1_text || ''}
                      onChange={(e) => handleChange('public_cta_1_text', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">CTA 2 Label</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.public_cta_2_text || ''}
                      onChange={(e) => handleChange('public_cta_2_text', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Campus Intranet Card */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981', display: 'block', marginBottom: '0.5rem' }}>
                  Part 2: The Campus Intranet
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label className="form-label">Card Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.intranet_title || ''}
                      onChange={(e) => handleChange('intranet_title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Badge</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.intranet_badge || ''}
                      onChange={(e) => handleChange('intranet_badge', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    value={formData.intranet_description || ''}
                    onChange={(e) => handleChange('intranet_description', e.target.value)}
                  />
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <label className="form-label">Feature Bullets (one per line)</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={Array.isArray(formData.intranet_bullets) ? formData.intranet_bullets.join('\n') : ''}
                    onChange={(e) => handleBulletsTextareaChange('intranet_bullets', e.target.value)}
                  />
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <label className="form-label">CTA Button Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.intranet_cta_text || ''}
                    onChange={(e) => handleChange('intranet_cta_text', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* LEARNING MODEL / FRAMEWORK */}
          {sectionKey === 'learning_model' && (
            <>
              <div>
                <label className="form-label">Section Eyebrow</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.eyebrow || ''}
                  onChange={(e) => handleChange('eyebrow', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Section Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Subtitle</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>
                  Framework Pillars (4 Cards)
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {Array.isArray(formData.pillars) &&
                    formData.pillars.map((pil: any, pIdx: number) => (
                      <div
                        key={pil.id || pIdx}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '0.65rem',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <div>
                            <label className="form-label">Pillar #{pIdx + 1} Title</label>
                            <input
                              type="text"
                              className="form-input"
                              value={pil.title || ''}
                              onChange={(e) => handleNestedArrayChange('pillars', pIdx, 'title', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="form-label">Tag Badge</label>
                            <input
                              type="text"
                              className="form-input"
                              value={pil.tag || ''}
                              onChange={(e) => handleNestedArrayChange('pillars', pIdx, 'tag', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-input"
                            rows={2}
                            value={pil.description || ''}
                            onChange={(e) => handleNestedArrayChange('pillars', pIdx, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          {/* DIRECT TUTORING SECTION */}
          {sectionKey === 'direct_tutoring' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Badge Tag</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.badge || ''}
                    onChange={(e) => handleChange('badge', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Section Eyebrow</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.eyebrow || ''}
                    onChange={(e) => handleChange('eyebrow', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Section Headline</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>
                  Zone Cards (3 Zones)
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label className="form-label">Zone 01 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.zone_1_title || ''}
                      onChange={(e) => handleChange('zone_1_title', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.35rem' }}>Zone 01 Description</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      value={formData.zone_1_desc || ''}
                      onChange={(e) => handleChange('zone_1_desc', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label">Zone 02 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.zone_2_title || ''}
                      onChange={(e) => handleChange('zone_2_title', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.35rem' }}>Zone 02 Description</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      value={formData.zone_2_desc || ''}
                      onChange={(e) => handleChange('zone_2_desc', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label">Zone 03 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.zone_3_title || ''}
                      onChange={(e) => handleChange('zone_3_title', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.35rem' }}>Zone 03 Description</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      value={formData.zone_3_desc || ''}
                      onChange={(e) => handleChange('zone_3_desc', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div>
                  <label className="form-label">Primary CTA Button Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_primary_text || ''}
                    onChange={(e) => handleChange('cta_primary_text', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">WhatsApp CTA Button Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_whatsapp_text || ''}
                    onChange={(e) => handleChange('cta_whatsapp_text', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* TESTIMONIALS SECTION */}
          {sectionKey === 'testimonials' && (
            <>
              <div>
                <label className="form-label">Section Eyebrow</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.eyebrow || ''}
                  onChange={(e) => handleChange('eyebrow', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Headline</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Subtitle</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>
                  Learner Testimonial Cards
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {Array.isArray(formData.items) &&
                    formData.items.map((item: any, idx: number) => (
                      <div
                        key={item.id || idx}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '0.65rem',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <div>
                            <label className="form-label">Student Name</label>
                            <input
                              type="text"
                              className="form-input"
                              value={item.name || ''}
                              onChange={(e) => handleNestedArrayChange('items', idx, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="form-label">Career Role / Company</label>
                            <input
                              type="text"
                              className="form-input"
                              value={item.role || ''}
                              onChange={(e) => handleNestedArrayChange('items', idx, 'role', e.target.value)}
                            />
                          </div>
                        </div>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <label className="form-label">Quote / Review</label>
                          <textarea
                            className="form-input"
                            rows={2}
                            value={item.quote || ''}
                            onChange={(e) => handleNestedArrayChange('items', idx, 'quote', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="form-label">Outcome / Track Tag</label>
                          <input
                            type="text"
                            className="form-input"
                            value={item.outcome || ''}
                            onChange={(e) => handleNestedArrayChange('items', idx, 'outcome', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          {/* FAQ SECTION */}
          {sectionKey === 'faq' && (
            <>
              <div>
                <label className="form-label">Section Eyebrow</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.eyebrow || ''}
                  onChange={(e) => handleChange('eyebrow', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Headline</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Subtitle</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>
                  Frequently Asked Questions ({formData.items?.length || 0})
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {Array.isArray(formData.items) &&
                    formData.items.map((item: any, idx: number) => (
                      <div
                        key={item.id || idx}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '0.65rem',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <div style={{ marginBottom: '0.5rem' }}>
                          <label className="form-label">Question #{idx + 1}</label>
                          <input
                            type="text"
                            className="form-input"
                            value={item.question || ''}
                            onChange={(e) => handleNestedArrayChange('items', idx, 'question', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="form-label">Answer</label>
                          <textarea
                            className="form-input"
                            rows={3}
                            value={item.answer || ''}
                            onChange={(e) => handleNestedArrayChange('items', idx, 'answer', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          {/* BOTTOM CTA SECTION */}
          {sectionKey === 'bottom_cta' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Headline Prefix</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title_prefix || ''}
                    onChange={(e) => handleChange('title_prefix', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Headline Highlight</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title_highlight || ''}
                    onChange={(e) => handleChange('title_highlight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Subtitle</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Primary CTA Button</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_primary_text || ''}
                    onChange={(e) => handleChange('cta_primary_text', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Secondary CTA Button</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_secondary_text || ''}
                    onChange={(e) => handleChange('cta_secondary_text', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* FOOTER SECTION */}
          {sectionKey === 'footer' && (
            <>
              <div>
                <label className="form-label">Brand Tagline / Mission Statement</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={formData.brand_tagline || ''}
                  onChange={(e) => handleChange('brand_tagline', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Mission Badge Tag</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.mission_badge || ''}
                  onChange={(e) => handleChange('mission_badge', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Copyright Text</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.copyright_text || ''}
                  onChange={(e) => handleChange('copyright_text', e.target.value)}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>
                  Alliances & Network Points
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <label className="form-label">Alliance 1</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.alliance_1 || ''}
                      onChange={(e) => handleChange('alliance_1', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Alliance 2</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.alliance_2 || ''}
                      onChange={(e) => handleChange('alliance_2', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Alliance 3</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.alliance_3 || ''}
                      onChange={(e) => handleChange('alliance_3', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* DIRECT TUTORING PAGE: HERO SECTION */}
          {sectionKey === 'tutoring_hero' && (
            <>
              <div>
                <label className="form-label">Hero Badge Tag</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.badge || ''}
                  onChange={(e) => handleChange('badge', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Headline Prefix</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title_prefix || ''}
                    onChange={(e) => handleChange('title_prefix', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Headline Highlight (Gradient)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title_highlight || ''}
                    onChange={(e) => handleChange('title_highlight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Subtitle / Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div>
                  <label className="form-label">Primary CTA Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_primary_text || ''}
                    onChange={(e) => handleChange('cta_primary_text', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Secondary CTA Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_secondary_text || ''}
                    onChange={(e) => handleChange('cta_secondary_text', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">WhatsApp CTA Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_whatsapp_text || ''}
                    onChange={(e) => handleChange('cta_whatsapp_text', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* DIRECT TUTORING PAGE: LEARNING ZONES HEADER */}
          {sectionKey === 'tutoring_zones' && (
            <>
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '0.75rem' }}>
                  Zone 01 Header & Scope
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label className="form-label">Zone 01 Badge</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.zone_1_badge || ''}
                      onChange={(e) => handleChange('zone_1_badge', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Zone 01 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.zone_1_title || ''}
                      onChange={(e) => handleChange('zone_1_title', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Zone 01 Description / Scope</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    value={formData.zone_1_subtitle || ''}
                    onChange={(e) => handleChange('zone_1_subtitle', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-purple)', display: 'block', marginBottom: '0.75rem' }}>
                  Zone 02 Header & Scope
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label className="form-label">Zone 02 Badge</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.zone_2_badge || ''}
                      onChange={(e) => handleChange('zone_2_badge', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">Zone 02 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.zone_2_title || ''}
                      onChange={(e) => handleChange('zone_2_title', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Zone 02 Description / Scope</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    value={formData.zone_2_subtitle || ''}
                    onChange={(e) => handleChange('zone_2_subtitle', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* DIRECT TUTORING PAGE: IMPACT METRICS */}
          {sectionKey === 'tutoring_metrics' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ padding: '0.85rem', borderRadius: '0.75rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <label className="form-label">Metric 1 Value</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_1_value || ''}
                    onChange={(e) => handleChange('metric_1_value', e.target.value)}
                  />
                  <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 1 Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_1_label || ''}
                    onChange={(e) => handleChange('metric_1_label', e.target.value)}
                  />
                  <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 1 Subtitle</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_1_sub || ''}
                    onChange={(e) => handleChange('metric_1_sub', e.target.value)}
                  />
                </div>

                <div style={{ padding: '0.85rem', borderRadius: '0.75rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <label className="form-label">Metric 2 Value</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_2_value || ''}
                    onChange={(e) => handleChange('metric_2_value', e.target.value)}
                  />
                  <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 2 Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_2_label || ''}
                    onChange={(e) => handleChange('metric_2_label', e.target.value)}
                  />
                  <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 2 Subtitle</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_2_sub || ''}
                    onChange={(e) => handleChange('metric_2_sub', e.target.value)}
                  />
                </div>

                <div style={{ padding: '0.85rem', borderRadius: '0.75rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <label className="form-label">Metric 3 Value</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_3_value || ''}
                    onChange={(e) => handleChange('metric_3_value', e.target.value)}
                  />
                  <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 3 Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_3_label || ''}
                    onChange={(e) => handleChange('metric_3_label', e.target.value)}
                  />
                  <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 3 Subtitle</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_3_sub || ''}
                    onChange={(e) => handleChange('metric_3_sub', e.target.value)}
                  />
                </div>

                <div style={{ padding: '0.85rem', borderRadius: '0.75rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <label className="form-label">Metric 4 Value</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_4_value || ''}
                    onChange={(e) => handleChange('metric_4_value', e.target.value)}
                  />
                  <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 4 Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_4_label || ''}
                    onChange={(e) => handleChange('metric_4_label', e.target.value)}
                  />
                  <label className="form-label" style={{ marginTop: '0.4rem' }}>Metric 4 Subtitle</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metric_4_sub || ''}
                    onChange={(e) => handleChange('metric_4_sub', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* DIRECT TUTORING PAGE: WHY 1-ON-1 WORKS (PERKS) */}
          {sectionKey === 'tutoring_perks' && (
            <>
              <div>
                <label className="form-label">Section Badge</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.badge || ''}
                  onChange={(e) => handleChange('badge', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Section Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Section Subtitle</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>
                  Tutoring Perks (4 Cards)
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '0.65rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                    <label className="form-label">Perk 1 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.perk_1_title || ''}
                      onChange={(e) => handleChange('perk_1_title', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.35rem' }}>Perk 1 Description</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      value={formData.perk_1_desc || ''}
                      onChange={(e) => handleChange('perk_1_desc', e.target.value)}
                    />
                  </div>

                  <div style={{ padding: '0.75rem', borderRadius: '0.65rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                    <label className="form-label">Perk 2 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.perk_2_title || ''}
                      onChange={(e) => handleChange('perk_2_title', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.35rem' }}>Perk 2 Description</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      value={formData.perk_2_desc || ''}
                      onChange={(e) => handleChange('perk_2_desc', e.target.value)}
                    />
                  </div>

                  <div style={{ padding: '0.75rem', borderRadius: '0.65rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                    <label className="form-label">Perk 3 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.perk_3_title || ''}
                      onChange={(e) => handleChange('perk_3_title', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.35rem' }}>Perk 3 Description</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      value={formData.perk_3_desc || ''}
                      onChange={(e) => handleChange('perk_3_desc', e.target.value)}
                    />
                  </div>

                  <div style={{ padding: '0.75rem', borderRadius: '0.65rem', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>
                    <label className="form-label">Perk 4 Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.perk_4_title || ''}
                      onChange={(e) => handleChange('perk_4_title', e.target.value)}
                    />
                    <label className="form-label" style={{ marginTop: '0.35rem' }}>Perk 4 Description</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      value={formData.perk_4_desc || ''}
                      onChange={(e) => handleChange('perk_4_desc', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* DIRECT TUTORING PAGE: BOTTOM CTA */}
          {sectionKey === 'tutoring_bottom_cta' && (
            <>
              <div>
                <label className="form-label">Banner Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Banner Subtitle / Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={formData.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div>
                  <label className="form-label">Primary CTA Button Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_primary_text || ''}
                    onChange={(e) => handleChange('cta_primary_text', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">WhatsApp CTA Button Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cta_whatsapp_text || ''}
                    onChange={(e) => handleChange('cta_whatsapp_text', e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
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
            title="Reset this section to default factory copy"
          >
            <RotateCcw size={13} />
            <span>Reset to Default</span>
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
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                boxShadow: '0 4px 14px -2px rgba(79, 70, 229, 0.5)',
                gap: '0.35rem',
                fontWeight: 700,
              }}
            >
              <Save size={14} />
              <span>Save & Publish Live</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
