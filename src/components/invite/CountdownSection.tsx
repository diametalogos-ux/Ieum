'use client'

import { useEffect, useState } from 'react'
import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function calcTimeLeft(target: Date): TimeLeft {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, isPast: false }
}

export default function CountdownSection({ data }: Props) {
  const [y, m, d] = data.ceremony.date.split('-').map(Number)
  const [hh, mm] = data.ceremony.time.split(':').map(Number)
  const target = new Date(y, m - 1, d, hh, mm, 0)

  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const groomShort = data.couple.groom.firstName
  const brideShort = data.couple.bride.firstName

  return (
    <section
      className="px-8 py-20"
      style={{ background: 'var(--p-bg)' }}
    >
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          D-Day
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          결혼식까지
        </h2>
      </div>

      {time.isPast ? (
        <div className="mt-10 text-center">
          <p className="font-serif text-4xl font-medium" style={{ color: 'var(--p-strong)' }}>
            결혼식이 시작되었어요
          </p>
          <p className="mt-3 text-sm text-neutral-500">
            함께해 주셔서 감사합니다
          </p>
        </div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-4 gap-2">
            {[
              { label: 'Days', value: time.days },
              { label: 'Hour', value: time.hours },
              { label: 'Min', value: time.minutes },
              { label: 'Sec', value: time.seconds },
            ].map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center rounded-2xl bg-white/70 py-4 backdrop-blur"
              >
                <p
                  className="font-serif text-2xl font-semibold tabular-nums"
                  style={{ color: 'var(--p-strong)' }}
                >
                  {String(t.value).padStart(2, '0')}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
                  {t.label}
                </p>
              </div>
            ))}
          </div>

          <p className="font-serif mt-8 text-center text-sm leading-relaxed text-neutral-600">
            <span className="font-medium text-neutral-800">{groomShort}</span>,{' '}
            <span className="font-medium text-neutral-800">{brideShort}</span>의
            결혼식이
            <br />
            <span className="font-semibold" style={{ color: 'var(--p-strong)' }}>
              {time.days}일
            </span>{' '}
            남았습니다
          </p>
        </>
      )}
    </section>
  )
}
