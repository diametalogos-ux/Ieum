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
  ordererName: string
  ordererPhone: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>

const RELATIONSHIP_PRESETS = ['가족', '혼주', '신랑', '신부', '상주', '유족']

// 검증 규칙
const NAME_RE = /^[가-힣a-zA-Z\s·]{1,20}$/
const RELATIONSHIP_RE = /^[가-힣a-zA-Z\s]{1,20}$/
const PHONE_RE = /^01[016789]-\d{3,4}-\d{4}$/
const RIBBON_RE = /^.{1,30}$/

/** 숫자만 남기고 010-XXXX-XXXX 형식으로 하이픈 자동 삽입 */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length < 4) return digits
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

function validateField(
  key: keyof FormState,
  value: string,
  form: FormState
): string | null {
  const trimmed = value.trim()
  switch (key) {
    case 'receiverName':
      if (!trimmed) return '받는분 이름을 입력해 주세요'
      if (!NAME_RE.test(trimmed))
        return '한글·영문 1~20자로 입력해 주세요'
      return null
    case 'receiverRelationship':
      if (!trimmed) return '받는분과의 관계를 선택하거나 입력해 주세요'
      if (!RELATIONSHIP_RE.test(trimmed))
        return '한글·영문 1~20자로 입력해 주세요'
      return null
    case 'receiverTel':
      if (!trimmed) return null // 선택 필드
      if (!PHONE_RE.test(trimmed))
        return '휴대폰 번호 형식이 올바르지 않아요 (예: 010-1234-5678)'
      return null
    case 'address':
      if (!trimmed) return '주소 검색 버튼으로 배송지를 선택해 주세요'
      return null
    case 'deliveryDate':
    case 'deliveryTime': {
      if (!form.deliveryDate || !form.deliveryTime)
        return '배송일시를 선택해 주세요'
      const dt = new Date(`${form.deliveryDate}T${form.deliveryTime}:00`)
      if (Number.isNaN(dt.getTime())) return '배송일시 형식이 올바르지 않아요'
      if (dt.getTime() < Date.now())
        return '배송일시는 현재 이후여야 해요'
      return null
    }
    case 'ribbonMessage':
      if (!trimmed) return '경조사어를 입력해 주세요 (리본 오른쪽)'
      if (!RIBBON_RE.test(trimmed)) return '30자 이내로 입력해 주세요'
      return null
    case 'ribbonName':
      if (!trimmed) return '보내는분을 입력해 주세요 (리본 왼쪽)'
      if (!RIBBON_RE.test(trimmed)) return '30자 이내로 입력해 주세요'
      return null
    case 'ordererName':
      if (!trimmed) return '주문자 이름을 입력해 주세요'
      if (!NAME_RE.test(trimmed))
        return '한글·영문 1~20자로 입력해 주세요'
      return null
    case 'ordererPhone':
      if (!trimmed) return '주문자 전화번호를 입력해 주세요'
      if (!PHONE_RE.test(trimmed))
        return '휴대폰 번호 형식이 올바르지 않아요 (예: 010-1234-5678)'
      return null
    default:
      return null
  }
}

export default function WreathOrderForm({
  categoryKey,
  categoryLabel,
}: Props) {
  const now = useMemo(() => new Date(), [])
  const minDate = useMemo(() => toDateInput(now), [now])
  const suggestedRibbon = useMemo(
    () =>
      categoryKey === 'congrats'
        ? '예) 결혼을 진심으로 축하합니다'
        : '예) 삼가 고인의 명복을 빕니다',
    [categoryKey]
  )
  const suggestedSender = useMemo(
    () =>
      categoryKey === 'congrats'
        ? '예) 홍길동 · ○○회사 임직원 일동'
        : '예) 홍길동 · ○○동창회 일동',
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
    ordererName: '',
    ordererPhone: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, true>>>(
    {}
  )
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (touched[key]) {
        setErrors((e) => ({
          ...e,
          [key]: validateField(key, String(value), next) ?? undefined,
        }))
      }
      return next
    })
  }

  const handleBlur = (key: keyof FormState) => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors((e) => ({
      ...e,
      [key]: validateField(key, form[key], form) ?? undefined,
    }))
  }

  const handleAddress = (r: AddressResult) => {
    const addr = r.buildingName
      ? `${r.address} (${r.buildingName})`
      : r.address
    setForm((prev) => ({ ...prev, zipcode: r.zipcode, address: addr }))
    setTouched((t) => ({ ...t, address: true }))
    setErrors((e) => ({ ...e, address: undefined }))
  }

  const validateAll = (): boolean => {
    const keys: (keyof FormState)[] = [
      'receiverName',
      'receiverRelationship',
      'receiverTel',
      'address',
      'deliveryDate',
      'ribbonMessage',
      'ribbonName',
      'ordererName',
      'ordererPhone',
    ]
    const next: FieldErrors = {}
    let hasError = false
    for (const k of keys) {
      const msg = validateField(k, form[k], form)
      if (msg) {
        next[k] = msg
        hasError = true
      }
    }
    setErrors(next)
    setTouched(Object.fromEntries(keys.map((k) => [k, true])))
    return !hasError
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setFormError(null)
    if (!validateAll()) {
      setFormError('입력하신 정보를 다시 확인해 주세요')
      // 첫 에러 필드로 스크롤
      const firstErrorKey = Object.keys(errors).find(
        (k) => errors[k as keyof FieldErrors]
      )
      if (firstErrorKey) {
        document
          .getElementById(`field-${firstErrorKey}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    const deliveryDatetime = new Date(
      `${form.deliveryDate}T${form.deliveryTime}:00`
    )
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
          ordererName: form.ordererName,
          ordererPhone: form.ordererPhone,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? '저장에 실패했어요')
      }

      const { token } = (await res.json()) as { token: string }
      window.location.href = `/wreath/redirect?token=${encodeURIComponent(
        token
      )}`
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '알 수 없는 오류')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {/* 받는분 */}
      <fieldset className="space-y-5">
        <legend className="mb-2 text-lg font-bold text-neutral-900">
          받는분
        </legend>

        <Field
          id="field-receiverName"
          label="이름"
          required
          error={errors.receiverName}
        >
          <input
            type="text"
            value={form.receiverName}
            onChange={(e) => update('receiverName', e.target.value)}
            onBlur={() => handleBlur('receiverName')}
            maxLength={20}
            placeholder="예) 김철수"
            className={inputCls(errors.receiverName)}
          />
        </Field>

        <Field
          id="field-receiverRelationship"
          label="받는분과의 관계"
          required
          error={errors.receiverRelationship}
         hint="결제 단계에서 받으시는 분을 구분하는 라벨로 사용돼요 (예: 신랑 김철수, 혼주 김영희)"
        >
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                update('receiverRelationship', '')
                setTouched((t) => ({ ...t, receiverRelationship: true }))
                document
                  .getElementById('relationship-custom-input')
                  ?.focus()
              }}
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                !RELATIONSHIP_PRESETS.includes(form.receiverRelationship)
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
              }`}
            >
              직접입력
            </button>
            {RELATIONSHIP_PRESETS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  update('receiverRelationship', r)
                  setTouched((t) => ({ ...t, receiverRelationship: true }))
                }}
                className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                  form.receiverRelationship === r
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <input
            id="relationship-custom-input"
            type="text"
            value={
              RELATIONSHIP_PRESETS.includes(form.receiverRelationship)
                ? ''
                : form.receiverRelationship
            }
            onChange={(e) => update('receiverRelationship', e.target.value)}
            onBlur={() => handleBlur('receiverRelationship')}
            maxLength={20}
            disabled={RELATIONSHIP_PRESETS.includes(
              form.receiverRelationship
            )}
            placeholder="예) 친구, 회사동료, 이모부 등"
            className={`${inputCls(errors.receiverRelationship)} mt-2 disabled:bg-neutral-50 disabled:text-neutral-400`}
          />
        </Field>

        <Field
          id="field-receiverTel"
          label="연락처 (선택)"
          error={errors.receiverTel}
        >
          <input
            type="tel"
            inputMode="numeric"
            value={form.receiverTel}
            onChange={(e) => update('receiverTel', formatPhone(e.target.value))}
            onBlur={() => handleBlur('receiverTel')}
            maxLength={13}
            placeholder="010-1234-5678"
            className={inputCls(errors.receiverTel)}
          />
        </Field>
      </fieldset>

      {/* 배송지 */}
      <fieldset className="space-y-5">
        <legend className="mb-2 text-lg font-bold text-neutral-900">
          배송지
        </legend>

        <Field
          id="field-address"
          label="주소"
          required
          error={errors.address}
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={form.address}
              readOnly
              placeholder="주소 검색 버튼을 눌러 주세요"
              className={`${inputCls(errors.address)} flex-1 bg-neutral-50`}
            />
            <AddressSearchButton
              onSelect={handleAddress}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-neutral-300 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
            />
          </div>
          {form.zipcode && !errors.address && (
            <p className="mt-2 text-[13px] text-neutral-600">
              우편번호 · {form.zipcode}
            </p>
          )}
        </Field>

        <Field label="상세 주소 (예식장 홀명/장례식장 호실)">
          <input
            type="text"
            value={form.addressDetail}
            onChange={(e) => update('addressDetail', e.target.value)}
            maxLength={80}
            placeholder="예) 3층 그랜드홀 / 특실 2호"
            className={inputCls()}
          />
        </Field>
      </fieldset>

      {/* 배송일시 */}
      <fieldset className="space-y-5">
        <legend className="mb-2 text-lg font-bold text-neutral-900">
          배송 일시
        </legend>

        <Field
          id="field-deliveryDate"
          label="날짜"
          required
        >
          <input
            type="date"
            value={form.deliveryDate}
            min={minDate}
            onChange={(e) => update('deliveryDate', e.target.value)}
            onBlur={() => handleBlur('deliveryDate')}
            className={inputCls(errors.deliveryDate)}
          />
        </Field>

        <Field
          id="field-deliveryTime"
          label="시간"
          required
          error={errors.deliveryDate}
          hint="행사 시작 30분~1시간 전으로 지정하시는 것을 권장드려요."
        >
          <input
            type="time"
            value={form.deliveryTime}
            onChange={(e) => update('deliveryTime', e.target.value)}
            onBlur={() => handleBlur('deliveryDate')}
            className={inputCls(errors.deliveryDate)}
          />
        </Field>
      </fieldset>

      {/* 리본 문구 (필수) */}
      <fieldset className="space-y-5">
        <legend className="mb-2 text-lg font-bold text-neutral-900">
          리본 문구
        </legend>

        <Field
          id="field-ribbonMessage"
          label="경조사어 · 리본 오른쪽"
          required
          error={errors.ribbonMessage}
        >
          <input
            type="text"
            value={form.ribbonMessage}
            onChange={(e) => update('ribbonMessage', e.target.value)}
            onBlur={() => handleBlur('ribbonMessage')}
            maxLength={30}
            placeholder={suggestedRibbon}
            className={inputCls(errors.ribbonMessage)}
          />
        </Field>

        <Field
          id="field-ribbonName"
          label="보내는분 · 리본 왼쪽"
          required
          error={errors.ribbonName}
        >
          <input
            type="text"
            value={form.ribbonName}
            onChange={(e) => update('ribbonName', e.target.value)}
            onBlur={() => handleBlur('ribbonName')}
            maxLength={30}
            placeholder={suggestedSender}
            className={inputCls(errors.ribbonName)}
          />
        </Field>
      </fieldset>

      {/* 주문자 정보 */}
      <fieldset className="space-y-5">
        <legend className="mb-2 text-lg font-bold text-neutral-900">
          주문자 정보
        </legend>

        <Field
          id="field-ordererName"
          label="이름"
          required
          error={errors.ordererName}
          hint="주문·결제자 본인의 이름을 입력해 주세요"
        >
          <input
            type="text"
            value={form.ordererName}
            onChange={(e) => update('ordererName', e.target.value)}
            onBlur={() => handleBlur('ordererName')}
            maxLength={20}
            placeholder="예) 홍길동"
            className={inputCls(errors.ordererName)}
          />
        </Field>

        <Field
          id="field-ordererPhone"
          label="전화번호"
          required
          error={errors.ordererPhone}
          hint="주문 확인·배송 알림을 받으실 연락처예요"
        >
          <input
            type="tel"
            inputMode="numeric"
            value={form.ordererPhone}
            onChange={(e) =>
              update('ordererPhone', formatPhone(e.target.value))
            }
            onBlur={() => handleBlur('ordererPhone')}
            maxLength={13}
            placeholder="010-1234-5678"
            className={inputCls(errors.ordererPhone)}
          />
        </Field>
      </fieldset>

      {formError && (
        <div className="rounded-lg bg-red-50 px-4 py-3.5 text-sm font-medium text-red-700">
          {formError}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 py-5 text-base font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              이동 중...
            </>
          ) : (
            <>
              {categoryLabel} 상품 고르러 가기
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
        <p className="mt-4 text-center text-[13px] leading-relaxed text-neutral-600">
          다음 단계에서 상품 선택 · 결제가 진행됩니다 (파트너: 꽃비)
          <br />
          화환은 배송 후 수거가 불가능합니다.
        </p>
      </div>
    </form>
  )
}

function inputCls(error?: string): string {
  const base =
    'block w-full rounded-lg border bg-white px-4 py-3.5 text-base text-neutral-900 placeholder-neutral-400 focus:outline-none'
  return error
    ? `${base} border-red-400 focus:border-red-500`
    : `${base} border-neutral-300 focus:border-neutral-500`
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id?: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div id={id}>
      <label className="block">
        <span className="mb-2 block text-[15px] font-semibold text-neutral-800">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </span>
        {children}
      </label>
      {error ? (
        <p className="mt-2 text-[14px] font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

function toDateInput(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
