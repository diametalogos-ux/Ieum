'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

type Props = {
  title: string
  description?: string
  defaultOpen?: boolean
  children: ReactNode
}

export default function EditorSection({
  title,
  description,
  defaultOpen = true,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="border-b border-neutral-100">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-neutral-50/50"
        aria-expanded={open}
      >
        <div>
          <h3 className="font-serif text-sm font-semibold text-neutral-900">
            {title}
          </h3>
          {description && (
            <p className="mt-0.5 text-[11px] text-neutral-500">{description}</p>
          )}
        </div>
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
      {open && <div className="space-y-4 px-5 pb-5">{children}</div>}
    </section>
  )
}
