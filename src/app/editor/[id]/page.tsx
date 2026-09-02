'use client'

import { useEffect, useMemo, useState, use } from 'react'
import { EditorProvider } from '@/components/editor/EditorContext'
import type { PaletteKey } from '@/components/editor/EditorContext'
import EditorTopBar from '@/components/editor/EditorTopBar'
import EditorPanel from '@/components/editor/EditorPanel'
import EditorPreview from '@/components/editor/EditorPreview'
import { sampleInvitation } from '@/lib/mock/sample-invitation'
import { emptyInvitation } from '@/lib/mock/empty-invitation'
import { loadInvitationById } from '@/lib/invitation-storage'
import type { InvitationData } from '@/types/invitation'

type Props = { params: Promise<{ id: string }> }

export default function EditorPage({ params }: Props) {
  const { id } = use(params)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState<{
    data: InvitationData
    palette: PaletteKey
  } | null>(null)

  const defaultData = useMemo<InvitationData>(() => {
    if (id === 'new') return { ...emptyInvitation, id: `new-${Date.now()}` }
    return { ...sampleInvitation, id }
  }, [id])

  useEffect(() => {
    // 클라이언트 마운트 후 localStorage 조회
    const stored = loadInvitationById(id)
    if (stored) {
      setLoaded({ data: stored.data, palette: stored.palette })
    }
    setReady(true)
  }, [id])

  if (!ready) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
      </div>
    )
  }

  const initialData = loaded?.data ?? defaultData
  const initialPalette = loaded?.palette ?? 'pink'

  return (
    <EditorProvider initialData={initialData} initialPalette={initialPalette}>
      <div className="flex h-[100dvh] flex-col bg-white">
        <EditorTopBar
          onTogglePreview={() => setPreviewOpen((v) => !v)}
          previewOpen={previewOpen}
        />

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`w-full flex-shrink-0 border-r border-neutral-100 md:w-[420px] ${
              previewOpen ? 'hidden md:block' : 'block'
            }`}
          >
            <EditorPanel />
          </div>

          <div className={`flex-1 ${previewOpen ? 'block' : 'hidden md:block'}`}>
            <EditorPreview />
          </div>
        </div>
      </div>
    </EditorProvider>
  )
}
