import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(247,236,236,0.08), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-2xl px-6 text-center md:px-8">
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
          <span className="font-serif text-2xl text-rose-300">✦</span>
        </div>

        <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
          지금 바로 시작해보세요
        </h2>

        <p className="mt-5 text-base leading-relaxed text-neutral-400">
          가입부터 공유까지 단 5분이면 충분해요
          <br />
          <span className="font-medium text-neutral-200">
            완전 무료 · 카드 등록 불필요
          </span>
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: '#FEE500', color: '#111' }}
          >
            카카오로 시작하기
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            구글로 시작하기
          </Link>
        </div>

        <p className="mt-10 text-xs text-neutral-500">
          결혼 준비의 시작을{' '}
          <strong className="font-semibold text-neutral-300">가장 정성스럽게</strong>{' '}
          함께할게요
        </p>
      </div>
    </section>
  )
}
