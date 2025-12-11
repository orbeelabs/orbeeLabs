/**
 * API Route para revalidação de cache do Next.js
 * 
 * Esta rota pode ser usada para revalidar páginas específicas após atualizações.
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
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
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    Logger.error('Erro ao revalidar rota', {
      endpoint: '/api/revalidate',
      method: 'POST',
      path: searchParams.get('path') || undefined,
    }, error as Error);
    return NextResponse.json(
      { error: 'Erro ao revalidar rota' },
      { status: 500 }
    );
  }
}
