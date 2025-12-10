/**
 * Utilitário para compartilhamento de conteúdo
 * Funciona com Web Share API (nativo) e fallback para clipboard
 */

export interface ShareOptions {
  title: string;
  text?: string;
  url: string;
}

export async function shareContent({ title, text, url }: ShareOptions): Promise<boolean> {
  // Usar Web Share API se disponível (principalmente em mobile)
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title,
        text: text || '',
        url,
      });
      return true;
    } catch (error) {
      // Usuário cancelou ou erro na API nativa
      // Continuar com fallback
      if ((error as Error).name !== 'AbortError') {
        console.log('Erro ao compartilhar via Web Share API:', error);
      }
    }
  }

  // Fallback: copiar URL para clipboard
  try {
    await navigator.clipboard.writeText(url);
    
    // Mostrar feedback ao usuário (se estiver em contexto de UI)
    if (typeof window !== 'undefined') {
      // Pode usar toast/notification aqui se disponível
      console.log('URL copiada para a área de transferência!');
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao copiar URL:', error);
    return false;
  }
}

