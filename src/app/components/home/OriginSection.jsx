"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/home/OriginSection.module.css";
import originImage from "@/assets/images/gallery/img001.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Origin = () => {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const badgeRef = useRef(null);
  const quoteRef = useRef(null);
  const quoteTextRef = useRef(null);
  const quoteBodyRef = useRef(null);
  const signatureRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // --- IMAGEM (entrada da esquerda com rotação) ---
    gsap.fromTo(
      imageWrapperRef.current,
      {
        opacity: 0,
        x: isMobile ? -40 : -80,
        rotation: isMobile ? -3 : -8,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- BADGE ---
    gsap.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- QUOTE (container com borda) ---
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, x: isMobile ? 20 : 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- QUOTE TEXT (citação em itálico) ---
    gsap.fromTo(
      quoteTextRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- QUOTE BODY (texto principal) ---
    gsap.fromTo(
      quoteBodyRef.current,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- SIGNATURE ---
    gsap.fromTo(
      signatureRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- ATUALIZAR EM RESIZE ---
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.origin}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Imagem */}
          <div ref={imageWrapperRef} className={styles.imageWrapper}>
            <Image
              src={originImage}
              alt="Manhã calma junto a uma piscina, antes do tratamento diário"
              className={styles.image}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Texto */}
          <div className={styles.content}>
            <span ref={badgeRef} className={styles.badge}>
              Porque faço isto
            </span>

            <div ref={quoteRef} className={styles.quote}>
              <p ref={quoteTextRef} className={styles.quoteText}>
                Uma piscina não se resolve com pressa — observa-se a água,
                percebe-se o que ela está a dizer, e responde-se com calma.
              </p>

              <p ref={quoteBodyRef} className={styles.quoteBody}>
                Comecei a tratar piscinas por uma razão simples: gosto do tipo
                de atenção que isto exige. Há qualquer coisa de quase meditativo
                nisto — o silêncio de uma manhã antes de qualquer cliente
                acordar, a água a ganhar transparência aos poucos, o problema
                que parecia grande a desfazer-se com paciência e o produto
                certo, não com mais produto.
                <br />
                <br />
                Mais do que um serviço, é dedicação diária. Cuido da sua piscina
                com amor, porque sei que estou a preparar um cenário de memórias
                felizes.
              </p>
            </div>

            <div ref={signatureRef} className={styles.signature}>
              — Fundador, VitaPools
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origin;