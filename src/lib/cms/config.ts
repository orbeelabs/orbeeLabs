/**
 * Configuração do CMS Headless
 * 
 * Para usar Strapi, configure as variáveis de ambiente:
 * - STRAPI_API_URL: URL da API do Strapi (ex: http://localhost:1337/api ou https://seu-strapi.com/api)
 * - STRAPI_API_TOKEN: Token de API do Strapi (opcional, mas recomendado)
 * - CMS_REVALIDATE: Tempo de revalidação em segundos (padrão: 60)
 * 
 * Para usar Prisma (padrão), não configure essas variáveis.
 */

import { Logger } from '@/lib/logger';

export interface CMSConfig {
  provider: 'strapi' | 'prisma';
  apiUrl?: string;
  apiToken?: string;
  revalidate: number;
}

export function getCMSConfig(): CMSConfig {
  const provider = process.env.CMS_PROVIDER || 'prisma';
  const apiUrl = process.env.STRAPI_API_URL;
  const apiToken = process.env.STRAPI_API_TOKEN;
  const revalidate = parseInt(process.env.CMS_REVALIDATE || '60', 10);

  if (provider === 'strapi' && !apiUrl) {
    Logger.warn('CMS_PROVIDER está configurado como "strapi" mas STRAPI_API_URL não está definido. Usando Prisma como fallback.');
    return {
      provider: 'prisma',
      revalidate: 60,
    };
  }

  return {
    provider: provider as 'strapi' | 'prisma',
    apiUrl,
    apiToken,
    revalidate,
  };
}

export const cmsConfig = getCMSConfig();

