import { NextRequest, NextResponse } from 'next/server';
import { Logger } from '@/lib/logger';

interface ScreenshotRequest {
  url: string;
  device?: 'iphone' | 'ipad' | 'desktop';
  width?: number;
  height?: number;
}

/**
 * API Route para gerar screenshots usando Microlink
 * POST /api/screenshot
 * Body: { url: string, device?: 'iphone' | 'ipad' | 'desktop' }
 */
export async function POST(request: NextRequest) {
  try {
    const body: ScreenshotRequest = await request.json();
    const { url, device = 'iphone' } = body;

    // Validar URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL é obrigatória' },
        { status: 400 }
      );
    }

    // Validar formato de URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'URL inválida' },
        { status: 400 }
      );
    }

    // Configurações por dispositivo
    const deviceConfigs = {
      iphone: {
        width: 375,
        height: 812,
        device: 'iphone',
      },
      ipad: {
        width: 768,
        height: 1024,
        device: 'ipad',
      },
      desktop: {
        width: 1920,
        height: 1080,
        device: 'desktop',
      },
    };

    const config = deviceConfigs[device] || deviceConfigs.iphone;

    // Usar ScreenshotAPI.net - API que realmente gera screenshots
    // URL da API: https://shot.screenshotapi.net/v3/screenshot
    // Documentação: https://screenshotapi.net/docs
    const screenshotApiKey = process.env.SCREENSHOT_API_KEY || '';
    
    if (!screenshotApiKey) {
      Logger.warn('SCREENSHOT_API_KEY não configurada', {
        url,
        device,
      });
      
      // Não revelar que é uma API key específica ou onde encontrar
      return NextResponse.json(
        { 
          error: 'Serviço de screenshot não configurado. Entre em contato com o administrador.',
        },
        { status: 500 }
      );
    }
    
    // Construir URL da API ScreenshotAPI.net
    // Formato: https://shot.screenshotapi.net/v3/screenshot?token=...&url=...&output=image&file_type=png
    const screenshotUrl = new URL('https://shot.screenshotapi.net/v3/screenshot');
    screenshotUrl.searchParams.set('token', screenshotApiKey);
    screenshotUrl.searchParams.set('url', url);
    screenshotUrl.searchParams.set('output', 'image');
    screenshotUrl.searchParams.set('file_type', 'png');
    screenshotUrl.searchParams.set('wait_for_event', 'load');
    screenshotUrl.searchParams.set('viewport_width', config.width.toString());
    screenshotUrl.searchParams.set('viewport_height', config.height.toString());
    screenshotUrl.searchParams.set('fresh', 'true'); // Sempre gerar screenshot novo
    
    // Adicionar parâmetros específicos para mobile vs desktop
    if (device === 'iphone' || device === 'ipad') {
      // Para mobile, usar user agent mobile e viewport menor
      screenshotUrl.searchParams.set('user_agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
      screenshotUrl.searchParams.set('device_scale_factor', '2');
    } else {
      // Para desktop, usar user agent desktop e viewport maior
      screenshotUrl.searchParams.set('user_agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      screenshotUrl.searchParams.set('device_scale_factor', '1');
    }
    
    // Headers para a requisição
    const headers: HeadersInit = {
      'Accept': 'image/png',
    };
    
    const response = await fetch(screenshotUrl.toString(), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      Logger.error('Erro ao gerar screenshot', {
        url,
        device,
        status: response.status,
        error: errorText.substring(0, 200),
      });
      
      return NextResponse.json(
        { error: `Erro ao gerar screenshot: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    // Verificar Content-Type
    const contentType = response.headers.get('content-type') || '';
    
    // Se retornou JSON em vez de imagem, pode ser metadados do Microlink
    if (contentType.includes('application/json')) {
      const jsonData = await response.json();
      
      // Microlink retornou JSON com metadados
      // NÃO vamos usar a imagem do Open Graph (jsonData.data.image.url) porque é apenas o logo
      // Precisamos de um screenshot real, não a imagem do Open Graph
      Logger.warn('Microlink retornou JSON com metadados em vez de screenshot', {
        url,
        device,
        hasImageUrl: !!jsonData.data?.image?.url,
      });
      
      // Retornar erro informando que precisamos de uma API que gere screenshots reais
      Logger.warn('API retornou JSON com metadados em vez de screenshot', {
        url,
        device,
        hasImageUrl: !!jsonData.data?.image?.url,
        dataKeys: Object.keys(jsonData).join(', '),
      });
      
      return NextResponse.json(
        { 
          error: 'A API Microlink retornou metadados em vez de um screenshot real. A imagem exibida é apenas o logo do site (Open Graph), não um screenshot completo.',
          suggestion: 'Serviço de screenshot não disponível. Entre em contato com o administrador.'
        },
        { status: 500 }
      );
    }

    // Obter imagem como buffer
    const imageBuffer = await response.arrayBuffer();
    
    // Verificar se realmente é uma imagem (PNG começa com bytes específicos)
    const uint8Array = new Uint8Array(imageBuffer);
    const isPng = uint8Array[0] === 0x89 && uint8Array[1] === 0x50 && uint8Array[2] === 0x4E && uint8Array[3] === 0x47;
    
    if (!isPng && !contentType.includes('image')) {
      Logger.warn('Resposta não parece ser uma imagem PNG', {
        url,
        device,
        contentType,
        firstBytes: Array.from(uint8Array.slice(0, 10)).join(','),
      });
      
      return NextResponse.json(
        { error: 'A resposta não é uma imagem válida. Pode ser que o site esteja bloqueando screenshots.' },
        { status: 500 }
      );
    }
    
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;

    Logger.info('Screenshot gerado com sucesso', {
      url,
      device,
      size: imageBuffer.byteLength,
    });

    return NextResponse.json({
      success: true,
      screenshot: dataUrl,
      width: config.width,
      height: config.height,
      device,
    });

  } catch (error) {
    Logger.error('Erro inesperado ao gerar screenshot', {
      endpoint: '/api/screenshot',
      method: 'POST',
    }, error as Error);

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/screenshot?url=...&device=...
 * Versão alternativa via query params
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    const device = searchParams.get('device') || 'iphone';

    if (!url) {
      return NextResponse.json(
        { error: 'Parâmetro url é obrigatório' },
        { status: 400 }
      );
    }

    // Reutilizar lógica do POST
    const body = { url, device: device as 'iphone' | 'ipad' | 'desktop' };
    const mockRequest = {
      json: async () => body,
    } as NextRequest;

    return POST(mockRequest);

  } catch (error) {
    Logger.error('Erro ao gerar screenshot via GET', {
      endpoint: '/api/screenshot',
      method: 'GET',
    }, error as Error);

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

