import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createSuccessResponse, createErrorResponse } from '@/lib/api';
import { z } from 'zod';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';
import { Logger, logApiError } from '@/lib/logger';

const exportRequestSchema = z.object({
  email: z.string().email('Email inválido'),
});

// Armazenar tokens temporários (em produção, usar Redis)
const exportTokens = new Map<string, { email: string; expiresAt: number }>();

// Limpar tokens expirados a cada hora
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of exportTokens.entries()) {
    if (data.expiresAt < now) {
      exportTokens.delete(token);
    }
  }
}, 60 * 60 * 1000);

/**
 * POST /api/lgpd/export
 * Solicita exportação de dados (envia email com link para download)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = exportRequestSchema.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        'Dados inválidos',
        validation.error.issues,
        400
      );
    }

    const { email } = validation.data;

    // Buscar todos os dados do usuário
    // Para ROI, precisamos buscar por email do usuário (se houver relação)
    // Por enquanto, buscamos apenas contatos e newsletter por email
    const [contacts, newsletter] = await Promise.all([
      prisma.contact.findMany({ where: { email } }),
      prisma.newsletterSubscriber.findMany({ where: { email } }),
    ]);

    // ROI calculations não têm relação direta com email, então não incluímos aqui
    // Se necessário, pode ser adicionado depois com uma relação User -> RoiCalculation
    const roiCalculations: Array<{
      id: string;
      name: string | null;
      data: string;
      result: string;
      createdAt: Date;
      updatedAt: Date;
    }> = [];

    if (contacts.length === 0 && newsletter.length === 0 && roiCalculations.length === 0) {
      return createErrorResponse(
        'Nenhum dado encontrado para este email',
        null,
        404
      );
    }

    // Gerar token de acesso
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 horas

    exportTokens.set(token, { email, expiresAt });

    // Preparar dados para exportação
    const exportData = {
      email,
      exportDate: new Date().toISOString(),
      contacts: contacts.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        company: c.company,
        message: c.message,
        source: c.source,
        createdAt: c.createdAt,
      })),
      newsletter: newsletter.map(n => ({
        id: n.id,
        email: n.email,
        name: n.name,
        source: n.source,
        status: n.status,
        createdAt: n.createdAt,
      })),
      roiCalculations: roiCalculations.map(r => ({
        id: r.id,
        name: r.name,
        data: JSON.parse(r.data),
        result: JSON.parse(r.result),
        createdAt: r.createdAt,
      })),
    };

    // Enviar email com dados em JSON
    const jsonData = JSON.stringify(exportData, null, 2);

    try {
      await sendEmail({
        to: email,
        subject: 'Exportação de Dados - Orbee Labs',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Exportação de Dados</h2>
            <p>Olá,</p>
            <p>Segue a exportação dos seus dados pessoais conforme solicitado.</p>
            <p>Os dados estão anexados neste email em formato JSON.</p>
            <p><strong>Este email contém informações sensíveis. Mantenha-o seguro.</strong></p>
            <p>Atenciosamente,<br/>Equipe Orbee Labs</p>
          </div>
        `,
        attachments: [
          {
            filename: `dados-orbeelabs-${Date.now()}.json`,
            content: jsonData,
            contentType: 'application/json',
          },
        ],
      });
    } catch (emailError) {
      Logger.error('Erro ao enviar email de exportação', {}, emailError as Error);
      // Se falhar, retornar dados diretamente na resposta
      return NextResponse.json(exportData, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="dados-orbeelabs-${Date.now()}.json"`,
        },
      });
    }

    return createSuccessResponse(
      null,
      'Dados exportados e enviados por email com sucesso'
    );
  } catch (error) {
    logApiError(error as Error, '/api/lgpd/export', 'POST', { message: 'Erro na API de exportação LGPD' });
    return createErrorResponse('Erro interno do servidor', null, 500);
  }
}

