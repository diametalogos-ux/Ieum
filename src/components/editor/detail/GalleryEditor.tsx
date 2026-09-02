'use client'

import { useEditor } from '../EditorContext'
import { OptionGroup } from '../ui/EditorField'
import type { GalleryLayoutType } from '@/types/invitation'

const LAYOUT_OPTIONS: { value: GalleryLayoutType; label: string }[] = [
  { value: 'grid', label: '그리드' },
  { value: 'slide', label: '슬라이드' },
]

const MAX_PHOTOS = 30

export default function GalleryEditor() {
  const { data, update, addItem, removeItem, moveItem } = useEditor()
  const canAdd = data.gallery.length < MAX_PHOTOS

  const handleAdd = () => {
    if (!canAdd) return
    addItem('gallery', {
      id: `g-${Date.now()}`,
      url: '',
      order: data.gallery.length + 1,
    })
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
            사진 <span className="text-neutral-400">({data.gallery.length}/{MAX_PHOTOS})</span>
          </p>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className="flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            사진 추가
          </button>
        </div>

        {data.gallery.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-white/60 py-8 text-center">
            <p className="text-xs text-neutral-500">사진을 추가해보세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1.5">
            {data.gallery.map((item, idx) => (
              <div
                key={item.id}
                className="group relative aspect-square overflow-hidden rounded-md bg-neutral-100 ring-1 ring-neutral-200"
              >
                {item.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-white/70"
                    style={{
                      background:
                        'linear-gradient(135deg, #f7ecec 0%, #d9b8bd 100%)',
                    }}
                  >
                    <span className="font-serif text-lg">{idx + 1}</span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-1 py-1 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => moveItem('gallery', item.id, 'up')}
                    disabled={idx === 0}
                    className="flex h-6 w-6 items-center justify-center rounded text-white transition-colors hover:bg-white/20 disabled:opacity-30"
                    aria-label="위로"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem('gallery', item.id)}
                    className="flex h-6 w-6 items-center justify-center rounded text-white transition-colors hover:bg-red-500"
                    aria-label="삭제"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem('gallery', item.id, 'down')}
                    disabled={idx === data.gallery.length - 1}
                    className="flex h-6 w-6 items-center justify-center rounded text-white transition-colors hover:bg-white/20 disabled:opacity-30"
                    aria-label="아래로"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="mt-2 text-[10px] text-neutral-400">
          JPG, PNG, WebP · 최대 20MB · 최대 {MAX_PHOTOS}장
        </p>
      </div>
    </div>
  )
}
