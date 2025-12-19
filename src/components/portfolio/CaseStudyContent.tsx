'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, TrendingUp, Clock, Target, Code2, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ShareButtons from '@/components/ShareButtons';
import type { CaseStudy, RelatedCase } from '@/types/portfolio';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
  relatedCases: RelatedCase[];
  breadcrumbItems: Array<{ name: string; url: string }>;
}

export default function CaseStudyContent({ caseStudy, relatedCases, breadcrumbItems }: CaseStudyContentProps) {
  const results = JSON.parse(caseStudy.results || '{}');
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 overflow-hidden bg-gradient-to-br from-background via-card to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <Link href="/portfolio">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Portfolio
              </Button>
            </Link>

            {/* Hero Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src={caseStudy.heroImage || '/images/portfolio/default-hero.jpg'}
                alt={caseStudy.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />

            {/* Industry Badge */}
            <div className="mb-4">
              <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                {caseStudy.industry}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {caseStudy.title}
            </h1>

            {/* Client Name */}
            {caseStudy.clientName && (
              <p className="text-primary text-xl font-semibold mb-6">
                {caseStudy.clientName}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{caseStudy.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(caseStudy.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              </div>
              <ShareButtons
                url={shareUrl}
                title={caseStudy.title}
                description={caseStudy.description}
                image={caseStudy.heroImage || '/images/portfolio/default-hero.jpg'}
                size="sm"
                showLabels={false}
              />
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {caseStudy.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-12 bg-gradient-to-br from-background to-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Desafio</h2>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {caseStudy.challenge}
                </p>
              </Card>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Solução</h2>
                </div>
                <div 
                  className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: caseStudy.solution }}
                />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-gradient-to-br from-card to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-white">Resultados</h2>
            </div>
          </motion.div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(results).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Card className="glass p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{String(value)}</div>
                  <div className="text-sm text-gray-400 capitalize">
                    {key.replace(/_/g, ' ')}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Metrics Images */}
          {(caseStudy.gscBefore || caseStudy.gscAfter || caseStudy.ga4Before || caseStudy.ga4After || caseStudy.cwvBefore || caseStudy.cwvAfter) && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Métricas Visuais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* GSC */}
                {(caseStudy.gscBefore || caseStudy.gscAfter) && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Google Search Console</h4>
                    <div className="space-y-4">
                      {caseStudy.gscBefore && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Antes:</p>
                          <Image
                            src={caseStudy.gscBefore}
                            alt="GSC Before"
                            width={600}
                            height={400}
                            className="rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )}
                      {caseStudy.gscAfter && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Depois:</p>
                          <Image
                            src={caseStudy.gscAfter}
                            alt="GSC After"
                            width={600}
                            height={400}
                            className="rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* GA4 */}
                {(caseStudy.ga4Before || caseStudy.ga4After) && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Google Analytics 4</h4>
                    <div className="space-y-4">
                      {caseStudy.ga4Before && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Antes:</p>
                          <Image
                            src={caseStudy.ga4Before}
                            alt="GA4 Before"
                            width={600}
                            height={400}
                            className="rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )}
                      {caseStudy.ga4After && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Depois:</p>
                          <Image
                            src={caseStudy.ga4After}
                            alt="GA4 After"
                            width={600}
                            height={400}
                            className="rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services & Technologies */}
      <section className="py-16 bg-gradient-to-br from-background to-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Services */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Serviços Aplicados</h3>
              <div className="flex flex-wrap gap-3">
                {caseStudy.services.map((service) => (
                  <span
                    key={service}
                    className="px-4 py-2 bg-primary/20 text-primary rounded-full font-semibold"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Tecnologias Utilizadas</h3>
              <div className="flex flex-wrap gap-3">
                {caseStudy.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full font-semibold flex items-center gap-2"
                  >
                    <Code2 className="w-4 h-4" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      {caseStudy.timeline && (
        <section className="py-16 bg-gradient-to-br from-card to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Timeline do Projeto</h3>
            <Card className="glass p-8">
              <div 
                className="text-gray-300 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: caseStudy.timeline }}
              />
            </Card>
          </div>
        </section>
      )}

      {/* Learnings */}
      {caseStudy.learnings && (
        <section className="py-16 bg-gradient-to-br from-background to-card">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">O Que Fariamos Diferente</h3>
            <Card className="glass p-8">
              <div 
                className="text-gray-300 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: caseStudy.learnings }}
              />
            </Card>
          </div>
        </section>
      )}

      {/* Gallery */}
      {caseStudy.gallery.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-card to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Galeria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudy.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-background via-card to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Quer um resultado similar para seu negócio?
            </h2>
            <p className="text-gray-300 mb-6">
              Agende uma consultoria gratuita e descubra como aplicar essas estratégias no seu negócio.
            </p>
            <Link href="/contato">
              <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500">
                Solicitar Consultoria Grátis
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">Cases Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCases.map((relatedCase, index) => (
                <motion.div
                  key={relatedCase.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/portfolio/${relatedCase.slug}`}>
                    <Card className="glass glass-hover rounded-2xl overflow-hidden h-full flex flex-col group cursor-pointer">
                      {/* Image */}
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-yellow-500/20 flex items-center justify-center relative h-48">
                        <Image
                          src={relatedCase.heroImage || '/images/portfolio/default-hero.jpg'}
                          alt={relatedCase.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                          {relatedCase.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                          {relatedCase.description}
                        </p>
                        <div className="text-sm text-gray-400 mt-auto pt-4 border-t border-white/10">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{relatedCase.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}

