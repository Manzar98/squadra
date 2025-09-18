import { createClient } from '@/lib/supabase/auth/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request)

    // Refresh session if expired
    const {
      data: { user },
    } = await supabase.auth.getUser()
    
    const protectedRoutes = ['/dashboard']
    const authRoutes = ['/login', '/signup', '/reset-password']

    const isProtectedRoute = protectedRoutes.some(route =>
      request.nextUrl.pathname.startsWith(route)
    )
    const isAuthRoute = authRoutes.some(route =>
      request.nextUrl.pathname.startsWith(route)
    )

    // Redirect unauthenticated users from protected routes
    if (isProtectedRoute && !user) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is authenticated and lands on base /dashboard, route them based on first-time logic
    if (user && request.nextUrl.pathname === '/dashboard') {
      const hasLastSignIn = Boolean(user.last_sign_in_at)
      
      const redirectTo = !hasLastSignIn ? '/dashboard' : '/dashboard/mastery-zones'
      if (request.nextUrl.pathname !== redirectTo) {
        return NextResponse.redirect(new URL(redirectTo, request.url))
      }
    }

    // Redirect authenticated users away from auth routes
    if (isAuthRoute && user) {
      const redirectedFrom = request.nextUrl.searchParams.get('redirectedFrom')
      if (redirectedFrom && redirectedFrom.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL(redirectedFrom, request.url))
      }

      // Use presence of last_sign_in_at: if present -> returning user
      const hasLastSignIn = Boolean(user.last_sign_in_at)
      const redirectTo = hasLastSignIn ? '/dashboard/mastery-zones' : '/dashboard'
      return NextResponse.redirect(new URL(redirectTo, request.url))
    }

    // Handle auth callback
    if (request.nextUrl.pathname === '/callback') {
      return response
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
