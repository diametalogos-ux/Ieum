import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '청첩 — 무료 모바일 청첩장',
  description: '제작부터 공유, 수정, 평생 소장까지 완전 무료. 워터마크 없는 감성 모바일 청첩장.',
  openGraph: {
    title: '청첩 — 무료 모바일 청첩장',
    description: '제작부터 공유, 수정, 평생 소장까지 완전 무료.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Nanum+Myeongjo:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
