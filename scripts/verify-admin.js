const { PrismaClient } = require('@prisma/client');
const { config } = require('dotenv');
const { compare } = require('bcryptjs');

// Carregar variáveis de ambiente
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function verifyAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.log('❌ ADMIN_EMAIL não encontrado no .env.local');
      process.exit(1);
    }

    console.log('🔍 Verificando usuário admin no banco...');
    console.log('📧 Email procurado:', adminEmail);
    
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!user) {
      console.log('❌ Usuário não encontrado no banco!');
      console.log('💡 Vamos criar o usuário agora...');
      return false;
    }

    console.log('✅ Usuário encontrado!');
    console.log('👤 ID:', user.id);
    console.log('📧 Email:', user.email);
    console.log('🔑 Role:', user.role);
    console.log('📅 Criado em:', user.createdAt);
    
    // Testar senha
    const testPassword = process.env.ADMIN_PASSWORD;
    if (testPassword) {
      const isValid = await compare(testPassword, user.password);
      if (isValid) {
        console.log('✅ Senha está CORRETA no banco!');
      } else {
        console.log('❌ Senha está INCORRETA no banco!');
        console.log('💡 A senha no banco não corresponde à senha do .env.local');
      }
    } else {
      console.log('⚠️ ADMIN_PASSWORD não encontrado no .env.local');
    }

    return true;
  } catch (error) {
    console.error('❌ Erro ao verificar admin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

verifyAdmin()
  .then((userExists) => {
    if (!userExists) {
      console.log('\n🔧 Executando create-admin.js...');
      const { exec } = require('child_process');
      exec('node scripts/create-admin.js', (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Erro ao criar admin:', error);
          return;
        }
        console.log(stdout);
      });
    }
  })
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  });

