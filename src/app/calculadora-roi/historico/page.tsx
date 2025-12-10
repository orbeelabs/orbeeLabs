'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { History, Calculator, TrendingUp, DollarSign, Target, BarChart3, Download, Eye, RefreshCw, Calendar, Search, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ROIData {
  investimentoInicial: number;
  investimentoMensal: number;
  tempoInvestimento: number;
  receitaMensal: number;
  crescimentoMensal: number;
  custoPorLead: number;
  conversao: number;
}

interface CalculoROI {
  receitaTotal: number;
  investimentoTotal: number;
  lucro: number;
  roi: number;
  payback: number;
  receitaProjetada: number[];
  investimentoProjetado: number[];
  lucroProjetado: number[];
}

interface HistoricoCalculo {
  id: string;
  name: string | null;
  data: ROIData;
  result: CalculoROI;
  createdAt: string;
  updatedAt: string;
}

export default function HistoricoROI() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [calculos, setCalculos] = useState<HistoricoCalculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCalculo, setSelectedCalculo] = useState<HistoricoCalculo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/calculadora-roi/historico');
      return;
    }

    if (status === 'authenticated') {
      fetchHistorico();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, router]);

  const fetchHistorico = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const response = await fetch(`/api/roi?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setCalculos(result.data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  const reutilizarCalculo = (calculo: HistoricoCalculo) => {
    // Redirecionar para calculadora com dados pré-preenchidos
    const params = new URLSearchParams();
    Object.entries(calculo.data).forEach(([key, value]) => {
      params.append(key, value.toString());
    });
    router.push(`/calculadora-roi?${params.toString()}`);
  };

  const exportarCalculo = (calculo: HistoricoCalculo) => {
    const dadosExport = {
      ...calculo.data,
      ...calculo.result,
      dataCalculo: calculo.createdAt,
      nome: calculo.name || 'Cálculo sem nome',
    };

    const blob = new Blob([JSON.stringify(dadosExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculadora-roi-${calculo.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const calculosFiltrados = calculos.filter((calc) => {
    const matchesSearch = !searchTerm || 
      (calc.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (calc.data.receitaMensal.toString().includes(searchTerm)) ||
      (calc.result.roi.toFixed(1).includes(searchTerm));
    
    return matchesSearch;
  });

  const dadosGrafico = selectedCalculo ? selectedCalculo.result.receitaProjetada.map((receita, index) => ({
    mes: `Mês ${index + 1}`,
    receita,
    investimento: selectedCalculo.result.investimentoProjetado[index],
    lucro: selectedCalculo.result.lucroProjetado[index]
  })) : [];

  if (status === 'loading') {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

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
              <History className="w-8 h-8 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Histórico de{' '}
              <span className="text-gradient">Cálculos ROI</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Visualize, compare e reutilize seus cálculos anteriores de ROI
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros e Busca
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Nome, receita, ROI..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data Inicial</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data Final</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Button onClick={fetchHistorico} variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lista de Cálculos */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <Card>
              <CardContent className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Carregando histórico...</p>
              </CardContent>
            </Card>
          ) : calculosFiltrados.length === 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum cálculo encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  {calculos.length === 0 
                    ? 'Você ainda não tem cálculos salvos. Faça um cálculo na calculadora ROI para começar.'
                    : 'Nenhum cálculo corresponde aos filtros aplicados.'}
                </p>
                <Button onClick={() => router.push('/calculadora-roi')}>
                  <Calculator className="w-4 h-4 mr-2" />
                  Ir para Calculadora
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculosFiltrados.map((calculo) => (
                <Card key={calculo.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">
                        {calculo.name || `Cálculo ${format(new Date(calculo.createdAt), 'dd/MM/yyyy', { locale: ptBR })}`}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      {format(new Date(calculo.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <div className="text-xl font-bold text-primary">
                            {calculo.result.roi.toFixed(1)}%
                          </div>
                          <div className="text-xs text-muted-foreground">ROI</div>
                        </div>
                        
                        <div className="text-center p-3 bg-green-500/10 rounded-lg">
                          <div className="text-xl font-bold text-green-500">
                            R$ {calculo.result.lucro.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Lucro</div>
                        </div>
                      </div>

                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investimento:</span>
                          <span className="font-medium">R$ {calculo.data.investimentoInicial.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Receita Mensal:</span>
                          <span className="font-medium">R$ {calculo.data.receitaMensal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payback:</span>
                          <span className="font-medium">{calculo.result.payback.toFixed(1)} meses</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => setSelectedCalculo(calculo)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                {calculo.name || `Cálculo de ${format(new Date(calculo.createdAt), 'dd/MM/yyyy', { locale: ptBR })}`}
                              </DialogTitle>
                              <DialogDescription>
                                Detalhes completos do cálculo realizado em {format(new Date(calculo.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedCalculo && (
                              <div className="space-y-6 mt-4">
                                {/* Resumo */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                                    <div className="text-2xl font-bold text-primary">
                                      {selectedCalculo.result.roi.toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-muted-foreground">ROI</div>
                                  </div>
                                  <div className="text-center p-4 bg-green-500/10 rounded-lg">
                                    <div className="text-2xl font-bold text-green-500">
                                      R$ {selectedCalculo.result.lucro.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Lucro</div>
                                  </div>
                                  <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-500">
                                      R$ {selectedCalculo.result.receitaTotal.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Receita</div>
                                  </div>
                                  <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-500">
                                      {selectedCalculo.result.payback.toFixed(1)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Meses</div>
                                  </div>
                                </div>

                                {/* Parâmetros */}
                                <div>
                                  <h4 className="font-semibold mb-3">Parâmetros Utilizados</h4>
                                  <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div><span className="text-muted-foreground">Investimento Inicial:</span> R$ {selectedCalculo.data.investimentoInicial.toLocaleString()}</div>
                                    <div><span className="text-muted-foreground">Investimento Mensal:</span> R$ {selectedCalculo.data.investimentoMensal.toLocaleString()}</div>
                                    <div><span className="text-muted-foreground">Tempo:</span> {selectedCalculo.data.tempoInvestimento} meses</div>
                                    <div><span className="text-muted-foreground">Receita Mensal:</span> R$ {selectedCalculo.data.receitaMensal.toLocaleString()}</div>
                                    <div><span className="text-muted-foreground">Crescimento:</span> {selectedCalculo.data.crescimentoMensal}%</div>
                                    <div><span className="text-muted-foreground">Custo por Lead:</span> R$ {selectedCalculo.data.custoPorLead.toLocaleString()}</div>
                                  </div>
                                </div>

                                {/* Gráficos */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-3">Evolução Receita vs Investimento</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                      <LineChart data={dadosGrafico}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="mes" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                                        <Line type="monotone" dataKey="receita" stroke="#3b82f6" strokeWidth={2} name="Receita" />
                                        <Line type="monotone" dataKey="investimento" stroke="#ef4444" strokeWidth={2} name="Investimento" />
                                      </LineChart>
                                    </ResponsiveContainer>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-3">Lucro Mensal</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                      <BarChart data={dadosGrafico}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="mes" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                                        <Bar dataKey="lucro" fill="#10b981" name="Lucro" />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => reutilizarCalculo(calculo)}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Reutilizar
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => exportarCalculo(calculo)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

