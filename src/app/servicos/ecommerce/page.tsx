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
import { ChevronDown, Check, ShoppingCart, TrendingUp, Zap, Shield, BarChart3 } from 'lucide-react';

export default function EcommercePage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
    { name: "E-commerce", url: "https://orbeelabs.com/servicos/ecommerce" },
  ];

  usePageTitle("E-commerce de Alta Performance: Vendas Online que Convertem | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const services = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Desenvolvimento de Loja Virtual',
      description: 'Lojas otimizadas para conversão com performance 98+, SEO integrado e experiência de compra excepcional.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Otimização de Conversão',
      description: 'A/B testing, análise de funil, otimização de checkout. Aumentamos sua taxa de conversão com dados reais.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance e Velocidade',
      description: 'Sites que carregam em menos de 1 segundo. Google favorece sites rápidos, e clientes também.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Segurança e Confiança',
      description: 'SSL, PCI compliance, proteção contra fraudes. Seus clientes compram com segurança.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics e Relatórios',
      description: 'Dashboard completo com métricas de vendas, comportamento do cliente e ROI de campanhas.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Análise e Planejamento',
      description: 'Entendemos seu produto, público e objetivos. Criamos um plano estratégico completo.'
    },
    {
      step: '02',
      title: 'Desenvolvimento',
      description: 'Construímos sua loja com foco em conversão, performance e experiência do usuário.'
    },
    {
      step: '03',
      title: 'Integrações',
      description: 'Pagamentos, frete, estoque, CRM. Tudo integrado e funcionando perfeitamente.'
    },
    {
      step: '04',
      title: 'Otimização Contínua',
      description: 'Monitoramos métricas, testamos melhorias e otimizamos continuamente para mais vendas.'
    }
  ];

  const included = [
    'Desenvolvimento completo da loja virtual',
    'Design responsivo e otimizado para conversão',
    'Integração com gateways de pagamento',
    'Sistema de gestão de estoque',
    'Cálculo de frete automático',
    'SEO técnico integrado',
    'Performance 98+ garantido',
    'Dashboard de analytics',
    'Treinamento para gestão da loja',
    'Suporte pós-lançamento'
  ];

  const results = [
    {
      metric: 'Conversão',
      description: 'Taxa de conversão otimizada: +40% em média.'
    },
    {
      metric: 'Performance',
      description: 'Performance Score 98+ no Google PageSpeed.'
    },
    {
      metric: 'Vendas',
      description: '+200% de vendas online em 6 meses.'
    },
    {
      metric: 'Tempo',
      description: 'Carregamento < 1 segundo.'
    }
  ];

  const faqs = [
    {
      question: 'Qual plataforma vocês usam?',
      answer: 'Trabalhamos principalmente com Next.js e React para máxima performance e SEO. Também podemos trabalhar com Shopify, WooCommerce ou outras plataformas conforme necessidade.'
    },
    {
      question: 'Quanto custa desenvolver uma loja virtual?',
      answer: 'O investimento varia conforme complexidade, número de produtos, integrações necessárias e funcionalidades. Agende uma conversa para discutirmos seu projeto específico.'
    },
    {
      question: 'Quanto tempo leva para lançar?',
      answer: 'Depende do escopo. Uma loja básica pode estar no ar em 4-6 semanas. Loja mais complexa pode levar 8-12 semanas. Sempre priorizamos qualidade e performance.'
    },
    {
      question: 'Vocês fazem gestão da loja após o lançamento?',
      answer: 'Oferecemos suporte pós-lançamento e podemos fazer gestão completa incluindo atualizações, otimizações e manutenção contínua.'
    },
    {
      question: 'A loja vai aparecer no Google?',
      answer: 'Sim! SEO técnico está incluído. Otimizamos desde o código para que sua loja ranqueie bem no Google e traga tráfego orgânico.'
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
                E-commerce de <span className="text-gradient">Alta Performance</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Lojas virtuais otimizadas para conversão, performance e vendas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground">
                    Falar com Especialista
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
                Pronto para <span className="text-gradient">Vender Online</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Vamos criar sua loja virtual de alta performance e começar a vender.
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

