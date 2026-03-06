import type { Metadata } from 'next';
import SobreClient from './SobreClient';

export const metadata: Metadata = {
  title: 'Sobre a Orbee Labs | Agência de Marketing Digital e Desenvolvimento Web em BH',
  description: 'Conheça a Orbee Labs, agência de marketing digital e desenvolvimento web em Belo Horizonte. Equipe especializada, metodologia SEO-VX e resultados comprovados.',
  keywords: 'sobre a orbee labs, equipe marketing digital BH, agência digital Belo Horizonte',
  alternates: {
    canonical: 'https://orbeelabs.com/sobre',
  },
  openGraph: {
    title: 'Sobre a Orbee Labs | Agência de Marketing Digital e Desenvolvimento Web em BH',
    description: 'Conheça a Orbee Labs, agência de marketing digital e desenvolvimento web em Belo Horizonte. Equipe especializada, metodologia SEO-VX e resultados comprovados.',
    url: 'https://orbeelabs.com/sobre',
  },
};

export default function SobrePage() {
  return <SobreClient />;
}
