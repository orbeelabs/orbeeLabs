const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
const { config } = require('dotenv');

// Carregar variáveis de ambiente
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔧 Criando usuário admin em produção...');
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required');
    }
    
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Senha configurada:', adminPassword ? 'Sim' : 'Não');
    
    const hashedPassword = await hash(adminPassword, 10);
    
    const user = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
      },
      create: {
        name: 'Admin Orbee Labs',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    
    console.log('✅ Usuário admin criado/atualizado com sucesso!');
    console.log('👤 ID:', user.id);
    console.log('📧 Email:', user.email);
    console.log('🔑 Role:', user.role);
    
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
