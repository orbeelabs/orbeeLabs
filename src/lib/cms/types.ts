/**
 * Tipos para integração com CMS Headless (Strapi)
 */

export interface CMSConfig {
  provider: 'strapi' | 'sanity' | 'prisma';
  apiUrl: string;
  apiToken?: string;
  revalidate?: number; // Tempo de revalidação em segundos
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiPost {
  id: number;
  attributes: {
    slug: string;
    title: string;
    excerpt?: string;
    content: string;
    author: string;
    authorImage?: string;
    category: string;
    tags: string[];
    featured: boolean;
    published: boolean;
    publishedAt: string | null;
    seoTitle?: string;
    seoDescription?: string;
    ogImage?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiCaseStudy {
  id: number;
  attributes: {
    slug: string;
    title: string;
    description: string;
    clientName?: string;
    industry: string;
    services: string[];
    technologies: string[];
    challenge: string;
    solution: string;
    results: string; // JSON string
    duration: string;
    timeline?: string;
    learnings?: string;
    heroImage?: string;
    gallery: string[];
    gscBefore?: string;
    gscAfter?: string;
    ga4Before?: string;
    ga4After?: string;
    cwvBefore?: string;
    cwvAfter?: string;
    featured: boolean;
    published: boolean;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiTestimonial {
  id: number;
  attributes: {
    name: string;
    role: string;
    company: string;
    quote: string;
    photo?: string;
    rating?: number;
    industry?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CMSFilters {
  category?: string;
  tag?: string;
  search?: string; // Busca por texto (title, excerpt, content)
  published?: boolean;
  featured?: boolean;
  industry?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

