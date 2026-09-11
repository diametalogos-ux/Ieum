/**
 * 꽃비 상품 분류 id.
 * ⚠️ id는 agency + shop 인스턴스마다 다름. 문서 예시나 다른 shop의 id를 그대로 쓰면 안 됨.
 * agency dia3346 실제 id (2026-09-11 확인, shop4 /api/v1/gb/product-categories 응답):
 *   - 축하화환: 556 (code 10F94A)
 *   - 근조화환: 557 (code 10F886)
 *   - 쌀화환: 558 (code 10FF81)
 *   - 축하쌀화환: 590 (code 10F6BF)
 *   - 근조쌀화환: 591 (code 10FDCC)
 */
export const WREATH_CATEGORIES = {
  congrats: { id: 556, label: '축하화환', code: '10F94A' },
  condolence: { id: 557, label: '근조화환', code: '10F886' },
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
  ordererName: string
  ordererPhone: string
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
  ordererName: string | null
  ordererPhone: string | null
  status: 'pending' | 'redirected' | 'callback_hit'
  callbackHitAt: string | null
  createdAt: string
}
