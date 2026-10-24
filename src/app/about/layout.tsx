import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ReactJav • Engineering Academy, Ethos & Global Mission',
  description: 'Discover the ReactJav story. Learn how we eliminate tutorial hell through production-grade engineering curricula, peer-to-peer accountability, timed CBT certifications, and 1-on-1 faculty mentorship.',
  openGraph: {
    title: 'About ReactJav • Engineering Academy & Global Mission',
    description: 'Master high-paying tech skills with verified outcomes, collaborative coding pods, and foundation-backed sponsorship grants.',
    url: 'https://www.reactjav.com/about',
    siteName: 'ReactJav School',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ReactJav • Engineering Academy & Global Mission',
    description: 'Learn hard things first. Production-ready software engineering, AI, and cloud architectures.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
