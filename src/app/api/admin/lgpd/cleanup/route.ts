import { NextRequest } from 'next/server';
import { cleanExpiredData } from '@/lib/lgpd/data-retention';
import { withAdmin, createSuccessResponse, createErrorResponse } from '@/lib/api';
import { Logger } from '@/lib/logger';

/**
 * POST /api/admin/lgpd/cleanup
 * Executa limpeza manual de dados antigos (apenas admin)
 */
async function handleCleanup(request: NextRequest) {
  try {
    const results = await cleanExpiredData();

    return createSuccessResponse(
      results,
      `Limpeza concluída: ${results.contacts} contatos, ${results.seoAudits} auditorias e ${results.roiCalculations} cálculos ROI removidos`
    );
  } catch (error) {
    Logger.error('Erro na limpeza de dados', {
      endpoint: '/api/admin/lgpd/cleanup',
      method: 'POST',
    }, error as Error);
    return createErrorResponse('Erro ao executar limpeza de dados', null, 500);
  }
}

export const POST = withAdmin(handleCleanup);

