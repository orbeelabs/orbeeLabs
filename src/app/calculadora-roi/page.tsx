'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useToast } from '@/components/ui/use-toast';
// import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, DollarSign, Target, BarChart3, Download, BookOpen, Ruler, Lightbulb, Info, ExternalLink, History, Plus, X, Copy, GitCompare } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AgendamentoModal } from '@/components/AgendamentoModal';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

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

interface Cenario {
  id: string;
  nome: string;
  dados: ROIData;
  calculo: CalculoROI | null;
}

export default function CalculadoraROI() {
  // const { toast } = useToast();
  const { data: session } = useSession();
  const [agendamentoOpen, setAgendamentoOpen] = useState(false);
  const [nomeCalculo, setNomeCalculo] = useState('');
  const [dados, setDados] = useState<ROIData>({
    investimentoInicial: 5000,
    investimentoMensal: 2000,
    tempoInvestimento: 12,
    receitaMensal: 15000,
    crescimentoMensal: 10,
    custoPorLead: 50,
    conversao: 3.5
  });

  const [calculo, setCalculo] = useState<CalculoROI | null>(null);
  const [cenarios, setCenarios] = useState<Cenario[]>([
    {
      id: 'cenario-1',
      nome: 'Cenário 1',
      dados: {
        investimentoInicial: 5000,
        investimentoMensal: 2000,
        tempoInvestimento: 12,
        receitaMensal: 15000,
        crescimentoMensal: 10,
        custoPorLead: 50,
        conversao: 3.5
      },
      calculo: null
    }
  ]);
  const [cenarioAtivo, setCenarioAtivo] = useState('cenario-1');

  // Salvar cálculo quando mudar
  useEffect(() => {
    if (calculo && session?.user && nomeCalculo) {
      const timeoutId = setTimeout(async () => {
        try {
          const response = await fetch('/api/roi', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: dados,
              result: calculo,
              name: nomeCalculo,
            }),
          });

          const result = await response.json();

          if (response.ok && result.success) {
            setNomeCalculo('');
          }
        } catch (error) {
          console.error('Erro ao salvar cálculo ROI:', error);
        }
      }, 2000); // Debounce de 2 segundos

      return () => clearTimeout(timeoutId);
    }
  }, [calculo, session, nomeCalculo, dados]);

  // Função auxiliar para calcular ROI de um conjunto de dados
  const calcularROIFromData = useCallback((dadosCalc: ROIData): CalculoROI => {
    const { investimentoInicial, investimentoMensal, tempoInvestimento, receitaMensal, crescimentoMensal } = dadosCalc;
    
    const receitaProjetada = [];
    const investimentoProjetado = [];
    const lucroProjetado = [];
    
    let receitaAtual = receitaMensal;
    let investimentoTotal = investimentoInicial;
    let receitaTotal = 0;
    
    for (let mes = 1; mes <= tempoInvestimento; mes++) {
      receitaProjetada.push(receitaAtual);
      investimentoProjetado.push(investimentoMensal);
      lucroProjetado.push(receitaAtual - investimentoMensal);
      
      receitaTotal += receitaAtual;
      investimentoTotal += investimentoMensal;
      
      receitaAtual *= (1 + crescimentoMensal / 100);
    }
    
    const lucro = receitaTotal - investimentoTotal;
    const roi = (lucro / investimentoTotal) * 100;
    const payback = investimentoInicial / (receitaMensal - investimentoMensal);
    
    return {
      receitaTotal,
      investimentoTotal,
      lucro,
      roi,
      payback,
      receitaProjetada,
      investimentoProjetado,
      lucroProjetado
    };
  }, []);

  // Calcular ROI para o cenário ativo
  useEffect(() => {
    const cenarioAtual = cenarios.find(c => c.id === cenarioAtivo);
    if (cenarioAtual) {
      const calculo = calcularROIFromData(cenarioAtual.dados);
      setCalculo(calculo);
      setDados(cenarioAtual.dados);
      
      // Atualizar cálculo no cenário
      setCenarios(prev => prev.map(c => 
        c.id === cenarioAtivo ? { ...c, calculo } : c
      ));
    }
  }, [cenarioAtivo, calcularROIFromData, cenarios]);

  // Recalcular quando dados do cenário ativo mudarem
  useEffect(() => {
    const cenarioAtual = cenarios.find(c => c.id === cenarioAtivo);
    if (cenarioAtual) {
      const dadosAtuais = JSON.stringify(cenarioAtual.dados);
      const dadosNovos = JSON.stringify(dados);
      
      if (dadosAtuais !== dadosNovos) {
        const calculo = calcularROIFromData(dados);
        setCalculo(calculo);
        
        // Atualizar dados e cálculo no cenário
        setCenarios(prev => prev.map(c => 
          c.id === cenarioAtivo ? { ...c, dados, calculo } : c
        ));
      }
    }
  }, [dados, cenarioAtivo, cenarios, calcularROIFromData]);

  const handleInputChange = (field: keyof ROIData, value: string | number) => {
    setDados(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    }));
  };

  // Funções de gerenciamento de cenários
  const adicionarCenario = () => {
    const novoId = `cenario-${Date.now()}`;
    const novoCenario: Cenario = {
      id: novoId,
      nome: `Cenário ${cenarios.length + 1}`,
      dados: {
        investimentoInicial: 5000,
        investimentoMensal: 2000,
        tempoInvestimento: 12,
        receitaMensal: 15000,
        crescimentoMensal: 10,
        custoPorLead: 50,
        conversao: 3.5
      },
      calculo: null
    };
    setCenarios(prev => [...prev, novoCenario]);
    setCenarioAtivo(novoId);
  };

  const removerCenario = (id: string) => {
    if (cenarios.length <= 1) return; // Não permitir remover o último cenário
    setCenarios(prev => prev.filter(c => c.id !== id));
    if (cenarioAtivo === id) {
      const novoAtivo = cenarios.find(c => c.id !== id)?.id || cenarios[0].id;
      setCenarioAtivo(novoAtivo);
    }
  };

  const duplicarCenario = (id: string) => {
    const cenario = cenarios.find(c => c.id === id);
    if (!cenario) return;
    
    const novoId = `cenario-${Date.now()}`;
    const novoCenario: Cenario = {
      ...cenario,
      id: novoId,
      nome: `${cenario.nome} (Cópia)`,
      calculo: cenario.calculo ? calcularROIFromData(cenario.dados) : null
    };
    setCenarios(prev => [...prev, novoCenario]);
    setCenarioAtivo(novoId);
  };

  const renomearCenario = (id: string, novoNome: string) => {
    setCenarios(prev => prev.map(c => 
      c.id === id ? { ...c, nome: novoNome } : c
    ));
  };

  const exportarResultados = () => {
    if (!calculo) return;
    
    const dadosExport = {
      ...dados,
      ...calculo,
      dataCalculo: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dadosExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculadora-roi-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const dadosGrafico = calculo ? calculo.receitaProjetada.map((receita, index) => ({
    mes: `Mês ${index + 1}`,
    receita,
    investimento: calculo.investimentoProjetado[index],
    lucro: calculo.lucroProjetado[index]
  })) : [];

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
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Calculadora de{' '}
              <span className="text-gradient">ROI</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Calcule o retorno sobre investimento do seu marketing digital e veja 
              o potencial de crescimento do seu negócio.
            </p>

            {session?.user && (
              <div className="flex justify-center gap-4">
                <Link href="/calculadora-roi/historico">
                  <Button variant="outline" className="bg-background/50 backdrop-blur-sm">
                    <History className="w-4 h-4 mr-2" />
                    Ver Histórico
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="calculadora" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="calculadora">Calculadora</TabsTrigger>
              <TabsTrigger value="comparacao">
                <GitCompare className="w-4 h-4 mr-2" />
                Comparação
              </TabsTrigger>
              <TabsTrigger value="como-usar">
                <BookOpen className="w-4 h-4 mr-2" />
                Como Usar
              </TabsTrigger>
              <TabsTrigger value="como-medir">
                <Ruler className="w-4 h-4 mr-2" />
                Como Medir
              </TabsTrigger>
              <TabsTrigger value="interpretacao">
                <Lightbulb className="w-4 h-4 mr-2" />
                Interpretação
              </TabsTrigger>
              <TabsTrigger value="resultados">Resultados</TabsTrigger>
            </TabsList>

            <TabsContent value="calculadora">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Formulário */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Parâmetros de Investimento
                    </CardTitle>
                    <CardDescription>
                      Preencha os dados para calcular o ROI do seu marketing digital
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="investimentoInicial">Investimento Inicial (R$)</Label>
                        <Input
                          id="investimentoInicial"
                          type="number"
                          value={dados.investimentoInicial}
                          onChange={(e) => handleInputChange('investimentoInicial', e.target.value)}
                          placeholder="5000"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="investimentoMensal">Investimento Mensal (R$)</Label>
                        <Input
                          id="investimentoMensal"
                          type="number"
                          value={dados.investimentoMensal}
                          onChange={(e) => handleInputChange('investimentoMensal', e.target.value)}
                          placeholder="2000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tempoInvestimento">Tempo de Investimento (meses)</Label>
                        <Select
                          value={dados.tempoInvestimento.toString()}
                          onValueChange={(value) => handleInputChange('tempoInvestimento', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[6, 12, 18, 24, 36].map((meses) => (
                              <SelectItem key={meses} value={meses.toString()}>
                                {meses} meses
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="receitaMensal">Receita Mensal Atual (R$)</Label>
                        <Input
                          id="receitaMensal"
                          type="number"
                          value={dados.receitaMensal}
                          onChange={(e) => handleInputChange('receitaMensal', e.target.value)}
                          placeholder="15000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="crescimentoMensal">Crescimento Mensal (%)</Label>
                        <Input
                          id="crescimentoMensal"
                          type="number"
                          value={dados.crescimentoMensal}
                          onChange={(e) => handleInputChange('crescimentoMensal', e.target.value)}
                          placeholder="10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="custoPorLead">Custo por Lead (R$)</Label>
                        <Input
                          id="custoPorLead"
                          type="number"
                          value={dados.custoPorLead}
                          onChange={(e) => handleInputChange('custoPorLead', e.target.value)}
                          placeholder="50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="conversao">Taxa de Conversão (%)</Label>
                      <Input
                        id="conversao"
                        type="number"
                        value={dados.conversao}
                        onChange={(e) => handleInputChange('conversao', e.target.value)}
                        placeholder="3.5"
                      />
                    </div>

                    {session?.user && (
                      <div className="space-y-2">
                        <Label htmlFor="nomeCalculo">Nome do Cálculo (opcional)</Label>
                        <Input
                          id="nomeCalculo"
                          type="text"
                          value={nomeCalculo}
                          onChange={(e) => setNomeCalculo(e.target.value)}
                          placeholder="Ex: Cenário Base - Q1 2025"
                        />
                        <p className="text-xs text-muted-foreground">
                          Dê um nome ao cálculo para facilitar a identificação no histórico
                        </p>
                      </div>
                    )}

                    <div className="text-sm text-muted-foreground text-center">
                      O cálculo é atualizado automaticamente conforme você altera os valores
                    </div>
                  </CardContent>
                </Card>

                {/* Resultados Rápidos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Resultados Rápidos
                    </CardTitle>
                    <CardDescription>
                      Visualização imediata dos principais indicadores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {calculo ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-primary/10 rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                              {calculo.roi.toFixed(1)}%
                            </div>
                            <div className="text-sm text-muted-foreground">ROI</div>
                          </div>
                          
                          <div className="text-center p-4 bg-green-500/10 rounded-lg">
                            <div className="text-2xl font-bold text-green-500">
                              R$ {calculo.lucro.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Lucro Total</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                            <div className="text-2xl font-bold text-blue-500">
                              R$ {calculo.receitaTotal.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Receita Total</div>
                          </div>
                          
                          <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                            <div className="text-2xl font-bold text-orange-500">
                              {calculo.payback.toFixed(1)} meses
                            </div>
                            <div className="text-sm text-muted-foreground">Payback</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Preencha os dados para ver os resultados
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba: Comparação */}
            <TabsContent value="comparacao">
              <div className="space-y-6">
                {/* Gerenciamento de Cenários */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <GitCompare className="w-5 h-5" />
                          Comparação de Cenários
                        </CardTitle>
                        <CardDescription>
                          Compare múltiplos cenários de ROI lado a lado
                        </CardDescription>
                      </div>
                      <Button onClick={adicionarCenario} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Cenário
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Lista de Cenários */}
                      <div className="flex gap-2 flex-wrap">
                        {cenarios.map((cenario) => (
                          <div
                            key={cenario.id}
                            className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                              cenarioAtivo === cenario.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <button
                              onClick={() => setCenarioAtivo(cenario.id)}
                              className="flex-1 text-left font-medium"
                            >
                              {cenario.nome}
                            </button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const novoNome = prompt('Novo nome:', cenario.nome);
                                if (novoNome) renomearCenario(cenario.id, novoNome);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Info className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => duplicarCenario(cenario.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            {cenarios.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removerCenario(cenario.id)}
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabela Comparativa */}
                {cenarios.filter(c => c.calculo).length > 0 && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Tabela Comparativa</CardTitle>
                        <CardDescription>
                          Métricas principais de cada cenário
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-3 font-semibold">Cenário</th>
                                <th className="text-right p-3 font-semibold">ROI (%)</th>
                                <th className="text-right p-3 font-semibold">Lucro (R$)</th>
                                <th className="text-right p-3 font-semibold">Receita Total (R$)</th>
                                <th className="text-right p-3 font-semibold">Investimento Total (R$)</th>
                                <th className="text-right p-3 font-semibold">Payback (meses)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cenarios
                                .filter(c => c.calculo)
                                .map((cenario) => (
                                  <tr
                                    key={cenario.id}
                                    className={`border-b hover:bg-muted/50 ${
                                      cenarioAtivo === cenario.id ? 'bg-primary/5' : ''
                                    }`}
                                  >
                                    <td className="p-3 font-medium">{cenario.nome}</td>
                                    <td className="text-right p-3">
                                      <span className={`font-bold ${
                                        cenario.calculo!.roi > 100 ? 'text-green-500' :
                                        cenario.calculo!.roi > 50 ? 'text-yellow-500' :
                                        'text-red-500'
                                      }`}>
                                        {cenario.calculo!.roi.toFixed(1)}%
                                      </span>
                                    </td>
                                    <td className="text-right p-3">
                                      R$ {cenario.calculo!.lucro.toLocaleString()}
                                    </td>
                                    <td className="text-right p-3">
                                      R$ {cenario.calculo!.receitaTotal.toLocaleString()}
                                    </td>
                                    <td className="text-right p-3">
                                      R$ {cenario.calculo!.investimentoTotal.toLocaleString()}
                                    </td>
                                    <td className="text-right p-3">
                                      {cenario.calculo!.payback.toFixed(1)}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Gráficos Comparativos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>ROI Comparativo</CardTitle>
                          <CardDescription>
                            Comparação de ROI entre cenários
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={cenarios
                                .filter(c => c.calculo)
                                .map(c => ({
                                  nome: c.nome,
                                  roi: c.calculo!.roi
                                }))}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="nome" />
                              <YAxis />
                              <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                              <Bar dataKey="roi" fill="#FDB714" name="ROI (%)" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Lucro Comparativo</CardTitle>
                          <CardDescription>
                            Comparação de lucro entre cenários
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={cenarios
                                .filter(c => c.calculo)
                                .map(c => ({
                                  nome: c.nome,
                                  lucro: c.calculo!.lucro
                                }))}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="nome" />
                              <YAxis />
                              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                              <Bar dataKey="lucro" fill="#10b981" name="Lucro (R$)" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Evolução Receita vs Investimento</CardTitle>
                          <CardDescription>
                            Projeção mensal comparativa
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                              data={(() => {
                                const cenariosComCalculo = cenarios.filter(c => c.calculo);
                                if (cenariosComCalculo.length === 0) return [];
                                
                                const maxMeses = Math.max(...cenariosComCalculo.map(c => c.calculo!.receitaProjetada.length));
                                const dados = [];
                                
                                for (let mes = 0; mes < maxMeses; mes++) {
                                  const ponto: Record<string, string | number> = { mes: `Mês ${mes + 1}` };
                                  cenariosComCalculo.forEach((cenario) => {
                                    if (mes < cenario.calculo!.receitaProjetada.length) {
                                      ponto[`${cenario.nome}-receita`] = cenario.calculo!.receitaProjetada[mes];
                                      ponto[`${cenario.nome}-investimento`] = cenario.calculo!.investimentoProjetado[mes];
                                    }
                                  });
                                  dados.push(ponto);
                                }
                                
                                return dados;
                              })()}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="mes" />
                              <YAxis />
                              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                              {cenarios
                                .filter(c => c.calculo)
                                .map((cenario, index) => {
                                  const cores = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
                                  return (
                                    <Line
                                      key={`${cenario.id}-receita`}
                                      type="monotone"
                                      dataKey={`${cenario.nome}-receita`}
                                      stroke={cores[index % cores.length]}
                                      strokeWidth={2}
                                      name={`${cenario.nome} - Receita`}
                                    />
                                  );
                                })}
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Exportação Comparativa */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Exportação</CardTitle>
                        <CardDescription>
                          Exporte todos os cenários para análise
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4">
                          <Button
                            onClick={() => {
                              const dadosExport = {
                                cenarios: cenarios
                                  .filter(c => c.calculo)
                                  .map(c => ({
                                    nome: c.nome,
                                    dados: c.dados,
                                    resultado: c.calculo,
                                  })),
                                dataExportacao: new Date().toISOString()
                              };
                              
                              const blob = new Blob([JSON.stringify(dadosExport, null, 2)], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `comparacao-roi-${new Date().toISOString().split('T')[0]}.json`;
                              a.click();
                              URL.revokeObjectURL(url);
                            }}
                            variant="outline"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Comparação (JSON)
                          </Button>
                          <Button
                            onClick={() => {
                              // Exportar como CSV
                              const headers = ['Cenário', 'ROI (%)', 'Lucro (R$)', 'Receita Total (R$)', 'Investimento Total (R$)', 'Payback (meses)'];
                              const rows = cenarios
                                .filter(c => c.calculo)
                                .map(c => [
                                  c.nome,
                                  c.calculo!.roi.toFixed(1),
                                  c.calculo!.lucro.toLocaleString(),
                                  c.calculo!.receitaTotal.toLocaleString(),
                                  c.calculo!.investimentoTotal.toLocaleString(),
                                  c.calculo!.payback.toFixed(1)
                                ]);
                              
                              const csv = [
                                headers.join(','),
                                ...rows.map(row => row.join(','))
                              ].join('\n');
                              
                              const blob = new Blob([csv], { type: 'text/csv' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `comparacao-roi-${new Date().toISOString().split('T')[0]}.csv`;
                              a.click();
                              URL.revokeObjectURL(url);
                            }}
                            variant="outline"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Tabela (CSV)
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {cenarios.filter(c => c.calculo).length === 0 && (
                  <Card>
                    <CardContent className="text-center py-16">
                      <GitCompare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Nenhum cenário calculado</h3>
                      <p className="text-muted-foreground mb-4">
                        Adicione cenários e calcule-os na aba &quot;Calculadora&quot; para comparar
                      </p>
                      <Button onClick={() => {
                        const element = document.querySelector('[value="calculadora"]') as HTMLElement;
                        element?.click();
                      }}>
                        Ir para Calculadora
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Aba: Como Usar */}
            <TabsContent value="como-usar">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Como Usar a Calculadora ROI
                  </CardTitle>
                  <CardDescription>
                    Tutorial passo a passo para calcular o ROI do seu marketing digital
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="passo-1">
                      <AccordionTrigger>Passo 1: Investimento Inicial</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            O investimento inicial é o valor único que você investe no início do projeto. 
                            Pode incluir:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                            <li>Criação de site ou landing page</li>
                            <li>Configuração inicial de ferramentas (Google Ads, Facebook Ads)</li>
                            <li>Design e branding</li>
                            <li>Treinamento da equipe</li>
                          </ul>
                          <p className="text-sm font-medium text-primary mt-4">
                            💡 Dica: Some todos os custos únicos do primeiro mês.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="passo-2">
                      <AccordionTrigger>Passo 2: Investimento Mensal</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            O investimento mensal é o valor recorrente que você investe a cada mês. 
                            Inclua:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                            <li>Gastos com anúncios (Google Ads, Facebook Ads, etc.)</li>
                            <li>Salário de profissionais de marketing</li>
                            <li>Ferramentas e softwares (CRM, analytics, etc.)</li>
                            <li>Conteúdo e produção (vídeos, posts, etc.)</li>
                          </ul>
                          <p className="text-sm font-medium text-primary mt-4">
                            💡 Dica: Use a média dos últimos 3 meses ou projeção realista.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="passo-3">
                      <AccordionTrigger>Passo 3: Receita Mensal Atual</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            A receita mensal atual é quanto sua empresa fatura por mês atualmente. 
                            Use o valor líquido (após impostos e descontos).
                          </p>
                          <div className="bg-primary/10 p-4 rounded-lg mt-4">
                            <p className="text-sm font-semibold mb-2">Exemplos por Setor:</p>
                            <ul className="space-y-2 text-sm">
                              <li><strong>E-commerce:</strong> Faturamento total de vendas online</li>
                              <li><strong>Serviços:</strong> Valor total de contratos fechados</li>
                              <li><strong>Saúde:</strong> Valor total de consultas/agendamentos</li>
                              <li><strong>Educação:</strong> Valor total de matrículas/mensalidades</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="passo-4">
                      <AccordionTrigger>Passo 4: Crescimento Mensal Esperado</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            O crescimento mensal é a porcentagem de aumento esperada na receita a cada mês. 
                            Baseie-se em:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                            <li>Histórico de crescimento da empresa</li>
                            <li>Benchmarks do setor</li>
                            <li>Potencial de mercado</li>
                            <li>Investimento em marketing</li>
                          </ul>
                          <div className="bg-blue-500/10 p-4 rounded-lg mt-4">
                            <p className="text-sm font-semibold mb-2">Benchmarks por Setor:</p>
                            <ul className="space-y-1 text-sm">
                              <li>E-commerce: 5-15% ao mês</li>
                              <li>Serviços: 3-10% ao mês</li>
                              <li>Saúde: 2-8% ao mês</li>
                              <li>Educação: 3-12% ao mês</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="passo-5">
                      <AccordionTrigger>Passo 5: Custo por Lead e Taxa de Conversão</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            <strong>Custo por Lead:</strong> Quanto você gasta para gerar um lead (contato interessado).
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Taxa de Conversão:</strong> Quantos leads se tornam clientes (em %).
                          </p>
                          <div className="bg-green-500/10 p-4 rounded-lg mt-4">
                            <p className="text-sm font-semibold mb-2">Como Calcular:</p>
                            <ul className="space-y-2 text-sm">
                              <li><strong>Custo por Lead:</strong> Gasto total em marketing ÷ Número de leads</li>
                              <li><strong>Taxa de Conversão:</strong> (Clientes fechados ÷ Leads totais) × 100</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba: Como Medir */}
            <TabsContent value="como-medir">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ruler className="w-5 h-5" />
                      Ferramentas de Coleta de Dados
                    </CardTitle>
                    <CardDescription>
                      Ferramentas essenciais para coletar as métricas necessárias
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Google Analytics 4
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            Para medir: Receita, conversões, tráfego, comportamento do usuário
                          </p>
                          <a 
                            href="https://analytics.google.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            Acessar Google Analytics <ExternalLink className="w-3 h-3" />
                          </a>
                        </CardContent>
                      </Card>

                      <Card className="border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Google Ads / Facebook Ads
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            Para medir: Investimento em anúncios, custo por lead, impressões, cliques
                          </p>
                          <div className="flex gap-2">
                            <a 
                              href="https://ads.google.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              Google Ads <ExternalLink className="w-3 h-3" />
                            </a>
                            <span className="text-muted-foreground">|</span>
                            <a 
                              href="https://business.facebook.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              Facebook Ads <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            CRM (Pipedrive, RD Station)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            Para medir: Leads gerados, taxa de conversão, pipeline de vendas
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Use o CRM para rastrear desde o lead até o cliente fechado
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Planilhas (Google Sheets / Excel)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            Para medir: Consolidação de dados, histórico, comparações
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Crie dashboards personalizados para acompanhar KPIs
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>KPIs por Setor</CardTitle>
                    <CardDescription>
                      Métricas de referência para diferentes setores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="ecommerce">
                        <AccordionTrigger>E-commerce</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm">
                            <li><strong>Custo por Lead:</strong> R$ 20-80</li>
                            <li><strong>Taxa de Conversão:</strong> 2-5%</li>
                            <li><strong>Crescimento Mensal:</strong> 5-15%</li>
                            <li><strong>Ticket Médio:</strong> R$ 100-500</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="servicos">
                        <AccordionTrigger>Serviços Profissionais</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm">
                            <li><strong>Custo por Lead:</strong> R$ 50-200</li>
                            <li><strong>Taxa de Conversão:</strong> 3-8%</li>
                            <li><strong>Crescimento Mensal:</strong> 3-10%</li>
                            <li><strong>Ticket Médio:</strong> R$ 500-5.000</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="saude">
                        <AccordionTrigger>Saúde</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm">
                            <li><strong>Custo por Lead:</strong> R$ 30-150</li>
                            <li><strong>Taxa de Conversão:</strong> 5-15%</li>
                            <li><strong>Crescimento Mensal:</strong> 2-8%</li>
                            <li><strong>Ticket Médio:</strong> R$ 200-1.000</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="educacao">
                        <AccordionTrigger>Educação</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm">
                            <li><strong>Custo por Lead:</strong> R$ 40-120</li>
                            <li><strong>Taxa de Conversão:</strong> 4-12%</li>
                            <li><strong>Crescimento Mensal:</strong> 3-12%</li>
                            <li><strong>Ticket Médio:</strong> R$ 300-2.000</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba: Interpretação */}
            <TabsContent value="interpretacao">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      O Que Significa Cada Resultado
                    </CardTitle>
                    <CardDescription>
                      Entenda o significado de cada métrica calculada
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="roi">
                        <AccordionTrigger>ROI (Retorno sobre Investimento)</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                              O ROI mostra quanto você ganha para cada R$ 1,00 investido. 
                              É calculado como: <strong>(Lucro ÷ Investimento Total) × 100</strong>
                            </p>
                            <div className="bg-primary/10 p-4 rounded-lg">
                              <p className="text-sm font-semibold mb-2">Interpretação:</p>
                              <ul className="space-y-1 text-sm">
                                <li>✅ <strong>ROI &gt; 100%:</strong> Excelente! Você está ganhando mais do que investiu</li>
                                <li>⚠️ <strong>ROI 50-100%:</strong> Bom retorno, mas pode melhorar</li>
                                <li>❌ <strong>ROI &lt; 50%:</strong> Precisa otimizar estratégias ou ajustar investimento</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="payback">
                        <AccordionTrigger>Payback (Tempo de Retorno)</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                              O Payback indica em quantos meses você recupera o investimento inicial. 
                              Quanto menor, melhor!
                            </p>
                            <div className="bg-green-500/10 p-4 rounded-lg">
                              <p className="text-sm font-semibold mb-2">Exemplos:</p>
                              <ul className="space-y-1 text-sm">
                                <li>✅ <strong>Payback &lt; 6 meses:</strong> Retorno muito rápido</li>
                                <li>✅ <strong>Payback 6-12 meses:</strong> Retorno bom e sustentável</li>
                                <li>⚠️ <strong>Payback &gt; 12 meses:</strong> Retorno mais lento, avalie estratégias</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="lucro">
                        <AccordionTrigger>Lucro Líquido</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                              O lucro líquido é a diferença entre a receita total e o investimento total. 
                              É o dinheiro que sobra após todos os custos.
                            </p>
                            <p className="text-sm font-medium text-primary">
                              💡 Use este valor para planejar reinvestimentos e crescimento.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="graficos">
                        <AccordionTrigger>Como Interpretar os Gráficos</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-semibold mb-2">📈 Evolução da Receita vs Investimento:</p>
                              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                                <li>• A linha azul mostra sua receita projetada</li>
                                <li>• A linha vermelha mostra seu investimento</li>
                                <li>• Quando a linha azul está acima da vermelha, você está lucrando</li>
                                <li>• A distância entre as linhas mostra o lucro mensal</li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm font-semibold mb-2">📊 Lucro Mensal Projetado:</p>
                              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                                <li>• Cada barra verde mostra o lucro de um mês</li>
                                <li>• Barras maiores = mais lucro</li>
                                <li>• Tendência crescente = crescimento sustentável</li>
                                <li>• Use para identificar meses de maior retorno</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Próximos Passos Baseados no ROI</CardTitle>
                    <CardDescription>
                      Ações recomendadas conforme seu resultado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold mb-2">Se ROI &gt; 100%:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>✅ Aumente o investimento para escalar resultados</li>
                          <li>✅ Teste novos canais de marketing</li>
                          <li>✅ Otimize campanhas que estão performando bem</li>
                          <li>✅ Reinvesta parte do lucro em crescimento</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-yellow-500 pl-4">
                        <h4 className="font-semibold mb-2">Se ROI 50-100%:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>⚠️ Otimize campanhas de baixa performance</li>
                          <li>⚠️ Melhore a taxa de conversão</li>
                          <li>⚠️ Reduza custo por lead</li>
                          <li>⚠️ Teste novas estratégias de conteúdo</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-red-500 pl-4">
                        <h4 className="font-semibold mb-2">Se ROI &lt; 50%:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>❌ Reavalie sua estratégia de marketing</li>
                          <li>❌ Foque em melhorar a qualidade dos leads</li>
                          <li>❌ Otimize o funil de conversão</li>
                          <li>❌ Considere reduzir investimento em canais ineficazes</li>
                          <li>❌ Busque consultoria especializada</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resultados">
              {calculo ? (
                <div className="space-y-8">
                  {/* Resumo Executivo */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Resumo Executivo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg">
                          <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-3xl font-bold text-primary">
                            {calculo.roi.toFixed(1)}%
                          </div>
                          <div className="text-sm text-muted-foreground">ROI Total</div>
                        </div>
                        
                        <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-lg">
                          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <div className="text-3xl font-bold text-green-500">
                            R$ {calculo.lucro.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Lucro Líquido</div>
                        </div>
                        
                        <div className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg">
                          <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <div className="text-3xl font-bold text-blue-500">
                            R$ {calculo.receitaTotal.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Receita Total</div>
                        </div>
                        
                        <div className="text-center p-6 bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-lg">
                          <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                          <div className="text-3xl font-bold text-orange-500">
                            {calculo.payback.toFixed(1)}
                          </div>
                          <div className="text-sm text-muted-foreground">Meses Payback</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráficos */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Evolução da Receita vs Investimento</CardTitle>
                        <CardDescription>
                          Projeção mensal dos valores
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={dadosGrafico}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                            <Line 
                              type="monotone" 
                              dataKey="receita" 
                              stroke="#3b82f6" 
                              strokeWidth={2}
                              name="Receita"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="investimento" 
                              stroke="#ef4444" 
                              strokeWidth={2}
                              name="Investimento"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Lucro Mensal Projetado</CardTitle>
                        <CardDescription>
                          Evolução do lucro ao longo do tempo
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={dadosGrafico}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                            <Bar dataKey="lucro" fill="#10b981" name="Lucro" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Ações */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ações</CardTitle>
                      <CardDescription>
                        Exporte os resultados ou agende uma consultoria
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button onClick={exportarResultados} variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Resultados
                          </Button>
                          <Button 
                            className="bg-gradient-to-r from-primary to-yellow-500"
                            onClick={() => setAgendamentoOpen(true)}
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Agendar Consultoria
                          </Button>
                        </div>
                        
                        {calculo && (
                          <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground mb-3">Compartilhar resultado:</p>
                            <ShareButtons
                              url={typeof window !== 'undefined' ? window.location.href : ''}
                              title={`Meu ROI de Marketing Digital: ${calculo.roi.toFixed(1)}%`}
                              description={`Calculei meu ROI usando a calculadora da Orbee Labs. Resultado: ${calculo.roi.toFixed(1)}% de retorno sobre investimento!`}
                              size="sm"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-16">
                    <Calculator className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum cálculo realizado</h3>
                    <p className="text-muted-foreground mb-4">
                      Preencha os dados na aba &ldquo;Calculadora&rdquo; para ver os resultados
                    </p>
                    <Button onClick={() => {
                      const element = document.querySelector('[value="calculadora"]') as HTMLElement;
                      element?.click();
                    }}>
                      Ir para Calculadora
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <AgendamentoModal 
        open={agendamentoOpen} 
        onClose={() => setAgendamentoOpen(false)}
        tipoConsulta="Consultoria ROI"
      />
    </PageLayout>
  );
}
