'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createInvitation } from '@/lib/invitations/client'

export default function EmptyState() {
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
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/50 py-24 text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: 'var(--color-accent-soft, #f7ecec)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-9 w-9"
          style={{ color: 'var(--color-accent, #c9807f)' }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <h3 className="font-serif mt-6 text-xl font-semibold text-neutral-900">
        아직 만든 청첩장이 없어요
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">
        두 사람의 이야기를 담은 첫 번째 청첩장을
        <br />
        지금 만들어보세요
      </p>
      <button
        type="button"
        onClick={handleClick}
        disabled={creating}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-60"
      >
        {creating ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            만드는 중...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            첫 청첩장 만들기
          </>
        )}
      </button>
    </div>
  )
}
