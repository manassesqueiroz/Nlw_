export function EmptyMemories() {
  return (
    <div className="flex flex-1  items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança,{' '}
        <a href="/memories/new" className=" underline hover:text-gray-50">
          comece a criar agora!
        </a>
      </p>
    </div>
  )
}
