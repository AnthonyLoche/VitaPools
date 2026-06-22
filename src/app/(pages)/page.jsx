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
} from "../components";

export default function Home() {
  return (
    <>
      <HeaderMain />
      <Reveal>
        <HeroMain />
      </Reveal>
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
        <CTASection />
      </Reveal>
      <Reveal>
        <FAQSection />
      </Reveal>
      <FooterMain />
    </>
  );
}
