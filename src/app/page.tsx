import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Orbee Labs — A Única Agência em BH com SEO Arquitetural | Marketing Digital e Desenvolvimento Web',
  description: 'Agência de marketing digital e desenvolvimento web em Belo Horizonte. Metodologia proprietária SEO-VX: sites construídos PARA o SEO desde o código. Resultados 3x mais rápidos, Core Web Vitals perfeitos, ROI de 12:1.',
  keywords: 'agência de SEO BH, SEO arquitetural, marketing digital Belo Horizonte, SEO técnico BH, desenvolvimento web BH, SEO-VX, agência digital BH, criação de sites BH',
  alternates: {
    canonical: 'https://orbeelabs.com',
  },
  openGraph: {
    title: 'Orbee Labs — A Única Agência em BH com SEO Arquitetural',
    description: 'Enquanto 100% dos concorrentes em BH usam WordPress, nós construímos cada linha de código para máxima performance e visibilidade orgânica. Resultados 3x mais rápidos.',
    url: 'https://orbeelabs.com',
    images: [
      {
        url: 'https://orbeelabs.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Orbee Labs — Marketing Digital e Desenvolvimento Web em BH',
      },
    ],
  },
};

export default function Home() {
  return <HomeClient />;
}
