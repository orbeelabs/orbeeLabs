'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import { FAQStructuredData } from '@/components/StructuredData';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';
import { usePageTitle } from '@/hooks/core';
import { Button } from '@/components/ui/button';
import { ChevronDown, Check } from 'lucide-react';

export default function SEOPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
    { name: "SEO Belo Horizonte", url: "https://orbeelabs.com/servicos/seo-bh" },
  ];

  usePageTitle("SEO Cabuloso em BH: Apareça no Google e Multiplique Seus Agendamentos | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const phases = [
    {
      number: '01',
      title: 'Auditoria',
      timeframe: 'Semana 1-2',
      content: [
        'Primeiro, entendo por que você não ranqueia.',
        'O que analisamos:',
        '• Velocidade: Site carrega rápido? (Google favorece sites rápidos)',
        '• Mobile: Funciona bem em celular?',
        '• Estrutura: Páginas estão organizadas logicamente?',
        '• Conteúdo: Está otimizado para Google e para pessoas?',
        '• Concorrência: Quem está ranqueando bem? Por quê?',
        'Ferramentas usadas:',
        '• Google Search Console (mostra como Google vê seu site)',
        '• PageSpeed Insights (mede velocidade)',
        '• Ferramentas de análise customizadas',
        'O que você recebe: Um relatório com os 5-10 maiores problemas que impedem seu ranking. Priorizados (faça isso primeiro, depois aquilo).'
      ]
    },
    {
      number: '02',
      title: 'Pesquisa de Palavras-Chave',
      timeframe: 'Semana 3-4',
      content: [
        'Aqui é onde a mágica começa.',
        'Encontramos quais palavras seus clientes estão buscando que você pode responder.',
        'Exemplo prático:',
        'Pessoa no Google busca: "neuropediatra para TDAH em BH"',
        'Google precisa encontrar alguém que:',
        '• É neuropediatra (especialidade certa)',
        '• Trata TDAH (especialização certa)',
        '• Está em BH (localização certa)',
        'Se seu site comunica isso, você aparece.',
        'Como fazemos:',
        '• Identificamos as palavras-chave que trazem clientes reais (não tráfego genérico)',
        '• Analisamos volume (quantas pessoas buscam)',
        '• Analisamos dificuldade (fácil ou difícil de ranquear)',
        '• Priorizamos (por oportunidade real)',
        'O que você recebe: Mapa com 50-100 palavras-chave priorizadas que vão trazer seus clientes.'
      ]
    },
    {
      number: '03',
      title: 'Otimização Técnica',
      timeframe: 'Mês 1-2',
      content: [
        'Agora fazemos seu site "falar" a linguagem do Google.',
        'O que mudamos:',
        '• Title tags (título da página):',
        '  Antes: "Home"',
        '  Depois: "Neuropediatra em Belo Horizonte — Especialista em TDAH e TEA"',
        '• Meta descriptions (descrição que aparece no Google):',
        '  Antes: "Bem-vindo"',
        '  Depois: "Consultório de neuropediatria. Tratamento TDAH, autismo, epilepsia. Agende sua consulta online"',
        '• Estrutura interna:',
        '  - Organizamos títulos (H1, H2, H3) de forma lógica',
        '  - Conectamos páginas relacionadas com links internos',
        '• Dados estruturados (código invisível):',
        '  Ajuda Google a entender melhor quem você é',
        '  Resultado: você pode aparecer em "caixas especiais" do Google com sua informação destacada',
        'Exemplo real da Dra. Bruna: Apenas com otimização técnica (sem blog, sem links), ela passou de 0% para 8,21% de CTR.',
        'Resultado esperado: +60% de cliques no primeiro mês.'
      ]
    },
    {
      number: '04',
      title: 'Conteúdo Educativo',
      timeframe: 'Mês 1-3+',
      content: [
        'Conteúdo traz seus clientes ideais.',
        'Mas tem que ser o conteúdo certo.',
        'Como escolhemos:',
        '1. Olhamos para os sites que estão ranqueando bem no Google.',
        '2. Entendemos por que ranqueiam.',
        '3. Criamos conteúdo melhor (mais completo, mais útil, mais claro).',
        'Exemplos de conteúdo que funciona:',
        '• "5 Sinais que Seu Filho Pode Ter TDAH"',
        '• "Qual a Diferença Entre Autismo e TDAH?"',
        '• "Quando Procurar Neuropediatra"',
        'Importante: Não criamos "quantidade" de artigos.',
        'Criamos qualidade que converte.',
        'A Dra. Laura tem conteúdo em seu site. Resultado: aparece em praticamente TODAS as buscas da sua especialidade.',
        'Frequência: Depende do seu nicho e estratégia. Pode ser 1 artigo por mês, 2 por mês. O importante é consistência.',
        'Resultado: Cada artigo traz 200-500 visitantes por mês após estar 3 meses no ar.'
      ]
    },
    {
      number: '05',
      title: 'Authority Building',
      timeframe: 'Mês 2-6+',
      content: [
        'Links são como "recomendações" para Google.',
        'Se site respeitado linka para você, Google pensa: "Deve ser bom".',
        'Como conseguimos:',
        '• Publicamos em blogs e sites respeitados',
        '• Fazemos parcerias estratégicas',
        '• Criamos conteúdo tão bom que outras pessoas linkam naturalmente',
        'Importante: Apenas links de qualidade.',
        'Nada de "comprar 1000 links baratos" (Google penaliza isso).',
        'Resultado: Seu site fica mais respeitado. Ranqueia melhor.'
      ]
    },
    {
      number: '06',
      title: 'Monitorar e Otimizar',
      timeframe: 'Sempre',
      content: [
        'SEO não é "faz uma vez e pronto".',
        'É contínuo.',
        'Monitoramos:',
        '• Tráfego (quantas pessoas vêm do Google)',
        '• Ranking (em qual posição você aparece)',
        '• Conversão (quantas viram clientes)',
        '• Comportamento (como as pessoas usam seu site)',
        'Cada mês:',
        '• Analisamos os dados',
        '• Otimizamos o que está funcionando',
        '• Corrigimos o que não funciona',
        'Resultado: Crescimento consistente. Enquanto concorrentes ficam estáticos, você avança.'
      ]
    }
  ];

  const included = [
    'Auditoria completa do site',
    'Pesquisa de 50-100 palavras-chave',
    'Otimização técnica (velocidade, mobile, estrutura)',
    'Conteúdo educativo (frequência conforme plano)',
    'Estratégia de links todo mês',
    'Relatório mensal com números reais',
    'Reunião mensal para analisar resultados',
    'Suporte por WhatsApp para dúvidas urgentes',
    'Painel online com números em tempo real',
    'Estratégia ajustada conforme dados'
  ];

  const results = [
    {
      metric: 'Tráfego',
      description: 'De pouco/nenhum para 500-1.000 visitas/mês em 12 meses.'
    },
    {
      metric: 'Ranking',
      description: '70% das suas palavras-chave principais aparecem na primeira página do Google em 3-4 meses.'
    },
    {
      metric: 'Leads',
      description: '+200-300% mais pessoas interessadas entrando em contato.'
    },
    {
      metric: 'Conversão',
      description: 'Conforme sua capacidade (como vimos com Dra. Laura: 31% se tiver horários).'
    }
  ];

  const cases = [
    {
      title: 'Dra. Bruna Vilela (Neuropediatra)',
      situation: 'Sem estratégia de tráfego orgânico. Dependência de indicações.',
      whatWeDid: [
        'Auditoria do site',
        'Pesquisa de palavras-chave',
        'Otimização técnica',
        'Conteúdo educativo'
      ],
      results: [
        '8,21% CTR (taxa de clique no Google — acima da média)',
        '4% de conversão',
        'Agenda 100% ocupada até novembro',
        '+400% ROI'
      ],
      meaning: 'A cada 100 pessoas que viam a Dra. Bruna no Google, 8 clicavam. Das 8, 4 marcavam consulta. Ela ficou sem agenda por falta de horário.',
      link: '/portfolio'
    },
    {
      title: 'Dra. Laura Thiersch (Neuropediatra)',
      situation: 'Novo no mercado digital. Múltiplos turnos de atendimento (capacidade maior).',
      whatWeDid: [
        'Mesma estratégia que funcionou com Dra. Bruna',
        'Adaptamos para aproveitar mais horários disponíveis'
      ],
      results: [
        '83 leads gerados',
        'R$ 5,24 por lead (custo extremamente eficiente)',
        '31,09% de conversão (extraordinário)',
        '36 agendamentos por semana (máxima capacidade)'
      ],
      meaning: 'Cada paciente novo custou menos de R$ 6 para trazer. A taxa de conversão foi 7x melhor que Dra. Bruna porque ela tinha mais horários. Resultado: ocupação total da agenda.',
      link: '/portfolio'
    }
  ];

  const faqs = [
    {
      question: 'Quanto tempo até ver resultados?',
      answer: 'Realista: Primeiros resultados: 4-8 semanas (algumas pessoas achando você). Resultados significativos: 3-6 meses (muita gente achando). Crescimento real: 6-12 meses (tráfego estável, previsível). Por quê demora? Google precisa de tempo para entender que você mudou, indexar suas mudanças, começar a ranquear e ganhar confiança. Nossos clientes: primeira página em 60 dias, top 3 em 4-6 meses.'
    },
    {
      question: 'Vocês trabalham com meu nicho?',
      answer: 'Provavelmente sim. Tenho comprovado em: Neuropediatria (Dra. Bruna, Dra. Laura), Psicologia, Endocrinologia, Advocacia, Contabilidade, Qualquer especialidade. A metodologia é a mesma. A estratégia se adapta.'
    },
    {
      question: 'Posso fazer SEO sozinho?',
      answer: 'Tecnicamente sim. Praticamente é complicado porque: Exige múltiplas habilidades (desenvolvimento, redação, marketing), Ferramentas custam R$ 1-2mil/mês, Curva de aprendizado: 6-12 meses, Erros custam caro, Demanda 30+ horas/semana. Se tiver tempo, aprenda. Se quer resultados comprovados, contrate especialista.'
    },
    {
      question: 'Vocês garantem primeiro lugar?',
      answer: 'Não. Ninguém garante. Se alguém prometer, está mentindo ou usando técnicas que Google penaliza. O que PODEMOS garantir: Técnica 100% ética (white hat), Resultados mensurados (números reais), Primeira página em 3-6 meses (para keywords viáveis), +300% crescimento de tráfego. Rankings dependem de qualidade, concorrência, links, conteúdo. Top 3 é nosso objetivo.'
    },
    {
      question: 'Qual o investimento?',
      answer: 'Varia. Depende de: Tamanho do seu nicho (competição alta = mais investimento), Situação atual do seu site, Suas metas de crescimento. Sem valores específicos aqui porque cada caso é único. Mas deixa eu te dizer: se o ROI é 5:1 (como vimos com Dra. Laura), vale a pena conversar. Entre em contato para orçamento personalizado.'
    },
    {
      question: 'Vocês trabalham com sites WordPress/Shopify/etc?',
      answer: 'Sim! Trabalhamos com qualquer plataforma: WordPress, Shopify, Wix, sistemas customizados, Next.js, React, etc. A metodologia SEO Cabuloso é independente da plataforma. O que importa é: estrutura técnica correta, conteúdo otimizado, performance e experiência do usuário. Adaptamos nossa estratégia para cada plataforma, garantindo que seu site tenha o melhor SEO possível, independente da tecnologia usada.'
    },
    {
      question: 'Como funciona o processo SEO Cabuloso?',
      answer: 'O processo SEO Cabuloso é dividido em 4 fases: 1) AUDITORIA TÉCNICA: Analisamos seu site, concorrentes e mercado para identificar oportunidades. 2) OTIMIZAÇÃO TÉCNICA: Corrigimos problemas de performance, mobile, segurança e estrutura. 3) ESTRATÉGIA DE CONTEÚDO: Criamos conteúdo otimizado que responde às perguntas do seu público. 4) MONITORAMENTO E AJUSTES: Acompanhamos resultados, ranqueamentos e otimizamos continuamente. Tudo com foco em resultados mensuráveis e ROI comprovado.'
    },
    {
      question: 'Qual a diferença entre SEO tradicional e SEO Cabuloso?',
      answer: 'SEO Tradicional: Foca apenas em palavras-chave, muitas vezes usa técnicas antigas que não funcionam mais. SEO Cabuloso: Combina análise técnica avançada + estratégia de conteúdo data-driven + desenvolvimento web fullstack. Não é só "colocar palavras-chave". É entender o que Google realmente quer: sites rápidos, seguros, com conteúdo relevante e experiência excepcional. Resultado: Rankings sustentáveis e crescimento real de tráfego, não apenas otimizações superficiais.'
    },
    {
      question: 'Como medem o ROI do SEO?',
      answer: 'Medimos ROI de forma completa: 1) TRÁFEGO: Aumento de visitantes orgânicos (Google Analytics). 2) CONVERSÕES: Leads, agendamentos, vendas geradas (rastreamento de origem). 3) CUSTO POR LEAD: Comparação antes/depois do SEO. 4) RECEITA ATRIBUÍDA: Valor gerado pelos leads do SEO. Exemplo real: Dra. Laura investiu X e gerou 83 leads. Cada lead custou R$ 5,24. Se cada lead vale R$ 200, o ROI foi de 38:1. Mostramos números reais, não promessas vazias.'
    },
    {
      question: 'Vocês trabalham só em Belo Horizonte?',
      answer: 'Não! Trabalhamos com clientes de todo o Brasil. SEO é digital - não importa onde você está. O que importa é onde seu público está buscando no Google. Nossa metodologia funciona para qualquer cidade, estado ou região. Já atendemos clientes de São Paulo, Rio de Janeiro, Brasília, Porto Alegre e várias outras cidades. O importante é que seu público esteja buscando no Google - e isso acontece em qualquer lugar do país.'
    },
    {
      question: 'O que acontece se eu cancelar o serviço?',
      answer: 'Você mantém todas as otimizações já feitas no seu site. O SEO não "desaparece" quando você cancela. Porém, SEO é um trabalho contínuo: Google muda algoritmos, concorrentes otimizam, novos conteúdos são necessários. Sem manutenção contínua, você pode perder posições ao longo do tempo. Nossa recomendação: mantenha pelo menos uma manutenção mensal para preservar resultados. Mas todas as melhorias técnicas e conteúdos criados permanecem seus.'
    }
  ];

  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <PageLayout breadcrumbItems={breadcrumbItems}>
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background via-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                SEO Cabuloso: Apareça no Google e{' '}
                <span className="text-gradient">Multiplique Seus Agendamentos</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Estratégia de SEO técnico comprovada. Resultados mensurados. Aplicável a qualquer nicho.{' '}
                Veja como a Dra. Laura passou de 0 para 83 leads em 2 meses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Marcar Conversa de 30 Minutos
                  </Button>
                </Link>
                <Link href="/auditoria-seo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    📞 Solicitar Auditoria do Meu Site
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why You Don't Appear Section */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass glass-hover rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Por Que Você Não Aparece no Google <span className="text-gradient">(Ainda)</span>
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>Você tem site.</p>
                <p>Mas pacientes, clientes ou leads não chegam por lá.</p>
                <p>
                  Enquanto isso, seu concorrente (aquele que você sabe que é menos preparado que você) aparece na primeira página do Google.
                </p>
                <p className="text-primary font-semibold text-xl">Por quê?</p>
                <p className="text-primary font-semibold text-xl">Não é sorte.</p>
                <p>
                  É porque ele entendeu uma coisa simples: <strong>Google não é adivinho.</strong>
                </p>
                <p>Google precisa entender:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>O que você faz</li>
                  <li>Para quem você faz</li>
                  <li>Por que alguém deve confiar em você</li>
                </ul>
                <p>Se seu site não comunica isso claramente, você fica invisível.</p>
                <p className="text-primary font-semibold text-xl">A boa notíça?</p>
                <p className="text-primary font-semibold text-xl">Isso é arrumável.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Real Results Section */}
        <section className="py-20 bg-gradient-to-br from-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                A Realidade Dos Seus <span className="text-gradient">Resultados Atuais</span>
              </h2>
              <div className="glass glass-hover rounded-2xl p-8 max-w-3xl mx-auto mb-12">
                <p className="text-gray-300 text-lg mb-4">
                  Deixa eu ser honesto: <strong className="text-white">você está perdendo clientes.</strong>
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  Nem é culpa sua. É culpa da falta de estratégia SEO.
                </p>
                <div className="text-left space-y-3 mt-6">
                  <p className="text-gray-300"><strong className="text-white">87% dos pacientes/clientes</strong> pesquisam no Google antes de escolher</p>
                  <p className="text-gray-300">Se você não aparece, <strong className="text-white">eles escolhem concorrente</strong></p>
                  <p className="text-gray-300">Cada mês que passa, você <strong className="text-white">deixa de ganhar receita</strong></p>
                </div>
                <p className="text-primary font-semibold text-xl mt-6">Mas tem solução.</p>
              </div>
            </motion.div>

            <div className="space-y-8">
              {cases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-8 md:p-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {caseItem.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-primary mb-2">Situação antes:</h4>
                      <p className="text-gray-300">{caseItem.situation}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-primary mb-2">O que fizemos:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
                        {caseItem.whatWeDid.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-primary mb-2">Resultados em 2 meses:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {caseItem.results.map((result, idx) => (
                          <div key={idx} className="bg-primary/10 rounded-lg p-3">
                            <p className="text-white font-semibold">{result}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/20 to-yellow-500/20 rounded-lg p-4">
                      <p className="text-gray-200 italic">&quot;{caseItem.meaning}&quot;</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 Phases Section */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Como Funciona <span className="text-gradient">(6 Etapas da Metodologia)</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="glass glass-hover rounded-2xl p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl mb-4 md:mb-0">
                          {phase.number}
                        </div>
                        <div className="text-primary font-semibold text-sm md:text-base">
                          {phase.timeframe}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          Etapa {phase.number}: {phase.title}
                        </h3>
                        <div className="space-y-3 text-gray-300 leading-relaxed">
                          {phase.content.map((paragraph, idx) => {
                            const isListItem = paragraph.startsWith('•') || paragraph.startsWith('Antes:') || paragraph.startsWith('Depois:') || paragraph.match(/^\d+\./);
                            const isNested = paragraph.startsWith('  ') || paragraph.startsWith('  -');
                            return (
                              <p 
                                key={idx} 
                                className={isListItem ? 'ml-4' : isNested ? 'ml-8 text-sm' : ''}
                              >
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Included Section */}
        <section className="py-20 bg-gradient-to-br from-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                O Que Está <span className="text-gradient">Incluído</span>
              </h2>
            </motion.div>

            <StaggerContainer staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {included.map((item, index) => (
                  <StaggerItem key={item}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="glass glass-hover rounded-xl p-6 flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed">{item}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Resultados <span className="text-gradient">Esperados</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <motion.div
                  key={result.metric}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-primary mb-4">{result.metric}</h3>
                  <p className="text-gray-300 leading-relaxed">{result.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes It Different Section */}
        <section className="py-20 bg-gradient-to-br from-background to-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass glass-hover rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                O Que Torna Isso <span className="text-gradient">Diferente</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-red-400 mb-3">Não é:</h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
                    <li>Teoria aleatória</li>
                    <li>Promessas falsas</li>
                    <li>&quot;Melhor agência de SEO&quot;</li>
                    <li>Marketing vazio</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">É:</h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
                    <li>Metodologia testada em múltiplos clientes</li>
                    <li>Resultados reais, documentados</li>
                    <li>Aplicável a qualquer nicho</li>
                    <li>Transparência total</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                FAQ — Respondidas com <span className="text-gradient">Honestidade</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-white pr-8">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/20 to-yellow-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pronto para Aparecer no <span className="text-gradient">Google</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Marque uma conversa de 30 minutos e descubra como podemos multiplicar seus agendamentos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Marcar Conversa de 30 Minutos
                  </Button>
                </Link>
                <Link href="/auditoria-seo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    📞 Solicitar Auditoria do Meu Site
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  Ver caso completo Dra. Laura →
                </Link>
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  Ver caso Dra. Bruna →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
