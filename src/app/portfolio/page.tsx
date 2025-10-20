'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layout';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedProject, setSelectedProject] = useState<
    (typeof caseStudies)[0] | null
  >(null);

  const filters = [
    { id: 'todos', name: 'Todos os Projetos' },
    { id: 'seo', name: 'SEO' },
    { id: 'desenvolvimento', name: 'Desenvolvimento' },
    { id: 'marketing', name: 'Marketing Digital' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'landing', name: 'Landing Pages' },
  ];

  const caseStudies = [
    {
      title: 'Clínica Odontológica - São Paulo',
      description: 'Transformação digital completa de clínica odontológica com foco em agendamentos online.',
      image: '/placeholder.svg',
      category: 'Saúde',
      industry: 'Saúde',
      results: [
        '+340% aumento no tráfego orgânico',
        '+280% crescimento em leads qualificados',
        '+150% aumento na receita',
        '6 meses para resultados completos'
      ],
      services: ['SEO Cabuloso', 'Desenvolvimento Web', 'Google Ads'],
      technologies: ['React', 'SEO Local', 'Google Ads', 'Analytics'],
      challenge: 'Cliente com baixa presença digital e dependência de indicações presenciais.',
      solution: 'Implementamos SEO local agressivo, sistema de agendamento online e campanhas Google Ads direcionadas.',
      duration: '6 meses',
      url: '#',
      link: '#'
    },
    {
      title: 'E-commerce de Cosméticos',
      description: 'Aumento de 400% nas vendas online através de SEO técnico e otimização de conversão.',
      image: '/placeholder.svg',
      category: 'E-commerce',
      industry: 'E-commerce',
      results: [
        '+400% aumento no tráfego orgânico',
        '+320% crescimento em leads qualificados',
        '+400% aumento nas vendas online',
        '8 meses de implementação'
      ],
      services: ['SEO E-commerce', 'CRO', 'Marketing de Conteúdo'],
      technologies: ['Shopify', 'SEO Técnico', 'Google Analytics', 'A/B Testing'],
      challenge: 'Loja com alta concorrência e baixo tráfego orgânico.',
      solution: 'Estratégia SEO focada em long-tail, otimização de produto e conteúdo educativo.',
      duration: '8 meses',
      url: '#',
      link: '#'
    },
    {
      title: 'Escritório de Advocacia',
      description: 'Posicionamento como referência em direito empresarial através de conteúdo estratégico.',
      image: '/placeholder.svg',
      category: 'Jurídico',
      industry: 'Jurídico',
      results: [
        '+250% aumento no tráfego qualificado',
        '+200% crescimento em leads B2B',
        '+180% aumento na receita',
        '4 meses para primeiros resultados'
      ],
      services: ['SEO Técnico', 'Marketing de Conteúdo', 'LinkedIn Ads'],
      technologies: ['WordPress', 'SEO Content', 'LinkedIn Ads', 'HubSpot'],
      challenge: 'Mercado saturado e necessidade de diferenciação técnica.',
      solution: 'Criação de hub de conteúdo especializado e SEO para termos técnicos de alto valor.',
      duration: '4 meses',
      url: '#',
      link: '#'
    },
    {
      title: 'SaaS de Gestão Empresarial',
      description: 'Crescimento de MRR através de SEO técnico e marketing de produto.',
      image: '/placeholder.svg',
      category: 'SaaS/Tech',
      industry: 'SaaS/Tech',
      results: [
        '+500% aumento no tráfego orgânico',
        '+380% crescimento em trial signups',
        '+220% aumento no MRR',
        '12 meses de crescimento sustentado'
      ],
      services: ['SEO Técnico', 'Product Marketing', 'Desenvolvimento'],
      technologies: ['React', 'Node.js', 'SEO Técnico', 'Marketing Automation'],
      challenge: 'Produto complexo com necessidade de educação de mercado.',
      solution: 'Estratégia de conteúdo educativo, SEO para palavras-chave de produto e otimização de trial.',
      duration: '12 meses',
      url: '#',
      link: '#'
    },
    {
      title: 'Franquia de Alimentação',
      description: 'Expansão digital para 50+ unidades com SEO local e automação de marketing.',
      image: '/placeholder.svg',
      category: 'Franquias',
      industry: 'Franquias',
      results: [
        '+300% aumento no tráfego local',
        '+250% crescimento em pedidos online',
        '+120% aumento na receita média por unidade',
        '50+ unidades otimizadas'
      ],
      services: ['SEO Local', 'Automação', 'Multi-location SEO'],
      technologies: ['Multi-location SEO', 'Google My Business', 'Marketing Automation', 'Analytics'],
      challenge: 'Gestão de SEO para múltiplas localidades e unidades.',
      solution: 'Sistema automatizado de SEO local e gestão centralizada de presença digital.',
      duration: '10 meses',
      url: '#',
      link: '#'
    },
    {
      title: 'Construtora - Imóveis de Luxo',
      description: 'Geração de leads qualificados para imóveis de alto padrão através de SEO premium.',
      image: '/placeholder.svg',
      category: 'Imobiliário',
      industry: 'Imobiliário',
      results: [
        '+180% aumento no tráfego premium',
        '+300% crescimento em leads qualificados',
        '+250% aumento no valor médio de vendas',
        '6 meses para ROI positivo'
      ],
      services: ['SEO Premium', 'Marketing de Luxo', 'Lead Nurturing'],
      technologies: ['WordPress', 'SEO Premium', 'CRM Integration', 'Lead Nurturing'],
      challenge: 'Público de alto poder aquisitivo com processo de compra longo.',
      solution: 'SEO focado em termos premium e sistema de nutrição de leads sofisticado.',
      duration: '6 meses',
      url: '#',
      link: '#'
    }
  ];

  const filteredProjects = activeFilter === 'todos' 
    ? caseStudies 
    : caseStudies.filter(project => project.category === activeFilter);

  return (
    <PageLayout>
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
              Nosso <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              Conheça alguns dos projetos que transformaram negócios e geraram
              resultados excepcionais para nossos clientes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gradient-to-br from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {filter.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl overflow-hidden group"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-yellow-500/20 flex items-center justify-center relative">
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-semibold">{study.category}</span>
                  </div>
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    {study.description}
                  </p>
                  
                  {/* Results Grid */}
                  <div className="mb-6 p-4 bg-black/20 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3">Principais Resultados:</h4>
                    <div className="space-y-2">
                      {study.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <span className="text-primary mr-2">✓</span>
                          <span className="text-gray-300">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Services */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-primary mb-2">Serviços:</h4>
                    <div className="flex flex-wrap gap-1">
                      {study.services.map((service) => (
                        <span
                          key={service}
                          className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Challenge & Solution */}
                  <div className="mb-4 space-y-3">
                    <div>
                      <h5 className="text-xs font-semibold text-yellow-500 mb-1">DESAFIO:</h5>
                      <p className="text-xs text-gray-400">{study.challenge}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-green-500 mb-1">SOLUÇÃO:</h5>
                      <p className="text-xs text-gray-400">{study.solution}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedProject(study)}
                    className="w-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground py-2 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Ver Case Completo
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="glass rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <span className="px-4 py-2 bg-primary/20 text-primary rounded-full">
                    {selectedProject.industry}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Desafio</h3>
                  <p className="text-gray-300 mb-6">{selectedProject.challenge}</p>

                  <h3 className="text-xl font-bold text-white mb-4">Solução</h3>
                  <p className="text-gray-300 mb-6">{selectedProject.solution}</p>

                  <h3 className="text-xl font-bold text-white mb-4">Tecnologias</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary/20 text-secondary-foreground text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Resultados</h3>
                  <div className="space-y-3 mb-8">
                    {selectedProject.results.map((result, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-primary mr-3 text-lg">✓</span>
                        <span className="text-gray-300">{result}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Duração do projeto:</span>
                    <span className="text-primary font-semibold">{selectedProject.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Visitar Site
                </a>
                <Link
                  href="/contato"
                  className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Projeto Similar
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Seu projeto pode ser o <span className="text-gradient">próximo</span>
            </h2>
            <p className="text-body max-w-3xl mx-auto mb-8">
              Está pronto para ver seu negócio entre nossos cases de sucesso?
              Entre em contato e vamos discutir como podemos ajudar você.
            </p>
            <Link
              href="/contato"
              className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Iniciar Meu Projeto
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

