"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/home/FAQSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemRefs = useRef([]);

  const faqs = [
    {
      question: "Quanto custa a manutenção mensal?",
      answer: "Os valores variam conforme o tamanho da piscina e a frequência das visitas (semanal ou quinzenal). Solicite um orçamento personalizado para obter um preço exato para o seu caso.",
    },
    {
      question: "Em quanto tempo recuperam uma água verde?",
      answer: "Normalmente, em 48 a 72 horas conseguimos reverter o estado da água de verde para cristalina, dependendo da saturação de algas e do estado dos filtros.",
    },
    {
      question: "Atendem em que regiões?",
      answer: "Focamos a nossa atuação nas zonas de Ericeira, Mafra, Torres Vedras e arredores, garantindo rapidez e proximidade.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  useEffect(() => {
    const items = itemRefs.current;
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

    // --- FAQ ITEMS ---
    items.forEach((item, index) => {
      // Cada item entra de forma diferente
      const fromX = isMobile ? (index % 2 === 0 ? -40 : 40) : 0;
      const fromY = isMobile ? 0 : (index % 2 === 0 ? -30 : 30);
      const rotation = isMobile ? (index % 2 === 0 ? -3 : 3) : 0;

      gsap.fromTo(
        item,
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
          duration: 0.7,
          delay: index * 0.15 + 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // --- QUESTION (botão) dentro do item ---
      const questionBtn = item.querySelector(`.${styles.question}`);
      if (questionBtn) {
        gsap.fromTo(
          questionBtn,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.15 + 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- ÍCONE (Chevron) ---
      const icon = item.querySelector(`.${styles.icon}`);
      if (icon) {
        gsap.fromTo(
          icon,
          { opacity: 0, scale: 0.5, rotation: -90 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.15 + 0.35,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // --- ANSWER (texto da resposta) ---
      const answer = item.querySelector(`.${styles.answer}`);
      if (answer) {
        // A resposta já está com max-height 0, mas queremos que o texto dentro apareça com fade
        const answerText = answer.querySelector(`.${styles.answerText}`);
        if (answerText) {
          gsap.fromTo(
            answerText,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
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
    <section ref={sectionRef} className={styles.faq}>
      <div className={styles.container}>
        <h2 ref={titleRef} className={styles.title}>
          Perguntas Frequentes
        </h2>

        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={styles.item}
            >
              <button
                className={styles.question}
                onClick={() => toggleFAQ(index)}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <ChevronDown
                  className={`${styles.icon} ${openIndex === index ? styles.iconOpen : ''}`}
                  size={24}
                />
              </button>
              <div
                className={`${styles.answer} ${openIndex === index ? styles.answerOpen : ''}`}
              >
                <p className={styles.answerText}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;