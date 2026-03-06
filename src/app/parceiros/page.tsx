import type { Metadata } from 'next';
import ParceirosClient from './ParceirosClient';

export const metadata: Metadata = {
  title: 'Parceiros e Tecnologias | Orbee Labs',
  description: 'Conheça as tecnologias e parceiros da Orbee Labs. Stack tecnológica de ponta para resultados superiores.',
  keywords: 'parceiros orbee labs, tecnologias marketing digital',
  alternates: {
    canonical: 'https://orbeelabs.com/parceiros',
  },
  openGraph: {
    title: 'Parceiros e Tecnologias | Orbee Labs',
    description: 'Conheça as tecnologias e parceiros da Orbee Labs. Stack tecnológica de ponta para resultados superiores.',
    url: 'https://orbeelabs.com/parceiros',
  },
};

export default function ParceirosPage() {
  return <ParceirosClient />;
}
