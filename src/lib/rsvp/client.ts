import { createClient } from '@/lib/supabase/client'

export type RsvpSide = 'groom' | 'bride'

export type RsvpInput = {
  invitationId: string
  side: RsvpSide
  name: string
  contact: string
  attendance: 'attend' | 'absent'
  headcount: number
  meal: 'yes' | 'no' | null
  message: string
}

export type RsvpEntry = {
  id: string
  invitationId: string
  side: RsvpSide
  name: string
  contact: string | null
  attendance: 'attend' | 'absent'
  headcount: number
  meal: 'yes' | 'no' | null
  message: string | null
  createdAt: string
}

type RsvpRow = {
  id: string
  invitation_id: string
  side: RsvpSide | null
  name: string
  contact: string | null
  attendance: 'attend' | 'absent'
  headcount: number
  meal: 'yes' | 'no' | null
  message: string | null
  created_at: string
}

function rowToEntry(row: RsvpRow): RsvpEntry {
  return {
    id: row.id,
    invitationId: row.invitation_id,
    side: row.side ?? 'groom',
    name: row.name,
    contact: row.contact,
    attendance: row.attendance,
    headcount: row.headcount,
    meal: row.meal,
    message: row.message,
    createdAt: row.created_at,
  }
}

export type RsvpResult =
  | { ok: true }
  | { ok: false; error: string }

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** 하객이 RSVP 응답 제출 (익명 anon client — RLS: published 청첩장만 허용) */
export async function submitRsvp(input: RsvpInput): Promise<RsvpResult> {
  // 데모/샘플 청첩장 (UUID 아닌 id) — 실제 저장 건너뛰고 성공 처리
  if (!UUID_RE.test(input.invitationId)) {
    return { ok: true }
  }
  const supabase = createClient()
  const { error } = await supabase.from('rsvp').insert({
    invitation_id: input.invitationId,
    side: input.side,
    name: input.name,
    contact: input.contact || null,
    attendance: input.attendance,
    headcount: input.headcount,
    meal: input.meal,
    message: input.message || null,
  })
  if (error) {
    if (error.code === '42501' || /policy/i.test(error.message)) {
      return {
        ok: false,
        error: '아직 공개되지 않은 청첩장이라 응답을 저장할 수 없어요.',
      }
    }
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

/** 오너용: 청첩장의 모든 RSVP 응답 조회 (RLS: 소유자만 SELECT 가능) */
export async function listRsvpsByInvitation(
  invitationId: string
): Promise<RsvpEntry[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('rsvp')
    .select(
      'id, invitation_id, side, name, contact, attendance, headcount, meal, message, created_at'
    )
    .eq('invitation_id', invitationId)
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return (data as RsvpRow[]).map(rowToEntry)
}

/** 오너용: RSVP 삭제 (RLS: 소유자만 DELETE 가능) */
export async function deleteRsvp(id: string): Promise<RsvpResult> {
  const supabase = createClient()
  const { error } = await supabase.from('rsvp').delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
