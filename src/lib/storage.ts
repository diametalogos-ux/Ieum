import { createClient } from '@/lib/supabase/client'
import { processImage, validateImage } from '@/lib/image-utils'

const BUCKET = 'invitation-images'

export type UploadImageResult =
  | { ok: true; url: string; path: string }
  | { ok: false; error: string }

/**
 * 이미지 파일을 리사이즈·압축 → WebP로 변환 → Supabase Storage 업로드 →
 * public URL 반환.
 * 파일 경로: {user_id}/{scope}/{uuid}.webp
 *
 * scope 예: "main", "og", "gallery"
 */
export async function processAndUploadImage(input: {
  file: File
  scope: string
  maxDimension?: number
  quality?: number
}): Promise<UploadImageResult> {
  const check = validateImage(input.file)
  if (!check.ok) return { ok: false, error: check.reason }

  const supabase = createClient()
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser()
  if (userErr || !user) {
    return { ok: false, error: '로그인이 필요합니다.' }
  }

  // 리사이즈·압축된 dataURL → Blob
  let blob: Blob
  try {
    const dataUrl = await processImage(input.file, {
      maxDimension: input.maxDimension,
      quality: input.quality,
    })
    const res = await fetch(dataUrl)
    blob = await res.blob()
  } catch {
    return { ok: false, error: '이미지 처리에 실패했어요' }
  }

  const filename = `${crypto.randomUUID()}.webp`
  const path = `${user.id}/${input.scope}/${filename}`

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, {
      contentType: 'image/webp',
      cacheControl: '31536000', // 1년 (파일명이 uuid라 캐싱 안전)
    })
  if (uploadErr) return { ok: false, error: uploadErr.message }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { ok: true, url: data.publicUrl, path }
}

/** Storage에서 파일 삭제 (실패해도 조용히 넘어감) */
export async function deleteStorageImage(url: string | null | undefined): Promise<void> {
  if (!url) return
  // Storage URL인 경우만 처리 (외부 URL은 건드리지 않음)
  if (!url.includes(`/storage/v1/object/public/${BUCKET}/`)) return

  const path = url.split(`/${BUCKET}/`)[1]
  if (!path) return

  const supabase = createClient()
  await supabase.storage.from(BUCKET).remove([path])
}
