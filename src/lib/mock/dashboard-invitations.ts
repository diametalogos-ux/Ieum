export type DashboardInvitation = {
  id: string
  slug: string
  title: string
  groomName: string
  brideName: string
  ceremonyDate: string
  themeName: string
  paletteKey: 'pink' | 'beige' | 'green' | 'gray' | 'purple'
  status: 'published' | 'draft'
  updatedAt: string
  thumbnailGradient: string
}

export const dashboardInvitations: DashboardInvitation[] = [
  {
    id: 'inv-01',
    slug: 'sample',
    title: '민준 ♥ 서연',
    groomName: '민준',
    brideName: '서연',
    ceremonyDate: '2026-05-18',
    themeName: '레터링1',
    paletteKey: 'pink',
    status: 'published',
    updatedAt: '2026-04-15T10:30:00Z',
    thumbnailGradient: 'linear-gradient(135deg, #f7ecec 0%, #ecd8d8 50%, #d9b8bd 100%)',
  },
  {
    id: 'inv-02',
    slug: 'draft-01',
    title: '준서 ♥ 지우',
    groomName: '준서',
    brideName: '지우',
    ceremonyDate: '2026-09-12',
    themeName: '가든플로럴',
    paletteKey: 'green',
    status: 'draft',
    updatedAt: '2026-04-20T14:20:00Z',
    thumbnailGradient: 'linear-gradient(135deg, #f0f9f0 0%, #dcefd8 50%, #a5c4a3 100%)',
  },
]

export const currentUser = {
  name: '이다희',
  email: 'tkdkagody@gmail.com',
  avatarInitial: '이',
}

export const MAX_INVITATIONS = 3
