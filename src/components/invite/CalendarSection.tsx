import type { InvitationData } from '@/types/invitation'

type Props = { data: InvitationData }

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const lastDate = new Date(year, month, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= lastDate; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export default function CalendarSection({ data }: Props) {
  const [y, m, d] = data.ceremony.date.split('-').map(Number)
  const weeks = buildCalendar(y, m)
  const [hh] = data.ceremony.time.split(':').map(Number)
  const ampm = hh < 12 ? '오전' : '오후'
  const hour12 = hh > 12 ? hh - 12 : hh
  const targetDate = new Date(y, m - 1, d)
  const dayKo = WEEKDAYS[targetDate.getDay()]

  return (
    <section className="bg-white px-8 py-20">
      <div className="text-center">
        <p
          className="text-[11px] tracking-[0.5em] uppercase"
          style={{ color: 'var(--p-strong)', opacity: 0.8 }}
        >
          The Date
        </p>
        <h2 className="font-serif mt-3 text-xl font-medium text-neutral-800">
          예식일
        </h2>
        <div className="mx-auto mt-6 flex items-center justify-center gap-2">
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
          <span className="text-sm" style={{ color: 'var(--p-strong)' }}>
            ✿
          </span>
          <span className="h-px w-8" style={{ background: 'var(--p-mid)' }} />
        </div>
      </div>

      <div className="mt-10">
        <p className="font-serif text-center text-lg font-medium text-neutral-700">
          {y}. {String(m).padStart(2, '0')}
        </p>

        <div className="mt-6 grid grid-cols-7 gap-0 text-center">
          {WEEKDAYS.map((wd, i) => (
            <div
              key={wd}
              className={`pb-3 text-[11px] font-medium tracking-wider ${
                i === 0 ? 'text-rose-400' : i === 6 ? 'text-blue-400' : 'text-neutral-400'
              }`}
            >
              {wd}
            </div>
          ))}

          {weeks.flat().map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} className="py-2.5" />
            const isTarget = day === d
            const dayOfWeek = idx % 7
            return (
              <div
                key={day}
                className="relative flex items-center justify-center py-2.5"
              >
                {isTarget && (
                  <span
                    className="absolute inset-0 m-auto h-9 w-9 rounded-full"
                    style={{ background: 'var(--p-strong)' }}
                  />
                )}
                <span
                  className={`relative text-sm ${
                    isTarget
                      ? 'font-semibold text-white'
                      : dayOfWeek === 0
                      ? 'text-rose-400'
                      : dayOfWeek === 6
                      ? 'text-blue-400'
                      : 'text-neutral-700'
                  }`}
                >
                  {day}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="font-serif text-base text-neutral-700">
          {y}년 {m}월 {d}일 {dayKo}요일
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          {ampm} {hour12}시
        </p>
      </div>
    </section>
  )
}
