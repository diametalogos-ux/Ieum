'use client'

import { useState } from 'react'
import BasicInfoTab from './tabs/BasicInfoTab'
import FeaturesTab from './tabs/FeaturesTab'
import ShareTab from './tabs/ShareTab'

export type TabKey = 'basic' | 'features' | 'share'

const TABS: {
  key: TabKey
  label: string
  icon: React.ReactNode
}[] = [
  {
    key: 'basic',
    label: '기본 정보',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    key: 'features',
    label: '부가 기능',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    key: 'share',
    label: '공유 설정',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
]

function TabPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: 'var(--color-accent-soft, #f7ecec)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          style={{ color: 'var(--color-accent, #c9807f)' }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="font-serif mt-5 text-base font-semibold text-neutral-800">
        {label} 편집
      </h3>
      <p className="mt-2 max-w-xs text-xs leading-relaxed text-neutral-500">
        이 영역은 다음 단계에서 만들 예정이에요.
        <br />
        곧 여기에 편집 UI가 들어옵니다.
      </p>
    </div>
  )
}

export default function EditorPanel() {
  const [activeTab, setActiveTab] = useState<TabKey>('basic')
  const currentLabel = TABS.find((t) => t.key === activeTab)?.label ?? ''

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      <nav className="flex flex-shrink-0 border-b border-neutral-100">
        {TABS.map((tab) => {
          const active = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                active
                  ? 'text-neutral-900'
                  : 'text-neutral-400 hover:text-neutral-700'
              }`}
              aria-selected={active}
            >
              {tab.icon}
              {tab.label}
              {active && (
                <span
                  className="absolute -bottom-px left-1/2 h-0.5 w-10 -translate-x-1/2"
                  style={{ background: 'var(--color-accent, #c9807f)' }}
                />
              )}
            </button>
          )
        })}
      </nav>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {activeTab === 'basic' ? (
          <BasicInfoTab />
        ) : activeTab === 'features' ? (
          <FeaturesTab />
        ) : activeTab === 'share' ? (
          <ShareTab />
        ) : (
          <TabPlaceholder label={currentLabel} />
        )}
      </div>
    </div>
  )
}
