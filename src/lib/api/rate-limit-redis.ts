import { NextRequest } from 'next/server';
import { createErrorResponse } from './response';
import { Logger } from '@/lib/logger';

// Configurações de rate limiting
export const RATE_LIMITS = {
  contact: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  newsletter: { requests: 3, windowMs: 15 * 60 * 1000 }, // 3 requests per 15 minutes
  seo: { requests: 10, windowMs: 60 * 1000 }, // 10 requests per minute
  admin: { requests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
  login: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 tentativas por 15 minutos (proteção contra brute force)
} as const;

// Interface para rate limit result
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

// Interface para Redis client (abstração)
interface RedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, options?: { ex?: number }): Promise<string | null>;
  del(key: string): Promise<number>;
}

// Redis client (será inicializado se UPSTASH_REDIS_REST_URL estiver configurado)
let redisClient: RedisClient | null = null;

// Inicializar Redis client se Upstash estiver configurado
async function getRedisClient(): Promise<RedisClient | null> {
  if (redisClient) {
    return redisClient;
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    // Redis não configurado, retornar null para usar fallback em memória
    return null;
  }

  try {
    // Importar dinamicamente @upstash/redis
    const { Redis } = await import('@upstash/redis');
    redisClient = new Redis({
      url: redisUrl,
      token: redisToken,
    });
    return redisClient;
  } catch (error) {
    Logger.error('Erro ao inicializar Redis', {}, error as Error);
    return null;
  }
}

// Rate limiting em memória (fallback quando Redis não está disponível)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Função para verificar rate limit (com suporte a Redis e fallback em memória)
export async function checkRateLimit(
  request: NextRequest,
  type: keyof typeof RATE_LIMITS
): Promise<RateLimitResult> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             'unknown';
  const key = `ratelimit:${ip}:${type}`;
  const limit = RATE_LIMITS[type];
  const now = Date.now();

  // Tentar usar Redis primeiro
  const redis = await getRedisClient();
  
  if (redis) {
    try {
      // Buscar valor atual do Redis
      const stored = await redis.get(key);
      
      if (stored) {
        const data = JSON.parse(stored) as { count: number; resetTime: number };
        
        if (now > data.resetTime) {
          // Expirou, resetar
          const newData = { count: 1, resetTime: now + limit.windowMs };
          await redis.set(key, JSON.stringify(newData), {
            ex: Math.ceil(limit.windowMs / 1000), // TTL em segundos
          });
          return { allowed: true, remaining: limit.requests - 1, resetTime: newData.resetTime };
        }
        
        if (data.count >= limit.requests) {
          return { allowed: false, remaining: 0, resetTime: data.resetTime };
        }
        
        // Incrementar contador
        data.count++;
        await redis.set(key, JSON.stringify(data), {
          ex: Math.ceil((data.resetTime - now) / 1000),
        });
        
        return {
          allowed: true,
          remaining: limit.requests - data.count,
          resetTime: data.resetTime,
        };
      } else {
        // Primeira requisição
        const newData = { count: 1, resetTime: now + limit.windowMs };
        await redis.set(key, JSON.stringify(newData), {
          ex: Math.ceil(limit.windowMs / 1000),
        });
        return { allowed: true, remaining: limit.requests - 1, resetTime: newData.resetTime };
      }
    } catch (error) {
      Logger.warn('Erro ao usar Redis para rate limiting, usando fallback', {
        type,
      });
      // Fallback para memória em caso de erro
    }
  }

  // Fallback: usar Map em memória
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
    resetTime: current.resetTime,
  };
}

// Middleware para rate limiting
export function withRateLimit(
  type: keyof typeof RATE_LIMITS,
  handler: (request: NextRequest) => Promise<Response>
) {
  return async (request: NextRequest) => {
    const rateLimit = await checkRateLimit(request, type);
    
    if (!rateLimit.allowed) {
      return createErrorResponse(
        'Muitas requisições. Tente novamente mais tarde.',
        {
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
          remaining: rateLimit.remaining,
        },
        429
      );
    }
    
    const response = await handler(request);
    
    // Adicionar headers de rate limit
    if (response instanceof Response) {
      response.headers.set('X-RateLimit-Limit', RATE_LIMITS[type].requests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
      response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
    }
    
    return response;
  };
}

// Função para limpar rate limits expirados (apenas para fallback em memória)
export function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// Limpar rate limits a cada 5 minutos (apenas para fallback)
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimits, 5 * 60 * 1000);
}

