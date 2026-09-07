'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * 다음(카카오) 우편번호 서비스 — embed 방식으로 모달 내부에 렌더.
 * 팝업 창 방식은 모바일 브라우저에서 뒤로가기·확대 등 이슈가 있어 embed 사용.
 * 문서: https://postcode.map.daum.net/guide (embed 파트)
 */

const SCRIPT_SRC =
  'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

type DaumPostcodeData = {
  zonecode: string
  address: string
  roadAddress: string
  jibunAddress: string
  buildingName: string
  addressType: 'R' | 'J'
}

type PostcodeInstance = {
  embed: (container: HTMLElement) => void
}

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void
        onresize?: (size: { width: number; height: number }) => void
        width?: string | number
        height?: string | number
      }) => PostcodeInstance
    }
  }
}

async function loadScript(): Promise<void> {
  if (window.daum?.Postcode) return
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    )
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('load failed')), {
        once: true,
      })
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('load failed'))
    document.body.appendChild(script)
  })
}

export type AddressResult = {
  zipcode: string
  address: string
  buildingName: string
}

type Props = {
  onSelect: (result: AddressResult) => void
  className?: string
}

export default function AddressSearchButton({ onSelect, className }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 모달 열림 시 body 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // 모달 열리고 container ref 준비되면 embed 실행
  useEffect(() => {
    if (!open) return
    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        await loadScript()
        if (cancelled) return
        if (!window.daum?.Postcode || !containerRef.current) {
          throw new Error('script not ready')
        }
        // 이전 embed 잔여물 제거
        containerRef.current.innerHTML = ''

        new window.daum.Postcode({
          oncomplete: (data) => {
            const address =
              data.addressType === 'R'
                ? data.roadAddress || data.address
                : data.jibunAddress || data.address
            onSelect({
              zipcode: data.zonecode,
              address,
              buildingName: data.buildingName ?? '',
            })
            setOpen(false)
          },
          width: '100%',
          height: '100%',
        }).embed(containerRef.current)

        setLoading(false)
      } catch (err) {
        if (cancelled) return
        setError(
          err instanceof Error && err.message
            ? `주소 검색을 불러오지 못했어요: ${err.message}`
            : '주소 검색을 불러오지 못했어요.'
        )
        setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [open, onSelect])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          'inline-flex h-8 items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50'
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        주소 검색
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:h-[600px] sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3">
              <p className="text-sm font-semibold text-neutral-900">
                주소 검색
              </p>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1">
              <div ref={containerRef} className="h-full w-full" />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
