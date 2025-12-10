// Re-exportar do rate-limit-redis.ts (com suporte a Redis/Upstash)
// Este arquivo mantém compatibilidade com código existente
export {
  checkRateLimit,
  withRateLimit,
  cleanupRateLimits,
  RATE_LIMITS,
  type RateLimitResult,
} from './rate-limit-redis';
