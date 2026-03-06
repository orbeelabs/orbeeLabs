import type { Metadata } from 'next';
import LandingPagesClient from './LandingPagesClient';

export const metadata: Metadata = {
  title: 'Landing Pages de Alta Conversão em BH | Transforme Visitantes em Clientes | Orbee Labs',
  description: 'Criação de landing pages de alta conversão em Belo Horizonte. Taxa de conversão 5-15%, performance 98+, copywriting persuasivo e A/B testing integrado. ROI médio de 10x.',
  keywords: 'landing page BH, landing page alta conversão, criação landing page Belo Horizonte, página de captura BH, landing page otimizada',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos/landing-pages',
  },
  openGraph: {
    title: 'Landing Pages de Alta Conversão em BH | Orbee Labs',
    description: 'Landing pages otimizadas para conversão com performance 98+ e ROI médio de 10x em Belo Horizonte.',
    url: 'https://orbeelabs.com/servicos/landing-pages',
  },
};

export default function LandingPagesPage() {
  return <LandingPagesClient />;
}
