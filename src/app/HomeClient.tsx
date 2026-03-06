'use client';

import { Button } from '@/components/ui/button';
import { PageLayout, ContentSection, CTASection } from '@/components/layout';
import FadeInUp from '@/components/animations/FadeInUp';
import AnimatedCard from '@/components/animations/AnimatedCard';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';
import dynamic from 'next/dynamic';
import ScrollIndicator from '@/components/animations/ScrollIndicator';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Lazy load do componente pesado ParticleFieldCanvas
const ParticleFieldCanvas = dynamic(() => import('@/components/animations/ParticleFieldCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function HomeClient() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
  ];

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background via-card to-background min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <ParticleFieldCanvas />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight"
            >
              A Única Agência em BH com{' '}
              <span className="text-gradient">SEO Arquitetural</span> — Sites que Nascem para o Google
            </h1>

            <h2
              className="text-2xl md:text-3xl font-semibold text-white mb-4"
            >
              Metodologia &quot;SEO-VX&quot; e Desenvolvimento Web Fullstack para Resultados Mensuráveis
            </h2>

            <p
              className="text-body max-w-3xl mx-auto mb-8"
            >
              Enquanto seus concorrentes otimizam sites prontos com plugins, nós arquitetamos cada linha de código para dominância orgânica.
              Nossa metodologia proprietária &quot;SEO-VX&quot; combina desenvolvimento fullstack com SEO técnico avançado para resultados 3x mais rápidos e ROI mensurável.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/auditoria-seo">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                  Peça Sua Auditoria SEO Gratuita
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
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Services Section */}
      <ContentSection background="gradient" className="pt-32 md:pt-40">
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-6">
              Serviços de <span className="text-gradient">Marketing Digital</span> e Desenvolvimento Web em BH
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Oferecemos soluções completas em marketing digital estratégico, SEO técnico avançado e desenvolvimento web fullstack em Belo Horizonte,
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
                subtitle: 'Metodologia "SEO-VX"',
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

      {/* Differentiators Section */}
      <ContentSection background="solid">
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-6">
              Por Que a Orbee Labs é <span className="text-gradient">Diferente</span>
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Enquanto 100% das agências em BH usam templates prontos e plugins, nós construímos cada projeto do zero com tecnologia de ponta.
            </p>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'SEO Arquitetural',
              description: 'O SEO não é adicionado depois — ele é a fundação. Cada rota, cada componente, cada meta tag é planejada para máxima indexabilidade e ranking orgânico.',
              stat: '3x',
              statLabel: 'mais rápido que SEO tradicional',
            },
            {
              title: 'Performance Impossível',
              description: 'Core Web Vitals perfeitos não são exceção, são padrão. Nossos sites carregam em menos de 1 segundo com score 98+ no Lighthouse.',
              stat: '98+',
              statLabel: 'score Lighthouse consistente',
            },
            {
              title: 'IA + Intuição Humana',
              description: 'Usamos inteligência artificial para análise de dados e automação, mas cada decisão estratégica é guiada por profissionais experientes.',
              stat: '12:1',
              statLabel: 'ROI médio dos clientes',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="glass glass-hover rounded-2xl p-8 text-center"
            >
              <div className="text-4xl font-extrabold text-primary mb-2">{item.stat}</div>
              <p className="text-sm text-gray-400 mb-6">{item.statLabel}</p>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </ContentSection>

      {/* Featured Cases Section */}
      <ContentSection background="gradient">
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-white mb-6">
              Cases de <span className="text-gradient">Sucesso</span> em BH
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Resultados reais, mensuráveis e auditáveis. Cada case inclui prints de GSC, GA4 e Core Web Vitals.
            </p>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              title: 'Clínica Dra. Bruna Vilela',
              sector: 'Saúde',
              results: ['+400% tráfego orgânico', 'Core Web Vitals 98+', 'Top 3 Google para 15 keywords'],
              href: '/portfolio',
            },
            {
              title: 'Portal Educacional',
              sector: 'Educação',
              results: ['+250% leads qualificados', 'Tempo de carregamento < 1s', 'Bounce rate -45%'],
              href: '/portfolio',
            },
          ].map((caseItem, index) => (
            <motion.div
              key={caseItem.title}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Link href={caseItem.href}>
                <div className="glass glass-hover rounded-2xl p-8 group cursor-pointer h-full">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {caseItem.sector}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-4 mb-4 group-hover:text-primary transition-colors">
                    {caseItem.title}
                  </h3>
                  <ul className="space-y-2">
                    {caseItem.results.map((result) => (
                      <li key={result} className="flex items-center gap-2 text-gray-300">
                        <span className="text-primary font-bold">✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                  <p className="text-primary font-semibold mt-6 group-hover:translate-x-1 transition-transform">
                    Ver case completo →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/portfolio">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Ver Todos os Cases
            </Button>
          </Link>
        </div>
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
              text: 'A Orbee Labs transformou nossa presença digital completamente. Com o "SEO-VX", nossa clínica agora domina os resultados de busca e nossos agendamentos aumentaram 400%.',
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
            Não perca mais tempo com estratégias que não funcionam. Peça sua auditoria SEO gratuita e descubra o que está travando seu crescimento orgânico.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auditoria-seo">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                Peça Sua Auditoria SEO Gratuita
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Fale com um Especialista
              </Button>
            </Link>
          </div>
        </FadeInUp>
      </CTASection>
    </PageLayout>
  );
}
