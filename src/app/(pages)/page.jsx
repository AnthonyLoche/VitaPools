import {
  HeaderMain,
  HeroMain,
  Reveal,
  BenefitsSection,
  ServicesSection,
  ProcessSection,
  FAQSection,
  FooterMain,
  CTASection,
  BeforeAfter,
  OriginSection,
} from "../components";

export default function Home() {
  return (
    <>
      <HeaderMain />
        <HeroMain />
      
      <Reveal>
        <BenefitsSection />
      </Reveal>
      <Reveal>
        <ServicesSection />
      </Reveal>
      <Reveal>
        <ProcessSection />
      </Reveal>
      <Reveal>
        <BeforeAfter />
      </Reveal>
      <Reveal>
        <CTASection />
      </Reveal>
      <Reveal>
        <OriginSection />
      </Reveal>

      <Reveal>
        <FAQSection />
      </Reveal>
      <FooterMain />
    </>
  );
}
