import type { Metadata } from 'next';
import EducacaoClient from './EducacaoClient';

export const metadata: Metadata = {
  title: 'Marketing Digital para Educação em BH | Orbee Labs',
  description: 'Marketing digital para instituições de ensino e edtechs em Belo Horizonte. Estratégias de captação de alunos e SEO educacional.',
  keywords: 'marketing digital educação BH, SEO educacional Belo Horizonte',
  alternates: {
    canonical: 'https://orbeelabs.com/setores/educacao',
  },
  openGraph: {
    title: 'Marketing Digital para Educação em BH | Orbee Labs',
    description: 'Marketing digital para instituições de ensino e edtechs em Belo Horizonte. Estratégias de captação de alunos e SEO educacional.',
    url: 'https://orbeelabs.com/setores/educacao',
  },
};

export default function EducacaoPage() {
  return <EducacaoClient />;
}
