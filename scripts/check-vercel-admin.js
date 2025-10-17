const { PrismaClient } = require('@prisma/client');
const { config } = require('dotenv');

// Carregar variáveis de ambiente
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function checkVercelAdmin() {
  try {
    console.log('🔍 Verificando usuário admin na Vercel...');
    
    const adminEmail = process.env.ADMIN_EMAIL;
    console.log('📧 Email configurado:', adminEmail);
    
    if (!adminEmail) {
      console.error('❌ ADMIN_EMAIL não configurado nas variáveis de ambiente');
      return;
    }
    
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (user) {
      console.log('✅ Usuário admin encontrado:');
      console.log('   ID:', user.id);
      console.log('   Nome:', user.name);
      console.log('   Email:', user.email);
      console.log('   Role:', user.role);
      console.log('   Criado em:', user.createdAt);
    } else {
      console.log('❌ Usuário admin NÃO encontrado!');
      console.log('💡 Execute o script create-admin.js para criar o usuário');
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkVercelAdmin();
