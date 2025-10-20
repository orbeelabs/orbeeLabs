import { useEffect, useState, useCallback } from 'react';

// Hook para definir título da página
export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);
}

// Hook para API calls simplificado

interface UseFormValidationProps<T> {
  initialValues: T;
  validationSchema?: (values: T) => Record<string, string>;
}

export function useFormValidation<T extends Record<string, unknown>>({
  initialValues,
  validationSchema
}: UseFormValidationProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = (name: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro quando usuário digita
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name as string]: '' }));
    }
  };

  const validate = () => {
    if (!validationSchema) return true;
    
    const newErrors = validationSchema(values);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    setValue,
    validate,
    reset
  };
}

interface UseApiProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  immediate?: boolean;
}

export function useApi<T = unknown>({ url, method = 'GET', immediate = false }: UseApiProps) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (body?: unknown) => {
    setLoading(true);
    setError(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro na requisição');
      }

      setData(result.data || result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    data,
    loading,
    error,
    execute,
    refetch: () => execute()
  };
}

interface UseLocalStorageProps<T> {
  key: string;
  initialValue: T;
}

export function useLocalStorage<T>({ key, initialValue }: UseLocalStorageProps<T>) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

interface UseDebounceProps<T> {
  value: T;
  delay: number;
}

export function useDebounce<T>({ value, delay }: UseDebounceProps<T>) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
