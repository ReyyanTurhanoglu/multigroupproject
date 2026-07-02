import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const protectedRoutes = ['/checkout', '/profile', '/orders', '/cart'];


const adminRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;


    let session = null;
    try {
        const cookie = request.cookies.get('session')?.value;
        if (cookie) session = JSON.parse(decodeURIComponent(cookie));
    } catch (err) {
        session = null;
    }


    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    if (isProtectedRoute && !session) {

        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }


    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    if (isAdminRoute) {
        if (!session || session.role !== 'admin') {
            // Yetkisiz erişim durumunda kullanıcıyı ana sayfaya fırlatıyoruz
            const homeUrl = new URL('/', request.url);
            return NextResponse.redirect(homeUrl);
        }
    }


    return NextResponse.next();
}


export const config = {
    matcher: [
        '/checkout/:path*',
        '/profile/:path*',
        '/orders/:path*',
        '/cart/:path*',
        '/admin/:path*'
    ],
};