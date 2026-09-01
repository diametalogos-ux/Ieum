'use client'

const themes = [
  { name: 'Romantic',  emoji: '🌹', grad: 'linear-gradient(150deg,#fff0f4 0%,#fddde6 100%)' },
  { name: 'Modern',    emoji: '🖤', grad: 'linear-gradient(150deg,#f5f5f5 0%,#e8e8e8 100%)' },
  { name: 'Garden',    emoji: '🌿', grad: 'linear-gradient(150deg,#f0f9f0 0%,#ddf0dd 100%)' },
  { name: 'Vintage',   emoji: '🕊️', grad: 'linear-gradient(150deg,#fdf8ee 0%,#f0e4c8 100%)' },
  { name: 'Minimal',   emoji: '✨', grad: 'linear-gradient(150deg,#fafafa 0%,#efefef 100%)' },
  { name: 'Luxury',    emoji: '👑', grad: 'linear-gradient(150deg,#fefae8 0%,#f0e0b0 100%)' },
  { name: 'Bohemian',  emoji: '🌙', grad: 'linear-gradient(150deg,#fdf0e8 0%,#edd8c4 100%)' },
  { name: 'Classic',   emoji: '💙', grad: 'linear-gradient(150deg,#eef3fc 0%,#d4e4f8 100%)' },
  { name: 'Floral',    emoji: '🌸', grad: 'linear-gradient(150deg,#fdf0f8 0%,#f4d4ec 100%)' },
  { name: 'Elegant',   emoji: '💜', grad: 'linear-gradient(150deg,#f5f0fc 0%,#e4d4f8 100%)' },
]

export default function ThemesSection() {
  return (
    <section id="themes" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-xs font-sans text-neutral-400 tracking-[0.2em] uppercase mb-5">Themes</p>
          <h2 className="font-bold text-neutral-900 leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: "'Noto Serif KR', serif" }}>
            우리 스타일에 맞는<br />테마를 골라보세요
          </h2>
          <p className="text-neutral-500 font-sans font-light text-base">
            10가지 감성 테마, 모두 무료로 제공해요
          </p>
        </div>

        {/* 테마 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {themes.map((t, i) => (
            <div key={i} className="hover-lift rounded-2xl overflow-hidden cursor-pointer" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              {/* 미리보기 */}
              <div className="flex flex-col items-center justify-center gap-3 py-8 px-4" style={{ background: t.grad, minHeight: 150 }}>
                <span className="text-3xl">{t.emoji}</span>
                <div className="flex flex-col items-center gap-1.5 w-full">
                  <div className="h-1.5 rounded-full bg-black/10 w-3/4" />
                  <div className="h-1   rounded-full bg-black/07 w-1/2" />
                  <div className="h-1   rounded-full bg-black/07 w-2/3" />
                </div>
              </div>
              {/* 이름 */}
              <div className="py-3 text-center bg-white border-t border-neutral-100">
                <span className="text-xs font-semibold font-sans text-neutral-500 tracking-wider uppercase">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-xs text-neutral-300 font-sans">
          더 다양한 테마가 계속 추가될 예정이에요 ✨
        </p>
      </div>
    </section>
  )
}
