'use client'

import { useEditor } from '../EditorContext'
import type { AccountItem } from '@/types/invitation'

function AccountRow({ item, idx, total }: { item: AccountItem; idx: number; total: number }) {
  const { updateItem, removeItem, moveItem } = useEditor()

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-medium text-neutral-400">
          계좌 {idx + 1}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => moveItem('accounts', item.id, 'up')}
            disabled={idx === 0}
            className="flex h-7 w-7 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30"
            aria-label="위로"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => moveItem('accounts', item.id, 'down')}
            disabled={idx === total - 1}
            className="flex h-7 w-7 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30"
            aria-label="아래로"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => removeItem('accounts', item.id)}
            className="flex h-7 w-7 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
            aria-label="삭제"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={item.accountHolder}
          onChange={(e) => updateItem('accounts', item.id, { accountHolder: e.target.value })}
          placeholder="예금주"
          className="w-full rounded-md border border-neutral-200 bg-white px-2.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
        />
        <div className="grid grid-cols-[100px_1fr] gap-2">
          <input
            type="text"
            value={item.bank}
            onChange={(e) => updateItem('accounts', item.id, { bank: e.target.value })}
            placeholder="은행"
            className="w-full rounded-md border border-neutral-200 bg-white px-2.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
          <input
            type="text"
            value={item.accountNumber}
            onChange={(e) => updateItem('accounts', item.id, { accountNumber: e.target.value })}
            placeholder="계좌번호"
            className="w-full rounded-md border border-neutral-200 bg-white px-2.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default function AccountEditor() {
  const { data, addItem } = useEditor()

  const groomAccounts = data.accounts.filter((a) => a.side === 'groom')
  const brideAccounts = data.accounts.filter((a) => a.side === 'bride')

  const handleAdd = (side: 'groom' | 'bride') => {
    addItem('accounts', {
      id: `a-${Date.now()}`,
      side,
      bank: '',
      accountNumber: '',
      accountHolder: '',
    })
  }

  return (
    <div className="space-y-5">
      {/* 신랑측 */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium text-neutral-700">
            신랑측 <span className="text-neutral-400">({groomAccounts.length})</span>
          </p>
          <button
            type="button"
            onClick={() => handleAdd('groom')}
            className="flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            추가
          </button>
        </div>
        {groomAccounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-white/60 py-5 text-center">
            <p className="text-xs text-neutral-500">신랑측 계좌를 추가해보세요</p>
          </div>
        ) : (
          <div className="space-y-2">
            {groomAccounts.map((item, idx) => (
              <AccountRow
                key={item.id}
                item={item}
                idx={idx}
                total={groomAccounts.length}
              />
            ))}
          </div>
        )}
      </div>

      {/* 신부측 */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium text-neutral-700">
            신부측 <span className="text-neutral-400">({brideAccounts.length})</span>
          </p>
          <button
            type="button"
            onClick={() => handleAdd('bride')}
            className="flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            추가
          </button>
        </div>
        {brideAccounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-white/60 py-5 text-center">
            <p className="text-xs text-neutral-500">신부측 계좌를 추가해보세요</p>
          </div>
        ) : (
          <div className="space-y-2">
            {brideAccounts.map((item, idx) => (
              <AccountRow
                key={item.id}
                item={item}
                idx={idx}
                total={brideAccounts.length}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
