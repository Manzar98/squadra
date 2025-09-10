import { createClient } from '@/lib/supabase/auth/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Create Supabase client and get response
    const { supabase, response } = createClient(request)
    
    // Refresh session if expired - required for Server Components
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Define protected routes
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

    // Redirect authenticated users from auth routes
    if (isAuthRoute && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Handle auth callback
    if (request.nextUrl.pathname === '/callback') {
      return response
    }

    // Return the response with updated cookies
    return response
  } catch (error) {
    // If there's an error, redirect to login
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
