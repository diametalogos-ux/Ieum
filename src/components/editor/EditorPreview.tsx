'use client'

import { useMemo } from 'react'
import { useEditor } from './EditorContext'
import { withDisplayDefaults } from '@/lib/invitations/display-defaults'
import IntroSection from '@/components/invite/IntroSection'
import GreetingSection from '@/components/invite/GreetingSection'
import CoupleSection from '@/components/invite/CoupleSection'
import CalendarSection from '@/components/invite/CalendarSection'
import DDaySection from '@/components/invite/DDaySection'
import CountdownSection from '@/components/invite/CountdownSection'
import GallerySection from '@/components/invite/GallerySection'
import PhotoDropSection from '@/components/invite/PhotoDropSection'
import LocationSection from '@/components/invite/LocationSection'
import NoticeSection from '@/components/invite/NoticeSection'
import AccountSection from '@/components/invite/AccountSection'
import GuestbookSection from '@/components/invite/GuestbookSection'
import RsvpSection from '@/components/invite/RsvpSection'
import FlowerOrderSection from '@/components/invite/FlowerOrderSection'
import ShareSection from '@/components/invite/ShareSection'

export default function EditorPreview() {
  const { data, palette } = useEditor()
  const view = useMemo(() => withDisplayDefaults(data), [data])

  return (
    <div className="flex h-full items-center justify-center bg-neutral-100 p-6 md:p-10">
      <div className="relative mx-auto w-full max-w-[380px]">
        {/* 폰 프레임 */}
        <div className="relative rounded-[42px] bg-neutral-900 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]">
          <div className="overflow-hidden rounded-[34px] bg-white">
            {/* 노치 */}
            <div className="relative">
              <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-neutral-900" />
            </div>

            {/* 스크롤 가능한 미리보기 영역 */}
            <div
              data-palette={palette}
              data-font={view.fontType}
              data-font-size={view.fontSize}
              className="h-[calc(100vh-14rem)] max-h-[720px] min-h-[520px] overflow-y-auto bg-white"
            >
              <IntroSection data={view} />
              {view.features.greeting && <GreetingSection data={view} />}
              <CoupleSection data={view} />
              <CalendarSection data={view} />
              {view.features.dday && <DDaySection data={view} />}
              {view.features.countdown && <CountdownSection data={view} />}
              {view.features.gallery && <GallerySection data={view} />}
              {view.features.photodrop && <PhotoDropSection data={view} />}
              {view.features.transport && <LocationSection data={view} />}
              {view.features.notice && <NoticeSection data={view} />}
              {view.features.account && <AccountSection data={view} />}
              {view.features.flowerOrder && <FlowerOrderSection data={view} />}
              {view.features.guestbook && <GuestbookSection data={view} />}
              {view.features.rsvp && <RsvpSection data={view} />}
              <ShareSection data={view} />
            </div>
          </div>
        </div>

        {/* 하단 인디케이터 */}
        <p className="mt-4 text-center text-[11px] tracking-wider text-neutral-400">
          실시간 미리보기 · 빈 항목은 예시로 표시돼요
        </p>
      </div>
    </div>
  )
}
