import { createClient } from '@/lib/supabase/client'
import { emptyInvitation } from '@/lib/mock/empty-invitation'
import { getThemePreset } from '@/lib/themes/presets'
import type { InvitationData } from '@/types/invitation'
import type { PaletteKey } from '@/components/editor/EditorContext'
import {
  generateSlug,
  rowToStored,
  rowToSummary,
  type InvitationRow,
  type InvitationSummary,
  type StoredInvitation,
} from './types'

const TABLE = 'invitations'
const SUMMARY_COLUMNS =
  'id, user_id, slug, title, status, palette, content, created_at, updated_at'

export type SaveResult =
  | { ok: true }
  | { ok: false; error: string }

/** 현재 로그인 유저의 청첩장 목록 (대시보드용) */
export async function listMyInvitations(): Promise<InvitationSummary[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select(SUMMARY_COLUMNS)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('listMyInvitations failed', error)
    return []
  }
  return (data as InvitationRow[]).map(rowToSummary)
}

/** 편집기용 단건 조회 (본인 소유만 RLS로 통과) */
export async function getInvitationById(
  id: string
): Promise<StoredInvitation | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select(SUMMARY_COLUMNS)
    .eq('id', id)
    .maybeSingle()

  if (error || !data) return null
  return rowToStored(data as InvitationRow)
}

export type CreateInvitationOptions = {
  themeKey?: string
}

/** 빈 청첩장 생성 → { id, slug } 반환. themeKey 주면 해당 테마 프리셋 적용 */
export async function createInvitation(
  options?: CreateInvitationOptions
): Promise<
  { ok: true; id: string; slug: string } | { ok: false; error: string }
> {
  const supabase = createClient()
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser()
  if (userErr || !user) return { ok: false, error: '로그인이 필요합니다.' }

  const preset = getThemePreset(options?.themeKey)
  const palette: PaletteKey = preset?.palette ?? 'pink'

  // 슬러그 충돌 대비 최대 3번 재시도
  for (let attempt = 0; attempt < 3; attempt++) {
    const slug = generateSlug()
    const draftContent: InvitationData = {
      ...emptyInvitation,
      ...(preset?.data ?? {}),
      userId: user.id,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        user_id: user.id,
        slug,
        title: '새 청첩장',
        status: 'draft',
        palette,
        content: draftContent,
      })
      .select('id, slug')
      .single()

    if (!error && data) {
      return { ok: true, id: data.id as string, slug: data.slug as string }
    }
    // 23505 = unique_violation (Postgres). slug 재생성 후 재시도
    if (error && (error as { code?: string }).code !== '23505') {
      return { ok: false, error: error.message }
    }
  }
  return { ok: false, error: '슬러그 생성에 실패했어요. 다시 시도해주세요.' }
}

/** 편집기 자동 저장 */
export async function updateInvitation(
  id: string,
  data: InvitationData,
  palette: PaletteKey
): Promise<SaveResult> {
  const supabase = createClient()
  const title =
    data.couple.groom.firstName && data.couple.bride.firstName
      ? `${data.couple.groom.firstName} ♥ ${data.couple.bride.firstName}`
      : data.title || '새 청첩장'

  const { error } = await supabase
    .from(TABLE)
    .update({
      title,
      palette,
      content: data,
    })
    .eq('id', id)

  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

export async function deleteInvitation(id: string): Promise<SaveResult> {
  const supabase = createClient()
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

/** 공개 상태 토글 (draft ↔ published) */
export async function setInvitationStatus(
  id: string,
  status: 'draft' | 'published'
): Promise<SaveResult> {
  const supabase = createClient()
  const { error } = await supabase
    .from(TABLE)
    .update({ status })
    .eq('id', id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
