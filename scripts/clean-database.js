const { PrismaClient } = require('@prisma/client');
const { config } = require('dotenv');

// Carregar variáveis de ambiente
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    console.log('🧹 Limpando dados de exemplo do banco de dados...\n');

    // Contar antes de deletar
    const contactsCount = await prisma.contact.count();
    const newsletterCount = await prisma.newsletterSubscriber.count();
    const auditsCount = await prisma.seoAudit.count();
    const roiCount = await prisma.roiCalculation.count();

    console.log('📊 Dados antes da limpeza:');
    console.log(`   Contatos: ${contactsCount}`);
    console.log(`   Newsletter: ${newsletterCount}`);
    console.log(`   Auditorias SEO: ${auditsCount}`);
    console.log(`   Cálculos ROI: ${roiCount}\n`);

    // Deletar todos os dados (mas manter usuários)
    await prisma.contact.deleteMany({});
    console.log('✅ Contatos deletados');

    await prisma.newsletterSubscriber.deleteMany({});
    console.log('✅ Assinantes da newsletter deletados');

    await prisma.seoAudit.deleteMany({});
    console.log('✅ Auditorias SEO deletadas');

    await prisma.roiCalculation.deleteMany({});
    console.log('✅ Cálculos ROI deletados');

    console.log('\n🎉 Limpeza concluída!');
    console.log('💡 Os usuários admin foram mantidos.');
    console.log('💡 O dashboard agora deve mostrar zeros (0).\n');

    // Verificar após limpeza
    const finalContacts = await prisma.contact.count();
    const finalNewsletter = await prisma.newsletterSubscriber.count();
    const finalAudits = await prisma.seoAudit.count();
    const finalRoi = await prisma.roiCalculation.count();

    console.log('📊 Dados após limpeza:');
    console.log(`   Contatos: ${finalContacts}`);
    console.log(`   Newsletter: ${finalNewsletter}`);
    console.log(`   Auditorias SEO: ${finalAudits}`);
    console.log(`   Cálculos ROI: ${finalRoi}`);

  } catch (error) {
    console.error('❌ Erro ao limpar banco:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

cleanDatabase()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  });

