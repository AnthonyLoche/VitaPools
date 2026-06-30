// app/components/Diagnosis/Hero.jsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "@/assets/css/diagnosis/Hero.module.css";

const DiagnosisHero = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    tl.fromTo(badgeRef.current, 
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
      "-=0.4"
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 25, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
      "-=0.6"
    )
    .fromTo(waveRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2 },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.heroContent}>
        <span ref={badgeRef} className={styles.heroBadge}>
          Ferramentas Gratuitas
        </span>
        <h1 ref={titleRef} className={styles.heroTitle}>
          Diagnóstico da sua piscina
        </h1>
        <p ref={descriptionRef} className={styles.heroDescription}>
          Descubra o que se passa com a sua piscina em menos de 1 minuto, ou
          insira os valores da sua análise e saiba exatamente o que precisa de
          corrigir.
        </p>
      </div>
      <div ref={waveRef} className={styles.heroWave}></div>
    </section>
  );
};

export default DiagnosisHero;