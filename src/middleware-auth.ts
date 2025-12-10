/**
 * Middleware para proteger rotas de autenticação com rate limiting
 * Aplica rate limiting específico para login antes do NextAuth processar
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, RATE_LIMITS } from '@/lib/api/rate-limit-redis';
import { Logger } from '@/lib/logger';

export async function authRateLimitMiddleware(request: NextRequest) {
  // Aplicar rate limiting apenas para POST em rotas de autenticação
  if (request.method === 'POST' && request.nextUrl.pathname.includes('/api/auth')) {
    const rateLimitResult = await checkRateLimit(request, 'login');
    
    if (!rateLimitResult.allowed) {
      Logger.warn('Rate limit excedido na autenticação', {
        endpoint: request.nextUrl.pathname,
        remaining: rateLimitResult.remaining,
      });
      
      const response = NextResponse.json(
        {
          error: 'Muitas tentativas de login. Tente novamente mais tarde.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        { status: 429 }
      );
      
      response.headers.set('X-RateLimit-Limit', RATE_LIMITS.login.requests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
      response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());
      response.headers.set('Retry-After', Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString());
      
      return response;
    }
  }
  
  return null; // Continuar processamento normal
}

