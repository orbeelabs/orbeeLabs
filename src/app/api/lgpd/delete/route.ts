import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { createSuccessResponse, createErrorResponse } from '@/lib/api';
import { z } from 'zod';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';
import { Logger, logApiError } from '@/lib/logger';

const deleteRequestSchema = z.object({
  email: z.string().email('Email inválido'),
});

// Armazenar tokens temporários (em produção, usar Redis)
const deleteTokens = new Map<string, { email: string; expiresAt: number }>();

// Limpar tokens expirados a cada hora
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of deleteTokens.entries()) {
    if (data.expiresAt < now) {
      deleteTokens.delete(token);
    }
  }
}, 60 * 60 * 1000);

/**
 * POST /api/lgpd/delete
 * Solicita exclusão de dados (envia email de confirmação)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = deleteRequestSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        'Dados inválidos',
        validation.error.issues,
        400
      );
    }

    const { email } = validation.data;

    // Verificar se há dados para excluir
    const [hasContact, hasNewsletter, hasROI] = await Promise.all([
      prisma.contact.findFirst({ where: { email } }),
      prisma.newsletterSubscriber.findFirst({ where: { email } }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prisma.roiCalculation.findFirst({ where: { userId: email } as any }),
    ]);

    if (!hasContact && !hasNewsletter && !hasROI) {
      return createErrorResponse(
        'Nenhum dado encontrado para este email',
        null,
        404
      );
    }

    // Gerar token de confirmação
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 horas

    deleteTokens.set(token, { email, expiresAt });

    // Enviar email de confirmação
    // Não incluir token na URL se possível (usar POST com body em vez de GET)
    // Por enquanto, manter GET mas garantir que token seja único e temporário
    const deleteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/lgpd/confirmar-exclusao?token=${token}`;

    try {
      await sendEmail({
        to: email,
        subject: 'Confirmação de Exclusão de Dados - Orbee Labs',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Confirmação de Exclusão de Dados</h2>
            <p>Olá,</p>
            <p>Recebemos uma solicitação para excluir seus dados pessoais do nosso sistema.</p>
            <p>Para confirmar a exclusão, clique no link abaixo:</p>
            <p>
              <a href="${deleteUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Confirmar Exclusão
              </a>
            </p>
            <p><strong>Este link expira em 24 horas.</strong></p>
            <p>Se você não solicitou esta exclusão, ignore este email.</p>
            <p>Atenciosamente,<br/>Equipe Orbee Labs</p>
          </div>
        `,
      });
    } catch (emailError) {
      Logger.error('Erro ao enviar email de confirmação', {}, emailError as Error);
      return createErrorResponse(
        'Erro ao enviar email de confirmação. Tente novamente mais tarde.',
        null,
        500
      );
    }

    return createSuccessResponse(
      null,
      'Email de confirmação enviado. Verifique sua caixa de entrada.'
    );
  } catch (error) {
    logApiError(error as Error, '/api/lgpd/delete', 'POST', { message: 'Erro na API de exclusão LGPD' });
    return createErrorResponse('Erro interno do servidor', null, 500);
  }
}

/**
 * GET /api/lgpd/delete?token=xxx
 * Confirma e executa a exclusão de dados
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return createErrorResponse('Token é obrigatório', null, 400);
    }

    const tokenData = deleteTokens.get(token);

    if (!tokenData) {
      return createErrorResponse('Token inválido ou expirado', null, 400);
    }

    if (tokenData.expiresAt < Date.now()) {
      deleteTokens.delete(token);
      return createErrorResponse('Token expirado', null, 400);
    }

    const { email } = tokenData;

    // Excluir todos os dados do usuário
    await Promise.all([
      prisma.contact.deleteMany({ where: { email } }),
      prisma.newsletterSubscriber.deleteMany({ where: { email } }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prisma.roiCalculation.deleteMany({ where: { userId: email } as any }),
    ]);

    // Remover token
    deleteTokens.delete(token);

    // Enviar email de confirmação
    try {
      await sendEmail({
        to: email,
        subject: 'Dados Excluídos com Sucesso - Orbee Labs',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Dados Excluídos</h2>
            <p>Olá,</p>
            <p>Confirmamos que todos os seus dados pessoais foram excluídos do nosso sistema conforme solicitado.</p>
            <p>Se você precisar de nossos serviços novamente, será necessário se cadastrar novamente.</p>
            <p>Atenciosamente,<br/>Equipe Orbee Labs</p>
          </div>
        `,
      });
    } catch (emailError) {
      Logger.error('Erro ao enviar email de confirmação', {}, emailError as Error);
    }

    return createSuccessResponse(
      null,
      'Dados excluídos com sucesso'
    );
  } catch (error) {
      logApiError(error as Error, '/api/lgpd/delete', 'GET', { message: 'Erro na confirmação de exclusão LGPD' });
    return createErrorResponse('Erro interno do servidor', null, 500);
  }
}

