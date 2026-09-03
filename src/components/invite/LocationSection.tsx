'use client'

import { useState } from 'react'
import type { InvitationData, TransportItem } from '@/types/invitation'
import KakaoMap from './KakaoMap'

type Props = { data: InvitationData }

const TRANSPORT_META: Record<
  TransportItem['type'],
  { label: string; icon: React.ReactNode }
> = {
  subway: {
    label: '지하철',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="4" y="3" width="16" height="16" rx="4" />
        <path d="M4 11h16" />
        <circle cx="8.5" cy="15" r="0.5" />
        <circle cx="15.5" cy="15" r="0.5" />
        <path d="M8 19l-2 2" />
        <path d="M16 19l2 2" />
      </svg>
    ),
  },
  bus: {
    label: '버스',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M8 6v6" />
        <path d="M15 6v6" />
        <path d="M2 12h19.6" />
        <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="16" cy="18" r="2" />
      </svg>
    ),
  },
  car: {
    label: '자가용',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    ),
  },
  train: {
    label: '기차',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16" />
        <path d="M8 19l-2 2" />
        <path d="M16 19l2 2" />
      </svg>
    ),
  },
  etc: {
    label: '기타',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
}

export default function LocationSection({ data }: Props) {
  const [copied, setCopied] = useState(false)
  const address = data.ceremony.venueAddress

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  // 주소만으로 검색해야 지도 앱이 해당 주소의 상세 페이지로 바로 진입함
  const q = encodeURIComponent(address)
  const mapLinks = [
    {
      label: '네이버지도',
      // 모바일에선 앱 설치 시 앱 오픈, 미설치 시 웹으로 폴백
      href: `https://m.map.naver.com/appLink.naver?query=${q}&menu=location&appTargetPage=search&appSchemeName=nmap&app=Y&appmarket=N#applink`,
    },
    { label: '카카오맵', href: `https://map.kakao.com/link/search/${q}` },
  ]

  return (
    <section
      className="px-8 py-20"
      style={{ background: 'var(--p-bg)' }}
    >
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          Location
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          오시는 길
        </h2>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100">
        <div className="relative aspect-[4/3]">
          <KakaoMap address={address} className="absolute inset-0" />
        </div>

        <div className="px-6 py-6">
          <p className="font-serif text-base font-medium text-neutral-800">
            {data.ceremony.venueName}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {data.ceremony.venueHall}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            {address}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? '복사됨' : '주소 복사'}
            </button>
            {mapLinks.map((m) => (
              <a
                key={m.label}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                {m.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {data.transport.length > 0 && (
        <div className="mt-8">
          <h3 className="font-serif text-center text-sm font-medium tracking-wide text-neutral-600">
            교통편 안내
          </h3>
          <ul className="mt-5 space-y-3">
            {data.transport.map((t, idx) => {
              const meta = TRANSPORT_META[t.type]
              return (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-neutral-100"
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: 'var(--p-soft)',
                      color: 'var(--p-strong)',
                    }}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-[11px] font-medium tracking-wider uppercase"
                      style={{ color: 'var(--p-strong)' }}
                    >
                      {meta.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-700">
                      {t.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}
