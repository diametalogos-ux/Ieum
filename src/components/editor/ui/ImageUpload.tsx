'use client'

import { useRef, useState } from 'react'
import { IMAGE_ACCEPT, processImage, validateImage } from '@/lib/image-utils'

type Aspect = 'square' | 'portrait' | 'landscape' | 'og'

const ASPECT_CLASS: Record<Aspect, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  og: 'aspect-[1.91/1]',
}

type Props = {
  value: string | null
  onChange: (dataUrl: string | null) => void
  label?: string
  hint?: string
  aspect?: Aspect
  width?: string
  placeholderText?: string
}

export default function ImageUpload({
  value,
  onChange,
  label,
  hint = 'JPG, PNG, WebP · 최대 20MB',
  aspect = 'portrait',
  width,
  placeholderText = '사진 추가',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openPicker = () => {
    if (loading) return
    inputRef.current?.click()
  }

  const handleFile = async (file: File) => {
    setError(null)
    const check = validateImage(file)
    if (!check.ok) {
      setError(check.reason)
      return
    }
    setLoading(true)
    try {
      const dataUrl = await processImage(file)
      onChange(dataUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드에 실패했어요')
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) void handleFile(file)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    setError(null)
  }

  return (
    <div>
      {label && (
        <p className="mb-1.5 text-[11px] font-medium text-neutral-700">{label}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        onChange={handleInputChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={openPicker}
        disabled={loading}
        className={`group relative flex ${ASPECT_CLASS[aspect]} overflow-hidden rounded-lg border-2 transition-colors ${
          value
            ? 'border-neutral-200'
            : 'border-dashed border-neutral-200 hover:border-neutral-300'
        } ${loading ? 'opacity-70' : ''}`}
        style={{ width: width ?? '100%' }}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-cover" />

            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-medium text-neutral-800">
                변경
              </span>
              <span
                role="button"
                onClick={handleRemove}
                className="rounded-full bg-red-500/95 px-3 py-1.5 text-[11px] font-medium text-white"
              >
                삭제
              </span>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-neutral-50/60">
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
                <p className="text-[11px] text-neutral-500">처리 중...</p>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-neutral-400">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-[11px] text-neutral-500">{placeholderText}</p>
              </>
            )}
          </div>
        )}
      </button>

      {error ? (
        <p className="mt-1.5 text-[10px] text-red-500">{error}</p>
      ) : (
        <p className="mt-1.5 text-[10px] text-neutral-400">{hint}</p>
      )}
    </div>
  )
}
