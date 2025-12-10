/**
 * Cliente Strapi para integração com CMS Headless
 */

import { cmsConfig } from './config';
import { Logger } from '@/lib/logger';
import type {
  StrapiResponse,
  StrapiPost,
  StrapiCaseStudy,
  StrapiTestimonial,
  CMSFilters,
} from './types';
import type { Post, PostPreview } from '@/types/blog';
import type { CaseStudy } from '@/types/portfolio';

/**
 * Função auxiliar para fazer requisições ao Strapi
 */
async function strapiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { apiUrl, apiToken, revalidate } = cmsConfig;

  if (!apiUrl) {
    throw new Error('STRAPI_API_URL não está configurado');
  }

  const url = `${apiUrl}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (apiToken) {
    headers['Authorization'] = `Bearer ${apiToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    next: {
      revalidate: revalidate,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar dados do Strapi: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Converte StrapiPost para Post (formato da aplicação)
 */
function mapStrapiPostToPost(strapiPost: StrapiPost): Post {
  const { attributes, id } = strapiPost;
  return {
    id: id.toString(),
    slug: attributes.slug,
    title: attributes.title,
    excerpt: attributes.excerpt || null,
    content: attributes.content,
    author: attributes.author,
    authorImage: attributes.authorImage || null,
    category: attributes.category,
    tags: attributes.tags || [],
    featured: attributes.featured,
    published: attributes.published,
    publishedAt: attributes.publishedAt ? new Date(attributes.publishedAt) : null,
    seoTitle: attributes.seoTitle || null,
    seoDescription: attributes.seoDescription || null,
    ogImage: attributes.ogImage || null,
    createdAt: new Date(attributes.createdAt),
    updatedAt: new Date(attributes.updatedAt),
  };
}

/**
 * Converte StrapiCaseStudy para CaseStudy (formato da aplicação)
 */
function mapStrapiCaseStudyToCaseStudy(strapiCase: StrapiCaseStudy): CaseStudy {
  const { attributes, id } = strapiCase;
  return {
    id: id.toString(),
    slug: attributes.slug,
    title: attributes.title,
    description: attributes.description,
    clientName: attributes.clientName || null,
    industry: attributes.industry,
    services: attributes.services || [],
    technologies: attributes.technologies || [],
    challenge: attributes.challenge,
    solution: attributes.solution,
    results: attributes.results,
    duration: attributes.duration,
    timeline: attributes.timeline || null,
    learnings: attributes.learnings || null,
    heroImage: attributes.heroImage || null,
    gallery: attributes.gallery || [],
    gscBefore: attributes.gscBefore || null,
    gscAfter: attributes.gscAfter || null,
    ga4Before: attributes.ga4Before || null,
    ga4After: attributes.ga4After || null,
    cwvBefore: attributes.cwvBefore || null,
    cwvAfter: attributes.cwvAfter || null,
    featured: attributes.featured,
    published: attributes.published,
    publishedAt: new Date(attributes.publishedAt),
    createdAt: new Date(attributes.createdAt),
    updatedAt: new Date(attributes.updatedAt),
  };
}

/**
 * Constrói query string para filtros do Strapi
 */
function buildStrapiQuery(filters: CMSFilters = {}): string {
  const params = new URLSearchParams();

  // Filtros
  if (filters.published !== undefined) {
    params.append('filters[published][$eq]', filters.published.toString());
  }
  if (filters.featured !== undefined) {
    params.append('filters[featured][$eq]', filters.featured.toString());
  }
  if (filters.category) {
    params.append('filters[category][$eq]', filters.category);
  }
  if (filters.tag) {
    params.append('filters[tags][$contains]', filters.tag);
  }
  if (filters.search) {
    // Busca em múltiplos campos (title, excerpt, content)
    params.append('filters[$or][0][title][$containsi]', filters.search);
    params.append('filters[$or][1][excerpt][$containsi]', filters.search);
    params.append('filters[$or][2][content][$containsi]', filters.search);
  }
  if (filters.industry) {
    params.append('filters[industry][$eq]', filters.industry);
  }

  // Paginação
  if (filters.limit) {
    params.append('pagination[pageSize]', filters.limit.toString());
  }
  if (filters.offset) {
    const page = Math.floor(filters.offset / (filters.limit || 10)) + 1;
    params.append('pagination[page]', page.toString());
  }

  // Ordenação
  const sortField = filters.sortBy || 'publishedAt';
  const sortOrder = filters.sortOrder || 'desc';
  params.append('sort', `${sortField}:${sortOrder}`);

  // Campos a retornar
  params.append('fields[0]', '*');

  return params.toString();
}

/**
 * Busca posts do blog do Strapi
 */
export async function fetchBlogPostsFromStrapi(
  filters: CMSFilters = {}
): Promise<{ posts: PostPreview[]; total: number }> {
  const query = buildStrapiQuery({
    ...filters,
    published: filters.published !== undefined ? filters.published : true,
  });

  const response = await strapiFetch<StrapiResponse<StrapiPost[]>>(
    `/posts?${query}`
  );

  const posts: PostPreview[] = response.data.map((strapiPost) => {
    const post = mapStrapiPostToPost(strapiPost);
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      authorImage: post.authorImage,
      category: post.category,
      tags: post.tags,
      featured: post.featured,
      publishedAt: post.publishedAt,
      ogImage: post.ogImage,
    };
  });

  const total = response.meta?.pagination?.total || posts.length;

  return { posts, total };
}

/**
 * Busca um post específico do Strapi por slug
 */
export async function fetchBlogPostFromStrapi(slug: string): Promise<Post | null> {
  try {
    const response = await strapiFetch<StrapiResponse<StrapiPost[]>>(
      `/posts?filters[slug][$eq]=${slug}&populate=*`
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return mapStrapiPostToPost(response.data[0]);
  } catch (error) {
    Logger.error('Erro ao buscar post do Strapi', {
      endpoint: '/posts',
      slug,
    }, error as Error);
    return null;
  }
}

/**
 * Busca cases do portfolio do Strapi
 */
export async function fetchPortfolioCasesFromStrapi(
  filters: CMSFilters = {}
): Promise<{ cases: CaseStudy[]; total: number }> {
  const query = buildStrapiQuery({
    ...filters,
    published: filters.published !== undefined ? filters.published : true,
  });

  const response = await strapiFetch<StrapiResponse<StrapiCaseStudy[]>>(
    `/case-studies?${query}`
  );

  const cases: CaseStudy[] = response.data.map(mapStrapiCaseStudyToCaseStudy);
  const total = response.meta?.pagination?.total || cases.length;

  return { cases, total };
}

/**
 * Busca um case específico do Strapi por slug
 */
export async function fetchPortfolioCaseFromStrapi(
  slug: string
): Promise<CaseStudy | null> {
  try {
    const response = await strapiFetch<StrapiResponse<StrapiCaseStudy[]>>(
      `/case-studies?filters[slug][$eq]=${slug}&populate=*`
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return mapStrapiCaseStudyToCaseStudy(response.data[0]);
  } catch (error) {
    Logger.error('Erro ao buscar case do Strapi', {
      endpoint: '/case-studies',
      slug,
    }, error as Error);
    return null;
  }
}

/**
 * Busca depoimentos do Strapi
 */
export async function fetchTestimonialsFromStrapi(
  filters: CMSFilters = {}
): Promise<StrapiTestimonial[]> {
  const query = buildStrapiQuery(filters);

  const response = await strapiFetch<StrapiResponse<StrapiTestimonial[]>>(
    `/testimonials?${query}`
  );

  return response.data;
}

/**
 * Revalida uma rota específica (para webhooks do Strapi)
 */
export async function revalidateStrapiRoute(path: string): Promise<void> {
  try {
    const revalidateSecret = process.env.REVALIDATE_SECRET;
    if (!revalidateSecret) {
      Logger.warn('REVALIDATE_SECRET não configurado. Revalidação não será executada.');
      return;
    }

    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': revalidateSecret,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao revalidar rota: ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao revalidar rota:', error);
  }
}

