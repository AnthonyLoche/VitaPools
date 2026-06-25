"use client";

import React, { useEffect, useRef } from "react";
import {
  PenTool,
  Search,
  CheckCircle,
  Droplets,
} from "lucide-react";
import Wavify from "react-wavify";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/home/ProcessSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const stepRefs = useRef([]);
  const connectorRef = useRef(null);

  const steps = [
    {
      id: 1,
      title: "Pedido de orçamento",
      description: "Contacte-nos com os detalhes da sua piscina e localização.",
      icon: PenTool,
    },
    {
      id: 2,
      title: "Análise da piscina",
      description: "Avaliamos o estado da água e equipamentos presencialmente.",
      icon: Search,
    },
    {
      id: 3,
      title: "Execução do serviço",
      description: "Realizamos a intervenção com máxima eficiência e limpeza.",
      icon: CheckCircle,
    },
    {
      id: 4,
      title: "Piscina pronta",
      description: "Desfrute da sua piscina com total tranquilidade e segurança.",
      icon: Droplets,
    },
  ];

  useEffect(() => {
    const stepsEl = stepRefs.current;
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

    // --- CONNECTOR LINE ---
    if (!isMobile && connectorRef.current) {
      gsap.fromTo(
        connectorRef.current,
        { opacity: 0, scaleX: 0.5 },
        {
          opacity: 0.6,
          scaleX: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // --- STEPS ---
    // Cada step entra com um efeito diferente
    stepsEl.forEach((step, index) => {
      // Ícone do step (círculo)
      const iconEl = step.querySelector(`.${styles.stepIcon}`);
      const titleEl = step.querySelector(`.${styles.stepTitle}`);
      const descEl = step.querySelector(`.${styles.stepDescription}`);

      // Entrada do step: cada um vem de uma direção diferente
      let fromX = 0;
      let fromY = 60;
      let rotation = 0;

      if (isMobile) {
        // Mobile: intercalado esquerda/direita
        fromX = index % 2 === 0 ? -60 : 60;
        fromY = 0;
        rotation = index % 2 === 0 ? -8 : 8;
      } else {
        // Desktop: cada step vem de uma posição diferente
        switch (index) {
          case 0:
            fromX = -80;
            fromY = 0;
            rotation = -10;
            break;
          case 1:
            fromX = 0;
            fromY = -60;
            rotation = 0;
            break;
          case 2:
            fromX = 0;
            fromY = 60;
            rotation = 0;
            break;
          case 3:
            fromX = 80;
            fromY = 0;
            rotation = 10;
            break;
          default:
            break;
        }
      }

      // Animação do step completo
      gsap.fromTo(
        step,
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
          delay: index * 0.15 + 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Ícone com efeito de escala + rotação
      if (iconEl) {
        gsap.fromTo(
          iconEl,
          { scale: 0.6, opacity: 0, rotation: -30 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.7,
            delay: index * 0.15 + 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Título do step
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.15 + 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Descrição do step
      if (descEl) {
        gsap.fromTo(
          descEl,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.15 + 0.5,
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
    <section ref={sectionRef} className={styles.process} id="como-trabalhamos">
      {/* Wavify Background */}
      <div className={styles.wavifyContainer}>
        <Wavify
          fill="#000080"
          paused={false}
          options={{
            height: 45,
            amplitude: 40,
            speed: 0.2,
            points: 4,
          }}
        />
      </div>
      <div className={styles.wavifyContainer2}>
        <Wavify
          fill="#000080"
          paused={false}
          options={{
            height: 60,
            amplitude: 40,
            speed: 0.2,
            points: 4,
          }}
        />
      </div>

      <div className={styles.container}>
        {/* Background Decoration */}
        <div className={styles.decoration}>
          <Droplets className={styles.decorationIcon} size={400} strokeWidth={0.5} />
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h2 ref={titleRef} className={styles.title}>
            O Nosso Processo
          </h2>
          <p ref={subtitleRef} className={styles.subtitle}>
            Um caminho simples e transparente para a sua piscina perfeita.
          </p>
        </div>

        {/* Steps Grid */}
        <div className={styles.grid}>
          {/* Connector Line */}
          <div ref={connectorRef} className={styles.connector}></div>

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                className={styles.step}
              >
                <div className={styles.stepIcon}>
                  <IconComponent className={styles.icon} size={32} strokeWidth={1.5} />
                </div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;