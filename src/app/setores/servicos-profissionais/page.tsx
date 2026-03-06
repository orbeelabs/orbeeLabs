import type { Metadata } from 'next';
import ServicosProfissionaisClient from './ServicosProfissionaisClient';

export const metadata: Metadata = {
  title: 'Marketing Digital para Serviços Profissionais em BH | Orbee Labs',
  description: 'Marketing digital para advogados, contadores e consultores em Belo Horizonte. SEO local e captação de clientes.',
  keywords: 'marketing digital serviços profissionais BH, SEO advocacia BH',
  alternates: {
    canonical: 'https://orbeelabs.com/setores/servicos-profissionais',
  },
  openGraph: {
    title: 'Marketing Digital para Serviços Profissionais em BH | Orbee Labs',
    description: 'Marketing digital para advogados, contadores e consultores em Belo Horizonte. SEO local e captação de clientes.',
    url: 'https://orbeelabs.com/setores/servicos-profissionais',
  },
};

export default function ServicosProfissionaisPage() {
  return <ServicosProfissionaisClient />;
}
