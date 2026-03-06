import type { Metadata } from 'next';
import AnalyticsClient from './AnalyticsClient';

export const metadata: Metadata = {
  title: 'Analytics e Business Intelligence em BH | Decisões Baseadas em Dados | Orbee Labs',
  description: 'Serviço de analytics e business intelligence em Belo Horizonte. Dashboards personalizados, relatórios automatizados, tracking avançado e insights acionáveis para decisões baseadas em dados reais.',
  keywords: 'analytics BH, business intelligence Belo Horizonte, Google Analytics BH, dashboard marketing, relatórios marketing digital, análise de dados BH',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos/analytics',
  },
  openGraph: {
    title: 'Analytics e Business Intelligence em BH | Orbee Labs',
    description: 'Transforme dados em decisões estratégicas com dashboards personalizados e insights acionáveis em Belo Horizonte.',
    url: 'https://orbeelabs.com/servicos/analytics',
  },
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
