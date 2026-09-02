'use client'

import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type BaseProps = {
  label: string
  hint?: string
  children?: ReactNode
}

export function FieldLabel({ label, hint, children }: BaseProps) {
  return (
    <label className="block">
      <span className="block text-[11px] font-medium text-neutral-700">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[10px] text-neutral-400">{hint}</span>}
    </label>
  )
}

type TextFieldProps = BaseProps & InputHTMLAttributes<HTMLInputElement>

export function TextField({ label, hint, className, ...rest }: TextFieldProps) {
  return (
    <FieldLabel label={label} hint={hint}>
      <input
        {...rest}
        className={`mt-1.5 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-400 focus:outline-none ${className ?? ''}`}
      />
    </FieldLabel>
  )
}

type TextAreaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea({ label, hint, className, rows = 3, ...rest }: TextAreaProps) {
  return (
    <FieldLabel label={label} hint={hint}>
      <textarea
        {...rest}
        rows={rows}
        className={`mt-1.5 block w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-400 focus:outline-none ${className ?? ''}`}
      />
    </FieldLabel>
  )
}

type ToggleProps = {
  label: string
  description?: string
  checked: boolean
  onChange: (v: boolean) => void
}

export function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-neutral-800">{label}</p>
        {description && (
          <p className="mt-0.5 text-[11px] text-neutral-500">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        className={`relative flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-neutral-900' : 'bg-neutral-200'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  )
}

type OptionProps<T extends string> = {
  label: string
  hint?: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}

export function OptionGroup<T extends string>({
  label,
  hint,
  value,
  options,
  onChange,
}: OptionProps<T>) {
  return (
    <FieldLabel label={label} hint={hint}>
      <div className="mt-1.5 grid grid-cols-2 gap-2">
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                active
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </FieldLabel>
  )
}
