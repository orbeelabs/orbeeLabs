'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import { FAQStructuredData } from '@/components/StructuredData';

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function EducacaoClient() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Setores", url: "https://orbeelabs.com/setores" },
    { name: "Educação", url: "https://orbeelabs.com/setores/educacao" },
  ];


  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const problem = [
    'Matrículas vêm de boca-a-boca.',
    'Crescimento é lento.',
    'Você está perdendo 30-50% dos alunos potenciais.'
  ];

  const challenges = [
    {
      title: 'Desafio 1: Jornada Longa',
      description: 'Pai/mãe não decide em 1 dia. Ciclo: 2-4 semanas.',
      solution: [
        'Remarketing (anúncio segue)',
        'Email sequences (educa sobre diferenciais)',
        'Conteúdo que diferencia',
        'WhatsApp disponível'
      ]
    },
    {
      title: 'Desafio 2: Sazonalidade Forte',
      description: 'Matrículas concentradas em: Janeiro (principal), Junho-Julho (meio de ano), Setembro (volta aulas), Dezembro (antecipadas)',
      solution: [
        'Calendar marketing (aumenta budget em picos)',
        'Conteúdo evergreen em meses baixos',
        'Campaign "early-bird"'
      ]
    },
    {
      title: 'Desafio 3: Muita Concorrência',
      description: 'Muitas escolas em BH com marketing digital.',
      solution: [
        'Posicionamento claro (bilíngue, STEM, Montessori)',
        'Conteúdo único',
        'Depoimentos reais (vídeo)',
        'Cases de sucesso'
      ]
    }
  ];

  const solutions = [
    {
      title: 'Website com Foco em Inscrição',
      whatWeDo: [
        'Homepage com CTA: "Agende Visita"',
        'Páginas por nível (Infantil, Fund., Médio)',
        'Tour virtual 360°',
        'Seção "Por Que Escolher"',
        'Depoimentos de pais/alunos',
        'FAQ: "Uniforme?", "Cardápio?", "Transporte?"',
        'Formulário de inscrição'
      ],
      results: [
        '5-15% deixam contato',
        'Secretaria recebe leads pré-qualificados'
      ]
    },
    {
      title: 'Blog Educativo',
      examples: [
        '"Qual Idade Ideal para Inglês?"',
        '"Como Escolher Escola?"',
        '"Educação Bilíngue: Benefícios"'
      ],
      frequency: '4-8 por mês (conforme período escolar).',
      results: '500-1.000 visitas/mês por artigo após 3 meses.'
    },
    {
      title: 'SEO Local',
      keywords: '"Escola bilíngue em BH", "Colégio particular perto de [bairro]", etc.',
      results: 'Primeira página em 2-3 meses.'
    },
    {
      title: 'Google Ads + Meta Ads Sazonalizado',
      budget: [
        'Janeiro-Fevereiro: 100%',
        'Março-Maio: 50%',
        'Junho-Julho: 100%',
        'Setembro: 100%',
        'Dezembro: 100%'
      ],
      segmentation: 'Pais com filhos 4-17 anos, interesse educação.',
      results: 'ROI 3-5x durante picos.'
    },
    {
      title: 'Email + SMS Automático',
      sequences: [
        '1. Bem-vindo + Brochure',
        '2. Educação + Dicas',
        '3. Social Proof (depoimentos)',
        '4. Oferta (desconto primeira matrícula)',
        '5. Urgência (vagas encerrando)'
      ],
      results: '15-25% conversão de leads.'
    },
    {
      title: 'Video Marketing',
      types: [
        'Tour Virtual (3-5 min)',
        'Depoimentos Pais (1-2 min cada)',
        'Dia na Escola (5 min)',
        'Como Escolher Escola (palestra)'
      ],
      results: '+30-50% conversão, 2-3x mais tempo na página.'
    }
  ];

  const kpis = [
    { metric: 'Leads/mês', before: '20', after: '60-80' },
    { metric: 'Custo por lead', before: 'R$ 500+', after: 'R$ 100-150' },
    { metric: 'Matrículas/ano', before: '30-40', after: '80-100' },
    { metric: 'CAC', before: 'R$ 1.500', after: 'R$ 300-400' }
  ];

  const faqs = [
    {
      question: 'Quando começar campanhas?',
      answer: '8-10 semanas antes da sazonalidade. Exemplo: Janeiro → comece novembro (8 semanas antes). Mais cedo = menos concorrência. Mais tarde = CPC alto.'
    },
    {
      question: 'Como protegem confidencialidade?',
      answer: 'Nenhuma foto/vídeo sem consentimento dos pais, LGPD compliance total, Dados em servidor seguro.'
    },
    {
      question: 'E se a escola tiver poucos recursos?',
      answer: 'Começamos simples e escalamos. Phase 1 (R$ 1-1.5k/mês): GMB + website = ~200 leads/ano. Phase 2 (R$ 3-4k/mês): Blog + SEO + Ads = ~500 leads/ano. Phase 3 (R$ 5k+/mês): Tudo + Meta + Videos = ~1.000+ leads/ano. Crescemos com você.'
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
                Marketing para Escolas e Cursos:{' '}
                <span className="text-gradient">Preencha Suas Turmas</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                92% das famílias pesquisam escolas no Google. Se você não aparece, perdem para concorrente. 
                +250% inscrições em 6 meses com estratégia certa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Auditar Estratégia de Matrículas
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
                    <h4 className="text-lg font-semibold text-primary mb-2">Nossa solução:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                      {challenge.solution.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
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

                  {solution.examples && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Exemplos:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.examples.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solution.frequency && (
                    <p className="text-gray-300 mb-4">
                      <strong className="text-white">Frequência:</strong> {solution.frequency}
                    </p>
                  )}

                  {solution.keywords && (
                    <p className="text-gray-300 mb-4">
                      <strong className="text-white">Keywords:</strong> {solution.keywords}
                    </p>
                  )}

                  {solution.budget && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Budget por período:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.budget.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solution.segmentation && (
                    <p className="text-gray-300 mb-4">
                      <strong className="text-white">Segmentação:</strong> {solution.segmentation}
                    </p>
                  )}

                  {solution.sequences && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Sequences:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.sequences.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solution.types && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Tipos:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {solution.types.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
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
                Pronto para Preencher Suas <span className="text-gradient">Turmas</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Audite sua estratégia de matrículas e descubra como podemos aumentar suas inscrições em +250%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Auditar Estratégia de Matrículas
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
                <Link href="/servicos/seo-bh" className="hover:text-primary transition-colors">
                  SEO para escolas →
                </Link>
                <Link href="/servicos/desenvolvimento-web-bh" className="hover:text-primary transition-colors">
                  Novo website →
                </Link>
                <Link href="/servicos/trafego-pago-bh" className="hover:text-primary transition-colors">
                  Google Ads educação →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}

