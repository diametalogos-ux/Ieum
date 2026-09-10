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
  const receiverTel = String(body.receiverTel ?? '').trim()
  const address = String(body.address ?? '').trim()
  const deliveryDatetime = String(body.deliveryDatetime ?? '').trim()
  const ribbonName = String(body.ribbonName ?? '').trim()
  const ribbonMessage = String(body.ribbonMessage ?? '').trim()
  const ordererName = String(body.ordererName ?? '').trim()
  const ordererPhone = String(body.ordererPhone ?? '').trim()

  // 필수 필드
  if (!receiverName) return field('receiverName')
  if (!receiverRelationship) return field('receiverRelationship')
  if (!address) return field('address')
  if (!deliveryDatetime) return field('deliveryDatetime')
  if (!ribbonName) return field('ribbonName')
  if (!ribbonMessage) return field('ribbonMessage')
  if (!ordererName) return field('ordererName')
  if (!ordererPhone) return field('ordererPhone')

  // 서버 사이드 형식 재검증 (클라이언트 우회 방지)
  if (!/^[가-힣a-zA-Z\s·]{1,20}$/.test(receiverName)) {
    return NextResponse.json(
      { error: 'invalid receiverName format' },
      { status: 400 }
    )
  }
  if (!/^[가-힣a-zA-Z\s]{1,20}$/.test(receiverRelationship)) {
    return NextResponse.json(
      { error: 'invalid receiverRelationship format' },
      { status: 400 }
    )
  }
  if (receiverTel && !/^01[016789]-\d{3,4}-\d{4}$/.test(receiverTel)) {
    return NextResponse.json(
      { error: 'invalid receiverTel format' },
      { status: 400 }
    )
  }
  if (ribbonName.length > 30 || ribbonMessage.length > 30) {
    return NextResponse.json(
      { error: 'ribbon text too long (max 30)' },
      { status: 400 }
    )
  }
  if (!/^[가-힣a-zA-Z\s·]{1,20}$/.test(ordererName)) {
    return NextResponse.json(
      { error: 'invalid ordererName format' },
      { status: 400 }
    )
  }
  if (!/^01[016789]-\d{3,4}-\d{4}$/.test(ordererPhone)) {
    return NextResponse.json(
      { error: 'invalid ordererPhone format' },
      { status: 400 }
    )
  }

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
      ordererName,
      ordererPhone,
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
