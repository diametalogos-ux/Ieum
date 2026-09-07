'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor } from './EditorContext'
import { updateInvitation } from '@/lib/invitations/client'
import PublishButton from './PublishButton'

const AUTOSAVE_DEBOUNCE_MS = 30000

export default function EditorTopBar() {
  const { data, palette, isDirty, saveTick, markSaved } = useEditor()
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // 최신 값 스냅샷 — 이벤트 핸들러(visibilitychange 등)에서 stale closure 회피
  const latestRef = useRef({ data, palette, isDirty })
  latestRef.current = { data, palette, isDirty }

  const runSave = useCallback(async () => {
    setSaving(true)
    setSaveError(null)
    const result = await updateInvitation(data.id, data, palette)
    if (result.ok) {
      setSaveError(null)
      markSaved()
      setSavedAt(new Date())
    } else {
      setSaveError(`저장 실패: ${result.error}`)
    }
    setSaving(false)
  }, [data, palette, markSaved])

  // 자동 저장: 편집 후 debounce 뒤에 저장 실행
  useEffect(() => {
    if (!isDirty) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(runSave, AUTOSAVE_DEBOUNCE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isDirty, data, runSave])

  // 즉시 저장 트리거 (이미지 업로드 등 큰 변경 직후)
  useEffect(() => {
    if (saveTick === 0) return
    if (timerRef.current) clearTimeout(timerRef.current)
    void runSave()
  }, [saveTick, runSave])

  // 탭 숨김 / 페이지 이탈 시 저장 (편집 중이었으면)
  useEffect(() => {
    const flush = () => {
      if (!latestRef.current.isDirty) return
      const { data: d, palette: p } = latestRef.current
      // fire-and-forget — visibilitychange/pagehide 는 응답 기다릴 여유 없음
      void updateInvitation(d.id, d, p)
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush()
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', flush)
    }
  }, [])

  const handleSave = () => {
    if (saving) return
    if (timerRef.current) clearTimeout(timerRef.current)
    runSave()
  }

  const title = data.couple.groom.firstName && data.couple.bride.firstName
    ? `${data.couple.groom.firstName} · ${data.couple.bride.firstName}`
    : '새 청첩장'

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full items-center justify-between px-4 md:h-16 md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Link
            href="/dashboard"
            aria-label="대시보드로"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>

          <div className="min-w-0">
            <p className="font-serif truncate text-sm font-semibold text-neutral-900 md:text-base">
              {title}
            </p>
            <p className="flex items-center gap-1 text-[10px] text-neutral-400">
              {saving ? (
                <>
                  <span className="h-2.5 w-2.5 animate-spin rounded-full border border-neutral-300 border-t-neutral-700" />
                  <span className="text-neutral-500">자동 저장 중...</span>
                </>
              ) : saveError ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span className="max-w-[240px] truncate text-orange-600" title={saveError}>
                    저장 실패
                  </span>
                </>
              ) : isDirty ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span className="text-amber-600">변경사항 있음</span>
                </>
              ) : savedAt ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>
                    {savedAt.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    자동 저장됨
                  </span>
                </>
              ) : (
                '편집 시작'
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1.5">
          {/* 모바일: 미리보기 = 실제 청첩장 페이지로 이동 (데스크탑은 우측에 이미 프레임 있음) */}
          <Link
            href={`/invite/${data.slug}?edit=1`}
            className="flex h-9 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            미리보기
          </Link>

          <Link
            href={`/dashboard/invitations/${data.id}`}
            className="hidden h-9 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 md:flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            응답 관리
          </Link>

          <PublishButton />

          <Link
            href={`/invite/${data.slug}`}
            target="_blank"
            className="hidden h-9 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 md:flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            새 창에서 보기
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !isDirty}
            className={`flex h-9 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-all ${
              isDirty && !saving
                ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                : 'bg-neutral-100 text-neutral-400'
            }`}
          >
            {saving ? (
              <>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                저장 중
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                저장
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
