'use client'

import { useEffect, useRef, useState } from 'react'
import { BGM_LIST, findBgm } from '@/lib/bgm-list'

type Props = { bgmId: string | null }

export default function BgmPlayer({ bgmId }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(true) // 기본: 재생 상태
  const [showLabel, setShowLabel] = useState(false)
  const userInteractedRef = useRef(false)

  const track = findBgm(bgmId) ?? BGM_LIST[0]

  // 오디오 설정 (볼륨, 반복)
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.4
    audioRef.current.loop = true
  }, [track.url])

  // 곡이 바뀌면 재생 상태 재설정 (기본 재생)
  useEffect(() => {
    setPlaying(true)
  }, [track.url])

  // 자동 재생 시도 (마운트 시 + 곡 바뀔 때)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !playing) return

    let mounted = true

    const tryPlay = async () => {
      try {
        await audio.play()
      } catch {
        // 자동재생 차단됨 → 첫 사용자 인터랙션 대기
        if (!mounted || userInteractedRef.current) return
        const onInteract = async () => {
          userInteractedRef.current = true
          try {
            await audio.play()
          } catch {
            // 여전히 실패하면 UI만 유지
          }
          cleanup()
        }
        const cleanup = () => {
          window.removeEventListener('scroll', onInteract)
          window.removeEventListener('touchstart', onInteract)
          window.removeEventListener('click', onInteract)
          window.removeEventListener('keydown', onInteract)
        }
        window.addEventListener('scroll', onInteract, { once: true, passive: true })
        window.addEventListener('touchstart', onInteract, { once: true, passive: true })
        window.addEventListener('click', onInteract, { once: true })
        window.addEventListener('keydown', onInteract, { once: true })
      }
    }

    tryPlay()

    return () => {
      mounted = false
    }
  }, [playing, track.url])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    userInteractedRef.current = true
    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        await audio.play()
        setPlaying(true)
      }
      setShowLabel(true)
      setTimeout(() => setShowLabel(false), 2000)
    } catch {
      setPlaying((v) => !v)
      setShowLabel(true)
      setTimeout(() => setShowLabel(false), 2000)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={track.url}
        preload="auto"
        autoPlay
        loop
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {showLabel && (
          <div className="rounded-full bg-neutral-900/85 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg backdrop-blur">
            {playing ? `♪ ${track.label}` : '일시정지'}
          </div>
        )}

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? '음악 일시정지' : '음악 재생'}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg backdrop-blur transition-all hover:scale-110"
          style={{
            background: 'var(--p-strong)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}
