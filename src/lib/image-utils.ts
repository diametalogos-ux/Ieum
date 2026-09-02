export const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp'
export const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
export const MAX_DIMENSION = 720
export const DEFAULT_QUALITY = 0.7

export type ImageValidationResult =
  | { ok: true }
  | { ok: false; reason: string }

export function validateImage(file: File): ImageValidationResult {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) {
    return { ok: false, reason: 'JPG, PNG, WebP 형식만 업로드 가능해요' }
  }
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, reason: '파일 크기는 20MB 이하여야 해요' }
  }
  return { ok: true }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('이미지를 불러올 수 없어요'))
    img.src = src
  })
}

/**
 * 이미지를 최대 MAX_DIMENSION(1080px) 이내로 리사이즈하고 WebP로 압축해
 * data URL을 반환.
 */
export async function processImage(
  file: File,
  options: { maxDimension?: number; quality?: number } = {}
): Promise<string> {
  const { maxDimension = MAX_DIMENSION, quality = DEFAULT_QUALITY } = options

  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)

    const { width: srcW, height: srcH } = img
    let targetW = srcW
    let targetH = srcH

    if (srcW > maxDimension || srcH > maxDimension) {
      if (srcW >= srcH) {
        targetW = maxDimension
        targetH = Math.round((srcH * maxDimension) / srcW)
      } else {
        targetH = maxDimension
        targetW = Math.round((srcW * maxDimension) / srcH)
      }
    }

    const canvas = document.createElement('canvas')
    canvas.width = targetW
    canvas.height = targetH
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 컨텍스트를 만들 수 없어요')

    ctx.drawImage(img, 0, 0, targetW, targetH)

    return canvas.toDataURL('image/webp', quality)
  } finally {
    URL.revokeObjectURL(url)
  }
}
