import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
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

/**
 * RLS 우회 slug 조회 — 외부 서비스(꽃비 등)가 인증 없이 호출하는 콜백 전용.
 * status(draft/published) 상관없이 조회 가능하므로 남용 주의.
 */
export async function getInvitationBySlugAdmin(
  slug: string
): Promise<StoredInvitation | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select(COLUMNS)
    .eq('slug', slug)
    .maybeSingle()

  if (error || !data) return null
  return rowToStored(data as InvitationRow)
}
