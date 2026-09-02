'use client'

import type { PaletteKey } from '../EditorContext'

const PALETTES: {
  key: PaletteKey
  label: string
  colors: [string, string]
}[] = [
  { key: 'pink',   label: '핑크',   colors: ['#fdf6f7', '#c9748a'] },
  { key: 'beige',  label: '베이지', colors: ['#fbf6ef', '#b8926a'] },
  { key: 'green',  label: '그린',   colors: ['#f2f7f0', '#6b9b6b'] },
  { key: 'gray',   label: '그레이', colors: ['#f6f6f7', '#6b7280'] },
  { key: 'purple', label: '퍼플',   colors: ['#f6f1fb', '#8a6fc0'] },
]

type Props = {
  value: PaletteKey
  onChange: (key: PaletteKey) => void
}

export default function PaletteSelector({ value, onChange }: Props) {
  return (
    <div>
      <p className="text-[11px] font-medium text-neutral-700">색상</p>
      <div className="mt-2 grid grid-cols-5 gap-2">
        {PALETTES.map((p) => {
          const active = p.key === value
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onChange(p.key)}
              className={`group flex flex-col items-center gap-1.5 rounded-xl border p-2 transition-all ${
                active
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
              aria-pressed={active}
            >
              <div
                className="h-10 w-full overflow-hidden rounded-md"
                style={{
                  background: `linear-gradient(to bottom, ${p.colors[0]} 50%, ${p.colors[1]} 50%)`,
                }}
              />
              <span className={`text-[10px] font-medium ${active ? 'text-neutral-900' : 'text-neutral-500'}`}>
                {p.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
