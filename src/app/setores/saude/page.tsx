'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import { FAQStructuredData } from '@/components/StructuredData';
import { usePageTitle } from '@/hooks/core';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function SaudePage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Setores", url: "https://orbeelabs.com/setores" },
    { name: "Saúde", url: "https://orbeelabs.com/setores/saude" },
  ];

  usePageTitle("Marketing para Clínicas e Consultórios: Mais Agendamentos, Menos Esforço | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const reality = [
    '87% dos pacientes pesquisam no Google antes de marcar.',
    '70% consultam reviews.',
    '45% acessam seu site.'
  ];

  const challenges = [
    {
      title: 'Desafio 1: Regulamentação',
      description: 'Você não pode fazer marketing agressivo.',
      canDo: [
        'Conteúdo educativo',
        'Depoimentos com consentimento',
        'Blog com dicas',
        'Responder perguntas'
      ],
      cannotDo: [
        'Marketing direto agressivo',
        'Fotos sem consentimento',
        'Promessas falsas'
      ],
      responsibility: 'Nossa responsabilidade: 100% LGPD, CFM, CRO compliance.'
    },
    {
      title: 'Desafio 2: Ciclo Longo',
      description: 'Paciente não marca na primeira vez que vê seu anúncio. Ciclo típico: 1-2 semanas.',
      solution: [
        'Remarketing (anúncio segue paciente)',
        'Email/SMS educativo',
        'WhatsApp disponível',
        'Reviews de qualidade'
      ]
    },
    {
      title: 'Desafio 3: Reputação',
      description: '1 review ruim mata sua reputação.',
      solution: [
        'Coleta automática de reviews após consulta',
        'Resposta profissional a críticas',
        'Monitoramento 24/7'
      ]
    }
  ];

  const solutions = [
    {
      title: 'Google My Business Otimizado',
      whatIs: 'Seu perfil que aparece em "dentista perto de mim".',
      whatWeDo: [
        'Foto profissional',
        'Descrição otimizada',
        'Horários atualizados',
        'Fotos do consultório',
        'Posts com dicas',
        'Resposta automática a reviews'
      ],
      results: [
        'Top 3 em buscas locais',
        '+50% pacientes',
        'Reviews de qualidade'
      ]
    },
    {
      title: 'Website Focado em Agendamento',
      whatWeDo: [
        'Homepage com CTA claro: "Agendar Consulta"',
        'Página por especialidade',
        'Seção de procedimentos',
        'Formulário de agendamento online',
        'Integração com seu sistema',
        'WhatsApp embed',
        'Depoimentos de pacientes'
      ],
      results: [
        '5-10% conversão',
        'Recepção descongestionada',
        'Agendamentos 24/7'
      ]
    },
    {
      title: 'SEO Local',
      whatIs: 'Estratégia para aparecer primeira página do Google.',
      keywords: '"Dentista em BH", "Psicólogo perto de mim", etc.',
      results: 'Primeira página em 3-4 meses.'
    },
    {
      title: 'Blog Médico Educativo',
      examples: [
        '"5 Sinais que Você Precisa de Tratamento"',
        '"Guia Completo do Implante Dentário"'
      ],
      frequency: 'Conforme plano (pode ser 1-4 por mês).',
      results: '300-500 visitas/mês por artigo após 3 meses.'
    },
    {
      title: 'Google Ads + Meta Localizado',
      segmentation: [
        'Localização: 3-5km do consultório',
        'Idade: Seu público',
        'Interesse: Saúde',
        'Comportamento: Pesquisa saúde'
      ],
      results: [
        'CPC baixo',
        'Conversão alta',
        'ROI 3-4x'
      ]
    },
    {
      title: 'Gestão de Reputação',
      whatWeDo: [
        'Coleta de reviews após consulta',
        'Monitoramento Google, Facebook, Doctoralia',
        'Resposta profissional a críticas',
        'Alertas automáticos'
      ],
      results: [
        'Google My Business 4.5-5 estrelas',
        '+20-30% pacientes de reviews'
      ]
    }
  ];

  const kpis = [
    { metric: 'Agendamentos/mês', before: '50', after: '150-200' },
    { metric: 'Custo por agendamento', before: 'R$ 500+', after: 'R$ 100-200' },
    { metric: 'Taxa presença', before: '75%', after: '85%+' },
    { metric: 'Google Rating', before: '3.5', after: '4.5+' }
  ];

  const faqs = [
    {
      question: 'Como garantem LGPD?',
      answer: 'Consentimento explícito, Dados protegidos (criptografia), Nenhuma publicação sem consentimento, Direitos de acesso/correção respeitados. Seu consultório nunca será multado por problema nosso.'
    },
    {
      question: 'Vocês criam conteúdo médico?',
      answer: 'Você é o especialista. Nós organizamos e otimizamos. Processo: 1. Você passa info técnica, 2. Nossa equipe redige, 3. Você aprova, 4. Publicamos com seu nome.'
    },
    {
      question: 'Quanto tempo até primeiro agendamento?',
      answer: 'Google My Business: 1-2 semanas. Website: 2-4 semanas. Google Ads: 24-72 horas. Blog/SEO: 4-8 semanas. Combinado: Primeira semana você recebe leads.'
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
                Marketing para Clínicas e Consultórios:{' '}
                <span className="text-gradient">Mais Agendamentos, Menos Esforço</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Pacientes pesquisam no Google antes de escolher. Se você não aparece, eles escolhem seu concorrente. 
                100% LGPD-compliant. Resultados comprovados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Auditar Presença Online
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reality Section */}
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
                A <span className="text-gradient">Realidade</span>
              </h2>
              <ul className="list-disc list-inside ml-4 space-y-3 text-gray-300 text-lg mb-6">
                {reality.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-primary font-semibold text-xl">
                Se você não está lá, está perdendo pacientes.
              </p>
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
                Os Desafios da <span className="text-gradient">Saúde</span>
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
                  
                  {challenge.canDo && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Pode:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {challenge.canDo.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {challenge.cannotDo && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-red-400 mb-2">Não pode:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {challenge.cannotDo.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {challenge.solution && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-2">Nossa solução:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {challenge.solution.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {challenge.responsibility && (
                    <p className="text-primary font-semibold mt-4">{challenge.responsibility}</p>
                  )}
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
                Nossas Soluções para <span className="text-gradient">Saúde</span>
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
                  
                  {solution.whatIs && (
                    <p className="text-gray-300 mb-4">
                      <strong className="text-white">O que é:</strong> {solution.whatIs}
                    </p>
                  )}

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

                  {solution.keywords && (
                    <div className="mb-4">
                      <p className="text-gray-300">
                        <strong className="text-white">Keywords:</strong> {solution.keywords}
                      </p>
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
                KPIs que <span className="text-gradient">Importam</span>
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
                Pronto para Mais <span className="text-gradient">Agendamentos</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Audite sua presença online e descubra como podemos trazer mais pacientes para sua clínica ou consultório.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Auditar Presença Online
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
                <Link href="/servicos/seo-bh" className="hover:text-primary transition-colors">
                  SEO para saúde →
                </Link>
                <Link href="/servicos/desenvolvimento-web-bh" className="hover:text-primary transition-colors">
                  Novo website →
                </Link>
                <Link href="/servicos/trafego-pago-bh" className="hover:text-primary transition-colors">
                  Google Ads localizado →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}

