import type { PaletteKey } from '@/components/editor/EditorContext'

// 팔레트별 배경 (청첩장 IntroSection과 동일)
const PALETTE_BG: Record<PaletteKey, string> = {
  pink:   'linear-gradient(to bottom, #fdf6f7 0%, #ffffff 60%, #fdf6f7 100%)',
  beige:  'linear-gradient(to bottom, #fbf6ef 0%, #ffffff 60%, #fbf6ef 100%)',
  green:  'linear-gradient(to bottom, #f2f7f0 0%, #ffffff 60%, #f2f7f0 100%)',
  gray:   'linear-gradient(to bottom, #f6f6f7 0%, #ffffff 60%, #f6f6f7 100%)',
  purple: 'linear-gradient(to bottom, #f6f1fb 0%, #ffffff 60%, #f6f1fb 100%)',
}

const PALETTE_STRONG: Record<PaletteKey, string> = {
  pink:   '#c9748a',
  beige:  '#b8926a',
  green:  '#6b9b6b',
  gray:   '#6b7280',
  purple: '#8a6fc0',
}

const PALETTE_MID: Record<PaletteKey, string> = {
  pink:   '#e5a3b3',
  beige:  '#d4b896',
  green:  '#a5c4a3',
  gray:   '#a1a5ac',
  purple: '#b6a3d8',
}

const PALETTE_PHOTO_BG: Record<PaletteKey, string> = {
  pink:   'linear-gradient(135deg, #f7ecec 0%, #d9b8bd 100%)',
  beige:  'linear-gradient(135deg, #f4e6d0 0%, #c9a988 100%)',
  green:  'linear-gradient(135deg, #dcefd8 0%, #a5c4a3 100%)',
  gray:   'linear-gradient(135deg, #e5e5e8 0%, #a1a5ac 100%)',
  purple: 'linear-gradient(135deg, #e5daf0 0%, #b6a3d8 100%)',
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
 * IntroSection과 동일한 구조/무드/여백 비율.
 */
export default function CardThumbnail({
  palette = 'pink',
  mainPhotoUrl,
  groomName,
  brideName,
  ceremonyDate,
  ceremonyTime,
  mainText,
  venueName,
  venueHall,
}: Props) {
  const bg = PALETTE_BG[palette]
  const strong = PALETTE_STRONG[palette]
  const mid = PALETTE_MID[palette]
  const photoBg = PALETTE_PHOTO_BG[palette]

  let y = '', m = '', d = '', dayKo = ''
  if (ceremonyDate) {
    const [yy, mm, dd] = ceremonyDate.split('-').map(Number)
    if (yy && mm && dd) {
      y = String(yy)
      m = String(mm).padStart(2, '0')
      d = String(dd).padStart(2, '0')
      const day = ['일', '월', '화', '수', '목', '금', '토'][new Date(yy, mm - 1, dd).getDay()]
      dayKo = `${day}요일`
    }
  }
  const [hhStr] = (ceremonyTime ?? '').split(':')
  const hh = Number(hhStr)
  const ampm = isFinite(hh) ? (hh < 12 ? '오전' : '오후') : ''
  const hour12 = isFinite(hh) ? (hh > 12 ? hh - 12 : hh) : null

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden px-3 pt-4 pb-3"
      style={{ background: bg }}
    >
      {/* 상단: Wedding Invitation + 날짜 라인 */}
      <div className="w-full text-center">
        <p
          className="font-serif text-[7px] tracking-[0.4em] uppercase"
          style={{ color: strong, opacity: 0.8 }}
        >
          Wedding Invitation
        </p>
        <div className="mt-1 flex items-center justify-center gap-1">
          <span className="h-px w-2.5" style={{ background: mid, opacity: 0.6 }} />
          <span className="font-serif text-[8px] tracking-[0.25em] text-neutral-500">
            {y ? `${y}. ${m}. ${d}` : 'YYYY. MM. DD'}
          </span>
          <span className="h-px w-2.5" style={{ background: mid, opacity: 0.6 }} />
        </div>
      </div>

      {/* 중앙: 사진 카드 */}
      <div className="flex flex-1 items-center justify-center py-2">
        <div className="relative aspect-[3/4] w-[68%] overflow-hidden rounded-[2px] shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
          {mainPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mainPhotoUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: photoBg }}
            >
              <span className="font-serif text-[11px] tracking-wider text-white/60">
                {groomName?.[0] ?? 'M'} &amp; {brideName?.[0] ?? 'S'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 하단: 이름 + 메인문구 + 날짜/시간 + 예식장 */}
      <div className="w-full text-center">
        <p className="font-serif text-[14px] font-medium leading-tight text-neutral-800">
          {groomName || '민준'}
          <span className="mx-1" style={{ color: strong }}>&amp;</span>
          {brideName || '서연'}
        </p>

        {mainText && (
          <p className="font-serif mt-1 text-[8px] leading-snug text-neutral-500 line-clamp-1">
            {mainText}
          </p>
        )}

        <div className="mt-1.5 flex items-center justify-center gap-0.5 text-[7px] text-neutral-500">
          {y && (
            <span>
              {y}. {m}. {d}
            </span>
          )}
          {dayKo && hour12 !== null && (
            <>
              <span className="text-neutral-300">·</span>
              <span>
                {dayKo} {ampm} {hour12}시
              </span>
            </>
          )}
        </div>

        {(venueName || venueHall) && (
          <p className="mt-0.5 text-[7px] text-neutral-400 line-clamp-1">
            {venueName} {venueHall}
          </p>
        )}
      </div>
    </div>
  )
}
