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
import { ChevronDown, Check, TrendingUp, Target, BarChart3, Users, Zap } from 'lucide-react';

export default function MarketingPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
    { name: "Marketing Digital", url: "https://orbeelabs.com/servicos/marketing" },
  ];

  usePageTitle("Marketing Digital Estratégico: Crescimento Sustentável e Mensurável | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const services = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Estratégia Data-Driven',
      description: 'Decisões baseadas em dados reais, não em suposições. Analisamos métricas, comportamento do usuário e ROI para otimizar continuamente suas campanhas.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Segmentação Avançada',
      description: 'Identificamos e segmentamos seu público ideal. Criamos personas detalhadas e desenvolvemos estratégias específicas para cada segmento.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Multi-Canal Integrado',
      description: 'SEO, Google Ads, Facebook Ads, Email Marketing, Content Marketing. Tudo integrado e sincronizado para máxima eficiência.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Automação Inteligente',
      description: 'Automatizamos processos repetitivos e criamos jornadas personalizadas que nutrem leads até a conversão, 24/7.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Otimização Contínua',
      description: 'A/B testing, análise de performance, ajustes em tempo real. Sempre melhorando para maximizar resultados.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Análise e Diagnóstico',
      description: 'Auditoria completa do seu marketing atual. Identificamos oportunidades, gaps e pontos de melhoria.'
    },
    {
      step: '02',
      title: 'Estratégia Personalizada',
      description: 'Desenvolvemos um plano customizado baseado nos seus objetivos, orçamento e público-alvo.'
    },
    {
      step: '03',
      title: 'Implementação',
      description: 'Executamos a estratégia com foco em resultados mensuráveis desde o primeiro dia.'
    },
    {
      step: '04',
      title: 'Monitoramento e Otimização',
      description: 'Acompanhamos métricas em tempo real e otimizamos continuamente para melhorar performance.'
    }
  ];

  const included = [
    'Estratégia de marketing personalizada',
    'Gestão de campanhas multi-canal',
    'Automação de marketing',
    'Análise de dados e relatórios mensais',
    'Otimização contínua baseada em dados',
    'Gestão de redes sociais (opcional)',
    'Email marketing estratégico',
    'A/B testing e experimentação',
    'Reuniões mensais de alinhamento',
    'Suporte estratégico contínuo'
  ];

  const results = [
    {
      metric: 'ROI',
      description: 'ROI médio de 5x em campanhas otimizadas.'
    },
    {
      metric: 'Leads',
      description: '+300% de leads qualificados em 6 meses.'
    },
    {
      metric: 'Conversão',
      description: 'Taxa de conversão otimizada com base em dados reais.'
    },
    {
      metric: 'Crescimento',
      description: 'Crescimento sustentável e escalável mês a mês.'
    }
  ];

  const faqs = [
    {
      question: 'Qual a diferença entre Marketing Digital e Tráfego Pago?',
      answer: 'Marketing Digital é o guarda-chuva que inclui SEO, conteúdo, email, redes sociais, etc. Tráfego Pago (Google Ads, Facebook Ads) é uma parte específica do Marketing Digital focada em anúncios pagos. Trabalhamos com ambos de forma integrada.'
    },
    {
      question: 'Quanto tempo leva para ver resultados?',
      answer: 'Depende da estratégia. Tráfego pago pode gerar resultados em dias. SEO leva 3-6 meses. Email marketing e conteúdo começam a impactar em 1-2 meses. O importante é ter uma estratégia integrada que funcione em múltiplos tempos.'
    },
    {
      question: 'Vocês trabalham com qual orçamento mínimo?',
      answer: 'Trabalhamos com empresas de todos os tamanhos. O investimento varia conforme objetivos e estratégia. Agende uma conversa para discutirmos seu caso específico.'
    },
    {
      question: 'Como vocês medem o sucesso?',
      answer: 'Métricas claras desde o início: ROI, leads gerados, taxa de conversão, custo por aquisição, lifetime value. Tudo transparente em relatórios mensais.'
    },
    {
      question: 'Vocês fazem gestão de redes sociais?',
      answer: 'Sim, oferecemos gestão completa de redes sociais como parte do serviço de Marketing Digital, ou como serviço standalone. Inclui criação de conteúdo, agendamento, engajamento e análise.'
    }
  ];

  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <PageLayout breadcrumbItems={breadcrumbItems}>
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-20 bg-gradient-to-br from-background via-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Marketing Digital <span className="text-gradient">Estratégico</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Crescimento sustentável e mensurável através de estratégias data-driven integradas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground">
                    Falar com Especialista
                  </Button>
                </Link>
                <Link href="/calculadora-roi">
                  <Button size="lg" variant="outline">
                    Calcular ROI
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                O Que <span className="text-gradient">Fazemos</span>
              </h2>
            </motion.div>

            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <StaggerItem key={index}>
                    <div className="glass glass-hover p-6 rounded-xl">
                      <div className="text-primary mb-4">{service.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-300">{service.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Process Section */}
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
                Como <span className="text-gradient">Trabalhamos</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover p-6 rounded-xl flex items-start gap-6"
                >
                  <div className="text-4xl font-bold text-primary flex-shrink-0">{item.step}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Included Section */}
        <section className="py-20 bg-card/50">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {included.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 glass glass-hover p-4 rounded-lg"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
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
                Resultados <span className="text-gradient">Esperados</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover p-6 rounded-xl text-center"
                >
                  <h3 className="text-3xl font-bold text-primary mb-2">{result.metric}</h3>
                  <p className="text-gray-300">{result.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-card/50">
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
                        <p className="text-gray-300 leading-relaxed">
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
                Pronto para <span className="text-gradient">Crescer</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Vamos conversar sobre como podemos acelerar seu crescimento com marketing digital estratégico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg"
                  >
                    Falar com Especialista
                  </Button>
                </Link>
                <Link href="/calculadora-roi">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg"
                  >
                    Calcular ROI
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}

