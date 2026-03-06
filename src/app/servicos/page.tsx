import type { Metadata } from 'next';
import ServicosClient from './ServicosClient';

export const metadata: Metadata = {
  title: 'Serviços de Marketing Digital e Desenvolvimento Web em BH | Orbee Labs',
  description: 'Soluções completas em marketing digital, SEO técnico e desenvolvimento web em Belo Horizonte. Metodologia SEO-VX, resultados mensuráveis e ROI comprovado.',
  keywords: 'serviços marketing digital BH, SEO BH, desenvolvimento web Belo Horizonte, agência digital BH',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos',
  },
  openGraph: {
    title: 'Serviços de Marketing Digital e Desenvolvimento Web em BH | Orbee Labs',
    description: 'Soluções completas em marketing digital, SEO técnico e desenvolvimento web em Belo Horizonte. Metodologia SEO-VX, resultados mensuráveis e ROI comprovado.',
    url: 'https://orbeelabs.com/servicos',
  },
};

export default function ServicesPage() {
  return <ServicosClient />;
}
