import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sampleInvitation } from '@/lib/mock/sample-invitation'
import InviteContent from '@/components/invite/InviteContent'
import { getInvitationBySlug } from '@/lib/invitations/server'
import type { InvitationData } from '@/types/invitation'
import type { PaletteKey } from '@/components/editor/EditorContext'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ edit?: string }>
}

type LoadResult = { data: InvitationData; palette: PaletteKey } | null

async function loadBySlug(slug: string): Promise<LoadResult> {
  // /invite/sample 은 로그인 없이 볼 수 있는 데모용 mock
  if (slug === 'sample') {
    return { data: sampleInvitation, palette: 'pink' }
  }
  const stored = await getInvitationBySlug(slug)
  if (!stored) return null
  return { data: stored.data, palette: stored.palette }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const loaded = await loadBySlug(slug)
  if (!loaded) {
    return {
      title: '청첩장을 찾을 수 없어요',
      robots: { index: false, follow: false },
    }
  }
  const { data } = loaded
  return {
    title: data.ogTitle || data.title,
    description: data.ogDescription,
    // 개별 청첩장은 개인정보 보호를 위해 검색엔진 노출 차단
    // (카카오톡 등의 OG 미리보기는 robots와 무관하게 동작)
    robots: { index: false, follow: false },
    openGraph: {
      title: data.ogTitle || data.title,
      description: data.ogDescription,
      type: 'website',
      images: data.ogImageUrl ? [{ url: data.ogImageUrl }] : undefined,
    },
  }
}

export default async function InvitePage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams
  const loaded = await loadBySlug(slug)
  if (!loaded) notFound()

  return (
    <InviteContent
      data={loaded.data}
      palette={loaded.palette}
      previewMode={sp.edit === '1'}
    />
  )
}
