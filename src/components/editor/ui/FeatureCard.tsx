'use client'

import type { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  title: string
  description: string
  enabled: boolean
  onToggle: (v: boolean) => void
  children?: ReactNode
}

export default function FeatureCard({
  icon,
  title,
  description,
  enabled,
  onToggle,
  children,
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors ${
        enabled
          ? 'border-neutral-200 bg-white'
          : 'border-neutral-100 bg-neutral-50/50'
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
            enabled ? 'text-white' : 'text-neutral-400'
          }`}
          style={{
            background: enabled ? 'var(--color-accent, #c9807f)' : '#f5f5f5',
          }}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium ${enabled ? 'text-neutral-900' : 'text-neutral-600'}`}>
            {title}
          </p>
          <p className="mt-0.5 text-[11px] text-neutral-500">{description}</p>
        </div>

        <button
          type="button"
          onClick={() => onToggle(!enabled)}
          role="switch"
          aria-checked={enabled}
          className={`relative flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
            enabled ? 'bg-neutral-900' : 'bg-neutral-200'
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {enabled && children && (
        <div className="border-t border-neutral-100 bg-neutral-50/40 px-4 py-3">
          {children}
        </div>
      )}
    </div>
  )
}
