import Link from 'next/link'
import InquiryLink from '@/components/ui/InquiryLink'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:px-8">
        <div className="text-center md:text-left">
          <p className="font-serif text-lg font-semibold text-neutral-900">
            이음
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            무료 모바일 청첩장 서비스
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link
            href="/privacy"
            className="text-xs text-neutral-500 transition-colors hover:text-neutral-900"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/terms"
            className="text-xs text-neutral-500 transition-colors hover:text-neutral-900"
          >
            이용약관
          </Link>
          <InquiryLink className="text-xs text-neutral-500 transition-colors hover:text-neutral-900" />
          <a
            href="https://www.instagram.com/ieum.mlog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-900"
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

        <p className="text-xs text-neutral-400">© 2026 이음 (Ieum)</p>
      </div>
    </footer>
  )
}
