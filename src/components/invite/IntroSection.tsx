import type { InvitationData } from '@/types/invitation'
import ParticleOverlay from './ParticleOverlay'

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

/** Blush 테마 기본 이미지 (사용자가 mainPhotoUrl 채우면 이걸 대체) */
const BLUSH_DEFAULT_IMAGE = '/images/main1-ai.png'

export default function IntroSection({ data }: Props) {
  const { y, m, d, day } = formatDateKo(data.ceremony.date)
  const [hh] = data.ceremony.time.split(':').map(Number)
  const ampm = hh < 12 ? '오전' : '오후'
  const hour12 = hh > 12 ? hh - 12 : hh
  const introAnim = INTRO_ANIM_CLASS[data.introEffect] ?? ''
  const imageSrc = data.mainPhotoUrl || BLUSH_DEFAULT_IMAGE

  return (
    <section
      className={`relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden ${introAnim}`}
    >
      {/* 배경: 메인 이미지 풀 커버 (섹션 안에 갇힘) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* 텍스트 가독성용 위·아래 그라디언트 오버레이 */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      </div>

      <ParticleOverlay type={data.particle} />

      {/* 상단: Wedding Invitation + 날짜 라인 */}
      <div
        className="relative w-full px-8 pt-14 text-center text-white"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 56px)' }}
      >
        <p className="font-serif text-[11px] tracking-[0.5em] uppercase drop-shadow-sm">
          Wedding Invitation
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-white/70" />
          <span className="text-xs tracking-[0.3em] drop-shadow-sm">
            {y}. {String(m).padStart(2, '0')}. {String(d).padStart(2, '0')}
          </span>
          <span className="h-px w-6 bg-white/70" />
        </div>
      </div>

      {/* 하단: 이름·문구·일시·예식장 */}
      <div className="relative w-full px-8 pb-14 pt-16 text-center text-white">
        <h1 className="font-serif text-4xl font-medium leading-tight tracking-wide drop-shadow-md md:text-5xl">
          {data.couple.groom.firstName}
          <span
            className="mx-3 font-light"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            &amp;
          </span>
          {data.couple.bride.firstName}
        </h1>

        <p className="font-serif mt-5 whitespace-pre-line text-sm leading-relaxed text-white/90 drop-shadow-sm">
          {data.mainText}
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-white/90 drop-shadow-sm">
          <span>
            {y}. {String(m).padStart(2, '0')}. {String(d).padStart(2, '0')}
          </span>
          <span className="text-white/50">·</span>
          <span>
            {day}요일 {ampm} {hour12}시
          </span>
        </div>
        <p className="mt-1 text-[12px] text-white/70 drop-shadow-sm">
          {data.ceremony.venueName} {data.ceremony.venueHall}
        </p>

        <div className="mt-8 flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-8 w-px animate-pulse bg-white/60" />
        </div>
      </div>
    </section>
  )
}
