import type { InvitationData } from '@/types/invitation'
import type { PaletteKey } from '@/components/editor/EditorContext'
import { sampleInvitation } from '@/lib/mock/sample-invitation'

/**
 * 테마 프리셋 — "이 테마로 만들기" 클릭 시 초기 세팅.
 * 개인 정보 (이름·예식장·연락처·사진·계좌 등)는 명시적으로 비워둔다.
 * 스타일/문구 예시/기능 토글은 프리셋에서 미리 세팅.
 */

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

export type ThemePreset = {
  key: string
  palette: PaletteKey
  data: Partial<InvitationData>
}

/**
 * 테마 key → 프리셋 매핑.
 * 새 테마 추가 시 여기에 항목 추가.
 */
const PRESETS: Record<string, ThemePreset> = {
  'photo-blush': {
    key: 'photo-blush',
    palette: 'pink',
    data: {
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
  // 'typography-ink' 는 아직 COMING SOON — 여기 등록 안 함
}

export function getThemePreset(key: string | null | undefined): ThemePreset | null {
  if (!key) return null
  return PRESETS[key] ?? null
}
