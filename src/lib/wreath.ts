import type { InvitationData } from '@/types/invitation'

const FLOWERBIZ_SHOP_URL =
  process.env.NEXT_PUBLIC_FLOWERBIZ_SHOP_URL ?? 'https://shop5.flowerbiz.co.kr'
const FLOWERBIZ_AGENCY_ID =
  process.env.NEXT_PUBLIC_FLOWERBIZ_AGENCY_ID ?? 'dia3346'

/** 예식 시작 몇 분 전을 배송 예정시간으로 잡을지 */
const DELIVERY_MINUTES_BEFORE = 30

export type WreathReceiver = {
  name: string
  relationship: string
  tel?: string
}

/** 커플 정보에서 꽃비 receiver[] 배열 생성 — visible=true, deceased=false, 이름 존재 조건 */
export function buildReceivers(data: InvitationData): WreathReceiver[] {
  const c = data.couple
  const list: WreathReceiver[] = []

  if (c.groom.firstName) {
    list.push({
      relationship: '신랑',
      name: `${c.groom.lastName}${c.groom.firstName}`,
      tel: c.groom.contact || undefined,
    })
  }
  if (c.groomFather.visible && !c.groomFather.deceased && c.groomFather.firstName) {
    list.push({
      relationship: '신랑 아버지',
      name: `${c.groomFather.lastName}${c.groomFather.firstName}`,
    })
  }
  if (c.groomMother.visible && !c.groomMother.deceased && c.groomMother.firstName) {
    list.push({
      relationship: '신랑 어머니',
      name: `${c.groomMother.lastName}${c.groomMother.firstName}`,
    })
  }
  if (c.bride.firstName) {
    list.push({
      relationship: '신부',
      name: `${c.bride.lastName}${c.bride.firstName}`,
      tel: c.bride.contact || undefined,
    })
  }
  if (c.brideFather.visible && !c.brideFather.deceased && c.brideFather.firstName) {
    list.push({
      relationship: '신부 아버지',
      name: `${c.brideFather.lastName}${c.brideFather.firstName}`,
    })
  }
  if (c.brideMother.visible && !c.brideMother.deceased && c.brideMother.firstName) {
    list.push({
      relationship: '신부 어머니',
      name: `${c.brideMother.lastName}${c.brideMother.firstName}`,
    })
  }

  return list
}

/** 예식 시작 N분 전 = 배송 예정시간. yyyy-mm-dd hh:mm:00 포맷 */
export function computeDeliveryDatetime(
  ceremony: InvitationData['ceremony']
): string | null {
  if (!ceremony.date || !ceremony.time) return null
  const [y, m, d] = ceremony.date.split('-').map(Number)
  const [hh, mm] = ceremony.time.split(':').map(Number)
  if (!y || !m || !d || Number.isNaN(hh) || Number.isNaN(mm)) return null

  const dt = new Date(y, m - 1, d, hh, mm - DELIVERY_MINUTES_BEFORE)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
    dt.getDate()
  )} ${pad(dt.getHours())}:${pad(dt.getMinutes())}:00`
}

/** 꽃비 delivery_url 콜백에 반환할 JSON payload */
export function buildDeliveryPayload(
  data: InvitationData,
  inviteUrl: string
) {
  const c = data.ceremony
  return {
    receiver: buildReceivers(data),
    address: c.venueAddress || '',
    address_detail: [c.venueName, c.venueHall].filter(Boolean).join(' '),
    delivery_datetime: computeDeliveryDatetime(c) ?? '',
    url: inviteUrl,
    // ribbon_name / ribbon_message 는 하객이 꽃비 폼에서 입력
  }
}

/**
 * 화환 주문을 위한 꽃비 상점 URL 생성.
 * 하객이 이 URL로 이동하면 꽃비 서버가 우리 delivery_url 에 POST해서 배송지·수령인을 채워옴.
 */
export function buildShopUrl(inviteSlug: string, siteOrigin: string): string {
  const deliveryUrl = `${siteOrigin}/api/wreath/delivery-info?invite=${encodeURIComponent(
    inviteSlug
  )}`
  const params = new URLSearchParams({
    agencyid: FLOWERBIZ_AGENCY_ID,
    delivery_url: deliveryUrl,
  })
  return `${FLOWERBIZ_SHOP_URL}/gb/home?${params.toString()}`
}

/** 화환 주문에 필요한 최소 정보가 갖춰져 있는지 */
export function isReadyForWreathOrder(data: InvitationData): {
  ok: boolean
  missing: string[]
} {
  const missing: string[] = []
  if (buildReceivers(data).length === 0) missing.push('신랑·신부 이름')
  if (!data.ceremony.venueAddress) missing.push('예식장 주소')
  if (!data.ceremony.date || !data.ceremony.time) missing.push('예식 일시')
  return { ok: missing.length === 0, missing }
}
