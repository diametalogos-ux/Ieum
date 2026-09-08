'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'

const navItems = [
  { label: '기능', href: '#features' },
]

export default function Header() {
  const router = useRouter()
  const pathname = usePathname() ?? '/'
  const { user, loading, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isThemesActive = pathname === '/themes' || pathname.startsWith('/themes/')
  const isDashboardActive =
    pathname === '/dashboard' || pathname.startsWith('/dashboard/')

  const handleSignOut = async () => {
    if (signingOut) return
    setSigningOut(true)
    await signOut()
    setMenuOpen(false)
    router.push('/')
    router.refresh()
    setSigningOut(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-100'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-neutral-900"
        >
          이음
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/themes"
            aria-current={isThemesActive ? 'page' : undefined}
            className={`relative text-sm transition-colors ${
              isThemesActive
                ? 'font-semibold text-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            테마
            {isThemesActive && (
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 right-0 mx-auto h-0.5 w-4 rounded-full bg-neutral-900"
              />
            )}
          </Link>
        </nav>

        {/* 데스크탑 CTA */}
        <div className="hidden items-center gap-2 md:flex">
          {loading ? (
            <div className="h-9 w-40" />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                aria-current={isDashboardActive ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isDashboardActive
                    ? 'bg-neutral-100 font-semibold text-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                대시보드
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-60"
              >
                {signingOut ? '로그아웃 중...' : '로그아웃'}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                로그인
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                무료 시작
              </Link>
            </>
          )}
        </div>

        {/* 모바일 우측: 텍스트 링크 2개 + 햄버거 */}
        <div className="relative flex items-center gap-1 md:hidden" ref={dropdownRef}>
          <Link
            href="/themes"
            aria-current={isThemesActive ? 'page' : undefined}
            className={`rounded-full px-2.5 py-1.5 text-[13px] transition-colors ${
              isThemesActive
                ? 'bg-neutral-100 font-semibold text-neutral-900'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            테마
          </Link>
          {loading ? (
            <span className="px-2.5 py-2 text-[13px] text-transparent">로그인</span>
          ) : user ? (
            <Link
              href="/dashboard"
              aria-current={isDashboardActive ? 'page' : undefined}
              className={`rounded-full px-2.5 py-1.5 text-[13px] transition-colors ${
                isDashboardActive
                  ? 'bg-neutral-100 font-semibold text-neutral-900'
                  : 'font-medium text-neutral-800 hover:text-neutral-950'
              }`}
            >
              대시보드
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-2.5 py-2 text-[13px] font-medium text-neutral-800 transition-colors hover:text-neutral-950"
            >
              로그인
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-xl">
              <nav className="py-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-neutral-100 p-2">
                {user ? (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="block w-full rounded-xl bg-neutral-900 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
                  >
                    {signingOut ? '로그아웃 중...' : '로그아웃'}
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl bg-neutral-900 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                  >
                    무료 시작
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
