import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { 
  createPaginatedResponse, 
  createErrorResponse,
  withAdmin,
  extractQueryParams,
  createSearchFilter,
  createOrderBy
} from "@/lib/api";

async function handleGetAudits(request: NextRequest) {
  try {
    const { page, limit, search, sortBy, sortOrder } = extractQueryParams(request);
    
    // Construir filtros
    const where: Record<string, unknown> = {};
    
    if (search) {
      Object.assign(where, createSearchFilter(search, ['url']));
    }

    const [audits, total] = await Promise.all([
      prisma.seoAudit.findMany({
        where,
        orderBy: createOrderBy(sortBy, sortOrder),
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.seoAudit.count({ where }),
    ]);

    return createPaginatedResponse(
      audits,
      { page, limit, total },
      "Auditorias recuperadas com sucesso"
    );
  } catch (error) {
    console.error("Erro ao buscar auditorias:", error);
    return createErrorResponse("Erro interno do servidor");
  }
}

export const GET = withAdmin(handleGetAudits);
