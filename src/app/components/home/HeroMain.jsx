"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/home/HeroMain.module.css";
import hero_video from "@/assets/videos/jumping.mp4";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroMain = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRefs = useRef({
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const steps = contentRefs.current;
      const cards = steps.step3?.querySelectorAll(`.${styles.floatingCard}`);

      // --- FADE IN AUTOMÁTICO DO STEP 1 (AO CARREGAR) ---
      gsap.set(steps.step1, { opacity: 0, y: 20 });
      
      gsap.to(steps.step1, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.3,
      });

      // Configuração dos outros steps
      gsap.set([steps.step2, steps.step3, steps.step4, steps.step5], {
        opacity: 0,
        y: 30,
      });
      
      if (cards) gsap.set(cards, { opacity: 0, y: 40, scale: 0.92 });

      // --- TIMELINE COM SNAP ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%", // 5 steps
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // SNAP: cada scroll = um step
          snap: {
            snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1],
            duration: 0.5,
            ease: "power2.inOut",
          },
        },
        defaults: { ease: "power2.inOut" },
      });

      // --- STEP 1 (0% - 20%) ---
      // Fade out do step1
      tl.to(steps.step1, { opacity: 0, y: -20, duration: 0.3 }, 0.1);
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }, 0.15);

      // --- STEP 2 (20% - 40%) ---
      tl.fromTo(
        steps.step2,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.2
      );
      tl.to(steps.step2, { opacity: 0, y: -20, duration: 0.3 }, 0.4);

      // --- STEP 3 (40% - 60%) ---
      tl.fromTo(
        steps.step3,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.45
      );

      if (cards) {
        tl.to(
          cards,
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.3 },
          0.5
        );
        tl.to(
          cards,
          { opacity: 0, y: -20, stagger: 0.08, duration: 0.2 },
          0.65
        );
      }

      tl.to(steps.step3, { opacity: 0, y: -20, duration: 0.3 }, 0.7);

      // --- STEP 4 (60% - 80%) ---
      tl.fromTo(
        steps.step4,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.75
      );

      tl.to(
        videoRef.current,
        { filter: "brightness(1.1) contrast(1.02)", duration: 0.5 },
        0.75
      );

      tl.to(steps.step4, { opacity: 0, y: -20, duration: 0.3 }, 0.95);
      tl.to(overlayRef.current, { opacity: 0.4, duration: 0.4 }, 0.98);

      // --- STEP 5 (80% - 100%) ---
      tl.fromTo(
        steps.step5,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.0
      );

      tl.to(
        videoRef.current,
        { filter: "brightness(1.25) contrast(1.05) saturate(1.05)", duration: 0.5 },
        1.05
      );

      // --- INDICADORES DE PROGRESSO (opcional) ---
      // Adiciona pontos/bolinhas para mostrar em qual step está
      const totalSteps = 5;
      const progressDots = document.querySelectorAll(`.${styles.progressDot}`);
      
      if (progressDots.length) {
        tl.call(() => {
          progressDots.forEach((dot, i) => {
            const progress = (i / (totalSteps - 1));
            const isActive = Math.abs(progress - tl.progress()) < 0.12;
            dot.classList.toggle(styles.active, isActive);
          });
        }, [], 0);
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.hero} id="inicio">
      {/* ===== VÍDEO ===== */}
      <div className={styles.heroBackground}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroImage}
        >
          <source src={hero_video} type="video/mp4" />
        </video>
        <div ref={overlayRef} className={styles.heroOverlay}></div>
      </div>

      {/* ===== STEP 1 ===== */}
      <div
        ref={(el) => (contentRefs.current.step1 = el)}
        className={`${styles.heroContent} ${styles.contentStep}`}
      >
        <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <span className={styles.heroBadge}>VitaPools</span>
            <h1 className={styles.heroTitle}>
              Manutenção e Limpeza de Piscinas
            </h1>
            <p className={styles.heroDescription}>
              Tratamento, manutenção e recuperação da sua piscina com qualidade,
              confiança e profissionalismo.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/budget" className={styles.primaryButton}>
                Pedir Orçamento
              </Link>
              <Link href="/services" className={styles.secondaryButton}>
                Ver Serviços
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== STEP 2 ===== */}
      <div
        ref={(el) => (contentRefs.current.step2 = el)}
        className={`${styles.heroContent} ${styles.contentStep} ${styles.contentDark}`}
      >
        <div className={styles.heroContainer}>
          <div className={`${styles.heroText} ${styles.heroTextCentered}`}>
            <h2 className={styles.stepTitle}>
              A água da sua piscina merece atenção especializada.
            </h2>
            <p className={styles.stepDescription}>
              Analisamos, tratamos e equilibramos a água para garantir segurança
              e qualidade.
            </p>
          </div>
        </div>
      </div>

      {/* ===== STEP 3 ===== */}
      <div
        ref={(el) => (contentRefs.current.step3 = el)}
        className={`${styles.heroContent} ${styles.contentStep} ${styles.contentDark}`}
      >
        <div className={styles.heroContainer}>
          <div className={`${styles.heroText} ${styles.heroTextCentered}`}>
            <h2 className={styles.stepTitle}>
              Manutenção profissional e preventiva
            </h2>
            <p className={styles.stepDescription}>
              Evite problemas, reduza custos e mantenha a sua piscina sempre
              pronta a utilizar.
            </p>
            <div className={styles.floatingCards}>
              <div className={styles.floatingCard}>
                <span className={styles.cardIcon}>✓</span>
                <span className={styles.cardLabel}>Limpeza</span>
              </div>
              <div className={styles.floatingCard}>
                <span className={styles.cardIcon}>✓</span>
                <span className={styles.cardLabel}>Tratamento</span>
              </div>
              <div className={styles.floatingCard}>
                <span className={styles.cardIcon}>✓</span>
                <span className={styles.cardLabel}>Manutenção</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== STEP 4 ===== */}
      <div
        ref={(el) => (contentRefs.current.step4 = el)}
        className={`${styles.heroContent} ${styles.contentStep} ${styles.contentDark}`}
      >
        <div className={styles.heroContainer}>
          <div className={`${styles.heroText} ${styles.heroTextCentered}`}>
            <h2 className={styles.stepTitle}>
              Transformamos piscinas em espaços perfeitos para desfrutar.
            </h2>
            <p className={styles.stepDescription}>
              Serviço profissional, acompanhamento contínuo e resultados
              visíveis.
            </p>
          </div>
        </div>
      </div>

      {/* ===== STEP 5 (final) ===== */}
      <div
        ref={(el) => (contentRefs.current.step5 = el)}
        className={`${styles.heroContent} ${styles.contentStep} ${styles.contentFinal}`}
      >
        <div className={styles.heroContainer}>
          <div className={`${styles.heroText} ${styles.heroTextCentered}`}>
            <h2 className={styles.finalTitle}>
              Água cristalina. <br />
              Tranquilidade garantida.
            </h2>
            <div className={styles.finalButtons}>
              <Link href="/budget" className={styles.primaryButton}>
                Solicitar Orçamento
              </Link>
              <Link href="/services" className={styles.secondaryButton}>
                Conhecer Serviços
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PROGRESS DOTS ===== */}
      <div className={styles.progressDots}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.progressDot} />
        ))}
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
};

export default HeroMain;