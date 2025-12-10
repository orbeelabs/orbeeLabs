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
import { ChevronDown, Check, Target, Zap, TrendingUp, BarChart3 } from 'lucide-react';

export default function LandingPagesPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
    { name: "Landing Pages", url: "https://orbeelabs.com/servicos/landing-pages" },
  ];

  usePageTitle("Landing Pages de Alta Conversão: Transforme Visitantes em Clientes | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Foco em Conversão',
      description: 'Cada elemento é pensado para converter. Headlines, CTAs, formulários - tudo otimizado para resultados.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance Máxima',
      description: 'Carregamento ultra-rápido (< 1s). Google favorece sites rápidos e usuários também.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'A/B Testing Integrado',
      description: 'Testamos variações automaticamente para encontrar a versão que mais converte.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics Completo',
      description: 'Rastreamento detalhado de conversões, funil de vendas e comportamento do usuário.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Briefing e Pesquisa',
      description: 'Entendemos seu produto, público e objetivo. Pesquisamos concorrência e melhores práticas.'
    },
    {
      step: '02',
      title: 'Criação e Design',
      description: 'Desenvolvemos a landing page com foco em conversão, usando princípios de copywriting e UX.'
    },
    {
      step: '03',
      title: 'Otimização e Testes',
      description: 'Otimizamos performance, SEO e testamos diferentes variações para máxima conversão.'
    },
    {
      step: '04',
      title: 'Lançamento e Monitoramento',
      description: 'Lançamos e monitoramos métricas em tempo real, otimizando continuamente.'
    }
  ];

  const included = [
    'Design profissional e otimizado para conversão',
    'Copywriting persuasivo e focado em resultados',
    'Formulário de captura otimizado',
    'Integração com CRM e ferramentas de marketing',
    'Performance 98+ garantido',
    'SEO técnico integrado',
    'Mobile-first e totalmente responsivo',
    'A/B testing de elementos-chave',
    'Analytics e rastreamento de conversões',
    'Suporte e otimizações contínuas'
  ];

  const results = [
    {
      metric: 'Conversão',
      description: 'Taxa de conversão média: 5-15% (vs 2-3% padrão).'
    },
    {
      metric: 'Performance',
      description: 'Performance Score 98+ no Google.'
    },
    {
      metric: 'Velocidade',
      description: 'Carregamento < 1 segundo.'
    },
    {
      metric: 'ROI',
      description: 'ROI médio de 10x em campanhas pagas.'
    }
  ];

  const faqs = [
    {
      question: 'Quanto custa uma landing page?',
      answer: 'O investimento varia conforme complexidade, número de seções, integrações e funcionalidades. Landing pages simples começam em R$ 2.500. Agende uma conversa para discutirmos seu projeto.'
    },
    {
      question: 'Quanto tempo leva para criar?',
      answer: 'Uma landing page profissional leva de 1 a 2 semanas, dependendo da complexidade e do processo de aprovação.'
    },
    {
      question: 'Vocês fazem copywriting também?',
      answer: 'Sim! Copywriting persuasivo está incluído. Criamos textos que convertem, baseados em pesquisa e melhores práticas.'
    },
    {
      question: 'A landing page vai aparecer no Google?',
      answer: 'Sim! SEO técnico está incluído. Otimizamos para que sua landing page ranqueie bem para palavras-chave relevantes.'
    },
    {
      question: 'Posso usar a landing page em campanhas pagas?',
      answer: 'Perfeito! Nossas landing pages são otimizadas especificamente para campanhas de tráfego pago (Google Ads, Facebook Ads, etc).'
    }
  ];

  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <PageLayout breadcrumbItems={breadcrumbItems}>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-background via-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Landing Pages de <span className="text-gradient">Alta Conversão</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Transforme visitantes em clientes com páginas otimizadas para conversão
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground">
                    Criar Minha Landing Page
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline">
                    Ver Cases
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
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
                Por Que Nossas Landing Pages <span className="text-gradient">Convertem</span>
              </h2>
            </motion.div>

            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <StaggerItem key={index} index={index}>
                    <div className="glass glass-hover p-6 rounded-xl">
                      <div className="text-primary mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
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
                Pronto para <span className="text-gradient">Converter Mais</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Vamos criar sua landing page de alta conversão e transformar visitantes em clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg"
                  >
                    Criar Minha Landing Page
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg"
                  >
                    Ver Cases
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

