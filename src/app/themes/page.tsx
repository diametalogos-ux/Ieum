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
  name: string
  desc: string
  bg: string
  accent: string
  previewImage: string | null
  available: boolean
}

const themes: Theme[] = [
  {
    key: 'photo-blush',
    name: 'Blush',
    desc: '사진이 첫인상, 은은한 분홍 무드',
    bg: 'linear-gradient(140deg,#fff0f4 0%,#fddde6 100%)',
    accent: '#d9748b',
    previewImage: '/images/main1-ai.png',
    available: true,
  },
  {
    key: 'typography-ink',
    name: 'Ink',
    desc: '텍스트가 주인공, 절제된 흑백 모노',
    bg: 'linear-gradient(140deg,#f5f5f5 0%,#e8e8e8 100%)',
    accent: '#525252',
    previewImage: null,
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
            <strong className="font-semibold text-neutral-700">Blush</strong>로 만나보세요
            <br />새로운 테마도 준비 중입니다
          </p>
        </div>
      </section>

      {/* 테마 그리드 */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {themes.map((t) => (
              <div key={t.key} className="group relative">
                {/* 미리보기 카드 — 실제 IntroSection 미니어처 */}
                <div
                  className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl shadow-md shadow-neutral-200/60 ring-1 ring-neutral-100 transition-all ${
                    t.available
                      ? 'group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-neutral-200/40'
                      : 'opacity-70 grayscale'
                  }`}
                  style={t.previewImage ? undefined : { background: t.bg }}
                >
                  {t.previewImage && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.previewImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      {/* 상하 가독성 오버레이 */}
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
                        }}
                      />
                    </>
                  )}

                  {/* 상단: Wedding Invitation + 날짜 */}
                  <div
                    className={`relative w-full px-6 pt-6 text-center ${
                      t.previewImage
                        ? 'text-white drop-shadow-sm'
                        : ''
                    }`}
                    style={t.previewImage ? undefined : { color: t.accent }}
                  >
                    <p className="text-[9px] font-medium tracking-[0.35em] uppercase">
                      Wedding Invitation
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <span
                        className={`h-px w-3 ${t.previewImage ? 'bg-white/70' : ''}`}
                        style={
                          t.previewImage
                            ? undefined
                            : { background: t.accent, opacity: 0.4 }
                        }
                      />
                      <span className="text-[10px] tracking-[0.25em]">
                        2027 · 05 · 15
                      </span>
                      <span
                        className={`h-px w-3 ${t.previewImage ? 'bg-white/70' : ''}`}
                        style={
                          t.previewImage
                            ? undefined
                            : { background: t.accent, opacity: 0.4 }
                        }
                      />
                    </div>
                  </div>

                  {/* 하단: 이름 · 문구 */}
                  <div
                    className={`relative w-full px-6 pb-6 text-center ${
                      t.previewImage
                        ? 'text-white drop-shadow-md'
                        : ''
                    }`}
                    style={t.previewImage ? undefined : { color: t.accent }}
                  >
                    <div className="font-serif text-2xl font-medium tracking-wide">
                      민준
                      <span className="mx-2 font-light">&amp;</span>
                      서연
                    </div>
                    <div
                      className={`mx-auto my-2 h-px w-6 ${
                        t.previewImage
                          ? 'bg-white/60'
                          : ''
                      }`}
                      style={
                        t.previewImage
                          ? undefined
                          : { background: t.accent, opacity: 0.4 }
                      }
                    />
                    <p className={`font-serif text-[11px] ${t.previewImage ? 'text-white/90' : 'text-neutral-500'}`}>
                      우리 결혼합니다
                    </p>
                  </div>

                  {/* 상태 뱃지 */}
                  <div className="absolute top-3 left-3 z-10">
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

                {/* 카드 하단 설명 · CTA */}
                <div className="mt-3 space-y-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <p className="font-serif text-sm font-semibold text-neutral-900">
                      {t.name}
                    </p>
                    <span className="text-neutral-300">·</span>
                    <p className="text-[11px] text-neutral-500">{t.desc}</p>
                  </div>
                  {t.available ? (
                    <ThemePickButton themeKey={t.key} />
                  ) : (
                    <div className="w-full rounded-full bg-neutral-100 py-2.5 text-center text-xs font-medium text-neutral-400">
                      곧 만나요
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
