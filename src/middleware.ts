import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// rotas privadas que exigem login
const protectedRoutes = ['/dashboard', '/pedidos'];

export function middleware(req: NextRequest) {
  // pegar cookie pelo nome exato que você setou
  const token = req.cookies.get('nextauth.token')?.value;

  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // se for rota protegida e não tiver token, redireciona pro login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // se tentar acessar login estando logado, redireciona pro dashboard
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
