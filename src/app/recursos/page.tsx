'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';
import { usePageTitle } from '@/hooks/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Download, Search, Filter, Check } from 'lucide-react';

export default function RecursosPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Recursos", url: "https://orbeelabs.com/recursos" },
  ];

  usePageTitle("Recursos Gratuitos: E-books, Templates e Ferramentas de Marketing Digital | Orbee Labs");

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'ebook', name: 'E-books' },
    { id: 'template', name: 'Templates' },
    { id: 'ferramenta', name: 'Ferramentas' },
    { id: 'guia', name: 'Guias' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Guia Completo de SEO para 2025',
      category: 'ebook',
      type: 'E-book',
      description: 'Tudo que você precisa saber sobre SEO técnico e estratégico para dominar o Google',
      downloadCount: 1250,
      image: '📚'
    },
    {
      id: 2,
      title: 'Template de Auditoria SEO',
      category: 'template',
      type: 'Template',
      description: 'Planilha completa para fazer auditoria técnica do seu site',
      downloadCount: 890,
      image: '📊'
    },
    {
      id: 3,
      title: 'Calculadora de ROI de Marketing',
      category: 'ferramenta',
      type: 'Ferramenta',
      description: 'Calcule o retorno sobre investimento das suas campanhas de marketing',
      downloadCount: 2100,
      image: '🧮'
    },
    {
      id: 4,
      title: 'Guia de Palavras-Chave',
      category: 'guia',
      type: 'Guia',
      description: 'Como pesquisar e escolher as melhores palavras-chave para seu negócio',
      downloadCount: 1560,
      image: '🔍'
    },
    {
      id: 5,
      title: 'Template de Plano de Marketing',
      category: 'template',
      type: 'Template',
      description: 'Estrutura completa para criar seu plano de marketing digital',
      downloadCount: 980,
      image: '📋'
    },
    {
      id: 6,
      title: 'E-book: Marketing Digital para Iniciantes',
      category: 'ebook',
      type: 'E-book',
      description: 'Introdução completa ao marketing digital com exemplos práticos',
      downloadCount: 3200,
      image: '📖'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
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
              Biblioteca de <span className="text-gradient">Recursos</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              E-books, templates, ferramentas e guias gratuitos para acelerar seu marketing digital
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-300 text-xl">Nenhum recurso encontrado com os filtros selecionados.</p>
            </div>
          ) : (
            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                  <StaggerItem key={resource.id}>
                    <Card className="glass glass-hover h-full flex flex-col">
                      <CardHeader>
                        <div className="text-4xl mb-4">{resource.image}</div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                            {resource.type}
                          </span>
                        </div>
                        <CardTitle className="text-xl text-white">{resource.title}</CardTitle>
                        <CardDescription className="text-gray-300 mt-2">
                          {resource.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-400">
                            <Download className="w-4 h-4 inline mr-1" />
                            {resource.downloadCount.toLocaleString()} downloads
                          </span>
                        </div>
                        <Link href="/contato">
                          <Button variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar Grátis
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Quer Mais <span className="text-gradient">Recursos</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Entre em contato e descubra como podemos ajudar seu negócio a crescer
            </p>
            <Link href="/contato">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg"
              >
                Falar com Especialista
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

