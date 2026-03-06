'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import AnimatedCard from '@/components/animations/AnimatedCard';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';


export default function ServicosClient() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
  ];


  const seoMethodology = {
    title: 'SEO-VX',
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
        description: 'Acompanhamento contínuo de métricas e ajustes estratégicos para maximizar resultados.',
        deliverables: ['Relatórios mensais', 'Análise de concorrentes', 'Otimizações contínuas']
      }
    ]
  };

  const services = [
    {
      icon: '🔍',
      title: 'SEO Técnico & Estratégico',
      subtitle: 'Metodologia "SEO-VX"',
      description: 'Nossa abordagem proprietária combina análise técnica avançada com estratégias de conteúdo data-driven para dominar os resultados orgânicos.',
      features: [
        'Auditoria técnica completa',
        'Pesquisa estratégica de palavras-chave',
        'Otimização on-page avançada',
        'Link building ético e eficaz',
        'Monitoramento e relatórios detalhados'
      ],
      results: ['+400% tráfego orgânico', 'Primeira página Google', 'ROI mensurável'],
      cta: 'Solicitar Auditoria Gratuita',
      ctaLink: '/auditoria-seo'
    },
    {
      icon: '💻',
      title: 'Desenvolvimento Web Fullstack',
      subtitle: 'Tecnologia de Ponta',
      description: 'Soluções web robustas e escaláveis usando as tecnologias mais modernas: React, Next.js, Python e IA.',
      features: [
        'Desenvolvimento com React & Next.js',
        'Backend em Python & Node.js',
        'Integração com IA e Machine Learning',
        'Performance otimizada (98+ score)',
        'SEO técnico integrado'
      ],
      results: ['98+ Performance Score', 'Carregamento < 2s', 'Conversão otimizada'],
      cta: 'Ver Portfolio',
      ctaLink: '/portfolio'
    },
    {
      icon: '📊',
      title: 'Marketing de Alta Performance',
      subtitle: 'Estratégias Data-Driven',
      description: 'Campanhas focadas em ROI mensurável para Líderes Digitais Ambiciosos que buscam crescimento sustentável.',
      features: [
        'Estratégias baseadas em dados',
        'Campanhas multi-canal',
        'Automação de marketing',
        'Análise de comportamento',
        'Otimização contínua'
      ],
      results: ['5x ROI médio', 'Crescimento sustentável', 'Métricas transparentes'],
      cta: 'Calcular ROI',
      ctaLink: '/calculadora-roi'
    }
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-20 bg-gradient-to-br from-background via-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Nossos <span className="text-gradient">Serviços</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Oferecemos soluções completas em marketing digital e desenvolvimento web, 
                com foco em resultados mensuráveis e crescimento sustentável para seu negócio.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer staggerDelay={0.2}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <StaggerItem key={service.title}>
                    <AnimatedCard delay={index * 0.2}>
                      <div className="glass glass-hover rounded-2xl p-8 h-full flex flex-col">
                        <div className="text-center mb-6">
                          <div className="text-6xl mb-4">{service.icon}</div>
                          <h2 className="text-2xl font-bold text-white mb-2">{service.title}</h2>
                          <p className="text-primary font-semibold mb-4">{service.subtitle}</p>
                          <p className="text-gray-300 mb-6">{service.description}</p>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-4">O que incluímos:</h3>
                          <ul className="space-y-2 mb-6">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-gray-300">
                                <span className="text-primary mr-2">✓</span>
                                {feature}
                              </li>
                            ))}
                          </ul>

                          <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white mb-3">Resultados típicos:</h3>
                            <div className="flex flex-wrap gap-2">
                              {service.results.map((result, idx) => (
                                <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                  {result}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Link
                            href={service.ctaLink}
                            className="w-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground font-semibold py-3 px-6 rounded-lg text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            {service.cta}
                          </Link>
                          {service.title === 'SEO Técnico & Estratégico' && (
                            <Link
                              href="/servicos/seo-bh"
                              className="w-full border border-primary/50 text-primary font-semibold py-2 px-6 rounded-lg text-center hover:bg-primary/10 transition-all duration-300 text-sm"
                            >
                              Ver Página Completa de SEO →
                            </Link>
                          )}
                        </div>
                      </div>
                    </AnimatedCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* SEO Methodology Section */}
        <section className="py-20 bg-gradient-to-br from-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {seoMethodology.title}
              </h2>
              <p className="text-xl text-primary font-semibold mb-4">{seoMethodology.subtitle}</p>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">
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
                  className="glass glass-hover rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mr-4">
                      {phase.phase}
                    </div>
                    <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{phase.description}</p>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Entregáveis:</h4>
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/20 to-yellow-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pronto para <span className="text-gradient">Transformar</span> seu Negócio?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Não perca mais tempo com estratégias que não funcionam. 
                Venha conhecer nossa metodologia comprovada e transforme seu negócio hoje mesmo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground font-semibold py-4 px-8 rounded-full text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Solicitar Proposta Gratuita
                </Link>
                <Link
                  href="/auditoria-seo"
                  className="border-2 border-primary text-primary font-semibold py-4 px-8 rounded-full text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Auditoria SEO Gratuita
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
    </PageLayout>
  );
}