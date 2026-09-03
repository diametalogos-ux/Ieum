'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { EditorProvider } from '@/components/editor/EditorContext'
import type { PaletteKey } from '@/components/editor/EditorContext'
import EditorTopBar from '@/components/editor/EditorTopBar'
import EditorPanel from '@/components/editor/EditorPanel'
import EditorPreview from '@/components/editor/EditorPreview'
import { useAuth } from '@/components/providers/AuthProvider'
import {
  createInvitation,
  getInvitationById,
} from '@/lib/invitations/client'
import type { InvitationData } from '@/types/invitation'

type Props = { params: Promise<{ id: string }> }

export default function EditorPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [state, setState] = useState<
    | { status: 'loading' }
    | { status: 'notfound' }
    | { status: 'ready'; data: InvitationData; palette: PaletteKey }
  >({ status: 'loading' })

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.replace('/login')
      return
    }

    // /editor/new 로 들어오면 새로 만들고 실제 id로 replace
    if (id === 'new') {
      ;(async () => {
        const result = await createInvitation()
        if (!result.ok) {
          alert(result.error)
          router.replace('/dashboard')
          return
        }
        router.replace(`/editor/${result.id}`)
      })()
      return
    }

    ;(async () => {
      const stored = await getInvitationById(id)
      if (!stored) {
        setState({ status: 'notfound' })
        return
      }
      setState({
        status: 'ready',
        data: stored.data,
        palette: stored.palette,
      })
    })()
  }, [id, user, authLoading, router])

  if (state.status === 'loading' || authLoading) {
    return (
      <div className="flex h-[100dvh] items-center justify-center bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
      </div>
    )
  }

  if (state.status === 'notfound') {
    return (
      <div className="flex h-[100dvh] flex-col items-center justify-center gap-4 bg-white">
        <p className="text-sm text-neutral-600">
          청첩장을 찾을 수 없거나 권한이 없어요.
        </p>
        <button
          onClick={() => router.replace('/dashboard')}
          className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-medium text-white hover:bg-neutral-800"
        >
          대시보드로
        </button>
      </div>
    )
  }

  return (
    <EditorProvider initialData={state.data} initialPalette={state.palette}>
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
