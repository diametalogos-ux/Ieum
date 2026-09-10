import { NextResponse } from 'next/server'
import {
  getInvitationBySlug,
  getInvitationBySlugAdmin,
} from '@/lib/invitations/server'
import {
  getWreathOrderByToken,
  markWreathOrderCallbackHit,
} from '@/lib/wreath-orders/server'
import { buildDeliveryPayload } from '@/lib/wreath'
import { sampleInvitation } from '@/lib/mock/sample-invitation'
import type { StoredInvitation } from '@/lib/invitations/types'
import type { WreathOrder } from '@/lib/wreath-orders/types'

/**
 * 꽃비(flowerbiz) 배달 관련 정보 콜백.
 * 두 진입 경로 지원:
 *  1) ?invite=<slug>  — 청첩장에서 화환 주문 (예식장/신랑신부 → 배송지/수신자)
 *  2) ?token=<token>  — 독립 화환 주문 (/wreath/order 폼에서 저장된 정보)
 */
async function handle(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get('invite')
  const token = url.searchParams.get('token')

  if (token) {
    return handleWreathToken(request, url, token)
  }
  if (slug) {
    return handleInviteSlug(request, url, slug)
  }
  return NextResponse.json(
    { error: 'invite or token param required' },
    { status: 400 }
  )
}

async function handleInviteSlug(request: Request, url: URL, slug: string) {
  if (slug === 'sample') {
    return respondInvite(request, url, slug, { data: sampleInvitation })
  }

  let stored: StoredInvitation | Pick<StoredInvitation, 'data'> | null = null
  try {
    stored = await getInvitationBySlugAdmin(slug)
  } catch (err) {
    console.warn(
      '[wreath/delivery-info] admin client unavailable, falling back to anon. Cause:',
      err instanceof Error ? err.message : err
    )
    stored = await getInvitationBySlug(slug)
  }

  if (!stored) {
    return NextResponse.json(
      { error: 'invitation not found' },
      { status: 404 }
    )
  }
  return respondInvite(request, url, slug, stored)
}

function respondInvite(
  request: Request,
  url: URL,
  slug: string,
  stored: Pick<StoredInvitation, 'data'>
) {
  const inviteUrl = `${resolveOrigin(request, url)}/wedding/invite/${slug}`
  const payload = buildDeliveryPayload(stored.data, inviteUrl)
  return NextResponse.json(payload)
}

async function handleWreathToken(request: Request, url: URL, token: string) {
  let order: WreathOrder | null
  try {
    order = await getWreathOrderByToken(token)
  } catch (err) {
    console.error('[wreath/delivery-info] token lookup failed:', err)
    return NextResponse.json({ error: 'lookup failed' }, { status: 500 })
  }
  if (!order) {
    return NextResponse.json({ error: 'order not found' }, { status: 404 })
  }

  // 콜백 도달 기록 (실패해도 응답에는 영향 없게)
  markWreathOrderCallbackHit(token).catch((err) =>
    console.warn('[wreath/delivery-info] status update failed:', err)
  )

  return NextResponse.json({
    success: true,
    zipcode: order.zipcode ?? '',
    address: order.address,
    address_detail: order.addressDetail ?? '',
    delivery_datetime: formatFlowerbizDatetime(order.deliveryDatetime),
    receiver: [
      {
        name: order.receiverName,
        relationship: order.receiverRelationship,
        tel: order.receiverTel || '010-0000-0000',
      },
    ],
    ribbon_name: order.ribbonName ?? '',
    ribbon_message: order.ribbonMessage ?? '',
    url: `${resolveOrigin(request, url)}/wreath`,
  })
}

function resolveOrigin(request: Request, url: URL): string {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const host = forwardedHost ?? request.headers.get('host') ?? url.host
  const proto = forwardedProto ?? url.protocol.replace(':', '')
  return `${proto}://${host}`
}

/** ISO → yyyy-mm-dd hh:mm:ss (꽃비 포맷) */
function formatFlowerbizDatetime(iso: string): string {
  const dt = new Date(iso)
  if (Number.isNaN(dt.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
    dt.getDate()
  )} ${pad(dt.getHours())}:${pad(dt.getMinutes())}:00`
}

export const GET = handle
export const POST = handle
