import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-6 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 20%, rgba(247,236,236,0.7), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(250,240,235,0.6), transparent 70%)',
        }}
      />

      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-10 flex items-center justify-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          홈으로 돌아가기
        </Link>

        <div className="rounded-3xl border border-neutral-100 bg-white/70 p-10 shadow-xl shadow-neutral-200/30 backdrop-blur">
          <div className="text-center">
            <Link
              href="/"
              className="font-serif inline-block text-3xl font-semibold tracking-tight text-neutral-900"
            >
              이음
            </Link>
            <p className="mt-3 text-[11px] font-medium tracking-[0.3em] text-neutral-400 uppercase">
              Ieum · Wedding Invitation
            </p>

            <h1 className="font-serif mt-8 text-xl font-medium leading-relaxed text-neutral-800">
              두 사람의 이야기를
              <br />
              지금 시작해보세요
            </h1>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500">
              간단한 로그인으로 청첩장을 만들고
              <br />
              언제든 다시 이어서 편집할 수 있어요
            </p>
          </div>

          <div className="mt-10 space-y-3">
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: '#FEE500', color: '#111' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 3C6.48 3 2 6.58 2 11c0 2.87 1.9 5.38 4.72 6.79-.14.51-.9 3.27-.93 3.42 0 0-.02.13.06.19.09.05.19.01.19.01.27-.04 3.13-2.04 3.62-2.38.77.11 1.55.17 2.34.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
              </svg>
              카카오로 시작하기
            </Link>

            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2.5 rounded-full border border-neutral-200 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              구글로 시작하기
            </Link>
          </div>

          <div className="my-8 flex items-center gap-3 text-[11px] text-neutral-400">
            <span className="h-px flex-1 bg-neutral-200" />
            <span>안전하고 빠른 소셜 로그인</span>
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <p className="text-center text-[11px] leading-relaxed text-neutral-400">
            로그인 시{' '}
            <Link href="/terms" className="underline underline-offset-2 hover:text-neutral-700">
              이용약관
            </Link>
            {' 및 '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-neutral-700">
              개인정보처리방침
            </Link>
            에 동의하게 됩니다
          </p>
        </div>

        <p className="mt-8 text-center text-[11px] text-neutral-400">
          © 2026 이음 (Ieum) · 무료 모바일 청첩장
        </p>
      </div>
    </div>
  )
}
