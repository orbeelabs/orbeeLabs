import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
    }

    // Normalizar URL
    let normalizedUrl: string;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = `https://${url}`;
    } else {
      normalizedUrl = url;
    }

    // Validar URL
    new URL(normalizedUrl);

    // Fazer requisição do servidor (sem CORS)
    const response = await axios.get(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)',
      },
      timeout: 10000,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Análise básica de SEO
    const title = $('title').text().trim();
    const description = $('meta[name="description"]').attr('content') || '';
    const viewport = $('meta[name="viewport"]').length > 0;
    const charset = $('meta[charset]').length > 0;
    const robots = $('meta[name="robots"]').length > 0;

    // Análise de headings
    const headings = {
      h1: $('h1').length,
      h2: $('h2').length,
      h3: $('h3').length,
      h4: $('h4').length,
      h5: $('h5').length,
      h6: $('h6').length,
    };

    // Análise de imagens
    const images = $('img');
    const imagesWithoutAlt = images.filter((_, el) => !$(el).attr('alt')).length;

    // Análise de links
    const links = $('a[href]');
    let internalLinks = 0;
    let externalLinks = 0;

    links.each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        try {
          const linkUrl = new URL(href, normalizedUrl);
          if (linkUrl.hostname === new URL(normalizedUrl).hostname) {
            internalLinks++;
          } else {
            externalLinks++;
          }
        } catch {
          // Link inválido
        }
      }
    });

    // Análise de conteúdo
    const textContent = $('body').text().replace(/\s+/g, ' ').trim();
    const wordCount = textContent.split(' ').length;

    // Verificação de HTTPS
    const isHttps = normalizedUrl.startsWith('https://');

    // Análise de Mobile
    const touchFriendly = $('button, a, input').filter((_, el) => {
      const $el = $(el);
      const widthStr = $el.css('width');
      const heightStr = $el.css('height');
      const width = widthStr ? parseInt(widthStr) || 0 : 0;
      const height = heightStr ? parseInt(heightStr) || 0 : 0;
      return width >= 44 && height >= 44;
    }).length > 0;

    // Calcular scores
    const titleScore = title.length >= 30 && title.length <= 60 ? 'good' : 
                      title.length < 30 ? 'warning' : 'error';
    
    const descriptionScore = description.length >= 120 && description.length <= 160 ? 'good' : 
                            description.length < 120 ? 'warning' : 'error';
    
    const headingsScore = headings.h1 === 1 && headings.h2 > 0 ? 'good' : 
                         headings.h1 === 0 ? 'error' : 'warning';
    
    const imagesScore = imagesWithoutAlt === 0 ? 'good' : 
                       imagesWithoutAlt / images.length < 0.3 ? 'warning' : 'error';
    
    const linksScore = internalLinks > 5 ? 'good' : 'warning';
    
    const metaScore = viewport && charset ? 'good' : 'warning';
    
    const mobileScore = viewport && touchFriendly ? 'good' : 'warning';
    
    const securityScore = isHttps ? 'good' : 'error';
    
    const contentScore = wordCount > 300 ? 'good' : 'warning';

    // Calcular score geral
    const scores = [titleScore, descriptionScore, headingsScore, imagesScore, linksScore, metaScore, mobileScore, securityScore, contentScore];
    const goodCount = scores.filter(score => score === 'good').length;
    const warningCount = scores.filter(score => score === 'warning').length;
    const errorCount = scores.filter(score => score === 'error').length;
    
    const overallScore = Math.round((goodCount * 100 + warningCount * 60 + errorCount * 20) / scores.length);

    // Gerar recomendações
    const recommendations: string[] = [];
    
    if (titleScore !== 'good') {
      recommendations.push('Otimize o título da página para 30-60 caracteres');
    }
    if (descriptionScore !== 'good') {
      recommendations.push('Adicione ou otimize a meta description (120-160 caracteres)');
    }
    if (headingsScore !== 'good') {
      recommendations.push('Use uma estrutura de headings adequada (1 H1, múltiplos H2-H6)');
    }
    if (imagesScore !== 'good') {
      recommendations.push('Adicione alt text em todas as imagens');
    }
    if (metaScore !== 'good') {
      recommendations.push('Adicione meta tags essenciais (viewport, charset)');
    }
    if (mobileScore !== 'good') {
      recommendations.push('Otimize o site para dispositivos móveis');
    }
    if (securityScore !== 'good') {
      recommendations.push('Implemente HTTPS');
    }
    if (contentScore !== 'good') {
      recommendations.push('Aumente o conteúdo da página (mínimo 300 palavras)');
    }

    // Gerar issues críticos e warnings
    const criticalIssues: string[] = [];
    const warnings: string[] = [];

    if (titleScore === 'error') {
      criticalIssues.push('Título da página ausente ou muito longo');
    }
    if (securityScore === 'error') {
      criticalIssues.push('Site não está usando HTTPS');
    }
    if (headingsScore === 'error') {
      criticalIssues.push('Estrutura de headings inadequada');
    }

    if (descriptionScore === 'warning') {
      warnings.push('Meta description pode ser otimizada');
    }
    if (imagesScore === 'warning') {
      warnings.push('Algumas imagens não têm alt text');
    }
    if (mobileScore === 'warning') {
      warnings.push('Otimização mobile pode ser melhorada');
    }

    const result = {
      url: normalizedUrl,
      timestamp: new Date().toISOString(),
      performance: {
        score: Math.floor(Math.random() * 40) + 30, // Simulado por enquanto
        metrics: {
          firstContentfulPaint: Math.random() * 2000 + 1000,
          largestContentfulPaint: Math.random() * 3000 + 1500,
          cumulativeLayoutShift: Math.random() * 0.2,
          firstInputDelay: Math.random() * 200 + 50,
        },
      },
      technical: {
        title: {
          text: title,
          length: title.length,
          status: titleScore,
        },
        description: {
          text: description,
          length: description.length,
          status: descriptionScore,
        },
        headings: {
          ...headings,
          status: headingsScore,
        },
        images: {
          total: images.length,
          withoutAlt: imagesWithoutAlt,
          status: imagesScore,
        },
        links: {
          internal: internalLinks,
          external: externalLinks,
          broken: 0,
          status: linksScore,
        },
        metaTags: {
          viewport,
          charset,
          robots,
          status: metaScore,
        },
      },
      mobile: {
        viewport,
        touchFriendly,
        textReadable: true,
        status: mobileScore,
      },
      security: {
        https: isHttps,
        mixedContent: false,
        securityHeaders: [],
        status: securityScore,
      },
      content: {
        wordCount,
        keywordDensity: 0,
        readabilityScore: 0,
        status: contentScore,
      },
      overallScore,
      recommendations,
      criticalIssues,
      warnings,
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erro na análise SEO:', error);
    
    if (error instanceof TypeError && error.message.includes('Invalid URL')) {
      return NextResponse.json({ error: 'URL inválida. Por favor, verifique se a URL está correta' }, { status: 400 });
    } else if (error instanceof Error && error.message.includes('timeout')) {
      return NextResponse.json({ error: 'Timeout ao acessar o site. Tente novamente' }, { status: 408 });
    } else {
      return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
  }
}
