import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UseToastProps {
  successMessage?: string;
  errorMessage?: string;
}

export function useToastNotification({ 
  successMessage = 'Operação realizada com sucesso!',
  errorMessage = 'Erro ao realizar operação'
}: UseToastProps = {}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const showSuccess = useCallback((message?: string) => {
    toast({
      title: "Sucesso!",
      description: message || successMessage,
      variant: "success",
    });
  }, [toast, successMessage]);

  const showError = useCallback((message?: string) => {
    toast({
      title: "Erro",
      description: message || errorMessage,
      variant: "destructive",
    });
  }, [toast, errorMessage]);

  const executeWithToast = useCallback(async <T>(
    operation: () => Promise<T>,
    customSuccessMessage?: string,
    customErrorMessage?: string
  ): Promise<T | null> => {
    setIsLoading(true);
    try {
      const result = await operation();
      showSuccess(customSuccessMessage);
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : customErrorMessage || errorMessage;
      showError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showSuccess, showError, errorMessage]);

  return {
    isLoading,
    showSuccess,
    showError,
    executeWithToast
  };
}

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && !hasIntersected) {
          setHasIntersected(true);
        }
        
        if (triggerOnce && isVisible) {
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
}

interface UseMediaQueryProps {
  query: string;
}

export function useMediaQuery({ query }: UseMediaQueryProps) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

interface UseCopyToClipboardProps {
  timeout?: number;
}

export function useCopyToClipboard({ timeout = 2000 }: UseCopyToClipboardProps = {}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      if (timeout > 0) {
        setTimeout(() => setCopied(false), timeout);
      }
    } catch (error) {
      console.error('Erro ao copiar para clipboard:', error);
    }
  }, [timeout]);

  return { copied, copy };
}
