'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Course } from '@/types';
import { LocalDataService } from '@/lib/supabase/client';
import CurriculumEditor from '@/components/instructor/CurriculumEditor';
import AccessGuard from '@/components/auth/AccessGuard';

export default function CourseBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const found = LocalDataService.getCourseById(courseId);
    if (found) {
      setCourse(found);
    }
  }, [courseId]);

  return (
    <AccessGuard level="instructor" pageTitle="Curriculum Course Builder">
      {!course ? (
        <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem', color: '#ffffff' }}>Loading Course Curriculum...</h2>
        </div>
      ) : (
        <div className="container" style={{ padding: '2.5rem 1.5rem 6rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <Link href="/instructor" className="btn btn-secondary btn-sm">
              <ArrowLeft size={16} />
              <span>Back to Instructor Studio</span>
            </Link>
          </div>

          <CurriculumEditor
            course={course}
            onCourseUpdated={(updated) => setCourse(updated)}
          />
        </div>
      )}
    </AccessGuard>
  );
}
