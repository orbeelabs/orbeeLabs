import type { Metadata } from 'next';
import RecursosClient from './RecursosClient';

export const metadata: Metadata = {
  title: 'Recursos e Materiais de Marketing Digital | Orbee Labs',
  description: 'Materiais gratuitos de marketing digital, SEO e desenvolvimento web. E-books, guias e ferramentas.',
  keywords: 'recursos marketing digital, materiais gratuitos SEO',
  alternates: {
    canonical: 'https://orbeelabs.com/recursos',
  },
  openGraph: {
    title: 'Recursos e Materiais de Marketing Digital | Orbee Labs',
    description: 'Materiais gratuitos de marketing digital, SEO e desenvolvimento web. E-books, guias e ferramentas.',
    url: 'https://orbeelabs.com/recursos',
  },
};

export default function RecursosPage() {
  return <RecursosClient />;
}
