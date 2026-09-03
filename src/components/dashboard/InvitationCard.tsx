'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { InvitationSummary } from '@/lib/invitations/types'
import CardThumbnail from './CardThumbnail'
import QrCodeModal from './QrCodeModal'
import { shareToKakao } from '@/lib/kakao-share'

type Props = {
  item: InvitationSummary
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
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const groomName = item.groomName
  const brideName = item.brideName
  const ceremonyDate = item.ceremonyDate
  const ceremonyTime = item.ceremonyTime || '14:00'
  const mainText = item.mainText || '우리 결혼합니다'
  const venueName = item.venueName
  const venueHall = item.venueHall
  const mainPhotoUrl = item.mainPhotoUrl
  const updatedAt = item.updatedAt
  const palette = item.palette

  const previewHref = `/invite/${item.slug}?edit=1`
  const publicHref = `/invite/${item.slug}`
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${publicHref}`
      : publicHref
  const displayTitle =
    groomName && brideName ? `${groomName} ♥ ${brideName}` : item.title

  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const flashToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 1500)
  }

  const handleCardClick = () => {
    router.push(previewHref)
  }

  const handleCardKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick()
    }
  }

  const stop = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleCopyUrl = async () => {
    setMenuOpen(false)
    try {
      await navigator.clipboard.writeText(shareUrl)
      flashToast('URL이 복사되었어요')
    } catch {
      flashToast('복사 실패')
    }
  }

  const handleKakaoShare = async () => {
    setMenuOpen(false)
    if (item.status !== 'published') {
      flashToast('공개된 청첩장만 공유할 수 있어요')
      return
    }
    try {
      await shareToKakao({
        title: displayTitle,
        description: ceremonyDate
          ? `${formatDate(ceremonyDate)} · ${venueName}`
          : '결혼합니다',
        imageUrl: mainPhotoUrl ?? undefined,
        url: shareUrl,
      })
    } catch (err) {
      console.error(err)
      flashToast('카카오톡 공유에 실패했어요')
    }
  }

  const handleQr = () => {
    setMenuOpen(false)
    setQrOpen(true)
  }

  const handleDelete = () => {
    setMenuOpen(false)
    if (!confirm(`"${item.title}" 청첩장을 삭제할까요?`)) return
    onDelete?.(item.id)
  }

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleCardKey}
        className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <CardThumbnail
            palette={palette}
            mainPhotoUrl={mainPhotoUrl}
            groomName={groomName}
            brideName={brideName}
            ceremonyDate={ceremonyDate}
            ceremonyTime={ceremonyTime}
            mainText={mainText}
            venueName={venueName}
            venueHall={venueHall}
          />

          {/* 상태 배지 */}
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

          {/* Hover 시 나타나는 미리보기 힌트 */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-neutral-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              미리보기
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-lg font-semibold text-neutral-900">
            {displayTitle}
          </h3>
          <p className="mt-1.5 text-xs text-neutral-500">
            {ceremonyDate ? formatDate(ceremonyDate) : '예식일 미정'}
          </p>
          <p className="mt-1 text-[11px] text-neutral-400">
            {formatUpdated(updatedAt)} 수정
          </p>

          <div className="mt-4 flex items-center gap-2 border-t border-neutral-100 pt-4">
            <Link
              href={`/editor/${item.id}`}
              onClick={stop}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-neutral-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              수정하기
            </Link>
            <Link
              href={publicHref}
              target="_blank"
              onClick={stop}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              청첩장 보기
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen((v) => !v)
                }}
                aria-label="더보기"
                aria-expanded={menuOpen}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  menuOpen
                    ? 'border-neutral-300 bg-neutral-100 text-neutral-800'
                    : 'border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <circle cx="12" cy="5" r="1.6" />
                  <circle cx="12" cy="12" r="1.6" />
                  <circle cx="12" cy="19" r="1.6" />
                </svg>
              </button>

              {menuOpen && (
                <div
                  onClick={stop}
                  className="absolute right-0 bottom-full z-30 mb-2 w-52 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-xl"
                >
                  <MenuItem
                    onClick={handleKakaoShare}
                    icon={<KakaoIcon />}
                    label="카카오톡 공유"
                  />
                  <MenuItem
                    onClick={handleCopyUrl}
                    icon={<LinkIcon />}
                    label="URL 복사"
                  />
                  <MenuItem
                    onClick={handleQr}
                    icon={<QrIcon />}
                    label="QR 코드 저장"
                  />
                  <Link
                    href={`/dashboard/invitations/${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-xs text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    <CheckListIcon />
                    참석여부 확인
                  </Link>
                  <div className="border-t border-neutral-100" />
                  <MenuItem
                    onClick={handleDelete}
                    icon={<TrashIcon />}
                    label="삭제"
                    danger
                  />
                </div>
              )}
            </div>
          </div>

          {toast && (
            <p className="mt-2 text-center text-[11px] text-emerald-600">
              {toast}
            </p>
          )}
        </div>
      </article>

      {qrOpen && (
        <QrCodeModal
          url={shareUrl}
          title={displayTitle}
          onClose={() => setQrOpen(false)}
        />
      )}
    </>
  )
}

function MenuItem({
  onClick,
  icon,
  label,
  danger,
}: {
  onClick: () => void
  icon: React.ReactNode
  label: string
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-xs transition-colors hover:bg-neutral-50 ${
        danger ? 'text-red-600 hover:bg-red-50' : 'text-neutral-700'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

/* Icons */
function KakaoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FEE500" stroke="#3a1d1d" strokeWidth="0.5" className="h-4 w-4">
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.87 1.9 5.38 4.72 6.79-.14.51-.9 3.27-.93 3.42 0 0-.02.13.06.19.09.05.19.01.19.01.27-.04 3.13-2.04 3.62-2.38.77.11 1.55.17 2.34.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
    </svg>
  )
}
function LinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}
function QrIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h2v2h-2z" />
      <path d="M18 14h3" />
      <path d="M14 18h2v3h-2z" />
      <path d="M18 18h3v3h-3z" />
    </svg>
  )
}
function CheckListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  )
}
