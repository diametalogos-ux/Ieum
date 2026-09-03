'use client'

import { useEffect, useState } from 'react'
import type { InvitationData } from '@/types/invitation'
import {
  buildReceivers,
  buildShopUrl,
  computeDeliveryDatetime,
  isReadyForWreathOrder,
} from '@/lib/wreath'

type Props = { data: InvitationData }

const KOREAN_DAY = ['일', '월', '화', '수', '목', '금', '토'] as const

function formatCeremonyDate(date: string, time: string): string {
  if (!date) return ''
  const [y, m, d] = date.split('-').map(Number)
  if (!y || !m || !d) return ''
  const dow = new Date(y, m - 1, d).getDay()
  const timePart = time ? ` ${time}` : ''
  return `${y}. ${String(m).padStart(2, '0')}. ${String(d).padStart(2, '0')} (${KOREAN_DAY[dow]})${timePart}`
}

function formatDelivery(dt: string | null): string {
  if (!dt) return '-'
  const [datePart, timePart] = dt.split(' ')
  const [y, m, d] = datePart.split('-').map(Number)
  const [hh, mm] = timePart.split(':')
  if (!y || !m || !d) return dt
  const dow = new Date(y, m - 1, d).getDay()
  return `${y}. ${String(m).padStart(2, '0')}. ${String(d).padStart(2, '0')} (${KOREAN_DAY[dow]}) ${hh}:${mm}`
}

export default function FlowerOrderSection({ data }: Props) {
  const [open, setOpen] = useState(false)

  const readiness = isReadyForWreathOrder(data)
  const receivers = buildReceivers(data)
  const deliveryDt = computeDeliveryDatetime(data.ceremony)
  const groomFirst = data.couple.groom.firstName
  const brideFirst = data.couple.bride.firstName

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleGoShop = () => {
    if (!readiness.ok) return
    const origin =
      typeof window !== 'undefined' ? window.location.origin : ''
    const shopUrl = buildShopUrl(data.slug, origin)
    window.open(shopUrl, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  return (
    <>
      {/* 인라인 섹션 */}
      <section
        className="px-8 py-14"
        style={{ background: 'var(--p-bg)' }}
      >
        <div className="text-center">
          <p
            className="text-[11px] tracking-[0.5em] uppercase"
            style={{ color: 'var(--p-strong)', opacity: 0.8 }}
          >
            Wreath
          </p>
          <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
            축하 화환 보내기
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-neutral-500">
            예식일에 맞춰 웨딩홀로 배송되는
            <br />
            간편한 화환 서비스를 준비했어요
          </p>
        </div>

        {/* 카드형 트리거 */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 flex w-full items-center gap-3 rounded-2xl border border-neutral-200/80 bg-white/90 p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="min-w-0 flex-1">
            <p className="font-serif text-base font-semibold text-neutral-900">
              축하 화환 보내기
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
              신랑, 신부님에게
              <br />
              축하의 마음을 전해보세요
            </p>
          </div>
          <WreathIllustration />
        </button>
      </section>

      {/* 플로팅 버튼 — 우측 하단, 반투명. 모달 열려있을 땐 숨김 */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="화환 선물하기"
          className="group fixed right-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-neutral-900/40 py-2.5 pl-3 pr-4 text-[12px] font-medium text-white backdrop-blur-md transition-all hover:bg-neutral-900/70 hover:pr-4"
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 20px)',
          }}
        >
          <WreathIconMini />
          <span>화환 선물하기</span>
        </button>
      )}

      {/* 모달 */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 backdrop-blur-sm md:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[430px] rounded-t-3xl bg-white p-6 shadow-2xl md:rounded-3xl"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p
                  className="text-[10px] font-medium tracking-[0.3em] uppercase"
                  style={{ color: 'var(--p-strong)' }}
                >
                  Confirm Delivery
                </p>
                <h3 className="font-serif mt-2 text-lg font-semibold text-neutral-900">
                  배송지 확인
                </h3>
              </div>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {!readiness.ok ? (
              <div className="rounded-2xl bg-amber-50 p-4 text-[12px] leading-relaxed text-amber-800">
                아직 준비가 안 됐어요. 청첩장 편집에서{' '}
                <strong>{readiness.missing.join(', ')}</strong>를 먼저 입력해주세요.
              </div>
            ) : (
              <div className="space-y-3">
                {(groomFirst || brideFirst) && (
                  <InfoRow label="두 사람">
                    {groomFirst || '신랑'} · {brideFirst || '신부'}
                  </InfoRow>
                )}

                <InfoRow label="예식 일시">
                  {formatCeremonyDate(data.ceremony.date, data.ceremony.time)}
                </InfoRow>

                <InfoRow label="예식장">
                  <div>
                    {[data.ceremony.venueName, data.ceremony.venueHall]
                      .filter(Boolean)
                      .join(' ') || '-'}
                  </div>
                  <div className="mt-0.5 text-[11px] text-neutral-500">
                    {data.ceremony.venueAddress || '-'}
                  </div>
                </InfoRow>

                <InfoRow label="배송 예정">
                  {formatDelivery(deliveryDt)}
                  <div className="mt-0.5 text-[10px] text-neutral-400">
                    예식 시작 30분 전 도착 예정
                  </div>
                </InfoRow>

                <InfoRow label={`수령 가능 (${receivers.length}명)`}>
                  <div className="flex flex-wrap gap-1.5">
                    {receivers.map((r) => (
                      <span
                        key={`${r.relationship}-${r.name}`}
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] ${
                          r.relationship.startsWith('신랑')
                            ? 'border-sky-200 bg-sky-50 text-sky-800'
                            : 'border-rose-200 bg-rose-50 text-rose-800'
                        }`}
                      >
                        {r.relationship} {r.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-1.5 text-[10px] text-neutral-400">
                    꽃비 주문 화면에서 원하는 대상을 선택할 수 있어요
                  </div>
                </InfoRow>
              </div>
            )}

            <p className="mt-5 text-center text-[10px] leading-relaxed text-neutral-400">
              주문·결제·배송은{' '}
              <strong className="text-neutral-600">꽃비(flowerbiz)</strong>에서 진행돼요
            </p>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-neutral-200 bg-white py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleGoShop}
                disabled={!readiness.ok}
                className="flex-1 rounded-full py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: 'var(--p-strong)' }}
              >
                꽃 고르러 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function InfoRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-neutral-50/70 px-4 py-3">
      <p className="text-[10px] font-medium tracking-[0.15em] text-neutral-400 uppercase">
        {label}
      </p>
      <div className="mt-1 text-[13px] leading-relaxed text-neutral-800">
        {children}
      </div>
    </div>
  )
}

/** 카드 우측 화환 일러스트 (SVG) */
function WreathIllustration() {
  return (
    <div
      className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl"
      style={{
        background:
          'linear-gradient(135deg, var(--p-soft) 0%, var(--p-mid) 100%)',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="h-14 w-14"
      >
        {/* 리본 */}
        <path
          d="M22 12 L32 20 L42 12"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* 원형 화환 프레임 */}
        <circle
          cx="32"
          cy="38"
          r="16"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
        />
        {/* 잎사귀들 */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2
          const cx = 32 + Math.cos(angle) * 16
          const cy = 38 + Math.sin(angle) * 16
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx="3.5"
              ry="2"
              fill="rgba(255,255,255,0.85)"
              transform={`rotate(${(angle * 180) / Math.PI + 90} ${cx} ${cy})`}
            />
          )
        })}
        {/* 중앙 하트 */}
        <path
          d="M32 42 L28 38 A2 2 0 1 1 32 36 A2 2 0 1 1 36 38 Z"
          fill="rgba(255,255,255,0.95)"
        />
      </svg>
    </div>
  )
}

/** 플로팅 버튼용 미니 아이콘 */
function WreathIconMini() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="13" r="7" />
      <path d="M9 4l3 4 3-4" />
      <circle cx="12" cy="13" r="1.5" fill="currentColor" />
    </svg>
  )
}
