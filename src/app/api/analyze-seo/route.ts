import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { seoAnalyzer } from '@/lib/seo-analyzer';
import { getCRMAdapter } from '@/lib/integrations/crm/factory';
import { logApiSuccess, Logger, logApiError } from '@/lib/logger';
import { withRateLimit } from '@/lib/api';

async function handleAnalyzeSEO(request: NextRequest) {
  try {
    const { url, formData } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
    }

    // Usar o SEOAnalyzer para fazer a análise completa
    Logger.info('Iniciando análise SEO', { url });
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
      Logger.info('Auditoria SEO salva no banco', { auditId, url: result.url });
    } catch (dbError) {
      // Não quebrar a API se a persistência falhar
      Logger.error('Erro ao salvar auditoria no banco (continua funcionando)', {
        url: result.url,
      }, dbError as Error);
    }

    // Enviar para CRM se dados do formulário foram fornecidos
    if (formData && formData.email && formData.nomeEmpresa) {
      const crmAdapter = getCRMAdapter();
      try {
        const crmResponse = await crmAdapter.createContact({
          name: formData.nomeEmpresa,
          email: formData.email,
          phone: formData.telefone,
          company: formData.nomeEmpresa,
          website: url,
          message: `Auditoria SEO solicitada. Objetivo: ${formData.objetivo || 'N/A'}. Setor: ${formData.setor || 'N/A'}.`,
          source: 'seo-audit',
          tags: ['lead', 'seo-audit', 'auditoria', formData.setor || 'geral'],
          customFields: {
            cf_setor: formData.setor,
            cf_faturamento: formData.faturamento,
            cf_objetivo: formData.objetivo,
            cf_palavras_chave: formData.palavrasChave,
            cf_concorrentes: formData.concorrentes,
            cf_seo_score: result.overallScore.toString(),
          },
        });

        if (crmResponse.success) {
          logApiSuccess('CRM', 'createContact (SEO Audit)', { 
            auditId: auditId || undefined, 
            crmContactId: crmResponse.contactId 
          });
        } else {
          Logger.warn('CRM retornou erro (não bloqueia)', {
            auditId: auditId || undefined,
            error: crmResponse.error,
          });
        }
      } catch (crmError) {
        // Não quebrar o fluxo se CRM falhar
        Logger.error('Erro ao enviar para CRM (não bloqueia)', {
          auditId: auditId || undefined,
        }, crmError as Error);
      }
    }

    // Retornar resultado com ID da auditoria (se foi salva)
    return NextResponse.json({
      ...result,
      auditId, // Incluir ID da auditoria salva (null se falhou)
    });

  } catch (error) {
    logApiError(error as Error, '/api/analyze-seo', 'POST', { message: 'Erro na análise SEO' });
    
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

export const POST = withRateLimit('seo', handleAnalyzeSEO);
