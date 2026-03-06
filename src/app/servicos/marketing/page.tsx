import type { Metadata } from 'next';
import MarketingClient from './MarketingClient';

export const metadata: Metadata = {
  title: 'Marketing Digital Estratégico em BH | Crescimento Sustentável e Mensurável | Orbee Labs',
  description: 'Serviço de marketing digital estratégico em Belo Horizonte. Estratégias data-driven integradas com SEO, Google Ads, Email Marketing e automação para crescimento sustentável e ROI mensurável.',
  keywords: 'marketing digital BH, marketing digital Belo Horizonte, estratégia marketing digital, marketing data-driven, automação marketing BH, agência marketing digital BH',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos/marketing',
  },
  openGraph: {
    title: 'Marketing Digital Estratégico em BH | Orbee Labs',
    description: 'Estratégias data-driven integradas para crescimento sustentável e ROI mensurável em Belo Horizonte.',
    url: 'https://orbeelabs.com/servicos/marketing',
  },
};

export default function MarketingPage() {
  return <MarketingClient />;
}
