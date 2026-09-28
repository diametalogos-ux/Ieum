import type { InvitationData } from '@/types/invitation'

/** Noir 테마 광고 랜딩용 샘플 청첩장 — 사진 한 장만 있는 정갈한 구성 */
export const sampleNoirInvitation: InvitationData = {
  id: 'sample-noir',
  userId: 'sample',
  slug: 'sample-noir',
  title: '도윤 · 서아 청첩장',

  theme: 'minimal',
  primaryColor: '#1a1a1a',
  fontType: 'serif',
  fontSize: 'md',

  mainPhotoUrl: '/images/main4-noir.png',
  mainText: '우리 결혼합니다',
  effect: 'none',
  particle: 'none',
  introEffect: 'fade',
  introText: '두 사람이 하나가 되는 소중한 날\n귀한 걸음으로 축복해 주세요',

  ogTitle: '도윤 · 서아 결혼합니다',
  ogDescription: '2027년 5월 15일 토요일 오후 2시',
  ogImageUrl: null,

  mainPhotoGrayscale: true,
  galleryGrayscale: true,

  couple: {
    groom: {
      lastName: '김',
      firstName: '도윤',
      contact: '010-1234-5678',
    },
    groomFather: {
      lastName: '김',
      firstName: '상철',
      contact: '010-2222-3333',
      deceased: false,
      visible: true,
    },
    groomMother: {
      lastName: '이',
      firstName: '영희',
      contact: '010-3333-4444',
      deceased: false,
      visible: true,
    },
    bride: {
      lastName: '이',
      firstName: '서아',
      contact: '010-8765-4321',
    },
    brideFather: {
      lastName: '이',
      firstName: '대호',
      contact: '010-4444-5555',
      deceased: false,
      visible: true,
    },
    brideMother: {
      lastName: '박',
      firstName: '미경',
      contact: '010-5555-6666',
      deceased: false,
      visible: true,
    },
  },

  ceremony: {
    date: '2027-05-15',
    time: '14:00',
    venueName: '그랜드 웨딩홀',
    venueAddress: '서울시 강남구 테헤란로 123',
    venueZipcode: '06133',
    venueHall: '2층 로즈홀',
  },

  features: {
    greeting: true,
    dday: true,
    countdown: false,
    gallery: false,
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
  gallery: [],
  transport: [
    { id: 't1', type: 'subway', description: '2호선 강남역 3번 출구에서 도보 5분' },
    { id: 't2', type: 'bus', description: '간선버스 146, 341, 360 강남역 하차' },
    { id: 't3', type: 'car', description: '지하 주차장 2시간 무료 (예식장 이용 시)' },
  ],
  notices: [
    { id: 'n1', content: '주차 공간이 협소하니 대중교통 이용을 부탁드립니다.' },
    { id: 'n2', content: '화환은 정중히 사양합니다.' },
  ],
  accounts: [
    { id: 'a1', side: 'groom', bank: '국민은행', accountNumber: '123-456-789012', accountHolder: '김도윤' },
    { id: 'a2', side: 'bride', bank: '신한은행', accountNumber: '110-234-567890', accountHolder: '이서아' },
  ],
  bgmUrl: null,

  createdAt: '2027-01-01T00:00:00Z',
  updatedAt: '2027-01-01T00:00:00Z',
}
