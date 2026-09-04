import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import ThemesSection from '@/components/landing/ThemesSection'
import SamplePreviewSection from '@/components/landing/SamplePreviewSection'
import CtaSection from '@/components/landing/CtaSection'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ThemesSection />
      <SamplePreviewSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
