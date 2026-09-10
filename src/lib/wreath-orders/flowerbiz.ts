const FLOWERBIZ_SHOP_URL =
  process.env.NEXT_PUBLIC_FLOWERBIZ_SHOP_URL ?? 'https://shop5.flowerbiz.co.kr'
const FLOWERBIZ_AGENCY_ID =
  process.env.NEXT_PUBLIC_FLOWERBIZ_AGENCY_ID ?? 'dia3346'

/**
 * 특정 카테고리 상품 리스트 페이지로 진입하는 꽃비 상점 URL.
 *
 * 사용 파라미터 (문서: 상품 분류별 상품 정보 API):
 *  - agencyid: 꽃비 비즈니스 아이디
 *  - delivery_url: 결제 시 우리 서버 콜백
 *  - hide_product_category: 상단 카테고리 탭 숨김 (해당 카테고리만 보이게)
 *  - hide_title: 카테고리명 노출 숨김 (우리 사이트에서 이미 선택한 상태라 중복 제거)
 *
 * ⚠️ categoryId는 반드시 실제 agency에 활성화된 id여야 함
 * (문서 예시 id 9/557은 잘못됨, 실제는 61/62 — WREATH_CATEGORIES 참고).
 */
export function buildFlowerbizCategoryUrl(
  categoryId: number,
  siteOrigin: string,
  token: string
): string {
  const deliveryUrl = `${siteOrigin}/api/wreath/delivery-info?token=${encodeURIComponent(
    token
  )}`
  const params = new URLSearchParams({
    agencyid: FLOWERBIZ_AGENCY_ID,
    delivery_url: deliveryUrl,
    hide_product_category: 'true',
  })
  return `${FLOWERBIZ_SHOP_URL}/gb/products/product-category/${categoryId}?${params.toString()}`
}
