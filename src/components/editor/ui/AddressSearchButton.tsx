'use client'

import { useState } from 'react'

/**
 * 다음(카카오) 우편번호 서비스 팝업으로 주소 검색.
 * 무료 · API 키 불필요 · CDN 스크립트만 로드.
 * 문서: https://postcode.map.daum.net/guide
 */

const SCRIPT_SRC =
  'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

type DaumPostcodeData = {
  zonecode: string // 5자리 우편번호
  address: string // 기본 주소 (사용자 선택 기준)
  roadAddress: string // 도로명 주소
  jibunAddress: string // 지번 주소
  buildingName: string // 건물명
  addressType: 'R' | 'J' // R: 도로명, J: 지번
}

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void
        onclose?: (state: 'FORCE_CLOSE' | 'COMPLETE_CLOSE') => void
      }) => { open: () => void }
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
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading) return
    setLoading(true)
    try {
      await loadScript()
      if (!window.daum?.Postcode) throw new Error('script not ready')
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
        },
      }).open()
    } catch (err) {
      alert(
        err instanceof Error && err.message
          ? `주소 검색을 불러오지 못했어요: ${err.message}`
          : '주소 검색을 불러오지 못했어요.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={
        className ??
        'inline-flex h-8 items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-wait disabled:opacity-60'
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
      {loading ? '불러오는 중...' : '주소 검색'}
    </button>
  )
}
