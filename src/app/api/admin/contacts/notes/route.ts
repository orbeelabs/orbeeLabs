import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  createSuccessResponse,
  createErrorResponse,
  withAdmin,
} from "@/lib/api";
import { Logger } from "@/lib/logger";

async function handleGetNotes(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('contactId');

    if (!contactId) {
      return createErrorResponse("contactId é obrigatório", null, 400);
    }

    const notes = await prisma.contactNote.findMany({
      where: { contactId },
      orderBy: { createdAt: 'desc' },
    });

    return createSuccessResponse({ notes }, "Notas recuperadas com sucesso");
  } catch (error) {
    Logger.error("Erro ao buscar notas", {
      endpoint: '/api/admin/contacts/notes',
      method: 'GET',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

async function handleCreateNote(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactId, content, type, author } = body;

    if (!contactId || !content || !author) {
      return createErrorResponse("contactId, content e author são obrigatórios", null, 400);
    }

    const validTypes = ['NOTE', 'CALL', 'EMAIL', 'MEETING', 'PROPOSAL'];
    if (type && !validTypes.includes(type)) {
      return createErrorResponse("Tipo inválido", null, 400);
    }

    const note = await prisma.contactNote.create({
      data: {
        contactId,
        content,
        type: type || 'NOTE',
        author,
      },
    });

    return createSuccessResponse(note, "Nota criada com sucesso");
  } catch (error) {
    Logger.error("Erro ao criar nota", {
      endpoint: '/api/admin/contacts/notes',
      method: 'POST',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

async function handleDeleteNote(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse("id é obrigatório", null, 400);
    }

    await prisma.contactNote.delete({ where: { id } });

    return createSuccessResponse(null, "Nota excluída com sucesso");
  } catch (error) {
    Logger.error("Erro ao excluir nota", {
      endpoint: '/api/admin/contacts/notes',
      method: 'DELETE',
    }, error as Error);
    return createErrorResponse("Erro interno do servidor");
  }
}

export const GET = withAdmin(handleGetNotes);
export const POST = withAdmin(handleCreateNote);
export const DELETE = withAdmin(handleDeleteNote);
