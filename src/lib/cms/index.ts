/**
 * CMS Headless - Camada de abstração
 * 
 * Esta camada permite usar tanto Prisma quanto Strapi como fonte de dados.
 * Por padrão, usa Prisma. Para usar Strapi, configure as variáveis de ambiente.
 */

import { cmsConfig } from './config';
import prisma from '@/lib/prisma';
import {
  fetchBlogPostsFromStrapi,
  fetchBlogPostFromStrapi,
  fetchPortfolioCasesFromStrapi,
  fetchPortfolioCaseFromStrapi,
  fetchTestimonialsFromStrapi,
  revalidateStrapiRoute,
} from './strapi';
import type { Post, PostPreview } from '@/types/blog';
import type { CaseStudy } from '@/types/portfolio';
import type { CMSFilters } from './types';

/**
 * Busca posts do blog (usa Prisma ou Strapi dependendo da configuração)
 */
export async function fetchBlogPosts(
  filters: CMSFilters = {}
): Promise<{ posts: PostPreview[]; total: number }> {
  if (cmsConfig.provider === 'strapi') {
    return fetchBlogPostsFromStrapi(filters);
  }

  // Usar Prisma (padrão)
  const where: {
    published: boolean;
    category?: string;
    tags?: { has: string };
    OR?: Array<{ title?: { contains: string; mode: 'insensitive' }; excerpt?: { contains: string; mode: 'insensitive' }; content?: { contains: string; mode: 'insensitive' } }>;
    featured?: boolean;
  } = {
    published: filters.published !== undefined ? filters.published : true,
  };

  if (filters.category) {
    where.category = filters.category;
  }
  if (filters.tag) {
    where.tags = { has: filters.tag };
  }
  if (filters.featured !== undefined) {
    where.featured = filters.featured;
  }
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { excerpt: { contains: filters.search, mode: 'insensitive' } },
      { content: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  const limit = filters.limit || 10;
  const offset = filters.offset || 0;
  const sortOrder = filters.sortOrder || 'desc';
  const sortBy = filters.sortBy || 'publishedAt';

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        [sortBy]: sortOrder,
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
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total };
}

/**
 * Busca um post específico por slug
 */
export async function fetchBlogPost(slug: string): Promise<Post | null> {
  if (cmsConfig.provider === 'strapi') {
    return fetchBlogPostFromStrapi(slug);
  }

  // Usar Prisma (padrão)
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  return post;
}

/**
 * Busca cases do portfolio
 */
export async function fetchPortfolioCases(
  filters: CMSFilters = {}
): Promise<{ cases: CaseStudy[]; total: number }> {
  if (cmsConfig.provider === 'strapi') {
    return fetchPortfolioCasesFromStrapi(filters);
  }

  // Usar Prisma (padrão)
  const where: {
    published: boolean;
    industry?: string;
    OR?: Array<{ title?: { contains: string; mode: 'insensitive' }; description?: { contains: string; mode: 'insensitive' }; challenge?: { contains: string; mode: 'insensitive' }; solution?: { contains: string; mode: 'insensitive' } }>;
    featured?: boolean;
  } = {
    published: filters.published !== undefined ? filters.published : true,
  };

  if (filters.industry) {
    where.industry = filters.industry;
  }
  if (filters.featured !== undefined) {
    where.featured = filters.featured;
  }
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
      { challenge: { contains: filters.search, mode: 'insensitive' } },
      { solution: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  const limit = filters.limit || 10;
  const offset = filters.offset || 0;
  const sortOrder = filters.sortOrder || 'desc';
  const sortBy = filters.sortBy || 'publishedAt';

  const [cases, total] = await Promise.all([
    prisma.caseStudy.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prisma.caseStudy.count({ where }),
  ]);

  return { cases, total };
}

/**
 * Busca um case específico por slug
 */
export async function fetchPortfolioCase(slug: string): Promise<CaseStudy | null> {
  if (cmsConfig.provider === 'strapi') {
    return fetchPortfolioCaseFromStrapi(slug);
  }

  // Usar Prisma (padrão)
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { slug },
  });

  return caseStudy;
}

/**
 * Busca depoimentos
 */
export async function fetchTestimonials(filters: CMSFilters = {}) {
  if (cmsConfig.provider === 'strapi') {
    return fetchTestimonialsFromStrapi(filters);
  }

  // Por enquanto, depoimentos não estão no Prisma
  // Retornar array vazio ou implementar modelo no Prisma se necessário
  return [];
}

/**
 * Revalida uma rota (para webhooks do CMS)
 */
export async function revalidateRoute(path: string): Promise<void> {
  if (cmsConfig.provider === 'strapi') {
    return revalidateStrapiRoute(path);
  }

  // Para Prisma, não há necessidade de revalidação
  // (dados são sempre atualizados em tempo real)
  // Logger.debug(`Revalidação não necessária para Prisma: ${path}`);
}

/**
 * Exporta configuração do CMS
 */
export { cmsConfig } from './config';

