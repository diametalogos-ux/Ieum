import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

function formatDateKo(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const day = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
  return { y, m, d, day }
}

const INTRO_ANIM_CLASS: Record<string, string> = {
  none: '',
  fade: 'intro-fade',
  slide: 'intro-slide',
  zoom: 'intro-zoom',
}

const NOIR_DEFAULT_IMAGE = '/images/main4-noir.png'

export default function IntroSectionNoir({ data }: Props) {
  const { y, m, d, day } = formatDateKo(data.ceremony.date)
  const [hh] = data.ceremony.time.split(':').map(Number)
  const ampm = hh < 12 ? '오전' : '오후'
  const hour12 = hh > 12 ? hh - 12 : hh
  const introAnim = INTRO_ANIM_CLASS[data.introEffect] ?? ''
  const imageSrc = data.mainPhotoUrl || NOIR_DEFAULT_IMAGE

  return (
    <section
      className={`relative flex min-h-[100svh] w-full flex-col bg-white ${introAnim}`}
    >
      {/* 상단: 최소한의 헤더 */}
      <div
        className="px-8 pt-14 text-center"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 48px)' }}
      >
        <p className="font-serif text-[10px] tracking-[0.55em] uppercase text-neutral-500">
          Wedding Invitation
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-neutral-300" />
          <span className="text-[11px] tracking-[0.35em] text-neutral-700">
            {y}. {String(m).padStart(2, '0')}. {String(d).padStart(2, '0')}
          </span>
          <span className="h-px w-8 bg-neutral-300" />
        </div>
      </div>

      {/* 중앙: 단 한 장의 세로 사진 */}
      <div className="flex flex-1 items-center justify-center px-10 py-10">
        <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt=""
            className={`h-full w-full object-cover ${
              data.mainPhotoGrayscale ? 'grayscale' : ''
            }`}
          />
        </div>
      </div>

      {/* 하단: 이름·문구·일시 */}
      <div className="px-8 pb-16 text-center">
        <h1 className="font-serif text-[28px] font-light leading-tight tracking-[0.15em] text-neutral-900">
          {data.couple.groom.firstName}
          <span className="mx-4 font-extralight text-neutral-400">&amp;</span>
          {data.couple.bride.firstName}
        </h1>

        <div className="mx-auto my-6 h-px w-10 bg-neutral-300" />

        <p className="font-serif whitespace-pre-line text-[12px] leading-[1.9] tracking-wide text-neutral-500">
          {data.mainText}
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] tracking-wider text-neutral-600">
          <span>
            {y}. {String(m).padStart(2, '0')}. {String(d).padStart(2, '0')}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            {day}요일 {ampm} {hour12}시
          </span>
        </div>
        <p className="mt-1 text-[11px] tracking-wider text-neutral-400">
          {data.ceremony.venueName} {data.ceremony.venueHall}
        </p>

        <div className="mt-10 flex flex-col items-center gap-2 text-neutral-400">
          <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="h-6 w-px animate-pulse bg-neutral-400" />
        </div>
      </div>
    </section>
  )
}
