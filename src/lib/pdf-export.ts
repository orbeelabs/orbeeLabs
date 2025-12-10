import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
}

export async function exportAuditToPDF(
  resultado: ResultadoAuditoria,
  dados: AuditoriaData
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Cores da marca Orbee Labs
  const primaryColor: [number, number, number] = [253, 183, 20]; // #FDB714 (amarelo)
  const darkColor: [number, number, number] = [35, 31, 32]; // #231F20 (preto)
  const grayColor: [number, number, number] = [107, 114, 128]; // #6B7280 (cinza)

  // ========== CAPA ==========
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 60, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('AUDITORIA SEO', pageWidth / 2, 30, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Relatório Técnico Completo', pageWidth / 2, 45, { align: 'center' });

  yPosition = 80;

  // Informações da Empresa
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Informações da Empresa', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Empresa: ${dados.nomeEmpresa}`, 20, yPosition);
  yPosition += 6;
  doc.text(`URL: ${dados.url}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Setor: ${dados.setor}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Data da Auditoria: ${new Date().toLocaleDateString('pt-BR')}`, 20, yPosition);
  yPosition += 15;

  // ========== RESUMO EXECUTIVO ==========
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumo Executivo', 20, yPosition);
  yPosition += 10;

  // Score
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  const scoreColor: [number, number, number] = resultado.score >= 80 ? [34, 197, 94] : resultado.score >= 60 ? [234, 179, 8] : [239, 68, 68];
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(`Score: ${resultado.score}/100`, 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);

  // Problemas
  autoTable(doc, {
    startY: yPosition,
    head: [['Tipo', 'Quantidade']],
    body: [
      ['Críticos', resultado.problemas.criticos.toString()],
      ['Importantes', resultado.problemas.importantes.toString()],
      ['Menores', resultado.problemas.menores.toString()],
    ],
    theme: 'striped',
    headStyles: { fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  });

  yPosition = ((doc as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 0) + 15;

  // Verificar se precisa de nova página
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }

  // ========== ANÁLISE DETALHADA ==========
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Análise Detalhada', 20, yPosition);
  yPosition += 10;

  // Função para adicionar categoria de análise
  const addAnalysisCategory = (title: string, items: Array<{ item: string; status: string; descricao: string }>) => {
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(title, 20, yPosition);
    yPosition += 8;

    if (items.length > 0) {
      const tableData = items.map(item => [
        item.item,
        item.status === 'success' ? '✓ OK' : item.status === 'warning' ? '⚠ Atenção' : '✗ Erro',
        item.descricao.substring(0, 80) + (item.descricao.length > 80 ? '...' : ''),
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [['Item', 'Status', 'Descrição']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 30 },
          2: { cellWidth: 'auto' },
        },
        margin: { left: 20, right: 20 },
      });

      yPosition = ((doc as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 0) + 10;
    }
  };

  // Adicionar cada categoria
  addAnalysisCategory('Análise Técnica', resultado.analise.tecnica);
  addAnalysisCategory('Análise de Conteúdo', resultado.analise.conteudo);
  addAnalysisCategory('Performance', resultado.analise.performance);
  addAnalysisCategory('Mobile', resultado.analise.mobile);
  addAnalysisCategory('Segurança', resultado.analise.seguranca);

  // ========== RECOMENDAÇÕES ==========
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Recomendações Prioritárias', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  resultado.recomendacoes.forEach((rec, index) => {
    if (yPosition > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(`${index + 1}. ${rec}`, 25, yPosition);
    yPosition += 6;
  });

  yPosition += 5;

  // ========== PRÓXIMOS PASSOS ==========
  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Próximos Passos', 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  resultado.proximosPassos.forEach((passo, index) => {
    if (yPosition > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }
    doc.text(`${index + 1}. ${passo}`, 25, yPosition);
    yPosition += 6;
  });

  // ========== RODAPÉ ==========
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(
      `Orbee Labs - Auditoria SEO | Página ${i} de ${totalPages} | ${dados.url}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    doc.text(
      `Gerado em ${new Date().toLocaleString('pt-BR')}`,
      pageWidth / 2,
      pageHeight - 5,
      { align: 'center' }
    );
  }

  // Salvar PDF
  const fileName = `auditoria-seo-${dados.nomeEmpresa.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}

