import Link from 'next/link'

const stats = [
  { num: '100%', label: '완전 무료' },
  { num: '5분', label: '이면 완성' },
  { num: '평생', label: '무제한 소장' },
]

function CardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-rose-50 via-white to-amber-50 blur-2xl" />

      <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-neutral-100">
        <div
          className="relative h-56 w-full"
          style={{
            background:
              'linear-gradient(135deg, #f7ecec 0%, #f0e0d8 50%, #e8d5c9 100%)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-serif text-6xl text-white/40">M &amp; S</div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-[10px] tracking-[0.3em] text-neutral-700 backdrop-blur">
            2026 · 05 · 18
          </div>
        </div>

        <div className="px-7 py-8 text-center">
          <p className="font-serif text-lg font-medium tracking-wide text-neutral-900">
            민준 &nbsp;·&nbsp; 서연
          </p>
          <div className="mx-auto my-4 h-px w-8 bg-neutral-200" />
          <p className="text-[11px] leading-relaxed text-neutral-500">
            2026년 5월 18일 토요일 오후 2시
            <br />
            그랜드 웨딩홀 2층 로즈홀
          </p>

          <div className="mt-6 flex justify-center gap-1.5">
            {['갤러리', '오시는길', '방명록'].map((label) => (
              <span
                key={label}
                className="rounded-full bg-neutral-50 px-2.5 py-1 text-[9px] text-neutral-500"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20 md:pt-32 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(247,236,236,0.6), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(250,240,235,0.5), transparent 70%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-8">
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
            For Your Special Day
          </span>

          <h1 className="font-serif mt-6 text-[40px] font-semibold leading-[1.15] tracking-tight text-neutral-900 md:text-[56px]">
            두 사람을 잇는
            <br />
            <span className="text-neutral-400">가장 </span>
            아름다운 시작
          </h1>

          <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">
            설레는 하루의 시작을
            <br className="hidden sm:inline" />{' '}
            <strong className="font-semibold text-neutral-900">
              가장 정성스럽게
            </strong>{' '}
            전하세요
          </p>

          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row md:justify-start">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neutral-900/10 transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              청첩장 만들기
            </Link>
            <Link
              href="/invite/sample"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-7 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            >
              샘플 자세히 보기
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-neutral-100 pt-8 md:gap-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <dt className="font-serif text-xl font-semibold text-neutral-900 md:text-2xl">
                  {s.num}
                </dt>
                <dd className="mt-1 text-xs text-neutral-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-float">
          <CardMockup />
        </div>
      </div>
    </section>
  )
}
