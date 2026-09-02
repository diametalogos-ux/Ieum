import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sampleInvitation } from '@/lib/mock/sample-invitation'
import { dashboardInvitations } from '@/lib/mock/dashboard-invitations'
import InviteContent from '@/components/invite/InviteContent'

type Props = { params: Promise<{ slug: string }> }

async function getInvitation(slug: string) {
  // Mock: 어떤 slug든 샘플 데이터로 반환 (실제로는 DB 조회)
  // Supabase 붙일 때 여기를 실제 조회로 교체
  if (slug === 'sample') return sampleInvitation
  const dashboardMatch = dashboardInvitations.find((i) => i.slug === slug)
  if (dashboardMatch) {
    return {
      ...sampleInvitation,
      slug,
      title: dashboardMatch.title,
      id: dashboardMatch.id,
    }
  }
  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getInvitation(slug)
  if (!data) return { title: '청첩장을 찾을 수 없어요' }
  return {
    title: data.ogTitle,
    description: data.ogDescription,
    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      type: 'website',
      images: data.ogImageUrl ? [{ url: data.ogImageUrl }] : undefined,
    },
  }
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params
  const data = await getInvitation(slug)
  if (!data) notFound()

  return <InviteContent fallbackData={data} fallbackPalette="pink" />
}
