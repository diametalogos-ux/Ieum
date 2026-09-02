'use client'

import { useState } from 'react'
import type { InvitationData, AccountItem } from '@/types/invitation'

type Props = { data: InvitationData }

function AccountRow({ item }: { item: AccountItem }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.accountNumber.replace(/[-\s]/g, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-neutral-100">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-neutral-400">{item.accountHolder}</p>
        <p className="mt-0.5 truncate font-medium text-sm text-neutral-800">
          {item.bank} <span className="text-neutral-600">{item.accountNumber}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="ml-3 flex flex-shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {copied ? '복사됨' : '복사'}
      </button>
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
          축하의 마음을 담아 축의금을
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
