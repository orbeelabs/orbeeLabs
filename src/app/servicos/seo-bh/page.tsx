import type { Metadata } from 'next';
import SeoBhClient from './SeoBhClient';

export const metadata: Metadata = {
  title: 'SEO Técnico em BH | Metodologia SEO-VX | Apareça no Google | Orbee Labs',
  description: 'SEO técnico em Belo Horizonte com metodologia proprietária SEO-VX. Resultados comprovados - primeira página em 60 dias. Auditoria SEO gratuita.',
  keywords: 'SEO BH, SEO técnico Belo Horizonte, SEO-VX, agência SEO BH, aparecer no Google BH',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos/seo-bh',
  },
  openGraph: {
    title: 'SEO Técnico em BH | Metodologia SEO-VX | Apareça no Google | Orbee Labs',
    description: 'SEO técnico em Belo Horizonte com metodologia proprietária SEO-VX. Resultados comprovados - primeira página em 60 dias. Auditoria SEO gratuita.',
    url: 'https://orbeelabs.com/servicos/seo-bh',
  },
};

export default function SEOPage() {
  return <SeoBhClient />;
}
