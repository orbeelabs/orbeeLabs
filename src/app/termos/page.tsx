import type { Metadata } from 'next';
import TermosClient from './TermosClient';

export const metadata: Metadata = {
  title: 'Termos de Uso | Orbee Labs',
  description: 'Termos de uso do site da Orbee Labs. Condições gerais de utilização dos nossos serviços.',
  keywords: 'termos uso orbee labs',
  alternates: {
    canonical: 'https://orbeelabs.com/termos',
  },
  openGraph: {
    title: 'Termos de Uso | Orbee Labs',
    description: 'Termos de uso do site da Orbee Labs. Condições gerais de utilização dos nossos serviços.',
    url: 'https://orbeelabs.com/termos',
  },
};

export default function TermosPage() {
  return <TermosClient />;
}
