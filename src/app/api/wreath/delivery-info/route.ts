import { NextResponse } from 'next/server'
import {
  getInvitationBySlug,
  getInvitationBySlugAdmin,
} from '@/lib/invitations/server'
import { buildDeliveryPayload } from '@/lib/wreath'
import { sampleInvitation } from '@/lib/mock/sample-invitation'
import type { StoredInvitation } from '@/lib/invitations/types'

/**
 * 꽃비(flowerbiz)가 화환 주문 폼 렌더 시 POST 로 호출하는 콜백.
 * 우리는 청첩장 slug 로 invitation 을 찾아 배송지·수령인 정보를 JSON 으로 반환.
 * GET 도 허용 (개발 단계에서 브라우저로 페이로드 확인용).
 */
async function handle(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get('invite')

  if (!slug) {
    return NextResponse.json(
      { error: 'invite param required' },
      { status: 400 }
    )
  }

  // 데모용 sample 슬러그는 mock 반환.
  if (slug === 'sample') {
    return respond(request, url, slug, { data: sampleInvitation })
  }

  // 1차: admin(service role) 로 조회. draft/published 무관하게 접근 가능.
  let stored: StoredInvitation | Pick<StoredInvitation, 'data'> | null = null
  try {
    stored = await getInvitationBySlugAdmin(slug)
  } catch (err) {
    console.warn(
      '[wreath/delivery-info] admin client unavailable, falling back to anon server client. Cause:',
      err instanceof Error ? err.message : err
    )
    // 2차 fallback: 일반 서버 클라이언트. published 상태만 조회됨 (RLS)
    stored = await getInvitationBySlug(slug)
  }

  if (!stored) {
    return NextResponse.json(
      { error: 'invitation not found' },
      { status: 404 }
    )
  }

  return respond(request, url, slug, stored)
}

function respond(
  request: Request,
  url: URL,
  slug: string,
  stored: Pick<StoredInvitation, 'data'>
) {
  // 실제 브라우저가 접속한 host 를 기준으로 invite URL 생성 (0.0.0.0 이슈 회피)
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const host = forwardedHost ?? request.headers.get('host') ?? url.host
  const proto = forwardedProto ?? url.protocol.replace(':', '')
  const inviteUrl = `${proto}://${host}/invite/${slug}`

  const payload = buildDeliveryPayload(stored.data, inviteUrl)
  return NextResponse.json(payload)
}

export const GET = handle
export const POST = handle
