import { createAdminClient } from '@/lib/supabase/admin'
import { WREATH_CATEGORIES, type WreathOrder, type WreathOrderInput } from './types'

/** URL-safe 랜덤 토큰 (24자, base64url) */
function generateToken(): string {
  const bytes = new Uint8Array(18)
  crypto.getRandomValues(bytes)
  let base = Buffer.from(bytes).toString('base64')
  base = base.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
  return base
}

type DbRow = {
  id: string
  token: string
  category_id: number
  category_label: string
  receiver_name: string
  receiver_relationship: string
  receiver_tel: string | null
  zipcode: string | null
  address: string
  address_detail: string | null
  delivery_datetime: string
  ribbon_name: string | null
  ribbon_message: string | null
  orderer_name: string | null
  orderer_phone: string | null
  status: 'pending' | 'redirected' | 'callback_hit'
  callback_hit_at: string | null
  created_at: string
}

function mapRow(row: DbRow): WreathOrder {
  return {
    id: row.id,
    token: row.token,
    categoryId: row.category_id,
    categoryLabel: row.category_label,
    receiverName: row.receiver_name,
    receiverRelationship: row.receiver_relationship,
    receiverTel: row.receiver_tel,
    zipcode: row.zipcode,
    address: row.address,
    addressDetail: row.address_detail,
    deliveryDatetime: row.delivery_datetime,
    ribbonName: row.ribbon_name,
    ribbonMessage: row.ribbon_message,
    ordererName: row.orderer_name,
    ordererPhone: row.orderer_phone,
    status: row.status,
    callbackHitAt: row.callback_hit_at,
    createdAt: row.created_at,
  }
}

export async function createWreathOrder(
  input: WreathOrderInput
): Promise<WreathOrder> {
  const category = WREATH_CATEGORIES[input.category]
  if (!category) throw new Error(`unknown category: ${input.category}`)

  const supabase = createAdminClient()
  const token = generateToken()

  const { data, error } = await supabase
    .from('wreath_orders')
    .insert({
      token,
      category_id: category.id,
      category_label: category.label,
      receiver_name: input.receiverName.trim(),
      receiver_relationship: input.receiverRelationship.trim(),
      receiver_tel: input.receiverTel?.trim() || null,
      zipcode: input.zipcode?.trim() || null,
      address: input.address.trim(),
      address_detail: input.addressDetail?.trim() || null,
      delivery_datetime: input.deliveryDatetime,
      ribbon_name: input.ribbonName?.trim() || null,
      ribbon_message: input.ribbonMessage?.trim() || null,
      orderer_name: input.ordererName.trim(),
      orderer_phone: input.ordererPhone.trim(),
    })
    .select()
    .single()

  if (error) throw error
  return mapRow(data as DbRow)
}

export async function getWreathOrderByToken(
  token: string
): Promise<WreathOrder | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('wreath_orders')
    .select('*')
    .eq('token', token)
    .maybeSingle()
  if (error) throw error
  return data ? mapRow(data as DbRow) : null
}

export async function markWreathOrderRedirected(token: string): Promise<void> {
  const supabase = createAdminClient()
  // 이미 callback_hit 인 경우는 덮어쓰지 않음
  await supabase
    .from('wreath_orders')
    .update({ status: 'redirected' })
    .eq('token', token)
    .eq('status', 'pending')
}

export async function markWreathOrderCallbackHit(token: string): Promise<void> {
  const supabase = createAdminClient()
  await supabase
    .from('wreath_orders')
    .update({
      status: 'callback_hit',
      callback_hit_at: new Date().toISOString(),
    })
    .eq('token', token)
}
