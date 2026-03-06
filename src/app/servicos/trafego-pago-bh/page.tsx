import type { Metadata } from 'next';
import TrafegoPagoBhClient from './TrafegoPagoBhClient';

export const metadata: Metadata = {
  title: 'Tráfego Pago em BH | Google Ads e Meta Ads | Orbee Labs',
  description: 'Gestão de tráfego pago em Belo Horizonte. Google Ads, Meta Ads e LinkedIn Ads com estratégia híbrida SEO+Ads. ROI comprovado e rastreamento completo.',
  keywords: 'tráfego pago BH, Google Ads Belo Horizonte, Meta Ads BH, Facebook Ads BH, gestão anúncios BH',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos/trafego-pago-bh',
  },
  openGraph: {
    title: 'Tráfego Pago em BH | Google Ads e Meta Ads | Orbee Labs',
    description: 'Gestão de tráfego pago em Belo Horizonte. Google Ads, Meta Ads e LinkedIn Ads com estratégia híbrida SEO+Ads. ROI comprovado e rastreamento completo.',
    url: 'https://orbeelabs.com/servicos/trafego-pago-bh',
  },
};

export default function TrafegoPagoPage() {
  return <TrafegoPagoBhClient />;
}
