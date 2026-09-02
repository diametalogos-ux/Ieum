'use client'

import { useState } from 'react'
import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }
type Attendance = 'attend' | 'absent'
type Meal = 'yes' | 'no'

export default function RsvpSection({ data: _data }: Props) {
  const [attendance, setAttendance] = useState<Attendance | null>(null)
  const [name, setName] = useState('')
  const [headcount, setHeadcount] = useState(1)
  const [meal, setMeal] = useState<Meal>('yes')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = attendance !== null && name.trim().length > 0 && !submitting

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
    }, 400)
  }

  const handleReset = () => {
    setAttendance(null)
    setName('')
    setHeadcount(1)
    setMeal('yes')
    setMessage('')
    setSubmitted(false)
  }

  if (submitted) {
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
            RSVP
          </p>
          <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
            참석 여부
          </h2>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-8 text-center">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: 'var(--p-soft)', color: 'var(--p-strong)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="font-serif mt-5 text-base font-medium text-neutral-800">
            응답이 전달되었어요
          </p>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500">
            소중한 시간 내주셔서 감사합니다
            <br />
            결혼식장에서 뵐게요
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 text-[11px] text-neutral-400 underline underline-offset-2 hover:text-neutral-600"
          >
            다시 응답하기
          </button>
        </div>
      </section>
    )
  }

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
          RSVP
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          참석 여부
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-neutral-500">
          축하의 마음으로 참석해 주실 수 있는지
          <br />
          미리 알려주시면 준비에 큰 도움이 됩니다
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        {/* 참석/미참석 */}
        <div>
          <p className="text-[11px] font-medium text-neutral-700">참석 여부</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[
              { value: 'attend', label: '참석' },
              { value: 'absent', label: '미참석' },
            ].map((opt) => {
              const active = attendance === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setAttendance(opt.value as Attendance)}
                  className={`rounded-lg border py-3 text-sm font-medium transition-colors ${
                    active
                      ? 'border-transparent text-white'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                  style={active ? { background: 'var(--p-strong)' } : undefined}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 이름 */}
        <div>
          <p className="text-[11px] font-medium text-neutral-700">성함</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            maxLength={20}
            className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
        </div>

        {/* 참석 시에만 노출 */}
        {attendance === 'attend' && (
          <>
            <div>
              <p className="text-[11px] font-medium text-neutral-700">
                참석 인원 (본인 포함)
              </p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setHeadcount((v) => Math.max(1, v - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50"
                  aria-label="감소"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="font-serif w-10 text-center text-lg font-semibold text-neutral-900 tabular-nums">
                  {headcount}
                </span>
                <button
                  type="button"
                  onClick={() => setHeadcount((v) => Math.min(20, v + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50"
                  aria-label="증가"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="text-xs text-neutral-500">명</span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-neutral-700">식사 여부</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  { value: 'yes', label: '식사 함' },
                  { value: 'no', label: '식사 안 함' },
                ].map((opt) => {
                  const active = meal === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setMeal(opt.value as Meal)}
                      className={`rounded-lg border py-2.5 text-xs font-medium transition-colors ${
                        active
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}

        <div>
          <p className="text-[11px] font-medium text-neutral-700">
            전할 말씀 <span className="text-neutral-400">(선택)</span>
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="신랑신부에게 전할 메시지가 있다면 남겨주세요"
            rows={3}
            maxLength={200}
            className="mt-2 block w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: 'var(--p-strong)' }}
        >
          {submitting ? '전송 중...' : '응답 보내기'}
        </button>
      </form>
    </section>
  )
}
