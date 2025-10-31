import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { seoAnalyzer } from '@/lib/seo-analyzer';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
    }

    // Usar o SEOAnalyzer para fazer a análise completa
    console.log(`🔍 Iniciando análise SEO para: ${url}`);
    const result = await seoAnalyzer.analyze(url);

    // Persistir auditoria no banco de dados
    let auditId: string | null = null;
    try {
      const audit = await prisma.seoAudit.create({
        data: {
          url: result.url,
          score: result.overallScore,
          data: JSON.stringify(result),
        },
      });
      auditId = audit.id;
      console.log(`✅ Auditoria SEO salva no banco: ${auditId} para URL: ${result.url}`);
    } catch (dbError) {
      // Não quebrar a API se a persistência falhar
      console.error('⚠️ Erro ao salvar auditoria no banco (continua funcionando):', dbError);
    }

    // Retornar resultado com ID da auditoria (se foi salva)
    return NextResponse.json({
      ...result,
      auditId, // Incluir ID da auditoria salva (null se falhou)
    });

  } catch (error) {
    console.error('Erro na análise SEO:', error);
    
    // Tratar erros específicos do SEOAnalyzer
    if (error instanceof Error) {
      if (error.message.includes('Invalid URL') || error.message.includes('URL inválida')) {
        return NextResponse.json({ 
          error: 'URL inválida. Por favor, verifique se a URL está correta (ex: google.com ou https://google.com)' 
        }, { status: 400 });
      }
      
      if (error.message.includes('Erro ao acessar a URL') || error.message.includes('Não foi possível acessar')) {
        return NextResponse.json({ 
          error: 'Não foi possível acessar o site. Verifique se a URL está correta e se o site está online.' 
        }, { status: 404 });
      }
      
      if (error.message.includes('timeout')) {
        return NextResponse.json({ 
          error: 'Timeout ao acessar o site. Tente novamente.' 
        }, { status: 408 });
      }
    }
    
    return NextResponse.json({ 
      error: 'Erro interno do servidor. Tente novamente mais tarde.' 
    }, { status: 500 });
  }
}
