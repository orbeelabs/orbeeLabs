const { PrismaClient } = require('@prisma/client');
const { config } = require('dotenv');
const { compare, hash } = require('bcryptjs');

// Carregar variáveis de ambiente
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function testLogin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      console.log('❌ ADMIN_EMAIL ou ADMIN_PASSWORD não encontrados no .env.local');
      process.exit(1);
    }

    console.log('🔐 Testando login...');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Testando senha do .env.local...');
    
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!user) {
      console.log('❌ Usuário não encontrado!');
      return;
    }

    console.log('✅ Usuário encontrado no banco');
    
    // Testar a senha
    const isValid = await compare(adminPassword, user.password);
    
    if (isValid) {
      console.log('✅✅✅ SENHA ESTÁ CORRETA! O login DEVE funcionar!');
      console.log('');
      console.log('💡 Verifique se está digitando:');
      console.log('   Email:', adminEmail);
      console.log('   Senha: [PROTEGIDA - não exibida por segurança]');
    } else {
      console.log('❌❌❌ SENHA ESTÁ INCORRETA no banco!');
      console.log('💡 Vamos atualizar a senha no banco...');
      
      // Atualizar senha
      const newHashedPassword = await hash(adminPassword, 10);
      await prisma.user.update({
        where: { email: adminEmail },
        data: { password: newHashedPassword }
      });
      
      console.log('✅ Senha atualizada no banco!');
      
      // Testar novamente
      const isValidNow = await compare(adminPassword, (await prisma.user.findUnique({ where: { email: adminEmail } })).password);
      if (isValidNow) {
        console.log('✅✅✅ Agora a senha está correta! Tente fazer login novamente!');
      }
    }
  } catch (error) {
    console.error('❌ Erro:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testLogin()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  });

