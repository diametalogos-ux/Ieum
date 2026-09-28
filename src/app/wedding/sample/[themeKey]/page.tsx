import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import InviteContent from '@/components/invite/InviteContent'
import ThemePickButton from '@/components/themes/ThemePickButton'
import { sampleInvitation } from '@/lib/mock/sample-invitation'
import { sampleNoirInvitation } from '@/lib/mock/sample-noir'
import type { InvitationData } from '@/types/invitation'
import type { PaletteKey } from '@/components/editor/EditorContext'

type Props = {
  params: Promise<{ themeKey: string }>
}

type SampleEntry = {
  data: InvitationData
  palette: PaletteKey
  themeLabel: string
}

/** 광고 랜딩용 공개 샘플 데이터 매핑. 새 테마 추가 시 여기에 항목 추가. */
const SAMPLES: Record<string, SampleEntry> = {
  'photo-blush': {
    data: sampleInvitation,
    palette: 'pink',
    themeLabel: 'Blush',
  },
  'photo-noir': {
    data: sampleNoirInvitation,
    palette: 'gray',
    themeLabel: 'Noir',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { themeKey } = await params
  const entry = SAMPLES[themeKey]
  if (!entry) {
    return { title: '샘플을 찾을 수 없어요', robots: { index: false, follow: false } }
  }
  return {
    title: `${entry.themeLabel} 샘플 · 이음`,
    description: `${entry.themeLabel} 테마 청첩장 미리보기`,
    openGraph: {
      title: `${entry.themeLabel} 샘플 청첩장`,
      description: `${entry.themeLabel} 테마로 만든 청첩장 미리보기`,
      type: 'website',
    },
  }
}

export default async function SamplePage({ params }: Props) {
  const { themeKey } = await params
  const entry = SAMPLES[themeKey]
  if (!entry) notFound()

  return (
    <div className="relative">
      <InviteContent data={entry.data} palette={entry.palette} />

      {/* CTA에 가리지 않도록 하단 여백 확보 */}
      <div aria-hidden className="h-24" />

      {/* 광고 랜딩용 sticky CTA — 실제 청첩장(/invite/[slug])엔 안 붙음 */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}
      >
        <div className="pointer-events-auto w-full max-w-[398px]">
          <div className="rounded-2xl bg-white/95 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] ring-1 ring-neutral-200 backdrop-blur">
            <p className="mb-2 text-center text-[11px] tracking-wider text-neutral-500">
              <span className="font-serif font-semibold text-neutral-900">
                {entry.themeLabel}
              </span>{' '}
              샘플 · 미리보기
            </p>
            <ThemePickButton
              themeKey={themeKey}
              label="이 테마 청첩장 만들기"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
