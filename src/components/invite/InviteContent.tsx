'use client'

import { useEffect, useState } from 'react'
import type { InvitationData } from '@/types/invitation'
import type { PaletteKey } from '@/components/editor/EditorContext'
import { loadInvitationBySlug } from '@/lib/invitation-storage'

import IntroSection from './IntroSection'
import GreetingSection from './GreetingSection'
import CoupleSection from './CoupleSection'
import CalendarSection from './CalendarSection'
import CountdownSection from './CountdownSection'
import GallerySection from './GallerySection'
import LocationSection from './LocationSection'
import NoticeSection from './NoticeSection'
import AccountSection from './AccountSection'
import GuestbookSection from './GuestbookSection'
import RsvpSection from './RsvpSection'
import ShareSection from './ShareSection'
import BgmPlayer from './BgmPlayer'
import OwnerTopBar from './OwnerTopBar'

type Props = {
  fallbackData: InvitationData
  fallbackPalette?: PaletteKey
}

export default function InviteContent({
  fallbackData,
  fallbackPalette = 'pink',
}: Props) {
  const [data, setData] = useState<InvitationData>(fallbackData)
  const [palette, setPalette] = useState<PaletteKey>(fallbackPalette)

  useEffect(() => {
    // 클라이언트 마운트 후 localStorage 조회 - 사용자가 편집한 최신 데이터 반영
    const stored = loadInvitationBySlug(fallbackData.slug)
    if (stored) {
      setData(stored.data)
      setPalette(stored.palette)
    }
  }, [fallbackData.slug])

  return (
    <div className="min-h-screen w-full bg-neutral-100">
      <OwnerTopBar invitationId={data.id} slug={data.slug} />
      <div
        data-palette={palette}
        data-font={data.fontType}
        data-font-size={data.fontSize}
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
        {data.features.guestbook && <GuestbookSection data={data} />}
        {data.features.rsvp && <RsvpSection data={data} />}
        <ShareSection data={data} />

        {data.features.bgm && <BgmPlayer bgmId={data.bgmUrl} />}
      </div>
    </div>
  )
}
