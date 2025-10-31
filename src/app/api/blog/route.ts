import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { 
  createPaginatedResponse, 
  createErrorResponse,
  extractQueryParams,
  createOrderBy,
} from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    // Verificar se o Prisma está configurado
    if (!prisma) {
      return createErrorResponse("Banco de dados não configurado", undefined, 503);
    }

    const { page, limit, search, sortBy, sortOrder } = extractQueryParams(request);
    const { searchParams } = new URL(request.url);
    
    // Filtros
    const where: Record<string, unknown> = {
      published: true, // Apenas posts publicados
    };

    // Filtro por categoria
    const category = searchParams.get('category');
    if (category && category !== 'all') {
      where.category = category;
    }

    // Filtro por tag
    const tag = searchParams.get('tag');
    if (tag) {
      where.tags = {
        has: tag,
      };
    }

    // Busca por texto
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: sortBy === 'featured' 
          ? [{ featured: 'desc' }, { publishedAt: 'desc' }]
          : createOrderBy(sortBy || 'publishedAt', sortOrder || 'desc'),
        skip: (page - 1) * limit,
        take: limit,
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
          seoTitle: true,
          seoDescription: true,
          ogImage: true,
          createdAt: true,
          // Não retornar content completo na listagem (muito pesado)
        },
      }),
      prisma.post.count({ where }),
    ]);

    return createPaginatedResponse(
      posts,
      { page, limit, total },
      "Posts recuperados com sucesso"
    );
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    
    // Verificar se é erro de tabela não encontrada
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes("does not exist") || errorMessage.includes("Unknown table")) {
      return createErrorResponse(
        "Banco de dados não está atualizado. Execute: npx prisma db push",
        { hint: "As tabelas do blog ainda não foram criadas no banco de dados" },
        503
      );
    }
    
    return createErrorResponse(
      errorMessage || "Erro interno do servidor",
      error instanceof Error ? { stack: error.stack } : undefined,
      500
    );
  }
}

