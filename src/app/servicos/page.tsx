'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedCard from '@/components/animations/AnimatedCard';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';

export default function ServicesPage() {
  const seoMethodology = {
    title: 'SEO Cabuloso',
    subtitle: 'Nossa Metodologia Proprietária',
    description: 'Desenvolvemos uma metodologia única que combina SEO técnico avançado com estratégias de conteúdo data-driven para resultados excepcionais.',
    phases: [
      {
        phase: '01',
        title: 'Auditoria Técnica Completa',
        description: 'Análise profunda da arquitetura, velocidade, indexação e aspectos técnicos do site.',
        deliverables: ['Relatório técnico detalhado', 'Priorização de correções', 'Roadmap de implementação']
      },
      {
        phase: '02',
        title: 'Pesquisa e Estratégia de Palavras-Chave',
        description: 'Identificação de oportunidades de rankeamento baseada em volume, concorrência e intenção de busca.',
        deliverables: ['Mapa de palavras-chave', 'Análise competitiva', 'Estratégia de conteúdo']
      },
      {
        phase: '03',
        title: 'Otimização On-Page Avançada',
        description: 'Implementação de otimizações técnicas e de conteúdo para maximizar o potencial de rankeamento.',
        deliverables: ['Otimizações técnicas', 'Melhorias de UX', 'Schema markup']
      },
      {
        phase: '04',
        title: 'Criação de Conteúdo Estratégico',
        description: 'Desenvolvimento de conteúdo otimizado que atende à intenção do usuário e algoritmos de busca.',
        deliverables: ['Conteúdo otimizado', 'Blog posts', 'Landing pages']
      },
      {
        phase: '05',
        title: 'Link Building & Autoridade',
        description: 'Construção de autoridade através de estratégias éticas de link building e parcerias.',
        deliverables: ['Estratégia de links', 'Outreach', 'Monitoramento de backlinks']
      },
      {
        phase: '06',
        title: 'Monitoramento e Otimização',
        description: 'Acompanhamento contínuo dos resultados com ajustes baseados em dados reais.',
        deliverables: ['Relatórios mensais', 'Análise de ROI', 'Ajustes estratégicos']
      }
    ]
  };

  const services = [
    {
      title: 'SEO Cabuloso - Metodologia Completa',
      description: 'Nossa metodologia proprietária que combina SEO técnico avançado com estratégias de conteúdo para resultados excepcionais.',
      icon: '🚀',
      features: ['Auditoria técnica completa', 'Estratégia de palavras-chave', 'Otimização on-page', 'Link building ético', 'Monitoramento contínuo'],
      price: 'A partir de R$ 4.500/mês',
      highlight: true
    },
    {
      title: 'Desenvolvimento Web Fullstack',
      description: 'Sites e aplicações web otimizadas para SEO desde o código, garantindo máxima performance e conversão.',
      icon: '💻',
      features: ['React & Next.js', 'SEO técnico integrado', 'Performance otimizada', 'Design responsivo', 'Analytics avançado'],
      price: 'A partir de R$ 8.000'
    },
    {
      title: 'Marketing Digital Performance',
      description: 'Estratégias integradas de marketing digital focadas em ROI e crescimento sustentável do negócio.',
      icon: '📊',
      features: ['Google Ads otimizado', 'Social Media estratégico', 'Email marketing', 'Automação de vendas', 'Análise de conversão'],
      price: 'A partir de R$ 3.500/mês'
    },
    {
      title: 'Design UX/UI Estratégico',
      description: 'Interfaces que convertem, focadas na experiência do usuário e otimizadas para mecanismos de busca.',
      icon: '🎨',
      features: ['Pesquisa UX', 'Design para conversão', 'Prototipagem avançada', 'Testes A/B', 'Acessibilidade'],
      price: 'A partir de R$ 5.000'
    },
    {
      title: 'Consultoria Estratégica Digital',
      description: 'Orientação especializada para transformação digital completa com foco em resultados mensuráveis.',
      icon: '💡',
      features: ['Análise competitiva', 'Roadmap digital', 'Treinamento de equipes', 'KPIs personalizados', 'Mentoria executiva'],
      price: 'A partir de R$ 2.500/sessão'
    },
    {
      title: 'E-commerce Performance',
      description: 'Soluções completas para e-commerce com foco em conversão, SEO e experiência de compra otimizada.',
      icon: '🛒',
      features: ['Plataforma otimizada', 'SEO para e-commerce', 'CRO avançado', 'Integração com APIs', 'Analytics de vendas'],
      price: 'A partir de R$ 12.000'
    }
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Diagnóstico',
      description: 'Análise completa do seu negócio, concorrência e mercado para identificar oportunidades.',
      icon: '🔍',
    },
    {
      step: '02',
      title: 'Estratégia',
      description: 'Desenvolvimento de uma estratégia personalizada baseada em dados e melhores práticas.',
      icon: '🎯',
    },
    {
      step: '03',
      title: 'Execução',
      description: 'Implementação das ações planejadas com acompanhamento em tempo real.',
      icon: '🚀',
    },
    {
      step: '04',
      title: 'Otimização',
      description: 'Monitoramento contínuo e otimização baseada em resultados e métricas.',
      icon: '📈',
    },
  ];

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background via-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl text-white mb-6">
              Nossos <span className="text-gradient">Serviços</span>
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              Oferecemos soluções completas em marketing digital e desenvolvimento web,
              com metodologia própria e foco em resultados mensuráveis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO Cabuloso Methodology */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-white mb-4">
              <span className="text-gradient">{seoMethodology.title}</span>
            </h2>
            <h3 className="text-2xl font-semibold text-white mb-6">
              {seoMethodology.subtitle}
            </h3>
            <p className="text-body max-w-4xl mx-auto">
              {seoMethodology.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoMethodology.phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/20">
                  {phase.phase}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4 relative z-10">
                  {phase.title}
                </h4>
                
                <p className="text-gray-300 mb-6 relative z-10">
                  {phase.description}
                </p>
                
                <div className="relative z-10">
                  <h5 className="text-sm font-semibold text-primary mb-3">Entregas:</h5>
                  <ul className="space-y-1">
                    {phase.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-center">
                        <span className="text-primary mr-2">•</span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-white mb-6">
              Nossos <span className="text-gradient">Serviços</span>
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Soluções completas em marketing digital e desenvolvimento web
              para impulsionar o crescimento do seu negócio com foco em ROI real.
            </p>
          </motion.div>

          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <StaggerItem key={service.title}>
                  <AnimatedCard delay={index * 0.1}>
                    <div className={`glass glass-hover rounded-2xl p-8 group relative overflow-hidden ${
                      service.highlight ? 'ring-2 ring-primary' : ''
                    }`}>
                {service.highlight && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    DESTAQUE
                  </div>
                )}
                
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 text-sm">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300 text-sm">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col gap-3">
                  <span className="text-xl font-bold text-primary">
                    {service.price}
                  </span>
                  <button className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 w-full">
                    Solicitar Proposta
                  </button>
                </div>
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-white mb-6">
              Nossa <span className="text-gradient">Metodologia</span>
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Seguimos um processo estruturado e comprovado que garante
              resultados consistentes e sustentáveis para todos os nossos clientes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodologySteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg text-white mb-6">
              Vamos <span className="text-gradient">Conversar</span>?
            </h2>
            <p className="text-body max-w-3xl mx-auto mb-8">
              Está pronto para transformar seu negócio? Entre em contato conosco
              e descubra como podemos ajudar você a alcançar seus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Solicitar Proposta
              </Link>
              <Link
                href="/portfolio"
                className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Ver Cases de Sucesso
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
