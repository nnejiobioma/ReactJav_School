import React from 'react';
import IntranetGuard from '@/components/intranet/IntranetGuard';

export default function CBTLayout({ children }: { children: React.ReactNode }) {
  return (
    <IntranetGuard requiredFeatureTitle="CBT Examination & Certification Center">
      {children}
    </IntranetGuard>
  );
}
