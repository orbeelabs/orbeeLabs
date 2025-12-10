/**
 * Cliente para integração com FastAPI Backend
 */

import { Logger } from '@/lib/logger';

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';
const FASTAPI_SECRET = process.env.FASTAPI_SECRET;

if (!FASTAPI_SECRET) {
  Logger.warn('FASTAPI_SECRET não configurado. Integração com FastAPI não funcionará.');
}

interface FastAPIOptions {
  endpoint: string;
  method?: 'GET' | 'POST';
  body?: Record<string, unknown> | unknown[];
}

/**
 * Faz requisição para o FastAPI Backend
 */
export async function callFastAPI<T = unknown>({
  endpoint,
  method = 'POST',
  body,
}: FastAPIOptions): Promise<T> {
  if (!FASTAPI_SECRET) {
    throw new Error('FASTAPI_SECRET não configurado');
  }

  const url = `${FASTAPI_URL}${endpoint}`;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Secret': FASTAPI_SECRET,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    throw new Error(error.detail || `Erro ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Análise SEO via FastAPI
 */
export async function analyzeSEOWithFastAPI(url: string, options?: {
  include_technical?: boolean;
  include_content?: boolean;
  include_performance?: boolean;
}) {
  return callFastAPI({
    endpoint: '/api/v1/analyze-seo',
    body: {
      url,
      include_technical: options?.include_technical ?? true,
      include_content: options?.include_content ?? true,
      include_performance: options?.include_performance ?? true,
    },
  });
}

/**
 * Cálculo ROI via FastAPI
 */
export async function calculateROIWithFastAPI(data: {
  investimento_inicial: number;
  investimento_mensal?: number;
  receita_mensal: number;
  custo_operacional?: number;
  periodo_meses?: number;
  taxa_desconto?: number;
}) {
  return callFastAPI({
    endpoint: '/api/v1/calculate-roi',
    body: data,
  });
}

/**
 * Geração de conteúdo via FastAPI
 */
export async function generateContentWithFastAPI(data: {
  topic: string;
  content_type?: string;
  tone?: string;
  length?: string;
  keywords?: string[];
  target_audience?: string;
}) {
  return callFastAPI({
    endpoint: '/api/v1/generate-content',
    body: {
      topic: data.topic,
      content_type: data.content_type || 'blog_post',
      tone: data.tone || 'professional',
      length: data.length || 'medium',
      keywords: data.keywords || [],
      target_audience: data.target_audience,
    },
  });
}

/**
 * Health check do FastAPI
 */
export async function checkFastAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${FASTAPI_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

