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

    // Se não houver cases (pode ser erro de conexão tratado internamente)
    // Retornar resposta válida com array vazio
    return createPaginatedResponse(
      cases || [],
      { page, limit, total: total || 0 },
      cases && cases.length > 0 ? "Cases recuperados com sucesso" : "Nenhum case encontrado"
    );
  } catch (error) {
    const { logApiError } = await import('@/lib/logger');
    logApiError(error as Error, '/api/portfolio', 'GET', { message: 'Erro ao buscar cases' });
    
    // Em caso de erro, retornar resposta válida com array vazio
    // Isso permite que a página continue funcionando
    return createPaginatedResponse(
      [],
      { page: 1, limit: 10, total: 0 },
      "Erro ao conectar com o banco de dados. Tente novamente mais tarde."
    );
  }
}

