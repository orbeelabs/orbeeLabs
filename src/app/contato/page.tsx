import type { Metadata } from 'next';
import ContatoClient from './ContatoClient';

export const metadata: Metadata = {
  title: 'Contato | Fale com a Orbee Labs em Belo Horizonte',
  description: 'Entre em contato com a Orbee Labs em BH. Consultoria gratuita de marketing digital, SEO técnico e desenvolvimento web. Resposta em até 24h.',
  keywords: 'contato orbee labs, consultoria marketing digital BH, orçamento site BH',
  alternates: {
    canonical: 'https://orbeelabs.com/contato',
  },
  openGraph: {
    title: 'Contato | Fale com a Orbee Labs em Belo Horizonte',
    description: 'Entre em contato com a Orbee Labs em BH. Consultoria gratuita de marketing digital, SEO técnico e desenvolvimento web. Resposta em até 24h.',
    url: 'https://orbeelabs.com/contato',
  },
};

export default function ContatoPage() {
  return <ContatoClient />;
}
