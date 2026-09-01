import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import ThemesSection from '@/components/landing/ThemesSection'
import ReviewsSection from '@/components/landing/ReviewsSection'
import CtaSection from '@/components/landing/CtaSection'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ThemesSection />
      <ReviewsSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
