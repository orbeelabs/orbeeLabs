'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function SobrePage() {
  const team = [
    {
      name: 'Diana Camila',
      role: 'CEO & Desenvolvedora Fullstack',
      description:
        'Especialista em desenvolvimento Fullstack com React, Next.js, Python e metodologias ágeis. Criadora da metodologia "SEO Cabuloso" que integra tecnologia e marketing.',
      image: '/assets/team/diana.jpg',
      linkedin: 'https://linkedin.com/in/dianacamila',
      specialties: ['React/Next.js', 'Python', 'SEO Técnico', 'TDD'],
    },
    {
      name: 'Izabela Fissicaro',
      role: 'Co-fundadora & Head of Design',
      description:
        'Especialista em design estratégico, UX/UI e identidade visual. Responsável por criar experiências digitais que conectam marcas aos seus públicos de forma autêntica.',
      image: '/assets/team/izabela.jpg',
      linkedin: 'https://linkedin.com/in/izabelafissicaro',
      specialties: ['UX/UI Design', 'Branding', 'Design Systems', 'CRO'],
    }
  ];

  const values = [
    {
      title: 'Excelência Data-Driven',
      description:
        'Todas as nossas decisões são embasadas em dados, garantindo a máxima eficácia e otimização. Não apostamos; analisamos e validamos.',
      icon: '📊',
    },
    {
      title: 'Inovação e Vanguarda',
      description:
        'Estamos sempre à frente, explorando novas tecnologias como IA em marketing e SEO para oferecer as melhores soluções.',
      icon: '🚀',
    },
    {
      title: 'Transparência e Confiança',
      description:
        'Construímos relacionamentos duradouros com base na honestidade, clareza na comunicação e integridade em todas as ações.',
      icon: '🔍',
    },
    {
      title: 'Resultados Tangíveis',
      description:
        'Nosso foco é a entrega de ROI real e mensurável para nossos clientes, transformando investimentos em crescimento.',
      icon: '📈',
    },
    {
      title: 'Paixão por Aprender',
      description:
        'Valorizamos o conhecimento contínuo e a troca de experiências, tanto internamente quanto com nossa comunidade.',
      icon: '📚',
    },
    {
      title: 'Humanização da Tecnologia',
      description:
        'Acreditamos que a tecnologia deve servir ao propósito humano, tornando as interações mais significativas e eficientes.',
      icon: '🤝',
    },
  ];

  const stats = [
    { value: '150+', label: 'Projetos Entregues' },
    { value: '95%', label: 'Taxa de Sucesso' },
    { value: '8', label: 'Anos de Experiência' },
    { value: '50+', label: 'Clientes Satisfeitos' },
  ];

  return (
    <>
      <Navigation />

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
              Por Trás da <span className="text-gradient">Orbee Labs</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Nossa Paixão por Tecnologia e Marketing
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Somos Diana Camila e Izabela Fissicaro, a força motriz por trás da Orbee Labs. 
              Com anos de experiência em desenvolvimento Fullstack, SEO de alta performance e design estratégico, 
              unimos nossas paixões para construir soluções digitais que realmente funcionam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg text-white mb-6">
                Nossa <span className="text-gradient">Missão</span>
              </h2>
              <p className="text-body mb-8">
                Capacitar empresas e profissionais a alcançar o domínio digital através da fusão de 
                estratégias de marketing digital de ponta e soluções tecnológicas robustas, 
                gerando resultados mensuráveis e sustentáveis.
              </p>
              <p className="text-body">
                Ser a agência de referência no Brasil para o marketing digital de alta performance 
                e desenvolvimento web Fullstack, reconhecida pela entrega de resultados excepcionais, 
                inovação contínua e a humanização da tecnologia.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass glass-hover rounded-2xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
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
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-white mb-6">
              Nossos <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Estes são os princípios que guiam todas as nossas decisões
              e definem como trabalhamos com nossos clientes e parceiros.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-8"
              >
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-white mb-6">
              Nossa <span className="text-gradient">Equipe</span>
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Conheça os especialistas que tornam possível a transformação
              digital dos nossos clientes através de estratégias inovadoras.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-8 text-center group"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center text-3xl text-primary-foreground font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                
                <p className="text-primary font-semibold mb-4">
                  {member.role}
                </p>
                
                <p className="text-gray-300 text-sm mb-6">
                  {member.description}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  💼
                </a>
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
            <h2 className="heading-lg text-white mb-6">
              Pronto para <span className="text-gradient">Começar</span>?
            </h2>
            <p className="text-body max-w-3xl mx-auto mb-8">
              Quer saber mais sobre como podemos ajudar seu negócio a crescer?
              Entre em contato conosco e vamos construir algo incrível juntos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Fale Conosco
              </Link>
              <Link
                href="/servicos"
                className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Ver Nossos Serviços
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
