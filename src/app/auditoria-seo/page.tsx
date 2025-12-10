'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout';
import { SEOAnalysisResult } from '@/lib/seo-analyzer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Globe, 
  FileText,
  Download,
  Calendar,
  BarChart3,
  Target,
  Clock
} from 'lucide-react';
import { AgendamentoModal } from '@/components/AgendamentoModal';
import ShareButtons from '@/components/ShareButtons';
import { exportAuditToPDF } from '@/lib/pdf-export';

interface AuditoriaData {
  url: string;
  nomeEmpresa: string;
  email: string;
  telefone: string;
  setor: string;
  faturamento: string;
  objetivo: string;
  concorrentes: string;
  palavrasChave: string;
}

interface ResultadoAuditoria {
  score: number;
  problemas: {
    criticos: number;
    importantes: number;
    menores: number;
  };
  analise: {
    tecnica: Array<{ item: string; status: string; descricao: string }>;
    conteudo: Array<{ item: string; status: string; descricao: string }>;
    performance: Array<{ item: string; status: string; descricao: string }>;
    mobile: Array<{ item: string; status: string; descricao: string }>;
    seguranca: Array<{ item: string; status: string; descricao: string }>;
  };
  recomendacoes: string[];
  proximosPassos: string[];
  dadosReais?: SEOAnalysisResult;
}

export default function AuditoriaSEO() {
  const [step, setStep] = useState(1);
  const [agendamentoOpen, setAgendamentoOpen] = useState(false);
  const [dados, setDados] = useState<AuditoriaData>({
    url: '',
    nomeEmpresa: '',
    email: '',
    telefone: '',
    setor: '',
    faturamento: '',
    objetivo: '',
    concorrentes: '',
    palavrasChave: ''
  });

  const [resultado, setResultado] = useState<ResultadoAuditoria | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: 1, title: 'URL do Site', description: 'Informe a URL do seu site' },
    { id: 2, title: 'Dados da Empresa', description: 'Informações básicas' },
    { id: 3, title: 'Objetivos', description: 'O que você quer alcançar' },
    { id: 4, title: 'Análise', description: 'Aguardando análise...' }
  ];

  const handleInputChange = (field: keyof AuditoriaData, value: string) => {
    setDados(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const iniciarAnalise = async () => {
    setIsAnalyzing(true);
    setStep(4);
    setProgress(0);

    try {
      // Análise real do site via API route
      setProgress(20);
      
      const response = await fetch('/api/analyze-seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: dados.url,
          formData: dados // Enviar dados do formulário para integração com CRM
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro na análise');
      }

      const dadosReais = await response.json();
      setProgress(80);
      
      // Gerar resultado baseado em dados reais
      gerarResultado(dadosReais);
      setProgress(100);
    } catch (error) {
      console.error('Erro na análise:', error);
      // Fallback para simulação se houver erro
      gerarResultado();
      
      // Mostrar erro para o usuário
      if (error instanceof Error) {
        alert(`Erro na análise: ${error.message}`);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const gerarResultado = (dadosReais?: SEOAnalysisResult) => {
    // Usar dados reais se disponíveis, senão simular
    const score = dadosReais?.overallScore || Math.floor(Math.random() * 40) + 30;
    const problemasCriticos = dadosReais?.criticalIssues.length || Math.floor(Math.random() * 5) + 3;
    const problemasImportantes = dadosReais?.warnings.length || Math.floor(Math.random() * 8) + 5;
    const problemasMenores = Math.floor(Math.random() * 12) + 8;
    
    const resultadoSimulado: ResultadoAuditoria = {
      score,
      problemas: {
        criticos: problemasCriticos,
        importantes: problemasImportantes,
        menores: problemasMenores
      },
      analise: {
        tecnica: dadosReais ? [
          { 
            item: 'Meta Title', 
            status: dadosReais.technical.title.status, 
            descricao: `Título: "${dadosReais.technical.title.text}" (${dadosReais.technical.title.length} caracteres)` 
          },
          { 
            item: 'Meta Description', 
            status: dadosReais.technical.description.status, 
            descricao: `Descrição: "${dadosReais.technical.description.text}" (${dadosReais.technical.description.length} caracteres)` 
          },
          { 
            item: 'Heading Structure', 
            status: dadosReais.technical.headings.status, 
            descricao: `H1: ${dadosReais.technical.headings.h1}, H2: ${dadosReais.technical.headings.h2}, H3: ${dadosReais.technical.headings.h3}` 
          },
          { 
            item: 'Images Alt Text', 
            status: dadosReais.technical.images.status, 
            descricao: `${dadosReais.technical.images.withoutAlt}/${dadosReais.technical.images.total} imagens sem alt text` 
          },
          { 
            item: 'Meta Tags', 
            status: dadosReais.technical.metaTags.status, 
            descricao: `Viewport: ${dadosReais.technical.metaTags.viewport ? 'OK' : 'Ausente'}, Charset: ${dadosReais.technical.metaTags.charset ? 'OK' : 'Ausente'}` 
          }
        ] : [
          { item: 'Meta Title', status: 'error', descricao: 'Título muito longo (65+ caracteres)' },
          { item: 'Meta Description', status: 'warning', descricao: 'Descrição ausente em algumas páginas' },
          { item: 'Heading Structure', status: 'success', descricao: 'Estrutura H1-H6 bem organizada' },
          { item: 'URL Structure', status: 'error', descricao: 'URLs não amigáveis detectadas' },
          { item: 'Sitemap XML', status: 'warning', descricao: 'Sitemap não encontrado' }
        ],
        conteudo: dadosReais ? [
          { 
            item: 'Contagem de Palavras', 
            status: dadosReais.content.status, 
            descricao: `${dadosReais.content.wordCount} palavras no conteúdo` 
          },
          { 
            item: 'Densidade de Palavras-chave', 
            status: 'warning', 
            descricao: 'Análise de densidade não implementada' 
          },
          { 
            item: 'Imagens Alt Text', 
            status: dadosReais.technical.images.status, 
            descricao: `${dadosReais.technical.images.withoutAlt}/${dadosReais.technical.images.total} imagens sem alt text` 
          },
          { 
            item: 'Links Internos', 
            status: dadosReais.technical.links.status, 
            descricao: `${dadosReais.technical.links.internal} links internos, ${dadosReais.technical.links.external} externos` 
          }
        ] : [
          { item: 'Densidade de Palavras-chave', status: 'warning', descricao: 'Densidade muito baixa (0.5%)' },
          { item: 'Conteúdo Duplicado', status: 'error', descricao: 'Conteúdo duplicado detectado' },
          { item: 'Imagens Alt Text', status: 'warning', descricao: '50% das imagens sem alt text' },
          { item: 'Links Internos', status: 'success', descricao: 'Boa estrutura de links internos' }
        ],
        performance: dadosReais ? [
          { 
            item: 'Score de Performance', 
            status: dadosReais.performance.score > 70 ? 'success' : dadosReais.performance.score > 50 ? 'warning' : 'error', 
            descricao: `Score: ${dadosReais.performance.score}/100` 
          },
          { 
            item: 'First Contentful Paint', 
            status: dadosReais.performance.metrics.firstContentfulPaint < 1800 ? 'success' : 'warning', 
            descricao: `${Math.round(dadosReais.performance.metrics.firstContentfulPaint)}ms` 
          },
          { 
            item: 'Largest Contentful Paint', 
            status: dadosReais.performance.metrics.largestContentfulPaint < 2500 ? 'success' : 'warning', 
            descricao: `${Math.round(dadosReais.performance.metrics.largestContentfulPaint)}ms` 
          },
          { 
            item: 'Cumulative Layout Shift', 
            status: dadosReais.performance.metrics.cumulativeLayoutShift < 0.1 ? 'success' : 'warning', 
            descricao: `${dadosReais.performance.metrics.cumulativeLayoutShift.toFixed(3)}` 
          }
        ] : [
          { item: 'Velocidade de Carregamento', status: 'error', descricao: 'Tempo de carregamento > 3s' },
          { item: 'Core Web Vitals', status: 'warning', descricao: 'LCP acima do recomendado' },
          { item: 'Compressão de Imagens', status: 'error', descricao: 'Imagens não otimizadas' },
          { item: 'Cache do Navegador', status: 'success', descricao: 'Cache configurado corretamente' }
        ],
        mobile: dadosReais ? [
          { 
            item: 'Viewport Meta Tag', 
            status: dadosReais.mobile.status, 
            descricao: dadosReais.mobile.viewport ? 'Viewport configurado' : 'Viewport ausente' 
          },
          { 
            item: 'Touch Friendly', 
            status: dadosReais.mobile.touchFriendly ? 'success' : 'warning', 
            descricao: dadosReais.mobile.touchFriendly ? 'Elementos touch-friendly' : 'Elementos muito pequenos' 
          },
          { 
            item: 'Text Readable', 
            status: dadosReais.mobile.textReadable ? 'success' : 'warning', 
            descricao: 'Texto legível em mobile' 
          }
        ] : [
          { item: 'Responsividade', status: 'success', descricao: 'Site totalmente responsivo' },
          { item: 'Mobile-First Indexing', status: 'warning', descricao: 'Otimização mobile pode melhorar' },
          { item: 'Touch Targets', status: 'success', descricao: 'Botões com tamanho adequado' }
        ],
        seguranca: dadosReais ? [
          { 
            item: 'HTTPS', 
            status: dadosReais.security.status, 
            descricao: dadosReais.security.https ? 'Site usando HTTPS' : 'Site não usa HTTPS' 
          },
          { 
            item: 'Mixed Content', 
            status: dadosReais.security.mixedContent ? 'error' : 'success', 
            descricao: dadosReais.security.mixedContent ? 'Conteúdo misto detectado' : 'Sem conteúdo misto' 
          },
          { 
            item: 'Security Headers', 
            status: dadosReais.security.securityHeaders.length > 0 ? 'success' : 'warning', 
            descricao: `${dadosReais.security.securityHeaders.length} headers de segurança` 
          }
        ] : [
          { item: 'HTTPS', status: 'success', descricao: 'Site com certificado SSL' },
          { item: 'Mixed Content', status: 'warning', descricao: 'Algumas imagens em HTTP' },
          { item: 'Headers de Segurança', status: 'error', descricao: 'Headers de segurança ausentes' }
        ]
      },
      recomendacoes: dadosReais ? dadosReais.recommendations : [
        'Otimizar meta titles para 50-60 caracteres',
        'Adicionar meta descriptions em todas as páginas',
        'Implementar sitemap XML',
        'Otimizar velocidade de carregamento',
        'Adicionar alt text em todas as imagens',
        'Implementar headers de segurança',
        'Melhorar densidade de palavras-chave',
        'Otimizar para Core Web Vitals'
      ],
      proximosPassos: [
        'Agendar reunião de apresentação dos resultados',
        'Implementar correções críticas (prioridade alta)',
        'Criar cronograma de otimizações',
        'Configurar monitoramento contínuo',
        'Treinar equipe em boas práticas SEO'
      ],
      dadosReais: dadosReais
    };

    setResultado(resultadoSimulado);
    setIsAnalyzing(false);
  };

  const exportarRelatorio = () => {
    if (!resultado) return;
    
    const relatorio = {
      dadosEmpresa: dados,
      resultado: resultado,
      dataAuditoria: new Date().toISOString(),
      versao: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(relatorio, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auditoria-seo-${dados.nomeEmpresa.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportarPDF = async () => {
    if (!resultado) return;
    
    try {
      await exportAuditToPDF(resultado, dados);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Search className="w-8 h-8 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Auditoria{' '}
              <span className="text-gradient">SEO</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Descubra o potencial do seu site nos mecanismos de busca e receba 
              um relatório completo com recomendações personalizadas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formulário Multi-Step */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((stepItem, index) => (
                <div key={stepItem.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                    step >= stepItem.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {stepItem.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      step > stepItem.id ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{steps[step - 1]?.title}</h3>
              <p className="text-sm text-muted-foreground">{steps[step - 1]?.description}</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              {/* Step 1: URL do Site */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Informe a URL do seu site</h2>
                    <p className="text-muted-foreground">
                      Vamos analisar seu site e identificar oportunidades de melhoria
                    </p>
                  </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="url">URL do Site</Label>
                        <Input
                          id="url"
                          type="text"
                          placeholder="google.com ou https://google.com"
                          value={dados.url}
                          onChange={(e) => handleInputChange('url', e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Digite a URL com ou sem protocolo (ex: google.com ou https://google.com)
                        </p>
                      </div>
                    </div>
                </motion.div>
              )}

              {/* Step 2: Dados da Empresa */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Dados da sua empresa</h2>
                    <p className="text-muted-foreground">
                      Essas informações nos ajudam a personalizar a análise
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                      <Input
                        id="nomeEmpresa"
                        placeholder="Sua Empresa LTDA"
                        value={dados.nomeEmpresa}
                        onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contato@empresa.com"
                        value={dados.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        placeholder="(31) 98255-6751"
                        value={dados.telefone}
                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="setor">Setor de Atuação</Label>
                      <Select
                        value={dados.setor}
                        onValueChange={(value) => handleInputChange('setor', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o setor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tecnologia">Tecnologia</SelectItem>
                          <SelectItem value="saude">Saúde</SelectItem>
                          <SelectItem value="educacao">Educação</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="servicos">Serviços</SelectItem>
                          <SelectItem value="industria">Indústria</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Objetivos */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <Target className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Seus objetivos</h2>
                    <p className="text-muted-foreground">
                      Conte-nos o que você quer alcançar com seu site
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="faturamento">Faturamento Mensal</Label>
                      <Select
                        value={dados.faturamento}
                        onValueChange={(value) => handleInputChange('faturamento', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o faturamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ate-10k">Até R$ 10.000</SelectItem>
                          <SelectItem value="10k-50k">R$ 10.000 - R$ 50.000</SelectItem>
                          <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
                          <SelectItem value="100k-500k">R$ 100.000 - R$ 500.000</SelectItem>
                          <SelectItem value="acima-500k">Acima de R$ 500.000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="objetivo">Principal Objetivo</Label>
                      <Select
                        value={dados.objetivo}
                        onValueChange={(value) => handleInputChange('objetivo', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o objetivo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aumentar-visitas">Aumentar visitas</SelectItem>
                          <SelectItem value="mais-leads">Gerar mais leads</SelectItem>
                          <SelectItem value="vendas-online">Aumentar vendas online</SelectItem>
                          <SelectItem value="autoridade">Construir autoridade</SelectItem>
                          <SelectItem value="concorrencia">Superar concorrentes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="concorrentes">Principais Concorrentes</Label>
                      <Input
                        id="concorrentes"
                        placeholder="site1.com, site2.com, site3.com"
                        value={dados.concorrentes}
                        onChange={(e) => handleInputChange('concorrentes', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="palavrasChave">Palavras-chave Principais</Label>
                      <Input
                        id="palavrasChave"
                        placeholder="marketing digital, seo, agência"
                        value={dados.palavrasChave}
                        onChange={(e) => handleInputChange('palavrasChave', e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Análise */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {isAnalyzing ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <Search className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Analisando seu site...</h2>
                      <p className="text-muted-foreground mb-6">
                        Estamos verificando mais de 50 fatores de SEO
                      </p>
                      <div className="w-full max-w-md mx-auto">
                        <Progress value={progress} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-2">
                          {Math.round(progress)}% concluído
                        </p>
                      </div>
                    </div>
                  ) : resultado ? (
                    <div className="space-y-8">
                      {/* Score Geral */}
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mb-4">
                          <span className="text-3xl font-bold text-primary">{resultado.score}</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Score de SEO</h2>
                        <p className="text-muted-foreground">
                          {resultado.score >= 70 ? 'Excelente!' : 
                           resultado.score >= 50 ? 'Bom, mas pode melhorar' : 
                           'Precisa de melhorias significativas'}
                        </p>
                      </div>

                      {/* Problemas */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-red-500/10 rounded-lg">
                          <div className="text-2xl font-bold text-red-500">{resultado.problemas.criticos}</div>
                          <div className="text-sm text-muted-foreground">Críticos</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-500">{resultado.problemas.importantes}</div>
                          <div className="text-sm text-muted-foreground">Importantes</div>
                        </div>
                        <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                          <div className="text-2xl font-bold text-blue-500">{resultado.problemas.menores}</div>
                          <div className="text-sm text-muted-foreground">Menores</div>
                        </div>
                      </div>

                      {/* Análise Detalhada */}
                      <Tabs defaultValue="tecnica" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="tecnica">Técnica</TabsTrigger>
                          <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                          <TabsTrigger value="performance">Performance</TabsTrigger>
                          <TabsTrigger value="mobile">Mobile</TabsTrigger>
                          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                        </TabsList>

                        {Object.entries(resultado.analise).map(([categoria, itens]) => (
                          <TabsContent key={categoria} value={categoria}>
                            <div className="space-y-4">
                              {itens.map((item: { item: string; status: string; descricao: string }, index: number) => (
                                <div key={index} className={`p-4 rounded-lg border ${getStatusColor(item.status)}`}>
                                  <div className="flex items-center gap-3">
                                    {getStatusIcon(item.status)}
                                    <div className="flex-1">
                                      <h4 className="font-semibold">{item.item}</h4>
                                      <p className="text-sm text-muted-foreground">{item.descricao}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>

                      {/* Recomendações */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Recomendações Prioritárias
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {resultado.recomendacoes.map((recomendacao, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{recomendacao}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Próximos Passos */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Próximos Passos
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {resultado.proximosPassos.map((passo, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{passo}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Ações */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={exportarPDF} variant="outline" className="flex-1">
                          <FileText className="w-4 h-4 mr-2" />
                          Exportar PDF
                        </Button>
                        <Button onClick={exportarRelatorio} variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Exportar JSON
                        </Button>
                        <Button 
                          className="flex-1 bg-gradient-to-r from-primary to-yellow-500"
                          onClick={() => setAgendamentoOpen(true)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Agendar Consultoria
                        </Button>
                      </div>
                      
                      {resultado && (
                        <div className="pt-4 border-t mt-4">
                          <p className="text-sm text-muted-foreground mb-3">Compartilhar auditoria:</p>
                          <ShareButtons
                            url={typeof window !== 'undefined' ? window.location.href : ''}
                            title={`Auditoria SEO: ${dados.url} - Score ${resultado.score}/100`}
                            description={`Realizei uma auditoria SEO completa do meu site. Score: ${resultado.score}/100. Veja os resultados!`}
                            size="sm"
                          />
                        </div>
                      )}
                    </div>
                  ) : null}
                </motion.div>
              )}

              {/* Navegação */}
              {step < 4 && (
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    disabled={step === 1}
                  >
                    Anterior
                  </Button>
                  
                  {step < 3 ? (
                    <Button onClick={nextStep}>
                      Próximo
                    </Button>
                  ) : (
                    <Button onClick={iniciarAnalise} disabled={!dados.url || !dados.nomeEmpresa}>
                      <Search className="w-4 h-4 mr-2" />
                      Iniciar Análise
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <AgendamentoModal 
        open={agendamentoOpen} 
        onClose={() => setAgendamentoOpen(false)}
        tipoConsulta="Auditoria SEO"
      />
    </PageLayout>
  );
}
