/**
 * 꽃비 상품 분류 id.
 * ⚠️ 문서 예시(id=9, 557)는 데모용이고 실제 agency 별 id가 다름.
 * agency dia3346 실제 id (2026-09 확인, /api/v1/gb/product-categories 응답):
 *   - 축하화환: 61 (code 10F94A)
 *   - 근조화환: 62 (code 10F886)
 *   - 쌀화환: 63 (code 10FF81)
 *   - 축하쌀화환: 95 (code 10F6BF)
 *   - 근조쌀화환: 96 (code 10FDCC)
 */
export const WREATH_CATEGORIES = {
  congrats: { id: 61, label: '축하화환', code: '10F94A' },
  condolence: { id: 62, label: '근조화환', code: '10F886' },
} as const

export type WreathCategoryKey = keyof typeof WREATH_CATEGORIES

export type WreathOrderInput = {
  category: WreathCategoryKey
  receiverName: string
  receiverRelationship: string
  receiverTel?: string
  zipcode?: string
  address: string
  addressDetail?: string
  deliveryDatetime: string // ISO 8601
  ribbonName?: string
  ribbonMessage?: string
}

export type WreathOrder = {
  id: string
  token: string
  categoryId: number
  categoryLabel: string
  receiverName: string
  receiverRelationship: string
  receiverTel: string | null
  zipcode: string | null
  address: string
  addressDetail: string | null
  deliveryDatetime: string
  ribbonName: string | null
  ribbonMessage: string | null
  status: 'pending' | 'redirected' | 'callback_hit'
  callbackHitAt: string | null
  createdAt: string
}
