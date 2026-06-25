import {
  HeaderMain,
  HeroMain,
  Welcome,
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
      
      {/* Welcome - ocupa 100vh com logo e ondas */}
      <Welcome />

      {/* Hero com altura fixa e overflow hidden para capturar scroll */}
      <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <HeroMain />
      </div>

      {/* Conteúdo com margin-top para aparecer depois do hero */}
      <div style={{ marginTop: '0px', position: 'relative', zIndex: 2, background: '#f7f9fc' }}>
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
      </div>
    </>
  );
}