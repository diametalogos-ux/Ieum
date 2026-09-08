'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const APPEAR_AFTER_PX = 400 // hero 지나면 나타남

export default function LandingFloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > APPEAR_AFTER_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 20px)',
      }}
      aria-hidden={!visible}
    >
      <div
        className={`pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/30 bg-neutral-900/70 p-1.5 shadow-lg backdrop-blur-md ${
          visible ? '' : 'pointer-events-none'
        }`}
      >
        <Link
          href="/editor/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-900 transition-transform hover:-translate-y-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          청첩장 만들기
        </Link>
        <Link
          href="/themes"
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-white/90 transition-colors hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          테마 구경하기
        </Link>
      </div>
    </div>
  )
}
