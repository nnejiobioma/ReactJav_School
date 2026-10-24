import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us • Admissions, Support & Academic Office | ReactJav',
  description: 'Get in touch with the ReactJav School admissions desk, faculty advisors, and student support team. Chat on WhatsApp or send an academic inquiry.',
  openGraph: {
    title: 'Contact ReactJav • Admissions & Student Support',
    description: 'Reach our admissions advisors, faculty mentors, and sponsorship desk. We respond to all technical and academic inquiries within 24 hours.',
    url: 'https://www.reactjav.com/contact',
    siteName: 'ReactJav School',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ReactJav • Admissions & Student Support',
    description: 'Get in touch with the ReactJav team for admissions, direct tutoring, and foundation scholarship grants.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
