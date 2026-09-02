'use client'

import { useRef, useState } from 'react'
import { useEditor } from '../EditorContext'
import { OptionGroup } from '../ui/EditorField'
import { IMAGE_ACCEPT, processImage, validateImage } from '@/lib/image-utils'
import type { GalleryLayoutType } from '@/types/invitation'

const LAYOUT_OPTIONS: { value: GalleryLayoutType; label: string }[] = [
  { value: 'grid', label: '그리드' },
  { value: 'slide', label: '슬라이드' },
]

const MAX_PHOTOS = 30

export default function GalleryEditor() {
  const { data, update, addItem, updateItem, removeItem, moveItem } = useEditor()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const remaining = MAX_PHOTOS - data.gallery.length
  const canAdd = remaining > 0

  const handleSelect = () => {
    if (!canAdd || uploading) return
    inputRef.current?.click()
  }

  const handleFiles = async (files: FileList) => {
    setError(null)
    const filesArr = Array.from(files).slice(0, remaining)
    if (filesArr.length === 0) return

    setUploading(true)
    try {
      for (const file of filesArr) {
        const check = validateImage(file)
        if (!check.ok) {
          setError(check.reason)
          continue
        }
        const dataUrl = await processImage(file)
        addItem('gallery', {
          id: `g-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          url: dataUrl,
          order: data.gallery.length + 1,
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드에 실패했어요')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleReplace = async (id: string, file: File) => {
    const check = validateImage(file)
    if (!check.ok) {
      setError(check.reason)
      return
    }
    try {
      const dataUrl = await processImage(file)
      updateItem('gallery', id, { url: dataUrl })
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드에 실패했어요')
    }
  }

  return (
    <div className="space-y-4">
      <OptionGroup
        label="레이아웃"
        value={data.galleryLayout}
        options={LAYOUT_OPTIONS}
        onChange={(v) => update('galleryLayout', v)}
      />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium text-neutral-700">
            사진{' '}
            <span className="text-neutral-400">
              ({data.gallery.length}/{MAX_PHOTOS})
            </span>
          </p>
          <button
            type="button"
            onClick={handleSelect}
            disabled={!canAdd || uploading}
            className="flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {uploading ? (
              <>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                업로드 중
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                사진 추가
              </>
            )}
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={IMAGE_ACCEPT}
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        {data.gallery.length === 0 ? (
          <button
            type="button"
            onClick={handleSelect}
            className="flex w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-neutral-200 bg-white/60 py-10 text-center transition-colors hover:border-neutral-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-neutral-400">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="text-xs text-neutral-500">사진을 추가해보세요</p>
            <p className="text-[10px] text-neutral-400">여러 장 한번에 업로드 가능</p>
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-1.5">
            {data.gallery.map((item, idx) => (
              <GalleryCell
                key={item.id}
                item={item}
                idx={idx}
                total={data.gallery.length}
                onReplace={handleReplace}
                onRemove={() => removeItem('gallery', item.id)}
                onMoveUp={() => moveItem('gallery', item.id, 'up')}
                onMoveDown={() => moveItem('gallery', item.id, 'down')}
              />
            ))}
          </div>
        )}

        {error ? (
          <p className="mt-2 text-[10px] text-red-500">{error}</p>
        ) : (
          <p className="mt-2 text-[10px] text-neutral-400">
            JPG, PNG, WebP · 최대 20MB · 최대 {MAX_PHOTOS}장
          </p>
        )}
      </div>
    </div>
  )
}

type CellProps = {
  item: { id: string; url: string; order: number }
  idx: number
  total: number
  onReplace: (id: string, file: File) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

function GalleryCell({
  item,
  idx,
  total,
  onReplace,
  onRemove,
  onMoveUp,
  onMoveDown,
}: CellProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="group relative aspect-square overflow-hidden rounded-md bg-neutral-100 ring-1 ring-neutral-200">
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onReplace(item.id, file)
          if (inputRef.current) inputRef.current.value = ''
        }}
        className="hidden"
      />

      {item.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.url} alt="" className="h-full w-full object-cover" />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-white/70"
          style={{
            background: 'linear-gradient(135deg, #f7ecec 0%, #d9b8bd 100%)',
          }}
        >
          <span className="font-serif text-lg">{idx + 1}</span>
        </div>
      )}

      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-black/60 px-1 py-1 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-6 w-6 items-center justify-center rounded text-white transition-colors hover:bg-white/20"
          aria-label="교체"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="flex h-6 w-6 items-center justify-center rounded text-white transition-colors hover:bg-red-500"
          aria-label="삭제"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-1 py-1 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={idx === 0}
          className="flex h-6 w-6 items-center justify-center rounded text-white transition-colors hover:bg-white/20 disabled:opacity-30"
          aria-label="위로"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="text-[9px] font-medium text-white/80">{idx + 1}</span>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={idx === total - 1}
          className="flex h-6 w-6 items-center justify-center rounded text-white transition-colors hover:bg-white/20 disabled:opacity-30"
          aria-label="아래로"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
