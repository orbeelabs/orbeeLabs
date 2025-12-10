import { NextRequest } from 'next/server';
import { Logger, logApiError } from '@/lib/logger';
import prisma from '@/lib/prisma';
import { createSuccessResponse, createErrorResponse } from '@/lib/api';
import { z } from 'zod';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';

const updateRequestSchema = z.object({
  email: z.string().email('Email inválido'),
  data: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
  }),
});

// Armazenar tokens temporários (em produção, usar Redis)
interface UpdateTokenData {
  email: string;
  data: {
    name?: string;
    phone?: string;
    company?: string;
  };
  expiresAt: number;
}
const updateTokens = new Map<string, UpdateTokenData>();

// Limpar tokens expirados a cada hora
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of updateTokens.entries()) {
    if (data.expiresAt < now) {
      updateTokens.delete(token);
    }
  }
}, 60 * 60 * 1000);

/**
 * POST /api/lgpd/update
 * Solicita correção de dados (envia email de confirmação)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = updateRequestSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        'Dados inválidos',
        validation.error.issues,
        400
      );
    }

    const { email, data: updateData } = validation.data;

    // Verificar se há dados para atualizar
    const [hasContact, hasNewsletter] = await Promise.all([
      prisma.contact.findFirst({ where: { email } }),
      prisma.newsletterSubscriber.findFirst({ where: { email } }),
    ]);

    if (!hasContact && !hasNewsletter) {
      return createErrorResponse(
        'Nenhum dado encontrado para este email',
        null,
        404
      );
    }

    // Gerar token de confirmação
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 horas

    updateTokens.set(token, { email, data: updateData, expiresAt });

    // Enviar email de confirmação
    const updateUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/lgpd/confirmar-correcao?token=${token}`;

    try {
      await sendEmail({
        to: email,
        subject: 'Confirmação de Correção de Dados - Orbee Labs',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Confirmação de Correção de Dados</h2>
            <p>Olá,</p>
            <p>Recebemos uma solicitação para corrigir seus dados pessoais no nosso sistema.</p>
            <p><strong>Dados a serem atualizados:</strong></p>
            <ul>
              ${updateData.name ? `<li>Nome: ${updateData.name}</li>` : ''}
              ${updateData.phone ? `<li>Telefone: ${updateData.phone}</li>` : ''}
              ${updateData.company ? `<li>Empresa: ${updateData.company}</li>` : ''}
            </ul>
            <p>Para confirmar a correção, clique no link abaixo:</p>
            <p>
              <a href="${updateUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Confirmar Correção
              </a>
            </p>
            <p><strong>Este link expira em 24 horas.</strong></p>
            <p>Se você não solicitou esta correção, ignore este email.</p>
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
    logApiError(error as Error, '/api/lgpd/update', 'POST', { message: 'Erro na API de correção LGPD' });
    return createErrorResponse('Erro interno do servidor', null, 500);
  }
}

/**
 * GET /api/lgpd/update?token=xxx
 * Confirma e executa a correção de dados
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return createErrorResponse('Token é obrigatório', null, 400);
    }

    const tokenData = updateTokens.get(token);

    if (!tokenData) {
      return createErrorResponse('Token inválido ou expirado', null, 400);
    }

    if (tokenData.expiresAt < Date.now()) {
      updateTokens.delete(token);
      return createErrorResponse('Token expirado', null, 400);
    }

    const { email, data: updateData } = tokenData;

    // Atualizar dados em todas as tabelas relevantes
    const updatePromises = [];

    // Atualizar contatos
    if (Object.keys(updateData).length > 0) {
      updatePromises.push(
        prisma.contact.updateMany({
          where: { email },
          data: {
            ...(updateData.name && { name: updateData.name }),
            ...(updateData.phone && { phone: updateData.phone }),
            ...(updateData.company && { company: updateData.company }),
          },
        })
      );
    }

    // Atualizar newsletter
    if (updateData.name) {
      updatePromises.push(
        prisma.newsletterSubscriber.updateMany({
          where: { email },
          data: { name: updateData.name },
        })
      );
    }

    await Promise.all(updatePromises);

    // Remover token
    updateTokens.delete(token);

    // Enviar email de confirmação
    try {
      await sendEmail({
        to: email,
        subject: 'Dados Corrigidos com Sucesso - Orbee Labs',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Dados Corrigidos</h2>
            <p>Olá,</p>
            <p>Confirmamos que seus dados pessoais foram corrigidos no nosso sistema conforme solicitado.</p>
            <p>Atenciosamente,<br/>Equipe Orbee Labs</p>
          </div>
        `,
      });
    } catch (emailError) {
      Logger.error('Erro ao enviar email de confirmação', {}, emailError as Error);
    }

    return createSuccessResponse(
      null,
      'Dados corrigidos com sucesso'
    );
  } catch (error) {
    logApiError(error as Error, '/api/lgpd/update', 'GET', { message: 'Erro na confirmação de correção LGPD' });
    return createErrorResponse('Erro interno do servidor', null, 500);
  }
}

