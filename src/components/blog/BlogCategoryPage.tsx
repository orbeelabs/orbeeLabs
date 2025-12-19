'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowRight, Tag, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { PostPreview } from '@/types/blog';

interface BlogCategoryPageProps {
  categoryName: string;
  posts: PostPreview[];
  breadcrumbItems: Array<{ name: string; url: string }>;
}

export default function BlogCategoryPage({ categoryName, posts, breadcrumbItems }: BlogCategoryPageProps) {
  const categoryDescriptions: Record<string, string> = {
    'SEO Avançado': 'Artigos sobre técnicas avançadas de SEO, otimização técnica, pesquisa de palavras-chave e estratégias que realmente funcionam.',
    'Desenvolvimento Web': 'Conteúdo sobre desenvolvimento web moderno, Next.js, React, TypeScript e boas práticas de programação.',
    'Marketing Digital': 'Estratégias de marketing digital, conteúdo educativo que converte, link building e crescimento de negócios.',
    'Cases Reais': 'Cases de sucesso reais com métricas, desafios, soluções e resultados comprovados.',
  };

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
            <Link href="/blog">
              <button className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Blog
              </button>
            </Link>
            <h1 className="heading-xl text-white mb-6">
              {categoryName} <span className="text-gradient">| Blog</span>
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              {categoryDescriptions[categoryName] || `Artigos sobre ${categoryName}`}
            </p>
            <p className="text-gray-400 mt-4">
              {posts.length} artigo{posts.length !== 1 ? 's' : ''} encontrado{posts.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum artigo encontrado nesta categoria.</p>
              <Link href="/blog">
                <button className="mt-4 text-primary hover:text-primary/80 transition-colors">
                  Ver todos os artigos
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="glass glass-hover rounded-2xl overflow-hidden h-full flex flex-col group cursor-pointer">
                      {/* Image */}
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-yellow-500/20 flex items-center justify-center relative h-48">
                        {post.ogImage ? (
                          <img
                            src={post.ogImage}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-primary/50 text-4xl font-bold">
                              {post.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        {post.featured && (
                          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                            Destaque
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6 flex-1 flex flex-col">
                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1"
                              >
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-400 mt-auto pt-4 border-t border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                            {post.publishedAt && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{format(new Date(post.publishedAt), "dd MMM yyyy", { locale: ptBR })}</span>
                              </div>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

