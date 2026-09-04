'use client'

import { useState } from 'react'
import type { InvitationData, AccountItem } from '@/types/invitation'

type Props = { data: InvitationData }

/** 계좌 정보를 카카오페이 붙여넣기용으로 포맷 */
function formatAccountInfo(item: AccountItem): string {
  return `${item.bank} ${item.accountNumber} (${item.accountHolder})`
}

function AccountRow({ item }: { item: AccountItem }) {
  const [toast, setToast] = useState<string | null>(null)

  const flashToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 1600)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        item.accountNumber.replace(/[-\s]/g, '')
      )
      flashToast('계좌번호가 복사되었어요')
    } catch {
      flashToast('복사에 실패했어요')
    }
  }

  const handleKakaoPay = async () => {
    try {
      await navigator.clipboard.writeText(formatAccountInfo(item))
      flashToast('계좌정보 복사됨 · 카카오페이에서 붙여넣기')
    } catch {
      /* ignore */
    }
    // 모바일에선 카카오페이 앱 실행. 데스크탑/미설치 시 무시됨.
    window.location.href = 'kakaotalk://kakaopay/money/to/bank'
  }

  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-neutral-100">
      <div className="text-center">
        <p className="font-serif text-sm font-medium text-neutral-900">
          {item.accountHolder}
        </p>
        <p className="mt-1 text-[13px] text-neutral-600">
          {item.bank}{' '}
          <span className="text-neutral-800">{item.accountNumber}</span>
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--p-strong)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          계좌번호 복사
        </button>
        <button
          type="button"
          onClick={handleKakaoPay}
          className="flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-[12px] font-semibold transition-opacity hover:opacity-90"
          style={{ background: '#FEE500', color: '#3a1d1d' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.87 1.9 5.38 4.72 6.79-.14.51-.9 3.27-.93 3.42 0 0-.02.13.06.19.09.05.19.01.19.01.27-.04 3.13-2.04 3.62-2.38.77.11 1.55.17 2.34.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
          </svg>
          pay 간편송금
        </button>
      </div>

      {toast && (
        <p className="mt-2 text-center text-[11px] text-emerald-600">
          {toast}
        </p>
      )}
    </div>
  )
}

function AccountGroup({
  title,
  accounts,
  defaultOpen = false,
}: {
  title: string
  accounts: AccountItem[]
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  if (accounts.length === 0) return null

  return (
    <div className="overflow-hidden rounded-xl bg-white/60 ring-1 ring-neutral-200/70 backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-serif text-sm font-medium text-neutral-800">
          {title}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="space-y-2 px-3 pb-3">
          {accounts.map((acc) => (
            <AccountRow key={acc.id} item={acc} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function AccountSection({ data }: Props) {
  if (data.accounts.length === 0) return null

  const groomAccounts = data.accounts.filter((a) => a.side === 'groom')
  const brideAccounts = data.accounts.filter((a) => a.side === 'bride')

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
          Account
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          마음 전하실 곳
        </h2>
        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          축복의 마음을 담아 축의금을
          <br />
          전달해 주시는 모든 분들께 감사드립니다
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <AccountGroup title="신랑측 계좌번호" accounts={groomAccounts} />
        <AccountGroup title="신부측 계좌번호" accounts={brideAccounts} />
      </div>
    </section>
  )
}
