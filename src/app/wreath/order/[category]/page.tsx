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

        {/* 전화 주문 */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-neutral-900 py-4 text-base font-medium text-white transition-opacity hover:opacity-85"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          전화로 주문하기
           {/* · {PHONE_NUMBER} */}
        </a>

        {/* 상품 미리보기 */}
        <section className="mt-10">
          <h2 className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-neutral-500 uppercase">
            상품 미리보기
          </h2>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
            {products.map((p) => (
              <li key={p.code}>
                <div className="aspect-[3/5] overflow-hidden rounded-xl bg-neutral-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.imageSrc}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-3 text-[11px] font-medium tracking-wide text-neutral-400">
                  {p.code}
                </p>
                <p className="mt-1 text-sm font-medium text-neutral-900">
                  {p.name}
                </p>
                <p className="mt-1 text-base font-bold text-neutral-900">
                  {p.price.toLocaleString()}원
                </p>
                <span className="mt-2 inline-block rounded-md border border-neutral-200 px-2 py-0.5 text-[10px] font-medium tracking-wide text-neutral-500">
                  전국당일배송
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-neutral-500">
            상품 종류 미리보기 화면입니다.
            <br className="sm:hidden" />
            상품 상세보기·선택은 아래 <strong className="text-neutral-700">주문폼</strong> 입력 후 결제 페이지에서 하실 수 있어요.
          </p>
        </section>

      </div>

      {/* 다음 단계 CTA (플로팅) */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-md"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="mx-auto w-full max-w-3xl px-5 py-3 md:px-8 md:py-4">
          <Link
            href={`/wreath/order/${key}/form`}
            className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 py-4 text-base font-semibold text-white transition-opacity hover:opacity-85"
          >
            다음: 주문폼 입력하기
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
