import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'

export const metadata: Metadata = {
  title: '이음 (Ieum) — 무료 모바일 청첩장',
  description: '제작부터 공유, 수정, 평생 소장까지 완전 무료. 워터마크 없는 감성 모바일 청첩장.',
  openGraph: {
    title: '이음 (Ieum) — 무료 모바일 청첩장',
    description: '제작부터 공유, 수정, 평생 소장까지 완전 무료.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Noto+Serif+KR:wght@400;500;600;700&family=Nanum+Myeongjo:wght@400;700;800&family=Gowun+Batang:wght@400;700&family=Gowun+Dodum&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
