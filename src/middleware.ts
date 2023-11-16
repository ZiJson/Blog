import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { url } from 'inspector'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getSession()

  const { pathname } = new URL(request.url)
  if (pathname == '/admin' || pathname.includes("edit")) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user == null) return NextResponse.redirect(new URL('/admin/login', request.url))
    console.log("user logged in")
    const { data: { admin_role }, error } = await supabase.from('profiles').select().eq('id', user.id).maybeSingle()
    if (!admin_role) return NextResponse.redirect(new URL('/admin/login?error=permission_deied', request.url))
  }
  else if (pathname == '/admin/login') {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: { admin_role }, error } = await supabase.from('profiles').select().eq('id', user.id).maybeSingle()
      if (admin_role) return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  // console.log("user:", user)
  // if (user == null && pathname == '/admin') {
  //   console.log('block')
  //   return NextResponse.redirect(new URL('/admin/login',request.url))
  // }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}