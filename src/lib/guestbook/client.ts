import { createClient } from '@/lib/supabase/client'

export type GuestbookInput = {
  invitationId: string
  name: string
  message: string
}

export type GuestbookEntry = {
  id: string
  invitationId: string
  name: string
  message: string
  createdAt: string
}

type GuestbookRow = {
  id: string
  invitation_id: string
  name: string
  message: string
  created_at: string
}

function rowToEntry(row: GuestbookRow): GuestbookEntry {
  return {
    id: row.id,
    invitationId: row.invitation_id,
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
  }
}

export type GuestbookResult =
  | { ok: true; entry: GuestbookEntry }
  | { ok: false; error: string }

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** 하객이 방명록 작성 (RLS: published 청첩장만 허용) */
export async function submitGuestbook(
  input: GuestbookInput
): Promise<GuestbookResult> {
  // 데모/샘플 청첩장 — 저장 스킵하고 성공 처리 (fake entry 반환)
  if (!UUID_RE.test(input.invitationId)) {
    return {
      ok: true,
      entry: {
        id: `demo-${Date.now()}`,
        invitationId: input.invitationId,
        name: input.name,
        message: input.message,
        createdAt: new Date().toISOString(),
      },
    }
  }

  const supabase = createClient()
  const { data, error } = await supabase
    .from('guestbook')
    .insert({
      invitation_id: input.invitationId,
      name: input.name,
      message: input.message,
    })
    .select('id, invitation_id, name, message, created_at')
    .single()

  if (error || !data) {
    if (error?.code === '42501' || (error && /policy/i.test(error.message))) {
      return {
        ok: false,
        error: '아직 공개되지 않은 청첩장이라 작성할 수 없어요.',
      }
    }
    return { ok: false, error: error?.message ?? 'unknown' }
  }
  return { ok: true, entry: rowToEntry(data as GuestbookRow) }
}

/** 방명록 목록 조회 (RLS: published 청첩장 또는 owner) */
export async function listGuestbookByInvitation(
  invitationId: string
): Promise<GuestbookEntry[]> {
  if (!UUID_RE.test(invitationId)) return []
  const supabase = createClient()
  const { data, error } = await supabase
    .from('guestbook')
    .select('id, invitation_id, name, message, created_at')
    .eq('invitation_id', invitationId)
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return (data as GuestbookRow[]).map(rowToEntry)
}

/** 오너용: 방명록 삭제 (RLS: 소유자만 DELETE 가능) */
export async function deleteGuestbook(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient()
  const { error } = await supabase.from('guestbook').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
