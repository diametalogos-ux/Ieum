const coreFeatures = [
  {
    icon: '✎',
    title: '무제한 수정',
    desc: '언제든 자유롭게 수정하고 실시간으로 반영됩니다',
  },
  {
    icon: '✦',
    title: '워터마크 없음',
    desc: '광고 없이 깔끔하게 공유할 수 있어요',
  },
  {
    icon: '❋',
    title: '3개까지 제작',
    desc: '여러 버전의 청첩장을 자유롭게 만들어요',
  },
  {
    icon: '∞',
    title: '평생 소장',
    desc: '결혼 후에도 영원히 간직할 수 있어요',
  },
]

const addons = [
  '인사말',
  '디데이',
  '카운트다운',
  '갤러리',
  '교통 안내',
  '공지사항',
  '계좌 안내',
  '방명록',
  '참석 여부',
  '포토드롭',
  '배경음악',
  '화환 주문',
]

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-neutral-50 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
            Features
          </p>
          <h2 className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-4xl">
            청첩에서는
            <br />
            모든 것이 무료예요
          </h2>
          <p className="mt-5 text-base text-neutral-500">
            숨겨진 비용 없이, 필요한 모든 기능을 제한 없이 사용하세요
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-neutral-100 bg-white p-8 transition-all hover:-translate-y-1 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-200/40"
            >
              <div className="font-serif flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-2xl text-rose-400">
                {f.icon}
              </div>
              <h3 className="font-serif mt-6 text-lg font-semibold text-neutral-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-neutral-100 bg-white px-6 py-12 md:px-12">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="font-serif text-xl font-semibold text-neutral-900 md:text-2xl">
              풍부한 부가기능까지
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              필요한 것만 골라 청첩장을 완성하세요
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {addons.map((a) => (
              <span
                key={a}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-white"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
