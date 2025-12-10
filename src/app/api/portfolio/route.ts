import { NextRequest } from "next/server";
import { fetchPortfolioCases } from "@/lib/cms";
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
      published: searchParams.get('published') !== 'false', // Apenas cases publicados por padrão
      limit,
      offset: (page - 1) * limit,
      sortBy: sortBy || 'publishedAt',
      sortOrder: sortOrder || 'desc',
    };

    // Filtro por indústria
    const industry = searchParams.get('industry');
    if (industry && industry !== 'all') {
      filters.industry = industry;
    }

    // Busca por texto
    if (search) {
      filters.search = search;
    }

    const { cases, total } = await fetchPortfolioCases(filters);

    return createPaginatedResponse(
      cases,
      { page, limit, total },
      "Cases recuperados com sucesso"
    );
  } catch (error) {
    const { logApiError } = await import('@/lib/logger');
    logApiError(error as Error, '/api/portfolio', 'GET', { message: 'Erro ao buscar cases' });
    
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

