import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sampleInvitation } from '@/lib/mock/sample-invitation'
import IntroSection from '@/components/invite/IntroSection'
import GreetingSection from '@/components/invite/GreetingSection'
import CoupleSection from '@/components/invite/CoupleSection'
import CalendarSection from '@/components/invite/CalendarSection'
import CountdownSection from '@/components/invite/CountdownSection'
import GallerySection from '@/components/invite/GallerySection'
import LocationSection from '@/components/invite/LocationSection'
import NoticeSection from '@/components/invite/NoticeSection'
import AccountSection from '@/components/invite/AccountSection'

type Props = { params: Promise<{ slug: string }> }

async function getInvitation(slug: string) {
  if (slug === 'sample') return sampleInvitation
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

  return (
    <div className="min-h-screen w-full bg-neutral-100">
      <div
        data-palette="pink"
        className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-white"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.08)' }}
      >
        <IntroSection data={data} />
        {data.features.greeting && <GreetingSection data={data} />}
        <CoupleSection data={data} />
        <CalendarSection data={data} />
        {data.features.countdown && <CountdownSection data={data} />}
        {data.features.gallery && <GallerySection data={data} />}
        {data.features.transport && <LocationSection data={data} />}
        {data.features.notice && <NoticeSection data={data} />}
        {data.features.account && <AccountSection data={data} />}
      </div>
    </div>
  )
}
