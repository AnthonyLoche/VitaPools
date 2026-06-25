"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/home/BeforeAfter.module.css";
import before1 from "@/assets/images/before1.jpeg";
import after1 from "@/assets/images/after1.jpeg";
import before2 from "@/assets/images/before2.jpeg";
import after2 from "@/assets/images/after2.jpeg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BeforeAfter = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);

  const results = [
    {
      id: 1,
      title: "Recuperação Intensiva",
      description: '"A água estava verde há meses. Em apenas 48h a VitaPools deixou-a pronta para uso."',
      beforeImage: before1,
      afterImage: after1,
      beforeAlt: "Piscina verde antes do tratamento",
      afterAlt: "Piscina cristalina depois do tratamento",
    },
    {
      id: 2,
      title: "Limpeza de Resíduos",
      description: '"Fundo e paredes completamente aspirados e higienizados. Trabalho impecável."',
      beforeImage: before2,
      afterImage: after2,
      beforeAlt: "Piscina suja antes da limpeza",
      afterAlt: "Piscina limpa depois da limpeza",
    },
  ];

  useEffect(() => {
    const cards = cardRefs.current;
    const isMobile = window.innerWidth < 768;

    // --- TÍTULO ---
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- SUBTÍTULO ---
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- CARDS ---
    cards.forEach((card, index) => {
      // Card inteiro
      const fromX = isMobile ? (index % 2 === 0 ? -60 : 60) : 0;
      const fromY = isMobile ? 0 : (index % 2 === 0 ? -50 : 50);
      const rotation = isMobile ? (index % 2 === 0 ? -5 : 5) : 0;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: fromX,
          y: fromY,
          rotation: rotation,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.8,
          delay: index * 0.2 + 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Imagens dentro do card (before e after)
      const images = card.querySelectorAll(`.${styles.image}`);
      if (images.length) {
        images.forEach((img, imgIndex) => {
          const fromXImg = imgIndex === 0 ? -40 : 40;
          gsap.fromTo(
            img,
            {
              opacity: 0,
              x: fromXImg,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.2 + 0.3 + imgIndex * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // Badges (Antes/Depois)
      const badges = card.querySelectorAll(`.${styles.badge}`);
      if (badges.length) {
        badges.forEach((badge, badgeIndex) => {
          gsap.fromTo(
            badge,
            {
              opacity: 0,
              y: -20,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              delay: index * 0.2 + 0.5 + badgeIndex * 0.1,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // Título do card
      const cardTitle = card.querySelector(`.${styles.cardTitle}`);
      if (cardTitle) {
        gsap.fromTo(
          cardTitle,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.2 + 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Descrição do card
      const cardDesc = card.querySelector(`.${styles.cardDescription}`);
      if (cardDesc) {
        gsap.fromTo(
          cardDesc,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.2 + 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

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
    <section ref={sectionRef} className={styles.beforeAfter}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 ref={titleRef} className={styles.title}>
            Resultados que Impressionam
          </h2>
          <p ref={subtitleRef} className={styles.subtitle}>
            Veja a transformação radical em algumas das nossas intervenções recentes.
          </p>
        </div>

        <div className={styles.grid}>
          {results.map((result, index) => (
            <div
              key={result.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                {/* Before */}
                <div className={styles.imageHalf}>
                  <Image
                    src={result.beforeImage}
                    alt={result.beforeAlt}
                    className={styles.image}
                    fill
                  />
                  <span className={`${styles.badge} ${styles.badgeBefore}`}>Antes</span>
                </div>

                {/* After */}
                <div className={styles.imageHalf}>
                  <Image
                    src={result.afterImage}
                    alt={result.afterAlt}
                    className={styles.image}
                    fill
                  />
                  <span className={`${styles.badge} ${styles.badgeAfter}`}>Depois</span>
                </div>
              </div>

              <div className={styles.content}>
                <h4 className={styles.cardTitle}>{result.title}</h4>
                <p className={styles.cardDescription}>{result.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;