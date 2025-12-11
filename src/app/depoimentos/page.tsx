'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';
import { usePageTitle } from '@/hooks/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star, Filter, Check } from 'lucide-react';

export default function DepoimentosPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Depoimentos", url: "https://orbeelabs.com/depoimentos" },
  ];

  usePageTitle("Depoimentos de Clientes: Histórias de Sucesso Real | Orbee Labs");

  const [selectedSector, setSelectedSector] = useState<string>('all');

  const sectors = [
    { id: 'all', name: 'Todos os Setores' },
    { id: 'saude', name: 'Saúde' },
    { id: 'educacao', name: 'Educação' },
    { id: 'servicos', name: 'Serviços Profissionais' },
    { id: 'ecommerce', name: 'E-commerce' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Dra. Bruna Vilela',
      role: 'Neuropediatra',
      company: 'Clínica de Neuropediatria',
      sector: 'saude',
      rating: 5,
      text: 'O trabalho da Orbee Labs transformou completamente minha presença online. Em poucos meses, minha agenda estava 100% ocupada. O SEO realmente funciona!',
      results: ['Agenda 100% ocupada', '+400% ROI', '8,21% CTR no Google']
    },
    {
      id: 2,
      name: 'Dra. Laura',
      role: 'Especialista em Saúde',
      company: 'Clínica Médica',
      sector: 'saude',
      rating: 5,
      text: 'Apareço em praticamente todas as buscas da minha especialidade. O conteúdo estratégico que criaram trouxe resultados incríveis.',
      results: ['Primeira página Google', 'Múltiplas palavras-chave', 'Tráfego qualificado']
    },
    {
      id: 3,
      name: 'João Silva',
      role: 'Diretor',
      company: 'Escola Particular',
      sector: 'educacao',
      rating: 5,
      text: 'Conseguimos aumentar significativamente nossas matrículas através do marketing digital. A equipe é muito profissional e entregou resultados acima das expectativas.',
      results: ['+200% matrículas', 'Melhor posicionamento', 'ROI positivo']
    },
    {
      id: 4,
      name: 'Maria Santos',
      role: 'CEO',
      company: 'E-commerce de Moda',
      sector: 'ecommerce',
      rating: 5,
      text: 'Nossa loja virtual teve um aumento de 300% nas vendas após o trabalho de SEO e otimização. Recomendo muito!',
      results: ['+300% vendas', 'Performance 98+', 'Conversão otimizada']
    },
    {
      id: 5,
      name: 'Carlos Oliveira',
      role: 'Advogado',
      company: 'Escritório de Advocacia',
      sector: 'servicos',
      rating: 5,
      text: 'O desenvolvimento do nosso site foi impecável. Rápido, moderno e com excelente posicionamento no Google.',
      results: ['Site profissional', 'SEO integrado', 'Alta performance']
    },
    {
      id: 6,
      name: 'Ana Costa',
      role: 'Dentista',
      company: 'Clínica Odontológica',
      sector: 'saude',
      rating: 5,
      text: 'Conseguimos triplicar nossos agendamentos online. O trabalho de SEO e gestão de redes sociais foi fundamental.',
      results: ['+300% agendamentos', 'Presença nas redes', 'Leads qualificados']
    }
  ];

  const filteredTestimonials = selectedSector === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.sector === selectedSector);

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
              O Que Nossos <span className="text-gradient">Clientes Dizem</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Histórias reais de empresas que transformaram seus resultados com marketing digital
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sectors.map((sector) => (
              <Button
                key={sector.id}
                variant={selectedSector === sector.id ? 'default' : 'outline'}
                onClick={() => setSelectedSector(sector.id)}
                size="sm"
              >
                {sector.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial, index) => (
                <StaggerItem key={testimonial.id}>
                  <Card className="glass glass-hover h-full flex flex-col">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4">
                        <Quote className="w-8 h-8 text-primary mb-4" />
                        <div className="flex mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          &quot;{testimonial.text}&quot;
                        </p>
                      </div>
                      <div className="mt-auto">
                        <div className="border-t border-border pt-4">
                          <h4 className="font-bold text-white mb-1">{testimonial.name}</h4>
                          <p className="text-sm text-gray-400 mb-3">
                            {testimonial.role} - {testimonial.company}
                          </p>
                          <div className="space-y-1">
                            {testimonial.results.map((result, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                <span>{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
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
              Números que <span className="text-gradient">Falam</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '50+', label: 'Clientes Satisfeitos' },
              { number: '98+', label: 'Performance Score Médio' },
              { number: '5x', label: 'ROI Médio' },
              { number: '100%', label: 'Taxa de Satisfação' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass glass-hover p-6 rounded-xl text-center"
              >
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-gray-300">{stat.label}</p>
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
              Pronto para Ser Nosso <span className="text-gradient">Próximo Case</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Vamos trabalhar juntos para transformar seus resultados também
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
                  Ver Cases Completos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

