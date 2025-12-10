import { NextRequest } from 'next/server';
import { cleanExpiredData } from '@/lib/lgpd/data-retention';
import { createSuccessResponse, createErrorResponse } from '@/lib/api';
import { Logger } from '@/lib/logger';

/**
 * POST /api/cron/lgpd-cleanup
 * Endpoint para limpeza automática via cron job (protegido por secret)
 * 
 * Configure um cron job para chamar este endpoint periodicamente:
 * Exemplo: 0 2 * * * curl -X POST https://seu-dominio.com/api/cron/lgpd-cleanup?secret=SEU_SECRET
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar secret para segurança
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const expectedSecret = process.env.LGPD_CLEANUP_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return createErrorResponse('Não autorizado', null, 401);
    }

    const results = await cleanExpiredData();

    return createSuccessResponse(
      results,
      `Limpeza automática concluída: ${results.contacts} contatos, ${results.seoAudits} auditorias e ${results.roiCalculations} cálculos ROI removidos`
    );
  } catch (error) {
    Logger.error('Erro na limpeza automática de dados', {
      endpoint: '/api/cron/lgpd-cleanup',
      method: 'POST',
    }, error as Error);
    return createErrorResponse('Erro ao executar limpeza de dados', null, 500);
  }
}

