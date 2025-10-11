'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Globe, 
  Calendar,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface Audit {
  id: string;
  url: string;
  score: number;
  data: string;
  createdAt: string;
}

interface AuditData {
  url: string;
  timestamp: string;
  overallScore: number;
  technical: {
    title: { text: string; status: string };
    description: { text: string; status: string };
    headings: { h1: number; h2: number; h3: number; status: string };
    images: { total: number; withoutAlt: number; status: string };
    links: { internal: number; external: number; status: string };
    metaTags: { viewport: boolean; charset: boolean; status: string };
  };
  recommendations: string[];
  criticalIssues: string[];
  warnings: string[];
}

export default function AuditsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudit, setSelectedAudit] = useState<AuditData | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchAudits();
    }
  }, [session]);

  const fetchAudits = async () => {
    try {
      const response = await fetch('/api/admin/audits');
      if (response.ok) {
        const data = await response.json();
        setAudits(data.audits || []);
      }
    } catch (error) {
      console.error('Erro ao buscar auditorias:', error);
      toast.error('Erro ao carregar auditorias');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bom';
    if (score >= 40) return 'Regular';
    return 'Ruim';
  };

  const filteredAudits = audits.filter(audit => {
    return audit.url.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const exportAudits = () => {
    const csvContent = [
      ['URL', 'Score', 'Status', 'Data'],
      ...filteredAudits.map(audit => [
        audit.url,
        audit.score.toString(),
        getScoreLabel(audit.score),
        new Date(audit.createdAt).toLocaleDateString('pt-BR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `auditorias-seo-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const viewAuditDetails = (audit: Audit) => {
    try {
      const data = JSON.parse(audit.data);
      console.log('Dados da auditoria:', data); // Debug
      setSelectedAudit(data);
    } catch (error) {
      console.error('Erro ao parsear dados da auditoria:', error);
      toast.error('Erro ao carregar detalhes da auditoria');
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
    <>
      <Navigation />
      <div className="min-h-screen bg-background text-foreground pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  Auditorias <span className="text-gradient">SEO</span>
                </h1>
                <p className="text-gray-300">
                  {filteredAudits.length} auditoria(s) encontrada(s)
                </p>
              </div>
            </div>
            <Button
              onClick={exportAudits}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exportar CSV</span>
            </Button>
          </div>

          {/* Search */}
          <Card className="glass p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Audits List */}
          <div className="space-y-4">
            {filteredAudits.map((audit, index) => (
              <motion.div
                key={audit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="glass p-6 hover:glass-hover transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-yellow-500 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white truncate">
                            {audit.url}
                          </h3>
                          <Badge className={`${getScoreBadge(audit.score)} text-white`}>
                            {getScoreLabel(audit.score)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="w-4 h-4" />
                            <span className={getScoreColor(audit.score)}>
                              Score: {audit.score}/100
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(audit.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewAuditDetails(audit)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver Detalhes</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredAudits.length === 0 && (
            <Card className="glass p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Globe className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhuma auditoria encontrada</h3>
                <p>Não há auditorias que correspondam ao filtro selecionado.</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Audit Details Modal */}
      {selectedAudit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Detalhes da Auditoria</h2>
              <Button
                variant="outline"
                onClick={() => setSelectedAudit(null)}
              >
                Fechar
              </Button>
            </div>

            <div className="space-y-6">
              {/* URL and Score */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedAudit.url}</h3>
                  <p className="text-gray-400">
                    {new Date(selectedAudit.timestamp).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedAudit.overallScore || 0)}`}>
                    {selectedAudit.overallScore || 0}/100
                  </div>
                  <Badge className={`${getScoreBadge(selectedAudit.overallScore || 0)} text-white`}>
                    {getScoreLabel(selectedAudit.overallScore || 0)}
                  </Badge>
                </div>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass p-4">
                  <h4 className="font-semibold text-white mb-3">Título</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    {selectedAudit.technical?.title?.text || 'Não encontrado'}
                  </p>
                  <Badge className={
                    selectedAudit.technical?.title?.status === 'good' ? 'bg-green-500' : 
                    selectedAudit.technical?.title?.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }>
                    {selectedAudit.technical?.title?.status === 'good' ? 'Bom' : 
                     selectedAudit.technical?.title?.status === 'warning' ? 'Atenção' : 'Ruim'}
                  </Badge>
                </Card>

                <Card className="glass p-4">
                  <h4 className="font-semibold text-white mb-3">Meta Description</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    {selectedAudit.technical?.description?.text || 'Não encontrada'}
                  </p>
                  <Badge className={
                    selectedAudit.technical?.description?.status === 'good' ? 'bg-green-500' : 
                    selectedAudit.technical?.description?.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }>
                    {selectedAudit.technical?.description?.status === 'good' ? 'Bom' : 
                     selectedAudit.technical?.description?.status === 'warning' ? 'Atenção' : 'Ruim'}
                  </Badge>
                </Card>

                <Card className="glass p-4">
                  <h4 className="font-semibold text-white mb-3">Headings</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    H1: {selectedAudit.technical?.headings?.h1 || 0}, 
                    H2: {selectedAudit.technical?.headings?.h2 || 0}, 
                    H3: {selectedAudit.technical?.headings?.h3 || 0}
                  </p>
                  <Badge className={
                    selectedAudit.technical?.headings?.status === 'good' ? 'bg-green-500' : 
                    selectedAudit.technical?.headings?.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }>
                    {selectedAudit.technical?.headings?.status === 'good' ? 'Bom' : 
                     selectedAudit.technical?.headings?.status === 'warning' ? 'Atenção' : 'Ruim'}
                  </Badge>
                </Card>

                <Card className="glass p-4">
                  <h4 className="font-semibold text-white mb-3">Imagens</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Total: {selectedAudit.technical?.images?.total || 0}, 
                    Sem Alt: {selectedAudit.technical?.images?.withoutAlt || 0}
                  </p>
                  <Badge className={
                    selectedAudit.technical?.images?.status === 'good' ? 'bg-green-500' : 
                    selectedAudit.technical?.images?.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }>
                    {selectedAudit.technical?.images?.status === 'good' ? 'Bom' : 
                     selectedAudit.technical?.images?.status === 'warning' ? 'Atenção' : 'Ruim'}
                  </Badge>
                </Card>
              </div>

              {/* Recommendations */}
              {selectedAudit.recommendations && selectedAudit.recommendations.length > 0 && (
                <Card className="glass p-4">
                  <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Recomendações</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedAudit.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Critical Issues */}
              {selectedAudit.criticalIssues && selectedAudit.criticalIssues.length > 0 && (
                <Card className="glass p-4 border-red-500/20">
                  <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span>Problemas Críticos</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedAudit.criticalIssues.map((issue, index) => (
                      <li key={index} className="text-red-300 text-sm flex items-start space-x-2">
                        <span className="text-red-400">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Warnings */}
              {selectedAudit.warnings && selectedAudit.warnings.length > 0 && (
                <Card className="glass p-4 border-yellow-500/20">
                  <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span>Avisos</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedAudit.warnings.map((warning, index) => (
                      <li key={index} className="text-yellow-300 text-sm flex items-start space-x-2">
                        <span className="text-yellow-400">•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}
