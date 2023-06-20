import { NextRequest, NextResponse } from 'next/server'

const signinURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(signinURL, {
      headers: {
        'Set-Cookie': `redirecTo=${request.url}; HttpOnly; Path=/; max-age=20`,
      },
    })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
