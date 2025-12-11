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
import { ChevronDown, Check, Lightbulb, Target, TrendingUp, Users, BarChart3 } from 'lucide-react';

export default function ConsultoriaMarketingDigitalPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
    { name: "Consultoria em Marketing Digital", url: "https://orbeelabs.com/servicos/consultoria-marketing-digital" },
  ];

  usePageTitle("Consultoria em Marketing Digital: Estratégia e Planejamento para Crescimento | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const services = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Estratégia Personalizada',
      description: 'Desenvolvemos estratégia completa de marketing digital alinhada com seus objetivos de negócio.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Planejamento Executável',
      description: 'Criamos planos de ação detalhados com prazos, responsabilidades e métricas de sucesso.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Análise de Mercado',
      description: 'Analisamos concorrência, oportunidades e ameaças para posicionar sua marca estrategicamente.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Definição de Público',
      description: 'Criamos personas detalhadas e mapeamos jornada do cliente para estratégias mais eficazes.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Métricas e KPIs',
      description: 'Definimos métricas relevantes e criamos sistema de acompanhamento para medir resultados.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Diagnóstico Completo',
      description: 'Analisamos situação atual, mercado, concorrência e oportunidades. Identificamos gaps e pontos fortes.'
    },
    {
      step: '02',
      title: 'Estratégia e Planejamento',
      description: 'Desenvolvemos estratégia personalizada com objetivos claros, táticas e cronograma de execução.'
    },
    {
      step: '03',
      title: 'Apresentação e Alinhamento',
      description: 'Apresentamos estratégia, alinhamos expectativas e ajustamos conforme feedback.'
    },
    {
      step: '04',
      title: 'Acompanhamento e Ajustes',
      description: 'Acompanhamos execução, medimos resultados e ajustamos estratégia conforme necessário.'
    }
  ];

  const included = [
    'Auditoria completa de marketing digital',
    'Análise de mercado e concorrência',
    'Definição de personas e jornada do cliente',
    'Estratégia personalizada de marketing',
    'Plano de ação detalhado (90 dias)',
    'Definição de métricas e KPIs',
    'Roadmap de implementação',
    'Reuniões de acompanhamento mensais',
    'Ajustes estratégicos conforme resultados',
    'Documentação completa da estratégia'
  ];

  const results = [
    {
      metric: 'Clareza',
      description: 'Direção clara sobre onde investir em marketing digital.'
    },
    {
      metric: 'Eficiência',
      description: 'Eliminação de desperdícios e foco no que realmente funciona.'
    },
    {
      metric: 'Crescimento',
      description: 'Plano de crescimento sustentável e escalável.'
    },
    {
      metric: 'ROI',
      description: 'Aumento de ROI através de estratégias baseadas em dados.'
    }
  ];

  const faqs = [
    {
      question: 'Consultoria é diferente de execução?',
      answer: 'Sim! Consultoria foca em estratégia, planejamento e orientação. Execução é a implementação prática. Oferecemos ambos - você pode contratar apenas consultoria, apenas execução, ou ambos.'
    },
    {
      question: 'Quanto tempo dura uma consultoria?',
      answer: 'Depende do escopo. Consultoria pontual (estratégia inicial) leva 2-4 semanas. Consultoria contínua (acompanhamento mensal) pode durar 3-12 meses conforme necessidade.'
    },
    {
      question: 'Vocês entregam documentos?',
      answer: 'Sim! Entregamos documento completo com estratégia, plano de ação, métricas, roadmap e recomendações. Tudo documentado para você implementar.'
    },
    {
      question: 'Posso implementar sozinho após a consultoria?',
      answer: 'Sim! Nossa consultoria inclui plano de ação detalhado que você pode implementar internamente. Também oferecemos suporte na implementação se preferir.'
    },
    {
      question: 'Consultoria inclui execução?',
      answer: 'Consultoria focada em estratégia e planejamento. Execução é serviço separado. Mas podemos fazer ambos - estratégia + execução para resultados completos.'
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
                Consultoria em <span className="text-gradient">Marketing Digital</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Estratégia, planejamento e orientação para crescer com marketing digital
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground">
                    Agendar Consultoria
                  </Button>
                </Link>
                <Link href="/calculadora-roi">
                  <Button size="lg" variant="outline">
                    Calcular ROI
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
                Pronto para <span className="text-gradient">Definir Sua Estratégia</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Vamos criar um plano de marketing digital personalizado para seu negócio crescer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg"
                  >
                    Agendar Consultoria
                  </Button>
                </Link>
                <Link href="/calculadora-roi">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg"
                  >
                    Calcular ROI
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

