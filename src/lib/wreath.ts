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
  tel: string
}

/** 연락처 미입력 시 폴백. 경쟁사(areum) 관찰: 010-0000-0000 사용 */
const PLACEHOLDER_TEL = '010-0000-0000'

/** 전화번호를 010-XXXX-XXXX 형식으로 정규화. 형식 이상하면 원문 그대로 반환. */
function normalizeTel(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('010')) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return raw
}

/**
 * 커플 정보에서 꽃비 receiver[] 배열 생성.
 * 6명(신랑/신부 + 양가 부모) 중:
 * - 이름이 있는 사람만 포함
 * - 부모의 경우 visible=true & deceased=false
 * - 연락처 미입력 시 placeholder(010-0000-0000) 사용 (꽃비가 tel 필수 요구)
 */
export function buildReceivers(data: InvitationData): WreathReceiver[] {
  const c = data.couple
  const list: WreathReceiver[] = []

  const push = (
    relationship: string,
    lastName: string,
    firstName: string,
    contact: string
  ) => {
    if (!firstName) return
    list.push({
      relationship,
      name: `${lastName}${firstName}`,
      tel: contact ? normalizeTel(contact) : PLACEHOLDER_TEL,
    })
  }

  push('신랑', c.groom.lastName, c.groom.firstName, c.groom.contact)
  if (c.groomFather.visible && !c.groomFather.deceased) {
    push(
      '신랑 아버님',
      c.groomFather.lastName,
      c.groomFather.firstName,
      c.groomFather.contact
    )
  }
  if (c.groomMother.visible && !c.groomMother.deceased) {
    push(
      '신랑 어머님',
      c.groomMother.lastName,
      c.groomMother.firstName,
      c.groomMother.contact
    )
  }
  push('신부', c.bride.lastName, c.bride.firstName, c.bride.contact)
  if (c.brideFather.visible && !c.brideFather.deceased) {
    push(
      '신부 아버님',
      c.brideFather.lastName,
      c.brideFather.firstName,
      c.brideFather.contact
    )
  }
  if (c.brideMother.visible && !c.brideMother.deceased) {
    push(
      '신부 어머님',
      c.brideMother.lastName,
      c.brideMother.firstName,
      c.brideMother.contact
    )
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

/**
 * 꽃비 delivery_url 콜백에 반환할 JSON payload.
 * 필드 순서와 success:true 필드는 경쟁사(areum) 응답 형식을 참고 —
 * 꽃비가 success 필드로 콜백 성공 여부를 판단하는 것으로 보임.
 */
export function buildDeliveryPayload(
  data: InvitationData,
  inviteUrl: string
) {
  const c = data.ceremony
  return {
    success: true,
    zipcode: c.venueZipcode || '',
    address: c.venueAddress || '',
    address_detail: [c.venueName, c.venueHall].filter(Boolean).join(' '),
    delivery_datetime: computeDeliveryDatetime(c) ?? '',
    receiver: buildReceivers(data),
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
