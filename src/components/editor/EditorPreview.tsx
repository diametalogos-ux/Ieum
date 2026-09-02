'use client'

import { useEditor } from './EditorContext'
import IntroSection from '@/components/invite/IntroSection'
import GreetingSection from '@/components/invite/GreetingSection'
import CoupleSection from '@/components/invite/CoupleSection'
import CalendarSection from '@/components/invite/CalendarSection'
import CountdownSection from '@/components/invite/CountdownSection'
import GallerySection from '@/components/invite/GallerySection'
import LocationSection from '@/components/invite/LocationSection'
import NoticeSection from '@/components/invite/NoticeSection'
import AccountSection from '@/components/invite/AccountSection'
import GuestbookSection from '@/components/invite/GuestbookSection'
import RsvpSection from '@/components/invite/RsvpSection'
import ShareSection from '@/components/invite/ShareSection'

export default function EditorPreview() {
  const { data, palette } = useEditor()

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
              data-font={data.fontType}
              data-font-size={data.fontSize}
              className="h-[calc(100vh-14rem)] max-h-[720px] min-h-[520px] overflow-y-auto bg-white"
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
            </div>
          </div>
        </div>

        {/* 하단 인디케이터 */}
        <p className="mt-4 text-center text-[11px] tracking-wider text-neutral-400">
          실시간 미리보기
        </p>
      </div>
    </div>
  )
}
