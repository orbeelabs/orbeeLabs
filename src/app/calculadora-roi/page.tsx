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
import { useToast } from '@/components/ui/use-toast';
// import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, DollarSign, Target, BarChart3, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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

export default function CalculadoraROI() {
  const { toast } = useToast();
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
  const [isCalculating, setIsCalculating] = useState(false);

  const calcularROI = useCallback(() => {
    setIsCalculating(true);
    
    // Simular cálculo (em produção, seria mais complexo)
    setTimeout(async () => {
      const { investimentoInicial, investimentoMensal, tempoInvestimento, receitaMensal, crescimentoMensal } = dados;
      
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
      
      const resultadoCalculo = {
        receitaTotal,
        investimentoTotal,
        lucro,
        roi,
        payback,
        receitaProjetada,
        investimentoProjetado,
        lucroProjetado
      };
      
      setCalculo(resultadoCalculo);
      
      // Salvar cálculo no banco de dados
      try {
        const response = await fetch('/api/roi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: dados,
            result: resultadoCalculo,
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Opcional: mostrar mensagem de sucesso (silencioso por padrão)
          // toast({
          //   title: "Sucesso!",
          //   description: "Cálculo salvo com sucesso.",
          // });
        }
      } catch (error) {
        // Erro silencioso - não quebra a calculadora se a API falhar
        console.error('Erro ao salvar cálculo ROI (calculadora continua funcionando):', error);
      }
      
      setIsCalculating(false);
    }, 1000);
  }, [dados]);

  useEffect(() => {
    calcularROI();
  }, [dados, calcularROI]);

  const handleInputChange = (field: keyof ROIData, value: string | number) => {
    setDados(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    }));
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
          </motion.div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="calculadora" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="calculadora">Calculadora</TabsTrigger>
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

                    <Button 
                      onClick={calcularROI} 
                      disabled={isCalculating}
                      className="w-full"
                      size="lg"
                    >
                      {isCalculating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Calculando...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4 mr-2" />
                          Calcular ROI
                        </>
                      )}
                    </Button>
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
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={exportarResultados} variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Exportar Resultados
                        </Button>
                        <Button className="bg-gradient-to-r from-primary to-yellow-500">
                          <Target className="w-4 h-4 mr-2" />
                          Agendar Consultoria
                        </Button>
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

    </PageLayout>
  );
}
