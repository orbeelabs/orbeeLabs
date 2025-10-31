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
      published: true, // Apenas cases publicados por padrão
    };

    // Filtro por indústria
    const industry = searchParams.get('industry');
    if (industry && industry !== 'all') {
      where.industry = industry;
    }

    // Permitir ver não publicados apenas via query param (para admin no futuro)
    const includeUnpublished = searchParams.get('published') === 'false';
    if (includeUnpublished) {
      delete where.published;
    }

    // Busca por texto
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { clientName: { contains: search, mode: 'insensitive' } },
        { challenge: { contains: search, mode: 'insensitive' } },
        { solution: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [cases, total] = await Promise.all([
      prisma.caseStudy.findMany({
        where,
        orderBy: sortBy === 'featured'
          ? [{ featured: 'desc' }, { publishedAt: 'desc' }]
          : createOrderBy(sortBy || 'publishedAt', sortOrder || 'desc'),
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.caseStudy.count({ where }),
    ]);

    return createPaginatedResponse(
      cases,
      { page, limit, total },
      "Cases recuperados com sucesso"
    );
  } catch (error) {
    console.error("Erro ao buscar cases:", error);
    
    // Verificar se é erro de tabela não encontrada
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes("does not exist") || errorMessage.includes("Unknown table")) {
      return createErrorResponse(
        "Banco de dados não está atualizado. Execute: npx prisma db push",
        { hint: "As tabelas do portfolio ainda não foram criadas no banco de dados" },
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

