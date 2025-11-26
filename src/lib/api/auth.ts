import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

// Função para verificar autenticação
export async function requireAuth() {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json(
      { 
        success: false,
        error: "Não autorizado" 
      },
      { status: 401 }
    );
  }
  
  return session;
}

// Função para verificar se é admin
export async function requireAdmin() {
  const session = await requireAuth();
  
  if (session instanceof NextResponse) {
    return session; // Retorna erro de auth
  }
  
  // Verificar se é admin usando role (mais seguro que apenas email)
  if (session.user?.role !== 'ADMIN') {
    return NextResponse.json(
      { 
        success: false,
        error: "Acesso negado. Apenas administradores." 
      },
      { status: 403 }
    );
  }
  
  return session;
}

// Middleware wrapper para APIs protegidas
export function withAuth(handler: (request: NextRequest, session: unknown) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const session = await requireAuth();
    
    if (session instanceof NextResponse) {
      return session; // Retorna erro de auth
    }
    
    return handler(request, session);
  };
}

// Middleware wrapper para APIs de admin
export function withAdmin(handler: (request: NextRequest, session: unknown) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const session = await requireAdmin();
    
    if (session instanceof NextResponse) {
      return session; // Retorna erro de auth/admin
    }
    
    return handler(request, session);
  };
}
