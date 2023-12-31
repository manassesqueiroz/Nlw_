import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTO = request.cookies.get('redirecTo')?.value

  const registerResponse = await api.post('/register', {
    code,
  })
  const { token } = registerResponse.data

  const redirectURL = redirectTO ?? new URL('/', request.url)

  const CookieExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${CookieExpiresInSeconds}`,
    },
  })
}
