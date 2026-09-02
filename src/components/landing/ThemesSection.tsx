const themes = [
  { name: 'Romantic', bg: 'linear-gradient(140deg,#fff0f4 0%,#fddde6 100%)', accent: '#d9748b' },
  { name: 'Modern',   bg: 'linear-gradient(140deg,#f5f5f5 0%,#e8e8e8 100%)', accent: '#525252' },
  { name: 'Garden',   bg: 'linear-gradient(140deg,#f0f9f0 0%,#dcefd8 100%)', accent: '#6b9b6b' },
  { name: 'Vintage',  bg: 'linear-gradient(140deg,#fdf8ee 0%,#f0e4c8 100%)', accent: '#b39960' },
  { name: 'Minimal',  bg: 'linear-gradient(140deg,#fafafa 0%,#efefef 100%)', accent: '#404040' },
  { name: 'Luxury',   bg: 'linear-gradient(140deg,#fefae8 0%,#f0e0b0 100%)', accent: '#a88b3a' },
  { name: 'Bohemian', bg: 'linear-gradient(140deg,#fdf0e8 0%,#edd8c4 100%)', accent: '#b08268' },
  { name: 'Classic',  bg: 'linear-gradient(140deg,#eef3fc 0%,#d4e4f8 100%)', accent: '#5b7ab3' },
  { name: 'Floral',   bg: 'linear-gradient(140deg,#fdf0f8 0%,#f4d4ec 100%)', accent: '#c07ab0' },
  { name: 'Elegant',  bg: 'linear-gradient(140deg,#f5f0fc 0%,#e4d4f8 100%)', accent: '#8a6fc0' },
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
            10가지 감성 테마, 모두 무료로 제공해요
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {themes.map((t) => (
            <button
              key={t.name}
              type="button"
              className="group overflow-hidden rounded-2xl bg-white text-left ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/40"
            >
              <div
                className="relative flex h-40 items-center justify-center overflow-hidden"
                style={{ background: t.bg }}
              >
                <div className="flex w-full flex-col items-center gap-2 px-6">
                  <div
                    className="font-serif text-lg font-semibold tracking-wide"
                    style={{ color: t.accent }}
                  >
                    M &amp; S
                  </div>
                  <div className="h-px w-6" style={{ background: t.accent, opacity: 0.4 }} />
                  <div className="text-[9px] tracking-[0.3em] text-neutral-500">
                    2026 · 05 · 18
                  </div>
                </div>
              </div>
              <div className="border-t border-neutral-100 bg-white px-4 py-3">
                <span className="text-xs font-semibold tracking-widest text-neutral-600 uppercase">
                  {t.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-neutral-400">
          더 다양한 테마가 계속 추가될 예정이에요
        </p>
      </div>
    </section>
  )
}
