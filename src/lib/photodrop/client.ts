import { createClient } from '@/lib/supabase/client'
import { processImage, validateImage } from '@/lib/image-utils'

const BUCKET = 'photodrop-images'

export type PhotoDropEntry = {
  id: string
  invitationId: string
  imageUrl: string
  storagePath: string
  uploaderName: string | null
  message: string | null
  createdAt: string
}

type PhotoDropRow = {
  id: string
  invitation_id: string
  image_url: string
  storage_path: string
  uploader_name: string | null
  message: string | null
  created_at: string
}

function rowToEntry(row: PhotoDropRow): PhotoDropEntry {
  return {
    id: row.id,
    invitationId: row.invitation_id,
    imageUrl: row.image_url,
    storagePath: row.storage_path,
    uploaderName: row.uploader_name,
    message: row.message,
    createdAt: row.created_at,
  }
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** 하객이 사진 업로드 — 압축된 WebP 로 Storage 저장 + DB row insert */
export async function uploadPhotoDrop(input: {
  invitationId: string
  file: File
  uploaderName: string
  message: string
}): Promise<
  { ok: true; entry: PhotoDropEntry } | { ok: false; error: string }
> {
  const check = validateImage(input.file)
  if (!check.ok) return { ok: false, error: check.reason }

  // 데모용 slug 등 UUID 아닌 id 는 저장 스킵 (샘플 청첩장)
  if (!UUID_RE.test(input.invitationId)) {
    return {
      ok: true,
      entry: {
        id: `demo-${Date.now()}`,
        invitationId: input.invitationId,
        imageUrl: URL.createObjectURL(input.file),
        storagePath: '',
        uploaderName: input.uploaderName || null,
        message: input.message || null,
        createdAt: new Date().toISOString(),
      },
    }
  }

  const supabase = createClient()

  // 압축 후 base64 -> blob
  let blob: Blob
  try {
    const dataUrl = await processImage(input.file, { maxDimension: 1080, quality: 0.75 })
    const res = await fetch(dataUrl)
    blob = await res.blob()
  } catch {
    return { ok: false, error: '이미지 처리에 실패했어요' }
  }

  const filename = `${crypto.randomUUID()}.webp`
  const storagePath = `${input.invitationId}/${filename}`

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, blob, {
      contentType: 'image/webp',
      cacheControl: '3600',
    })
  if (uploadErr) {
    if (/policy|permission|403/i.test(uploadErr.message)) {
      return {
        ok: false,
        error: '아직 공개되지 않은 청첩장이라 업로드할 수 없어요.',
      }
    }
    return { ok: false, error: uploadErr.message }
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
  const imageUrl = urlData.publicUrl

  const { data, error } = await supabase
    .from('photodrop')
    .insert({
      invitation_id: input.invitationId,
      storage_path: storagePath,
      image_url: imageUrl,
      uploader_name: input.uploaderName || null,
      message: input.message || null,
    })
    .select('id, invitation_id, image_url, storage_path, uploader_name, message, created_at')
    .single()

  if (error || !data) {
    // DB 실패 → 업로드된 파일 정리 시도
    await supabase.storage.from(BUCKET).remove([storagePath])
    return { ok: false, error: error?.message ?? 'unknown' }
  }

  return { ok: true, entry: rowToEntry(data as PhotoDropRow) }
}

/** 청첩장의 하객 업로드 사진 목록 */
export async function listPhotoDropByInvitation(
  invitationId: string
): Promise<PhotoDropEntry[]> {
  if (!UUID_RE.test(invitationId)) return []
  const supabase = createClient()
  const { data, error } = await supabase
    .from('photodrop')
    .select('id, invitation_id, image_url, storage_path, uploader_name, message, created_at')
    .eq('invitation_id', invitationId)
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return (data as PhotoDropRow[]).map(rowToEntry)
}

/** 오너용: 사진 삭제 (Storage + DB 모두) */
export async function deletePhotoDrop(
  entry: PhotoDropEntry
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient()
  if (entry.storagePath) {
    await supabase.storage.from(BUCKET).remove([entry.storagePath])
  }
  const { error } = await supabase.from('photodrop').delete().eq('id', entry.id)
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}
