import type { InvitationData } from '@/types/invitation'

export const sampleInvitation: InvitationData = {
  id: 'sample-01',
  userId: 'user-01',
  slug: 'sample',
  title: '민준 ♥ 서연 청첩장',

  theme: 'romantic',
  primaryColor: '#c9748a',
  fontType: 'serif',
  fontSize: 'md',

  mainPhotoUrl: null,
  mainText: '우리 결혼합니다',
  effect: 'none',
  particle: 'cherry',
  introEffect: 'fade',
  introText: '두 사람이 하나가 되는 소중한 날\n귀한 걸음으로 축복해 주세요',

  ogTitle: '민준 ♥ 서연 결혼합니다',
  ogDescription: '2026년 5월 18일 토요일 오후 2시',
  ogImageUrl: null,

  couple: {
    groomName: '김민준',
    groomContact: '010-1234-5678',
    groomFatherName: '김상철',
    groomMotherName: '이영희',
    brideeName: '이서연',
    brideContact: '010-8765-4321',
    brideFatherName: '이대호',
    brideMotherName: '박미경',
  },

  ceremony: {
    date: '2026-05-18',
    time: '14:00',
    venueName: '그랜드 웨딩홀',
    venueAddress: '서울시 강남구 테헤란로 123',
    venueHall: '2층 로즈홀',
    showDate: true,
    showTime: true,
    showVenue: true,
  },

  features: {
    greeting: true,
    dday: true,
    countdown: true,
    gallery: true,
    transport: true,
    notice: true,
    account: true,
    guestbook: true,
    rsvp: true,
    photodrop: false,
    bgm: false,
    flowerOrder: true,
  },

  greetingText:
    '서로 다른 길을 걸어온 저희 두 사람이\n이제 한 길을 걷고자 합니다.\n\n귀한 걸음 하시어\n따뜻한 축복으로 새로운 시작을 지켜봐 주세요.',
  galleryLayout: 'grid',
  gallery: [
    { id: 'g1', url: '', order: 1 },
    { id: 'g2', url: '', order: 2 },
    { id: 'g3', url: '', order: 3 },
    { id: 'g4', url: '', order: 4 },
    { id: 'g5', url: '', order: 5 },
    { id: 'g6', url: '', order: 6 },
    { id: 'g7', url: '', order: 7 },
    { id: 'g8', url: '', order: 8 },
    { id: 'g9', url: '', order: 9 },
  ],
  transport: [
    { type: 'subway', description: '2호선 강남역 3번 출구에서 도보 5분' },
    { type: 'bus', description: '간선버스 146, 341, 360 강남역 하차' },
    { type: 'car', description: '지하 주차장 2시간 무료 (예식장 이용 시)' },
  ],
  notices: [
    { id: 'n1', content: '주차 공간이 협소하니 대중교통 이용을 부탁드립니다.' },
    { id: 'n2', content: '화환은 정중히 사양합니다.' },
  ],
  accounts: [
    { id: 'a1', side: 'groom', bank: '국민은행', accountNumber: '123-456-789012', accountHolder: '김민준' },
    { id: 'a2', side: 'groom', bank: '농협', accountNumber: '302-1234-5678-01', accountHolder: '김상철' },
    { id: 'a3', side: 'bride', bank: '신한은행', accountNumber: '110-234-567890', accountHolder: '이서연' },
    { id: 'a4', side: 'bride', bank: '우리은행', accountNumber: '1002-345-678901', accountHolder: '이대호' },
  ],
  bgmUrl: null,

  createdAt: '2026-04-01T00:00:00Z',
  updatedAt: '2026-04-15T00:00:00Z',
}

export const sampleGuestbook = [
  { id: 'gb1', name: '박지훈', message: '두 분의 앞날을 진심으로 축하합니다! 행복하세요~', createdAt: '2026-04-20T10:30:00Z' },
  { id: 'gb2', name: '최수현', message: '서연아 결혼 축하해!! 예쁘게 잘 살자❤️', createdAt: '2026-04-21T15:20:00Z' },
  { id: 'gb3', name: '정민호', message: '민준이 축하한다! 꼭 참석할게', createdAt: '2026-04-22T09:15:00Z' },
]
