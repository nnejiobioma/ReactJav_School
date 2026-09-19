'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Database, ShieldCheck, Video, Code2, GraduationCap, Globe, HeartHandshake, Sparkles } from 'lucide-react';
import { LocalDataService } from '@/lib/supabase/client';
import { DEFAULT_SITE_CONTENT } from '@/lib/supabase/defaultSiteContent';
import { SiteFooterContent } from '@/types';
import AdminEditableSection from '@/components/admin/AdminEditableSection';
import AdminSectionEditorModal from '@/components/admin/AdminSectionEditorModal';

export default function Footer() {
  const [footerContent, setFooterContent] = useState<SiteFooterContent>(DEFAULT_SITE_CONTENT.footer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadContent = () => {
      const config = LocalDataService.getSiteContent();
      setFooterContent(config.footer || DEFAULT_SITE_CONTENT.footer);
    };

    loadContent();

    const handleUpdate = () => {
      loadContent();
    };

    window.addEventListener('reactjav-site-content-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('reactjav-site-content-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <>
      <AdminEditableSection
        sectionKey="footer"
        sectionTitle="Platform Footer & Alliances"
        onEdit={() => setIsModalOpen(true)}
      >
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          padding: '4.5rem 0 2.5rem',
          marginTop: '6rem',
          transition: 'background-color 0.25s ease',
        }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2.5rem',
              marginBottom: '3.5rem',
            }}>
              {/* Col 1: Brand & Ethos */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '2.2rem',
                    height: '2.2rem',
                    borderRadius: '0.6rem',
                    background: 'var(--grad-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <GraduationCap size={18} color="#ffffff" />
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>React<span className="text-gradient">Jav</span></span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {footerContent.brand_tagline}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#f43f5e',
                  background: 'rgba(244, 63, 94, 0.1)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(244, 63, 94, 0.25)',
                }}>
                  <Sparkles size={12} />
                  <span>{footerContent.mission_badge}</span>
                </div>
              </div>

              {/* Col 2: Career Tracks */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Career Tracks
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <li>
                    <Link href="/courses" style={{ color: 'inherit', textDecoration: 'none' }}>
                      AI & Data Analytics
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Software Engineering & Cloud
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Creative & UI/UX Design
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Founder & Freelancer Academy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Campus & Facilities */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Campus Facilities
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <li>
                    <Link href="/intranet" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Campus Intranet Hub
                    </Link>
                  </li>
                  <li>
                    <Link href="/cbt" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Timed CBT Exam Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/live" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Live Virtual Rooms & Breakouts
                    </Link>
                  </li>
                  <li>
                    <Link href="/subscribe" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Tuition & Sponsorship Grants
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 4: Global Hubs & Alliance */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Alliances & Hubs
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HeartHandshake size={15} color="#10b981" />
                    <span>{footerContent.alliance_1}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={15} color="#38bdf8" />
                    <span>{footerContent.alliance_2}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={15} color="#818cf8" />
                    <span>{footerContent.alliance_3}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}>
              <div>
                {footerContent.copyright_text}
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Cookie Policy</span>
              </div>
            </div>
          </div>
        </footer>
      </AdminEditableSection>

      <AdminSectionEditorModal
        sectionKey="footer"
        sectionTitle="Platform Footer & Alliances"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={() => {
          const config = LocalDataService.getSiteContent();
          setFooterContent(config.footer || DEFAULT_SITE_CONTENT.footer);
        }}
      />
    </>
  );
}
