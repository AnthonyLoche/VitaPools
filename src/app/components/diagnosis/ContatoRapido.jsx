// app/components/Diagnosis/ContatoRapido.jsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/diagnosis/ContatoRapido.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContatoRapido = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contactItemsRef = useRef([]);
  const buttonRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // --- CARD PRINCIPAL (efeito de entrada) ---
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
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
      { opacity: 0, y: 20, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
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
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        delay: 0.35,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- ITEMS DE CONTATO (um por um) ---
    contactItemsRef.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -20, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          delay: 0.5 + index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // --- BOTÃO ---
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- EFEITO DE PARALLAX NO CARD ---
    gsap.to(cardRef.current, {
      y: 15,
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // --- CLEANUP ---
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.contactCardWrapper}>
      <div ref={cardRef} className={styles.contactCard}>
        <div className={styles.contactInfo}>
          <h3 ref={titleRef} className={styles.contactTitle}>
            Precisa de ajuda personalizada?
          </h3>
          <p ref={descriptionRef} className={styles.contactDescription}>
            Fale connosco diretamente para uma avaliação profissional da sua piscina.
          </p>
          <div className={styles.contactItems}>
            {[
              { icon: Phone, text: "+351 932 096 025", href: "tel:+351932096025" },
              { icon: Mail, text: "Vitapoolsmanutencao@gmail.com", href: "mailto:Vitapoolsmanutencao@gmail.com" },
              { icon: MapPin, text: "Mafra, Portugal", href: "#" },
            ].map((item, index) => {
              const Icon = item.icon;
              const isLink = item.href !== "#" && item.href !== undefined;
              
              return (
                <div
                  key={index}
                  ref={(el) => (contactItemsRef.current[index] = el)}
                  className={styles.contactItem}
                >
                  <Icon size={18} className={styles.contactIcon} />
                  {isLink ? (
                    <a href={item.href} className={styles.contactLink}>
                      {item.text}
                    </a>
                  ) : (
                    <span className={styles.contactText}>{item.text}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Link
          ref={buttonRef}
          href="/contato"
          className={styles.contactButton}
        >
          Pedir Orçamento
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default ContatoRapido;