import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import BlogCategoryPage from '@/components/blog/BlogCategoryPage';
import type { PostPreview } from '@/types/blog';
import type { Metadata } from 'next';

interface BlogTagProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: BlogTagProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Artigos sobre ${decodedTag} | Blog Orbee Labs`,
    description: `Explore todos os artigos sobre ${decodedTag} no blog da Orbee Labs. Conteúdo especializado em marketing digital, SEO e desenvolvimento web.`,
  };
}

export default async function BlogTag({ params }: BlogTagProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // Buscar posts com a tag
  const posts: PostPreview[] = await prisma.post.findMany({
    where: {
      tags: {
        has: decodedTag,
      },
      published: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
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

  // Se não houver posts, retornar 404
  if (posts.length === 0) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Início', url: 'https://orbeelabs.com' },
    { name: 'Blog', url: 'https://orbeelabs.com/blog' },
    { name: `Tag: ${decodedTag}`, url: `https://orbeelabs.com/blog/tag/${tag}` },
  ];

  return (
    <BlogCategoryPage
      categoryName={`Tag: ${decodedTag}`}
      posts={posts}
      breadcrumbItems={breadcrumbItems}
    />
  );
}

