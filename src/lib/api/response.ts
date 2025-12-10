import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Tipos para respostas padronizadas
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: unknown;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Função para criar respostas de sucesso
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

// Função para criar respostas de erro
export function createErrorResponse(
  error: string,
  details?: unknown,
  status: number = 500
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      details,
    },
    { status }
  );
}

// Função para criar respostas paginadas
export function createPaginatedResponse<T>(
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  },
  message?: string
): NextResponse<PaginatedResponse<T>> {
  return NextResponse.json({
    success: true,
    message,
    data,
    pagination: {
      ...pagination,
      totalPages: Math.ceil(pagination.total / pagination.limit),
    },
  });
}

// Função para validar dados com Zod
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}

// Função para extrair parâmetros de query
export function extractQueryParams(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '50'),
    search: searchParams.get('search'),
    status: searchParams.get('status'),
    sortBy: searchParams.get('sortBy'),
    sortOrder: searchParams.get('sortOrder') as 'asc' | 'desc' | undefined,
  };
}

// Função para criar filtros de busca
export function createSearchFilter(search?: string, fields: string[] = ['name', 'email']) {
  if (!search) return {};
  
  return {
    OR: fields.map(field => ({
      [field]: { contains: search, mode: 'insensitive' as const }
    }))
  };
}

// Função para criar ordenação
export function createOrderBy(sortBy?: string | null, sortOrder: 'asc' | 'desc' | null = 'desc') {
  if (!sortBy) return { createdAt: 'desc' as const };
  return { [sortBy]: sortOrder || 'desc' };
}
