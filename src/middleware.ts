import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Logger } from "@/lib/logger";
import { authRateLimitMiddleware } from "./middleware-auth";

export async function middleware(request: NextRequest) {
  // Aplicar rate limiting em rotas de autenticação
  const authRateLimit = await authRateLimitMiddleware(request);
  if (authRateLimit) {
    return authRateLimit;
  }

  // Usar getToken do next-auth/jwt no middleware (forma correta para NextAuth v5)
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Converter token para formato de sessão
  const session = token ? {
    user: {
      id: token.id as string,
      email: token.email as string,
      name: token.name as string,
      role: token.role as string,
    }
  } : null;
  
  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === 'ADMIN';
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Debug apenas em desenvolvimento - não expor email em produção
  if (process.env.NODE_ENV === 'development') {
    Logger.debug('Middleware Debug', {
      endpoint: request.nextUrl.pathname,
      method: request.method,
      isLoggedIn,
      isAdmin,
      isAdminRoute,
      userRole: session?.user?.role || undefined,
      userId: session?.user?.id || undefined,
    });
  }

  if (isAdminRoute && !isLoggedIn) {
    Logger.warn('Acesso negado - usuário não autenticado', {
      endpoint: request.nextUrl.pathname,
      method: request.method,
    });
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && !isAdmin) {
    Logger.warn('Acesso negado - usuário não é admin', {
      endpoint: request.nextUrl.pathname,
      method: request.method,
      userId: session?.user?.id as string,
    });
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && isLoggedIn && isAdmin) {
    Logger.debug('Acesso autorizado ao admin', {
      endpoint: request.nextUrl.pathname,
      userId: session?.user?.id as string,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/:path*"]
};
