"use client";

import React, { useEffect, useRef } from "react";
import {
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/home/CTASection.module.css";
import Image from "next/image";
import background from "@/assets/images/cta.jpg";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    // --- CARD (efeito de entrada principal) ---
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
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

    // --- TÍTULO ---
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- DESCRIÇÃO ---
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- BOTÃO ---
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.85, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        delay: 0.5,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- FEATURES (com stagger) ---
    const featureItems = featuresRef.current?.querySelectorAll(`.${styles.feature}`);
    if (featureItems && featureItems.length) {
      gsap.fromTo(
        featureItems,
        { opacity: 0, y: 25, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

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
    <section ref={sectionRef} className={styles.cta} id="contato">
      <div className={styles.background}>
        <Image
          alt="Luxury Pool Background"
          className={styles.backgroundImage}
          src={background}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className={styles.backgroundOverlay}></div>
      </div>

      <div className={styles.container}>
        <div ref={cardRef} className={styles.card}>
          <h2 ref={titleRef} className={styles.title}>
            Pronto para ter uma piscina impecável?
          </h2>
          <p ref={descriptionRef} className={styles.description}>
            Peça agora o seu orçamento gratuito e personalizado para os nossos serviços premium de manutenção e limpeza.
          </p>

          <Link ref={buttonRef} href="/budget" className={styles.button}>
            Solicitar Orçamento Agora
            <ArrowRight size={24} />
          </Link>

          <div ref={featuresRef} className={styles.features}>
            <div className={styles.feature}>
              <CheckCircle size={20} className={styles.featureIcon} />
              <span className={styles.featureText}>Orçamento Grátis</span>
            </div>
            <div className={styles.feature}>
              <Clock size={20} className={styles.featureIcon} />
              <span className={styles.featureText}>Resposta em 24h</span>
            </div>
            <div className={styles.feature}>
              <Award size={20} className={styles.featureIcon} />
              <span className={styles.featureText}>Serviço Premium</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;