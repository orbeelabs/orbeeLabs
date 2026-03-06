import type { Metadata } from 'next';
import EcommerceClient from './EcommerceClient';

export const metadata: Metadata = {
  title: 'E-commerce de Alta Performance em BH | Lojas Virtuais que Convertem | Orbee Labs',
  description: 'Desenvolvimento de e-commerce e lojas virtuais em Belo Horizonte. Performance 98+, SEO integrado, otimização de conversão e experiência de compra excepcional. +200% de vendas online.',
  keywords: 'e-commerce BH, loja virtual Belo Horizonte, criar loja virtual BH, e-commerce alta performance, desenvolvimento loja online BH',
  alternates: {
    canonical: 'https://orbeelabs.com/servicos/ecommerce',
  },
  openGraph: {
    title: 'E-commerce de Alta Performance em BH | Orbee Labs',
    description: 'Lojas virtuais otimizadas para conversão, performance 98+ e vendas em Belo Horizonte.',
    url: 'https://orbeelabs.com/servicos/ecommerce',
  },
};

export default function EcommercePage() {
  return <EcommerceClient />;
}
