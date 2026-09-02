'use client'

import { useState, use } from 'react'
import { EditorProvider } from '@/components/editor/EditorContext'
import EditorTopBar from '@/components/editor/EditorTopBar'
import EditorPanel from '@/components/editor/EditorPanel'
import EditorPreview from '@/components/editor/EditorPreview'
import { sampleInvitation } from '@/lib/mock/sample-invitation'

type Props = { params: Promise<{ id: string }> }

export default function EditorPage({ params }: Props) {
  const { id } = use(params)
  const [previewOpen, setPreviewOpen] = useState(false)

  // Mock: 실제로는 id로 API 조회. new이면 빈 데이터, 아니면 기존 데이터
  const initialData = id === 'new'
    ? { ...sampleInvitation, id: 'new', slug: 'new-invitation', title: '새 청첩장' }
    : sampleInvitation

  return (
    <EditorProvider initialData={initialData}>
      <div className="flex h-[100dvh] flex-col bg-white">
        <EditorTopBar
          onTogglePreview={() => setPreviewOpen((v) => !v)}
          previewOpen={previewOpen}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* 좌: 편집 패널 — 데스크탑 상시, 모바일은 미리보기 켜지면 숨김 */}
          <div
            className={`w-full flex-shrink-0 border-r border-neutral-100 md:w-[420px] ${
              previewOpen ? 'hidden md:block' : 'block'
            }`}
          >
            <EditorPanel />
          </div>

          {/* 우: 미리보기 — 데스크탑 상시, 모바일은 previewOpen일 때만 */}
          <div
            className={`flex-1 ${previewOpen ? 'block' : 'hidden md:block'}`}
          >
            <EditorPreview />
          </div>
        </div>
      </div>
    </EditorProvider>
  )
}
