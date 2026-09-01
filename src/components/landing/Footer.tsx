export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-white border-t border-neutral-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-bold text-neutral-900 text-lg mb-1" style={{ fontFamily: "'Noto Serif KR', serif" }}>청첩</p>
          <p className="text-xs text-neutral-400 font-sans">무료 모바일 청첩장 서비스</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {['서비스 소개', '개인정보처리방침', '이용약관', '고객센터'].map((item) => (
            <a key={item} href="#" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors font-sans">
              {item}
            </a>
          ))}
        </div>

        <p className="text-xs text-neutral-300 font-sans">© 2025 청첩</p>
      </div>
    </footer>
  )
}
