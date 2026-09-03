import type {
  InvitationData,
  ParentInfo,
  PersonInfo,
} from '@/types/invitation'

/**
 * 편집 중 미리보기에서 빈 필드를 예시 값으로 채워서 청첩장이 비어보이지 않게 한다.
 * 실제 저장/공개 데이터는 건드리지 않고, 편집기 미리보기 렌더링 직전에만 적용.
 */
export function withDisplayDefaults(data: InvitationData): InvitationData {
  const c = data.couple
  return {
    ...data,
    mainText: data.mainText || '우리 결혼합니다',
    introText:
      data.introText ||
      '두 사람이 하나가 되는 소중한 날\n귀한 걸음으로 축복해 주세요',
    greetingText:
      data.greetingText ||
      '서로 다른 길을 걸어온 저희 두 사람이\n이제 한 길을 걷고자 합니다.\n\n귀한 걸음 하시어\n따뜻한 축복으로 새로운 시작을 지켜봐 주세요.',
    ogTitle: data.ogTitle || '결혼합니다',
    ogDescription: data.ogDescription || '초대합니다',
    couple: {
      groom: fillPerson(c.groom, { lastName: '김', firstName: '민준', contact: '010-1234-5678' }),
      groomFather: fillParent(c.groomFather, { lastName: '김', firstName: '상철' }),
      groomMother: fillParent(c.groomMother, { lastName: '이', firstName: '영희' }),
      bride: fillPerson(c.bride, { lastName: '이', firstName: '서연', contact: '010-8765-4321' }),
      brideFather: fillParent(c.brideFather, { lastName: '이', firstName: '대호' }),
      brideMother: fillParent(c.brideMother, { lastName: '박', firstName: '미경' }),
    },
    ceremony: {
      ...data.ceremony,
      date: data.ceremony.date || '2027-05-15',
      time: data.ceremony.time || '14:00',
      venueName: data.ceremony.venueName || '그랜드 웨딩홀',
      venueAddress: data.ceremony.venueAddress || '서울시 강남구 테헤란로 123',
      venueHall: data.ceremony.venueHall || '2층 로즈홀',
    },
  }
}

function fillPerson(
  p: PersonInfo,
  fb: { lastName: string; firstName: string; contact: string }
): PersonInfo {
  return {
    lastName: p.lastName || fb.lastName,
    firstName: p.firstName || fb.firstName,
    contact: p.contact || fb.contact,
  }
}

function fillParent(
  p: ParentInfo,
  fb: { lastName: string; firstName: string }
): ParentInfo {
  return {
    ...p,
    lastName: p.lastName || fb.lastName,
    firstName: p.firstName || fb.firstName,
  }
}
