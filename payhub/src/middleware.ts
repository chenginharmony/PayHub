import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get the pathname
  const pathname = req.nextUrl.pathname;

  // Special handling for admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to admin login page
    if (pathname === '/admin') {
      return res;
    }

    // For other admin routes, check session and role
    if (!session) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    // Check if user has admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      // If no admin role, redirect to admin login
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  // Handle other protected routes (freelancer)
  if (pathname.startsWith('/freelancer') && !session) {
    const redirectUrl = new URL('/signin', req.url);
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
