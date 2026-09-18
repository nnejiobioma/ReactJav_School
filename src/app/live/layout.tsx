import React from 'react';
import IntranetGuard from '@/components/intranet/IntranetGuard';

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <IntranetGuard requiredFeatureTitle="Live Virtual Classrooms & Collaborative Pods">
      {children}
    </IntranetGuard>
  );
}
