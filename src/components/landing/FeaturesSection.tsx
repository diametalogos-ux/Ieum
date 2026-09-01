'use client'

import { useEffect, useRef, useState } from 'react'

const coreFeatures = [
  { icon: '✏️', title: '무제한 수정',  desc: '언제든 자유롭게 수정하고\n실시간으로 반영됩니다', bg: '#f8f4ff' },
  { icon: '🚫', title: '워터마크 없음', desc: '광고 없이 깔끔하게\n공유할 수 있어요',      bg: '#fff8f0' },
  { icon: '💌', title: '3개까지 제작',  desc: '여러 버전의 청첩장을\n자유롭게 만들어요',   bg: '#f0fbf4' },
  { icon: '♾️', title: '평생 소장',     desc: '결혼 후에도 영원히\n간직할 수 있어요',     bg: '#fff0f5' },
]

const addons = [
  { icon: '💬', label: '인사말' },
  { icon: '📅', label: '디데이' },
  { icon: '⏱️', label: '카운트다운' },
  { icon: '🖼️', label: '갤러리' },
  { icon: '🚌', label: '교통 안내' },
  { icon: '📢', label: '공지사항' },
  { icon: '💳', label: '계좌 안내' },
  { icon: '📝', label: '방명록' },
  { icon: '✅', label: '참석 여부' },
  { icon: '📷', label: '포토드롭' },
  { icon: '🎵', label: '배경음악' },
  { icon: '💐', label: '화환 주문' },
]

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

export default function FeaturesSection() {
  const { ref, visible } = useInView()

  return (
    <section id="features" className="py-28 px-6" style={{ background: '#fafafa' }}>
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-xs font-sans text-neutral-400 tracking-[0.2em] uppercase mb-5">Features</p>
          <h2 className="font-bold text-neutral-900 leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: "'Noto Serif KR', serif" }}>
            청첩에서는<br />모든 것이 무료예요
          </h2>
          <p className="text-neutral-500 font-sans font-light text-base max-w-md mx-auto leading-relaxed">
            숨겨진 비용 없이, 필요한 모든 기능을 제한 없이 사용하세요
          </p>
        </div>

        {/* 핵심 4가지 */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {coreFeatures.map((f, i) => (
            <div key={i}
              className="rounded-2xl p-7 text-center transition-all duration-700"
              style={{
                background: f.bg,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-neutral-900 text-sm md:text-base mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>{f.title}</h3>
              <p className="text-xs md:text-sm text-neutral-500 font-sans leading-relaxed whitespace-pre-line">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* 부가기능 */}
        <div className="bg-white rounded-3xl p-8 md:p-12" style={{ border: '1px solid #f0f0f0' }}>
          <div className="text-center mb-8">
            <h3 className="font-bold text-neutral-900 text-xl md:text-2xl mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              풍부한 부가기능까지
            </h3>
            <p className="text-sm text-neutral-400 font-sans">필요한 것만 골라 청첩장을 완성하세요</p>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {addons.map((a) => (
              <span key={a.label}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-sans font-medium text-neutral-600 bg-neutral-50 border border-neutral-100 hover:border-neutral-300 transition-colors">
                <span className="text-base">{a.icon}</span>
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
