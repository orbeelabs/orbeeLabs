'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import type { PostPreview } from '@/types/blog';

export default function BlogPage() {
  const breadcrumbItems = [
    { name: "Início", url: "https://orbeelabs.com" },
    { name: "Blog", url: "https://orbeelabs.com/blog" },
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'SEO Avançado', name: 'SEO Avançado' },
    { id: 'Desenvolvimento Web', name: 'Desenvolvimento Web' },
    { id: 'Marketing Digital', name: 'Marketing Digital' },
    { id: 'Cases Reais', name: 'Cases Reais' },
  ];

  // Filtros para a API
  const filters = useMemo(() => {
    const filterObj: Record<string, string> = {};
    if (activeCategory !== 'all') {
      filterObj.category = activeCategory;
    }
    if (searchTerm) {
      filterObj.search = searchTerm;
    }
    return filterObj;
  }, [activeCategory, searchTerm]);

  const { data: posts, isLoading } = usePaginatedData<PostPreview>({
    endpoint: '/api/blog',
    filters,
  });

  const featuredPosts = posts.filter(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

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
              Blog <span className="text-gradient">Orbee Labs</span>
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              Artigos sobre SEO técnico, desenvolvimento web, marketing digital e estratégias que realmente funcionam. 
              Aprenda a metodologia que gerou resultados reais para nossos clientes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-gradient-to-br from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white">Carregando artigos...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum artigo encontrado.</p>
            </div>
          ) : (
            <>
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-8">Artigos em Destaque</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredPosts.map((post, index) => (
                      <PostCard key={post.id} post={post} featured delay={index * 0.1} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div>
                  {featuredPosts.length > 0 && (
                    <h2 className="text-2xl font-bold text-white mb-8">Todos os Artigos</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post, index) => (
                      <PostCard key={post.id} post={post} delay={index * 0.1} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

interface PostCardProps {
  post: PostPreview;
  featured?: boolean;
  delay?: number;
}

function PostCard({ post, featured = false, delay = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="glass glass-hover rounded-2xl overflow-hidden h-full flex flex-col group cursor-pointer">
          {/* Image or Placeholder */}
          <div className={`aspect-video bg-gradient-to-br from-primary/20 to-yellow-500/20 flex items-center justify-center relative ${featured ? 'h-64' : 'h-48'}`}>
            {post.ogImage ? (
              <Image
                src={post.ogImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading={featured ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary/50 text-6xl font-bold">{post.title.charAt(0)}</span>
              </div>
            )}
            {post.featured && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                Destaque
              </div>
            )}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white text-sm font-semibold">{post.category}</span>
            </div>
          </div>

          <CardContent className="p-6 flex-1 flex flex-col">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 3).map((tag) => (
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
            <h3 className={`text-white mb-3 font-bold group-hover:text-primary transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
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
  );
}

