import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { 
  createPaginatedResponse, 
  createErrorResponse, 
  createSuccessResponse,
  withAdmin,
  extractQueryParams,
  createSearchFilter,
  createOrderBy,
} from "@/lib/api";
import { Logger } from "@/lib/logger";
import { z } from "zod";

// Schema de validação para criar/atualizar post
const postSchema = z.object({
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().min(1),
  author: z.string().min(1).max(100),
  authorImage: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().nullable(),
  seoTitle: z.string().max(60).optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),
  ogImage: z.string().optional().nullable().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Deve ser uma URL válida ou vazio"
  }),
});

async function handleGetPosts(request: NextRequest) {
  try {
    const { page, limit, search, sortBy, sortOrder } = extractQueryParams(request);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');
    
    // Construir filtros
    const where: Record<string, unknown> = {};
    
    if (category) {
      where.category = category;
    }
    
    if (tag) {
      where.tags = { has: tag };
    }
    
    if (published !== null) {
      where.published = published === 'true';
    }
    
    if (featured !== null) {
      where.featured = featured === 'true';
    }
    
    if (search) {
      Object.assign(where, createSearchFilter(search, ['title', 'excerpt', 'content']));
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: createOrderBy(sortBy, sortOrder),
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return createPaginatedResponse(
      posts,
      { page, limit, total },
      "Posts recuperados com sucesso"
    );
  } catch (error) {
    Logger.error("Erro ao buscar posts", {
      endpoint: '/api/admin/posts',
      method: 'GET',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

async function handleCreatePost(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = postSchema.safeParse(body);
    
    if (!validation.success) {
      return createErrorResponse(
        "Dados inválidos",
        validation.error.issues,
        400
      );
    }
    
    const data = validation.data;
    
    // Verificar se o slug já existe
    const existingPost = await prisma.post.findUnique({
      where: { slug: data.slug },
    });
    
    if (existingPost) {
      return createErrorResponse(
        "Já existe um post com este slug",
        null,
        409
      );
    }
    
    // Criar o post
    const post = await prisma.post.create({
      data: {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : (data.published ? new Date() : null),
      },
    });
    
    return createSuccessResponse(
      post,
      "Post criado com sucesso",
      201
    );
  } catch (error) {
    Logger.error("Erro ao criar post", {
      endpoint: '/api/admin/posts',
      method: 'POST',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

export const GET = withAdmin(handleGetPosts);
export const POST = withAdmin(handleCreatePost);

