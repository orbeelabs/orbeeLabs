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
  validateId
} from "@/lib/api";
import { Logger } from "@/lib/logger";

async function handleGetContacts(request: NextRequest) {
  try {
    const { page, limit, search, status, sortBy, sortOrder } = extractQueryParams(request);
    
    // Construir filtros
    const where: Record<string, unknown> = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (search) {
      Object.assign(where, createSearchFilter(search, ['name', 'email', 'company']));
    }

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: createOrderBy(sortBy, sortOrder),
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contact.count({ where }),
    ]);

    return createPaginatedResponse(
      contacts,
      { page, limit, total },
      "Contatos recuperados com sucesso"
    );
  } catch (error) {
    Logger.error("Erro ao buscar contatos", {
      endpoint: '/api/admin/contacts',
      method: 'GET',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

async function handleDeleteContact(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contactId = searchParams.get('id');
  let id: string | undefined;

  try {
    id = validateId(contactId);

    // Verificar se o contato existe
    const existingContact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      return createErrorResponse("Contato não encontrado", null, 404);
    }

    // Excluir o contato
    await prisma.contact.delete({
      where: { id },
    });

    return createSuccessResponse(
      null,
      "Contato excluído com sucesso"
    );
  } catch (error) {
    Logger.error("Erro ao excluir contato", {
      endpoint: '/api/admin/contacts',
      method: 'DELETE',
      contactId: id || contactId || 'unknown',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

export const GET = withAdmin(handleGetContacts);
export const DELETE = withAdmin(handleDeleteContact);
