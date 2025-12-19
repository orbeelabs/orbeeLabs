/**
 * Script para atualizar os posts do blog com as imagens existentes
 * em public/images/blog/
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mapeamento de imagens para posts (baseado no título ou slug)
const imageMapping: Record<string, string> = {
  // Mapeamento por título (case-insensitive)
  'seo-vx': '/images/blog/Seo Cabuloso.webp',
  'pesquisa de palavras-chave': '/images/blog/Pesquisa de Palavras-chave.webp',
  'link building': '/images/blog/Link Building.webp',
  'conteúdo que converte': '/images/blog/Conteúdo que converte.webp',
  'auditoria de site': '/images/blog/Auditoria de Site.webp',
  
  // Mapeamento por slug (caso os títulos sejam diferentes)
  'seo-cabuloso': '/images/blog/Seo Cabuloso.webp',
  'pesquisa-palavras-chave': '/images/blog/Pesquisa de Palavras-chave.webp',
  'link-building': '/images/blog/Link Building.webp',
  'conteudo-que-converte': '/images/blog/Conteúdo que converte.webp',
  'auditoria-site': '/images/blog/Auditoria de Site.webp',
};

async function updateBlogImages() {
  try {
    console.log('🔄 Iniciando atualização de imagens do blog...\n');

    // Buscar todos os posts
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        ogImage: true,
      },
    });

    console.log(`📝 Encontrados ${posts.length} posts no banco de dados\n`);

    let updated = 0;
    let skipped = 0;

    for (const post of posts) {
      // Normalizar título e slug para busca
      const normalizedTitle = post.title.toLowerCase().trim();
      const normalizedSlug = post.slug.toLowerCase().trim();

      // Tentar encontrar imagem correspondente
      let imagePath: string | null = null;

      // Buscar por título
      for (const [key, path] of Object.entries(imageMapping)) {
        if (normalizedTitle.includes(key.toLowerCase()) || normalizedSlug.includes(key.toLowerCase())) {
          imagePath = path;
          break;
        }
      }

      // Se não encontrou, tentar busca mais flexível
      if (!imagePath) {
        // Buscar palavras-chave no título
        if (normalizedTitle.includes('seo') && (normalizedTitle.includes('cabuloso') || normalizedTitle.includes('vx'))) {
          imagePath = '/images/blog/Seo Cabuloso.webp';
        } else if (normalizedTitle.includes('palavras-chave') || normalizedTitle.includes('pesquisa')) {
          imagePath = '/images/blog/Pesquisa de Palavras-chave.webp';
        } else if (normalizedTitle.includes('link') && normalizedTitle.includes('building')) {
          imagePath = '/images/blog/Link Building.webp';
        } else if (normalizedTitle.includes('conteúdo') || normalizedTitle.includes('conteudo')) {
          imagePath = '/images/blog/Conteúdo que converte.webp';
        } else if (normalizedTitle.includes('auditoria')) {
          imagePath = '/images/blog/Auditoria de Site.webp';
        }
      }

      if (imagePath) {
        // Verificar se já tem imagem diferente
        if (post.ogImage && post.ogImage !== imagePath) {
          console.log(`⚠️  Post "${post.title}" já tem imagem: ${post.ogImage}`);
          console.log(`   Será atualizado para: ${imagePath}\n`);
        }

        // Atualizar post
        await prisma.post.update({
          where: { id: post.id },
          data: { ogImage: imagePath },
        });

        console.log(`✅ Atualizado: "${post.title}"`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   Imagem: ${imagePath}\n`);
        updated++;
      } else {
        console.log(`⏭️  Pulado: "${post.title}" (nenhuma imagem correspondente encontrada)`);
        if (post.ogImage) {
          console.log(`   Imagem atual: ${post.ogImage}\n`);
        } else {
          console.log(`   Sem imagem\n`);
        }
        skipped++;
      }
    }

    console.log('\n📊 Resumo:');
    console.log(`   ✅ Atualizados: ${updated}`);
    console.log(`   ⏭️  Pulados: ${skipped}`);
    console.log(`   📝 Total: ${posts.length}\n`);

    console.log('✨ Atualização concluída!\n');

  } catch (error) {
    console.error('❌ Erro ao atualizar imagens:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar script
updateBlogImages()
  .then(() => {
    console.log('🎉 Script executado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  });

