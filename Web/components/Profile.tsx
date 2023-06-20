import { getUser } from '@/lib/auth'
import Link from 'next/link'
import Image from 'next/image'

export function Profile() {
  const { name, avatarURL } = getUser()
  return (
    <div className="flex items-center gap-3">
      <Image
        src={avatarURL}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      ></Image>

      <p className=" max-w-[140px] text-sm leading-snug">
        {name}
        <Link
          href="/api/auth/logout"
          className="block text-red-500 hover:text-red-400"
        >
          Quero sair
        </Link>
      </p>
    </div>
  )
}
