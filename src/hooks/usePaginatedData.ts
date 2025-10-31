import { useState, useEffect, useCallback, useMemo } from 'react';

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

      const response = await fetch(`${endpoint}?${params.toString()}`);
      const result: PaginatedResponse<T> = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Erro ao buscar dados');
      }

      setData(result.data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error(`Erro ao buscar dados de ${endpoint}:`, err);
      setError(errorMessage);
      setData([]);
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

