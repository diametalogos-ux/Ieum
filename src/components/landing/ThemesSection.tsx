import Link from 'next/link'

const themes = [
  {
    category: 'Photo',
    name: 'Blush',
    bg: 'linear-gradient(140deg,#fff0f4 0%,#fddde6 100%)',
    accent: '#d9748b',
    available: true,
  },
  {
    category: 'Typography',
    name: 'Ink',
    bg: 'linear-gradient(140deg,#f5f5f5 0%,#e8e8e8 100%)',
    accent: '#525252',
    available: false,
  },
]

export default function ThemesSection() {
  return (
    <section id="themes" className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
            Themes
          </p>
          <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl">
            우리 스타일에 맞는
            <br />
            테마를 골라보세요
          </h2>
          <p className="mt-5 text-base text-neutral-500">
            지금은 <strong className="font-semibold text-neutral-700">Photo · Blush</strong> 가 준비되어 있어요
            <br />
            더 다양한 레이아웃과 무드가 계속 추가될 예정이에요
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {themes.map((t) => (
            <div
              key={t.name}
              className={`group relative overflow-hidden rounded-2xl bg-white text-left ring-1 ring-neutral-100 transition-all ${
                t.available
                  ? 'hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/40'
                  : ''
              }`}
            >
              <div
                className={`relative flex h-56 items-center justify-center overflow-hidden ${
                  t.available ? '' : 'opacity-60 grayscale'
                }`}
                style={{ background: t.bg }}
              >
                <div className="flex w-full flex-col items-center gap-2 px-6">
                  <div
                    className="font-serif text-xl font-semibold tracking-wide"
                    style={{ color: t.accent }}
                  >
                    M &amp; S
                  </div>
                  <div className="h-px w-6" style={{ background: t.accent, opacity: 0.4 }} />
                  <div className="text-[9px] tracking-[0.3em] text-neutral-500">
                    2026 · 05 · 18
                  </div>
                </div>

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
              <div className="border-t border-neutral-100 bg-white px-4 py-3">
                <p className="text-[9px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
                  {t.category}
                </p>
                <p className="font-serif mt-0.5 text-sm font-semibold text-neutral-900">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-2">
          <Link
            href="/themes"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            전체 테마 보기
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
          <p className="text-xs text-neutral-400">
            더 다양한 테마가 계속 추가될 예정이에요
          </p>
        </div>
      </div>
    </section>
  )
}
