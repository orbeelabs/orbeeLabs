'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Tag, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ShareButtons from '@/components/ShareButtons';
import type { Post, RelatedPost } from '@/types/blog';

interface BlogPostContentProps {
  post: Post;
  relatedPosts: RelatedPost[];
  breadcrumbItems: Array<{ name: string; url: string }>;
}

export default function BlogPostContent({ post, relatedPosts, breadcrumbItems }: BlogPostContentProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-to-br from-background via-card to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <Link href="/blog">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Blog
              </Button>
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                {post.authorImage && (
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(post.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                </div>
              )}
              <ShareButtons
                url={shareUrl}
                title={post.title}
                description={post.excerpt || ''}
                image={post.ogImage || undefined}
                size="sm"
                showLabels={false}
              />
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Featured Image */}
            {post.ogImage && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
                <Image
                  src={post.ogImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-gradient-to-br from-background to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Render Markdown or HTML content */}
            <div 
              className="blog-content text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </div>
      </section>

      {/* Tags */}
      {post.tags.length > 0 && (
        <section className="py-8 bg-gradient-to-br from-card to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 items-center">
              <Tag className="w-5 h-5 text-primary" />
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm hover:bg-primary/20 transition-colors"
                >
                  #{tag}
                </Link>
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

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              Artigos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <Card className="glass glass-hover rounded-2xl overflow-hidden h-full flex flex-col group cursor-pointer">
                      {/* Image */}
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-yellow-500/20 flex items-center justify-center relative h-48">
                        {relatedPost.ogImage ? (
                          <Image
                            src={relatedPost.ogImage}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-primary/50 text-4xl font-bold">
                              {relatedPost.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-white text-sm font-semibold">{relatedPost.category}</span>
                        </div>
                      </div>

                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.excerpt && (
                          <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                            {relatedPost.excerpt}
                          </p>
                        )}
                        <div className="text-sm text-gray-400 mt-auto pt-4 border-t border-white/10">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {relatedPost.publishedAt && (
                              <span>{format(new Date(relatedPost.publishedAt), "dd MMM yyyy", { locale: ptBR })}</span>
                            )}
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

