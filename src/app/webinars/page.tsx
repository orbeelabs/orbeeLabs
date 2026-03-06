import type { Metadata } from 'next';
import WebinarsClient from './WebinarsClient';

export const metadata: Metadata = {
  title: 'Webinars de Marketing Digital e SEO | Orbee Labs',
  description: 'Webinars gratuitos sobre marketing digital, SEO técnico e desenvolvimento web com especialistas.',
  keywords: 'webinars marketing digital, webinar SEO, eventos marketing BH',
  alternates: {
    canonical: 'https://orbeelabs.com/webinars',
  },
  openGraph: {
    title: 'Webinars de Marketing Digital e SEO | Orbee Labs',
    description: 'Webinars gratuitos sobre marketing digital, SEO técnico e desenvolvimento web com especialistas.',
    url: 'https://orbeelabs.com/webinars',
  },
};

export default function WebinarsPage() {
  return <WebinarsClient />;
}
