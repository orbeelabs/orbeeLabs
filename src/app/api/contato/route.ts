import { NextRequest } from "next/server";
import { sendContactEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import { 
  createSuccessResponse, 
  createErrorResponse, 
  validateData,
  withRateLimit 
} from "@/lib/api";
import { contactSchema } from "@/lib/api/validation";
import { logApiError, logApiSuccess } from "@/lib/logger";

async function handleContact(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validation = validateData(contactSchema, body);
    if (!validation.success) {
      return createErrorResponse(
        "Dados inválidos",
        validation.error.issues,
        400
      );
    }
    
    const validated = validation.data;
    
    // Salvar no banco de dados
    const contact = await prisma.contact.create({
      data: {
        name: validated.nome,
        email: validated.email,
        phone: validated.telefone,
        company: validated.empresa,
        message: validated.mensagem,
        source: 'website',
        status: 'NEW',
      },
    });

    logApiSuccess('POST', '/api/contato', { contactId: contact.id });

    // Enviar emails
    await sendContactEmail({
      nome: validated.nome,
      email: validated.email,
      telefone: validated.telefone,
      empresa: validated.empresa,
      mensagem: validated.mensagem,
    });

    return createSuccessResponse(
      { contactId: contact.id },
      "Contato salvo e email enviado com sucesso!"
    );

  } catch (error) {
    logApiError(error as Error, '/api/contato', 'POST', { message: 'Erro no envio de contato' });
    return createErrorResponse("Erro interno do servidor");
  }
}

export const POST = withRateLimit('contact', handleContact);
