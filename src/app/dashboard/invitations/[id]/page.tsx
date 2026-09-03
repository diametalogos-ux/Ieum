'use client'

import { use, useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { getInvitationById } from '@/lib/invitations/client'
import type { StoredInvitation } from '@/lib/invitations/types'
import {
  deleteRsvp,
  listRsvpsByInvitation,
  type RsvpEntry,
  type RsvpSide,
} from '@/lib/rsvp/client'
import {
  deleteGuestbook,
  listGuestbookByInvitation,
  type GuestbookEntry,
} from '@/lib/guestbook/client'

type Props = { params: Promise<{ id: string }> }
type Tab = 'rsvp' | 'guestbook'
type SideFilter = 'all' | RsvpSide
type AttendanceFilter = 'all' | 'attend' | 'absent'
type MealFilter = 'all' | 'yes' | 'no'

export default function InvitationManagePage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [invitation, setInvitation] = useState<StoredInvitation | null>(null)
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([])
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('rsvp')

  // 필터 상태
  const [query, setQuery] = useState('')
  const [sideFilter, setSideFilter] = useState<SideFilter>('all')
  const [attFilter, setAttFilter] = useState<AttendanceFilter>('all')
  const [mealFilter, setMealFilter] = useState<MealFilter>('all')

  const refresh = useCallback(async () => {
    setLoading(true)
    const [inv, r, g] = await Promise.all([
      getInvitationById(id),
      listRsvpsByInvitation(id),
      listGuestbookByInvitation(id),
    ])
    setInvitation(inv)
    setRsvps(r)
    setGuestbook(g)
    setLoading(false)
  }, [id])

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.replace('/login')
      return
    }
    refresh()
  }, [authLoading, user, router, refresh])

  const filteredRsvps = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rsvps.filter((r) => {
      if (sideFilter !== 'all' && r.side !== sideFilter) return false
      if (attFilter !== 'all' && r.attendance !== attFilter) return false
      if (mealFilter !== 'all' && r.meal !== mealFilter) return false
      if (q) {
        const hay = `${r.name} ${r.contact ?? ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [rsvps, query, sideFilter, attFilter, mealFilter])

  const stats = useMemo(() => computeStats(rsvps), [rsvps])

  const handleDeleteRsvp = async (rsvpId: string) => {
    if (!confirm('이 응답을 삭제할까요?')) return
    const result = await deleteRsvp(rsvpId)
    if (!result.ok) {
      alert(`삭제 실패: ${result.error}`)
      return
    }
    setRsvps((prev) => prev.filter((r) => r.id !== rsvpId))
  }

  const handleDeleteGuestbook = async (gbId: string) => {
    if (!confirm('이 방명록을 삭제할까요?')) return
    const result = await deleteGuestbook(gbId)
    if (!result.ok) {
      alert(`삭제 실패: ${result.error}`)
      return
    }
    setGuestbook((prev) => prev.filter((g) => g.id !== gbId))
  }

  const handleDownloadCsv = () => {
    const filename = `참석여부_${invitation?.data.title ?? id}_${todayStr()}.csv`
    downloadCsv(filename, buildRsvpCsv(filteredRsvps))
  }

  if (loading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-50">
        <p className="text-sm text-neutral-600">
          청첩장을 찾을 수 없거나 권한이 없어요.
        </p>
        <Link
          href="/dashboard"
          className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-medium text-white hover:bg-neutral-800"
        >
          대시보드로
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-100 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-5">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            대시보드
          </Link>
          <Link
            href={`/editor/${id}`}
            className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
          >
            편집으로
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-5 py-8">
        <div>
          <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
            Responses
          </p>
          <h1 className="font-serif mt-2 text-2xl font-semibold text-neutral-900 md:text-3xl">
            참석여부 확인
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            {invitation.data.title || '청첩장'} — 응답과 방명록을 관리해요
          </p>
        </div>

        {/* 탭 */}
        <div className="mt-8 flex gap-1 border-b border-neutral-200">
          <TabButton
            active={tab === 'rsvp'}
            onClick={() => setTab('rsvp')}
            label={`참석여부 확인 (${rsvps.length})`}
          />
          <TabButton
            active={tab === 'guestbook'}
            onClick={() => setTab('guestbook')}
            label={`방명록 (${guestbook.length})`}
          />
        </div>

        {tab === 'rsvp' ? (
          <div className="mt-6 space-y-6">
            {/* 참석 정보 카드 */}
            <StatBarCard
              title="참석 정보"
              headline={
                stats.attendingPeople > 0
                  ? `총 ${stats.attendingPeople}명이 참석합니다`
                  : '아직 응답이 없어요'
              }
              sub={`전체 응답 ${rsvps.length}건 · 참석 ${stats.attendingTeams}팀 · 미참석 ${stats.absentTeams}팀`}
              groups={[
                {
                  label: '전체',
                  bars: [
                    { label: '참석', value: stats.total.attendingPeople, color: '#171717' },
                    { label: '미참석', value: stats.total.absentTeams, color: '#a3a3a3' },
                  ],
                },
                {
                  label: '신랑측',
                  bars: [
                    { label: '참석', value: stats.groom.attendingPeople, color: '#6b7fc7' },
                    { label: '미참석', value: stats.groom.absentTeams, color: '#c3cbe3' },
                  ],
                },
                {
                  label: '신부측',
                  bars: [
                    { label: '참석', value: stats.bride.attendingPeople, color: '#d97a7a' },
                    { label: '미참석', value: stats.bride.absentTeams, color: '#eabdbd' },
                  ],
                },
              ]}
            />

            {/* 식사 정보 카드 */}
            <StatBarCard
              title="식사 정보"
              headline={
                stats.attendingPeople > 0
                  ? `참석자 ${stats.attendingPeople}명 중 ${stats.mealYesPeople}명이 식사 예정`
                  : '아직 응답이 없어요'
              }
              sub={undefined}
              groups={[
                {
                  label: '전체',
                  bars: [
                    { label: '식사함', value: stats.total.mealYesPeople, color: '#171717' },
                    { label: '식사안함', value: stats.total.mealNoPeople, color: '#a3a3a3' },
                  ],
                },
                {
                  label: '신랑측',
                  bars: [
                    { label: '식사함', value: stats.groom.mealYesPeople, color: '#6b7fc7' },
                    { label: '식사안함', value: stats.groom.mealNoPeople, color: '#c3cbe3' },
                  ],
                },
                {
                  label: '신부측',
                  bars: [
                    { label: '식사함', value: stats.bride.mealYesPeople, color: '#d97a7a' },
                    { label: '식사안함', value: stats.bride.mealNoPeople, color: '#eabdbd' },
                  ],
                },
              ]}
            />

            {/* 상세 목록 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-semibold text-neutral-900">
                    상세 목록
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    {filteredRsvps.length}건
                    {filteredRsvps.length !== rsvps.length &&
                      ` (전체 ${rsvps.length})`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  disabled={filteredRsvps.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  엑셀 다운로드
                </button>
              </div>

              {/* 검색 + 필터 */}
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="성함 · 연락처 검색"
                  className="block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none"
                />
                <div className="grid grid-cols-3 gap-2">
                  <FilterSelect
                    label="구분"
                    value={sideFilter}
                    onChange={(v) => setSideFilter(v as SideFilter)}
                    options={[
                      { value: 'all', label: '전체' },
                      { value: 'groom', label: '신랑측' },
                      { value: 'bride', label: '신부측' },
                    ]}
                  />
                  <FilterSelect
                    label="참석 여부"
                    value={attFilter}
                    onChange={(v) => setAttFilter(v as AttendanceFilter)}
                    options={[
                      { value: 'all', label: '전체' },
                      { value: 'attend', label: '참석' },
                      { value: 'absent', label: '미참석' },
                    ]}
                  />
                  <FilterSelect
                    label="식사 여부"
                    value={mealFilter}
                    onChange={(v) => setMealFilter(v as MealFilter)}
                    options={[
                      { value: 'all', label: '전체' },
                      { value: 'yes', label: '식사함' },
                      { value: 'no', label: '식사안함' },
                    ]}
                  />
                </div>
              </div>

              {/* 표 */}
              <RsvpTable entries={filteredRsvps} onDelete={handleDeleteRsvp} />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <GuestbookList
              entries={guestbook}
              onDelete={handleDeleteGuestbook}
            />
          </div>
        )}
      </main>
    </div>
  )
}

/* ============================================
   통계 계산
   ============================================ */

type SideStats = {
  attendingTeams: number
  absentTeams: number
  attendingPeople: number
  mealYesPeople: number
  mealNoPeople: number
}

function emptySideStats(): SideStats {
  return {
    attendingTeams: 0,
    absentTeams: 0,
    attendingPeople: 0,
    mealYesPeople: 0,
    mealNoPeople: 0,
  }
}

type AllStats = SideStats & {
  attendingTeams: number
  absentTeams: number
  attendingPeople: number
  mealYesPeople: number
  mealNoPeople: number
  total: SideStats
  groom: SideStats
  bride: SideStats
}

function computeStats(rsvps: RsvpEntry[]): AllStats {
  const total = emptySideStats()
  const groom = emptySideStats()
  const bride = emptySideStats()

  for (const r of rsvps) {
    const bucket = r.side === 'groom' ? groom : bride
    if (r.attendance === 'attend') {
      bucket.attendingTeams += 1
      bucket.attendingPeople += r.headcount
      total.attendingTeams += 1
      total.attendingPeople += r.headcount
      if (r.meal === 'yes') {
        bucket.mealYesPeople += r.headcount
        total.mealYesPeople += r.headcount
      } else if (r.meal === 'no') {
        bucket.mealNoPeople += r.headcount
        total.mealNoPeople += r.headcount
      }
    } else {
      bucket.absentTeams += 1
      total.absentTeams += 1
    }
  }

  return {
    ...total,
    total,
    groom,
    bride,
  }
}

/* ============================================
   CSV
   ============================================ */

function todayStr() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
}

function csvCell(v: string | number | null | undefined): string {
  const s = v === null || v === undefined ? '' : String(v)
  if (/[,"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function buildRsvpCsv(entries: RsvpEntry[]): string {
  const BOM = '﻿' // Excel Korean 지원
  const header = [
    '구분',
    '성함',
    '연락처',
    '참석 여부',
    '참석 인원',
    '식사 여부',
    '메시지',
    '작성일',
  ].join(',')
  const rows = entries.map((r) =>
    [
      r.side === 'groom' ? '신랑측' : '신부측',
      r.name,
      r.contact ?? '',
      r.attendance === 'attend' ? '참석' : '미참석',
      r.attendance === 'attend' ? r.headcount : '',
      r.attendance === 'attend'
        ? r.meal === 'yes'
          ? '식사함'
          : r.meal === 'no'
          ? '식사안함'
          : ''
        : '',
      r.message ?? '',
      new Date(r.createdAt).toLocaleString('ko-KR'),
    ]
      .map(csvCell)
      .join(',')
  )
  return BOM + [header, ...rows].join('\r\n')
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/* ============================================
   sub components
   ============================================ */

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex-1 px-4 py-2.5 text-sm font-medium transition-colors sm:flex-none ${
        active ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
      }`}
    >
      {label}
      {active && (
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-900" />
      )}
    </button>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-medium text-neutral-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border border-neutral-200 bg-white px-2 py-2 text-sm text-neutral-800 focus:border-neutral-400 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

type BarSpec = { label: string; value: number; color: string }
type BarGroup = { label: string; bars: BarSpec[] }

function StatBarCard({
  title,
  headline,
  sub,
  groups,
}: {
  title: string
  headline: string
  sub: string | undefined
  groups: BarGroup[]
}) {
  const maxValue = Math.max(
    1,
    ...groups.flatMap((g) => g.bars.map((b) => b.value))
  )
  const legend = groups[0]?.bars ?? []
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-base font-semibold text-neutral-900">
          {title}
        </h3>
      </div>
      <p className="mt-2 text-sm text-neutral-700">
        <strong className="font-semibold" style={{ color: 'var(--color-accent, #c9807f)' }}>
          {headline}
        </strong>
      </p>
      {sub && <p className="mt-0.5 text-[11px] text-neutral-500">{sub}</p>}

      <div className="mt-5 grid grid-cols-3 gap-3">
        {groups.map((g) => (
          <div key={g.label} className="flex flex-col items-center">
            <div className="flex h-24 items-end gap-1.5">
              {g.bars.map((b) => {
                const pct = (b.value / maxValue) * 100
                return (
                  <div
                    key={b.label}
                    className="flex flex-col items-center justify-end"
                  >
                    <span className="mb-0.5 text-[10px] font-semibold text-neutral-700 tabular-nums">
                      {b.value}
                    </span>
                    <div
                      className="w-6 rounded-t-md transition-all"
                      style={{
                        height: `${Math.max(pct, 6)}%`,
                        background: b.color,
                        minHeight: '4px',
                      }}
                    />
                  </div>
                )
              })}
            </div>
            <p className="mt-2 text-[11px] text-neutral-500">{g.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {legend.map((b, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 text-[10px] text-neutral-500"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: b.color }}
            />
            {b.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function RsvpTable({
  entries,
  onDelete,
}: {
  entries: RsvpEntry[]
  onDelete: (id: string) => void
}) {
  if (entries.length === 0) {
    return (
      <div className="mt-4 rounded-lg border border-dashed border-neutral-200 py-10 text-center">
        <p className="text-sm text-neutral-500">해당하는 응답이 없어요</p>
      </div>
    )
  }
  return (
    <div className="mt-4 -mx-5 overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-[13px]">
        <thead>
          <tr className="border-y border-neutral-200 bg-neutral-50/60 text-[11px] text-neutral-500">
            <th className="px-5 py-2.5 font-medium">구분</th>
            <th className="px-2 py-2.5 font-medium">성함</th>
            <th className="px-2 py-2.5 font-medium">참석 여부</th>
            <th className="px-2 py-2.5 font-medium">인원</th>
            <th className="px-2 py-2.5 font-medium">식사</th>
            <th className="px-2 py-2.5 font-medium">연락처</th>
            <th className="px-2 py-2.5 font-medium">메시지</th>
            <th className="px-5 py-2.5"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {entries.map((r) => (
            <tr key={r.id} className="hover:bg-neutral-50/60">
              <td className="px-5 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    r.side === 'groom'
                      ? 'bg-sky-50 text-sky-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {r.side === 'groom' ? '신랑측' : '신부측'}
                </span>
              </td>
              <td className="px-2 py-3 font-medium text-neutral-900">{r.name}</td>
              <td className="px-2 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    r.attendance === 'attend'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {r.attendance === 'attend' ? '참석' : '미참석'}
                </span>
              </td>
              <td className="px-2 py-3 text-neutral-700 tabular-nums">
                {r.attendance === 'attend' ? `${r.headcount}명` : '-'}
              </td>
              <td className="px-2 py-3 text-neutral-700">
                {r.attendance === 'attend'
                  ? r.meal === 'yes'
                    ? '식사함'
                    : r.meal === 'no'
                    ? '식사안함'
                    : '-'
                  : '-'}
              </td>
              <td className="px-2 py-3 text-neutral-500">{r.contact ?? '-'}</td>
              <td className="max-w-[240px] truncate px-2 py-3 text-neutral-600" title={r.message ?? ''}>
                {r.message ?? '-'}
              </td>
              <td className="px-5 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onDelete(r.id)}
                  aria-label="삭제"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 hover:bg-red-50 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GuestbookList({
  entries,
  onDelete,
}: {
  entries: GuestbookEntry[]
  onDelete: (id: string) => void
}) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 py-16 text-center">
        <p className="text-sm text-neutral-500">아직 방명록이 없어요</p>
      </div>
    )
  }
  return (
    <ul className="space-y-2">
      {entries.map((g) => (
        <li
          key={g.id}
          className="rounded-2xl border border-neutral-100 bg-white p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-neutral-900">{g.name}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-700 whitespace-pre-line">
                {g.message}
              </p>
              <p className="mt-2 text-[10px] text-neutral-400">
                {new Date(g.createdAt).toLocaleString('ko-KR')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDelete(g.id)}
              aria-label="삭제"
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-neutral-400 hover:bg-red-50 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
