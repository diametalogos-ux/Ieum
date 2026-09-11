import Link from 'next/link'
import type { Metadata } from 'next'
import { WREATH_CATEGORIES } from '@/lib/wreath-orders/types'
import InquiryLink from '@/components/ui/InquiryLink'

const OG_DESC =
  '결혼식·장례식·개업식 등 소중한 자리에 축하와 위로를 꽃으로 대신 전하세요. 이음이 도와드립니다.'

// og:image는 같은 폴더의 opengraph-image.tsx가 자동 사용됨
export const metadata: Metadata = {
  title: '이음 화환 · 축하화환·근조화환 주문',
  description: OG_DESC,
  keywords: [
    '이음 화환',
    '화환 주문',
    '축하화환',
    '근조화환',
    '결혼식 화환',
    '장례식 화환',
    '개업식 화환',
    '이음',
    'Ieum',
  ],
  alternates: {
    canonical: '/wreath',
  },
  openGraph: {
    title: '이음 · 화환 주문',
    description: OG_DESC,
    type: 'website',
    url: 'https://ieum-log.shop/wreath',
    siteName: '이음 (Ieum)',
  },
  twitter: {
    card: 'summary_large_image',
    title: '이음 · 화환 주문',
    description: OG_DESC,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://ieum-log.shop/wreath#webpage',
      url: 'https://ieum-log.shop/wreath',
      name: '이음 화환 · 축하화환·근조화환 주문',
      description: OG_DESC,
      inLanguage: 'ko-KR',
      isPartOf: { '@id': 'https://ieum-log.shop/#website' },
    },
    {
      '@type': 'Service',
      name: '이음 화환',
      serviceType: '화환 주문·배송',
      provider: { '@type': 'Organization', name: '이음 (Ieum)' },
      areaServed: 'KR',
      description: OG_DESC,
    },
  ],
}

type Category = {
  key: keyof typeof WREATH_CATEGORIES
  label: string
  accent: string
}

const categories: Category[] = [
  { key: 'congrats', label: '축하화환', accent: '#c88a97' },
  { key: 'condolence', label: '근조화환', accent: '#4a4a52' },
  { key: 'foliage', label: '관엽', accent: '#6b7d5a' },
  { key: 'basket', label: '꽃바구니·꽃다발', accent: '#d4a574' },
  { key: 'oriental', label: '동양란', accent: '#a08c6c' },
  { key: 'western', label: '서양란', accent: '#c9b5d4' },
  { key: 'bonsai', label: '분재', accent: '#7a9a7a' },
]

export default function WreathHomePage() {
  return (
    <main className="relative min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-neutral-900/10" />

      {/* 헤더 */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 md:px-10 md:pt-10">
        <Link
          href="/"
          className="font-editorial text-2xl text-neutral-800 transition-opacity hover:opacity-70"
        >
          이음
        </Link>
        <p className="text-[12px] font-semibold tracking-[0.3em] text-neutral-500 uppercase">
          Wreath
        </p>
      </header>

      {/* 히어로 */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-14 pb-14 md:px-10 md:pt-24 md:pb-20">
        <p className="font-editorial text-[14px] font-medium tracking-widest text-neutral-500">
          A gift for
          <br />
          those who matter
        </p>
        <h1
          className="font-editorial mt-6 leading-[0.95] tracking-tight text-neutral-900"
          style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)' }}
        >
          꽃으로 대신하는
          <br />
          당신의 마음
        </h1>
        <p className="mt-8 max-w-lg text-[16px] leading-[1.9] text-neutral-700 md:text-[18px]">
          멀리서도 함께하고 싶은 자리가 있습니다.
          <br />
          이음은 축하와 위로를 꽃으로 정성스럽게 전합니다.
        </p>
      </section>

      {/* 카테고리 선택 */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10 md:pb-32">
        <div className="mb-6 flex items-baseline justify-between border-b border-neutral-900/15 pb-3">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-neutral-800 uppercase">
            Select Type
          </p>
          <p className="text-[12px] font-medium tracking-[0.25em] text-neutral-500 uppercase">
            Step 01 / 02
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/wreath/order/${c.key}`}
              className="group relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-neutral-900/30 hover:shadow-lg hover:shadow-neutral-200/60 md:min-h-[160px] md:p-6"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-full w-1"
                style={{ background: c.accent }}
              />
              <h2 className="font-editorial text-[20px] leading-tight tracking-tight text-neutral-900 md:text-[22px]">
                {c.label}
              </h2>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.25em] text-neutral-500 uppercase">
                  주문하기
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-neutral-800 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* 안내 */}
        <div className="mt-14 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 md:p-8">
          <p className="font-editorial text-base font-semibold text-neutral-800">
            How it works
          </p>
          <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-neutral-700 md:text-base">
            <li>
              <span className="mr-2 font-semibold text-neutral-900">01.</span>
              받는분과 배송 정보를 입력합니다.
            </li>
            <li>
              <span className="mr-2 font-semibold text-neutral-900">02.</span>
              꽃비 파트너 상점에서 원하는 화환을 고르고 결제합니다.
            </li>
            <li>
              <span className="mr-2 font-semibold text-neutral-900">03.</span>
              결제 완료 후 배송·수령까지 파트너가 진행합니다.
            </li>
          </ol>
        </div>
      </section>

      {/* 하단 */}
      <footer className="border-t border-neutral-900/10 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 md:flex-row md:items-center md:px-10">
          <p className="font-editorial text-base font-medium text-neutral-700">
            Ieum &nbsp;·&nbsp; 이음
          </p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-neutral-600">
            <Link href="/privacy" className="hover:text-neutral-900">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-neutral-900">
              이용약관
            </Link>
            <InquiryLink className="hover:text-neutral-900" />
            <a
              href="https://www.instagram.com/ieum.mlog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-neutral-900"
              aria-label="이음 인스타그램"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              @ieum.mlog
            </a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
