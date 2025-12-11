'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layout';
import { Clock } from 'lucide-react';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import type { CaseStudy } from '@/types/portfolio';

export default function PortfolioPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Portfolio", url: "https://orbeelabs.com/portfolio" },
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'Todos os Projetos' },
    { id: 'Saúde', name: 'Saúde' },
    { id: 'E-commerce', name: 'E-commerce' },
    { id: 'SaaS/Tech', name: 'SaaS/Tech' },
    { id: 'Artes / Eventos', name: 'Artes / Eventos' },
  ];

  // Filtros para a API
  const apiFilters = useMemo(() => {
    const filterObj: Record<string, string> = {};
    if (activeFilter !== 'all') {
      filterObj.industry = activeFilter;
    }
    return filterObj;
  }, [activeFilter]);

  const { data: cases, isLoading } = usePaginatedData<CaseStudy>({
    endpoint: '/api/portfolio',
    filters: apiFilters,
  });

  const featuredCases = cases.filter(c => c.featured);
  const regularCases = cases.filter(c => !c.featured);

  return (
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
          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white">Carregando cases...</p>
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum case encontrado.</p>
            </div>
          ) : (
            <>
              {/* Featured Cases */}
              {featuredCases.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-8">Cases em Destaque</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredCases.map((study, index) => (
                      <CaseCard key={study.id} study={study} featured delay={index * 0.1} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Cases */}
              {regularCases.length > 0 && (
                <div>
                  {featuredCases.length > 0 && (
                    <h2 className="text-2xl font-bold text-white mb-8">Todos os Cases</h2>
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {regularCases.map((study, index) => (
                      <CaseCard key={study.id} study={study} delay={index * 0.1} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
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

interface CaseCardProps {
  study: CaseStudy;
  featured?: boolean;
  delay?: number;
}

function CaseCard({ study, featured = false, delay = 0 }: CaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Link href={`/portfolio/${study.slug}`}>
        <div className="glass glass-hover rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col">
          {/* Hero Image */}
          <div className={`aspect-video bg-gradient-to-br from-primary/20 to-yellow-500/20 flex items-center justify-center relative ${featured ? 'h-64' : 'h-48'}`}>
            {study.heroImage ? (
              <Image
                src={study.heroImage}
                alt={study.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary/50 text-6xl font-bold">{study.title.charAt(0)}</span>
              </div>
            )}
            {study.featured && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                Destaque
              </div>
            )}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white text-sm font-semibold">{study.industry}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className={`text-white mb-2 font-bold group-hover:text-primary transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
              {study.title}
            </h3>
            {study.clientName && (
              <p className="text-primary text-sm mb-3 font-semibold">{study.clientName}</p>
            )}
            <p className="text-gray-300 mb-4 text-sm line-clamp-3 flex-1">
              {study.description}
            </p>

            {/* Duration */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Clock className="w-4 h-4" />
              <span>{study.duration}</span>
            </div>

            {/* Services */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-primary mb-2">Serviços:</h4>
              <div className="flex flex-wrap gap-1">
                {study.services.slice(0, 3).map((service) => (
                  <span
                    key={service}
                    className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                  >
                    {service}
                  </span>
                ))}
                {study.services.length > 3 && (
                  <span className="px-2 py-1 bg-primary/10 text-primary/70 text-xs rounded-full">
                    +{study.services.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="w-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground py-2 rounded-full font-semibold text-sm text-center group-hover:shadow-lg transition-all duration-300">
                Ver Case Completo →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
