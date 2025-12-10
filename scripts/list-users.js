const { PrismaClient } = require('@prisma/client');
const { config } = require('dotenv');

// Carregar variáveis de ambiente
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function listUsers() {
  try {
    console.log('👤 Listando todos os usuários no banco de dados...\n');

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' }
    });

    if (users.length === 0) {
      console.log('⚠️  Nenhum usuário encontrado no banco!');
      return;
    }

    console.log(`📊 Total de usuários: ${users.length}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.role === 'ADMIN' ? '🔑 ADMIN' : '👤 USER'}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Nome: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Criado em: ${user.createdAt.toLocaleString('pt-BR')}`);
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const adminCount = users.filter(u => u.role === 'ADMIN').length;
    const userCount = users.filter(u => u.role === 'USER').length;
    
    console.log(`\n📊 Resumo:`);
    console.log(`   Admins: ${adminCount}`);
    console.log(`   Usuários: ${userCount}`);

    if (adminCount === 0) {
      console.log('\n⚠️  ATENÇÃO: Nenhum usuário ADMIN encontrado!');
      console.log('💡 Execute: node scripts/create-admin.js');
    }

  } catch (error) {
    console.error('❌ Erro ao listar usuários:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

listUsers()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  });

