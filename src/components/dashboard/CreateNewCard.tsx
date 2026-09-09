'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createInvitation } from '@/lib/invitations/client'

export default function CreateNewCard() {
  const router = useRouter()
  const [creating, setCreating] = useState(false)

  const handleClick = async () => {
    if (creating) return
    setCreating(true)
    const result = await createInvitation()
    if (!result.ok) {
      alert(result.error)
      setCreating(false)
      return
    }
    router.push(`/wedding/editor/${result.id}`)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={creating}
      className="group flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 transition-all hover:-translate-y-1 hover:border-neutral-300 hover:bg-white hover:shadow-lg hover:shadow-neutral-200/40 disabled:cursor-wait disabled:opacity-60"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full transition-colors group-hover:bg-white"
        style={{ background: 'var(--color-accent-soft, #f7ecec)' }}
      >
        {creating ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            style={{ color: 'var(--color-accent, #c9807f)' }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
      </div>
      <p className="font-serif mt-5 text-base font-semibold text-neutral-800">
        {creating ? '만드는 중...' : '새 청첩장 만들기'}
      </p>
      <p className="mt-1.5 text-xs text-neutral-500">
        나만의 이야기를 담아보세요
      </p>
    </button>
  )
}
