import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { IntroSection } from '../components/IntroSection'
import { BenefitsSection } from '../components/BenefitsSection'
import { WhyTasaiSection } from '../components/WhyTasaiSection'
import { AgeGroupsSection } from '../components/AgeGroupsSection'
import { TrialSection } from '../components/TrialSection'
import { PricingSection } from '../components/PricingSection'
import { PathRibbon } from '../components/PathRibbon'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { FaqSection } from '../components/FaqSection'
import { ContactForm } from '../components/ContactForm'
import { Footer } from '../components/Footer'
import { PageDecor } from '../components/PageDecor'

export function HomePage() {
  return (
    <div
      id="top"
      className="relative w-full overflow-x-clip bg-[#3a3330] max-md:min-h-0 max-md:overflow-x-visible md:mx-auto md:h-auto md:min-h-[12584px] md:w-[1440px] md:overflow-x-visible"
      data-node-id="427:4126"
      data-name="Main"
    >
      <Header className="full-bleed-sticky sticky top-0 z-50 flex h-[58px] w-full content-stretch items-center justify-between bg-[rgba(38,33,30,0.55)] px-[14px] backdrop-blur-[8px] transition-colors hover:bg-[#26211e] md:h-[80px] md:px-[48px]" />
      <div className="hidden md:contents">
        <PageDecor />
      </div>
      <HeroSection />
      <IntroSection />
      <BenefitsSection />
      <WhyTasaiSection />
      <div
        className="relative flex w-full flex-col items-stretch content-stretch max-md:mt-0 md:absolute md:top-[4184px] md:left-0 md:w-[1440px] md:items-start"
        data-node-id="427:4460"
      >
        <AgeGroupsSection />
        <TrialSection />
        <PricingSection />
        <PathRibbon />
        <TestimonialsSection />
        <FaqSection />
        <div id="contact" className="relative scroll-mt-[58px] md:scroll-mt-[80px]">
          <ContactForm />
        </div>
        <Footer className="full-bleed-bg relative z-10 shrink-0" />
      </div>
    </div>
  )
}
