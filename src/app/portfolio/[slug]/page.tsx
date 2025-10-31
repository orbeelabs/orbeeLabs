import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import CaseStudyContent from '@/components/portfolio/CaseStudyContent';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { slug },
  });

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
      images: caseStudy.heroImage ? [caseStudy.heroImage] : [],
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  const caseStudy = await prisma.caseStudy.findUnique({
    where: { slug },
  });

  if (!caseStudy || !caseStudy.published) {
    notFound();
  }

  // Buscar cases relacionados
  const relatedCases = await prisma.caseStudy.findMany({
    where: {
      industry: caseStudy.industry,
      published: true,
      id: { not: caseStudy.id },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      clientName: true,
      industry: true,
      services: true,
      technologies: true,
      duration: true,
      featured: true,
      publishedAt: true,
      heroImage: true,
    },
  });

  const breadcrumbItems = [
    { name: 'Início', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: caseStudy.title, url: `/portfolio/${caseStudy.slug}` },
  ];

  return <CaseStudyContent caseStudy={caseStudy} relatedCases={relatedCases} breadcrumbItems={breadcrumbItems} />;
}

