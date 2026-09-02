'use client'

import { useState } from 'react'
import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

export default function ShareSection({ data }: Props) {
  const [copied, setCopied] = useState(false)

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://ieum.co/invite/${data.slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  const handleKakao = () => {
    // 실제 SDK 연결은 이후 단계에서. 지금은 링크 복사로 대체.
    handleCopy()
  }

  return (
    <section className="bg-white px-8 py-16">
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          Share
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          청첩장 공유하기
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-neutral-500">
          소중한 분들에게 우리의 이야기를 전해주세요
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={handleKakao}
          className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: '#FEE500', color: '#111' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.87 1.9 5.38 4.72 6.79-.14.51-.9 3.27-.93 3.42 0 0-.02.13.06.19.09.05.19.01.19.01.27-.04 3.13-2.04 3.62-2.38.77.11 1.55.17 2.34.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
          </svg>
          카카오톡으로 공유하기
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white py-3.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-500">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              링크가 복사되었어요
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              링크 복사하기
            </>
          )}
        </button>
      </div>

      <div className="mt-8 flex items-center gap-3 text-[10px] text-neutral-400">
        <span className="h-px flex-1 bg-neutral-100" />
        <span>Made with 이음</span>
        <span className="h-px flex-1 bg-neutral-100" />
      </div>
    </section>
  )
}
