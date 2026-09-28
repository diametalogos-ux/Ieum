import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

export default function GreetingSection({ data }: Props) {
  const alignLeft = data.greetingAlign === 'left'

  return (
    <section className="bg-white px-8 py-32">
      <div className={alignLeft ? 'text-left' : 'text-center'}>
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          Invitation
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          소중한 분들을 초대합니다
        </h2>
        <div
          className={`mt-6 flex items-center gap-2 ${
            alignLeft ? 'justify-start' : 'mx-auto justify-center'
          }`}
        >
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
          <span className="text-sm" style={{ color: 'var(--p-strong)' }}>
            ✿
          </span>
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
        </div>
      </div>

      <p
        className={`font-serif mt-12 whitespace-pre-line text-[15px] leading-[2] text-neutral-700 ${
          alignLeft ? 'text-left' : 'text-center'
        }`}
      >
        {data.greetingText}
      </p>
    </section>
  )
}
