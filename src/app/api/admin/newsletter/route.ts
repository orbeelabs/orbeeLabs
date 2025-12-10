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
import { Logger } from "@/lib/logger";

async function handleGetNewsletter(request: NextRequest) {
  try {
    const { page, limit, search, status, sortBy, sortOrder } = extractQueryParams(request);
    
    // Construir filtros
    const where: Record<string, unknown> = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (search) {
      Object.assign(where, createSearchFilter(search, ['email', 'name']));
    }

    const [subscribers, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        where,
        orderBy: createOrderBy(sortBy, sortOrder),
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.newsletterSubscriber.count({ where }),
    ]);

    return createPaginatedResponse(
      subscribers,
      { page, limit, total },
      "Assinantes recuperados com sucesso"
    );
  } catch (error) {
    Logger.error("Erro ao buscar assinantes", {
      endpoint: '/api/admin/newsletter',
      method: 'GET',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

export const GET = withAdmin(handleGetNewsletter);