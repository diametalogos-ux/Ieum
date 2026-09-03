import { createClient } from '@/lib/supabase/server'
import { rowToStored, type InvitationRow, type StoredInvitation } from './types'

const TABLE = 'invitations'
const COLUMNS =
  'id, user_id, slug, title, status, palette, content, created_at, updated_at'

/** 서버 사이드 slug 조회 — RLS가 published이거나 owner인 경우만 허용 */
export async function getInvitationBySlug(
  slug: string
): Promise<StoredInvitation | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select(COLUMNS)
    .eq('slug', slug)
    .maybeSingle()

  if (error || !data) return null
  return rowToStored(data as InvitationRow)
}

/** 서버 사이드 id 조회 (route handler 등에서 사용) */
export async function getInvitationByIdServer(
  id: string
): Promise<StoredInvitation | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select(COLUMNS)
    .eq('id', id)
    .maybeSingle()

  if (error || !data) return null
  return rowToStored(data as InvitationRow)
}
