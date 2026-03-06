import type { Metadata } from 'next';
import DesenvolvimentoWebBhClient from './DesenvolvimentoWebBhClient';

export const metadata: Metadata = {
  title: 'Desenvolvimento Web em BH | Sites de Alta Performance Next.js e React | Orbee Labs',
  description: 'Desenvolvimento web em Belo Horizonte com Next.js, React e TypeScript. Performance 98+, SEO integrado, carregamento em 0.7s. Sites que ranqueiam.',
  keywords: 'desenvolvimento web BH, criação sites Belo Horizonte, Next.js BH, React BH, sites alta performance',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos/desenvolvimento-web-bh',
  },
  openGraph: {
    title: 'Desenvolvimento Web em BH | Sites de Alta Performance Next.js e React | Orbee Labs',
    description: 'Desenvolvimento web em Belo Horizonte com Next.js, React e TypeScript. Performance 98+, SEO integrado, carregamento em 0.7s. Sites que ranqueiam.',
    url: 'https://orbeelabs.com/servicos/desenvolvimento-web-bh',
  },
};

export default function DesenvolvimentoWebPage() {
  return <DesenvolvimentoWebBhClient />;
}
