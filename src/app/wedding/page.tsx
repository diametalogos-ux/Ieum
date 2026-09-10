import type { Metadata } from 'next'
import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import PreviewImageSection from '@/components/landing/PreviewImageSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import ThemesSection from '@/components/landing/ThemesSection'
import CtaSection from '@/components/landing/CtaSection'
import Footer from '@/components/landing/Footer'
import LandingFloatingCta from '@/components/landing/LandingFloatingCta'

const OG_TITLE = '이음 · 고급 무료 모바일 청첩장'
const OG_DESC =
  '워터마크 없는 감성 모바일 청첩장. 제작부터 공유, 수정, 평생 소장까지 완전 무료로 만들어보세요.'

export const metadata: Metadata = {
  title: OG_TITLE,
  description: OG_DESC,
  keywords: [
    '모바일 청첩장',
    '무료 모바일 청첩장',
    '고급 모바일 청첩장',
    '감성 청첩장',
    '청첩장 제작',
    '이음',
    'Ieum',
  ],
  alternates: {
    canonical: '/wedding',
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    type: 'website',
    url: 'https://ieum-log.shop/wedding',
    siteName: '이음 (Ieum)',
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESC,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://ieum-log.shop/#website',
      url: 'https://ieum-log.shop',
      name: '이음 (Ieum)',
      inLanguage: 'ko-KR',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://ieum-log.shop/wedding#webpage',
      url: 'https://ieum-log.shop/wedding',
      name: OG_TITLE,
      description: OG_DESC,
      inLanguage: 'ko-KR',
      isPartOf: { '@id': 'https://ieum-log.shop/#website' },
    },
    {
      '@type': 'Service',
      name: '이음 모바일 청첩장',
      serviceType: '모바일 청첩장 제작',
      provider: { '@type': 'Organization', name: '이음 (Ieum)' },
      areaServed: 'KR',
      description: OG_DESC,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KRW',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <HeroSection />
      <PreviewImageSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ThemesSection />
      <CtaSection />
      <Footer />
      <LandingFloatingCta />
    </main>
  )
}
