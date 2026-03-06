import type { Metadata } from 'next';
import CookiesClient from './CookiesClient';

export const metadata: Metadata = {
  title: 'Política de Cookies | Orbee Labs',
  description: 'Política de cookies da Orbee Labs. Como utilizamos cookies para melhorar sua experiência.',
  keywords: 'política cookies, cookies site',
  alternates: {
    canonical: 'https://orbeelabs.com/cookies',
  },
  openGraph: {
    title: 'Política de Cookies | Orbee Labs',
    description: 'Política de cookies da Orbee Labs. Como utilizamos cookies para melhorar sua experiência.',
    url: 'https://orbeelabs.com/cookies',
  },
};

export default function CookiesPage() {
  return <CookiesClient />;
}
