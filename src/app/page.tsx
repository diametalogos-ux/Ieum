import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이음 (Ieum) — 인생의 순간을 잇는 서비스',
  description:
    '모바일 청첩장, 부고장, 화환 주문까지. 소중한 순간을 정성스럽게 전하세요.',
}

type ServiceCard = {
  key: string
  title: string
  subtitle: string
  desc: string
  href: string
  bg: string
  accent: string
  available: boolean
  icon: React.ReactNode
}

const services: ServiceCard[] = [
  {
    key: 'wedding',
    title: '모바일 청첩장',
    subtitle: 'Wedding',
    desc: '두 사람의 이야기를\n가장 아름답게 전하세요',
    href: '/wedding',
    bg: 'linear-gradient(140deg,#fff0f4 0%,#fddde6 100%)',
    accent: '#d9748b',
    available: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    key: 'obituary',
    title: '모바일 부고장',
    subtitle: 'Obituary',
    desc: '고인을 기리는 마음을\n정갈하게 전합니다',
    href: '/obituary',
    bg: 'linear-gradient(140deg,#f5f5f7 0%,#e0e0e6 100%)',
    accent: '#525260',
    available: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2v20" />
        <path d="M7 8s5-3 5 0 5-3 5 0" />
        <path d="M5 13s7-5 7 0 7-5 7 0" />
      </svg>
    ),
  },
  {
    key: 'wreath',
    title: '화환 주문',
    subtitle: 'Wreath',
    desc: '축하와 조의를\n꽃으로 전해보세요',
    href: '/wreath',
    bg: 'linear-gradient(140deg,#f7f0e8 0%,#e8d8c4 100%)',
    accent: '#a88b5a',
    available: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="13" r="7" />
        <path d="M9 4l3 4 3-4" />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
]

export default function HubPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(247,236,236,0.5), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(245,240,232,0.4), transparent 70%)',
        }}
      />

      {/* 상단 브랜드 */}
      <header className="pt-24 pb-8 text-center md:pt-32 md:pb-10">
        <p className="text-[11px] font-medium tracking-[0.5em] text-neutral-400 uppercase">
          Ieum
        </p>
        <h1 className="font-serif mt-4 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
          이음
        </h1>
        <p className="mt-5 text-sm text-neutral-500 md:text-base">
          인생의 소중한 순간을
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>
          정성스럽게 전하는 이음의 서비스
        </p>
      </header>

      {/* 서비스 카드 */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 md:grid-cols-3 md:gap-8 md:px-8">
          {services.map((s) => {
            const inner = (
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-md shadow-neutral-200/60 ring-1 ring-neutral-100 transition-all ${
                  s.available
                    ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-200/50'
                    : 'opacity-70'
                }`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{ background: s.bg }}
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 backdrop-blur"
                      style={{ color: s.accent }}
                    >
                      {s.icon}
                    </div>
                    {!s.available && (
                      <span className="inline-flex items-center rounded-full bg-neutral-800/70 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white backdrop-blur">
                        준비 중
                      </span>
                    )}
                  </div>

                  <div className="mt-10">
                    <p
                      className="text-[10px] font-medium tracking-[0.35em] uppercase"
                      style={{ color: s.accent, opacity: 0.7 }}
                    >
                      {s.subtitle}
                    </p>
                    <h2 className="font-serif mt-2 text-xl font-semibold text-neutral-900 md:text-2xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 whitespace-pre-line text-[13px] leading-relaxed text-neutral-600">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-10 flex-1" />

                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={`font-medium ${
                        s.available ? 'text-neutral-900' : 'text-neutral-400'
                      }`}
                    >
                      {s.available ? '시작하기' : '곧 만나요'}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-4 w-4 transition-transform ${
                        s.available
                          ? 'text-neutral-900 group-hover:translate-x-1'
                          : 'text-neutral-400'
                      }`}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            )
            return s.available ? (
              <Link key={s.key} href={s.href} className="block">
                {inner}
              </Link>
            ) : (
              <div key={s.key} className="cursor-not-allowed">
                {inner}
              </div>
            )
          })}
        </div>
      </section>

      {/* 하단 */}
      <footer className="border-t border-neutral-100 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 px-6 md:flex-row md:justify-between md:px-8">
          <p className="text-xs text-neutral-400">© 2026 이음 (Ieum)</p>
          <nav className="flex flex-wrap gap-x-6 text-xs text-neutral-500">
            <Link href="/privacy" className="hover:text-neutral-900">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-neutral-900">
              이용약관
            </Link>
            <a
              href="mailto:tkdkagody@gmail.com"
              className="hover:text-neutral-900"
            >
              문의
            </a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
