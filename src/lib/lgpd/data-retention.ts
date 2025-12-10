/**
 * Política de Retenção de Dados - LGPD
 * 
 * Implementa limpeza automática de dados antigos conforme política de retenção:
 * - Contatos: 3 anos após criação
 * - Newsletter: mantido até cancelamento
 * - Auditorias SEO: 2 anos após criação
 * - Cálculos ROI: 1 ano após criação
 */

import prisma from '@/lib/prisma';
import { Logger } from '@/lib/logger';

const RETENTION_POLICIES = {
  contacts: 3 * 365 * 24 * 60 * 60 * 1000, // 3 anos em milissegundos
  seoAudits: 2 * 365 * 24 * 60 * 60 * 1000, // 2 anos
  roiCalculations: 1 * 365 * 24 * 60 * 60 * 1000, // 1 ano
} as const;

/**
 * Limpa dados antigos conforme política de retenção
 */
export async function cleanExpiredData() {
  const now = new Date();
  const results = {
    contacts: 0,
    seoAudits: 0,
    roiCalculations: 0,
  };

  try {
    // Limpar contatos antigos (3 anos)
    const contactsCutoff = new Date(now.getTime() - RETENTION_POLICIES.contacts);
    const deletedContacts = await prisma.contact.deleteMany({
      where: {
        createdAt: {
          lt: contactsCutoff,
        },
      },
    });
    results.contacts = deletedContacts.count;

    // Limpar auditorias SEO antigas (2 anos)
    const auditsCutoff = new Date(now.getTime() - RETENTION_POLICIES.seoAudits);
    const deletedAudits = await prisma.seoAudit.deleteMany({
      where: {
        createdAt: {
          lt: auditsCutoff,
        },
      },
    });
    results.seoAudits = deletedAudits.count;

    // Limpar cálculos ROI antigos (1 ano)
    const roiCutoff = new Date(now.getTime() - RETENTION_POLICIES.roiCalculations);
    const deletedROI = await prisma.roiCalculation.deleteMany({
      where: {
        createdAt: {
          lt: roiCutoff,
        },
      },
    });
    results.roiCalculations = deletedROI.count;

    Logger.info('Limpeza de dados antigos concluída', {
      operation: 'lgpd-cleanup',
      contacts: results.contacts,
      seoAudits: results.seoAudits,
      roiCalculations: results.roiCalculations,
    });

    return results;
  } catch (error) {
    Logger.error('Erro ao limpar dados antigos', {
      operation: 'lgpd-cleanup',
    }, error as Error);
    throw error;
  }
}

/**
 * Retorna informações sobre a política de retenção
 */
export function getRetentionPolicy() {
  return {
    contacts: {
      period: '3 anos',
      description: 'Contatos são mantidos por 3 anos após a criação',
    },
    newsletter: {
      period: 'Até cancelamento',
      description: 'Dados de newsletter são mantidos até o usuário cancelar a inscrição',
    },
    seoAudits: {
      period: '2 anos',
      description: 'Auditorias SEO são mantidas por 2 anos após a criação',
    },
    roiCalculations: {
      period: '1 ano',
      description: 'Cálculos de ROI são mantidos por 1 ano após a criação',
    },
  };
}

