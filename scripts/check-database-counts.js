const { PrismaClient } = require('@prisma/client');
const { config } = require('dotenv');

// Carregar variáveis de ambiente
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function checkCounts() {
  try {
    console.log('🔍 Verificando dados reais no banco de dados...\n');

    // Contar cada tipo de dado
    const contactsCount = await prisma.contact.count();
    const newsletterCount = await prisma.newsletterSubscriber.count();
    const auditsCount = await prisma.seoAudit.count();
    const roiCount = await prisma.roiCalculation.count();

    console.log('📊 DADOS REAIS NO BANCO:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Contatos:        ${contactsCount}`);
    console.log(`📨 Newsletter:      ${newsletterCount}`);
    console.log(`🔍 Auditorias SEO:  ${auditsCount}`);
    console.log(`📈 Cálculos ROI:    ${roiCount}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Verificar se há dados
    const total = contactsCount + newsletterCount + auditsCount + roiCount;
    
    if (total === 0) {
      console.log('⚠️  BANCO VAZIO: Não há dados no banco!');
      console.log('💡 Os números que aparecem no dashboard devem estar mockados.');
      console.log('💡 Ou há um erro nas APIs retornando valores fixos.\n');
    } else {
      console.log(`✅ Total de registros: ${total}`);
      console.log('💡 Esses números devem aparecer no dashboard.\n');
    }

    // Mostrar alguns exemplos de dados
    if (contactsCount > 0) {
      const sampleContacts = await prisma.contact.findMany({ take: 3 });
      console.log('📋 Exemplos de Contatos:');
      sampleContacts.forEach((contact, i) => {
        console.log(`   ${i + 1}. ${contact.name} (${contact.email}) - ${contact.createdAt.toLocaleDateString()}`);
      });
      console.log('');
    }

    if (newsletterCount > 0) {
      const sampleNewsletter = await prisma.newsletterSubscriber.findMany({ take: 3 });
      console.log('📨 Exemplos de Newsletter:');
      sampleNewsletter.forEach((sub, i) => {
        console.log(`   ${i + 1}. ${sub.email} - ${sub.createdAt.toLocaleDateString()}`);
      });
      console.log('');
    }

  } catch (error) {
    console.error('❌ Erro ao verificar banco:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkCounts()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  });

