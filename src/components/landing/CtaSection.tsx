import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="py-28 px-6 bg-neutral-900 relative overflow-hidden">
      {/* 배경 글로우 */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,220,200,0.07) 0%, transparent 70%)',
      }} />

      <div className="relative max-w-2xl mx-auto text-center">
        <p className="text-3xl mb-8">🌸</p>

        <h2 className="font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: "'Noto Serif KR', serif" }}>
          지금 바로 시작해보세요
        </h2>

        <p className="text-neutral-400 font-sans font-light text-base leading-relaxed mb-12">
          가입부터 공유까지 단 5분이면 충분해요<br />
          <strong className="text-neutral-200 font-medium">완전 무료 · 카드 등록 불필요</strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm font-bold font-sans transition-opacity hover:opacity-90"
            style={{ background: '#FEE500', color: '#111' }}>
            <span>💬</span> 카카오로 시작하기
          </Link>
          <Link href="/login"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white text-neutral-900 rounded-full text-sm font-bold font-sans hover:bg-neutral-100 transition-colors">
            <span>🔵</span> 구글로 시작하기
          </Link>
        </div>

        <p className="mt-10 text-neutral-600 text-xs font-sans">
          이미 <strong className="text-neutral-400">3,200+</strong>쌍의 커플이 청첩을 선택했어요
        </p>
      </div>
    </section>
  )
}
