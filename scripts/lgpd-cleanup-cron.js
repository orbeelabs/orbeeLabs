#!/usr/bin/env node

/**
 * Script de Limpeza Automática de Dados - LGPD
 * 
 * Este script deve ser executado periodicamente (ex: via cron job) para limpar
 * dados antigos conforme a política de retenção.
 * 
 * Exemplo de cron job (executar diariamente às 2h da manhã):
 * 0 2 * * * cd /caminho/do/projeto && node scripts/lgpd-cleanup-cron.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const RETENTION_POLICIES = {
  contacts: 3 * 365 * 24 * 60 * 60 * 1000, // 3 anos
  seoAudits: 2 * 365 * 24 * 60 * 60 * 1000, // 2 anos
  roiCalculations: 1 * 365 * 24 * 60 * 60 * 1000, // 1 ano
};

async function cleanExpiredData() {
  const now = new Date();
  const results = {
    contacts: 0,
    seoAudits: 0,
    roiCalculations: 0,
  };

  try {
    console.log('🧹 Iniciando limpeza automática de dados (LGPD)...\n');

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
    console.log(`✅ ${results.contacts} contatos antigos removidos`);

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
    console.log(`✅ ${results.seoAudits} auditorias SEO antigas removidas`);

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
    console.log(`✅ ${results.roiCalculations} cálculos ROI antigos removidos`);

    const total = results.contacts + results.seoAudits + results.roiCalculations;
    console.log(`\n🎉 Limpeza concluída! Total: ${total} registros removidos.`);

    return results;
  } catch (error) {
    console.error('❌ Erro ao limpar dados antigos:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  cleanExpiredData()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Erro fatal:', error);
      process.exit(1);
    });
}

module.exports = { cleanExpiredData };

