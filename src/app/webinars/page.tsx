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
import { Calendar, Video, Clock, Users, Play, Check } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function WebinarsPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Webinars", url: "https://orbeelabs.com/webinars" },
  ];

  usePageTitle("Webinars e Eventos Online: Aprenda Marketing Digital com Especialistas | Orbee Labs");

  const [selectedFilter, setSelectedFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming');

  const upcomingWebinars = [
    {
      id: 1,
      title: 'SEO Avançado: Como Dominar o Google em 2025',
      date: new Date('2025-02-15T19:00:00'),
      duration: '60 minutos',
      speaker: 'Equipe Orbee Labs',
      description: 'Aprenda técnicas avançadas de SEO que realmente funcionam em 2025',
      attendees: 0,
      image: '🎯',
      recording: false
    },
    {
      id: 2,
      title: 'Marketing Digital para Profissionais de Saúde',
      date: new Date('2025-02-22T19:00:00'),
      duration: '45 minutos',
      speaker: 'Equipe Orbee Labs',
      description: 'Estratégias específicas para médicos, clínicas e profissionais da saúde',
      attendees: 0,
      image: '🏥',
      recording: false
    },
    {
      id: 3,
      title: 'Como Calcular ROI de Marketing Digital',
      date: new Date('2025-03-01T19:00:00'),
      duration: '50 minutos',
      speaker: 'Equipe Orbee Labs',
      description: 'Aprenda a medir e otimizar o retorno sobre investimento das suas campanhas',
      attendees: 0,
      image: '📊',
      recording: false
    }
  ];

  const pastWebinars = [
    {
      id: 4,
      title: 'Introdução ao Marketing Digital',
      date: new Date('2025-01-10T19:00:00'),
      duration: '55 minutos',
      speaker: 'Equipe Orbee Labs',
      description: 'Fundamentos do marketing digital para iniciantes',
      attendees: 320,
      image: '📚',
      recording: true
    },
    {
      id: 5,
      title: 'Desenvolvimento Web com Next.js',
      date: new Date('2025-01-20T19:00:00'),
      duration: '70 minutos',
      speaker: 'Equipe Orbee Labs',
      description: 'Como criar sites rápidos e otimizados com Next.js',
      attendees: 280,
      image: '💻',
      recording: true
    }
  ];

  const allWebinars = [...upcomingWebinars, ...pastWebinars];
  const filteredWebinars = selectedFilter === 'all' 
    ? allWebinars 
    : selectedFilter === 'upcoming' 
    ? upcomingWebinars 
    : pastWebinars;

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
              Webinars e <span className="text-gradient">Eventos Online</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Aprenda marketing digital com especialistas. Eventos gratuitos e gravados disponíveis
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedFilter === 'upcoming' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('upcoming')}
            >
              Próximos Eventos
            </Button>
            <Button
              variant={selectedFilter === 'past' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('past')}
            >
              Eventos Passados
            </Button>
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
            >
              Todos
            </Button>
          </div>
        </div>
      </section>

      {/* Webinars Grid */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredWebinars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-300 text-xl">Nenhum evento encontrado.</p>
            </div>
          ) : (
            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWebinars.map((webinar, index) => (
                  <StaggerItem key={webinar.id}>
                    <Card className="glass glass-hover h-full flex flex-col">
                      <CardHeader>
                        <div className="text-4xl mb-4">{webinar.image}</div>
                        <CardTitle className="text-xl text-white mb-2">{webinar.title}</CardTitle>
                        <CardDescription className="text-gray-300">
                          {webinar.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto space-y-4">
                        <div className="space-y-2 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(webinar.date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{webinar.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{webinar.attendees > 0 ? `${webinar.attendees} participantes` : 'Inscrições abertas'}</span>
                          </div>
                        </div>
                        {webinar.recording ? (
                          <Link href="/contato">
                            <Button variant="outline" className="w-full">
                              <Play className="w-4 h-4 mr-2" />
                              Assistir Gravação
                            </Button>
                          </Link>
                        ) : (
                          <Link href="/contato">
                            <Button className="w-full bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground">
                              Inscrever-se Grátis
                            </Button>
                          </Link>
                        )}
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
              Quer Sugerir um <span className="text-gradient">Tema</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Entre em contato e sugira temas para nossos próximos webinars
            </p>
            <Link href="/contato">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg"
              >
                Sugerir Tema
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

