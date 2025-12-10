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

export default function TrafegoPagoPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
    { name: "Tráfego Pago BH", url: "https://orbeelabs.com/servicos/trafego-pago-bh" },
  ];

  usePageTitle("Tráfego Pago + SEO: Crescimento Rápido + Sustentável | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const platforms = [
    {
      title: 'Google Ads',
      subtitle: 'Clientes em 24-72 Horas',
      description: 'Quando alguém busca no Google exatamente o que você faz, seu anúncio aparece em primeiro.',
      features: [
        'Você paga por clique, não por impressão',
        'CPC típico: R$ 5-50 conforme concorrência',
        'Você controla budget (R$ 1.000, R$ 5.000, R$ 10.000/mês)',
        'Pode pausar quando quiser (sem contrato)'
      ],
      strategy: [
        'Pesquisa de keywords (quais palavras trazem clientes reais)',
        'Copy otimizado (anúncio que converte)',
        'Landing page específica (não homepage)',
        'Bid automático (sistema aprende e oferece valor certo)',
        'Otimização contínua (testamos, aprendemos, otimizamos)'
      ],
      results: ['ROI 3-5x (gasta R$ 1.000, volta R$ 3-5.000)', 'CAC R$ 100-500']
    },
    {
      title: 'Meta Ads',
      subtitle: 'Facebook, Instagram',
      description: 'Anúncio no Facebook/Instagram. Pessoa scrolleia, vê seu anúncio, clica, vira lead.',
      whyWorks: 'Facebook/Instagram sabe tudo sobre as pessoas. Você segmenta: "Mulher 25-35, interesse em saúde". Anúncio chega EXATAMENTE pra pessoa certa.',
      whenUse: [
        'Quando você quer conscientização + retargeting',
        'Quando quer leads mais baratos que Google'
      ]
    },
    {
      title: 'LinkedIn Ads',
      subtitle: 'B2B',
      description: 'LinkedIn é rede profissional. Se você vende para empresas, seus clientes estão lá.',
      segmentation: 'Segmenta: "CEO, empresa 100-1000 pessoas, setor X". Anúncio chega EXATAMENTE pra pessoa certa.',
      whenUse: [
        'Quando você vende para empresas (consultoria, advocacia, etc.)',
        'Lead quality é altíssima',
        'CAC é maior, mas cliente vale mais'
      ]
    }
  ];

  const hybridStrategy = [
    {
      period: 'Mês 1-3',
      description: 'Tráfego pago: traz leads AGORA. Receita financia SEO. Começamos conteúdo.'
    },
    {
      period: 'Mês 4-6',
      description: 'Tráfego pago: continua. SEO: começa a ranquear. Reduzimos dependência de ads.'
    },
    {
      period: 'Mês 7-12',
      description: 'Tráfego pago: reduzimos investimento. SEO: tráfego orgânico cresce exponencialmente. ROI híbrido: 8-10x'
    }
  ];

  const included = [
    'Auditoria de keywords e estratégia',
    'Setup de campanhas (Google, Meta, LinkedIn)',
    'Landing pages convertidas',
    'A/B testing contínuo',
    'Gestão de bid automática',
    'Remarketing multilayer',
    'Rastreamento de conversão',
    'Relatórios mensais',
    'Reunião mensal',
    'Account manager dedicado'
  ];

  const tracking = [
    'Pixel de conversão (Google, Meta, LinkedIn rastreiam cliques → cliente)',
    'GA4 Events (registramos "lead criado", "compra")',
    'CRM integration (sincronizamos com seu CRM)',
    'Revenue attribution (sabemos qual anúncio trouxe cliente que pagou X)'
  ];

  const faqs = [
    {
      question: 'Quanto tempo até ver resultados?',
      answer: 'Google Ads: 24-72 horas. Meta Ads: 3-7 dias. LinkedIn: 1-2 semanas. Significativos: 2-4 semanas.'
    },
    {
      question: 'Qual budget mínimo?',
      answer: 'R$ 1.000/mês é viável. Recomendações: Google: R$ 3-5k/mês, Meta: R$ 1-2k/mês, LinkedIn: R$ 2-5k/mês, Híbrido ideal: R$ 5-10k/mês'
    },
    {
      question: 'Quanto é a taxa de gestão?',
      answer: 'Média 15-20% do orçamento de ads. Exemplo: R$ 10.000/mês em ads = R$ 1.500-2.000/mês de gestão.'
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
                Tráfego Pago + SEO:{' '}
                <span className="text-gradient">Crescimento Rápido + Sustentável</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Google Ads, Meta Ads, LinkedIn Ads. Estratégia híbrida que traz clientes AGORA 
                e crescimento DURADOURO. ROI comprovado. Sem desperdício de budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Auditar Minha Estratégia de Tráfego
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    📞 Agendar Consultoria
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dilemma Section */}
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
                O Dilema <span className="text-gradient">Clássico</span>
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>Você precisa de clientes <strong className="text-white">HOJE</strong>.</p>
                <p>SEO leva 3-6 meses.</p>
                <p className="text-primary font-semibold text-xl">Escolha difícil:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Fazer só tráfego pago = caro, dependência infinita</li>
                  <li>Fazer só SEO = lento demais</li>
                  <li>Não fazer nada = clientes vão pro concorrente</li>
                </ul>
                <p className="text-primary font-semibold text-xl mt-4">A solução real:</p>
                <p className="text-primary font-semibold text-xl">Fazer os dois juntos.</p>
                <p>Tráfego pago traz clientes agora (financia o negócio).</p>
                <p>SEO traz crescimento a longo prazo (reduz dependência de anúncios).</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Platforms Section */}
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
                Nossas <span className="text-gradient">Plataformas</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-8 md:p-10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{platform.title}</h3>
                    <span className="text-primary font-semibold">{platform.subtitle}</span>
                  </div>
                  <p className="text-gray-300 mb-6 text-lg">{platform.description}</p>
                  
                  {platform.features && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-primary mb-3">Características:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
                        {platform.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {platform.strategy && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-primary mb-3">Nossa Estratégia:</h4>
                      <ol className="list-decimal list-inside ml-4 space-y-2 text-gray-300">
                        {platform.strategy.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {platform.whyWorks && (
                    <div className="mb-6">
                      <p className="text-gray-300"><strong className="text-white">Por que funciona:</strong> {platform.whyWorks}</p>
                    </div>
                  )}

                  {platform.segmentation && (
                    <div className="mb-6">
                      <p className="text-gray-300"><strong className="text-white">Segmentação:</strong> {platform.segmentation}</p>
                    </div>
                  )}

                  {platform.whenUse && (
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-primary mb-3">Quando Usar:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
                        {platform.whenUse.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {platform.results && (
                    <div className="bg-primary/10 rounded-lg p-4 mt-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">Resultado esperado:</h4>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                        {platform.results.map((result, idx) => (
                          <li key={idx}>{result}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hybrid Strategy Section */}
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
                A Estratégia <span className="text-gradient">Híbrida (O Segredo)</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-red-400 mb-4">Problema de fazer SÓ tráfego pago:</h3>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
                  <li>Caro</li>
                  <li>Dependência infinita</li>
                  <li>ROI piora com tempo</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-red-400 mb-4">Problema de fazer SÓ SEO:</h3>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
                  <li>Lento (3-6 meses)</li>
                  <li>Empresa não aguenta esperar</li>
                  <li>Sem clientes iniciais, sem receita</li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">Solução: Os Dois Juntos</h3>
            </motion.div>

            <div className="space-y-6">
              {hybridStrategy.map((phase, index) => (
                <motion.div
                  key={phase.period}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-8"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {phase.period}
                    </div>
                    <p className="text-gray-300 text-lg flex-1">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracking Section */}
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
                Como Medimos <span className="text-gradient">ROI</span>
              </h2>
              <h3 className="text-xl font-semibold text-primary mb-4">Rastreamento completo:</h3>
              <ol className="list-decimal list-inside ml-4 space-y-3 text-gray-300 mb-6">
                {tracking.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
              <h3 className="text-xl font-semibold text-primary mb-4">Você vê:</h3>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300 mb-4">
                <li>CPL (custo por lead)</li>
                <li>ROAS (retorno por real)</li>
                <li>ROI (total)</li>
                <li>Payback (quanto tempo pra recuperar)</li>
              </ul>
              <p className="text-primary font-semibold text-lg">Painel customizado: Acesso 24/7.</p>
            </motion.div>
          </div>
        </section>

        {/* Included Section */}
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

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-background to-card">
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
                Pronto para Trazer Clientes <span className="text-gradient">AGORA</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Audite sua estratégia de tráfego pago e descubra como podemos trazer leads qualificados 
                enquanto construímos crescimento orgânico sustentável.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Auditar Estratégia de Tráfego
                  </Button>
                </Link>
                <Link href="/servicos/seo-bh">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Quero SEO + Tráfego
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  Ver cases →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}

