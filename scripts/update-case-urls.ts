import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Script para atualizar URLs dos sites dos clientes nos cases de sucesso
 */
async function main() {
  console.log('🔄 Atualizando URLs dos sites dos clientes...\n');

  const updates = [
    {
      slug: 'dra-laura-thiersch-neuropediatra',
      siteUrl: 'https://lauraneuroped.com.br/',
      clientName: 'Dra. Laura Thiersch - Neuropediatra',
    },
    {
      slug: 'dra-bruna-vilela-neuropediatra',
      siteUrl: 'https://brunavilelaneuroped.com.br/',
      clientName: 'Dra. Bruna Vilela - Neuropediatra',
    },
    {
      slug: 'eric-moreira-psicologo-tcc',
      siteUrl: 'https://www.psicologoericmoreira.com.br/',
      clientName: 'Eric Moreira - Psicólogo Especialista em TCC',
    },
    {
      slug: 'dra-giovana-endocrinologia',
      siteUrl: 'https://giovanaendocrinoped.com.br/',
      clientName: 'Dra. Giovana Martins - Endocrinologista Pediátrica',
    },
  ];

  for (const update of updates) {
    try {
      const caseStudy = await prisma.caseStudy.update({
        where: { slug: update.slug },
        data: {
          siteUrl: update.siteUrl,
        },
      });

      console.log(`✅ ${update.clientName}`);
      console.log(`   Slug: ${update.slug}`);
      console.log(`   URL: ${update.siteUrl}\n`);
    } catch (error) {
      console.error(`❌ Erro ao atualizar ${update.slug}:`, error);
    }
  }

  console.log('✨ Atualização concluída!');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

