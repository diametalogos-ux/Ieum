const FLOWERBIZ_SHOP_URL =
  process.env.NEXT_PUBLIC_FLOWERBIZ_SHOP_URL ?? 'https://shop5.flowerbiz.co.kr'
const FLOWERBIZ_AGENCY_ID =
  process.env.NEXT_PUBLIC_FLOWERBIZ_AGENCY_ID ?? 'dia3346'

/**
 * 특정 카테고리 페이지로 진입하는 꽃비 상점 URL.
 * delivery_url은 우리 서버의 콜백 (token 파라미터 포함).
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
