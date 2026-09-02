import Link from 'next/link'

export default function CreateNewCard() {
  return (
    <Link
      href="/editor/new"
      className="group flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 transition-all hover:-translate-y-1 hover:border-neutral-300 hover:bg-white hover:shadow-lg hover:shadow-neutral-200/40"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full transition-colors group-hover:bg-white"
        style={{ background: 'var(--color-accent-soft, #f7ecec)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          style={{ color: 'var(--color-accent, #c9807f)' }}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
      <p className="font-serif mt-5 text-base font-semibold text-neutral-800">
        새 청첩장 만들기
      </p>
      <p className="mt-1.5 text-xs text-neutral-500">
        나만의 이야기를 담아보세요
      </p>
    </Link>
  )
}
