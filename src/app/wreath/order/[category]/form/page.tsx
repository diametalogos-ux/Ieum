import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { WREATH_CATEGORIES } from '@/lib/wreath-orders/types'
import WreathOrderForm from '../WreathOrderForm'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const key = category as keyof typeof WREATH_CATEGORIES
  const meta = WREATH_CATEGORIES[key]
  if (!meta) return { title: '화환 주문 · 이음' }
  return {
    title: `${meta.label} 배송 정보 입력 · 이음`,
    description: `${meta.label} 배송 정보를 입력하고 결제 페이지로 이동합니다.`,
  }
}

export default async function WreathOrderFormPage({ params }: Props) {
  const { category } = await params
  const key = category as keyof typeof WREATH_CATEGORIES
  const meta = WREATH_CATEGORIES[key]
  if (!meta) notFound()

  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="border-b border-neutral-100">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-5 md:h-18 md:px-8">
          <Link
            href={`/wreath/order/${key}`}
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

      <div className="mx-auto w-full max-w-3xl px-5 pt-10 pb-16 md:px-8 md:pt-14 md:pb-24">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.3em] text-neutral-500 uppercase">
            Step 02 / 02 · 배송 정보 입력
          </p>
          <h1 className="font-editorial mt-4 text-[38px] leading-tight tracking-tight text-neutral-900 md:text-[52px]">
            {meta.label}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            받는분과 배송 정보를 입력해 주세요.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            다음 단계에서 상품을 고르고 결제할 수 있어요.
          </p>
        </div>

        <div className="mt-12">
          <WreathOrderForm categoryKey={key} categoryLabel={meta.label} />
        </div>
      </div>
    </main>
  )
}
