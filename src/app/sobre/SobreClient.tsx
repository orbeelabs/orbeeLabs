'use client';


import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layout';

export default function SobreClient() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Sobre", url: "https://orbeelabs.com/sobre" },
  ];


  const team = [
    {
      name: 'Diana Caldeira',
      role: 'HEAD OF TECHNOLOGY & INNOVATION',
      description:
        'Como a mente idealizadora e arquiteta por trás do método proprietário SEO-VX, Diana Caldeira personifica o DNA da Orbee Labs: a fusão entre estratégia de negócio e excelência tecnológica. Com mais de 18 anos de experiência, Diana une sua expertise em vendas e negócios com um profundo domínio em desenvolvimento Full-Stack e Inteligência Artificial. Já desenvolveu mais de 10 aplicativos e 15 sites, e formou centenas de profissionais em mais de 28 cursos que ministrou. Sua visão é o que transforma os desafios dos nossos clientes em resultados extraordinários.',
      image: '/images/team/Diana.webp',
      linkedin: 'Em breve',
      specialties: ['Full-Stack', 'Inteligência Artificial', 'SEO-VX', 'Desenvolvimento', 'Negócios'],
    },
    {
      name: 'Izabela Fissicaro',
      role: 'HEAD OF CREATIVE & BRAND STRATEGY',
      description:
        'A alma criativa da Orbee Labs, responsável por transformar marcas em experiências visuais memoráveis. Com formação em Design e Fotografia, Izabela traz um olhar sofisticado e detalhista, refinado em sua experiência no mercado de alto padrão. Ela lidera a criação de identidades visuais, estratégias de social media e toda a direção de arte da empresa. Sua missão é garantir que a essência de cada cliente seja traduzida em um design que não apenas impressiona, mas também conecta e perdura.',
      image: '/images/team/Iza.webp',
      linkedin: 'Em breve',
      specialties: ['Design', 'Fotografia', 'Branding', 'Social Media', 'Direção de Arte'],
    },
    {
      name: 'Gabi Cipriano',
      role: 'HEAD OF TECHNICAL STRATEGY & BUSINESS',
      description:
        'A ponte estratégica entre nossa tecnologia de ponta e o sucesso dos nossos clientes. Ela combina excelência técnica, validada por instituições como Harvard e IBM Berlin, com uma rara visão de negócios focada em inovação. É especialista em IA e Web3, com expertise sólida em blockchain e implementação de soluções tecnológicas corporativas. Lidera nossa frente comercial e de relacionamento, traduzindo as necessidades dos clientes em soluções inovadoras e garantindo parcerias de sucesso e confiança.',
      image: '/images/team/Gabi.webp',
      linkedin: 'Em breve',
      specialties: ['IA', 'Web3', 'Blockchain', 'Estratégia Técnica', 'Business'],
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Resultados Mensuráveis',
      description: 'Focamos em métricas claras e ROI comprovado. Cada estratégia é medida e otimizada para garantir o máximo retorno sobre investimento.'
    },
    {
      icon: '🚀',
      title: 'Inovação Tecnológica',
      description: 'Utilizamos as tecnologias mais modernas e metodologias ágeis para entregar soluções robustas e escaláveis.'
    },
    {
      icon: '🤝',
      title: 'Parceria Estratégica',
      description: 'Não somos apenas fornecedores, somos parceiros estratégicos comprometidos com o crescimento sustentável do seu negócio.'
    },
    {
      icon: '📊',
      title: 'Transparência Total',
      description: 'Relatórios detalhados, métricas transparentes e comunicação clara em todas as etapas do processo.'
    }
  ];

  const methodology = [
    {
      step: '01',
      title: 'Análise Profunda',
      description: 'Auditoria completa do seu negócio, concorrência e mercado para identificar oportunidades únicas.'
    },
    {
      step: '02',
      title: 'Estratégia Personalizada',
      description: 'Desenvolvimento de estratégias customizadas baseadas nos objetivos específicos do seu negócio.'
    },
    {
      step: '03',
      title: 'Implementação Ágil',
      description: 'Execução rápida e eficiente usando metodologias ágeis e tecnologias de ponta.'
    },
    {
      step: '04',
      title: 'Otimização Contínua',
      description: 'Monitoramento constante e ajustes estratégicos para maximizar resultados e ROI.'
    }
  ];

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
                Sobre a <span className="text-gradient">Orbee Labs</span>
              </h1>
              <p className="text-body max-w-4xl mx-auto">
                Somos uma agência de marketing digital e desenvolvimento web especializada em transformar 
                negócios através de estratégias data-driven e tecnologia de ponta. Nossa metodologia 
                proprietária &quot;SEO-VX&quot; combina análise técnica avançada com estratégias de conteúdo 
                para garantir resultados mensuráveis e crescimento sustentável.
              </p>
            </motion.div>
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
                Especialistas apaixonados por tecnologia e marketing digital, unidos pela missão de 
                transformar negócios através de estratégias inovadoras e resultados comprovados.
              </p>
            </motion.div>

            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-8"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary/20">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-primary font-semibold mb-4">{member.role}</p>
                      <p className="text-gray-300 mb-4 leading-relaxed">{member.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                        {member.specialties.map((specialty, idx) => (
                          <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        {member.linkedin !== 'Em breve' ? (
                          <Link
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 font-semibold transition-colors"
                          >
                            LinkedIn →
                          </Link>
                        ) : (
                          <span className="text-gray-400 font-semibold">
                            LinkedIn em breve
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                Os princípios que guiam nosso trabalho e definem nossa abordagem única 
                para transformar negócios através do marketing digital e tecnologia.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-6 text-center"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
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
                Nossa <span className="text-gradient">Metodologia</span>
              </h2>
              <p className="text-body max-w-3xl mx-auto">
                Um processo estruturado e comprovado que garante resultados consistentes 
                e crescimento sustentável para nossos clientes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodology.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mr-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-300">{step.description}</p>
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
                Pronto para trabalhar <span className="text-gradient">conosco</span>?
              </h2>
              <p className="text-body max-w-3xl mx-auto mb-8">
                Descubra como nossa equipe de especialistas pode transformar seu negócio 
                através de estratégias inovadoras e resultados comprovados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground font-semibold py-4 px-8 rounded-full text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Agendar Consultoria Gratuita
                </Link>
                <Link
                  href="/servicos"
                  className="border-2 border-primary text-primary font-semibold py-4 px-8 rounded-full text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Conhecer Nossos Serviços
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
    </PageLayout>
  );
}