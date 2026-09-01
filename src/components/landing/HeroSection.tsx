'use client'

import Link from 'next/link'

function PhoneMockup() {
  return (
    <div className="relative w-[200px] md:w-[240px] flex-shrink-0">
      {/* 폰 외형 */}
      <div className="relative bg-neutral-900 rounded-[40px] p-3 shadow-2xl" style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)' }}>
        {/* 화면 */}
        <div className="rounded-[30px] overflow-hidden" style={{ background: 'linear-gradient(170deg, #fdf6f0 0%, #f7eaf4 100%)', minHeight: 400 }}>
          {/* 노치 */}
          <div className="w-16 h-4 bg-neutral-900 rounded-b-2xl mx-auto" />

          <div className="flex flex-col items-center px-4 py-4 gap-3">
            {/* 날짜 */}
            <p className="text-[9px] text-neutral-400 tracking-[0.2em] font-sans">2025 · 10 · 18</p>

            {/* 사진 플레이스홀더 */}
            <div className="w-full rounded-2xl flex items-center justify-center text-3xl" style={{ height: 130, background: 'linear-gradient(135deg, #e8d5c4 0%, #d4b8c8 100%)' }}>
              📷
            </div>

            {/* 이름 */}
            <p className="text-sm font-bold text-neutral-800 tracking-wide" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              김민준 ♥ 이서연
            </p>

            {/* 날짜/장소 */}
            <div className="text-center">
              <p className="text-[9px] text-neutral-500 font-sans leading-5">2025년 10월 18일 토요일 오후 2시</p>
              <p className="text-[9px] text-neutral-400 font-sans">그랜드 웨딩홀 2층 로즈홀</p>
            </div>

            {/* 구분선 */}
            <div className="w-12 h-px bg-neutral-200" />

            {/* 미니 버튼들 */}
            <div className="flex gap-2">
              {['갤러리', '오시는길', '방명록'].map((label) => (
                <div key={label} className="text-[8px] font-sans px-2 py-1 rounded-full bg-neutral-100 text-neutral-500">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 홈 인디케이터 */}
      <div className="w-20 h-1 bg-neutral-700 rounded-full mx-auto mt-2" />
    </div>
  )
}

function PetalRain() {
  const petals = [
    { left: '8%',  delay: '0s',   dur: '8s'  },
    { left: '22%', delay: '2s',   dur: '7s'  },
    { left: '40%', delay: '0.8s', dur: '9s'  },
    { left: '58%', delay: '3s',   dur: '7.5s'},
    { left: '74%', delay: '1.5s', dur: '8.5s'},
    { left: '88%', delay: '4s',   dur: '8s'  },
  ]
  return (
    <>
      {petals.map((p, i) => (
        <span key={i} className="absolute top-0 pointer-events-none select-none text-sm opacity-50"
          style={{ left: p.left, animation: `petalFall ${p.dur} linear ${p.delay} infinite` }}>
          🌸
        </span>
      ))}
    </>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" style={{ background: '#fff' }}>
      <PetalRain />

      <div className="max-w-6xl mx-auto px-6 w-full py-20 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* 좌측 텍스트 */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block text-xs font-sans text-neutral-400 tracking-[0.2em] uppercase mb-6">
            Free · No Watermark · Forever
          </span>

          <h1 className="font-bold leading-tight text-neutral-900 mb-6" style={{
            fontSize: 'clamp(38px, 5.5vw, 64px)',
            fontFamily: "'Noto Serif KR', serif",
            letterSpacing: '-1.5px',
          }}>
            우리의 시작을<br />
            <span className="text-neutral-400">가장</span> 아름답게
          </h1>

          <p className="text-base md:text-lg text-neutral-500 leading-relaxed mb-10 font-sans font-light">
            제작부터 공유, 수정, 평생 소장까지<br />
            <strong className="text-neutral-800 font-semibold">추가 비용 없이 모두 무료</strong>로 제공합니다
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link href="/login"
              className="inline-block px-8 py-4 bg-neutral-900 text-white rounded-full text-sm font-semibold font-sans hover:bg-neutral-700 transition-colors text-center"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
              청첩장 무료 제작하기
            </Link>
            <Link href="/invite/sample"
              className="inline-block px-8 py-4 border border-neutral-200 text-neutral-700 rounded-full text-sm font-medium font-sans hover:border-neutral-400 transition-colors text-center">
              샘플 자세히 보기
            </Link>
          </div>

          {/* 통계 */}
          <div className="flex justify-center md:justify-start gap-10 mt-14 pt-10 border-t border-neutral-100">
            {[
              { num: '3,200+', label: '커플이 선택' },
              { num: '100%',   label: '완전 무료'   },
              { num: '10+',    label: '감성 테마'   },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl font-bold text-neutral-900" style={{ fontFamily: "'Noto Serif KR', serif" }}>{s.num}</p>
                <p className="text-xs text-neutral-400 font-sans mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 폰 목업 */}
        <div className="flex-shrink-0 phone-float">
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}
