// app/components/Diagnosis/AssistenteProdutos.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/diagnosis/AssistenteProdutos.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AssistenteProdutos = () => {
  const [phValue, setPhValue] = useState("");
  const [cloroValue, setCloroValue] = useState("");
  const [alcValue, setAlcValue] = useState("");
  const [assistResult, setAssistResult] = useState(null);

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const fieldsRef = useRef([]);
  const buttonRef = useRef(null);
  const resultRef = useRef(null);

  // --- ANIMAÇÃO DE ENTRADA DO CARD ---
  useEffect(() => {
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

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // --- ANIMAÇÃO DOS CAMPOS ---
  useEffect(() => {
    if (fieldsRef.current.length === 0) return;

    fieldsRef.current.forEach((field, index) => {
      if (field) {
        gsap.fromTo(
          field,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.2 + index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  // --- ANIMAÇÃO DO BOTÃO ---
  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // --- ANIMAÇÃO DO RESULTADO ---
  useEffect(() => {
    if (!assistResult || !resultRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      resultRef.current,
      { opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
      }
    );

    // Anima o título do resultado
    const resultTitle = resultRef.current.querySelector(`.${styles.resultTitle}`);
    const resultMessage = resultRef.current.querySelector(`.${styles.resultMessage}`);

    if (resultTitle) {
      gsap.fromTo(
        resultTitle,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    }

    if (resultMessage) {
      gsap.fromTo(
        resultMessage,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }

    // Efeito de destaque no resultado
    if (assistResult.type === "success") {
      gsap.fromTo(
        resultRef.current,
        { scale: 0.98, backgroundColor: "#f0fdf4" },
        {
          scale: 1,
          backgroundColor: "#f0fdf4",
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      );
    } else if (assistResult.type === "action") {
      gsap.fromTo(
        resultRef.current,
        { scale: 0.98, backgroundColor: "#fef3c7" },
        {
          scale: 1,
          backgroundColor: "#fef3c7",
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      );
    } else if (assistResult.type === "warning") {
      gsap.fromTo(
        resultRef.current,
        { scale: 0.98, backgroundColor: "#fef2f2" },
        {
          scale: 1,
          backgroundColor: "#fef2f2",
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, [assistResult]);

  const handleAssistCalculate = () => {
    const ph = parseFloat(phValue);
    const cloro = parseFloat(cloroValue);
    const alc = parseFloat(alcValue);

    if (isNaN(ph) && isNaN(cloro) && isNaN(alc)) {
      setAssistResult({
        type: "warning",
        title: "Preencha pelo menos um valor",
        message:
          "Introduza o pH, cloro ou alcalinidade que mediu para receber uma recomendação.",
      });
      return;
    }

    let issues = [];
    let isOk = true;

    if (!isNaN(ph)) {
      if (ph < 7.2) {
        issues.push(
          "pH baixo — considere adicionar corretor de pH+ (cerca de 10 ml por m³, ajustável)"
        );
        isOk = false;
      } else if (ph > 7.6) {
        issues.push(
          "pH alto — considere adicionar corretor de pH- (cerca de 10 ml por m³, ajustável)"
        );
        isOk = false;
      }
    }

    if (!isNaN(cloro)) {
      if (cloro < 1) {
        issues.push(
          "cloro livre baixo — adicione cloro de manutenção (cerca de 1 g por m³)"
        );
        isOk = false;
      } else if (cloro > 3) {
        issues.push(
          "cloro livre alto — evite usar a piscina e deixe estabilizar antes de adicionar mais produto"
        );
        isOk = false;
      }
    }

    if (!isNaN(alc)) {
      if (alc < 80) {
        issues.push(
          "alcalinidade baixa — pode causar variações bruscas de pH, considere um aumentador de alcalinidade"
        );
        isOk = false;
      } else if (alc > 150) {
        issues.push("alcalinidade alta — pode dificultar o controlo do pH");
        isOk = false;
      }
    }

    if (isOk) {
      setAssistResult({
        type: "success",
        title: "✅ Hoje não precisa de fazer nada!",
        message:
          "Os valores introduzidos estão dentro do intervalo ideal. Continue a monitorizar regularmente.",
      });
    } else {
      setAssistResult({
        type: "action",
        title: "📋 Recomendações para hoje",
        message: issues.join(" • "),
      });
    }
  };

  return (
    <div ref={sectionRef} className={styles.assistWrapper}>
      <div ref={cardRef} className={styles.assistCard}>
        <h3 ref={titleRef} className={styles.assistTitle}>
          Assistente de Produtos
        </h3>
        <p className={styles.assistSubtitle}>
          Insira os valores que mediu na sua piscina e receba recomendações personalizadas.
        </p>

        <div className={styles.assistRow}>
          <div 
            ref={(el) => (fieldsRef.current[0] = el)} 
            className={styles.assistField}
          >
            <label>pH medido</label>
            <input
              type="number"
              value={phValue}
              onChange={(e) => setPhValue(e.target.value)}
              placeholder="7.4"
              step="0.1"
              min="0"
              max="14"
            />
          </div>
          <div 
            ref={(el) => (fieldsRef.current[1] = el)} 
            className={styles.assistField}
          >
            <label>Cloro livre (ppm)</label>
            <input
              type="number"
              value={cloroValue}
              onChange={(e) => setCloroValue(e.target.value)}
              placeholder="2"
              step="0.1"
              min="0"
              max="10"
            />
          </div>
          <div 
            ref={(el) => (fieldsRef.current[2] = el)} 
            className={styles.assistField}
          >
            <label>Alcalinidade (ppm)</label>
            <input
              type="number"
              value={alcValue}
              onChange={(e) => setAlcValue(e.target.value)}
              placeholder="100"
              min="0"
              max="300"
            />
          </div>
        </div>

        <button 
          ref={buttonRef} 
          className={styles.assistButton} 
          onClick={handleAssistCalculate}
        >
          Ver o que fazer hoje
        </button>

        {assistResult && (
          <div 
            ref={resultRef} 
            className={`${styles.assistResult} ${styles[assistResult.type]}`}
          >
            <h4 className={styles.resultTitle}>{assistResult.title}</h4>
            <p className={styles.resultMessage}>{assistResult.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistenteProdutos;