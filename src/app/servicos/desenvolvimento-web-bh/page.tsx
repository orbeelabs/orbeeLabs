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
import { ChevronDown, Check } from 'lucide-react';

export default function DesenvolvimentoWebPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Serviços", url: "https://orbeelabs.com/servicos" },
    { name: "Desenvolvimento Web BH", url: "https://orbeelabs.com/servicos/desenvolvimento-web-bh" },
  ];

  usePageTitle("Sites Rápidos Que Ranqueiam: Next.js, React, Performance 98 | Orbee Labs");

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const included = [
    'Design responsivo',
    'Performance 98+ garantido',
    'SEO técnico desde o código',
    'HTTPS (segurança)',
    'Otimização de imagens',
    'Testes automatizados',
    'Deploy automático',
    'Monitoramento 24/7',
    'Suporte 3 meses pós-lançamento'
  ];

  const metrics = [
    {
      metric: 'Carregamento',
      before: '2.5s',
      after: '0.7s'
    },
    {
      metric: 'Google Score',
      before: '65',
      after: '98'
    },
    {
      metric: 'Uptime',
      before: '97%',
      after: '99.99%'
    }
  ];

  const stack = [
    {
      title: 'Next.js 15',
      description: 'Framework moderno que Netflix, Airbnb, Uber usam',
      features: [
        'Carregamento instantâneo',
        'SEO integrado automaticamente'
      ]
    },
    {
      title: 'React 19',
      description: 'Biblioteca que torna desenvolvimento eficiente',
      features: [
        'Performance otimizada',
        'Componentes reutilizáveis'
      ]
    },
    {
      title: 'TypeScript',
      description: 'Previne bugs antes de acontecer',
      features: [
        'Código mais seguro'
      ]
    },
    {
      title: 'Backend',
      description: 'Python + FastAPI OU Node.js + Express',
      features: [
        'Aguenta 1.000+ pessoas no site ao mesmo tempo',
        'Integração com IA (chatbot, recomendações)',
        'Segurança contra hackers',
        'Crescimento exponencial sem quebra'
      ]
    },
    {
      title: 'TDD (Test-Driven Development)',
      description: 'Antes de escrever código novo, escrevemos testes',
      features: [
        'Bugs são pegos ANTES de ir para produção',
        '80%+ do código testado',
        'Site que funciona sempre (99.99% uptime)'
      ]
    }
  ];

  const process = [
    {
      phase: 'Semana 1-2',
      title: 'Planejamento',
      description: 'Entendemos o que você quer'
    },
    {
      phase: 'Semana 3-8',
      title: 'Desenvolvimento',
      description: 'Construímos, testamos'
    },
    {
      phase: 'Semana 9',
      title: 'Testes finais',
      description: 'Garantimos que tudo funciona'
    },
    {
      phase: 'Semana 10',
      title: 'Lançamento',
      description: 'Zero downtime'
    },
    {
      phase: 'Depois',
      title: 'Suporte e manutenção',
      description: 'Contínuo'
    }
  ];

  const faqs = [
    {
      question: 'Quanto tempo leva?',
      answer: 'Depende. Site simples (5-10 páginas): 4-6 semanas. Site médio (20-30): 8-10 semanas. Site complexo (50+): 12-16 semanas.'
    },
    {
      question: 'Posso migrar meu site antigo sem perder ranking?',
      answer: 'Sim. Fazemos migração zero-downtime. Mantemos: Mesmas URLs, Mesmo conteúdo, Mesmos links. Google entende: "Mudou só a tecnologia".'
    },
    {
      question: 'Vocês integram com [meu software]?',
      answer: 'Provavelmente. Integramos com: Salesforce, Pipedrive, HubSpot, Shopify, Stripe, Mailchimp, etc.'
    },
    {
      question: 'E depois? Preciso refazer do zero em 2 anos?',
      answer: 'Não. Site dura anos. Oferecemos planos de manutenção (R$ 500-2.000/mês) para alterações e otimizações.'
    }
  ];

  return (
    <>
      <FAQStructuredData faqs={faqs} />
      <PageLayout breadcrumbItems={breadcrumbItems}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background via-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Sites Rápidos Que Ranqueiam:{' '}
                <span className="text-gradient">Next.js, React, Performance 98</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Você precisa de um site bonito, rápido e que ranqueia. Não escolha. Tenha os três. 
                Veja os cases reais no portfólio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Solicitar Orçamento de Desenvolvimento
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    📞 Agendar Consultoria Técnica
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass glass-hover rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                O Problema <span className="text-gradient">(Que Você Conhece Bem)</span>
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>Seu site é:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Lindo? ✅ (talvez)</li>
                  <li>Rápido? ❌ (provavelmente não)</li>
                  <li>Ranqueia no Google? ❌ (quase nunca)</li>
                </ul>
                <p className="text-primary font-semibold text-xl mt-4">
                  Resultado: Site bonito que ninguém encontra.
                </p>
                <p>
                  Enquanto isso, concorrente com site &quot;feio&quot; mas rápido e otimizado ranqueia melhor.
                </p>
                <p className="mt-4">
                  <strong className="text-white">O problema:</strong> Maioria das agências web entrega &quot;design&quot; bonito. 
                  Esquecem de performance e SEO.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Speed Matters */}
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
                Por Que Velocidade <span className="text-gradient">Importa</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">Fato 1: Google favorece sites rápidos</h3>
                <p className="text-gray-300 leading-relaxed">
                  Site que carrega em 0.7 segundos ranqueia melhor que site que carrega em 3 segundos.
                </p>
                <p className="text-primary font-semibold mt-4">Fim de discussão.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">Fato 2: Usuários abandonam sites lentos</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• 1 segundo de delay = 7% menos vendas</li>
                  <li>• 3 segundos de delay = 40% menos vendas</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  Se seu site demora 3 segundos, você perde 40% dos clientes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">Fato 3: 70% do tráfego é mobile</h3>
                <p className="text-gray-300 leading-relaxed">
                  Seu site precisa ser rápido em celular (conexão 4G, não WiFi).
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stack Section */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Nossa Stack <span className="text-gradient">Tecnológica</span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {stack.map((tech, index) => (
                <motion.div
                  key={tech.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{tech.title}</h3>
                  <p className="text-gray-300 mb-4">{tech.description}</p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-300">
                    {tech.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 glass glass-hover rounded-2xl p-8 text-center"
            >
              <p className="text-xl text-gray-300 mb-2">
                <strong className="text-white">Resultado:</strong> Site carrega em <span className="text-primary font-bold">0.6-0.8 segundos</span>.
              </p>
              <p className="text-gray-300">
                Seu concorrente com WordPress básico demora 2-3 segundos.
              </p>
              <p className="text-primary font-semibold text-xl mt-4">Você vence.</p>
            </motion.div>
          </div>
        </section>

        {/* Metrics Section */}
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
                Métricas de <span className="text-gradient">Performance</span>
              </h2>
            </motion.div>

            <div className="overflow-x-auto mb-8">
              <table className="w-full glass glass-hover rounded-2xl overflow-hidden">
                <thead className="bg-primary/20">
                  <tr>
                    <th className="p-4 text-left text-white font-bold">Métrica</th>
                    <th className="p-4 text-center text-white font-bold">Seu Site Antigo</th>
                    <th className="p-4 text-center text-primary font-bold">Nosso Novo Site</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric, index) => (
                    <tr key={metric.metric} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                      <td className="p-4 text-white font-semibold">{metric.metric}</td>
                      <td className="p-4 text-center text-gray-300">{metric.before}</td>
                      <td className="p-4 text-center text-primary font-bold">{metric.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass glass-hover rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Em números de negócio:</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Se seu site recebe 1.000 visitas/dia com 2% conversão = 20 vendas/dia.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Com nosso site (menos bounce + mais tempo na página): 26-28 vendas/dia.
              </p>
              <p className="text-primary font-bold text-xl">
                Diferença: +6-8 vendas/dia = +180-240 vendas/mês.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Como <span className="text-gradient">Funciona</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {process.map((step, index) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-6 text-center"
                >
                  <div className="text-primary font-semibold text-sm mb-2">{step.phase}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Included Section */}
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
                O Que Está <span className="text-gradient">Incluído</span>
              </h2>
            </motion.div>

            <StaggerContainer staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {included.map((item, index) => (
                  <StaggerItem key={item}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="glass glass-hover rounded-xl p-6 flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed">{item}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
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
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
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
                Pronto para um Site que <span className="text-gradient">Ranqueia</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Solicite um orçamento personalizado e descubra como podemos criar um site rápido, 
                bonito e otimizado para o Google.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contato">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    🎯 Solicitar Orçamento
                  </Button>
                </Link>
                <Link href="/servicos/seo-bh">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Quer SEO junto?
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  Ver portfolio →
                </Link>
                <Link href="/sobre" className="hover:text-primary transition-colors">
                  Sobre minha stack →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}

