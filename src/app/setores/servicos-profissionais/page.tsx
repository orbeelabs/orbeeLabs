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

export default function ServicosProfissionaisPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Setores", url: "https://orbeelabs.com/setores" },
    { name: "Serviços Profissionais", url: "https://orbeelabs.com/setores/servicos-profissionais" },
  ];

  usePageTitle("Marketing para Advogados, Contadores, Consultores: Mais Clientes B2B | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const problem = [
    'Carteira de clientes é boa.',
    'Mas crescimento é lento.',
    'Depende de indicações e networking.'
  ];

  const challenges = [
    {
      title: 'Desafio 1: Muita Concorrência',
      description: '200-500 concorrentes na sua especialidade em BH. Todos têm site. Todos têm LinkedIn. Alguns ranqueiam bem.',
      solution: 'Como se diferenciar? Posicionamento claro + conteúdo especializado + prova social.'
    },
    {
      title: 'Desafio 2: Ciclo Longo B2B',
      description: 'Empresa não contrata em 1 dia. Ciclo: 1-3 meses.',
      solution: [
        'Remarketing multilayer',
        'Email marketing educativo',
        'Webinars gratuitos',
        'Chat/WhatsApp',
        'Proposta de valor clara'
      ]
    },
    {
      title: 'Desafio 3: Precisa Construir Confiança',
      description: 'Cliente não paga R$ 10.000+ em consultoria para alguém desconhecido.',
      solution: [
        'Blog com artigos especializados',
        'Guest articles em publicações respeitadas',
        'LinkedIn content',
        'Webinars gratuitos',
        'Cases com resultados',
        'Certificações visíveis'
      ]
    }
  ];

  const solutions = [
    {
      title: 'Website de Autoridade',
      whatWeDo: [
        'Homepage com CTA: "Solicite Consultoria"',
        'Página "Sobre": Conta sua história',
        'Seção "Especialidades": Detalha o que faz',
        'Blog com 15-25 artigos (mostra expertise)',
        'Case studies quantificados',
        'Depoimentos de clientes',
        'FAQ com dúvidas reais'
      ],
      results: [
        'Taxa de conversão 10-20%',
        'Clientes chegam "quentes"'
      ]
    },
    {
      title: 'Conteúdo de Especialista',
      blog: {
        frequency: '4-8 por mês',
        examples: [
          '"Reforma Tributária 2025: O Que Muda?"',
          '"Erro Comum em Contratos: Como Proteger"',
          'Guias completos (2-3k palavras)'
        ]
      },
      linkedIn: {
        frequency: 'Diário',
        content: [
          'Comentários sobre notícias',
          'Análises rápidas',
          'Dicas práticas',
          'Artigos longos'
        ]
      },
      results: [
        'SEO: Blog ranqueia em keywords',
        'Credibilidade: LinkedIn mostra expertise',
        'Leads: Pessoas procuram você'
      ]
    },
    {
      title: 'LinkedIn Ads B2B',
      segmentation: [
        'Cargo: CEO, CFO, Gerente, Diretor',
        'Indústria: [sua especialidade]',
        'Tamanho: 50-1.000 funcionários',
        'Local: BH'
      ],
      results: [
        'Lead quality altíssima',
        'CAC R$ 200-500 (alto, mas cliente vale mais)'
      ]
    },
    {
      title: 'Webinars e Lives',
      examples: [
        '"Reforma Tributária: Estratégias para Empresas"',
        '"Contrato Perfeito: Cláusulas Que Você Deve Conhecer"',
        '"Planejamento Sucessório: Proteja Seu Patrimônio"'
      ],
      frequency: 'Conforme seu calendário.',
      results: '200-500 leads qualificados por webinar.'
    },
    {
      title: 'Google Ads Search (B2B)',
      keywords: [
        '"Consultoria tributária BH"',
        '"Advogado trabalhista Belo Horizonte"',
        '"Contador especializado em MEI"'
      ],
      results: [
        'CPC: R$ 20-100',
        'Conversão: 5-10%',
        'CAC: R$ 200-1.000'
      ]
    },
    {
      title: 'Gestão de Reputação',
      whatWeDo: [
        'Coleta de depoimentos de clientes satisfeitos',
        'Google Reviews para profissionais',
        'LinkedIn Recommendations',
        'Depoimentos em vídeo',
        'Cases publicados'
      ],
      results: [
        'Website com 8-15 depoimentos',
        'Google rating 4.5+ (credibilidade)',
        'Vídeos de depoimentos (convertem)'
      ]
    }
  ];

  const kpis = [
    { metric: 'Leads/mês', before: '5-10', after: '30-50' },
    { metric: 'Custo por lead', before: 'R$ 500+', after: 'R$ 200-400' },
    { metric: 'Taxa conversão', before: '5%', after: '15-20%' },
    { metric: 'Clientes/mês', before: '1-2', after: '4-8' },
    { metric: 'Valor médio', before: 'R$ 10k', after: 'R$ 15k+' }
  ];

  const faqs = [
    {
      question: 'Qual investimento?',
      answer: 'Depende do que quer. Presença básica: R$ 1.5-2.5k/mês. Crescimento agressivo: R$ 3-5k/mês. Posicionamento de autoridade: R$ 5k+/mês. ROI típico: 3-5x em 6-12 meses.'
    },
    {
      question: 'Quanto tempo até resultados?',
      answer: 'Blog/SEO: 3-4 meses (primeiros), 6-12 (bom). LinkedIn: 4-8 semanas (engagement), 2-3 meses (leads). Google Ads: 24-72 horas (primeiros). Webinars: 4-8 semanas (organizar), 1-2 semanas pós (conversão). Combinado: 2-4 semanas você recebe leads.'
    },
    {
      question: 'Funciona para profissional solo?',
      answer: 'Sim, estratégia se adapta. Solo: Foco em você, LinkedIn ativo, webinars em seu nome. Escritório: Foco empresa, múltiplos profissionais, website.'
    },
    {
      question: 'Como conseguem clientes grandes/premium?',
      answer: 'Posicionamento + Segmentação: 1. Defina ideal (tamanho, setor, receita, budget), 2. Crie mensagem (copy específica), 3. Selecione canal (LinkedIn para C-level), 4. Landing page específica (não homepage), 5. Precificação clara (se premium, cobrar premium). Resultado: Atrai tipo certo.'
    }
  ];

  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <PageLayout breadcrumbItems={breadcrumbItems}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background via-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Marketing para Advogados, Contadores, Consultores:{' '}
                <span className="text-gradient">Mais Clientes B2B</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                78% de empresários pesquisam especialistas no Google. Se você não aparece, cliente escolhe concorrente. 
                +300% leads qualificados com estratégia correta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Auditar Presença Online Profissional
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem Section */}
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
                O <span className="text-gradient">Problema</span>
              </h2>
              <ul className="list-disc list-inside ml-4 space-y-3 text-gray-300 text-lg">
                {problem.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Challenges Section */}
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
                Os <span className="text-gradient">Desafios</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">{challenge.title}</h3>
                  <p className="text-gray-300 mb-4">{challenge.description}</p>
                  <div>
                    {typeof challenge.solution === 'string' ? (
                      <p className="text-primary font-semibold">{challenge.solution}</p>
                    ) : (
                      <>
                        <h4 className="text-lg font-semibold text-primary mb-2">Nossa solução:</h4>
                        <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                          {challenge.solution.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
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
                Nossas <span className="text-gradient">Soluções</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                  
                  {solution.whatWeDo && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">O que fazemos:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.whatWeDo.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solution.blog && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Blog ({solution.blog.frequency}):</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.blog.examples.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solution.linkedIn && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">LinkedIn ({solution.linkedIn.frequency}):</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.linkedIn.content.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solution.keywords && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Keywords:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.keywords.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solution.segmentation && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Segmentação:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.segmentation.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solution.examples && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Exemplos:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.examples.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      {solution.frequency && (
                        <p className="text-gray-300 mt-2">
                          <strong className="text-white">Frequência:</strong> {solution.frequency}
                        </p>
                      )}
                    </div>
                  )}

                  {solution.results && (
                    <div className="bg-primary/10 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Resultado:</h4>
                      {typeof solution.results === 'string' ? (
                        <p className="text-gray-300">{solution.results}</p>
                      ) : (
                        <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                          {solution.results.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* KPIs Section */}
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
                <span className="text-gradient">KPIs</span>
              </h2>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full glass glass-hover rounded-2xl overflow-hidden">
                <thead className="bg-primary/20">
                  <tr>
                    <th className="p-4 text-left text-white font-bold">KPI</th>
                    <th className="p-4 text-center text-white font-bold">Antes</th>
                    <th className="p-4 text-center text-primary font-bold">Depois (6 meses)</th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map((kpi, index) => (
                    <tr key={kpi.metric} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                      <td className="p-4 text-white font-semibold">{kpi.metric}</td>
                      <td className="p-4 text-center text-gray-300">{kpi.before}</td>
                      <td className="p-4 text-center text-primary font-bold">{kpi.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                Perguntas <span className="text-gradient">Frequentes</span>
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
                Pronto para Mais <span className="text-gradient">Clientes B2B</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Audite sua presença online profissional e descubra como podemos trazer +300% leads qualificados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Auditar Presença Online Profissional
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
                <Link href="/servicos/seo-bh" className="hover:text-primary transition-colors">
                  SEO para profissionais →
                </Link>
                <Link href="/servicos/desenvolvimento-web-bh" className="hover:text-primary transition-colors">
                  Novo website profissional →
                </Link>
                <Link href="/servicos/trafego-pago-bh" className="hover:text-primary transition-colors">
                  LinkedIn Ads B2B →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}

