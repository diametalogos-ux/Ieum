'use client'

import { useMemo } from 'react'
import type { InvitationData } from '@/types/invitation'
import type { PaletteKey } from '@/components/editor/EditorContext'
import { withDisplayDefaults } from '@/lib/invitations/display-defaults'

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
import FlowerOrderSection from './FlowerOrderSection'
import BgmPlayer from './BgmPlayer'
import OwnerTopBar from './OwnerTopBar'

type Props = {
  data: InvitationData
  palette?: PaletteKey
  previewMode?: boolean
}

export default function InviteContent({
  data,
  palette = 'pink',
  previewMode = false,
}: Props) {
  // 시각적 렌더링은 빈 필드를 예시로 채워서 청첩장이 비어보이지 않게.
  // 화환 주문 등 기능성 섹션은 원본 데이터를 사용해 실제 값으로 동작.
  const view = useMemo(() => withDisplayDefaults(data), [data])

  return (
    <div className="min-h-screen w-full bg-neutral-100">
      <OwnerTopBar invitationId={data.id} slug={data.slug} />
      <div
        data-palette={palette}
        data-font={view.fontType}
        data-font-size={view.fontSize}
        className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-white"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.08)' }}
      >
        <IntroSection data={view} />
        {view.features.greeting && <GreetingSection data={view} />}
        <CoupleSection data={view} />
        <CalendarSection data={view} />
        {view.features.countdown && <CountdownSection data={view} />}
        {view.features.gallery && <GallerySection data={view} />}
        {view.features.transport && <LocationSection data={view} />}
        {view.features.notice && <NoticeSection data={view} />}
        {view.features.account && <AccountSection data={view} />}
        {view.features.flowerOrder && <FlowerOrderSection data={data} />}
        {view.features.guestbook && <GuestbookSection data={view} />}
        {view.features.rsvp && <RsvpSection data={view} />}
        <ShareSection data={view} />

        {view.features.bgm && (
          <BgmPlayer bgmId={view.bgmUrl} previewMode={previewMode} />
        )}
      </div>
    </div>
  )
}
