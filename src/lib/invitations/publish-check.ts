import type { InvitationData } from '@/types/invitation'

export type MissingItem = { key: string; label: string }

export type PublishReadiness = {
  ready: boolean
  missing: MissingItem[]
}

/**
 * 공개(published) 전환 전에 필수 정보가 채워졌는지 검사.
 * 하객이 청첩장 보고 결혼 정보를 알아볼 수 있는 최소 필드만 확인.
 */
export function checkPublishReadiness(
  data: InvitationData
): PublishReadiness {
  const missing: MissingItem[] = []

  if (!data.couple.groom.firstName) {
    missing.push({ key: 'groom', label: '신랑 이름' })
  }
  if (!data.couple.bride.firstName) {
    missing.push({ key: 'bride', label: '신부 이름' })
  }
  if (!data.ceremony.date) {
    missing.push({ key: 'date', label: '예식일' })
  }
  if (!data.ceremony.time) {
    missing.push({ key: 'time', label: '예식 시간' })
  }
  if (!data.ceremony.venueName) {
    missing.push({ key: 'venueName', label: '예식장 이름' })
  }
  if (!data.ceremony.venueAddress) {
    missing.push({ key: 'venueAddress', label: '예식장 주소' })
  }
  if (!data.ceremony.venueHall) {
    missing.push({ key: 'venueHall', label: '상세 주소 (홀·층)' })
  }
  if (!data.mainPhotoUrl) {
    missing.push({ key: 'mainPhotoUrl', label: '메인 사진' })
  }

  return { ready: missing.length === 0, missing }
}
