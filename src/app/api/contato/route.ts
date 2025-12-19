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
import { logApiError, logApiSuccess, Logger } from "@/lib/logger";
import { getCRMAdapter } from "@/lib/integrations/crm/factory";
import { sanitizeText } from "@/lib/utils/sanitize";

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
    
    // Sanitizar campos de texto para prevenir XSS
    const sanitizedData = {
      nome: sanitizeText(validated.nome),
      email: validated.email, // Email já validado pelo Zod
      telefone: validated.telefone ? sanitizeText(validated.telefone) : null,
      empresa: validated.empresa ? sanitizeText(validated.empresa) : null,
      mensagem: sanitizeText(validated.mensagem),
    };
    
    // Salvar no banco de dados
    const contact = await prisma.contact.create({
      data: {
        name: sanitizedData.nome,
        email: sanitizedData.email,
        phone: sanitizedData.telefone,
        company: sanitizedData.empresa,
        message: sanitizedData.mensagem,
        source: 'website',
        status: 'NEW',
      },
    });

    logApiSuccess('POST', '/api/contato', { contactId: contact.id });

    // Enviar para CRM APENAS se consentimento foi dado
    if (validated.consentimentoCRM) {
      const crmAdapter = getCRMAdapter();
      try {
        const crmResponse = await crmAdapter.createContact({
          name: validated.nome,
          email: validated.email,
          phone: validated.telefone,
          company: validated.empresa,
          message: validated.mensagem,
          source: 'website',
          tags: ['lead', 'website', 'contato'],
        });

        if (crmResponse.success) {
          logApiSuccess('CRM', 'createContact', { 
            contactId: contact.id, 
            crmContactId: crmResponse.contactId 
          });
        } else {
          Logger.warn('CRM retornou erro (não bloqueia)', {
            contactId: contact.id,
            error: crmResponse.error,
          });
        }
      } catch (crmError) {
        // Não quebrar o fluxo se CRM falhar
        Logger.error('Erro ao enviar para CRM (não bloqueia)', {
          contactId: contact.id,
        }, crmError as Error);
      }
    }

    // Enviar emails (usar dados sanitizados)
    await sendContactEmail({
      nome: sanitizedData.nome,
      email: sanitizedData.email,
      telefone: sanitizedData.telefone || undefined,
      empresa: sanitizedData.empresa || undefined,
      mensagem: sanitizedData.mensagem,
    });

    return createSuccessResponse(
      { contactId: contact.id },
      "Contato salvo e email enviado com sucesso!"
    );

  } catch (error) {
    logApiError(error as Error, '/api/contato', 'POST', { message: 'Erro no envio de contato' });
    // Em produção, mensagem genérica. Em dev, mais detalhes
    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Erro interno do servidor. Tente novamente ou entre em contato com o suporte.'
      : 'Erro interno do servidor';
    return createErrorResponse(errorMessage);
  }
}

export const POST = withRateLimit('contact', handleContact);
