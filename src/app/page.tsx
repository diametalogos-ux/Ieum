import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/HeroSection'
import PreviewImageSection from '@/components/landing/PreviewImageSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import ThemesSection from '@/components/landing/ThemesSection'
import CtaSection from '@/components/landing/CtaSection'
import Footer from '@/components/landing/Footer'
import LandingFloatingCta from '@/components/landing/LandingFloatingCta'

export default function HomePage() {
  return (
    <main>
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
