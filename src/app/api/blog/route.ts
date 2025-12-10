import { NextRequest } from "next/server";
import { fetchBlogPosts } from "@/lib/cms";
import type { CMSFilters } from "@/lib/cms/types";
import { 
  createPaginatedResponse, 
  createErrorResponse,
  extractQueryParams,
} from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const { page, limit, search, sortBy, sortOrder } = extractQueryParams(request);
    const { searchParams } = new URL(request.url);
    
    // Filtros
    const filters: CMSFilters = {
      published: true,
      limit,
      offset: (page - 1) * limit,
      sortBy: sortBy || 'publishedAt',
      sortOrder: sortOrder || 'desc',
    };

    // Filtro por categoria
    const category = searchParams.get('category');
    if (category && category !== 'all') {
      filters.category = category;
    }

    // Filtro por tag
    const tag = searchParams.get('tag');
    if (tag) {
      filters.tag = tag;
    }

    // Busca por texto
    if (search) {
      filters.search = search;
    }

    const { posts, total } = await fetchBlogPosts(filters);

    return createPaginatedResponse(
      posts,
      { page, limit, total },
      "Posts recuperados com sucesso"
    );
  } catch (error) {
    const { logApiError } = await import('@/lib/logger');
    logApiError(error as Error, '/api/blog', 'GET', { message: 'Erro ao buscar posts' });
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return createErrorResponse(
      errorMessage || "Erro interno do servidor",
      // Não expor stack trace em produção
      process.env.NODE_ENV === 'development' && error instanceof Error 
        ? { stack: error.stack } 
        : undefined,
      500
    );
  }
}

