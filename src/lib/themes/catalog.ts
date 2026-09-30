import type { InvitationData } from '@/types/invitation'
import type { PaletteKey } from '@/components/editor/EditorContext'
import { sampleInvitation } from '@/lib/mock/sample-invitation'
import { sampleNoirInvitation } from '@/lib/mock/sample-noir'

/**
 * 테마 단일 소스.
 * 새 테마 추가/삭제/공개 상태 변경은 여기 THEME_CATALOG에서만.
 * 랜딩(/wedding), 전체 목록(/wedding/themes), 샘플(/wedding/sample/[key]),
 * 에디터 초기값(createInvitation)이 모두 이 파일을 참조한다.
 */

export type ThemeCardVariant = 'cover' | 'noir'

export type ThemeEntry = {
  key: string
  name: string
  desc: string
  accent: string
  bg: string
  previewImage: string | null
  variant: ThemeCardVariant
  available: boolean
  palette: PaletteKey
  /** 광고 랜딩용 샘플 데이터. available 테마만 존재 */
  sample?: InvitationData
  /** "이 테마로 만들기" 클릭 시 에디터 초기값. available 테마만 존재 */
  preset?: Partial<InvitationData>
}

const emptyPerson = { lastName: '', firstName: '', contact: '' }
const emptyParent = {
  lastName: '',
  firstName: '',
  contact: '',
  deceased: false,
  visible: true,
}

const emptyUserData: Pick<
  InvitationData,
  'couple' | 'ceremony' | 'mainPhotoUrl' | 'ogImageUrl' | 'gallery' | 'accounts'
> = {
  couple: {
    groom: emptyPerson,
    bride: emptyPerson,
    groomFather: emptyParent,
    groomMother: emptyParent,
    brideFather: emptyParent,
    brideMother: emptyParent,
  },
  ceremony: {
    date: '',
    time: '14:00',
    venueName: '',
    venueAddress: '',
    venueZipcode: '',
    venueHall: '',
  },
  mainPhotoUrl: null,
  ogImageUrl: null,
  gallery: [],
  accounts: [],
}

export const THEME_CATALOG: ThemeEntry[] = [
  {
    key: 'photo-blush',
    name: 'Blush',
    desc: '사진이 첫인상, 은은한 분홍 무드',
    accent: '#d9748b',
    bg: 'linear-gradient(140deg,#fff0f4 0%,#fddde6 100%)',
    previewImage: '/images/main1-ai.png',
    variant: 'cover',
    available: true,
    palette: 'pink',
    sample: sampleInvitation,
    preset: {
      theme: 'romantic',
      primaryColor: '#c9748a',
      fontType: 'serif',
      fontSize: 'md',
      mainText: sampleInvitation.mainText,
      introEffect: 'fade',
      particle: 'cherry',
      effect: 'none',
      introText: sampleInvitation.introText,
      greetingText: sampleInvitation.greetingText,
      galleryLayout: 'grid',
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
        photodrop: true,
        bgm: true,
        flowerOrder: true,
      },
      ...emptyUserData,
    },
  },
  {
    key: 'photo-noir',
    name: 'Noir',
    desc: '메인 사진 한 장, 절제된 모노 무드',
    accent: '#1a1a1a',
    bg: '#ffffff',
    previewImage: '/images/main4-noir.png',
    variant: 'noir',
    available: true,
    palette: 'gray',
    sample: sampleNoirInvitation,
    preset: {
      theme: 'noir',
      primaryColor: '#1a1a1a',
      fontType: 'serif',
      fontSize: 'md',
      mainText: sampleInvitation.mainText,
      introEffect: 'fade',
      particle: 'none',
      effect: 'none',
      mainPhotoGrayscale: true,
      galleryGrayscale: true,
      guestbookStyle: 'letter',
      introText: sampleInvitation.introText,
      greetingText: sampleInvitation.greetingText,
      galleryLayout: 'grid',
      features: {
        greeting: true,
        dday: true,
        countdown: false,
        gallery: false,
        transport: true,
        notice: true,
        account: true,
        guestbook: false,
        rsvp: false,
        photodrop: false,
        bgm: false,
        flowerOrder: false,
      },
      ...emptyUserData,
    },
  },
  {
    key: 'typography-ink',
    name: 'Ink',
    desc: '텍스트가 주인공, 절제된 흑백 모노',
    accent: '#525252',
    bg: 'linear-gradient(140deg,#f5f5f5 0%,#e8e8e8 100%)',
    previewImage: null,
    variant: 'cover',
    available: false,
    palette: 'gray',
  },
]

export function getThemeEntry(key: string | null | undefined): ThemeEntry | null {
  if (!key) return null
  return THEME_CATALOG.find((t) => t.key === key) ?? null
}

export type ThemePreset = {
  key: string
  palette: PaletteKey
  data: Partial<InvitationData>
}

export function getThemePreset(key: string | null | undefined): ThemePreset | null {
  const entry = getThemeEntry(key)
  if (!entry?.preset) return null
  return { key: entry.key, palette: entry.palette, data: entry.preset }
}

export type ThemeSample = {
  data: InvitationData
  palette: PaletteKey
  themeLabel: string
}

export function getThemeSample(key: string | null | undefined): ThemeSample | null {
  const entry = getThemeEntry(key)
  if (!entry?.sample) return null
  return { data: entry.sample, palette: entry.palette, themeLabel: entry.name }
}
