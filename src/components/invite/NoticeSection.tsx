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

      <ol className="mx-auto mt-10 max-w-md divide-y divide-neutral-200 border-t border-b border-neutral-200">
        {data.notices.map((n, idx) => (
          <li key={n.id} className="flex gap-4 py-4">
            <span className="font-serif text-[11px] font-light tracking-[0.2em] text-neutral-400 pt-0.5">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <p className="font-serif flex-1 text-[13px] leading-[1.9] text-neutral-700">
              {n.content}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
