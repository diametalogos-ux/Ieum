'use client'

import { useEffect, useState } from 'react'
import { useEditor } from './EditorContext'
import { setInvitationStatus } from '@/lib/invitations/client'
import { checkPublishReadiness } from '@/lib/invitations/publish-check'

export default function PublishButton() {
  const { data, status, setStatus, isDirty } = useEditor()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const readiness = checkPublishReadiness(data)
  const isPublished = status === 'published'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const canOpen = isPublished || readiness.ready
  const nextStatus = isPublished ? 'draft' : 'published'

  const handleTrigger = () => {
    setError(null)
    setOpen(true)
  }

  const handleConfirm = async () => {
    if (busy) return
    setBusy(true)
    setError(null)
    const result = await setInvitationStatus(data.id, nextStatus)
    if (!result.ok) {
      setError(result.error)
      setBusy(false)
      return
    }
    setStatus(nextStatus)
    setBusy(false)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleTrigger}
        disabled={!canOpen}
        className={`flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold transition-colors ${
          isPublished
            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            : canOpen
            ? 'bg-neutral-900 text-white hover:bg-neutral-800'
            : 'bg-neutral-100 text-neutral-400'
        }`}
        title={
          canOpen
            ? undefined
            : `필수 정보 ${readiness.missing.length}개 입력이 필요해요`
        }
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isPublished
              ? 'bg-emerald-500'
              : canOpen
              ? 'bg-white'
              : 'bg-neutral-400'
          }`}
        />
        {isPublished ? '공개 중' : canOpen ? '공개하기' : '공개 준비'}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => !busy && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="mx-6 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
          >
            {isPublished ? (
              <>
                <h3 className="font-serif text-lg font-semibold text-neutral-900">
                  비공개로 전환할까요?
                </h3>
                <p className="mt-3 text-[12px] leading-relaxed text-neutral-500">
                  링크로 접속한 하객이 청첩장을 볼 수 없게 됩니다.
                  <br />
                  편집 후 다시 공개할 수 있어요.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-lg font-semibold text-neutral-900">
                  청첩장을 공개할까요?
                </h3>
                <p className="mt-3 text-[12px] leading-relaxed text-neutral-500">
                  링크만 있으면 누구나 청첩장을 볼 수 있게 됩니다.
                  {isDirty && (
                    <>
                      <br />
                      <span className="text-amber-600">
                        저장되지 않은 변경이 있어요. 잠시 후 자동 저장돼요.
                      </span>
                    </>
                  )}
                </p>

                <div className="mt-4 rounded-2xl bg-neutral-50 p-3 text-[11px] text-neutral-600">
                  <p className="font-medium text-neutral-800">필수 정보 체크</p>
                  <ul className="mt-1.5 space-y-1">
                    {(
                      [
                        { key: 'groom', label: '신랑 이름' },
                        { key: 'bride', label: '신부 이름' },
                        { key: 'date', label: '예식일' },
                        { key: 'time', label: '예식 시간' },
                        { key: 'venueName', label: '예식장 이름' },
                        { key: 'venueAddress', label: '예식장 주소' },
                        { key: 'venueHall', label: '상세 주소 (홀·층)' },
                        { key: 'mainPhotoUrl', label: '메인 사진' },
                      ] as const
                    ).map((f) => {
                      const missing = readiness.missing.some(
                        (m) => m.key === f.key
                      )
                      return (
                        <li
                          key={f.key}
                          className="flex items-center gap-1.5"
                        >
                          {missing ? (
                            <span className="text-red-500">✗</span>
                          ) : (
                            <span className="text-emerald-500">✓</span>
                          )}
                          <span
                            className={
                              missing
                                ? 'text-red-500'
                                : 'text-neutral-700'
                            }
                          >
                            {f.label}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </>
            )}

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[11px] text-red-600">
                {error}
              </p>
            )}

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={busy}
                className="flex-1 rounded-full border border-neutral-200 bg-white py-2.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={busy}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold text-white transition-colors disabled:opacity-60 ${
                  isPublished
                    ? 'bg-neutral-900 hover:bg-neutral-800'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {busy ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    처리 중
                  </>
                ) : isPublished ? (
                  '비공개로 전환'
                ) : (
                  '공개하기'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
