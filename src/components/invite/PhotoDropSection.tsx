'use client'

import { useEffect, useRef, useState } from 'react'
import type { InvitationData } from '@/types/invitation'
import {
  listPhotoDropByInvitation,
  uploadPhotoDrop,
  type PhotoDropEntry,
} from '@/lib/photodrop/client'
import { IMAGE_ACCEPT } from '@/lib/image-utils'

type Props = { data: InvitationData }

export default function PhotoDropSection({ data }: Props) {
  const [entries, setEntries] = useState<PhotoDropEntry[]>([])
  const [uploaderName, setUploaderName] = useState('')
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [expanded, setExpanded] = useState<PhotoDropEntry | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    void listPhotoDropByInvitation(data.id).then(setEntries)
  }, [data.id])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(null)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [expanded])

  const handlePick = () => {
    if (uploading) return
    inputRef.current?.click()
  }

  const handleFile = async (file: File) => {
    setUploading(true)
    setError(null)
    setOk(false)
    const result = await uploadPhotoDrop({
      invitationId: data.id,
      file,
      uploaderName: uploaderName.trim(),
      message: message.trim(),
    })
    setUploading(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setEntries((prev) => [result.entry, ...prev])
    setUploaderName('')
    setMessage('')
    setOk(true)
    setTimeout(() => setOk(false), 2000)
  }

  return (
    <section className="bg-white px-8 py-14">
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          Photo Drop
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          하객 사진 남기기
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-neutral-500">
          결혼식장에서 찍은 사진을 함께 나눠주세요
          <br />
          두 사람의 소중한 추억이 됩니다
        </p>
      </div>

      {/* 갤러리 */}
      {entries.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-1.5">
          {entries.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setExpanded(e)}
              className="group relative aspect-square overflow-hidden rounded-md bg-neutral-100"
              aria-label={`${e.uploaderName ?? '하객'} 사진 크게 보기`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={e.imageUrl}
                alt={e.uploaderName ?? 'photo'}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              {e.uploaderName && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1">
                  <p className="truncate text-[9px] font-medium text-white">
                    {e.uploaderName}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 업로드 폼 */}
      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5">
        <p className="text-[11px] font-medium text-neutral-700">사진 남기기</p>
        <div className="mt-3 space-y-2.5">
          <input
            type="text"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            placeholder="이름 (선택)"
            maxLength={20}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="한 줄 메시지 (선택)"
            rows={2}
            maxLength={100}
            className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
          />

          <input
            ref={inputRef}
            type="file"
            accept={IMAGE_ACCEPT}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void handleFile(f)
              if (inputRef.current) inputRef.current.value = ''
            }}
            className="hidden"
          />

          {ok && (
            <p className="text-[11px] text-emerald-600">
              사진이 업로드되었어요, 감사합니다 🌸
            </p>
          )}
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-[11px] text-red-600">
              {error}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handlePick}
          disabled={uploading}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: 'var(--p-strong)' }}
        >
          {uploading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              업로드 중...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              사진 업로드
            </>
          )}
        </button>
        <p className="mt-2 text-center text-[10px] text-neutral-400">
          JPG · PNG · WebP · 최대 20MB
        </p>
      </div>

      {/* 확대 뷰 */}
      {expanded && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setExpanded(null)}
        >
          <div className="max-w-lg" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expanded.imageUrl}
              alt={expanded.uploaderName ?? 'photo'}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            {(expanded.uploaderName || expanded.message) && (
              <div className="mt-3 text-center text-white/90">
                {expanded.uploaderName && (
                  <p className="text-sm font-medium">{expanded.uploaderName}</p>
                )}
                {expanded.message && (
                  <p className="mt-1 text-xs text-white/70">{expanded.message}</p>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setExpanded(null)}
            className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
