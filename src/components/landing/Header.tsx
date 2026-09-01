'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md border-b border-neutral-100' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="text-xl font-bold text-neutral-900 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
          청첩
        </Link>

        {/* 데스크탑 네비 */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors font-sans">기능</Link>
          <Link href="#themes"   className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors font-sans">테마</Link>
          <Link href="#reviews"  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors font-sans">후기</Link>
          <Link href="/invite/sample" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors font-sans">샘플 보기</Link>
        </nav>

        {/* 데스크탑 CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors font-sans">
            로그인
          </Link>
          <Link href="/login" className="text-sm font-semibold text-white bg-neutral-900 px-5 py-2.5 rounded-full hover:bg-neutral-700 transition-colors font-sans">
            무료로 시작하기
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 text-neutral-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-current my-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-6 py-4 flex flex-col gap-4">
          {['#features', '#themes', '#reviews'].map((href, i) => (
            <Link key={i} href={href} className="text-sm text-neutral-600 font-sans py-1" onClick={() => setMenuOpen(false)}>
              {['기능', '테마', '후기'][i]}
            </Link>
          ))}
          <Link href="/invite/sample" className="text-sm text-neutral-600 font-sans py-1" onClick={() => setMenuOpen(false)}>
            샘플 보기
          </Link>
          <Link href="/login" className="text-sm font-semibold text-white bg-neutral-900 px-5 py-3 rounded-full text-center font-sans mt-2" onClick={() => setMenuOpen(false)}>
            무료로 시작하기
          </Link>
        </div>
      )}
    </header>
  )
}
