'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

interface CaseFormData {
  slug: string;
  title: string;
  description: string;
  clientName: string;
  industry: string;
  services: string;
  technologies: string;
  challenge: string;
  solution: string;
  results: string;
  duration: string;
  timeline: string;
  learnings: string;
  heroImage: string;
  gallery: string;
  gscBefore: string;
  gscAfter: string;
  ga4Before: string;
  ga4After: string;
  cwvBefore: string;
  cwvAfter: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
}

const INDUSTRIES = [
  'Saúde',
  'Educação',
  'E-commerce',
  'Jurídico',
  'SaaS/Tech',
  'Financeiro',
  'Imobiliário',
  'Outros'
];

export default function CaseEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const isNew = !id || id === 'new';
  
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<CaseFormData>({
    slug: '',
    title: '',
    description: '',
    clientName: '',
    industry: INDUSTRIES[0],
    services: '',
    technologies: '',
    challenge: '',
    solution: '',
    results: '',
    duration: '',
    timeline: '',
    learnings: '',
    heroImage: '',
    gallery: '',
    gscBefore: '',
    gscAfter: '',
    ga4Before: '',
    ga4After: '',
    cwvBefore: '',
    cwvAfter: '',
    featured: false,
    published: true,
    publishedAt: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (!isNew && session) {
      fetchCase();
    }
  }, [id, session, isNew]);

  const fetchCase = async () => {
    try {
      const response = await fetch(`/api/admin/cases/${id}`);
      if (response.ok) {
        const data = await response.json();
        const caseStudy = data.data;
        setFormData({
          slug: caseStudy.slug || '',
          title: caseStudy.title || '',
          description: caseStudy.description || '',
          clientName: caseStudy.clientName || '',
          industry: caseStudy.industry || INDUSTRIES[0],
          services: caseStudy.services?.join(', ') || '',
          technologies: caseStudy.technologies?.join(', ') || '',
          challenge: caseStudy.challenge || '',
          solution: caseStudy.solution || '',
          results: caseStudy.results || '',
          duration: caseStudy.duration || '',
          timeline: caseStudy.timeline || '',
          learnings: caseStudy.learnings || '',
          heroImage: caseStudy.heroImage || '',
          gallery: caseStudy.gallery?.join(', ') || '',
          gscBefore: caseStudy.gscBefore || '',
          gscAfter: caseStudy.gscAfter || '',
          ga4Before: caseStudy.ga4Before || '',
          ga4After: caseStudy.ga4After || '',
          cwvBefore: caseStudy.cwvBefore || '',
          cwvAfter: caseStudy.cwvAfter || '',
          featured: caseStudy.featured || false,
          published: caseStudy.published !== undefined ? caseStudy.published : true,
          publishedAt: caseStudy.publishedAt ? new Date(caseStudy.publishedAt).toISOString().slice(0, 16) : '',
        });
      } else {
        toast.error('Erro ao carregar case');
        router.push('/admin/cases');
      }
    } catch (error) {
      console.error('Erro ao buscar case:', error);
      toast.error('Erro ao carregar case');
    } finally {
      setIsLoading(false);
    }
  };

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
        services: formData.services.split(',').map(s => s.trim()).filter(s => s.length > 0),
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t.length > 0),
        gallery: formData.gallery.split(',').map(g => g.trim()).filter(g => g.length > 0),
        publishedAt: formData.publishedAt || (formData.published ? new Date().toISOString() : new Date().toISOString()),
        clientName: formData.clientName || null,
        timeline: formData.timeline || null,
        learnings: formData.learnings || null,
        heroImage: formData.heroImage || null,
        gscBefore: formData.gscBefore || null,
        gscAfter: formData.gscAfter || null,
        ga4Before: formData.ga4Before || null,
        ga4After: formData.ga4After || null,
        cwvBefore: formData.cwvBefore || null,
        cwvAfter: formData.cwvAfter || null,
      };

      const url = isNew ? '/api/admin/cases' : `/api/admin/cases/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(isNew ? 'Case criado com sucesso!' : 'Case atualizado com sucesso!');
        router.push('/admin/cases');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Erro ao salvar case');
      }
    } catch (error) {
      console.error('Erro ao salvar case:', error);
      toast.error('Erro ao salvar case');
    } finally {
      setIsSaving(false);
    }
  };

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push('/admin/cases')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isNew ? 'Criar' : 'Editar'} <span className="text-gradient">Case</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="glass p-6 mb-6">
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Informações Básicas</h3>
                <div>
                  <Label htmlFor="title" className="text-white mb-2 block">
                    Título *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (isNew && !formData.slug) {
                        setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                      }
                    }}
                    placeholder="Digite o título do case"
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
                    placeholder="url-amigavel-do-case"
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white mb-2 block">
                    Descrição *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Breve descrição do case"
                    rows={3}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientName" className="text-white mb-2 block">
                      Nome do Cliente
                    </Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Nome do cliente (opcional)"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry" className="text-white mb-2 block">
                      Setor *
                    </Label>
                    <select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {INDUSTRIES.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="services" className="text-white mb-2 block">
                    Serviços (separados por vírgula)
                  </Label>
                  <Input
                    id="services"
                    value={formData.services}
                    onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                    placeholder="SEO, Desenvolvimento, Marketing"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="technologies" className="text-white mb-2 block">
                    Tecnologias (separadas por vírgula)
                  </Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="Next.js, React, TypeScript"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="duration" className="text-white mb-2 block">
                    Duração *
                  </Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Ex: 3 meses, 6 semanas"
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              {/* Conteúdo */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Conteúdo</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="challenge" className="text-white mb-2 block">
                      Desafio *
                    </Label>
                    <Textarea
                      id="challenge"
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      placeholder="Descreva o desafio enfrentado"
                      rows={5}
                      required
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="solution" className="text-white mb-2 block">
                      Solução *
                    </Label>
                    <Textarea
                      id="solution"
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      placeholder="Descreva a solução implementada"
                      rows={5}
                      required
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="results" className="text-white mb-2 block">
                      Resultados *
                    </Label>
                    <Textarea
                      id="results"
                      value={formData.results}
                      onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                      placeholder="Descreva os resultados alcançados (pode ser JSON com métricas)"
                      rows={5}
                      required
                      className="bg-white/10 border-white/20 text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeline" className="text-white mb-2 block">
                      Timeline
                    </Label>
                    <Textarea
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      placeholder="Cronograma do projeto (opcional)"
                      rows={3}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="learnings" className="text-white mb-2 block">
                      Aprendizados
                    </Label>
                    <Textarea
                      id="learnings"
                      value={formData.learnings}
                      onChange={(e) => setFormData({ ...formData, learnings: e.target.value })}
                      placeholder="O que faríamos diferente (opcional)"
                      rows={3}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Imagens */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Imagens</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="heroImage" className="text-white mb-2 block">
                      Imagem Hero (URL)
                    </Label>
                    <Input
                      id="heroImage"
                      value={formData.heroImage}
                      onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                      placeholder="https://..."
                      type="url"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gallery" className="text-white mb-2 block">
                      Galeria (URLs separadas por vírgula)
                    </Label>
                    <Input
                      id="gallery"
                      value={formData.gallery}
                      onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                      placeholder="https://..., https://..."
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Métricas */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Métricas (URLs das Imagens)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gscBefore" className="text-white mb-2 block">
                      GSC Antes
                    </Label>
                    <Input
                      id="gscBefore"
                      value={formData.gscBefore}
                      onChange={(e) => setFormData({ ...formData, gscBefore: e.target.value })}
                      placeholder="https://..."
                      type="url"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gscAfter" className="text-white mb-2 block">
                      GSC Depois
                    </Label>
                    <Input
                      id="gscAfter"
                      value={formData.gscAfter}
                      onChange={(e) => setFormData({ ...formData, gscAfter: e.target.value })}
                      placeholder="https://..."
                      type="url"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ga4Before" className="text-white mb-2 block">
                      GA4 Antes
                    </Label>
                    <Input
                      id="ga4Before"
                      value={formData.ga4Before}
                      onChange={(e) => setFormData({ ...formData, ga4Before: e.target.value })}
                      placeholder="https://..."
                      type="url"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ga4After" className="text-white mb-2 block">
                      GA4 Depois
                    </Label>
                    <Input
                      id="ga4After"
                      value={formData.ga4After}
                      onChange={(e) => setFormData({ ...formData, ga4After: e.target.value })}
                      placeholder="https://..."
                      type="url"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cwvBefore" className="text-white mb-2 block">
                      CWV Antes
                    </Label>
                    <Input
                      id="cwvBefore"
                      value={formData.cwvBefore}
                      onChange={(e) => setFormData({ ...formData, cwvBefore: e.target.value })}
                      placeholder="https://..."
                      type="url"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cwvAfter" className="text-white mb-2 block">
                      CWV Depois
                    </Label>
                    <Input
                      id="cwvAfter"
                      value={formData.cwvAfter}
                      onChange={(e) => setFormData({ ...formData, cwvAfter: e.target.value })}
                      placeholder="https://..."
                      type="url"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Opções */}
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
                    <span className="text-white">Case em destaque</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
                    />
                    <span className="text-white">Publicar case</span>
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

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/cases')}
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
                  <span>Salvar Case</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}

