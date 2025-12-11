'use client';

import { ClientLogger } from '@/lib/logger-client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function PostsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [publishedFilter, setPublishedFilter] = useState('all');
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data || []);
      }
    } catch (error) {
      ClientLogger.error('Erro ao buscar posts', undefined, error as Error);
      toast.error('Erro ao carregar posts');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    const matchesPublished = publishedFilter === 'all' || 
                            (publishedFilter === 'published' && post.published) ||
                            (publishedFilter === 'draft' && !post.published);
    return matchesSearch && matchesCategory && matchesPublished;
  });

  const handleDeletePost = async (post: Post) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Post excluído com sucesso');
        setPosts(prev => prev.filter(p => p.id !== post.id));
        setPostToDelete(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erro ao excluir post');
      }
    } catch (error) {
      ClientLogger.error('Erro ao excluir post', undefined, error as Error);
      toast.error('Erro ao excluir post');
    } finally {
      setIsDeleting(false);
    }
  };

  const categories = Array.from(new Set(posts.map(p => p.category)));

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/admin')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Gerenciar <span className="text-gradient">Posts</span>
              </h1>
              <p className="text-gray-300">
                {filteredPosts.length} post(s) encontrado(s)
              </p>
            </div>
          </div>
          <Button
            onClick={() => router.push('/admin/posts/new')}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Post</span>
          </Button>
        </div>

        {/* Filters */}
        <Card className="glass p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por título, conteúdo ou tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todas as categorias</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="md:w-48">
              <select
                value={publishedFilter}
                onChange={(e) => setPublishedFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todos</option>
                <option value="published">Publicados</option>
                <option value="draft">Rascunhos</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="glass p-6 hover:glass-hover transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-white">
                        {post.title}
                      </h3>
                      {post.featured && (
                        <Badge className="bg-primary text-white">Destaque</Badge>
                      )}
                      {post.published ? (
                        <Badge className="bg-green-500 text-white">Publicado</Badge>
                      ) : (
                        <Badge className="bg-gray-500 text-white">Rascunho</Badge>
                      )}
                    </div>
                    
                    {post.excerpt && (
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Tag className="w-4 h-4" />
                        <span className="text-sm">{post.category}</span>
                      </div>
                      {post.publishedAt && (
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      )}
                      {post.tags.length > 0 && (
                        <div className="flex items-center space-x-2">
                          {post.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-gray-400 text-xs">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-400">
                      Criado em {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                      {post.updatedAt !== post.createdAt && (
                        <span> • Atualizado em {new Date(post.updatedAt).toLocaleDateString('pt-BR')}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {post.published && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/blog/${post.slug}`)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver</span>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/posts/${post.id}`)}
                      className="flex items-center space-x-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Editar</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPostToDelete(post)}
                      className="flex items-center space-x-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Excluir</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="glass p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FileText className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum post encontrado</h3>
              <p className="mb-4">Não há posts que correspondam aos filtros selecionados.</p>
              <Button
                onClick={() => router.push('/admin/posts/new')}
                className="flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Criar Primeiro Post</span>
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Confirmar Exclusão
              </h2>
              
              <p className="text-gray-300 mb-6">
                Tem certeza que deseja excluir o post{' '}
                <span className="font-semibold text-white">
                  {postToDelete.title}
                </span>?
                <br />
                <span className="text-sm text-gray-400">
                  Esta ação não pode ser desfeita.
                </span>
              </p>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setPostToDelete(null)}
                  className="flex-1"
                  disabled={isDeleting}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleDeletePost(postToDelete)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </PageLayout>
  );
}

