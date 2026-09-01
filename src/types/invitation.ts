export type ThemeType = 'romantic' | 'modern' | 'garden' | 'vintage' | 'minimal' | 'luxury' | 'bohemian' | 'classic' | 'floral' | 'elegant'

export type EffectType = 'none' | 'fog' | 'wave'
export type ParticleType = 'none' | 'cherry' | 'snow' | 'confetti' | 'star'
export type IntroEffectType = 'none' | 'fade' | 'slide' | 'zoom'
export type GalleryLayoutType = 'slide' | 'grid'
export type FontType = 'nanum' | 'malgun' | 'gothic' | 'serif'

export interface CoupleInfo {
  groomName: string
  groomContact: string
  groomFatherName: string
  groomMotherName: string
  brideeName: string
  brideContact: string
  brideFatherName: string
  brideMotherName: string
}

export interface CeremonyInfo {
  date: string
  time: string
  venueName: string
  venueAddress: string
  venueHall: string
  showDate: boolean
  showTime: boolean
  showVenue: boolean
}

export interface GalleryItem {
  id: string
  url: string
  order: number
}

export interface TransportItem {
  type: 'car' | 'subway' | 'bus' | 'train' | 'etc'
  description: string
}

export interface NoticeItem {
  id: string
  content: string
}

export interface AccountItem {
  id: string
  side: 'groom' | 'bride'
  bank: string
  accountNumber: string
  accountHolder: string
}

export interface GuestbookItem {
  id: string
  name: string
  message: string
  createdAt: string
}

export interface RsvpItem {
  id: string
  name: string
  attendance: 'attend' | 'absent'
  headcount: number
  meal: 'yes' | 'no'
  message: string
  createdAt: string
}

export interface InvitationData {
  id: string
  userId: string
  slug: string
  title: string

  // 템플릿 설정
  theme: ThemeType
  primaryColor: string
  fontType: FontType
  fontSize: 'sm' | 'md' | 'lg'

  // 메인 구성
  mainPhotoUrl: string | null
  mainText: string
  effect: EffectType
  particle: ParticleType
  introEffect: IntroEffectType
  introText: string

  // OG / 공유
  ogTitle: string
  ogDescription: string
  ogImageUrl: string | null

  // 커플 정보
  couple: CoupleInfo

  // 예식 정보
  ceremony: CeremonyInfo

  // 부가기능 활성화 여부
  features: {
    greeting: boolean
    dday: boolean
    countdown: boolean
    gallery: boolean
    transport: boolean
    notice: boolean
    account: boolean
    guestbook: boolean
    rsvp: boolean
    photodrop: boolean
    bgm: boolean
    flowerOrder: boolean
  }

  // 부가기능 데이터
  greetingText: string
  galleryLayout: GalleryLayoutType
  gallery: GalleryItem[]
  transport: TransportItem[]
  notices: NoticeItem[]
  accounts: AccountItem[]
  bgmUrl: string | null

  createdAt: string
  updatedAt: string
}
