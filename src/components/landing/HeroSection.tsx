import Link from 'next/link'

const stats = [
  { num: '100%', label: '완전 무료' },
  { num: '5분', label: '이면 완성' },
  { num: '평생', label: '무제한 소장' },
]

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

      <div className="mx-auto w-full max-w-3xl px-6 text-center md:px-8">
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
          설레는 하루의 시작을{' '}
          <strong className="font-semibold text-neutral-900">
            가장 정성스럽게
          </strong>{' '}
          전하세요
        </p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neutral-900/10 transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            청첩장 만들기
          </Link>
          <Link
            href="/wedding/invite/sample"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-7 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          >
            샘플 자세히 보기
          </Link>
        </div>

        <dl className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-neutral-100 pt-8 md:gap-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="font-serif text-xl font-semibold text-neutral-900 md:text-2xl">
                {s.num}
              </dt>
              <dd className="mt-1 text-xs text-neutral-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
