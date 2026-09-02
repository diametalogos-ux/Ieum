'use client'

import { useEditor } from '../EditorContext'
import EditorSection from '../ui/EditorSection'
import FeatureCard from '../ui/FeatureCard'
import { TextArea } from '../ui/EditorField'
import GalleryEditor from '../detail/GalleryEditor'
import TransportEditor from '../detail/TransportEditor'
import NoticeEditor from '../detail/NoticeEditor'
import AccountEditor from '../detail/AccountEditor'
import BgmEditor from '../detail/BgmEditor'
import type { InvitationData } from '@/types/invitation'
import type { ReactNode } from 'react'

type FeatureKey = keyof InvitationData['features']

type FeatureDef = {
  key: FeatureKey
  title: string
  description: string
  icon: ReactNode
}

const icon = (path: ReactNode) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    {path}
  </svg>
)

const GROUPS: {
  label: string
  features: FeatureDef[]
}[] = [
  {
    label: '인사',
    features: [
      {
        key: 'greeting',
        title: '인사말',
        description: '결혼식 초대 인사 문구',
        icon: icon(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />),
      },
    ],
  },
  {
    label: '일정',
    features: [
      {
        key: 'dday',
        title: '디데이',
        description: '결혼식까지 남은 날 표시',
        icon: icon(
          <>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </>
        ),
      },
      {
        key: 'countdown',
        title: '카운트다운',
        description: '남은 일/시/분/초 실시간 표시',
        icon: icon(
          <>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </>
        ),
      },
    ],
  },
  {
    label: '사진',
    features: [
      {
        key: 'gallery',
        title: '갤러리',
        description: '웨딩 사진 모음',
        icon: icon(
          <>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </>
        ),
      },
      {
        key: 'photodrop',
        title: '하객 포토드롭',
        description: '하객이 사진을 남길 수 있는 공간',
        icon: icon(
          <>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </>
        ),
      },
    ],
  },
  {
    label: '안내',
    features: [
      {
        key: 'transport',
        title: '오시는 길',
        description: '예식장 위치 및 교통편',
        icon: icon(
          <>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </>
        ),
      },
      {
        key: 'notice',
        title: '공지사항',
        description: '하객께 드리는 안내 말씀',
        icon: icon(
          <>
            <path d="M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15M18 13a3 3 0 1 0 0-6M5.436 13.683A4.001 4.001 0 0 1 7 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 0 1-1.564-.317z" />
          </>
        ),
      },
      {
        key: 'account',
        title: '마음 전하실 곳',
        description: '축의금 계좌 안내',
        icon: icon(
          <>
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </>
        ),
      },
    ],
  },
  {
    label: '참여',
    features: [
      {
        key: 'guestbook',
        title: '방명록',
        description: '하객이 축하 메시지를 남길 수 있음',
        icon: icon(
          <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </>
        ),
      },
      {
        key: 'rsvp',
        title: '참석 여부',
        description: '하객이 참석 응답을 남길 수 있음',
        icon: icon(
          <>
            <path d="M20 6L9 17l-5-5" />
          </>
        ),
      },
    ],
  },
  {
    label: '기타',
    features: [
      {
        key: 'bgm',
        title: '배경 음악',
        description: '청첩장에 잔잔한 음악 재생',
        icon: icon(
          <>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </>
        ),
      },
      {
        key: 'flowerOrder',
        title: '화환 주문',
        description: '연결된 업체에서 축하 화환 주문',
        icon: icon(
          <>
            <circle cx="12" cy="8" r="4" />
            <path d="M12 12v10" />
            <path d="M9 22h6" />
          </>
        ),
      },
    ],
  },
]

export default function FeaturesTab() {
  const { data, update, toggleFeature } = useEditor()

  return (
    <div>
      {GROUPS.map((group, gIdx) => (
        <EditorSection
          key={group.label}
          title={group.label}
          defaultOpen={gIdx < 3}
        >
          <div className="space-y-2.5">
            {group.features.map((f) => (
              <FeatureCard
                key={f.key}
                icon={f.icon}
                title={f.title}
                description={f.description}
                enabled={data.features[f.key]}
                onToggle={(v) => toggleFeature(f.key, v)}
              >
                {f.key === 'greeting' && (
                  <TextArea
                    label="인사말 문구"
                    value={data.greetingText}
                    onChange={(e) => update('greetingText', e.target.value)}
                    rows={4}
                    placeholder="서로 다른 길을 걸어온 저희 두 사람이..."
                  />
                )}
                {f.key === 'gallery' && <GalleryEditor />}
                {f.key === 'transport' && <TransportEditor />}
                {f.key === 'notice' && <NoticeEditor />}
                {f.key === 'account' && <AccountEditor />}
                {f.key === 'bgm' && <BgmEditor />}
                {(f.key === 'dday' ||
                  f.key === 'countdown' ||
                  f.key === 'guestbook' ||
                  f.key === 'rsvp' ||
                  f.key === 'photodrop' ||
                  f.key === 'flowerOrder') && (
                  <p className="text-[11px] text-neutral-500">
                    이 기능은 별도 설정 없이 자동으로 표시돼요
                  </p>
                )}
              </FeatureCard>
            ))}
          </div>
        </EditorSection>
      ))}
    </div>
  )
}
