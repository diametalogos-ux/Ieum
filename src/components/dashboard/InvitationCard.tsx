'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { DashboardInvitation } from '@/lib/mock/dashboard-invitations'

type Props = {
  item: DashboardInvitation
  onDelete?: (id: string) => void
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const day = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
  return `${y}. ${String(m).padStart(2, '0')}. ${String(d).padStart(2, '0')} (${day})`
}

function formatUpdated(iso: string) {
  const now = new Date()
  const then = new Date(iso)
  const diffMs = now.getTime() - then.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days < 1) return '오늘'
  if (days < 7) return `${days}일 전`
  if (days < 30) return `${Math.floor(days / 7)}주 전`
  return `${then.getFullYear()}. ${then.getMonth() + 1}. ${then.getDate()}`
}

export default function InvitationCard({ item, onDelete }: Props) {
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/invite/${item.slug}`
    : `/invite/${item.slug}`

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 1500)
    } catch {
      setCopyState('idle')
    }
  }

  const handleDelete = () => {
    if (!confirm(`"${item.title}" 청첩장을 삭제할까요?`)) return
    onDelete?.(item.id)
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/40">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden"
        style={{ background: item.thumbnailGradient }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-between px-6 py-8">
          <div className="text-center">
            <p className="font-serif text-[9px] tracking-[0.4em] text-white/70 uppercase">
              Wedding
            </p>
          </div>

          <div className="text-center">
            <p className="font-serif text-3xl font-medium text-white/85">
              {item.groomName}
              <span className="mx-2 text-white/60">&amp;</span>
              {item.brideName}
            </p>
            <div className="mx-auto mt-3 h-px w-8 bg-white/50" />
            <p className="mt-3 text-[11px] tracking-[0.3em] text-white/75">
              {item.ceremonyDate.replace(/-/g, ' . ')}
            </p>
          </div>

          <div className="text-center">
            <span className="rounded-full bg-white/25 px-3 py-1 text-[9px] tracking-[0.2em] text-white/80 uppercase backdrop-blur">
              {item.themeName}
            </span>
          </div>
        </div>

        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur ${
              item.status === 'published'
                ? 'bg-emerald-500/90 text-white'
                : 'bg-neutral-800/70 text-white'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {item.status === 'published' ? '공개 중' : '작성 중'}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold text-neutral-900">
          {item.title}
        </h3>
        <p className="mt-1.5 text-xs text-neutral-500">
          {formatDate(item.ceremonyDate)}
        </p>
        <p className="mt-1 text-[11px] text-neutral-400">
          {formatUpdated(item.updatedAt)} 수정
        </p>

        <div className="mt-5 flex gap-2 border-t border-neutral-100 pt-4">
          <Link
            href={`/editor/${item.id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-neutral-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            편집
          </Link>
          <Link
            href={`/invite/${item.slug}`}
            target="_blank"
            className="flex items-center justify-center rounded-full border border-neutral-200 bg-white px-3 py-2 text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            aria-label="미리보기"
            title="미리보기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center rounded-full border border-neutral-200 bg-white px-3 py-2 text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            aria-label="링크 복사"
            title={copyState === 'copied' ? '복사됨' : '링크 복사'}
          >
            {copyState === 'copied' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-emerald-500">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center justify-center rounded-full border border-neutral-200 bg-white px-3 py-2 text-neutral-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            aria-label="삭제"
            title="삭제"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}
