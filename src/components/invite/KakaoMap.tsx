'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * 카카오 지도 SDK v3 로더 + 주소 지오코딩 → 마커 표시.
 * - 환경변수: NEXT_PUBLIC_KAKAO_JS_KEY (Kakao 개발자 앱의 JavaScript 키)
 * - 앱의 Web 플랫폼에 도메인 등록 필요 (localhost, 배포 도메인)
 */

const SCRIPT_ID = 'kakao-maps-sdk'

type KakaoNS = {
  maps: {
    load: (cb: () => void) => void
    LatLng: new (lat: number, lng: number) => unknown
    Map: new (
      container: HTMLElement,
      options: { center: unknown; level: number }
    ) => unknown
    Marker: new (options: { map: unknown; position: unknown }) => unknown
    services: {
      Geocoder: new () => {
        addressSearch: (
          address: string,
          cb: (
            result: { y: string; x: string }[],
            status: 'OK' | 'ZERO_RESULT' | 'ERROR'
          ) => void
        ) => void
      }
      Status: { OK: 'OK'; ZERO_RESULT: 'ZERO_RESULT'; ERROR: 'ERROR' }
    }
  }
}

declare global {
  interface Window {
    kakao?: KakaoNS
  }
}

async function loadKakaoScript(appKey: string): Promise<void> {
  if (typeof window === 'undefined') return
  if (window.kakao?.maps) return

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('load failed')), {
        once: true,
      })
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('load failed'))
    document.head.appendChild(script)
  })
}

type Props = {
  address: string
  className?: string
}

export default function KakaoMap({ address, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<
    | { kind: 'loading' }
    | { kind: 'ok' }
    | { kind: 'error'; reason: 'no-key' | 'not-found' | 'load-failed' }
  >({ kind: 'loading' })

  useEffect(() => {
    let cancelled = false
    if (!address) return

    const appKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY
    if (!appKey || appKey === 'your_kakao_js_key') {
      setState({ kind: 'error', reason: 'no-key' })
      return
    }

    ;(async () => {
      try {
        await loadKakaoScript(appKey)
        if (cancelled) return

        window.kakao!.maps.load(() => {
          if (cancelled) return
          const kakao = window.kakao!
          const geocoder = new kakao.maps.services.Geocoder()
          geocoder.addressSearch(address, (result, status) => {
            if (cancelled) return
            if (status !== 'OK' || !result[0]) {
              setState({ kind: 'error', reason: 'not-found' })
              return
            }
            const coords = new kakao.maps.LatLng(
              Number(result[0].y),
              Number(result[0].x)
            )
            if (!containerRef.current) return
            const map = new kakao.maps.Map(containerRef.current, {
              center: coords,
              level: 3,
            })
            new kakao.maps.Marker({ map, position: coords })
            setState({ kind: 'ok' })
          })
        })
      } catch {
        if (!cancelled) setState({ kind: 'error', reason: 'load-failed' })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [address])

  // 지도 컨테이너는 항상 렌더 (kakao SDK가 innerHTML을 관리)
  return (
    <div className={className ?? 'relative h-full w-full'}>
      <div ref={containerRef} className="h-full w-full" />

      {state.kind !== 'ok' && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            background:
              'linear-gradient(135deg, var(--p-soft) 0%, var(--p-mid) 100%)',
          }}
        >
          <div className="text-center">
            <div
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/40 backdrop-blur"
              style={{ color: 'var(--p-strong)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="mt-3 text-[11px] tracking-[0.3em] uppercase text-white/80">
              {state.kind === 'loading'
                ? 'Loading Map'
                : state.reason === 'no-key'
                ? 'Map Preview'
                : state.reason === 'not-found'
                ? 'Address Not Found'
                : 'Map Unavailable'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
