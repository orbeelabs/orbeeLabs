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
import { ChevronDown, Check, Share2, TrendingUp, Users, Heart, MessageCircle } from 'lucide-react';

export default function GestaoRedesSociaisPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
    { name: "Gestão de Redes Sociais", url: "https://orbeelabs.com/servicos/gestao-redes-sociais" },
  ];

  usePageTitle("Gestão de Redes Sociais: Construa Sua Presença Digital e Engaje Seu Público | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const services = [
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Criação de Conteúdo',
      description: 'Conteúdo relevante, visualmente atraente e alinhado com sua marca. Posts que engajam e convertem.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Estratégia de Crescimento',
      description: 'Planejamento estratégico para crescer seguidores qualificados e aumentar engajamento.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Gestão de Comunidade',
      description: 'Respostas rápidas, engajamento ativo e construção de relacionamento com seu público.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Análise de Performance',
      description: 'Relatórios mensais com métricas de alcance, engajamento, crescimento e ROI.'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Anúncios Pagos',
      description: 'Gestão de campanhas pagas no Facebook, Instagram e LinkedIn para máximo ROI.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Análise e Planejamento',
      description: 'Analisamos seu público, concorrência e objetivos. Criamos estratégia personalizada para cada rede.'
    },
    {
      step: '02',
      title: 'Criação de Conteúdo',
      description: 'Desenvolvemos calendário editorial e criamos conteúdo visual e escrito que engaja seu público.'
    },
    {
      step: '03',
      title: 'Publicação e Engajamento',
      description: 'Publicamos conteúdo regularmente e interagimos com seu público de forma autêntica.'
    },
    {
      step: '04',
      title: 'Monitoramento e Otimização',
      description: 'Analisamos performance, identificamos o que funciona e otimizamos continuamente.'
    }
  ];

  const included = [
    'Gestão completa de Instagram, Facebook e LinkedIn',
    'Criação de conteúdo visual e escrito',
    'Calendário editorial mensal',
    'Publicação diária (conforme plano)',
    'Gestão de comentários e mensagens',
    'Estratégia de hashtags',
    'Análise de concorrência',
    'Relatórios mensais de performance',
    'Sugestões de melhorias baseadas em dados',
    'Suporte estratégico contínuo'
  ];

  const results = [
    {
      metric: 'Crescimento',
      description: '+50-100% de seguidores qualificados em 6 meses.'
    },
    {
      metric: 'Engajamento',
      description: 'Taxa de engajamento 3-5x acima da média da indústria.'
    },
    {
      metric: 'Alcance',
      description: 'Alcance orgânico aumentado através de conteúdo estratégico.'
    },
    {
      metric: 'Conversão',
      description: 'Tráfego qualificado para site e leads gerados via redes sociais.'
    }
  ];

  const faqs = [
    {
      question: 'Quais redes sociais vocês gerenciam?',
      answer: 'Gerenciamos principalmente Instagram, Facebook e LinkedIn. Também podemos trabalhar com Twitter, TikTok e outras redes conforme necessidade e estratégia.'
    },
    {
      question: 'Quantos posts por semana?',
      answer: 'Depende da estratégia e do plano. Geralmente trabalhamos com 3-5 posts por semana no Instagram, 2-3 no Facebook e 2-3 no LinkedIn. A frequência é ajustada conforme resultados e objetivos.'
    },
    {
      question: 'Vocês criam todo o conteúdo?',
      answer: 'Sim! Criamos conteúdo visual (designs, imagens) e escrito (legendas, copy). Você pode fornecer materiais (fotos, vídeos) que incorporamos na estratégia.'
    },
    {
      question: 'Como vocês medem o sucesso?',
      answer: 'Métricas principais: crescimento de seguidores, taxa de engajamento, alcance, cliques para site, leads gerados. Tudo em relatórios mensais transparentes.'
    },
    {
      question: 'Vocês fazem anúncios pagos também?',
      answer: 'Sim! Oferecemos gestão de campanhas pagas no Facebook Ads, Instagram Ads e LinkedIn Ads como parte do serviço ou como serviço standalone.'
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
                Gestão de <span className="text-gradient">Redes Sociais</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Construa sua presença digital, engaje seu público e gere resultados através de conteúdo estratégico
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
                Pronto para <span className="text-gradient">Crescer nas Redes</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Vamos construir sua presença digital e engajar seu público com conteúdo estratégico.
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

