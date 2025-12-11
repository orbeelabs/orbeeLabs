'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';
import { usePageTitle } from '@/hooks/core';
import { Button } from '@/components/ui/button';
import { Handshake, TrendingUp, Users, Award, Check, Mail } from 'lucide-react';

export default function ParceirosPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Parceiros", url: "https://orbeelabs.com/parceiros" },
  ];

  usePageTitle("Programa de Parcerias: Cresça Juntos com a Orbee Labs | Orbee Labs");

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Comissões Competitivas',
      description: 'Ganhe comissões atrativas por cada cliente indicado que fechar contrato'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Suporte Dedicado',
      description: 'Equipe especializada para apoiar você e seus clientes em todo o processo'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Material de Vendas',
      description: 'Acesso a apresentações, cases, materiais e tudo que precisa para vender'
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: 'Parceria de Longo Prazo',
      description: 'Construímos relacionamentos duradouros baseados em confiança e resultados'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Cadastro',
      description: 'Preencha o formulário e envie sua solicitação de parceria'
    },
    {
      step: '02',
      title: 'Aprovação',
      description: 'Analisamos seu perfil e entramos em contato para alinhar expectativas'
    },
    {
      step: '03',
      title: 'Acesso ao Material',
      description: 'Você recebe acesso a materiais de venda, cases e suporte'
    },
    {
      step: '04',
      title: 'Indicação e Comissão',
      description: 'Indique clientes e ganhe comissões quando fecharem contrato'
    }
  ];

  const requirements = [
    'Conhecimento básico em marketing digital',
    'Rede de contatos em seu nicho',
    'Comprometimento com relacionamento de longo prazo',
    'Transparência e ética profissional'
  ];

  const faqs = [
    {
      question: 'Como funciona o pagamento de comissões?',
      answer: 'Comissões são pagas após o cliente fechar contrato e realizar o primeiro pagamento. O valor varia conforme o tipo de serviço e volume de indicações.'
    },
    {
      question: 'Preciso ter conhecimento técnico?',
      answer: 'Não é necessário conhecimento técnico profundo, mas é importante ter familiaridade com marketing digital e entender as necessidades dos seus clientes.'
    },
    {
      question: 'Posso ser parceiro de outras empresas também?',
      answer: 'Sim, desde que não haja conflito de interesses. Valorizamos parcerias exclusivas em nichos específicos, mas entendemos que cada caso é único.'
    },
    {
      question: 'Como vocês apoiam os parceiros?',
      answer: 'Fornecemos material de vendas, treinamento, suporte na apresentação de propostas e acompanhamento pós-venda para garantir satisfação do cliente.'
    }
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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
              Programa de <span className="text-gradient">Parcerias</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Cresça junto conosco. Indique clientes e ganhe comissões enquanto ajudamos empresas a alcançar resultados
            </p>
            <Link href="#cadastro">
              <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground">
                Quero Ser Parceiro
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
              Benefícios para <span className="text-gradient">Parceiros</span>
            </h2>
          </motion.div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <StaggerItem key={index}>
                  <div className="glass glass-hover p-6 rounded-xl">
                    <div className="text-primary mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works Section */}
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
              Como <span className="text-gradient">Funciona</span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {howItWorks.map((item, index) => (
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

      {/* Requirements Section */}
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
              Perfil <span className="text-gradient">Ideal</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 glass glass-hover p-4 rounded-lg"
              >
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-300">{req}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
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
                  <span className={`text-primary transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
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

      {/* CTA Section */}
      <section id="cadastro" className="py-20 bg-gradient-to-r from-primary/20 to-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para <span className="text-gradient">Ser Nosso Parceiro</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Preencha o formulário abaixo e vamos conversar sobre como podemos crescer juntos
            </p>
            <Link href="/contato">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Solicitar Parceria
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

