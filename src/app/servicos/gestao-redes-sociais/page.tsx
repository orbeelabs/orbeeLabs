import type { Metadata } from 'next';
import GestaoRedesSociaisClient from './GestaoRedesSociaisClient';

export const metadata: Metadata = {
  title: 'Gestão de Redes Sociais em BH | Presença Digital e Engajamento | Orbee Labs',
  description: 'Gestão profissional de redes sociais em Belo Horizonte. Criação de conteúdo, estratégia de crescimento, gestão de comunidade e anúncios pagos no Instagram, Facebook e LinkedIn.',
  keywords: 'gestão redes sociais BH, social media Belo Horizonte, Instagram marketing BH, gestão Instagram BH, Facebook Ads BH, LinkedIn marketing BH',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos/gestao-redes-sociais',
  },
  openGraph: {
    title: 'Gestão de Redes Sociais em BH | Orbee Labs',
    description: 'Construa sua presença digital e engaje seu público com conteúdo estratégico em Belo Horizonte.',
    url: 'https://orbeelabs.com/servicos/gestao-redes-sociais',
  },
};

export default function GestaoRedesSociaisPage() {
  return <GestaoRedesSociaisClient />;
}
