import Link from 'next/link'

const highlights = [
  '실제 청첩장과 동일한 구성',
  '방명록 · 참석여부 · 갤러리까지 체험',
  '테마별 미리보기 지원',
]

function PhonePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <div className="absolute -inset-8 rounded-[60px] bg-gradient-to-br from-rose-50 via-white to-amber-50/60 blur-3xl" />

      <div className="relative rounded-[42px] bg-neutral-900 p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)]">
        <div className="overflow-hidden rounded-[34px] bg-white">
          <div
            className="relative flex h-[500px] flex-col justify-between px-6 pt-14 pb-8"
            style={{
              background:
                'linear-gradient(to bottom, #fdf6f7 0%, #ffffff 55%, #fdf6f7 100%)',
            }}
          >
            <div className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-neutral-900" />

            <div className="text-center">
              <p className="font-serif text-[10px] tracking-[0.4em] text-rose-400/80 uppercase">
                Wedding Invitation
              </p>
              <p className="mt-2 text-[10px] tracking-[0.3em] text-neutral-500">
                2026 · 05 · 18
              </p>
            </div>

            <div className="flex flex-1 items-center justify-center py-6">
              <div
                className="flex aspect-[3/4] w-40 items-center justify-center rounded-sm shadow-lg"
                style={{
                  background:
                    'linear-gradient(135deg, #f7ecec 0%, #ecd8d8 50%, #d9b8bd 100%)',
                }}
              >
                <p className="font-serif text-3xl tracking-wider text-white/50">
                  M &amp; S
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-serif text-xl font-medium text-neutral-800">
                민준 <span className="text-rose-400">&amp;</span> 서연
              </h3>
              <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
                2026. 05. 18 · 토요일 오후 2시
                <br />
                그랜드 웨딩홀 로즈홀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SamplePreviewSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-12 md:px-8">
        <div className="order-2 md:order-1">
          <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
            Live Sample
          </p>
          <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl">
            직접 열어보세요
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-500">
            글로만 소개하지 않아요.
            <br />
            완성된 이음 청첩장을 실제로 열어보면
            <br />
            어떤 느낌인지 바로 알 수 있어요.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((text) => (
              <li key={text} className="flex items-start gap-3 text-sm text-neutral-700">
                <span
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row">
            <Link
              href="/invite/sample"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neutral-900/10 transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              샘플 청첩장 열어보기
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <PhonePreview />
        </div>
      </div>
    </section>
  )
}
