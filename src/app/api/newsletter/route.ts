import { NextRequest } from "next/server";
import { sendNewsletterEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import { 
  createSuccessResponse, 
  createErrorResponse, 
  validateData,
  withRateLimit 
} from "@/lib/api";
import { newsletterSchema } from "@/lib/api/validation";
import { logApiError, logApiSuccess, Logger } from "@/lib/logger";
import { getCRMAdapter } from "@/lib/integrations/crm/factory";
import { sanitizeText } from "@/lib/utils/sanitize";

async function handleNewsletter(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validation = validateData(newsletterSchema, body);
    if (!validation.success) {
      return createErrorResponse(
        "Email inválido",
        validation.error.issues,
        400
      );
    }
    
    const validated = validation.data;
    
    // Sanitizar dados
    const sanitizedEmail = validated.email.toLowerCase().trim();
    const sanitizedName = validated.nome ? sanitizeText(validated.nome) : null;
    
    // Salvar no banco de dados
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: sanitizedEmail },
      update: {
        name: sanitizedName,
        status: 'ACTIVE',
      },
      create: {
        email: sanitizedEmail,
        name: sanitizedName,
        source: 'website',
        status: 'ACTIVE',
      },
    });

    logApiSuccess('POST', '/api/newsletter', { subscriberId: subscriber.id });
    
    // Enviar para CRM APENAS se consentimento foi dado
    if (validated.consentimentoCRM) {
      const crmAdapter = getCRMAdapter();
      try {
        const crmResponse = await crmAdapter.createContact({
          name: validated.nome || validated.email.split('@')[0],
          email: validated.email,
          source: 'newsletter',
          tags: ['newsletter', 'lead'],
        });

        if (crmResponse.success) {
          logApiSuccess('CRM', 'createContact (Newsletter)', { 
            subscriberId: subscriber.id, 
            crmContactId: crmResponse.contactId 
          });
        }
      } catch (crmError) {
        // Não quebrar o fluxo se CRM falhar
        Logger.error('Erro ao enviar para CRM (não bloqueia)', {
          subscriberId: subscriber.id,
        }, crmError as Error);
      }
    }
    
    // Enviar email de boas-vindas (usar dados sanitizados)
    await sendNewsletterEmail({
      email: sanitizedEmail,
      nome: sanitizedName || undefined,
    });

    return createSuccessResponse(
      { subscriberId: subscriber.id },
      "Inscrição realizada com sucesso!"
    );

  } catch (error) {
    logApiError(error as Error, '/api/newsletter', 'POST', { message: 'Erro na inscrição da newsletter' });
    return createErrorResponse("Erro interno do servidor");
  }
}

export const POST = withRateLimit('newsletter', handleNewsletter);
