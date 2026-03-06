import type { Metadata } from 'next';
import ConsultoriaMarketingDigitalClient from './ConsultoriaMarketingDigitalClient';

export const metadata: Metadata = {
  title: 'Consultoria em Marketing Digital em BH | Estratégia e Planejamento | Orbee Labs',
  description: 'Consultoria especializada em marketing digital em Belo Horizonte. Estratégia personalizada, planejamento executável, análise de mercado e definição de KPIs para crescimento sustentável.',
  keywords: 'consultoria marketing digital BH, consultoria SEO Belo Horizonte, planejamento marketing digital, estratégia digital BH, consultoria digital BH',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos/consultoria-marketing-digital',
  },
  openGraph: {
    title: 'Consultoria em Marketing Digital em BH | Orbee Labs',
    description: 'Estratégia, planejamento e orientação para crescer com marketing digital em Belo Horizonte.',
    url: 'https://orbeelabs.com/servicos/consultoria-marketing-digital',
  },
};

export default function ConsultoriaMarketingDigitalPage() {
  return <ConsultoriaMarketingDigitalClient />;
}
