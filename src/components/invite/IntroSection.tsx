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

export default function IntroSection({ data }: Props) {
  const { y, m, d, day } = formatDateKo(data.ceremony.date)
  const [hh] = data.ceremony.time.split(':').map(Number)
  const ampm = hh < 12 ? '오전' : '오후'
  const hour12 = hh > 12 ? hh - 12 : hh
  const introAnim = INTRO_ANIM_CLASS[data.introEffect] ?? ''

  return (
    <section
      className={`relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden px-8 pt-16 pb-12 ${introAnim}`}
      style={{
        background:
          'linear-gradient(to bottom, var(--p-bg) 0%, #ffffff 60%, var(--p-bg) 100%)',
      }}
    >
      <ParticleOverlay type={data.particle} />
      <div className="text-center">
        <p
          className="font-serif text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          Wedding Invitation
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6" style={{ background: 'var(--p-mid)', opacity: 0.6 }} />
          <span className="text-xs tracking-[0.3em] text-neutral-500">
            {y}. {String(m).padStart(2, '0')}. {String(d).padStart(2, '0')}
          </span>
          <span className="h-px w-6" style={{ background: 'var(--p-mid)', opacity: 0.6 }} />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center py-10">
        <div className="relative aspect-[3/4] w-full max-w-[280px]">
          {data.mainPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.mainPhotoUrl}
              alt="Main"
              className="h-full w-full rounded-[2px] object-cover shadow-2xl"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center rounded-[2px] shadow-2xl"
              style={{
                background:
                  'linear-gradient(135deg, var(--p-soft) 0%, var(--p-mid) 100%)',
              }}
            >
              <div className="text-center">
                <p className="font-serif text-5xl tracking-wider text-white/50">
                  M &amp; S
                </p>
                <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/60">
                  Main Photo
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <h1 className="font-serif text-3xl font-medium leading-relaxed tracking-wide text-neutral-800">
          {data.couple.groom.firstName}
          <span className="mx-3" style={{ color: 'var(--p-strong)' }}>
            &amp;
          </span>
          {data.couple.bride.firstName}
        </h1>

        <p className="font-serif mt-5 whitespace-pre-line text-sm leading-relaxed text-neutral-600">
          {data.mainText}
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-neutral-500">
          <span>
            {y}. {String(m).padStart(2, '0')}. {String(d).padStart(2, '0')}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            {day}요일 {ampm} {hour12}시
          </span>
        </div>
        <p className="mt-1 text-[12px] text-neutral-400">
          {data.ceremony.venueName} {data.ceremony.venueHall}
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-neutral-400">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="h-8 w-px animate-pulse bg-neutral-300" />
      </div>
    </section>
  )
}
