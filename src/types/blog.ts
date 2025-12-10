/**
 * Tipos compartilhados para Blog
 */

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  author: string;
  authorImage: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: Date | null;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostPreview {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  author: string;
  authorImage: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt: Date | null;
  ogImage: string | null;
}

export interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  author: string;
  category: string;
  tags: string[];
  publishedAt: Date | null;
  ogImage: string | null;
}

