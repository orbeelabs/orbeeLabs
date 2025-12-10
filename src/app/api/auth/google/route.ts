import { NextRequest, NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/google-calendar';
import { Logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const authUrl = getAuthUrl();
    return NextResponse.json({ authUrl });
  } catch (error) {
    Logger.error('Erro ao gerar URL de autenticação', {
      endpoint: '/api/auth/google',
      method: 'GET',
    }, error as Error);
    return NextResponse.json(
      { error: 'Erro ao gerar URL de autenticação' },
      { status: 500 }
    );
  }
}

