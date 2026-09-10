import { NextResponse } from 'next/server'
import { createWreathOrder } from '@/lib/wreath-orders/server'
import { WREATH_CATEGORIES } from '@/lib/wreath-orders/types'

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const category = String(body.category ?? '')
  if (!(category in WREATH_CATEGORIES)) {
    return NextResponse.json(
      { error: 'invalid category' },
      { status: 400 }
    )
  }

  const receiverName = String(body.receiverName ?? '').trim()
  const receiverRelationship = String(body.receiverRelationship ?? '').trim()
  const address = String(body.address ?? '').trim()
  const deliveryDatetime = String(body.deliveryDatetime ?? '').trim()

  if (!receiverName) return field('receiverName')
  if (!receiverRelationship) return field('receiverRelationship')
  if (!address) return field('address')
  if (!deliveryDatetime) return field('deliveryDatetime')

  // 배송일시가 미래인지 최소 검증
  const dt = new Date(deliveryDatetime)
  if (Number.isNaN(dt.getTime())) {
    return NextResponse.json(
      { error: 'invalid deliveryDatetime' },
      { status: 400 }
    )
  }

  try {
    const order = await createWreathOrder({
      category: category as keyof typeof WREATH_CATEGORIES,
      receiverName,
      receiverRelationship,
      receiverTel: body.receiverTel ? String(body.receiverTel) : undefined,
      zipcode: body.zipcode ? String(body.zipcode) : undefined,
      address,
      addressDetail: body.addressDetail
        ? String(body.addressDetail)
        : undefined,
      deliveryDatetime,
      ribbonName: body.ribbonName ? String(body.ribbonName) : undefined,
      ribbonMessage: body.ribbonMessage
        ? String(body.ribbonMessage)
        : undefined,
    })

    return NextResponse.json({ token: order.token, categoryId: order.categoryId })
  } catch (err) {
    console.error('[wreath/orders] create failed:', err)
    return NextResponse.json({ error: 'save failed' }, { status: 500 })
  }
}

function field(name: string) {
  return NextResponse.json(
    { error: `${name} required` },
    { status: 400 }
  )
}
