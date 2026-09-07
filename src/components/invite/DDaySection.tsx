'use client'

import { useEffect, useState } from 'react'
import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

type DDayState =
  | { kind: 'future'; days: number }
  | { kind: 'today' }
  | { kind: 'past'; days: number }

function calcDDay(target: Date): DDayState {
  const now = new Date()
  const t = new Date(target.getFullYear(), target.getMonth(), target.getDate())
  const n = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffMs = t.getTime() - n.getTime()
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24))
  if (days === 0) return { kind: 'today' }
  if (days > 0) return { kind: 'future', days }
  return { kind: 'past', days: -days }
}

export default function DDaySection({ data }: Props) {
  const [y, m, d] = data.ceremony.date.split('-').map(Number)
  const [state, setState] = useState<DDayState | null>(null)

  // 서버·클라이언트 시간 차로 인한 hydration mismatch 방지
  useEffect(() => {
    if (!y || !m || !d) return
    const target = new Date(y, m - 1, d)
    setState(calcDDay(target))
  }, [y, m, d])

  const groomFirst = data.couple.groom.firstName
  const brideFirst = data.couple.bride.firstName

  const bigLabel =
    !state
      ? '···'
      : state.kind === 'today'
      ? 'D-DAY'
      : state.kind === 'future'
      ? `D-${state.days}`
      : `D+${state.days}`

  const subLabel =
    !state
      ? ' '
      : state.kind === 'today'
      ? '오늘이 예식일이에요'
      : state.kind === 'future'
      ? `${groomFirst || '신랑'} · ${brideFirst || '신부'} 결혼식까지 ${state.days}일 남았어요`
      : `${groomFirst || '신랑'} · ${brideFirst || '신부'} 결혼식이 ${state.days}일 전이었어요`

  return (
    <section
      className="px-8 py-14"
      style={{ background: 'var(--p-bg)' }}
    >
      <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl bg-white/70 px-6 py-10 text-center shadow-sm backdrop-blur">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          D-Day
        </p>
        <h2
          className="font-serif mt-3 text-5xl font-semibold tracking-tight tabular-nums md:text-6xl"
          style={{ color: 'var(--p-strong)' }}
        >
          {bigLabel}
        </h2>
        <p className="mt-4 text-xs leading-relaxed text-neutral-600">
          {subLabel}
        </p>
      </div>
    </section>
  )
}
