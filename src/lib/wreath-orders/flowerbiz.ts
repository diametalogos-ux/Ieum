const FLOWERBIZ_SHOP_URL =
  process.env.NEXT_PUBLIC_FLOWERBIZ_SHOP_URL ?? 'https://shop5.flowerbiz.co.kr'
const FLOWERBIZ_AGENCY_ID =
  process.env.NEXT_PUBLIC_FLOWERBIZ_AGENCY_ID ?? 'dia3346'

/**
 * 꽃비 상점 진입 URL — 메인(/gb/home)으로 진입 후 유저가 카테고리 선택.
 * 문서 스펙 상 카테고리 direct URL(/gb/products/product-category/{id})은
 * agency 별 활성 카테고리 id가 달라 404 위험 있음 → 안전한 /gb/home 사용.
 * 꽃비 서버는 세션 쿠키(BIZ_SHOP5_*)로 agency·delivery_url 컨텍스트 유지.
 *
 * @param _categoryId — 미사용 (미래에 direct URL 활성화될 경우 대비해 시그니처 유지)
 */
export function buildFlowerbizCategoryUrl(
  _categoryId: number,
  siteOrigin: string,
  token: string
): string {
  const deliveryUrl = `${siteOrigin}/api/wreath/delivery-info?token=${encodeURIComponent(
    token
  )}`
  const params = new URLSearchParams({
    agencyid: FLOWERBIZ_AGENCY_ID,
    delivery_url: deliveryUrl,
  })
  return `${FLOWERBIZ_SHOP_URL}/gb/home?${params.toString()}`
}
