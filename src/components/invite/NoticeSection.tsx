import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

export default function NoticeSection({ data }: Props) {
  if (data.notices.length === 0) return null

  return (
    <section className="bg-white px-8 py-20">
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          Notice
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          안내 말씀
        </h2>
        <div className="mx-auto mt-6 flex items-center justify-center gap-2">
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
          <span className="text-sm" style={{ color: 'var(--p-strong)' }}>
            ✿
          </span>
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
        </div>
      </div>

      <ul className="mt-10 space-y-3">
        {data.notices.map((n) => (
          <li
            key={n.id}
            className="relative rounded-xl border-l-2 bg-white px-5 py-4 shadow-sm ring-1 ring-neutral-100"
            style={{ borderLeftColor: 'var(--p-strong)' }}
          >
            <p className="text-sm leading-relaxed text-neutral-700">
              {n.content}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
