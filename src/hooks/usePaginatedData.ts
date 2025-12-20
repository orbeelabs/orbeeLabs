import { useState, useEffect, useCallback } from 'react';

interface UsePaginatedDataOptions {
  endpoint: string;
  filters?: Record<string, string>;
  enabled?: boolean;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}

export function usePaginatedData<T>({ 
  endpoint, 
  filters = {},
  enabled = true 
}: UsePaginatedDataOptions) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: '1',
        limit: '50',
        ...filters,
      });

      const response = await fetch(`${endpoint}?${params.toString()}`, {
        // Desabilitar cache para evitar problemas com RSC
        cache: 'no-store',
      });
      
      // Se a resposta não for OK, mas não for 404, tentar continuar
      if (!response.ok && response.status !== 404) {
        const result: PaginatedResponse<T> = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Erro ao buscar dados');
      }
      
      // Se for 404, retornar array vazio sem erro
      if (response.status === 404) {
        setData([]);
        setIsLoading(false);
        return;
      }
      
      const result: PaginatedResponse<T> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erro ao buscar dados');
      }

      setData(result.data || []);
    } catch (err) {
      // Silenciar erros 404 e de rede em produção
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      if (errorMessage.includes('404') || errorMessage.includes('Failed to fetch')) {
        // Em caso de 404 ou erro de rede, apenas retornar array vazio
        setData([]);
      } else {
        console.error(`Erro ao buscar dados de ${endpoint}:`, err);
        setError(errorMessage);
        setData([]);
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, enabled, JSON.stringify(filters)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}

