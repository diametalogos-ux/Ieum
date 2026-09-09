import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-6 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 20%, rgba(247,236,236,0.6), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(250,240,235,0.5), transparent 70%)',
        }}
      />

      <div className="w-full max-w-md text-center">
        <p className="font-serif text-[11px] font-medium tracking-[0.5em] text-neutral-400 uppercase">
          404 · Not Found
        </p>

        <h1 className="font-serif mt-6 text-6xl font-semibold tracking-tight text-neutral-900 md:text-7xl">
          <span className="text-rose-300">4</span>
          <span className="mx-1 text-neutral-800">0</span>
          <span className="text-rose-300">4</span>
        </h1>

        <div className="mx-auto mt-8 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-neutral-200" />
          <span className="text-sm text-rose-300">✿</span>
          <span className="h-px w-8 bg-neutral-200" />
        </div>

        <h2 className="font-serif mt-8 text-xl font-medium text-neutral-800">
          찾으시는 청첩장이 없어요
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          주소가 잘못되었거나
          <br />
          삭제된 청첩장일 수 있어요
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            홈으로 가기
          </Link>
          <Link
            href="/wedding/dashboard"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            내 청첩장 보기
          </Link>
        </div>

        <p className="mt-12 text-[11px] text-neutral-400">
          © 2026 이음 (Ieum) · 무료 모바일 청첩장
        </p>
      </div>
    </div>
  )
}
