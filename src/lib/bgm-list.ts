export type BgmTrack = {
  id: string
  label: string
  mood: string
  url: string
}

export const BGM_LIST: BgmTrack[] = [
  {
    id: 'vow',
    label: '혼약의 순간',
    mood: '엄숙 · 클래식',
    url: '/audio/alex-morgan-wedding-instrumental-vow-exchange-578502.mp3',
  },
  {
    id: 'serenade',
    label: '웨딩 세레나데',
    mood: '따뜻 · 스트링',
    url: '/audio/andriig-wedding-wedding-music-568195.mp3',
  },
  {
    id: 'aisle',
    label: '입장의 길',
    mood: '우아 · 오케스트라',
    url: '/audio/leberch-wedding-584479.mp3',
  },
  {
    id: 'piano',
    label: '웨딩 피아노',
    mood: '잔잔 · 피아노',
    url: '/audio/paulyudin-wedding-piano-162472.mp3',
  },
]

export const DEFAULT_BGM_ID = BGM_LIST[0].id

export function findBgm(id: string | null): BgmTrack | null {
  if (!id) return null
  return BGM_LIST.find((b) => b.id === id) ?? null
}
