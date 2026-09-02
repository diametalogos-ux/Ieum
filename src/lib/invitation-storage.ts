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

export function saveInvitation(data: InvitationData, palette: PaletteKey): void {
  if (!isBrowser()) return
  try {
    const payload: StoredInvitation = {
      data,
      palette,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_PREFIX + data.id, JSON.stringify(payload))
  } catch (err) {
    console.error('Failed to save invitation:', err)
  }
}

export function loadInvitationById(id: string): StoredInvitation | null {
  if (!isBrowser()) return null
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + id)
    if (!raw) return null
    return JSON.parse(raw) as StoredInvitation
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
