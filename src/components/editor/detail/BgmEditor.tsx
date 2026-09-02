'use client'

import { useEffect, useRef, useState } from 'react'
import { useEditor } from '../EditorContext'
import { BGM_LIST } from '@/lib/bgm-list'

export default function BgmEditor() {
  const { data, update } = useEditor()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [previewId, setPreviewId] = useState<string | null>(null)

  // 언마운트 시 재생 정지
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  const handlePreview = async (id: string, url: string) => {
    const audio = audioRef.current
    if (!audio) return

    if (previewId === id) {
      audio.pause()
      audio.currentTime = 0
      setPreviewId(null)
      return
    }

    try {
      audio.src = url
      audio.volume = 0.5
      await audio.play()
      setPreviewId(id)
    } catch {
      setPreviewId(null)
    }
  }

  return (
    <div className="space-y-3">
      <audio ref={audioRef} onEnded={() => setPreviewId(null)} />

      <p className="text-[11px] text-neutral-500">
        하객은 청첩장 우하단 재생 버튼으로 켜고 끌 수 있어요
      </p>

      <div className="space-y-2">
        {BGM_LIST.map((track) => {
          const selected = data.bgmUrl === track.id
          const isPreviewing = previewId === track.id
          return (
            <div
              key={track.id}
              className={`flex items-center gap-2.5 rounded-lg border p-2.5 transition-colors ${
                selected
                  ? 'border-neutral-900 bg-neutral-900/5'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              {/* 미리 듣기 */}
              <button
                type="button"
                onClick={() => handlePreview(track.id, track.url)}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-90"
                style={{
                  background: isPreviewing
                    ? 'var(--color-accent, #c9807f)'
                    : '#f5f5f5',
                  color: isPreviewing ? '#fff' : '#525252',
                }}
                aria-label={isPreviewing ? '미리 듣기 정지' : '미리 듣기'}
              >
                {isPreviewing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3 w-3">
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                )}
              </button>

              {/* 곡 정보 */}
              <button
                type="button"
                onClick={() => update('bgmUrl', selected ? null : track.id)}
                className="flex-1 min-w-0 text-left"
              >
                <p
                  className={`text-xs font-medium truncate ${
                    selected ? 'text-neutral-900' : 'text-neutral-700'
                  }`}
                >
                  {track.label}
                </p>
                <p className="mt-0.5 text-[10px] text-neutral-500">{track.mood}</p>
              </button>

              {/* 선택 상태 */}
              <button
                type="button"
                onClick={() => update('bgmUrl', selected ? null : track.id)}
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                  selected
                    ? 'text-white'
                    : 'border border-neutral-200 bg-white text-transparent'
                }`}
                style={selected ? { background: 'var(--color-accent, #c9807f)' } : undefined}
                aria-label={selected ? '선택 해제' : '선택'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            </div>
          )
        })}
      </div>

      {data.bgmUrl && (
        <p className="text-[10px] text-neutral-400">
          선택된 음악이 청첩장에서 자동 반복 재생돼요
        </p>
      )}
    </div>
  )
}
