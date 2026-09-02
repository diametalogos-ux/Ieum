import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

type PersonProps = {
  role: string
  roleKo: string
  name: string
  father: string
  mother: string
  contact: string
}

function PersonCard({ role, roleKo, name, father, mother, contact }: PersonProps) {
  const telHref = `tel:${contact.replace(/-/g, '')}`
  const smsHref = `sms:${contact.replace(/-/g, '')}`

  return (
    <div className="flex-1 text-center">
      <p
        className="text-[11px] tracking-[0.3em] uppercase"
        style={{ color: 'var(--p-strong)', opacity: 0.8 }}
      >
        {role}
      </p>
      <h3 className="font-serif mt-3 text-2xl font-medium text-neutral-800">
        {name}
      </h3>
      <p className="mt-3 text-xs leading-relaxed text-neutral-500">
        {father} · {mother}
        <br />
        <span className="text-neutral-400">의 {roleKo}</span>
      </p>

      <div className="mt-5 flex justify-center gap-2">
        <a
          href={telHref}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-colors"
          style={{
            ['--hover-color' as string]: 'var(--p-strong)',
          }}
          aria-label={`${name}에게 전화`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <a
          href={smsHref}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-colors"
          aria-label={`${name}에게 문자`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function CoupleSection({ data }: Props) {
  return (
    <section
      className="px-8 py-16"
      style={{ background: 'var(--p-bg)' }}
    >
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          The Couple
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          신랑 &amp; 신부
        </h2>
      </div>

      <div className="mt-10 flex items-stretch gap-4">
        <PersonCard
          role="Groom"
          roleKo="아들"
          name={data.couple.groomName}
          father={data.couple.groomFatherName}
          mother={data.couple.groomMotherName}
          contact={data.couple.groomContact}
        />

        <div className="flex items-center">
          <span
            className="font-serif text-2xl"
            style={{ color: 'var(--p-strong)' }}
          >
            &amp;
          </span>
        </div>

        <PersonCard
          role="Bride"
          roleKo="딸"
          name={data.couple.brideeName}
          father={data.couple.brideFatherName}
          mother={data.couple.brideMotherName}
          contact={data.couple.brideContact}
        />
      </div>
    </section>
  )
}
