'use client'

import { useMemo } from 'react'
import type { ParticleType } from '@/types/invitation'

type Props = { type: ParticleType; count?: number }

/* ---------- SVG 파티클 컴포넌트 ---------- */

function CherryPetal({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className="h-full w-full drop-shadow-sm">
      <path d="M12 2c-1.5 3-4 5-7 5.5 3 1 5 3.5 5.5 6.5 0.5-3 3-5.5 6-6-3-0.5-5.5-3-4.5-6z" />
      <circle cx="12" cy="12" r="1.5" fill="#fff" opacity="0.4" />
    </svg>
  )
}

function Snowflake({ color, blur }: { color: string; blur: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      className="h-full w-full"
      style={{ filter: blur ? 'blur(0.5px)' : undefined }}
    >
      <circle cx="12" cy="12" r="6" opacity="0.85" />
      <circle cx="12" cy="12" r="3" fill="#fff" opacity="0.6" />
    </svg>
  )
}

function Sparkle({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <defs>
        <radialGradient id={`sp-${color.replace('#', '')}`}>
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#sp-${color.replace('#', '')})`} />
      <path
        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  )
}

function ConfettiPiece({ color, shape }: { color: string; shape: 'rect' | 'circle' | 'strip' }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className="h-full w-full drop-shadow-sm">
      {shape === 'rect' && <rect x="6" y="6" width="12" height="12" rx="1" />}
      {shape === 'circle' && <circle cx="12" cy="12" r="6" />}
      {shape === 'strip' && <rect x="4" y="10" width="16" height="4" rx="2" />}
    </svg>
  )
}

/* ---------- 설정 ---------- */

type ParticleConfig = {
  animation: string
  size: [number, number]
  duration: [number, number]
  opacity: [number, number]
  defaultCount: number
  colors: string[]
  shapes?: ('rect' | 'circle' | 'strip')[]
}

const CONFIGS: Record<Exclude<ParticleType, 'none'>, ParticleConfig> = {
  cherry: {
    animation: 'particle-fall',
    size: [14, 26],
    duration: [8, 15],
    opacity: [0.55, 0.9],
    defaultCount: 16,
    colors: ['#f7b8c4', '#f4a2b2', '#f9c7d1', '#e8909f', '#fbd4dc'],
  },
  snow: {
    animation: 'particle-snow',
    size: [4, 14],
    duration: [8, 20],
    opacity: [0.5, 1],
    defaultCount: 40,
    colors: ['#ffffff', '#f0f4fa', '#e5edf8', '#dae5f4'],
  },
  star: {
    animation: 'particle-star',
    size: [10, 18],
    duration: [2.5, 5],
    opacity: [0.5, 1],
    defaultCount: 22,
    colors: ['#ffd97a', '#ffe8a3', '#fff4c9', '#ffbc57'],
  },
  confetti: {
    animation: 'particle-confetti',
    size: [8, 14],
    duration: [6, 13],
    opacity: [0.8, 1],
    defaultCount: 30,
    colors: ['#f27878', '#f5b04a', '#79bf7a', '#5a94d4', '#b47ed4', '#ffd97a', '#ff9ab8'],
    shapes: ['rect', 'circle', 'strip'],
  },
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/* ---------- 메인 컴포넌트 ---------- */

export default function ParticleOverlay({ type, count }: Props) {
  const config = type !== 'none' ? CONFIGS[type] : null
  const actualCount = count ?? config?.defaultCount ?? 14

  const particles = useMemo(() => {
    if (!config) return []
    const round = (n: number, d: number) => Number(n.toFixed(d))
    return Array.from({ length: actualCount }, (_, i) => {
      const r = (n: number) => seededRandom(i * 100 + n)
      const [minSize, maxSize] = config.size
      const [minDur, maxDur] = config.duration
      const [minOp, maxOp] = config.opacity
      const colorIdx = Math.floor(r(7) * config.colors.length)
      const shapeIdx = config.shapes
        ? Math.floor(r(8) * config.shapes.length)
        : 0
      const rotate = round(r(9) * 360, 0)
      return {
        id: i,
        left: `${round(r(1) * 100, 2)}%`,
        top: type === 'star' ? `${round(r(6) * 100, 2)}%` : undefined,
        size: round(minSize + r(2) * (maxSize - minSize), 1),
        duration: round(minDur + r(3) * (maxDur - minDur), 2),
        delay: round(r(4) * (type === 'star' ? 4 : 10), 2),
        opacity: round(minOp + r(5) * (maxOp - minOp), 2),
        color: config.colors[colorIdx],
        shape: config.shapes?.[shapeIdx] ?? 'rect',
        rotate,
        blur: type === 'snow' && r(10) < 0.4,
      }
    })
  }, [type, actualCount, config])

  if (!config || type === 'none') return null

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute inline-block"
          style={{
            left: p.left,
            top: p.top ?? '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
            animation: `${config.animation} ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {type === 'cherry' && <CherryPetal color={p.color} />}
          {type === 'snow' && <Snowflake color={p.color} blur={p.blur} />}
          {type === 'star' && <Sparkle color={p.color} />}
          {type === 'confetti' && <ConfettiPiece color={p.color} shape={p.shape} />}
        </span>
      ))}
    </div>
  )
}
