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

  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const isLoggedIn = !!token;
  const isAdmin = token?.role === 'ADMIN';
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Debug apenas em desenvolvimento - não expor email em produção
  if (process.env.NODE_ENV === 'development') {
    Logger.debug('Middleware Debug', {
      endpoint: request.nextUrl.pathname,
      method: request.method,
      isLoggedIn,
      isAdmin,
      isAdminRoute,
      tokenRole: token?.role,
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
      userId: token?.id as string,
    });
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && isLoggedIn && isAdmin) {
    Logger.debug('Acesso autorizado ao admin', {
      endpoint: request.nextUrl.pathname,
      userId: token?.id as string,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/:path*"]
};
