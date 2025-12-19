import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { config } from 'dotenv';

// Carregar variáveis de ambiente
config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Criar usuário admin
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD environment variable is required');
    }
    const hashedPassword = await hash(adminPassword, 10);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      throw new Error('ADMIN_EMAIL environment variable is required');
    }
    
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
      },
      create: {
        name: 'Admin Orbee Labs',
        email: adminEmail,
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
          message: 'Gostaria de saber mais sobre a metodologia SEO-VX para minha empresa.',
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

    // ===== BLOG POSTS =====
    console.log('📝 Criando posts do blog...');
    
    const posts = [
      {
        slug: 'seo-cabuloso-metodologia-6-pilares',
        title: 'SEO-VX: A Metodologia Completa com 6 Pilares (Guia Definitivo)',
        excerpt: 'Aprenda a metodologia SEO-VX que gerou +400% ROI para Dra. Bruna e 83 leads em 2 meses para Dra. Laura. Guia completo com os 6 pilares essenciais.',
        content: '<h1>SEO-VX: A Metodologia Completa</h1><p>SEO-VX é uma metodologia testada e comprovada que funciona em qualquer nicho...</p><h2>Os 6 Pilares</h2><h3>Pilar 1: Auditoria e Diagnóstico</h3><p>Primeiro passo é entender onde você está...</p><h3>Pilar 2: Pesquisa de Palavras-Chave</h3><p>Encontrar keywords que trazem clientes reais...</p><h3>Pilar 3: Otimização Técnica</h3><p>SEO on-page e performance...</p><h3>Pilar 4: Conteúdo Educativo</h3><p>Criar conteúdo que converte...</p><h3>Pilar 5: Link Building</h3><p>Construir autoridade através de links de qualidade...</p><h3>Pilar 6: Monitoramento Contínuo</h3><p>Acompanhar e otimizar constantemente...</p>',
        author: 'Diana Caldeiras',
        authorImage: '/images/authors/diana.jpg',
        category: 'SEO Avançado',
        tags: ['SEO-VX', 'Metodologia SEO', 'Estratégia Digital', 'Marketing Digital'],
        featured: true,
        published: true,
        publishedAt: new Date('2024-01-15'),
        seoTitle: 'SEO-VX: Metodologia Completa com 6 Pilares | Orbee Labs',
        seoDescription: 'Aprenda a metodologia SEO-VX que gerou +400% ROI. Guia completo com os 6 pilares essenciais para dominar o Google.',
      },
      {
        slug: 'auditoria-site-5-problemas-ranking',
        title: 'Auditoria de Site: Os 5 Maiores Problemas que Impedem Seu Ranking no Google',
        excerpt: 'Seu site não ranqueia? Descubra os 5 maiores problemas que impedem seu sucesso no Google. Guia prático com checklist para auditoria.',
        content: '<h1>Auditoria de Site: Os 5 Maiores Problemas</h1><p>Seu site existe. Mas ninguém o encontra. Você já se perguntou por quê?</p><h2>Problema #1: Site Lento</h2><p>Google mede velocidade através de Core Web Vitals...</p><h2>Problema #2: Não é Mobile-Friendly</h2><p>70% do tráfego é mobile...</p><h2>Problema #3: Estrutura Ruim</h2><p>Código desorganizado confunde o Google...</p><h2>Problema #4: Conteúdo Genérico</h2><p>Google precisa entender o que seu site faz...</p><h2>Problema #5: Sem Authority</h2><p>Links são votos de confiança...</p>',
        author: 'Diana Caldeiras',
        authorImage: '/images/authors/diana.jpg',
        category: 'SEO Avançado',
        tags: ['Auditoria SEO', 'Diagnóstico de Site', 'Google', 'Performance Web', 'SEO Técnico'],
        featured: true,
        published: true,
        publishedAt: new Date('2024-02-01'),
        seoTitle: 'Auditoria de Site: 5 Problemas que Impedem Ranking | Orbee Labs',
        seoDescription: 'Descubra os 5 maiores problemas que impedem seu site de ranquear no Google. Guia prático com checklist completo.',
      },
      {
        slug: 'pesquisa-palavras-chave-keywords-clientes-reais',
        title: 'Pesquisa de Palavras-Chave: Como Encontrar Keywords que Trazem Clientes REAIS',
        excerpt: 'Aprenda a fazer pesquisa de palavras-chave que traz CLIENTES REAIS e não apenas tráfego genérico. Guia com exemplos práticos.',
        content: '<h1>Pesquisa de Palavras-Chave</h1><p>Nem toda palavra-chave que traz tráfego traz CLIENTES...</p><h2>O Problema: Volume ≠ Clientes</h2><p>Focar apenas em volume de busca é um erro comum...</p><h2>Long-Tail vs Head Terms</h2><p>Head Terms são genéricas e difíceis. Long-Tail são específicas e convertem melhor...</p><h2>Como Fazer Pesquisa</h2><p>Passo a passo completo para encontrar keywords que realmente funcionam...</p>',
        author: 'Diana Caldeiras',
        authorImage: '/images/authors/diana.jpg',
        category: 'SEO Avançado',
        tags: ['Palavras-Chave', 'Keywords', 'Pesquisa SEO', 'Estratégia Digital', 'Tráfego Qualificado'],
        featured: false,
        published: true,
        publishedAt: new Date('2024-02-15'),
        seoTitle: 'Pesquisa de Palavras-Chave: Encontrar Keywords que Convertem | Orbee Labs',
        seoDescription: 'Aprenda a fazer pesquisa de palavras-chave que traz clientes reais. Guia completo com exemplos práticos.',
      },
      {
        slug: 'conteudo-educativo-que-converte-blog-posts',
        title: 'Conteúdo Educativo que Converte: Como Criar Blog Posts que Trazem Clientes',
        excerpt: 'Aprenda como criar conteúdo educativo que não apenas rankeia no Google, mas também converte visitantes em clientes reais.',
        content: '<h1>Conteúdo Educativo que Converte</h1><p>Conteúdo não é apenas para ranquear. É para CONVERTER...</p><h2>Por Que Conteúdo Educativo Funciona</h2><p>Pessoas buscam informações antes de contratar...</p><h2>Como Criar Conteúdo que Converte</h2><p>Estrutura, otimização SEO e CTAs estratégicos...</p>',
        author: 'Diana Caldeiras',
        authorImage: '/images/authors/diana.jpg',
        category: 'Marketing Digital',
        tags: ['Conteúdo', 'Blog', 'Marketing de Conteúdo', 'Conversão', 'SEO'],
        featured: true,
        published: true,
        publishedAt: new Date('2024-03-01'),
        seoTitle: 'Conteúdo Educativo que Converte: Guia Completo | Orbee Labs',
        seoDescription: 'Aprenda a criar conteúdo educativo que rankeia no Google e converte visitantes em clientes reais.',
      },
      {
        slug: 'link-building-backlinks-qualidade-seo',
        title: 'Link Building: Como Conseguir Backlinks de Qualidade (Sem Comprar Junk)',
        excerpt: 'Guia completo de link building ético e eficiente. Aprenda 5 estratégias comprovadas para conseguir backlinks que realmente funcionam no Google.',
        content: '<h1>Link Building: Como Conseguir Backlinks de Qualidade</h1><p>Links são "votos de confiança" para o Google...</p><h2>Por Que Links Importam</h2><p>Google usa links como ranking factor principal...</p><h2>5 Estratégias Éticas</h2><h3>Estratégia 1: Guest Posting</h3><p>Publicar artigos em blogs respeitados...</p><h3>Estratégia 2: Conteúdo Original</h3><p>Criar conteúdo tão bom que linkam naturalmente...</p><h3>Estratégia 3: Parcerias</h3><p>Co-criar conteúdo com empresas complementares...</p><h3>Estratégia 4: Diretórios</h3><p>Cadastro em diretórios respeitados...</p><h3>Estratégia 5: Link Reclamation</h3><p>Encontrar menções e pedir link...</p>',
        author: 'Diana Caldeiras',
        authorImage: '/images/authors/diana.jpg',
        category: 'SEO Avançado',
        tags: ['Link Building', 'Backlinks', 'SEO Off-Page', 'Authority Building', 'Estratégia SEO'],
        featured: true,
        published: true,
        publishedAt: new Date('2024-03-15'),
        seoTitle: 'Link Building: Como Conseguir Backlinks de Qualidade | Orbee Labs',
        seoDescription: 'Guia completo de link building ético. Aprenda 5 estratégias comprovadas para conseguir backlinks que funcionam.',
      },
    ];

    for (const post of posts) {
      await prisma.post.upsert({
        where: { slug: post.slug },
        update: {},
        create: post,
      });
    }
    console.log(`✅ Posts do blog criados: ${posts.length}`);

    // ===== CASE STUDIES =====
    console.log('📊 Criando cases de sucesso...');

    const caseStudies = [
      {
        slug: 'dra-bruna-vilela-neuropediatra',
        title: 'Neuropediatra Cientista - De 0 Leads para Agenda 100% Ocupada em 2 Meses',
        description: 'Dra. Bruna era neuropediatra altamente qualificada, mas com zero presença digital. Todos os pacientes vinham apenas por indicação presencial. Em 2 meses, sua agenda estava 100% ocupada com ROI de +400%.',
        clientName: 'Dra. Bruna Vilela - Neuropediatra',
        industry: 'Saúde',
        services: ['SEO-VX', 'Desenvolvimento Web', 'Estratégia Digital'],
        technologies: ['React 19', 'TypeScript', 'Vite 7', 'CSS Modules', 'Framer Motion', 'PWA', 'SEO Avançado'],
        challenge: 'Dra. Bruna era neuropediatra altamente qualificada, mas com zero presença digital. Todos os pacientes vinham apenas por indicação presencial, o que limitava drasticamente o crescimento. Ela tinha apenas 1 turno disponível (5 agendamentos por semana máximo), então cada paciente não agendado era uma oportunidade perdida. O desafio era: posicionar Dra. Bruna como autoridade digital em neuropediatria, atraindo pais preocupados com desenvolvimento infantil (TDAH, TEA, epilepsia) e convertendo visitantes em agendamentos.',
        solution: '<p>Implementamos a estratégia completa SEO-VX com 6 pilares:</p><p><strong>1. Auditoria e Diagnóstico:</strong> Identificamos que ela precisava de presença digital forte em termos de autoridade (E-E-A-T) e otimização local.</p><p><strong>2. Pesquisa de Palavras-Chave:</strong> Encontramos as keywords que pais realmente buscavam: "neuropediatra para TDAH em BH", "especialista em autismo infantil", "desenvolvimento neurológico infantil", etc.</p><p><strong>3. Desenvolvimento Web Moderno:</strong> Criamos um site com stack moderna (React 19 + TypeScript + Vite), focado em velocidade (LCP &lt; 0.7s), mobile-first (70% do tráfego), PWA (funciona offline) e conversão (CTA claros para agendamento).</p><p><strong>4. SEO Técnico:</strong> Otimizamos title tags, meta descriptions, estrutura H1-H2-H3 lógica, dados estruturados (JSON-LD) e Core Web Vitals.</p><p><strong>5. Conteúdo Educativo:</strong> Criamos blog com artigos sobre TDAH, autismo e desenvolvimento neurológico, cada um posicionado para keywords específicas.</p><p><strong>6. Link Building e Authority:</strong> Posicionamos Dra. Bruna como autoridade através de menções em sites respeitados, Google My Business otimizado e reviews de qualidade.</p>',
        results: JSON.stringify({
          CTR: '8,21%',
          conversao: '4%',
          agenda: '100% ocupada até novembro',
          agendamentos_por_semana: 5,
          roi: '+400% em 2 meses',
          status: 'Agenda fechada (sem capacidade de atender mais)',
        }),
        duration: '2 meses (resultados iniciais) / 6 meses (consolidação)',
        timeline: '<ul><li>Semana 1-2: Auditoria + Pesquisa de Keywords + Design</li><li>Semana 3-4: Desenvolvimento do site + SEO técnico</li><li>Semana 5-6: Primeira leva de conteúdo + Google My Business</li><li>Semana 7-8: Otimizações finais + Lançamento</li><li>Semana 9-12: Resultados consolidados</li></ul>',
        learnings: 'Se pudéssemos refazer, teríamos implementado o formulário de agendamento online no primeiro mês ao invés do segundo, pois isso acelerou os resultados em ~30 dias.',
        featured: true,
        published: true,
        publishedAt: new Date('2024-01-01'),
      },
      {
        slug: 'dra-laura-thiersch-neuropediatra',
        title: 'Neuropediatra com Múltiplos Turnos - 83 Leads em 2 Meses com R$ 5,24 por Lead',
        description: 'Dra. Laura tinha 4 turnos disponíveis (4x mais que Dra. Bruna). Aplicamos a metodologia SEO-VX escalada, gerando 83 leads em 2 meses com custo de apenas R$ 5,24 por lead e 31,09% de conversão.',
        clientName: 'Dra. Laura Thiersch - Neuropediatra',
        industry: 'Saúde',
        services: ['SEO-VX', 'Desenvolvimento Web', 'Estratégia Digital', 'Blog Robusto'],
        technologies: ['React 19', 'TypeScript', 'Vite 7', 'CSS Modules', 'Framer Motion', 'PWA', 'Blog Engine', 'SEO Avançado'],
        challenge: 'Dra. Laura tinha uma situação diferente: tinha 4 turnos disponíveis (4x mais que Dra. Bruna), o que significava potencial para muito mais agendamentos. O desafio era maximizar essa capacidade através de uma estratégia que gerasse volume alto de leads qualificados com custo eficiente.',
        solution: '<p>Aplicamos a mesma estratégia SEO-VX, mas com ajustes para escala:</p><p><strong>1. Auditoria Expandida:</strong> Analisamos o mercado de neuropediatria em Belo Horizonte e identificamos que havia espaço para dominância completa.</p><p><strong>2. Pesquisa de Keywords Massiva:</strong> Encontramos 80+ variações de keywords relevantes.</p><p><strong>3. Desenvolvimento Web Robusto:</strong> Sistema de busca avançado, blog engine escalável (80+ artigos) e CMS pronto para mais conteúdo.</p><p><strong>4. Conteúdo em Volume Estratégico:</strong> Criamos 80+ artigos educativos, cada um trazendo 200-500 visitantes/mês após 3 meses.</p><p><strong>5. SEO Local Agressivo:</strong> Google My Business otimizado, avaliações, presença em diretórios médicos.</p><p><strong>6. Estratégia de Retenção:</strong> Email sequences educativas para quem visitou mas não marcou.</p>',
        results: JSON.stringify({
          leads_2_meses: 83,
          custo_por_lead: 'R$ 5,24',
          conversao: '31,09%',
          agendamentos_por_semana: 36,
          agenda: 'Lotada até 18 de novembro',
          status: '100% de ocupação (máxima capacidade)',
        }),
        duration: '2 meses (primeiros resultados) / 6 meses (consolidação)',
        timeline: '<ul><li>Semana 1-2: Auditoria + Estratégia expandida</li><li>Semana 3-4: Desenvolvimento + Blog Engine</li><li>Semana 5-6: Primeira leva (20 artigos)</li><li>Semana 7-8: Segunda leva (30 artigos)</li><li>Semana 9-12: Terceira leva (30 artigos) + Otimizações</li></ul>',
        learnings: 'Teríamos começado com 50 artigos no primeiro mês ao invés de gradualmente. A curva de crescimento teria sido exponencial desde o dia 1.',
        featured: true,
        published: true,
        publishedAt: new Date('2024-02-01'),
      },
      {
        slug: 'eric-moreira-psicologo-tcc',
        title: 'Psicólogo TCC - Posicionamento como Autoridade Digital em Terapia',
        description: 'Eric é psicólogo especialista em Terapia Cognitivo-Comportamental (TCC), mas não tinha presença digital profissional. Desenvolvemos um website que posiciona Eric como autoridade em TCC com SEO integrado desde o código.',
        clientName: 'Eric Moreira - Psicólogo Especialista em TCC',
        industry: 'Saúde',
        services: ['Desenvolvimento Web', 'SEO Avançado', 'Estratégia de Posicionamento'],
        technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui', 'Schema Markup', 'SEO'],
        challenge: 'Eric é psicólogo especialista em Terapia Cognitivo-Comportamental (TCC), mas não tinha presença digital profissional. O desafio era criar um website que: posicionasse Eric como autoridade em TCC, atraísse pacientes qualificados, criasse uma experiência acolhedora e profissional, otimizasse para conversão em agendamentos e implementasse SEO desde o código (não era retrofitting).',
        solution: '<p>Desenvolvemos um website profissional com estratégia completa:</p><p><strong>1. Design Centrado em Empatia:</strong> Seção "Como você está se sentindo?", cores que passam tranquilidade, tipografia legível e navegação intuitiva.</p><p><strong>2. Stack Moderna desde o Início:</strong> Next.js 15 para SEO automático, React 19 para interatividade, TypeScript para robustez, Tailwind CSS para design consistente e shadcn/ui para componentes profissionais.</p><p><strong>3. SEO Integrado no Código:</strong> Schema Markup (JSON-LD) desde a construção, metadata dinâmica, sitemap automático e performance first.</p><p><strong>4. Conteúdo Educativo:</strong> Artigos sobre TCC, explicação sobre abordagem de Eric, FAQ com dúvidas comuns e blog para autoridade.</p><p><strong>5. Experiência do Usuário:</strong> Call-to-action claros, formulário de agendamento online, WhatsApp integrado e fácil acesso a informações.</p>',
        results: JSON.stringify({
          status: 'Em desenvolvimento / Lançamento próximo',
          performance_target: '98+ PageSpeed',
          seo_positionamento: 'Pronto para dominar',
          conversao_target: '4%+ esperada',
        }),
        duration: 'Em desenvolvimento (projeto em andamento)',
        featured: false,
        published: true,
        publishedAt: new Date('2024-03-01'),
      },
      {
        slug: 'petiska-gatao-petiscos',
        title: 'E-commerce Híbrido B2B/B2C - Plataforma para Petiscos Naturais em Brasília',
        description: 'Petiska & Gatão é uma empresa brasiliense de petiscos naturais artesanais. Desenvolvemos uma plataforma digital moderna que atende dois públicos diferentes: Pet Shops (B2B) e Tutores (B2C).',
        clientName: 'Petiska & Gatão - Petiscos Naturais Artesanais',
        industry: 'E-commerce',
        services: ['Desenvolvimento Web', 'SEO Local', 'Estratégia B2B/B2C'],
        technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'Mapbox GL', 'PWA'],
        challenge: 'Petiska & Gatão é uma empresa brasiliense de petiscos naturais artesanais. O desafio era criar uma plataforma digital que: atendesse dois públicos diferentes (Pet Shops B2B e Tutores B2C), mantivesse a identidade artesanal da marca, permitisse fácil descoberta no Google (SEO local para Brasília), integrasse estratégia de marketing digital e escalasse conforme o negócio crescesse.',
        solution: '<p>Desenvolvemos uma plataforma moderna e complexa:</p><p><strong>1. Arquitetura B2B/B2C Separada:</strong> Dashboard para pet shops (pedidos, estoque, relatórios) e loja para tutores (descoberta, compra, avaliações).</p><p><strong>2. Stack Escalável:</strong> Next.js 15 para performance e SEO, React 19 para interatividade, Zustand para gerenciamento de estado e Mapbox GL para localização.</p><p><strong>3. SEO Local Agressivo:</strong> Otimizado para "petiscos para cães em Brasília", Google My Business integrado, Mapbox para localização de pontos de venda e blog sobre saúde de pets.</p><p><strong>4. PWA (Progressive Web App):</strong> Funciona offline, app-like experience e installável na home screen.</p><p><strong>5. Experiência de Compra:</strong> Catálogo visual com filtros, reviews de outros tutores, recomendações personalizadas e checkout seguro.</p>',
        results: JSON.stringify({
          status: 'Em desenvolvimento',
          target_usuarios_b2c: '200-500 por semana (após 6 meses)',
          target_parceiros_b2b: '30-50 pet shops',
          performance_target: '98+ PageSpeed',
          conversao_target: '2-3% esperada',
        }),
        duration: 'Em desenvolvimento',
        featured: false,
        published: true,
        publishedAt: new Date('2024-03-15'),
      },
      {
        slug: 'dra-giovana-endocrinologia',
        title: 'Endocrinologista - Replicando Metodologia Comprovada de Sucesso',
        description: 'Dra. Giovana é endocrinologista altamente qualificada. Replicamos a metodologia que funcionou para Dra. Laura (31% conversão, 83 leads em 2 meses) em uma nova especialidade (endocrinologia).',
        clientName: 'Dra. Giovana - Endocrinologista',
        industry: 'Saúde',
        services: ['Desenvolvimento Web', 'SEO Avançado', 'Estratégia de Posicionamento'],
        technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui', 'SEO Avançado'],
        challenge: 'Dra. Giovana é endocrinologista altamente qualificada. O desafio era replicar a metodologia que funcionou para Dra. Laura (31% conversão, 83 leads em 2 meses) em uma nova especialidade (endocrinologia). Isso envolvia: pesquisa de mercado profunda, posicionamento único (diferenciar de outros endocrinologistas), aplicar a mesma estratégia adaptada para endocrinologia e lançar pronto para escalar.',
        solution: '<p>Seguimos o "playbook comprovado" com adaptações:</p><p><strong>1. Pesquisa de Mercado Estratégica:</strong> Identificamos demanda alta por endocrinologistas, palavras-chave como "endocrinologista em BH", "diabetes", "tireoide", "sobrepeso" e oportunidade de domínio: endocrinologia + nutrição integrada.</p><p><strong>2. Planejamento Baseado no Livro Guia:</strong> Seguir os 6 pilares da metodologia SEO-VX, aplicar templates comprovados e adaptar conteúdo para endocrinologia.</p><p><strong>3. Desenvolvimento com Stack Moderna:</strong> Next.js 15 + React 19 (mesma que funcionou antes), Framer Motion para interatividade e SEO integrado no código.</p><p><strong>4. Identidade Visual por Orbee Labs:</strong> Design profissional e confiável, cores e tipografia que passam expertise e consistência com outros cases.</p><p><strong>5. Estratégia de Conteúdo Pronta:</strong> Blog com 20-30 artigos desde o lançamento, cada artigo para keywords específicas e pronto para escalar.</p>',
        results: JSON.stringify({
          status: 'Lançamento em 10 de novembro',
          conversao_esperada: '15-31% (similar a Dra. Laura)',
          leads_esperados_primeiros_2_meses: '50-100',
          performance_target: '98+ PageSpeed',
          posicionamento: 'Primeira página do Google em 60-90 dias',
        }),
        duration: 'Em desenvolvimento (Lançamento: 10 de novembro)',
        featured: false,
        published: true,
        publishedAt: new Date('2024-04-01'),
      },
      {
        slug: 'abraceia-ia-humanizada-saude',
        title: 'IA Humanizada para Saúde Mental - Projeto Complexo com Captação de R$ 650k',
        description: 'AbraceIA é um projeto ambicioso da Orbee Labs: criar uma plataforma de IA humanizada para saúde mental. Projeto tecnicamente complexo com captação de R$ 650k para desenvolvimento.',
        clientName: 'AbraceIA / Orbee Labs',
        industry: 'SaaS/Tech',
        services: ['Desenvolvimento de MVP', 'IA/ML', 'Estratégia de Conteúdo', 'SEO Avançado'],
        technologies: ['React', 'PostgreSQL', 'pgvector', 'LangChain', 'OpenAI/Gemini/Claude', 'Docker', 'AWS/GCP', 'SEO Avançado', 'E-E-A-T'],
        challenge: 'AbraceIA é um projeto ambicioso da Orbee Labs: criar uma plataforma de IA humanizada para saúde mental. Os desafios eram: tecnicamente complexo (integração com múltiplos LLMs, RAG personalizado, pgvector), regulatoriamente desafiador (LGPD, sigilo de dados), competitivamente acirrado, estrategicamente ambicioso e financeiramente exigente (captação de R$ 650k).',
        solution: '<p>Desenvolvemos uma estratégia de 3 pilares:</p><p><strong>1. MVP Tecnicamente Robusto:</strong> Frontend React com componentes modulares, Backend Node.js/Python com LangChain, Banco de dados PostgreSQL + pgvector (para embeddings), LLMs integrados (OpenAI, Google Gemini, Claude), Docker para deploy escalável e Cloud AWS/GCP para infraestrutura.</p><p><strong>2. RAG Personalizado:</strong> Sistema que combina IA com base de conhecimento especializado, respostas geradas por especialistas em saúde mental, humanização da IA (não é robô frio) e segurança e privacidade garantidas.</p><p><strong>3. Estratégia de Posicionamento E-E-A-T:</strong> Expertise, Authoritativeness, Authority e Trustworthiness com conformidade total com LGPD.</p>',
        results: JSON.stringify({
          status: 'Em desenvolvimento ativo',
          captacao_realizada: 'R$ 650k',
          timeline_completo: '36 meses',
          mvp_target: 'Q1 2025',
          usuarios_target_ano_1: '1000+ ativos',
          target_escalabilidade: '10k+ pacientes potenciais',
        }),
        duration: '36 meses (projeto de longo prazo)',
        featured: true,
        published: true,
        publishedAt: new Date('2024-05-01'),
      },
      {
        slug: 'bolacha-doce-convites',
        title: 'Ateliê Artesanal - SEO Local e Posicionamento Premium em Belo Horizonte',
        description: 'Bolacha Doce é um ateliê de convites personalizados de casamento e eventos em BH, especializada em aquarela digital. Posicionamento premium através de SEO local e estratégia de conteúdo.',
        clientName: 'Bolacha Doce - Ateliê de Convites Personalizados',
        industry: 'Artes / Eventos',
        services: ['Desenvolvimento Web', 'SEO Local', 'Estratégia de Conteúdo'],
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SEO Local', 'Schema.org', 'Google My Business'],
        challenge: 'Bolacha Doce é um ateliê de convites personalizados de casamento e eventos em BH, especializada em aquarela digital. Os desafios eram: posicionar como premium em um mercado cheio de competidores, diferenciar através de aquarela digital (nicho específico), SEO local forte ("melhores convites em BH"), blog educativo sobre casamentos e design e portfólio visual que inspire.',
        solution: '<p>Estratégia focada em diferenciação e SEO local:</p><p><strong>1. Posicionamento Premium:</strong> Design sofisticado no website, portfólio visual atraente, destaque para aquarela digital (diferencial) e preços transparentes (premium, não escondido).</p><p><strong>2. SEO Local Agressivo:</strong> Otimizado para "convites personalizados em BH", "Aquarela digital para casamento", "Ateliê de convites BH" e Schema.org estruturado.</p><p><strong>3. Google My Business Dominante:</strong> Reviews de clientes satisfeitos, fotos de trabalhos reais, horários e informações claras e posts de novos trabalhos.</p><p><strong>4. Blog Inspiracional:</strong> "Tendências em Convites 2024", "Como Escolher Cores para Casamento", "Aquarela Digital vs. Impressão" e cada post para SEO local.</p><p><strong>5. Galeria Visual:</strong> Portfólio com 30-50 trabalhos, filtros por tipo (casamento, batizado, etc.), funcionalidade de compartilhamento e Instagram embed.</p>',
        results: JSON.stringify({
          status: 'Em desenvolvimento',
          posicionamento: 'Premium',
          target_agendamentos_mes: '15-25 projetos',
          ticket_medio: 'R$ 800-2000',
          seo_target: 'Primeira página para keywords principais',
        }),
        duration: 'Em desenvolvimento',
        featured: false,
        published: true,
        publishedAt: new Date('2024-05-15'),
      },
    ];

    for (const caseStudy of caseStudies) {
      await prisma.caseStudy.upsert({
        where: { slug: caseStudy.slug },
        update: {},
        create: caseStudy,
      });
    }
    console.log(`✅ Cases de sucesso criados: ${caseStudies.length}`);

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