import type { Metadata } from 'next';
import PrivacidadeClient from './PrivacidadeClient';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Orbee Labs',
  description: 'Política de privacidade da Orbee Labs. Como coletamos, usamos e protegemos seus dados conforme a LGPD.',
  keywords: 'política privacidade, LGPD, proteção dados',
  alternates: {
    canonical: 'https://orbeelabs.com/privacidade',
  },
  openGraph: {
    title: 'Política de Privacidade | Orbee Labs',
    description: 'Política de privacidade da Orbee Labs. Como coletamos, usamos e protegemos seus dados conforme a LGPD.',
    url: 'https://orbeelabs.com/privacidade',
  },
};

export default function PrivacidadePage() {
  return <PrivacidadeClient />;
}
