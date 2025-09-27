'use client';

import Button from '@/components/Button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FadeInUp from '@/components/animations/FadeInUp';
import AnimatedCard from '@/components/animations/AnimatedCard';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';
import ParticleField from '@/components/animations/ParticleField';
import ScrollIndicator from '@/components/animations/ScrollIndicator';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-background">
          <ParticleField />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="heading-xl text-white mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Orbee Labs: Domine o{' '}
                <span className="text-gradient">Digital</span>
              </motion.h1>
              
              <motion.h2
                className="text-2xl md:text-3xl font-semibold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Marketing Estratégico e Tecnologia Fullstack para Resultados Reais
              </motion.h2>
              
              <motion.p
                className="text-body max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transformamos sua presença online em uma máquina de crescimento, do código à conversão. 
                Aplicamos nossa metodologia &quot;SEO Cabuloso&quot; para garantir que seu negócio não apenas apareça, mas domine os resultados de busca.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Fale com um Especialista
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Veja Nossos Cases
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gradient-to-br from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-16">
                <h2 className="heading-lg text-white mb-6">
                  Nossos <span className="text-gradient">Serviços</span>
                </h2>
                <p className="text-body max-w-3xl mx-auto">
                  Oferecemos soluções completas em marketing digital e desenvolvimento web, com foco em resultados mensuráveis e crescimento sustentável.
                </p>
              </div>
            </FadeInUp>

            <StaggerContainer staggerDelay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: '🔍',
                    title: 'SEO Cabuloso',
                    description: 'Nossa metodologia proprietária que combina SEO técnico, estratégia de conteúdo e link building para dominar os resultados orgânicos',
                    metrics: ['+400%', 'tráfego orgânico'],
                  },
                  {
                    icon: '💻',
                    title: 'Desenvolvimento Fullstack',
                    description: 'Soluções tecnológicas robustas com React, Next.js, Python e IA. Sites que são máquinas de conversão',
                    metrics: ['+98%', 'score performance'],
                  },
                  {
                    icon: '📊',
                    title: 'Marketing Alta Performance',
                    description: 'Estratégias data-driven para Líderes Digitais Ambiciosos com foco em ROI mensurável',
                    metrics: ['5x', 'ROI médio clientes'],
                  },
                ].map((service, index) => (
                  <StaggerItem key={service.title}>
                    <AnimatedCard delay={index * 0.2}>
                      <div className="glass glass-hover rounded-2xl p-8 text-center">
                        <div className="text-6xl mb-6">{service.icon}</div>
                        <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                        <p className="text-gray-300 mb-6">{service.description}</p>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-3xl font-bold text-primary">{service.metrics[0]}</span>
                          <span className="text-gray-400">{service.metrics[1]}</span>
                        </div>
                      </div>
                    </AnimatedCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonials Section */}
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
                O que nossos <span className="text-gradient">Clientes</span> dizem
              </h2>
              <p className="text-body max-w-3xl mx-auto">
                Veja como nossa metodologia única tem transformado negócios e gerado
                resultados excepcionais para nossos parceiros.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Dr. Bruna Vilela',
                  company: 'Clínica Médica Especializada',
                  text: 'A Orbee Labs transformou nossa presença digital completamente. Com o "SEO Cabuloso", nossa clínica agora domina os resultados de busca e nossos agendamentos aumentaram 400%.',
                },
                {
                  name: 'Carlos Mendes',
                  company: 'CEO - Tech Solutions B2B',
                  text: 'Finalmente encontramos uma agência que fala nossa língua! Eles entendem profundamente tanto a parte técnica quanto a estratégica. Os resultados são mensuráveis e consistentes.',
                },
                {
                  name: 'Isabela Rocha',
                  company: 'Fundadora - EduTech Startup',
                  text: 'A metodologia da Orbee Labs é impressionante. Integraram nossa stack tecnológica com estratégias de marketing que realmente funcionam. ROI de 500% em 8 meses!',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass glass-hover rounded-2xl p-8"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">&quot;{testimonial.text}&quot;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/20 to-yellow-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInUp>
              <h2 className="heading-lg text-white mb-6">Pronto para <span className="text-gradient">Decolar</span>?</h2>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <p className="text-body max-w-3xl mx-auto mb-8">
                Não perca mais tempo com estratégias que não funcionam. Venha conhecer nossa metodologia comprovada e transforme seu negócio hoje mesmo.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.4}>
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Solicitar Proposta Gratuita
              </Button>
            </FadeInUp>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}