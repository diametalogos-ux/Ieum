import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import {
  getWreathOrderByToken,
  markWreathOrderRedirected,
} from '@/lib/wreath-orders/server'
import { buildFlowerbizCategoryUrl } from '@/lib/wreath-orders/flowerbiz'

type Props = { searchParams: Promise<{ token?: string }> }

export default async function WreathRedirectPage({ searchParams }: Props) {
  const { token } = await searchParams
  if (!token) redirect('/wreath')

  const order = await getWreathOrderByToken(token)
  if (!order) redirect('/wreath')

  // 요청 host 기준으로 origin 계산 (0.0.0.0/proxy 대응)
  const h = await headers()
  const forwardedHost = h.get('x-forwarded-host')
  const forwardedProto = h.get('x-forwarded-proto')
  const host = forwardedHost ?? h.get('host') ?? 'ieum-log.shop'
  const proto = forwardedProto ?? 'https'
  const origin = `${proto}://${host}`

  const shopUrl = buildFlowerbizCategoryUrl(
    order.categoryId,
    origin,
    order.token
  )

  // status 업데이트는 백그라운드 (실패해도 리다이렉트에는 영향 없게)
  markWreathOrderRedirected(order.token).catch((err) =>
    console.warn('[wreath/redirect] status update failed:', err)
  )

  redirect(shopUrl)
}
