const footerLinks = [
  { label: '서비스 소개', href: '#' },
  { label: '개인정보처리방침', href: '#' },
  { label: '이용약관', href: '#' },
  { label: '고객센터', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:px-8">
        <div className="text-center md:text-left">
          <p className="font-serif text-lg font-semibold text-neutral-900">
            이음
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            무료 모바일 청첩장 서비스
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footerLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-neutral-400">© 2026 이음 (Ieum)</p>
      </div>
    </footer>
  )
}
