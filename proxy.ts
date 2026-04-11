import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Helper function to check if role is admin (main-admin or admin)
function isAdminRole(role: string | undefined): boolean {
  return role === 'admin' || role === 'main-admin'
}

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token
    const role = (token as any)?.role
    const isAdmin = isAdminRole(role)
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isAdminLogin = req.nextUrl.pathname === '/admin/login'

    // Allow access to admin login page
    if (isAdminLogin) {
      return NextResponse.next()
    }

    // Redirect non-admin users trying to access admin routes to login
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public routes
        if (!req.nextUrl.pathname.startsWith('/admin')) {
          return true
        }
        // Allow admin login page without authentication
        if (req.nextUrl.pathname === '/admin/login') {
          return true
        }
        
        const role = (token as any)?.role
        const isAuthorized = isAdminRole(role)
        
        // If no token, allow through (will be caught by page-level check)
        if (!token) {
          return true
        }
        
        return isAuthorized
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
