import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://orbeelabs.com';
  
  // Páginas estáticas principais
  const staticPages = [
    {
      url: '',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: '/sobre',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/servicos',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: '/servicos/seo-bh',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/servicos/desenvolvimento-web-bh',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/servicos/trafego-pago-bh',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/servicos/marketing',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/servicos/ecommerce',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/servicos/landing-pages',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/servicos/analytics',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/servicos/gestao-redes-sociais',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/servicos/consultoria-marketing-digital',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/portfolio',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: '/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: '/setores/saude',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/setores/educacao',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/setores/servicos-profissionais',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/contato',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/calculadora-roi',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/auditoria-seo',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: '/carreiras',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/parceiros',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/recursos',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: '/webinars',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: '/depoimentos',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: '/termos',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: '/privacidade',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: '/cookies',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Buscar posts do blog publicados
  let blogPosts: Array<{ url: string; lastModified: Date; changeFrequency: 'weekly' | 'monthly'; priority: number }> = [];
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
    });

    blogPosts = posts.map((post) => ({
      url: `/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Erro ao buscar posts do blog para sitemap:', error);
  }

  // Buscar cases do portfolio publicados
  let portfolioCases: Array<{ url: string; lastModified: Date; changeFrequency: 'weekly' | 'monthly'; priority: number }> = [];
  try {
    const cases = await prisma.caseStudy.findMany({
      where: { published: true },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
    });

    portfolioCases = cases.map((caseStudy) => ({
      url: `/portfolio/${caseStudy.slug}`,
      lastModified: caseStudy.updatedAt || caseStudy.publishedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Erro ao buscar cases do portfolio para sitemap:', error);
  }

  // Buscar categorias únicas do blog para páginas de categoria
  // Usar o mesmo mapeamento da página de categoria
  const categoryMap: Record<string, string> = {
    'seo-avancado': 'SEO Avançado',
    'desenvolvimento-web': 'Desenvolvimento Web',
    'marketing-digital': 'Marketing Digital',
    'cases-reais': 'Cases Reais',
  };

  let blogCategories: Array<{ url: string; lastModified: Date; changeFrequency: 'weekly' | 'monthly'; priority: number }> = [];
  try {
    const categories = await prisma.post.findMany({
      where: { published: true },
      select: { category: true },
      distinct: ['category'],
    });

    // Criar mapeamento reverso (category name -> slug)
    const reverseCategoryMap: Record<string, string> = {};
    Object.entries(categoryMap).forEach(([slug, name]) => {
      reverseCategoryMap[name] = slug;
    });

    blogCategories = categories
      .filter((post) => reverseCategoryMap[post.category]) // Apenas categorias válidas
      .map((post) => ({
        url: `/blog/categoria/${reverseCategoryMap[post.category]}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
  } catch (error) {
    console.error('Erro ao buscar categorias do blog para sitemap:', error);
  }

  // Buscar tags únicas do blog para páginas de tag
  let blogTags: Array<{ url: string; lastModified: Date; changeFrequency: 'weekly' | 'monthly'; priority: number }> = [];
  try {
    const postsWithTags = await prisma.post.findMany({
      where: { published: true },
      select: { tags: true },
    });

    // Extrair todas as tags únicas
    const uniqueTags = new Set<string>();
    postsWithTags.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tag) {
          uniqueTags.add(tag);
        }
      });
    });

    blogTags = Array.from(uniqueTags).map((tag) => ({
      url: `/blog/tag/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error('Erro ao buscar tags do blog para sitemap:', error);
  }

  // Combinar todas as páginas
  const allPages = [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...blogPosts.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...portfolioCases.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
         ...blogCategories.map((page) => ({
           url: `${baseUrl}${page.url}`,
           lastModified: page.lastModified,
           changeFrequency: page.changeFrequency,
           priority: page.priority,
         })),
         ...blogTags.map((page) => ({
           url: `${baseUrl}${page.url}`,
           lastModified: page.lastModified,
           changeFrequency: page.changeFrequency,
           priority: page.priority,
         })),
       ];

  return allPages;
}
