'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import InvitationCard from '@/components/dashboard/InvitationCard'
import CreateNewCard from '@/components/dashboard/CreateNewCard'
import EmptyState from '@/components/dashboard/EmptyState'
import { useAuth } from '@/components/providers/AuthProvider'
import {
  deleteInvitation,
  listMyInvitations,
} from '@/lib/invitations/client'
import type { InvitationSummary } from '@/lib/invitations/types'

const MAX_INVITATIONS = 3

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [invitations, setInvitations] = useState<InvitationSummary[]>([])
  const [listLoading, setListLoading] = useState(true)

  const canCreateMore = invitations.length < MAX_INVITATIONS

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [loading, user, router])

  const refresh = useCallback(async () => {
    setListLoading(true)
    const rows = await listMyInvitations()
    setInvitations(rows)
    setListLoading(false)
  }, [])

  useEffect(() => {
    if (loading || !user) return
    refresh()
  }, [loading, user, refresh])

  const displayName =
    (user?.user_metadata?.name as string) ||
    (user?.user_metadata?.full_name as string) ||
    user?.email?.split('@')[0] ||
    ''

  const handleDelete = async (id: string) => {
    const result = await deleteInvitation(id)
    if (!result.ok) {
      alert(`삭제 실패: ${result.error}`)
      return
    }
    setInvitations((prev) => prev.filter((i) => i.id !== id))
  }

  if (loading || !user || listLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <DashboardHeader />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
              Dashboard
            </p>
            <h1 className="font-serif mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              안녕하세요, {displayName}님
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              내 청첩장을 관리하고 새로운 이야기를 담아보세요
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2">
              <span className="text-xs text-neutral-500">보유</span>
              <span className="font-serif text-sm font-semibold text-neutral-900">
                {invitations.length}
                <span className="text-neutral-400"> / {MAX_INVITATIONS}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          {invitations.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {invitations.map((item) => (
                <InvitationCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                />
              ))}
              {canCreateMore && <CreateNewCard />}
            </div>
          )}
        </div>

        {invitations.length > 0 && !canCreateMore && (
          <p className="mt-8 text-center text-xs text-neutral-500">
            최대 {MAX_INVITATIONS}개까지 만들 수 있어요.
            더 만들려면 기존 청첩장을 삭제해 주세요.
          </p>
        )}
      </main>
    </div>
  )
}
