const steps = [
  {
    num: '01',
    title: '테마 고르기',
    desc: '두 사람에게 어울리는\n메인 테마를 선택하세요',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: '정보 입력',
    desc: '두 사람의 이야기, 예식 정보,\n사진을 자유롭게 담아보세요',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '링크로 공유',
    desc: '완성된 청첩장을 링크 하나로\n소중한 분들께 전해보세요',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    ),
  },
]

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
            How It Works
          </p>
          <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl">
            5분이면 충분해요
          </h2>
          <p className="mt-5 text-base text-neutral-500">
            어려운 준비 없이, <br/> 세 단계로 완성되는 우리의 이야기
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          <div
            aria-hidden
            className="absolute top-8 left-[16%] right-[16%] hidden h-px md:block"
            style={{
              background:
                'linear-gradient(to right, transparent, #e5e7eb 20%, #e5e7eb 80%, transparent)',
            }}
          />

          {steps.map((s) => (
            <div key={s.num} className="relative flex flex-col items-center text-center">
              <div
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-100"
                style={{ color: 'var(--color-accent)' }}
              >
                {s.icon}
              </div>
              <p className="font-serif mt-5 text-xs font-medium tracking-[0.3em] text-neutral-400">
                STEP {s.num}
              </p>
              <h3 className="font-serif mt-2 text-lg font-semibold text-neutral-900">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[220px] whitespace-pre-line text-sm leading-relaxed text-neutral-500">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
