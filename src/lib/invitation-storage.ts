import type { InvitationData } from '@/types/invitation'
import type { PaletteKey } from '@/components/editor/EditorContext'

const STORAGE_PREFIX = 'ieum:invitation:'

export type StoredInvitation = {
  data: InvitationData
  palette: PaletteKey
  savedAt: string
}

function isBrowser() {
  return typeof window !== 'undefined'
}

export type SaveResult =
  | { ok: true }
  | { ok: false; reason: 'quota' | 'unknown'; strippedImages: boolean }

function tryPersist(id: string, payload: StoredInvitation): boolean {
  try {
    localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(payload))
    return true
  } catch {
    return false
  }
}

export function saveInvitation(
  data: InvitationData,
  palette: PaletteKey
): SaveResult {
  if (!isBrowser()) return { ok: false, reason: 'unknown', strippedImages: false }

  const savedAt = new Date().toISOString()

  // 1차: 원본 그대로 저장 시도
  if (tryPersist(data.id, { data, palette, savedAt })) {
    return { ok: true }
  }

  // 2차: 갤러리 사진만 비우고 재시도
  const withoutGallery = {
    ...data,
    gallery: [],
  }
  if (tryPersist(data.id, { data: withoutGallery, palette, savedAt })) {
    console.warn('Storage quota reached — gallery images dropped')
    return { ok: false, reason: 'quota', strippedImages: true }
  }

  // 3차: 모든 이미지 필드 비우고 재시도
  const stripped: InvitationData = {
    ...data,
    mainPhotoUrl: null,
    ogImageUrl: null,
    gallery: [],
  }
  if (tryPersist(data.id, { data: stripped, palette, savedAt })) {
    console.warn('Storage quota reached — all images dropped')
    return { ok: false, reason: 'quota', strippedImages: true }
  }

  return { ok: false, reason: 'unknown', strippedImages: false }
}

// 저장된 데이터가 최신 스키마인지 확인 (couple.groom.firstName 존재 여부)
function isValidSchema(stored: StoredInvitation): boolean {
  const couple = stored?.data?.couple as unknown as Record<string, unknown>
  if (!couple) return false
  const groom = couple.groom as Record<string, unknown> | undefined
  return typeof groom?.firstName === 'string'
}

export function loadInvitationById(id: string): StoredInvitation | null {
  if (!isBrowser()) return null
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + id)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredInvitation
    if (!isValidSchema(parsed)) {
      // 옛 스키마 데이터 → 폐기
      localStorage.removeItem(STORAGE_PREFIX + id)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function loadInvitationBySlug(slug: string): StoredInvitation | null {
  if (!isBrowser()) return null
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key || !key.startsWith(STORAGE_PREFIX)) continue
      const raw = localStorage.getItem(key)
      if (!raw) continue
      const parsed = JSON.parse(raw) as StoredInvitation
      if (!isValidSchema(parsed)) continue
      if (parsed.data.slug === slug) return parsed
    }
    return null
  } catch {
    return null
  }
}

export function deleteInvitation(id: string): void {
  if (!isBrowser()) return
  try {
    localStorage.removeItem(STORAGE_PREFIX + id)
  } catch (err) {
    console.error('Failed to delete invitation:', err)
  }
}

export function listStoredInvitations(): StoredInvitation[] {
  if (!isBrowser()) return []
  const items: StoredInvitation[] = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key || !key.startsWith(STORAGE_PREFIX)) continue
      const raw = localStorage.getItem(key)
      if (!raw) continue
      items.push(JSON.parse(raw) as StoredInvitation)
    }
  } catch {
    // ignore
  }
  return items
}
