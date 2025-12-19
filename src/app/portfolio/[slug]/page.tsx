import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPortfolioCase, fetchPortfolioCases } from '@/lib/cms';
import CaseStudyContent from '@/components/portfolio/CaseStudyContent';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await fetchPortfolioCase(slug);

  if (!caseStudy || !caseStudy.published) {
    return {
      title: 'Case não encontrado',
    };
  }

  return {
    title: `${caseStudy.title} | Portfolio Orbee Labs`,
    description: caseStudy.description,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      images: caseStudy.heroImage ? [caseStudy.heroImage] : ['/images/portfolio/default-hero.jpg'],
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  const caseStudy = await fetchPortfolioCase(slug);

  if (!caseStudy || !caseStudy.published) {
    notFound();
  }

  // Buscar cases relacionados
  const { cases: relatedCasesData } = await fetchPortfolioCases({
    industry: caseStudy.industry,
    published: true,
    limit: 3,
    sortBy: 'publishedAt',
    sortOrder: 'desc',
  });
  
  // Filtrar o case atual dos relacionados
  const relatedCases = relatedCasesData
    .filter((c) => c.id !== caseStudy.id)
    .slice(0, 3)
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description,
      clientName: c.clientName,
      industry: c.industry,
      services: c.services,
      technologies: c.technologies,
      duration: c.duration,
      featured: c.featured,
      publishedAt: c.publishedAt,
      heroImage: c.heroImage,
    }));

  const breadcrumbItems = [
    { name: 'Início', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: caseStudy.title, url: `/portfolio/${caseStudy.slug}` },
  ];

  return <CaseStudyContent caseStudy={caseStudy} relatedCases={relatedCases} breadcrumbItems={breadcrumbItems} />;
}

