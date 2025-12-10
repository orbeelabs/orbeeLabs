'use client';

import { Button } from '@/components/ui/button';
import { PageLayout, ContentSection, CTASection } from '@/components/layout';
import FadeInUp from '@/components/animations/FadeInUp';
import AnimatedCard from '@/components/animations/AnimatedCard';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';
import ParticleFieldCanvas from '@/components/animations/ParticleFieldCanvas';
import ScrollIndicator from '@/components/animations/ScrollIndicator';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-background">
        <ParticleFieldCanvas />
        
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
              <span className="text-gradient">Marketing Digital</span> com SEO Técnico Avançado
            </motion.h1>
            
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Metodologia &quot;SEO Cabuloso&quot; e Desenvolvimento Web Fullstack para Resultados Mensuráveis
            </motion.h2>
            
            <motion.p
              className="text-body max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transformamos sua presença online em uma máquina de crescimento sustentável, do desenvolvimento técnico à conversão otimizada. 
              Nossa metodologia proprietária &quot;SEO Cabuloso&quot; combina análise técnica avançada, estratégias de conteúdo data-driven e desenvolvimento web fullstack para garantir que seu negócio não apenas apareça, mas domine os resultados de busca orgânica com ROI mensurável.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/contato">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                  Fale com um Especialista
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Veja Nossos Cases
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Services Section */}
      <ContentSection background="gradient">
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-6">
              Serviços de <span className="text-gradient">Marketing Digital</span> e Desenvolvimento Web
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Oferecemos soluções completas em marketing digital estratégico, SEO técnico avançado e desenvolvimento web fullstack, 
              com foco em resultados mensuráveis, crescimento sustentável e ROI comprovado para empresas que buscam dominar o mercado digital.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer staggerDelay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'SEO Técnico Avançado',
                subtitle: 'Metodologia "SEO Cabuloso"',
                description: 'Nossa metodologia proprietária que combina auditoria técnica completa, estratégia de conteúdo data-driven e link building ético para dominar os resultados orgânicos do Google',
                metrics: ['+400%', 'tráfego orgânico'],
              },
              {
                icon: '💻',
                title: 'Desenvolvimento Web Fullstack',
                subtitle: 'React, Next.js, Python & IA',
                description: 'Soluções tecnológicas robustas e escaláveis com React, Next.js, Python e integração com IA. Sites otimizados que são verdadeiras máquinas de conversão',
                metrics: ['98+', 'score performance'],
              },
              {
                icon: '📊',
                title: 'Marketing Digital de Alta Performance',
                subtitle: 'Estratégias Data-Driven',
                description: 'Estratégias baseadas em dados para Líderes Digitais Ambiciosos com foco em ROI mensurável, crescimento sustentável e métricas transparentes',
                metrics: ['5x', 'ROI médio clientes'],
              },
            ].map((service, index) => (
              <StaggerItem key={service.title}>
                <AnimatedCard delay={index * 0.2}>
                  <div className="glass glass-hover rounded-2xl p-8 text-center">
                    <div className="text-6xl mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-primary font-semibold mb-4">{service.subtitle}</p>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <span className="text-3xl font-bold text-primary">{service.metrics[0]}</span>
                      <span className="text-gray-400">{service.metrics[1]}</span>
                    </div>
                    <Link 
                      href={index === 0 ? "/auditoria-seo" : index === 1 ? "/portfolio" : "/calculadora-roi"}
                      className="text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                      Saiba mais →
                    </Link>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </ContentSection>

      {/* Testimonials Section */}
      <ContentSection background="solid">
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
            resultados excepcionais para nossos parceiros. Conheça nossos <Link href="/portfolio" className="text-primary hover:text-primary/80 font-semibold">cases de sucesso</Link> e veja como podemos ajudar seu negócio a crescer.
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
      </ContentSection>

      {/* CTA Section */}
      <CTASection>
        <FadeInUp>
          <h2 className="heading-lg text-white mb-6">Pronto para <span className="text-gradient">Decolar</span>?</h2>
        </FadeInUp>
        
        <FadeInUp delay={0.2}>
          <p className="text-body max-w-3xl mx-auto mb-8">
            Não perca mais tempo com estratégias que não funcionam. Venha conhecer nossa metodologia comprovada e transforme seu negócio hoje mesmo.
          </p>
        </FadeInUp>
        
        <FadeInUp delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                Solicitar Proposta Gratuita
              </Button>
            </Link>
            <Link href="/auditoria-seo">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Auditoria SEO Gratuita
              </Button>
            </Link>
          </div>
        </FadeInUp>
      </CTASection>
    </PageLayout>
  );
}