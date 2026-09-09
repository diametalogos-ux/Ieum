'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { createInvitation } from '@/lib/invitations/client'

type Props = {
  themeKey: string
  disabled?: boolean
  label?: string
}

export default function ThemePickButton({
  themeKey,
  disabled = false,
  label = '이 샘플로 만들기',
}: Props) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [creating, setCreating] = useState(false)

  const handleClick = async () => {
    if (disabled || creating) return
    if (loading) return
    if (!user) {
      // 로그인 후 이 테마로 만들기 흐름 이어가도록 next 파라미터 전달
      const nextUrl = `/wedding/editor/new?theme=${encodeURIComponent(themeKey)}`
      router.push(`/login?next=${encodeURIComponent(nextUrl)}`)
      return
    }
    setCreating(true)
    const result = await createInvitation({ themeKey })
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
      disabled={disabled || creating}
      className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-neutral-900 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {creating ? (
        <>
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          만드는 중...
        </>
      ) : (
        <>
          {label}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </>
      )}
    </button>
  )
}
