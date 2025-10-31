import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import BlogCategoryPage from '@/components/blog/BlogCategoryPage';
import type { PostPreview } from '@/types/blog';

interface BlogCategoryProps {
  params: Promise<{ categoria: string }>;
}

const categoryMap: Record<string, string> = {
  'seo-avancado': 'SEO Avançado',
  'desenvolvimento-web': 'Desenvolvimento Web',
  'marketing-digital': 'Marketing Digital',
  'cases-reais': 'Cases Reais',
};

export async function generateMetadata({ params }: BlogCategoryProps): Promise<Metadata> {
  const { categoria } = await params;
  const categoryName = categoryMap[categoria] || categoria;

  return {
    title: `${categoryName} | Blog Orbee Labs`,
    description: `Artigos sobre ${categoryName} no blog da Orbee Labs. Aprenda estratégias comprovadas e metodologias que realmente funcionam.`,
  };
}

export default async function BlogCategory({ params }: BlogCategoryProps) {
  const { categoria } = await params;
  const categoryName = categoryMap[categoria] || categoria;

  // Verificar se a categoria existe
  const validCategories = ['SEO Avançado', 'Desenvolvimento Web', 'Marketing Digital', 'Cases Reais'];
  if (!validCategories.includes(categoryName)) {
    notFound();
  }

  // Buscar posts da categoria
  const posts: PostPreview[] = await prisma.post.findMany({
    where: {
      category: categoryName,
      published: true,
    },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      author: true,
      authorImage: true,
      category: true,
      tags: true,
      featured: true,
      publishedAt: true,
      ogImage: true,
    },
  });

  const breadcrumbItems = [
    { name: 'Início', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: categoryName, url: `/blog/categoria/${categoria}` },
  ];

  return <BlogCategoryPage categoryName={categoryName} posts={posts} breadcrumbItems={breadcrumbItems} />;
}

