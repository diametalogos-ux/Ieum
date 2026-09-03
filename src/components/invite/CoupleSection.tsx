'use client'

import { useEffect, useState } from 'react'
import type { InvitationData, ParentInfo, PersonInfo } from '@/types/invitation'
import { parentDisplayName } from '@/types/invitation'

type Props = { data: InvitationData }

function parentsLine(father: ParentInfo, mother: ParentInfo) {
  const parts: string[] = []
  if (father.visible && (father.firstName || father.lastName)) {
    parts.push(parentDisplayName(father))
  }
  if (mother.visible && (mother.firstName || mother.lastName)) {
    parts.push(parentDisplayName(mother))
  }
  return parts.join(' · ')
}

type SideContact = {
  key: string
  role: string
  displayName: string
  contact: string
}

function collectSideContacts(
  side: 'groom' | 'bride',
  data: InvitationData
): SideContact[] {
  const c = data.couple
  const person = side === 'groom' ? c.groom : c.bride
  const father = side === 'groom' ? c.groomFather : c.brideFather
  const mother = side === 'groom' ? c.groomMother : c.brideMother
  const selfRole = side === 'groom' ? '신랑' : '신부'

  const list: SideContact[] = []
  if (person.firstName && person.contact) {
    list.push({
      key: side,
      role: selfRole,
      displayName: `${person.lastName}${person.firstName}`,
      contact: person.contact,
    })
  }
  if (father.visible && !father.deceased && father.firstName && father.contact) {
    list.push({
      key: `${side}-father`,
      role: '아버지',
      displayName: `${father.lastName}${father.firstName}`,
      contact: father.contact,
    })
  }
  if (mother.visible && !mother.deceased && mother.firstName && mother.contact) {
    list.push({
      key: `${side}-mother`,
      role: '어머니',
      displayName: `${mother.lastName}${mother.firstName}`,
      contact: mother.contact,
    })
  }
  return list
}

type PersonProps = {
  role: string
  hostLabel: string
  person: PersonInfo
  parentsLine: string
  side: 'groom' | 'bride'
  contacts: SideContact[]
  onOpenSheet: () => void
}

function PersonCard({
  role,
  hostLabel,
  person,
  parentsLine,
  contacts,
  onOpenSheet,
}: PersonProps) {
  const fullName = `${person.lastName}${person.firstName}`
  const hasContacts = contacts.length > 0

  return (
    <div className="flex-1 text-center">
      <p
        className="text-[11px] tracking-[0.3em] uppercase"
        style={{ color: 'var(--p-strong)', opacity: 0.8 }}
      >
        {role}
      </p>
      <h3 className="font-serif mt-3 text-2xl font-medium text-neutral-800">
        {fullName || '(이름 미입력)'}
      </h3>
      {parentsLine && (
        <div className="mt-4">
          <p className="text-[10px] tracking-[0.2em] text-neutral-400">
            {hostLabel}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-600">
            {parentsLine}
          </p>
        </div>
      )}

      {hasContacts && (
        <button
          type="button"
          onClick={onOpenSheet}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          aria-label={`${fullName} 측 연락하기`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          연락하기
        </button>
      )}
    </div>
  )
}

/** vCard(.vcf) 다운로드용 data URL 생성 */
function buildVCardHref(name: string, tel: string): string {
  const escaped = name.replace(/([,;\\])/g, '\\$1')
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escaped}`,
    `TEL;TYPE=CELL:${tel}`,
    'END:VCARD',
  ].join('\r\n')
  return `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`
}

function ContactSheet({
  title,
  tone,
  contacts,
  onClose,
}: {
  title: string
  tone: 'groom' | 'bride'
  contacts: SideContact[]
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const dotColor = tone === 'groom' ? 'bg-sky-400' : 'bg-rose-400'

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] rounded-t-3xl bg-white p-6 pb-8 shadow-2xl"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)' }}
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${dotColor}`} />
            <h3 className="font-serif text-lg font-semibold text-neutral-900">
              {title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="divide-y divide-neutral-100 rounded-2xl bg-neutral-50/60">
          {contacts.map((c) => (
            <ContactRow key={c.key} contact={c} />
          ))}
        </ul>

        <p className="mt-4 text-center text-[10px] leading-relaxed text-neutral-400">
          연락처 저장(👤)을 누르면 휴대폰 주소록에 추가할 수 있어요
        </p>
      </div>
    </div>
  )
}

function ContactRow({ contact }: { contact: SideContact }) {
  const normalizedTel = contact.contact.replace(/[^0-9+]/g, '')
  const vcardHref = buildVCardHref(contact.displayName, normalizedTel)
  return (
    <li className="flex items-center justify-between px-4 py-3.5">
      <div>
        <p className="text-[10px] font-medium tracking-[0.15em] text-neutral-400">
          {contact.role}
        </p>
        <p className="mt-0.5 text-[14px] font-medium text-neutral-800">
          {contact.displayName}
        </p>
      </div>
      <div className="flex gap-1.5">
        <a
          href={`tel:${normalizedTel}`}
          aria-label={`${contact.displayName}에게 전화`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <a
          href={`sms:${normalizedTel}`}
          aria-label={`${contact.displayName}에게 문자`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
        <a
          href={vcardHref}
          download={`${contact.displayName}.vcf`}
          aria-label={`${contact.displayName} 연락처 저장`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
        </a>
      </div>
    </li>
  )
}

export default function CoupleSection({ data }: Props) {
  const { couple } = data
  const groomParents = parentsLine(couple.groomFather, couple.groomMother)
  const brideParents = parentsLine(couple.brideFather, couple.brideMother)

  const [openSide, setOpenSide] = useState<'groom' | 'bride' | null>(null)

  const groomContacts = collectSideContacts('groom', data)
  const brideContacts = collectSideContacts('bride', data)

  const currentContacts =
    openSide === 'groom'
      ? groomContacts
      : openSide === 'bride'
      ? brideContacts
      : []

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
          CONTACT
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          신랑 &amp; 신부
        </h2>
      </div>

      <div className="mt-10 flex items-stretch gap-4">
        <PersonCard
          role="Groom"
          hostLabel="신랑측 혼주"
          person={couple.groom}
          parentsLine={groomParents}
          side="groom"
          contacts={groomContacts}
          onOpenSheet={() => setOpenSide('groom')}
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
          hostLabel="신부측 혼주"
          person={couple.bride}
          parentsLine={brideParents}
          side="bride"
          contacts={brideContacts}
          onOpenSheet={() => setOpenSide('bride')}
        />
      </div>

      {openSide && (
        <ContactSheet
          title={openSide === 'groom' ? '신랑측 연락처' : '신부측 연락처'}
          tone={openSide}
          contacts={currentContacts}
          onClose={() => setOpenSide(null)}
        />
      )}
    </section>
  )
}
