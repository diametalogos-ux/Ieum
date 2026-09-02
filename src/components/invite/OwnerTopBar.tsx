'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  invitationId: string
  slug: string
}

export default function OwnerTopBar({ invitationId, slug }: Props) {
  const [isOwner, setIsOwner] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setIsOwner(params.get('edit') === '1')
  }, [])

  if (!isOwner) return null

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/invite/${slug}`
      : `/invite/${slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 bg-neutral-900/95 text-white backdrop-blur"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex h-14 max-w-[430px] items-center justify-between px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-[13px] text-white/80 transition-colors hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          대시보드
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-9 items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 text-[11px] font-medium text-white transition-colors hover:bg-white/10"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-emerald-400">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                복사됨
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                링크 복사
              </>
            )}
          </button>

          <Link
            href={`/editor/${invitationId}`}
            className="flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[11px] font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            편집하기
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/30 py-1.5 text-center text-[10px] tracking-wider text-white/60">
        미리보기 모드 · 하객에게는 이 바가 보이지 않아요
      </div>
    </div>
  )
}
