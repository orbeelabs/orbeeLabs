const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
const { config } = require('dotenv');

// Carregar variáveis de ambiente
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function syncAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log('❌ ADMIN_EMAIL ou ADMIN_PASSWORD não encontrados no .env.local');
      process.exit(1);
    }

    console.log('🔍 Verificando configuração do .env.local...');
    console.log(`📧 Email configurado: ${adminEmail}\n`);

    // Listar todos os admins existentes
    const allAdmins = await prisma.user.findMany({
      where: { role: 'ADMIN' }
    });

    console.log(`📊 Admins encontrados no banco: ${allAdmins.length}`);
    allAdmins.forEach((admin, i) => {
      console.log(`   ${i + 1}. ${admin.email} (ID: ${admin.id})`);
    });

    // Deletar todos os admins EXCETO o que está no .env.local
    const adminsToDelete = allAdmins.filter(a => a.email !== adminEmail);
    
    if (adminsToDelete.length > 0) {
      console.log(`\n🗑️  Deletando ${adminsToDelete.length} admin(s) que não correspondem ao .env.local:`);
      for (const admin of adminsToDelete) {
        await prisma.user.delete({
          where: { id: admin.id }
        });
        console.log(`   ✅ Deletado: ${admin.email}`);
      }
    } else {
      console.log('\n✅ Nenhum admin precisa ser deletado');
    }

    // Garantir que o admin do .env.local existe (criar ou atualizar)
    console.log(`\n🔧 Garantindo que o admin ${adminEmail} existe...`);
    const hashedPassword = await hash(adminPassword, 10);

    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
        name: 'Admin Orbee Labs',
      },
      create: {
        name: 'Admin Orbee Labs',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin do .env.local configurado/atualizado!');
    console.log(`   ID: ${admin.id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);

    // Verificar resultado final
    const finalAdmins = await prisma.user.findMany({
      where: { role: 'ADMIN' }
    });

    console.log(`\n📊 Total de admins no banco: ${finalAdmins.length}`);
    if (finalAdmins.length === 1) {
      console.log('✅ Perfeito! Apenas o admin do .env.local existe.');
    } else {
      console.log('⚠️  Ainda existem outros admins no banco!');
    }

  } catch (error) {
    console.error('❌ Erro:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

syncAdmin()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  });

