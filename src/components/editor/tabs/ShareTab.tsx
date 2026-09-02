'use client'

import { useMemo, useState } from 'react'
import { useEditor } from '../EditorContext'
import EditorSection from '../ui/EditorSection'
import { TextField, TextArea } from '../ui/EditorField'
import ImageUpload from '../ui/ImageUpload'

const BASE_URL = 'ieum.co/invite'

function OGPreviewCard() {
  const { data } = useEditor()

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      {/* OG 이미지 자리 */}
      <div
        className="relative flex aspect-[1.91/1] w-full items-center justify-center"
        style={{
          background:
            'linear-gradient(135deg, #f7ecec 0%, #ecd8d8 50%, #d9b8bd 100%)',
        }}
      >
        {data.ogImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.ogImageUrl}
            alt="OG"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center text-white/70">
            <p className="font-serif text-2xl tracking-wider">
              {data.couple.groom.firstName}
              <span className="mx-2 text-white/50">&amp;</span>
              {data.couple.bride.firstName}
            </p>
            <p className="mt-2 text-[10px] tracking-[0.3em] uppercase">
              OG Image
            </p>
          </div>
        )}
      </div>
      {/* 텍스트 */}
      <div className="px-3.5 py-3">
        <p className="text-xs text-neutral-400">ieum.co</p>
        <p className="mt-1 line-clamp-2 text-sm font-semibold text-neutral-900">
          {data.ogTitle || '제목을 입력해주세요'}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-neutral-500">
          {data.ogDescription || '설명을 입력해주세요'}
        </p>
      </div>
    </div>
  )
}

function SlugInput() {
  const { data, update } = useEditor()
  const [touched, setTouched] = useState(false)

  const status = useMemo(() => {
    const v = data.slug.trim()
    if (!v) return { type: 'error', msg: '슬러그를 입력해주세요' } as const
    if (v.length < 2) return { type: 'error', msg: '2자 이상 입력해주세요' } as const
    if (v.length > 30) return { type: 'error', msg: '30자 이내로 입력해주세요' } as const
    if (/[\s]/.test(v)) return { type: 'error', msg: '공백은 사용할 수 없어요' } as const
    if (v === 'sample') return { type: 'warn', msg: '샘플 슬러그입니다. 변경을 권장해요' } as const
    return { type: 'ok', msg: '사용 가능한 주소예요' } as const
  }, [data.slug])

  return (
    <div>
      <p className="text-[11px] font-medium text-neutral-700">주소 (슬러그)</p>
      <div className="mt-1.5 flex overflow-hidden rounded-lg border border-neutral-200 bg-white focus-within:border-neutral-400">
        <span className="flex items-center border-r border-neutral-200 bg-neutral-50 px-3 text-xs text-neutral-500">
          {BASE_URL}/
        </span>
        <input
          type="text"
          value={data.slug}
          onChange={(e) => {
            update('slug', e.target.value)
            setTouched(true)
          }}
          onBlur={() => setTouched(true)}
          placeholder="민준서연"
          className="flex-1 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
        />
      </div>
      {touched && (
        <p
          className={`mt-1.5 text-[11px] ${
            status.type === 'error'
              ? 'text-red-500'
              : status.type === 'warn'
              ? 'text-amber-600'
              : 'text-emerald-600'
          }`}
        >
          {status.msg}
        </p>
      )}
      <p className="mt-2 rounded-md bg-neutral-50 px-3 py-2 text-[11px] text-neutral-600">
        <span className="text-neutral-400">최종 주소</span>{' '}
        <span className="font-medium text-neutral-900">
          {BASE_URL}/{data.slug || '...'}
        </span>
      </p>
    </div>
  )
}

function ShareTools() {
  const { data } = useEditor()
  const [copied, setCopied] = useState(false)
  const fullUrl = `https://${BASE_URL}/${data.slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="space-y-3">
      {/* 링크 복사 */}
      <div>
        <p className="text-[11px] font-medium text-neutral-700">공유 링크</p>
        <div className="mt-1.5 flex overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <input
            type="text"
            readOnly
            value={fullUrl}
            className="flex-1 bg-white px-3 py-2.5 text-xs text-neutral-800 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 border-l border-neutral-200 bg-neutral-50 px-3 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-emerald-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                복사됨
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                복사
              </>
            )}
          </button>
        </div>
      </div>

      {/* QR 코드 자리 */}
      <div>
        <p className="text-[11px] font-medium text-neutral-700">QR 코드</p>
        <div className="mt-1.5 flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3">
          <div
            className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-md"
            style={{
              background:
                'repeating-conic-gradient(#171717 0% 25%, #ffffff 0% 50%) 50% / 8px 8px',
            }}
            aria-label="QR 코드 미리보기"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-neutral-800">
              하객이 스캔으로 접속
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">
              오프라인 청첩장에 QR 코드를 인쇄해서 함께 배포하실 수 있어요
            </p>
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              PNG 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* 공유 채널 */}
      <div>
        <p className="text-[11px] font-medium text-neutral-700">공유하기</p>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ background: '#FEE500', color: '#111' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.87 1.9 5.38 4.72 6.79-.14.51-.9 3.27-.93 3.42 0 0-.02.13.06.19.09.05.19.01.19.01.27-.04 3.13-2.04 3.62-2.38.77.11 1.55.17 2.34.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
            </svg>
            카카오톡
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            링크 복사
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ShareTab() {
  const { data, update } = useEditor()

  return (
    <div>
      {/* 1. 미리보기 카드 */}
      <EditorSection title="공유 미리보기" description="카카오톡·SNS에 링크 공유 시 보이는 모습">
        <OGPreviewCard />

        <TextField
          label="공유 제목"
          hint="카카오톡 공유 시 표시되는 제목"
          value={data.ogTitle}
          onChange={(e) => update('ogTitle', e.target.value)}
          placeholder="민준 ♥ 서연 결혼합니다"
          maxLength={60}
        />

        <TextArea
          label="공유 설명"
          hint="제목 아래에 표시되는 짧은 설명"
          value={data.ogDescription}
          onChange={(e) => update('ogDescription', e.target.value)}
          placeholder="2026년 5월 18일 토요일 오후 2시"
          rows={2}
          maxLength={120}
        />

        <ImageUpload
          label="공유 이미지"
          value={data.ogImageUrl}
          onChange={(url) => update('ogImageUrl', url)}
          aspect="og"
          hint="권장 1200 × 630px · JPG, PNG, WebP"
          placeholderText="공유 이미지 업로드"
        />
      </EditorSection>

      {/* 2. URL 슬러그 */}
      <EditorSection title="주소 설정" description="청첩장 링크의 마지막 부분을 정하세요">
        <SlugInput />
      </EditorSection>

      {/* 3. 공유 도구 */}
      <EditorSection title="공유 도구">
        <ShareTools />
      </EditorSection>
    </div>
  )
}
