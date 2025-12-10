import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromCode } from '@/lib/google-calendar';
import { Logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(
        new URL('/agendamento?error=no_code', request.url)
      );
    }

    await getTokenFromCode(code);

    // Redirecionar para página de sucesso ou agendamento
    return NextResponse.redirect(
      new URL('/agendamento?success=true', request.url)
    );
  } catch (error) {
    Logger.error('Erro no callback do Google', {
      endpoint: '/api/auth/callback/google',
      method: 'GET',
    }, error as Error);
    return NextResponse.redirect(
      new URL('/agendamento?error=auth_failed', request.url)
    );
  }
}

