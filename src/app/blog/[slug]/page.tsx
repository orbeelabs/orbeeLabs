import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchBlogPost, fetchBlogPosts } from '@/lib/cms';
import BlogPostContent from '@/components/blog/BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post || !post.published) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || '',
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || '',
      images: post.ogImage ? [post.ogImage] : [],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || '',
      images: post.ogImage ? [post.ogImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await fetchBlogPost(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Buscar posts relacionados
  const { posts: relatedPostsData } = await fetchBlogPosts({
    category: post.category,
    published: true,
    limit: 3,
    sortBy: 'publishedAt',
    sortOrder: 'desc',
  });
  
  // Filtrar o post atual dos relacionados
  const relatedPosts = relatedPostsData
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const breadcrumbItems = [
    { name: 'Início', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return <BlogPostContent post={post} relatedPosts={relatedPosts} breadcrumbItems={breadcrumbItems} />;
}

