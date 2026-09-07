'use client'

import { useState, useEffect, useCallback } from 'react'
import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #f7ecec 0%, #e5c9c9 100%)',
  'linear-gradient(135deg, #fdf6e3 0%, #e8d4a8 100%)',
  'linear-gradient(135deg, #f0e8dc 0%, #d4bfa8 100%)',
  'linear-gradient(135deg, #f5ecdf 0%, #e0c9a8 100%)',
  'linear-gradient(135deg, #fce8ec 0%, #e8bdc8 100%)',
  'linear-gradient(135deg, #f3ede8 0%, #dcc9b8 100%)',
  'linear-gradient(135deg, #f7ecec 0%, #d9b8bd 100%)',
  'linear-gradient(135deg, #ecdfd4 0%, #c9a988 100%)',
  'linear-gradient(135deg, #f0d8d8 0%, #d4a8a8 100%)',
]

const EMPTY_PLACEHOLDER_COUNT = 6

export default function GallerySection({ data }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const isEmpty = data.gallery.length === 0
  const total = isEmpty ? EMPTY_PLACEHOLDER_COUNT : data.gallery.length

  const close = useCallback(() => setOpenIdx(null), [])
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % total)),
    [total]
  )
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + total) % total)),
    [total]
  )

  useEffect(() => {
    if (openIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openIdx, close, next, prev])

  return (
    <section className="bg-white px-8 py-20">
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          Gallery
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          우리의 순간들
        </h2>
        <div className="mx-auto mt-6 flex items-center justify-center gap-2">
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
          <span className="text-sm" style={{ color: 'var(--p-strong)' }}>
            ✿
          </span>
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-1.5">
        {isEmpty
          ? Array.from({ length: EMPTY_PLACEHOLDER_COUNT }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setOpenIdx(idx)}
                className="group relative aspect-square overflow-hidden rounded-sm transition-opacity hover:opacity-90"
                aria-label={`예시 ${idx + 1}번 사진 크게 보기`}
                style={{
                  background:
                    PLACEHOLDER_GRADIENTS[idx % PLACEHOLDER_GRADIENTS.length],
                }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-white/50"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </button>
            ))
          : data.gallery.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpenIdx(idx)}
                className="group relative aspect-square overflow-hidden rounded-sm bg-neutral-100 transition-opacity hover:opacity-90"
                aria-label={`갤러리 ${idx + 1}번 사진 보기`}
              >
                {item.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={`Gallery ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{
                      background:
                        PLACEHOLDER_GRADIENTS[
                          idx % PLACEHOLDER_GRADIENTS.length
                        ],
                    }}
                  >
                    <span className="font-serif text-xs text-white/60">
                      {idx + 1}
                    </span>
                  </div>
                )}
              </button>
            ))}
      </div>

      <p className="mt-6 text-center text-[11px] text-neutral-400">
        사진을 눌러 크게 볼 수 있어요
      </p>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
            aria-label="닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
            aria-label="이전 사진"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
            aria-label="다음 사진"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="relative aspect-[3/4] w-[85%] max-w-md" onClick={(e) => e.stopPropagation()}>
            {!isEmpty && data.gallery[openIdx]?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.gallery[openIdx].url}
                alt={`Gallery ${openIdx + 1}`}
                className="h-full w-full rounded-sm object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-sm"
                style={{
                  background: PLACEHOLDER_GRADIENTS[openIdx % PLACEHOLDER_GRADIENTS.length],
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-white/60"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="font-serif text-4xl text-white/60">
                  {openIdx + 1}
                </span>
              </div>
            )}
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/70">
            {openIdx + 1} / {total}
          </div>
        </div>
      )}
    </section>
  )
}
