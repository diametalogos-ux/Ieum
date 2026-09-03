import type { InvitationData } from '@/types/invitation'

/** 새 청첩장 만들 때 사용하는 기본값 */
export const emptyInvitation: InvitationData = {
  id: 'new',
  userId: 'user-01',
  slug: '',
  title: '새 청첩장',

  theme: 'romantic',
  primaryColor: '#c9748a',
  fontType: 'serif',
  fontSize: 'md',

  mainPhotoUrl: null,
  mainText: '우리 결혼합니다',
  effect: 'none',
  particle: 'none',
  introEffect: 'fade',
  introText: '',

  ogTitle: '',
  ogDescription: '',
  ogImageUrl: null,

  couple: {
    groom: { lastName: '', firstName: '', contact: '' },
    groomFather: { lastName: '', firstName: '', contact: '', deceased: false, visible: true },
    groomMother: { lastName: '', firstName: '', contact: '', deceased: false, visible: true },
    bride: { lastName: '', firstName: '', contact: '' },
    brideFather: { lastName: '', firstName: '', contact: '', deceased: false, visible: true },
    brideMother: { lastName: '', firstName: '', contact: '', deceased: false, visible: true },
  },

  ceremony: {
    date: '',
    time: '14:00',
    venueName: '',
    venueAddress: '',
    venueZipcode: '',
    venueHall: '',
  },

  features: {
    greeting: true,
    dday: false,
    countdown: true,
    gallery: true,
    transport: true,
    notice: false,
    account: true,
    guestbook: true,
    rsvp: true,
    photodrop: false,
    bgm: false,
    flowerOrder: false,
  },

  greetingText: '',
  galleryLayout: 'grid',
  gallery: [],
  transport: [],
  notices: [],
  accounts: [],
  bgmUrl: null,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
