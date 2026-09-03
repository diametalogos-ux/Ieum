'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [supabase] = useState(() => createClient())
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (signInError) {
      setError(
        signInError.message === 'Invalid login credentials'
          ? '이메일 또는 비밀번호가 올바르지 않아요'
          : signInError.message
      )
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const handleGoogle = async () => {
    if (loading) return
    setError(null)
    setLoading(true)
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (oauthError) {
      setError('구글 로그인에 실패했어요. 잠시 후 다시 시도해주세요.')
      setLoading(false)
    }
  }

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
              다시 만나 반가워요
            </h1>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500">
              편집 중인 청첩장을 이어서 완성해보세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-neutral-600">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="mt-1.5 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-600">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                minLength={6}
                placeholder="6자 이상"
                className="mt-1.5 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-[11px] text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-[10px] text-neutral-400">
            <span className="h-px flex-1 bg-neutral-200" />
            <span>또는</span>
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-neutral-200 bg-white py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44c-.28 1.48-1.12 2.73-2.39 3.57v2.97h3.85c2.25-2.08 3.59-5.14 3.59-8.78z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.94-2.92l-3.85-2.97c-1.07.72-2.44 1.15-4.09 1.15-3.14 0-5.8-2.12-6.75-4.97H1.28v3.05C3.26 21.29 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.25 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.66H1.28C.46 8.28 0 10.09 0 12s.46 3.72 1.28 5.34l3.97-3.05z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.71 1.28 6.66l3.97 3.05C6.2 6.87 8.86 4.75 12 4.75z"/>
            </svg>
            Google로 계속하기
          </button>

          <Link
            href="/signup"
            className="mt-3 flex w-full items-center justify-center rounded-full border border-neutral-200 bg-white py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            새 계정 만들기
          </Link>

          <p className="mt-6 text-center text-[10px] leading-relaxed text-neutral-400">
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
