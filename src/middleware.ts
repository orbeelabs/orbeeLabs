import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const isLoggedIn = !!token;
  const isAdmin = token?.role === 'ADMIN';
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Debug apenas em desenvolvimento - não expor email em produção
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Middleware Debug:', {
      path: request.nextUrl.pathname,
      isLoggedIn,
      isAdmin,
      isAdminRoute,
      tokenRole: token?.role,
      // tokenEmail removido para não expor emails em logs
    });
  }

  if (isAdminRoute && !isLoggedIn) {
    console.log('❌ Redirecionando para login - usuário não logado');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && !isAdmin) {
    console.log('❌ Redirecionando para login - usuário não é admin');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && isLoggedIn && isAdmin) {
    console.log('✅ Acesso autorizado ao admin');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
