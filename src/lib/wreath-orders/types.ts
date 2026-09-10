/**
 * 꽃비 상품 분류 id.
 * 문서: 상품 분류 정보 API 결과 예시 기준.
 * 쌀/원형화환은 문서에 id가 명시되지 않아 추후 API 호출로 확인 필요.
 */
export const WREATH_CATEGORIES = {
  congrats: { id: 9, label: '축하화환', code: '10F94A' },
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
