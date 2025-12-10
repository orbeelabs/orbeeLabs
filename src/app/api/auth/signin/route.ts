/**
 * API Route para login com rate limiting
 * Protege contra brute force attacks
 */

import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/auth';
import { checkRateLimit } from '@/lib/api/rate-limit-redis';
import { createErrorResponse } from '@/lib/api';
import { Logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    // Verificar rate limiting
    // Usar mesmo sistema de rate limiting, mas com limites específicos
    await checkRateLimit(request, 'contact'); // Reutilizar lógica
    
    // Verificar se excedeu limite de login (mais restritivo)
    // TODO: Implementar rate limiting específico para login no sistema principal
    
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return createErrorResponse('Email e senha são obrigatórios', null, 400);
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      Logger.warn('Tentativa de login falhou', {
        emailPrefix: email.substring(0, 3) + '***',
        message: result.error,
      });
      return createErrorResponse('Credenciais inválidas', null, 401);
    }

    Logger.info('Login bem-sucedido', {
      emailPrefix: email.substring(0, 3) + '***',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    Logger.error('Erro no endpoint de login', {
      endpoint: '/api/auth/signin',
      method: 'POST',
    }, error as Error);
    return createErrorResponse('Erro interno do servidor', null, 500);
  }
}

