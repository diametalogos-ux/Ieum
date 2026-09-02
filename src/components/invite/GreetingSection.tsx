import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

export default function GreetingSection({ data }: Props) {
  return (
    <section className="bg-white px-8 py-20">
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          Invitation
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          소중한 분들을 초대합니다
        </h2>
        <div className="mx-auto mt-6 flex items-center justify-center gap-2">
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
          <span className="text-sm" style={{ color: 'var(--p-strong)' }}>
            ✿
          </span>
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
        </div>
      </div>

      <p className="font-serif mt-10 whitespace-pre-line text-center text-[15px] leading-[2] text-neutral-700">
        {data.greetingText}
      </p>

      <div className="mt-12 flex flex-col items-center gap-3">
        <div className="font-serif flex items-center gap-4 text-sm text-neutral-600">
          <div className="text-right">
            <p className="text-[11px] text-neutral-400">
              {data.couple.groomFatherName} · {data.couple.groomMotherName}
            </p>
            <p className="mt-1">
              의 아들{' '}
              <span className="font-semibold text-neutral-800">
                {data.couple.groomName.slice(-2)}
              </span>
            </p>
          </div>
          <div className="h-8 w-px bg-neutral-200" />
          <div className="text-left">
            <p className="text-[11px] text-neutral-400">
              {data.couple.brideFatherName} · {data.couple.brideMotherName}
            </p>
            <p className="mt-1">
              의 딸{' '}
              <span className="font-semibold text-neutral-800">
                {data.couple.brideeName.slice(-2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
