'use client';

import { ClientLogger } from '@/lib/logger-client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageLayout } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  Save,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface PostFormData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  category: string;
  tags: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
}

const CATEGORIES = [
  'SEO Avançado',
  'Desenvolvimento Web',
  'Marketing Digital',
  'Cases Reais'
];

export default function NewPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    author: '',
    authorImage: '',
    category: CATEGORIES[0],
    tags: '',
    featured: false,
    published: false,
    publishedAt: '',
    seoTitle: '',
    seoDescription: '',
    ogImage: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0),
        publishedAt: formData.publishedAt || (formData.published ? new Date().toISOString() : null),
        excerpt: formData.excerpt || null,
        authorImage: formData.authorImage || null,
        seoTitle: formData.seoTitle || null,
        seoDescription: formData.seoDescription || null,
        ogImage: formData.ogImage || null,
      };

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Post criado com sucesso!');
        router.push('/admin/posts');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erro ao salvar post');
      }
    } catch (error) {
      ClientLogger.error('Erro ao salvar post', undefined, error as Error);
      toast.error('Erro ao salvar post');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading') {
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

  // Reutilizar o mesmo JSX da página de edição
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/admin/posts')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Criar <span className="text-gradient">Post</span>
              </h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="glass p-6 mb-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white mb-2 block">
                    Título *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (!formData.slug) {
                        setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                      }
                    }}
                    placeholder="Digite o título do post"
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="slug" className="text-white mb-2 block">
                    Slug *
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="url-amigavel-do-post"
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-white mb-2 block">
                  Resumo
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Breve descrição do post (aparece na listagem)"
                  rows={3}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="content" className="text-white mb-2 block">
                  Conteúdo *
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Conteúdo completo do post (suporta Markdown)"
                  rows={15}
                  required
                  className="bg-white/10 border-white/20 text-white font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author" className="text-white mb-2 block">
                    Autor *
                  </Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Nome do autor"
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="authorImage" className="text-white mb-2 block">
                    Imagem do Autor (URL)
                  </Label>
                  <Input
                    id="authorImage"
                    value={formData.authorImage}
                    onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })}
                    placeholder="https://..."
                    type="url"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-white mb-2 block">
                    Categoria *
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="tags" className="text-white mb-2 block">
                    Tags (separadas por vírgula)
                  </Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">SEO</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="seoTitle" className="text-white mb-2 block">
                      Título SEO
                    </Label>
                    <Input
                      id="seoTitle"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      placeholder="Título otimizado para SEO (máx. 60 caracteres)"
                      maxLength={60}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoDescription" className="text-white mb-2 block">
                      Descrição SEO
                    </Label>
                    <Textarea
                      id="seoDescription"
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      placeholder="Descrição otimizada para SEO (máx. 160 caracteres)"
                      rows={2}
                      maxLength={160}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ogImage" className="text-white mb-2 block">
                      Imagem Open Graph (URL)
                    </Label>
                    <Input
                      id="ogImage"
                      value={formData.ogImage}
                      onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                      placeholder="https://..."
                      type="url"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Opções</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
                    />
                    <span className="text-white">Post em destaque</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
                    />
                    <span className="text-white">Publicar post</span>
                  </label>
                  {formData.published && (
                    <div>
                      <Label htmlFor="publishedAt" className="text-white mb-2 block">
                        Data de Publicação
                      </Label>
                      <Input
                        id="publishedAt"
                        type="datetime-local"
                        value={formData.publishedAt}
                        onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/posts')}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Post</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}

