'use client'

import { useMemo, useState } from 'react'
import AddressSearchButton, {
  type AddressResult,
} from '@/components/editor/ui/AddressSearchButton'
import type { WreathCategoryKey } from '@/lib/wreath-orders/types'

type Props = {
  categoryKey: WreathCategoryKey
  categoryLabel: string
}

type FormState = {
  receiverName: string
  receiverRelationship: string
  receiverTel: string
  zipcode: string
  address: string
  addressDetail: string
  deliveryDate: string
  deliveryTime: string
  ribbonName: string
  ribbonMessage: string
}

const RELATIONSHIP_PRESETS = ['혼주', '상주', '신랑', '신부', '유족', '본인']

export default function WreathOrderForm({
  categoryKey,
  categoryLabel,
}: Props) {
  const now = useMemo(() => new Date(), [])
  const minDate = useMemo(() => toDateInput(now), [now])
  const suggestedRibbon = useMemo(
    () =>
      categoryKey === 'congrats'
        ? '결혼을 진심으로 축하합니다'
        : '삼가 고인의 명복을 빕니다',
    [categoryKey]
  )

  const [form, setForm] = useState<FormState>({
    receiverName: '',
    receiverRelationship: '',
    receiverTel: '',
    zipcode: '',
    address: '',
    addressDetail: '',
    deliveryDate: minDate,
    deliveryTime: '10:00',
    ribbonName: '',
    ribbonMessage: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleAddress = (r: AddressResult) => {
    setForm((prev) => ({
      ...prev,
      zipcode: r.zipcode,
      address: r.buildingName ? `${r.address} (${r.buildingName})` : r.address,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    // 클라이언트 최소 검증
    if (!form.receiverName.trim()) return setError('받는분 이름을 입력해 주세요')
    if (!form.receiverRelationship.trim())
      return setError('받는분 관계를 선택해 주세요')
    if (!form.address.trim()) return setError('배송지 주소를 검색해 주세요')
    if (!form.deliveryDate || !form.deliveryTime)
      return setError('배송일시를 선택해 주세요')

    const deliveryDatetime = new Date(
      `${form.deliveryDate}T${form.deliveryTime}:00`
    )
    if (Number.isNaN(deliveryDatetime.getTime())) {
      return setError('배송일시 형식이 올바르지 않아요')
    }
    if (deliveryDatetime.getTime() < Date.now()) {
      return setError('배송일시는 현재 시각 이후여야 해요')
    }

    setError(null)
    setSubmitting(true)

    try {
      const res = await fetch('/api/wreath/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryKey,
          receiverName: form.receiverName,
          receiverRelationship: form.receiverRelationship,
          receiverTel: form.receiverTel,
          zipcode: form.zipcode,
          address: form.address,
          addressDetail: form.addressDetail,
          deliveryDatetime: deliveryDatetime.toISOString(),
          ribbonName: form.ribbonName,
          ribbonMessage: form.ribbonMessage,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? '저장에 실패했어요')
      }

      const { token } = (await res.json()) as { token: string }

      // 리다이렉트: 우리 안내 페이지로 넘겨 origin 계산 후 꽃비로 이동
      window.location.href = `/wreath/redirect?token=${encodeURIComponent(
        token
      )}`
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 받는분 */}
      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-semibold text-neutral-900">
          받는분
        </legend>

        <Field label="이름" required>
          <input
            type="text"
            value={form.receiverName}
            onChange={(e) => update('receiverName', e.target.value)}
            maxLength={30}
            required
            placeholder="예) 김철수"
            className={inputCls}
          />
        </Field>

        <Field label="관계" required>
          <div className="flex flex-wrap gap-1.5">
            {RELATIONSHIP_PRESETS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => update('receiverRelationship', r)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  form.receiverRelationship === r
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {r}
              </button>
            ))}
            <input
              type="text"
              value={
                RELATIONSHIP_PRESETS.includes(form.receiverRelationship)
                  ? ''
                  : form.receiverRelationship
              }
              onChange={(e) => update('receiverRelationship', e.target.value)}
              maxLength={20}
              placeholder="직접 입력"
              className="min-w-[120px] flex-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
            />
          </div>
        </Field>

        <Field label="연락처 (선택)">
          <input
            type="tel"
            value={form.receiverTel}
            onChange={(e) => update('receiverTel', e.target.value)}
            maxLength={20}
            placeholder="010-0000-0000"
            className={inputCls}
          />
        </Field>
      </fieldset>

      {/* 배송지 */}
      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-semibold text-neutral-900">
          배송지
        </legend>

        <Field label="주소" required>
          <div className="flex gap-2">
            <input
              type="text"
              value={form.address}
              readOnly
              placeholder="주소 검색 버튼을 눌러 주세요"
              className={`${inputCls} flex-1 bg-neutral-50`}
            />
            <AddressSearchButton
              onSelect={handleAddress}
              className="inline-flex h-11 shrink-0 items-center gap-1 rounded-lg border border-neutral-300 bg-white px-4 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            />
          </div>
        </Field>

        {form.zipcode && (
          <p className="text-[11px] text-neutral-500">
            우편번호 · {form.zipcode}
          </p>
        )}

        <Field label="상세 주소 (예식장 홀명/장례식장 호실)">
          <input
            type="text"
            value={form.addressDetail}
            onChange={(e) => update('addressDetail', e.target.value)}
            maxLength={80}
            placeholder="예) 3층 그랜드홀 / 특실 2호"
            className={inputCls}
          />
        </Field>
      </fieldset>

      {/* 배송일시 */}
      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-semibold text-neutral-900">
          배송 일시 <span className="text-red-500">*</span>
        </legend>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            value={form.deliveryDate}
            min={minDate}
            onChange={(e) => update('deliveryDate', e.target.value)}
            required
            className={inputCls}
          />
          <input
            type="time"
            value={form.deliveryTime}
            onChange={(e) => update('deliveryTime', e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <p className="text-[11px] text-neutral-500">
          행사 시작 30분~1시간 전으로 지정하시는 것을 권장드려요.
        </p>
      </fieldset>

      {/* 리본 문구 */}
      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-semibold text-neutral-900">
          리본 문구 (선택)
        </legend>

        <Field label={`경조사어 · 리본 오른쪽`}>
          <input
            type="text"
            value={form.ribbonMessage}
            onChange={(e) => update('ribbonMessage', e.target.value)}
            maxLength={30}
            placeholder={suggestedRibbon}
            className={inputCls}
          />
        </Field>

        <Field label={`보내는분 · 리본 왼쪽`}>
          <input
            type="text"
            value={form.ribbonName}
            onChange={(e) => update('ribbonName', e.target.value)}
            maxLength={30}
            placeholder="예) 홍길동 드림 / ○○회사 임직원 일동"
            className={inputCls}
          />
        </Field>
      </fieldset>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 py-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              이동 중...
            </>
          ) : (
            <>
              {categoryLabel} 상품 고르러 가기
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
        <p className="mt-3 text-center text-[11px] text-neutral-500">
          다음 단계에서 상품 선택 · 결제가 진행됩니다 (파트너: 꽃비)
        </p>
      </div>
    </form>
  )
}

const inputCls =
  'block w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-neutral-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      {children}
    </label>
  )
}

function toDateInput(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
