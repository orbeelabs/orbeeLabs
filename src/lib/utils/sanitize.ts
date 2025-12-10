/**
 * Utilitário de Sanitização HTML
 * Protege contra XSS (Cross-Site Scripting) attacks
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitiza HTML removendo scripts e tags perigosas
 * @param html - String HTML a ser sanitizada
 * @param allowBasicFormatting - Se true, permite formatação básica (strong, em, etc)
 * @returns String HTML sanitizada
 */
export function sanitizeHtml(html: string, allowBasicFormatting: boolean = false): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const config: DOMPurify.Config = {
    ALLOWED_TAGS: allowBasicFormatting 
      ? ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li']
      : [],
    ALLOWED_ATTR: allowBasicFormatting
      ? ['href', 'target', 'rel']
      : [],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_TRUSTED_TYPE: false,
  };

  return DOMPurify.sanitize(html, config);
}

/**
 * Sanitiza texto simples removendo HTML
 * @param text - Texto a ser sanitizado
 * @returns Texto sem HTML
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Remove todas as tags HTML
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
  });
}

/**
 * Sanitiza URL removendo javascript: e data: URLs perigosas
 * @param url - URL a ser sanitizada
 * @returns URL sanitizada ou string vazia se inválida
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const trimmed = url.trim();
  
  // Bloquear javascript: e data: URLs
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) {
    return '';
  }

  // Validar formato de URL
  try {
    const urlObj = new URL(trimmed);
    // Permitir apenas http e https
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return '';
    }
    return trimmed;
  } catch {
    // Se não for URL válida, retornar vazio
    return '';
  }
}

/**
 * Sanitiza objeto com múltiplos campos
 * @param data - Objeto com dados a serem sanitizados
 * @param fields - Campos que devem ser sanitizados como HTML
 * @returns Objeto sanitizado
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  data: T,
  fields: (keyof T)[]
): T {
  const sanitized = { ...data };
  
  for (const field of fields) {
    if (sanitized[field] && typeof sanitized[field] === 'string') {
      sanitized[field] = sanitizeText(sanitized[field]) as T[keyof T];
    }
  }
  
  return sanitized;
}

