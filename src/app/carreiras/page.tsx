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
import { Briefcase, Users, Heart, Zap, Check, Mail } from 'lucide-react';

export default function CarreirasPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Carreiras", url: "https://orbeelabs.com/carreiras" },
  ];

  usePageTitle("Carreiras: Junte-se à Orbee Labs e Transforme o Marketing Digital | Orbee Labs");

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Trabalho Remoto',
      description: 'Flexibilidade total para trabalhar de onde quiser'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Plano de Saúde',
      description: 'Cobertura completa para você e sua família'
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Desenvolvimento Profissional',
      description: 'Orçamento para cursos, certificações e eventos'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Cultura Colaborativa',
      description: 'Ambiente de trabalho descontraído e inovador'
    }
  ];

  const openPositions = [
    {
      title: 'Desenvolvedor Fullstack',
      department: 'Tecnologia',
      type: 'Tempo Integral',
      location: 'Remoto',
      description: 'Buscamos desenvolvedor experiente em React, Next.js e Python para trabalhar em projetos de alta performance.'
    },
    {
      title: 'Especialista em SEO',
      department: 'Marketing',
      type: 'Tempo Integral',
      location: 'Remoto',
      description: 'Procuramos profissional com experiência em SEO técnico e estratégico para liderar projetos de otimização.'
    },
    {
      title: 'Designer UX/UI',
      department: 'Design',
      type: 'Tempo Integral',
      location: 'Remoto',
      description: 'Buscamos designer criativo com foco em experiência do usuário e interfaces modernas.'
    },
    {
      title: 'Analista de Marketing Digital',
      department: 'Marketing',
      type: 'Tempo Integral',
      location: 'Remoto',
      description: 'Procuramos analista para trabalhar com analytics, campanhas e otimização de performance.'
    }
  ];

  const values = [
    'Transparência em tudo que fazemos',
    'Foco em resultados mensuráveis',
    'Aprendizado contínuo e crescimento',
    'Trabalho em equipe e colaboração',
    'Inovação e criatividade',
    'Respeito e diversidade'
  ];

  return (
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
              Junte-se à <span className="text-gradient">Orbee Labs</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Trabalhe em projetos desafiadores, com tecnologia de ponta e uma equipe apaixonada por resultados
            </p>
            <Link href="#vagas">
              <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground">
                Ver Vagas Abertas
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Por Que <span className="text-gradient">Trabalhar Conosco</span>
            </h2>
          </motion.div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <StaggerItem key={index}>
                  <div className="glass glass-hover p-6 rounded-xl text-center">
                    <div className="text-primary mb-4 flex justify-center">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Values Section */}
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
              Nossos <span className="text-gradient">Valores</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 glass glass-hover p-4 rounded-lg"
              >
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-300">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="vagas" className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Vagas <span className="text-gradient">Abertas</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Estamos sempre em busca de talentos para fazer parte do nosso time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass glass-hover h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-2xl text-white">{position.title}</CardTitle>
                    </div>
                    <CardDescription className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">{position.department}</span>
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">{position.type}</span>
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">{position.location}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{position.description}</p>
                    <Link href="/contato">
                      <Button variant="outline" className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Candidatar-se
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-300 mb-4">
              Não encontrou a vaga ideal? Envie seu currículo mesmo assim!
            </p>
            <Link href="/contato">
              <Button size="lg" variant="outline">
                Enviar Currículo Espontâneo
              </Button>
            </Link>
          </motion.div>
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
              Pronto para <span className="text-gradient">Fazer Parte do Time</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Estamos sempre em busca de pessoas talentosas e apaixonadas por marketing digital e tecnologia
            </p>
            <Link href="/contato">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg"
              >
                Entre em Contato
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

