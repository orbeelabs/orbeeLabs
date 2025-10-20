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
import { logApiError, logApiSuccess } from "@/lib/logger";

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
    
    // Salvar no banco de dados
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: validated.email },
      update: {
        name: validated.nome,
        status: 'ACTIVE',
      },
      create: {
        email: validated.email,
        name: validated.nome,
        source: 'website',
        status: 'ACTIVE',
      },
    });

    logApiSuccess('POST', '/api/newsletter', { subscriberId: subscriber.id });
    
    // Enviar email de boas-vindas
    await sendNewsletterEmail({
      email: validated.email,
      nome: validated.nome,
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
