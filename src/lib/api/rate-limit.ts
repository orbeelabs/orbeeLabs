import { NextRequest, NextResponse } from 'next/server';
import { createErrorResponse } from './response';

// Rate limiting simples em memória (para produção, usar Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Configurações de rate limiting
const RATE_LIMITS = {
  contact: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  newsletter: { requests: 3, windowMs: 15 * 60 * 1000 }, // 3 requests per 15 minutes
  seo: { requests: 10, windowMs: 60 * 1000 }, // 10 requests per minute
  admin: { requests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
} as const;

// Função para verificar rate limit
export function checkRateLimit(
  request: NextRequest,
  type: keyof typeof RATE_LIMITS
): { allowed: boolean; remaining: number; resetTime: number } {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const key = `${ip}:${type}`;
  const limit = RATE_LIMITS[type];
  const now = Date.now();
  
  const current = rateLimitMap.get(key);
  
  if (!current || now > current.resetTime) {
    // Reset ou primeira requisição
    rateLimitMap.set(key, { count: 1, resetTime: now + limit.windowMs });
    return { allowed: true, remaining: limit.requests - 1, resetTime: now + limit.windowMs };
  }
  
  if (current.count >= limit.requests) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime };
  }
  
  // Incrementar contador
  current.count++;
  rateLimitMap.set(key, current);
  
  return { 
    allowed: true, 
    remaining: limit.requests - current.count, 
    resetTime: current.resetTime 
  };
}

// Middleware para rate limiting
export function withRateLimit(
  type: keyof typeof RATE_LIMITS,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const rateLimit = checkRateLimit(request, type);
    
    if (!rateLimit.allowed) {
      return createErrorResponse(
        'Muitas requisições. Tente novamente mais tarde.',
        { 
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
          remaining: rateLimit.remaining 
        },
        429
      );
    }
    
    const response = await handler(request);
    
    // Adicionar headers de rate limit
    response.headers.set('X-RateLimit-Limit', RATE_LIMITS[type].requests.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
    
    return response;
  };
}

// Função para limpar rate limits expirados (chamar periodicamente)
export function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// Limpar rate limits a cada 5 minutos
setInterval(cleanupRateLimits, 5 * 60 * 1000);
