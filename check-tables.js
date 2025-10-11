const { PrismaClient } = require('@prisma/client');

async function checkTables() {
  const prisma = new PrismaClient();
  
  try {
    // Tentar listar as tabelas
    const result = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('Tabelas existentes:', result);
    
    // Tentar acessar cada modelo
    try {
      const users = await prisma.user.findMany();
      console.log('✅ Modelo User funciona');
    } catch (e) {
      console.log('❌ Modelo User não funciona:', e.message);
    }
    
    try {
      const contacts = await prisma.contact.findMany();
      console.log('✅ Modelo Contact funciona');
    } catch (e) {
      console.log('❌ Modelo Contact não funciona:', e.message);
    }
    
    try {
      const newsletter = await prisma.newsletterSubscriber.findMany();
      console.log('✅ Modelo NewsletterSubscriber funciona');
    } catch (e) {
      console.log('❌ Modelo NewsletterSubscriber não funciona:', e.message);
    }
    
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTables();