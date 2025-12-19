/**
 * CMS - Camada de acesso a dados
 * 
 * Usa Prisma para buscar posts, cases e depoimentos do banco de dados.
 */

import prisma from '@/lib/prisma';
import type { Post, PostPreview } from '@/types/blog';
import type { CaseStudy } from '@/types/portfolio';

export interface CMSFilters {
  category?: string;
  tag?: string;
  search?: string;
  published?: boolean;
  featured?: boolean;
  industry?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Busca posts do blog
 */
export async function fetchBlogPosts(
  filters: CMSFilters = {}
): Promise<{ posts: PostPreview[]; total: number }> {
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

  try {
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
  } catch (error) {
    // Log do erro para debug
    console.error('Erro ao buscar posts do blog:', error);
    
    // Retornar array vazio em caso de erro de conexão
    return { posts: [], total: 0 };
  }
}

/**
 * Busca um post específico por slug
 */
export async function fetchBlogPost(slug: string): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    return post;
  } catch (error) {
    // Log do erro para debug
    console.error('Erro ao buscar post do blog:', error);
    
    // Retornar null em caso de erro de conexão
    return null;
  }
}

/**
 * Busca cases do portfolio
 */
export async function fetchPortfolioCases(
  filters: CMSFilters = {}
): Promise<{ cases: CaseStudy[]; total: number }> {
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

  try {
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
  } catch (error) {
    // Log do erro para debug
    console.error('Erro ao buscar cases do portfolio:', error);
    
    // Retornar array vazio em caso de erro de conexão
    // Isso permite que a página continue funcionando mesmo sem banco
    return { cases: [], total: 0 };
  }
}

/**
 * Busca um case específico por slug
 */
export async function fetchPortfolioCase(slug: string): Promise<CaseStudy | null> {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { slug },
    });

    return caseStudy;
  } catch (error) {
    // Log do erro para debug
    console.error('Erro ao buscar case do portfolio:', error);
    
    // Retornar null em caso de erro de conexão
    return null;
  }
}

/**
 * Busca depoimentos
 */
export async function fetchTestimonials(_filters: CMSFilters = {}) {
  // Depoimentos podem ser implementados no Prisma se necessário
  return [];
}

/**
 * Revalida uma rota (para cache do Next.js)
 */
export async function revalidateRoute(_path: string): Promise<void> {
  // Para Prisma, não há necessidade de revalidação via webhook
  // Os dados são sempre atualizados em tempo real
}
