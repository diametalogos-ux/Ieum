import type { InvitationData } from '@/types/invitation'
import type { PaletteKey } from '@/components/editor/EditorContext'

const PALETTE_KEYS: readonly PaletteKey[] = [
  'pink',
  'beige',
  'green',
  'gray',
  'purple',
] as const

export type InvitationStatus = 'draft' | 'published' | 'archived'

export type InvitationRow = {
  id: string
  user_id: string
  slug: string
  title: string
  status: InvitationStatus
  palette: string
  content: Partial<InvitationData> | Record<string, never>
  created_at: string
  updated_at: string
}

export type StoredInvitation = {
  data: InvitationData
  palette: PaletteKey
  status: InvitationStatus
  savedAt: string
}

export type InvitationSummary = {
  id: string
  slug: string
  title: string
  status: InvitationStatus
  palette: PaletteKey
  updatedAt: string
  groomName: string
  brideName: string
  ceremonyDate: string
  ceremonyTime: string
  mainText: string
  venueName: string
  venueHall: string
  mainPhotoUrl: string | null
}

function toPalette(v: string): PaletteKey {
  return (PALETTE_KEYS as readonly string[]).includes(v)
    ? (v as PaletteKey)
    : 'pink'
}

/** DB row → 편집기가 쓰는 StoredInvitation 형태로 변환. content 안의 필드가 비어있으면 컬럼값 사용. */
export function rowToStored(row: InvitationRow): StoredInvitation {
  const content = (row.content ?? {}) as Partial<InvitationData>
  const merged: InvitationData = {
    ...content,
    id: row.id,
    userId: row.user_id,
    slug: row.slug,
    title: row.title,
    createdAt: content.createdAt ?? row.created_at,
    updatedAt: row.updated_at,
  } as InvitationData

  return {
    data: merged,
    palette: toPalette(row.palette),
    status: row.status,
    savedAt: row.updated_at,
  }
}

export function rowToSummary(row: InvitationRow): InvitationSummary {
  const content = (row.content ?? {}) as Partial<InvitationData>
  const groom = content.couple?.groom
  const bride = content.couple?.bride
  const ceremony = content.ceremony

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    palette: toPalette(row.palette),
    updatedAt: row.updated_at,
    groomName: groom?.firstName ?? '',
    brideName: bride?.firstName ?? '',
    ceremonyDate: ceremony?.date ?? '',
    ceremonyTime: ceremony?.time ?? '',
    mainText: content.mainText ?? '',
    venueName: ceremony?.venueName ?? '',
    venueHall: ceremony?.venueHall ?? '',
    mainPhotoUrl: content.mainPhotoUrl ?? null,
  }
}

/** 새 청첩장용 랜덤 slug (8자 영숫자). 충돌 시 상위에서 재시도. */
export function generateSlug(): string {
  return Math.random().toString(36).slice(2, 10)
}
