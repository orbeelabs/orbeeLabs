import type { Metadata } from 'next';
import CarreirasClient from './CarreirasClient';

export const metadata: Metadata = {
  title: 'Carreiras | Trabalhe na Orbee Labs em Belo Horizonte',
  description: 'Vagas na Orbee Labs em BH. Oportunidades em marketing digital, desenvolvimento web, SEO e design.',
  keywords: 'vagas orbee labs, trabalhe conosco BH, emprego marketing digital',
  alternates: {
    canonical: 'https://orbeelabs.com/carreiras',
  },
  openGraph: {
    title: 'Carreiras | Trabalhe na Orbee Labs em Belo Horizonte',
    description: 'Vagas na Orbee Labs em BH. Oportunidades em marketing digital, desenvolvimento web, SEO e design.',
    url: 'https://orbeelabs.com/carreiras',
  },
};

export default function CarreirasPage() {
  return <CarreirasClient />;
}
