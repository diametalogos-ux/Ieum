import type { PaletteKey } from '@/components/editor/EditorContext'

/** 팔레트별 대표 accent 컬러 (사진 없을 때 fallback 텍스트 컬러) */
const PALETTE_ACCENT: Record<PaletteKey, string> = {
  pink: '#d9748b',
  beige: '#b8926a',
  green: '#6b9b6b',
  gray: '#6b7280',
  purple: '#8a6fc0',
}

/** 팔레트별 fallback 그라디언트 (사진 없을 때) */
const PALETTE_BG: Record<PaletteKey, string> = {
  pink: 'linear-gradient(140deg,#fff0f4 0%,#fddde6 100%)',
  beige: 'linear-gradient(140deg,#fbf6ef 0%,#f0e4c8 100%)',
  green: 'linear-gradient(140deg,#f2f7f0 0%,#dcefd8 100%)',
  gray: 'linear-gradient(140deg,#f6f6f7 0%,#e5e5e8 100%)',
  purple: 'linear-gradient(140deg,#f6f1fb 0%,#e5daf0 100%)',
}

/** 팔레트별 default 이미지 (사용자가 mainPhotoUrl 미입력 시 이걸 노출) */
const PALETTE_DEFAULT_IMAGE: Partial<Record<PaletteKey, string>> = {
  pink: '/images/main1-ai.png',
}

type Props = {
  palette?: PaletteKey
  mainPhotoUrl?: string | null
  groomName: string
  brideName: string
  ceremonyDate: string
  ceremonyTime?: string
  mainText?: string
  venueName?: string
  venueHall?: string
}

/**
 * 대시보드 카드의 청첩장 미니어처.
 * 실제 IntroSection과 동일한 풀 커버 사진 + 오버레이 텍스트 구조.
 */
export default function CardThumbnail({
  palette = 'pink',
  mainPhotoUrl,
  groomName,
  brideName,
  ceremonyDate,
  mainText,
}: Props) {
  const accent = PALETTE_ACCENT[palette]
  const bg = PALETTE_BG[palette]
  const image = mainPhotoUrl || PALETTE_DEFAULT_IMAGE[palette] || null

  let y = '',
    m = '',
    d = ''
  if (ceremonyDate) {
    const [yy, mm, dd] = ceremonyDate.split('-').map(Number)
    if (yy && mm && dd) {
      y = String(yy)
      m = String(mm).padStart(2, '0')
      d = String(dd).padStart(2, '0')
    }
  }

  const dateStr = y ? `${y} · ${m} · ${d}` : 'YYYY · MM · DD'
  const groom = groomName || '민준'
  const bride = brideName || '서연'
  const message = mainText || '우리 결혼합니다'

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden"
      style={image ? undefined : { background: bg }}
    >
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
            }}
          />
        </>
      )}

      {/* 상단 */}
      <div
        className={`relative w-full px-4 pt-5 text-center ${
          image ? 'text-white drop-shadow-sm' : ''
        }`}
        style={image ? undefined : { color: accent }}
      >
        <p className="text-[9px] font-medium tracking-[0.35em] uppercase">
          Wedding Invitation
        </p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span
            className={`h-px w-3 ${image ? 'bg-white/70' : ''}`}
            style={image ? undefined : { background: accent, opacity: 0.4 }}
          />
          <span className="text-[10px] tracking-[0.25em]">{dateStr}</span>
          <span
            className={`h-px w-3 ${image ? 'bg-white/70' : ''}`}
            style={image ? undefined : { background: accent, opacity: 0.4 }}
          />
        </div>
      </div>

      {/* 하단 */}
      <div
        className={`relative w-full px-4 pb-5 text-center ${
          image ? 'text-white drop-shadow-md' : ''
        }`}
        style={image ? undefined : { color: accent }}
      >
        <div className="font-serif text-xl font-medium tracking-wide">
          {groom}
          <span className="mx-1.5 font-light">&amp;</span>
          {bride}
        </div>
        <div
          className={`mx-auto my-1.5 h-px w-5 ${image ? 'bg-white/60' : ''}`}
          style={image ? undefined : { background: accent, opacity: 0.4 }}
        />
        <p
          className={`font-serif text-[11px] line-clamp-1 ${
            image ? 'text-white/90' : 'text-neutral-500'
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  )
}
