'use client';

import { useEffect } from 'react';

/**
 * Componente que filtra warnings e erros específicos do console que são informativos
 * e não afetam a funcionalidade da aplicação.
 * 
 * Filtra:
 * - Warnings de auto-scroll behavior (elementos fixed/sticky)
 * - Warnings de deprecação do Zustand (vem de dependências)
 * - Erros de CSP do Vercel Live (ferramenta de desenvolvimento)
 * - Erros de sessão do Vercel Live (ferramenta de desenvolvimento)
 */
export default function ConsoleFilter() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Salvar a função original do console.warn
    const originalWarn = console.warn;

    // Substituir console.warn e console.error para filtrar warnings/erros específicos
    console.warn = (...args: unknown[]) => {
      // Verificar se o warning é sobre auto-scroll behavior
      const message = String(args[0] || '');
      const fullMessage = args.map(arg => String(arg)).join(' ');
      
      // Filtrar warnings sobre auto-scroll com elementos fixed/sticky
      if (
        (message.includes('Skipping auto-scroll behavior') || 
         fullMessage.includes('Skipping auto-scroll behavior')) &&
        (fullMessage.includes('position: sticky') || 
         fullMessage.includes('position: fixed') ||
         message.includes('position: sticky') ||
         message.includes('position: fixed'))
      ) {
        // Não exibir esse warning específico
        return;
      }

      // Filtrar warnings de deprecação do Zustand
      if (
        (message.includes('[DEPRECATED]') || fullMessage.includes('[DEPRECATED]')) &&
        (fullMessage.includes('zustand') || message.includes('zustand') ||
         fullMessage.includes('Default export is deprecated') ||
         message.includes('Default export is deprecated'))
      ) {
        // Não exibir warnings de deprecação do Zustand (vem de dependências)
        return;
      }

      // Para todos os outros warnings, usar a função original
      originalWarn.apply(console, args);
    };

    // Também filtrar erros do console relacionados ao Vercel Live (CSP)
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const message = String(args[0] || '');
      const fullMessage = args.map(arg => String(arg)).join(' ');
      
      // Filtrar erros de CSP relacionados ao Vercel Live
      if (
        (message.includes('Content Security Policy') || 
         fullMessage.includes('Content Security Policy')) &&
        (fullMessage.includes('vercel.live') || 
         message.includes('vercel.live') ||
         fullMessage.includes('next-live/feedback') ||
         message.includes('next-live/feedback'))
      ) {
        // Não exibir esse erro específico (é temporário durante navegação)
        return;
      }

      // Filtrar erro "Could not fetch session" do Vercel Live
      if (
        (message.includes('Could not fetch session') || 
         fullMessage.includes('Could not fetch session')) &&
        (fullMessage.includes('feedback.html') || 
         message.includes('feedback.html') ||
         fullMessage.includes('vercel.live') ||
         message.includes('vercel.live'))
      ) {
        // Não exibir erro de sessão do Vercel Live (ferramenta de dev)
        return;
      }

      // Para todos os outros erros, usar a função original
      originalError.apply(console, args);
    };

    // Cleanup: restaurar as funções originais quando o componente for desmontado
    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };

  }, []);

  return null;
}

