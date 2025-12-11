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
import { ChevronDown, Check, BarChart3, TrendingUp, Target, Eye, Zap } from 'lucide-react';

export default function AnalyticsPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
    { name: "Analytics e Dados", url: "https://orbeelabs.com/servicos/analytics" },
  ];

  usePageTitle("Analytics e Business Intelligence: Decisões Baseadas em Dados Reais | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const services = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Dashboards Personalizados',
      description: 'Dashboards visuais com as métricas que realmente importam para seu negócio. Dados em tempo real, sempre atualizados.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Análise de Performance',
      description: 'Analisamos ROI, conversão, funil de vendas e comportamento do usuário para identificar oportunidades.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Relatórios Automatizados',
      description: 'Relatórios mensais automáticos com insights acionáveis. Você foca no negócio, nós cuidamos dos dados.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Tracking Avançado',
      description: 'Rastreamento completo de jornada do cliente, desde o primeiro clique até a conversão.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Otimização Contínua',
      description: 'Não apenas mostramos dados - identificamos problemas e sugerimos melhorias baseadas em evidências.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Configuração e Integração',
      description: 'Configuramos Google Analytics, Facebook Pixel, conversões e todas as integrações necessárias.'
    },
    {
      step: '02',
      title: 'Criação de Dashboards',
      description: 'Desenvolvemos dashboards personalizados com as métricas mais importantes para seu negócio.'
    },
    {
      step: '03',
      title: 'Análise e Insights',
      description: 'Analisamos dados históricos e atuais para identificar padrões, oportunidades e problemas.'
    },
    {
      step: '04',
      title: 'Relatórios e Recomendações',
      description: 'Entregamos relatórios mensais com insights acionáveis e recomendações de otimização.'
    }
  ];

  const included = [
    'Configuração completa de Google Analytics',
    'Integração com Facebook Pixel e outras ferramentas',
    'Dashboard personalizado com métricas-chave',
    'Rastreamento de conversões e funil de vendas',
    'Análise de comportamento do usuário',
    'Relatórios mensais automatizados',
    'Insights e recomendações acionáveis',
    'A/B testing e análise de experimentos',
    'Treinamento para uso das ferramentas',
    'Suporte contínuo e otimizações'
  ];

  const results = [
    {
      metric: 'Visibilidade',
      description: '100% de visibilidade sobre performance de campanhas e canais.'
    },
    {
      metric: 'Decisões',
      description: 'Decisões baseadas em dados reais, não em suposições.'
    },
    {
      metric: 'Otimização',
      description: 'Identificação rápida de oportunidades de melhoria.'
    },
    {
      metric: 'ROI',
      description: 'Aumento de ROI através de otimizações baseadas em dados.'
    }
  ];

  const faqs = [
    {
      question: 'Quais ferramentas vocês usam?',
      answer: 'Trabalhamos principalmente com Google Analytics 4, Google Tag Manager, Facebook Pixel, e outras ferramentas conforme necessidade. Também criamos dashboards customizados quando necessário.'
    },
    {
      question: 'Preciso ter conhecimento técnico?',
      answer: 'Não! Criamos dashboards intuitivos e fornecemos relatórios em linguagem clara. Você não precisa entender de analytics para usar nossos serviços.'
    },
    {
      question: 'Quanto tempo leva para ver resultados?',
      answer: 'Configuração inicial leva 1-2 semanas. Primeiro relatório completo sai após 1 mês de coleta de dados. Insights e recomendações começam imediatamente após análise.'
    },
    {
      question: 'Vocês fazem análise de dados históricos?',
      answer: 'Sim! Analisamos dados históricos quando disponíveis para identificar padrões e criar baseline de performance.'
    },
    {
      question: 'Os relatórios são automáticos?',
      answer: 'Sim! Relatórios mensais são gerados automaticamente e enviados por email. Você também pode acessar dashboards em tempo real quando quiser.'
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
                Analytics e <span className="text-gradient">Business Intelligence</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Transforme dados em decisões estratégicas e resultados mensuráveis
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
                Pronto para <span className="text-gradient">Decidir com Dados</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Vamos configurar analytics completo e transformar dados em decisões estratégicas.
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

