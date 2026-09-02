'use client'

import { useState } from 'react'
import type { InvitationData, GuestbookItem } from '@/types/invitation'
import { sampleGuestbook } from '@/lib/mock/sample-invitation'

type Props = { data: InvitationData }

const CARD_STYLES = [
  { bg: '#fef3ea', rotate: '-1.2deg' },
  { bg: '#fdedf3', rotate: '0.8deg' },
  { bg: '#eef7ee', rotate: '-0.6deg' },
  { bg: '#e9f2fb', rotate: '1.1deg' },
  { bg: '#f5eefb', rotate: '-1deg' },
]

function formatDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  if (diff < 1) return '오늘'
  if (diff < 7) return `${Math.floor(diff)}일 전`
  return `${d.getMonth() + 1}. ${d.getDate()}`
}

export default function GuestbookSection({ data: _data }: Props) {
  const [entries, setEntries] = useState<GuestbookItem[]>(sampleGuestbook)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [justSubmitted, setJustSubmitted] = useState(false)

  const canSubmit = name.trim().length > 0 && message.trim().length > 0 && !submitting

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setTimeout(() => {
      const newEntry: GuestbookItem = {
        id: `gb-${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      }
      setEntries((prev) => [newEntry, ...prev])
      setName('')
      setMessage('')
      setSubmitting(false)
      setJustSubmitted(true)
      setTimeout(() => setJustSubmitted(false), 2000)
    }, 400)
  }

  return (
    <section className="bg-white px-8 py-20">
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          Guestbook
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          방명록
        </h2>
        <p className="mt-3 text-xs text-neutral-500">
          두 사람에게 따뜻한 축하 인사를 남겨주세요
        </p>
      </div>

      {/* 방명록 목록 */}
      <div className="mt-10 space-y-3.5">
        {entries.length === 0 ? (
          <p className="text-center text-xs text-neutral-400">
            첫 번째 방명록의 주인공이 되어주세요
          </p>
        ) : (
          entries.map((entry, idx) => {
            const style = CARD_STYLES[idx % CARD_STYLES.length]
            return (
              <div
                key={entry.id}
                className="rounded-md px-5 py-4 shadow-sm transition-transform"
                style={{
                  background: style.bg,
                  transform: `rotate(${style.rotate})`,
                }}
              >
                <p className="text-[13px] leading-relaxed text-neutral-700 whitespace-pre-line">
                  {entry.message}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="font-medium text-neutral-700">
                    — {entry.name}
                  </span>
                  <span className="text-neutral-400">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* 작성 폼 */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-2xl border border-neutral-200 bg-white p-5"
      >
        <p className="text-[11px] font-medium text-neutral-700">방명록 작성</p>
        <div className="mt-3 space-y-2.5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            maxLength={20}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="축하 메시지를 남겨주세요"
            rows={3}
            maxLength={200}
            className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400">
              {message.length}/200
            </span>
            {justSubmitted && (
              <span className="text-[11px] text-emerald-600">
                축하 메시지가 등록되었어요
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-3 w-full rounded-full py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: 'var(--p-strong)' }}
        >
          {submitting ? '등록 중...' : '축하 메시지 남기기'}
        </button>
      </form>
    </section>
  )
}
