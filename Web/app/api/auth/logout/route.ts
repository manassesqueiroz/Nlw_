import { NextRequest, NextResponse } from 'next/server'
import { useRouter } from 'next/navigation'

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url)
  const rauter = useRouter()

  return (NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`,
    },
  })
}
