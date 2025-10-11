import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Criar usuário admin
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await hash(adminPassword, 10);
           await prisma.user.upsert({
      where: { email: 'admin@orbeelabs.com' },
      update: {
        password: hashedPassword,
      },
      create: {
        name: 'Admin Orbee Labs',
        email: 'admin@orbeelabs.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Usuário admin criado/atualizado');

    // Criar contatos de exemplo
    await prisma.contact.createMany({
      data: [
        {
          name: 'João Silva',
          email: 'joao.silva@example.com',
          phone: '11987654321',
          company: 'Silva Tech',
          message: 'Gostaria de saber mais sobre a metodologia SEO Cabuloso para minha empresa.',
        },
        {
          name: 'Maria Souza',
          email: 'maria.souza@example.com',
          phone: '21912345678',
          company: 'Souza Marketing',
          message: 'Preciso de ajuda com SEO para meu e-commerce de cosméticos.',
        },
      ],
      skipDuplicates: true,
    });
    console.log('✅ Contatos criados: 2');

    // Criar assinantes da newsletter
    await prisma.newsletterSubscriber.upsert({
      where: { email: 'assinante@example.com' },
      update: {},
      create: {
        email: 'assinante@example.com',
        name: 'Carlos Assinante',
        source: 'website-footer',
        status: 'ACTIVE',
      },
    });
    console.log('✅ Assinantes criados: 1');

    // Criar auditorias SEO de exemplo
    await prisma.seoAudit.create({
      data: {
        url: 'https://example.com',
        score: 85,
        data: JSON.stringify({
          title: 'Example Site',
          description: 'A great example site',
          score: 85,
          recommendations: ['Improve page speed', 'Add more content']
        }),
      },
    });
    console.log('✅ Auditorias SEO criadas: 1');

    // Criar cálculos de ROI de exemplo
    await prisma.roiCalculation.create({
      data: {
        data: JSON.stringify({
          currentTraffic: 1000,
          targetTraffic: 5000,
          conversionRate: 0.02,
          averageOrderValue: 500
        }),
        result: JSON.stringify({
          projectedRevenue: 50000,
          roi: 500,
          paybackPeriod: 6
        }),
      },
    });
    console.log('✅ Cálculos de ROI criados: 1');

    console.log('🎉 Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });