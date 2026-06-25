"use client";

import React, { useEffect, useRef } from "react";
import {
  UserSearch,
  Wrench,
  Package,
  Waves,
  Shield,
  BadgeCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/home/BenefitsSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Benefits = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const dividerRef = useRef(null);
  const cardRefs = useRef([]);

  const benefits = [
    {
      icon: UserSearch,
      title: "Atendimento personalizado",
      description: "Soluções adaptadas às necessidades específicas da sua piscina e frequência de uso.",
    },
    {
      icon: Wrench,
      title: "Especialistas em manutenção",
      description: "Equipa técnica qualificada com anos de experiência no setor de tratamento de águas.",
    },
    {
      icon: Package,
      title: "Produtos de qualidade",
      description: "Utilizamos apenas químicos certificados de alta performance para garantir a segurança dos banhistas.",
    },
    {
      icon: Waves,
      title: "Recuperação de água verde",
      description: "Transformamos águas turvas e verdes em cristais líquidos em tempo recorde.",
    },
    {
      icon: Shield,
      title: "Manutenção preventiva",
      description: "Evite reparações dispendiosas com o nosso plano de acompanhamento regular.",
    },
    {
      icon: BadgeCheck,
      title: "Rapidez e confiança",
      description: "Compromisso total com prazos e a máxima transparência em cada intervenção.",
    },
  ];

  useEffect(() => {
    const cards = cardRefs.current;
    const isMobile = window.innerWidth < 768;

    // --- TÍTULO E DIVIDER ---
    gsap.fromTo(
      [titleRef.current, dividerRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- CARDS ---
    // Divide os cards em duas metades: primeira linha (0-2) e segunda linha (3-5)
    const firstRow = cards.slice(0, 3);
    const secondRow = cards.slice(3, 6);

    // Configuração de entrada por tipo de dispositivo
    const getCardAnimation = (card, index, total) => {
      const isFirstRow = index < 3;
      const isMobileDevice = window.innerWidth < 768;

      if (isMobileDevice) {
        // Mobile: intercalado esquerda/direita
        const fromLeft = index % 2 === 0;
        return {
          opacity: 0,
          x: fromLeft ? -80 : 80,
          y: 0,
        };
      } else {
        // Desktop: primeira linha vem de cima, segunda de baixo
        return {
          opacity: 0,
          y: isFirstRow ? -60 : 60,
          x: 0,
        };
      }
    };

    // Animação de entrada dos cards
    cards.forEach((card, index) => {
      const from = getCardAnimation(card, index, cards.length);
      
      gsap.fromTo(
        card,
        from,
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
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
    <section ref={sectionRef} className={styles.benefits}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 ref={titleRef} className={styles.title}>
            Porquê escolher a VitaPools?
          </h2>
          <div ref={dividerRef} className={styles.divider}></div>
        </div>

        {/* Grid de Benefícios */}
        <div className={styles.grid}>
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={styles.card}
              >
                <IconComponent className={styles.icon} size={36} strokeWidth={1.5} />
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;