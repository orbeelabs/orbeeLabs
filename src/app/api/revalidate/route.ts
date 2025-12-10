/**
 * API Route para revalidação de conteúdo (webhook do CMS)
 * 
 * Esta rota é chamada pelo Strapi quando conteúdo é atualizado.
 * Configure o webhook no Strapi para chamar: POST /api/revalidate?secret=...&path=...
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateRoute } from '@/lib/cms';
import { Logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  try {
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');

    // Verificar secret
    const expectedSecret = process.env.REVALIDATE_SECRET;
    if (!expectedSecret) {
      return NextResponse.json(
        { error: 'REVALIDATE_SECRET não configurado' },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Secret inválido' },
        { status: 401 }
      );
    }

    if (!path) {
      return NextResponse.json(
        { error: 'Path é obrigatório' },
        { status: 400 }
      );
    }

    // Revalidar rota
    await revalidateRoute(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    Logger.error('Erro ao revalidar rota', {
      endpoint: '/api/revalidate',
      method: 'POST',
      path: searchParams.get('path'),
    }, error as Error);
    return NextResponse.json(
      { error: 'Erro ao revalidar rota' },
      { status: 500 }
    );
  }
}

