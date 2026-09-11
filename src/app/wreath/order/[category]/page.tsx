import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { WREATH_CATEGORIES } from '@/lib/wreath-orders/types'
import { getWreathProducts } from '@/lib/wreath-products'

const PHONE_NUMBER = '070-4453-1063'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const key = category as keyof typeof WREATH_CATEGORIES
  const meta = WREATH_CATEGORIES[key]
  if (!meta) return { title: '화환 주문 · 이음' }
  return {
    title: `${meta.label} 상품 미리보기 · 이음`,
    description: `${meta.label} 상품 라인업을 확인하고 주문을 시작하세요.`,
  }
}

export default async function WreathPreviewPage({ params }: Props) {
  const { category } = await params
  const key = category as keyof typeof WREATH_CATEGORIES
  const meta = WREATH_CATEGORIES[key]
  if (!meta) notFound()

  const products = getWreathProducts(key)

  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="border-b border-neutral-100">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-5 md:h-18 md:px-8">
          <Link
            href="/wreath"
            className="flex items-center gap-2 text-base font-medium text-neutral-700 transition-colors hover:text-neutral-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 19" />
            </svg>
            뒤로
          </Link>
          <p className="text-[11px] font-semibold tracking-[0.35em] text-neutral-500 uppercase">
            {key === 'congrats' ? 'Celebrations' : 'Condolences'}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 pt-10 pb-32 md:px-8 md:pt-14 md:pb-36">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.3em] text-neutral-500 uppercase">
            Step 01 / 02 · 상품 미리보기
          </p>
          <h1 className="font-editorial mt-4 text-[38px] leading-tight tracking-tight text-neutral-900 md:text-[52px]">
            {meta.label}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            어떤 상품이 있는지 먼저 살펴보세요.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            상세 상품 선택과 결제는 다음 단계에서 진행됩니다.
          </p>
        </div>

        {/* 전화 주문 (보조 액션 · 아웃라인) */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="mt-10 flex items-center gap-4 rounded-2xl border-2 border-neutral-900 bg-white px-5 py-4 transition-colors hover:bg-neutral-50 md:px-6"
        >
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white md:h-12 md:w-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 md:h-6 md:w-6"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          <span className="flex flex-col">
            <span className="text-[13px] font-medium text-neutral-500">
              전화 주문 (친절히 도와드려요)
            </span>
            <span className="mt-0.5 text-lg font-bold tracking-tight text-neutral-900 md:text-xl">
              {PHONE_NUMBER}
            </span>
          </span>
        </a>

        {/* 가격 안내 */}
        <section className="mt-12">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="text-lg font-bold text-neutral-900 md:text-xl">
              가격 안내
            </h2>
            <span className="text-[13px] text-neutral-500">
              전 상품 전국당일배송
            </span>
          </div>

          {/* 상단 안내 박스 (크고 명확하게) */}
          <div className="mb-8 flex items-start gap-3 rounded-xl bg-amber-50 px-5 py-4 md:gap-4 md:px-6 md:py-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p className="text-[15px] leading-relaxed text-neutral-800 md:text-base">
              <strong>가격 안내 화면입니다.</strong>
              <br />
              여기서는 상품 종류와 가격만 확인해 주세요.
              <br />
              실제 주문은 <strong>아래 "주문폼 입력하기"</strong> 버튼을 눌러 진행해 주세요.
            </p>
          </div>

          {/* 큰 카드 그리드 (2컬럼, 어르신 친화적) */}
          <ul className="grid select-none grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
            {products.map((p) => (
              <li key={p.code}>
                <div className="aspect-[3/4] overflow-hidden bg-neutral-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.imageSrc}
                    alt={p.name}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-3 text-[15px] font-medium text-neutral-900 md:text-base">
                  {p.name}
                </p>
                <p className="mt-1 text-[17px] font-bold text-neutral-900 md:text-lg">
                  {p.price.toLocaleString()}원~
                </p>
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* 주 액션 CTA (플로팅) */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/98 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="mx-auto w-full max-w-3xl px-5 py-3 md:px-8 md:py-4">
          <Link
            href={`/wreath/order/${key}/form`}
            className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 py-[18px] text-[17px] font-bold text-white shadow-lg shadow-neutral-900/20 transition-transform hover:-translate-y-0.5 hover:opacity-95 md:text-lg"
          >
            주문서 작성하기
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 md:h-6 md:w-6">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
