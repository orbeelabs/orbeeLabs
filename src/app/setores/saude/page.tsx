import type { Metadata } from 'next';
import SaudeClient from './SaudeClient';

export const metadata: Metadata = {
  title: 'Marketing Digital para Saúde em BH | Orbee Labs',
  description: 'Marketing digital especializado para clínicas e profissionais de saúde em Belo Horizonte. SEO médico e estratégias de captação de pacientes.',
  keywords: 'marketing digital saúde BH, SEO médico Belo Horizonte, site clínica BH',
  alternates: {
    canonical: 'https://orbeelabs.com/setores/saude',
  },
  openGraph: {
    title: 'Marketing Digital para Saúde em BH | Orbee Labs',
    description: 'Marketing digital especializado para clínicas e profissionais de saúde em Belo Horizonte. SEO médico e estratégias de captação de pacientes.',
    url: 'https://orbeelabs.com/setores/saude',
  },
};

export default function SaudePage() {
  return <SaudeClient />;
}
