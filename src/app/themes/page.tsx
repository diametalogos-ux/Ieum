import type { Metadata } from 'next'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import ThemePickButton from '@/components/themes/ThemePickButton'

export const metadata: Metadata = {
  title: '테마 · 이음',
  description: '레이아웃과 무드가 다양한 테마 · 모두 무료',
}

type Theme = {
  key: string
  category: string
  name: string
  desc: string
  bg: string
  accent: string
  available: boolean
}

const themes: Theme[] = [
  {
    key: 'photo-blush',
    category: 'Photo',
    name: 'Blush',
    desc: '사진이 첫인상, 은은한 분홍 무드',
    bg: 'linear-gradient(140deg,#fff0f4 0%,#fddde6 100%)',
    accent: '#d9748b',
    available: true,
  },
  {
    key: 'typography-ink',
    category: 'Typography',
    name: 'Ink',
    desc: '텍스트가 주인공, 절제된 흑백 모노',
    bg: 'linear-gradient(140deg,#f5f5f5 0%,#e8e8e8 100%)',
    accent: '#525252',
    available: false,
  },
]

export default function ThemesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-neutral-50 to-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
            Themes
          </p>
          <h1 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-5xl">
            우리 스타일에 맞는
            <br />
            테마를 골라보세요
          </h1>
          <p className="mt-5 text-sm text-neutral-500 md:text-base">
            지금은 <strong className="font-semibold text-neutral-700">Photo · Blush</strong> 가 준비되어 있어요
            <br />더 다양한 레이아웃과 무드가 계속 추가될 예정입니다
          </p>
        </div>
      </section>

      {/* 테마 그리드 */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {themes.map((t) => (
              <div
                key={t.key}
                className={`group relative overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-100 transition-all ${
                  t.available
                    ? 'hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/40'
                    : ''
                }`}
              >
                {/* 미리보기 카드 */}
                <div
                  className={`relative flex h-56 items-center justify-center overflow-hidden ${
                    t.available ? '' : 'opacity-60 grayscale'
                  }`}
                  style={{ background: t.bg }}
                >
                  <div className="flex w-full flex-col items-center gap-2 px-6 text-center">
                    <p
                      className="text-[9px] font-medium tracking-[0.35em] uppercase"
                      style={{ color: t.accent, opacity: 0.7 }}
                    >
                      Wedding Invitation
                    </p>
                    <div
                      className="font-serif text-2xl font-semibold tracking-wide"
                      style={{ color: t.accent }}
                    >
                      민준 &amp; 서연
                    </div>
                    <div
                      className="h-px w-8"
                      style={{ background: t.accent, opacity: 0.4 }}
                    />
                    <div className="text-[10px] tracking-[0.25em] text-neutral-500">
                      2026 · 05 · 18
                    </div>
                  </div>

                  {/* 상태 뱃지 */}
                  <div className="absolute top-3 left-3">
                    {t.available ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        사용 가능
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-neutral-800/70 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white backdrop-blur">
                        COMING SOON
                      </span>
                    )}
                  </div>
                </div>

                {/* 메타 */}
                <div className="border-t border-neutral-100 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium tracking-[0.15em] text-neutral-400 uppercase">
                        {t.category}
                      </p>
                      <p className="font-serif mt-0.5 text-base font-semibold text-neutral-900">
                        {t.name}
                      </p>
                    </div>
                    <span
                      className="h-4 w-4 flex-shrink-0 rounded-full ring-1 ring-inset ring-black/10"
                      style={{ background: t.accent, opacity: t.available ? 1 : 0.4 }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-neutral-500">{t.desc}</p>

                  {t.available ? (
                    <div className="mt-4">
                      <ThemePickButton themeKey={t.key} />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <div className="w-full rounded-full bg-neutral-100 py-2.5 text-center text-xs font-medium text-neutral-400">
                        곧 만나요
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 마무리 감성 문구 */}
      <section className="border-t border-neutral-100 py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="font-serif text-2xl leading-[1.7] tracking-tight text-neutral-800 md:text-3xl md:leading-[1.6]">
            두 사람의 이야기를
            <br />
            가장 아름답게 담을 준비가
            <br />
            되어 있어요
          </p>
          <p className="mt-10 text-[10px] font-medium tracking-[0.5em] text-neutral-400 uppercase">
            — Ieum
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
