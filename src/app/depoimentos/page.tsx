import type { Metadata } from 'next';
import DepoimentosClient from './DepoimentosClient';

export const metadata: Metadata = {
  title: 'Depoimentos de Clientes | Cases de Sucesso | Orbee Labs',
  description: 'Veja o que nossos clientes dizem sobre a Orbee Labs. Depoimentos reais de empresas em BH.',
  keywords: 'depoimentos orbee labs, avaliações clientes, cases sucesso BH',
  alternates: {
    canonical: 'https://orbeelabs.com/depoimentos',
  },
  openGraph: {
    title: 'Depoimentos de Clientes | Cases de Sucesso | Orbee Labs',
    description: 'Veja o que nossos clientes dizem sobre a Orbee Labs. Depoimentos reais de empresas em BH.',
    url: 'https://orbeelabs.com/depoimentos',
  },
};

export default function DepoimentosPage() {
  return <DepoimentosClient />;
}
