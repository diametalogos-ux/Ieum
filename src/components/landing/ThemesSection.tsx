import Link from 'next/link'

const themes = [
  {
    name: 'Blush',
    bg: 'linear-gradient(140deg,#fff0f4 0%,#fddde6 100%)',
    accent: '#d9748b',
    previewImage: '/images/main1-ai.png' as string | null,
    available: true,
  },
  {
    name: 'Ink',
    bg: 'linear-gradient(140deg,#f5f5f5 0%,#e8e8e8 100%)',
    accent: '#525252',
    previewImage: null as string | null,
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
            <strong className="font-semibold text-neutral-700">Blush</strong>로 만나보세요
            <br />
            새로운 테마도 준비 중입니다
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
          {themes.map((t) => (
            <div key={t.name} className="group relative">
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

                {/* 상단 */}
                <div
                  className={`relative w-full px-4 pt-4 text-center ${
                    t.previewImage ? 'text-white drop-shadow-sm' : ''
                  }`}
                  style={t.previewImage ? undefined : { color: t.accent }}
                >
                  <p className="text-[8px] font-medium tracking-[0.35em] uppercase">
                    Wedding Invitation
                  </p>
                </div>

                {/* 하단 */}
                <div
                  className={`relative w-full px-4 pb-5 text-center ${
                    t.previewImage ? 'text-white drop-shadow-md' : ''
                  }`}
                  style={t.previewImage ? undefined : { color: t.accent }}
                >
                  <div className="font-serif text-xl font-medium tracking-wide">
                    민준
                    <span className="mx-1.5 font-light">&amp;</span>
                    서연
                  </div>
                  <div
                    className={`mx-auto my-1.5 h-px w-5 ${t.previewImage ? 'bg-white/60' : ''}`}
                    style={
                      t.previewImage
                        ? undefined
                        : { background: t.accent, opacity: 0.4 }
                    }
                  />
                  <p className={`text-[9px] tracking-[0.25em] ${t.previewImage ? 'text-white/85' : 'text-neutral-500'}`}>
                    2027 · 05 · 15
                  </p>
                </div>

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
              <p className="mt-3 text-center font-serif text-sm font-semibold text-neutral-900">
                {t.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-2">
          <Link
            href="/wedding/themes"
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
