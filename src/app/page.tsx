import Link from 'next/link'
import type { Metadata } from 'next'
import InquiryLink from '@/components/ui/InquiryLink'

export const metadata: Metadata = {
  title: '이음 (Ieum) — 인생의 순간을 잇는 서비스',
  description:
    '모바일 청첩장, 부고장, 화환 주문까지. 소중한 순간을 정성스럽게 전하세요.',
}

type Service = {
  index: string
  label: string
  ko: string
  tagline: string
  href: string
  accent: string
  available: boolean
}

const services: Service[] = [
  {
    index: '01',
    label: 'Wedding',
    ko: '모바일 청첩장',
    tagline: '두 사람의 이야기를 전하다',
    href: '/wedding',
    accent: '#c88a97',
    available: true,
  },
  {
    index: '02',
    label: 'Obituary',
    ko: '모바일 부고장',
    tagline: '삼가 마지막 소식을 알리다',
    href: '/obituary',
    accent: '#7a7a82',
    available: false,
  },
  {
    index: '03',
    label: 'Wreath',
    ko: '화환 주문',
    tagline: '축하와 위로를 대신 보내다',
    href: '/wreath',
    accent: '#b5946a',
    available: true,
  },
]

export default function HubPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-neutral-900/10" />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 md:px-10">
        {/* 상단 브랜드 라벨 */}
        <header className="flex items-center justify-between pt-8 md:pt-10">
          <p className="text-[10px] font-medium tracking-[0.4em] text-neutral-500 uppercase">
            Ieum · Est. 2026
          </p>
          <p className="text-[10px] font-medium tracking-[0.3em] text-neutral-500 uppercase">
            Seoul, KR
          </p>
        </header>

        {/* 브랜드 히어로 */}
        <section className="pt-16 pb-16 md:grid md:grid-cols-12 md:gap-8 md:pt-24 md:pb-24">
          <div className="md:col-span-7 md:pr-8">
            <p className="font-editorial text-[11px] tracking-widest text-neutral-500">
              A journal for
              <br />
              life&apos;s quiet moments
            </p>
            <h1
              className="font-editorial mt-6 leading-[0.9] tracking-tight text-neutral-900"
              style={{ fontSize: 'clamp(4.5rem, 14vw, 11rem)' }}
            >
              이음
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-16 bg-neutral-900/40" />
              <p className="text-xs tracking-[0.25em] text-neutral-600 uppercase">
                To connect
              </p>
            </div>
          </div>

          <div className="mt-10 md:col-span-5 md:mt-0 md:flex md:flex-col md:justify-end">
            <p className="font-editorial text-[15px] leading-[1.9] text-neutral-700 md:text-base">
              결혼과 이별,
              <br />
              축하와 위로 사이에
              <br />
              우리는 서로를 잇습니다.
            </p>
            <p className="mt-6 text-[11px] leading-relaxed text-neutral-500">
              이음은 인생의 결정적 순간을
              <br />
              가장 정성스러운 방식으로 전하는
              <br />
              디지털 종이 서비스입니다.
            </p>
          </div>
        </section>

        {/* 서비스 리스트 */}
        <section className="pb-24">
          <div className="mb-4 flex items-baseline justify-between border-b border-neutral-900/15 pb-3">
            <p className="text-[10px] font-semibold tracking-[0.35em] text-neutral-800 uppercase">
              Our Services
            </p>
            <p className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
              No. 001—003
            </p>
          </div>

          <ul>
            {services.map((s, i) => {
              const inner = (
                <article className="group relative flex items-center gap-6 py-10 md:gap-10 md:py-14">
                  {/* hover 배경 */}
                  {s.available && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:inset-x-[-2.5rem]"
                      style={{ background: `${s.accent}0d` }}
                    />
                  )}

                  {/* 인덱스 (큼직) */}
                  <div className="w-16 shrink-0 md:w-24">
                    <p
                      className="font-editorial text-4xl leading-none md:text-6xl"
                      style={{ color: s.accent }}
                    >
                      {s.index}
                    </p>
                  </div>

                  {/* 텍스트 그룹 */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[10px] font-semibold tracking-[0.4em] uppercase"
                      style={{ color: s.accent }}
                    >
                      {s.label}
                    </p>
                    <h2 className="font-editorial mt-3 text-[28px] leading-none tracking-tight text-neutral-900 md:text-[44px]">
                      {s.ko}
                    </h2>
                    <p className="font-editorial mt-3 text-sm text-neutral-500 md:text-base">
                      {s.tagline}
                    </p>
                  </div>

                  {/* 우측 상태 */}
                  <div className="shrink-0">
                    {s.available ? (
                      <div className="flex items-center gap-3 text-neutral-900">
                        <span className="hidden text-[10px] font-medium tracking-[0.3em] uppercase md:inline">
                          Enter
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2 md:h-7 md:w-7"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    ) : (
                      <span
                        className="inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-neutral-500 uppercase"
                      >
                        Soon
                      </span>
                    )}
                  </div>
                </article>
              )

              return (
                <li
                  key={s.index}
                  className={
                    i === services.length - 1
                      ? ''
                      : 'border-b border-neutral-900/10'
                  }
                >
                  {s.available ? (
                    <Link href={s.href} className="block">
                      {inner}
                    </Link>
                  ) : (
                    <div className="cursor-not-allowed opacity-70">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        {/* 하단 */}
        <footer className="border-t border-neutral-900/10 py-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="font-editorial text-sm text-neutral-700">
                Ieum &nbsp;·&nbsp; 이음
              </p>
              <p className="mt-1 text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
                © 2026 All rights reserved
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-wide text-neutral-500">
              <Link href="/privacy" className="hover:text-neutral-900">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-neutral-900">
                이용약관
              </Link>
              <InquiryLink className="hover:text-neutral-900" />
              <a
                href="https://www.instagram.com/ieum.mlog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-neutral-900"
                aria-label="이음 인스타그램"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                @ieum.mlog
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </main>
  )
}
