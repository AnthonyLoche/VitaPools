"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Wavify from "react-wavify";
import styles from "@/assets/css/home/Welcome.module.css";
import vita_h from "@/assets/images/logo_h_removed_white.png";

const Welcome = ({ onComplete }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [displaySubtitle, setDisplaySubtitle] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullSubtitle = "Manutenção e limpeza de piscinas";

  // ── EFEITO DE DIGITAÇÃO DE BAIXO PARA CIMA ──
  useEffect(() => {
    let mounted = true;
    let timeoutId;

    const wait = (ms) =>
      new Promise((resolve) => {
        timeoutId = setTimeout(resolve, ms);
      });

    const showText = async () => {
      await wait(500);
      if (!mounted) return;

      const chars = fullSubtitle.split("");
      let currentText = "";
      
      // Começa com todas as letras transparentes
      setDisplaySubtitle(fullSubtitle);

      // Animação de revelação de baixo para cima
      for (let i = 0; i < chars.length; i++) {
        if (!mounted) return;
        
        // Revela a letra atual com efeito de fade
        const charElements = document.querySelectorAll('.char-reveal');
        if (charElements[i]) {
          charElements[i].style.opacity = '1';
          charElements[i].style.transform = 'translateY(0)';
        }
        
        await wait(50); // Velocidade da animação
        if (!mounted) return;
      }

      if (!mounted) return;
      setIsTypingComplete(true);
    };

    showText();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // ── ANIMAÇÕES GSAP DE ENTRADA ──
  useEffect(() => {
    gsap.killTweensOf([titleRef.current, subtitleRef.current]);

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(titleRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.6,
      ease: "power4.out",
    });

    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8",
    );

    let floatTween;
    tl.call(() => {
      floatTween = gsap.to(titleRef.current, {
        y: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      tl.kill();
      if (floatTween) floatTween.kill();
      gsap.killTweensOf([titleRef.current, subtitleRef.current]);
    };
  }, []);

  // ── SAÍDA APÓS DIGITAÇÃO COMPLETA ──
  useEffect(() => {
    if (!isTypingComplete) return;

    const delayId = setTimeout(() => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          if (onComplete) onComplete();
        },
      });

      exitTl.to(contentRef.current, {
        opacity: 0,
        scale: 1.04,
        y: -60,
        filter: "blur(20px)",
        duration: 1.4,
        ease: "power3.inOut",
      });

      exitTl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 1.6,
          ease: "power2.inOut",
        },
        0,
      );
    }, 2500);

    return () => clearTimeout(delayId);
  }, [isTypingComplete, onComplete]);

  // ── RENDERIZA O SUBTÍTULO COM LETRAS INDIVIDUAIS ──
  const renderSubtitleWithAnimation = () => {
    const chars = fullSubtitle.split("");
    
    return chars.map((char, index) => {
      // Espaços são importantes para manter a formatação
      const isSpace = char === " ";
      const displayChar = isSpace ? "\u00A0" : char; // Usa non-breaking space para espaços
      
      return (
        <span
          key={index}
          className="char-reveal"
          style={{
            display: "inline-block",
            opacity: 0,
            transform: "translateY(20px)",
            transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
            transitionDelay: `${index * 0.04}s`, // Delay progressivo para cada letra
            position: "relative",
            ...(isSpace && { width: "0.3em" }), // Largura para espaços
          }}
        >
          {displayChar}
        </span>
      );
    });
  };

  if (!isVisible) return null;

  return (
    <section ref={containerRef} className={styles.welcome}>
      <div className={styles.background} />

      <div className={styles.waveTop}>
        <Wavify
          fill="#000080"
          paused={false}
          options={{ height: 80, amplitude: 95, speed: 0.15, points: 5 }}
        />
      </div>

      <div className={styles.waveBottom}>
        <Wavify
          fill="#000080"
          paused={false}
          options={{ height: 80, amplitude: 95, speed: 0.2, points: 6 }}
        />
      </div>

      <div ref={contentRef} className={styles.content}>
        {/* Logo horizontal como título */}
        <div
          ref={titleRef}
          className={styles.logoWrapper}
          style={{
            opacity: 0,
            transform: "scale(0.92) translateY(40px)",
            filter: "blur(20px)",
          }}
        >
          <Image
            src={vita_h}
            alt="VitaPools"
            className={styles.logoHorizontal}
            priority
          />
        </div>

        <p
          ref={subtitleRef}
          className={styles.subtitle}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            filter: "blur(10px)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderSubtitleWithAnimation()}
        </p>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollLine} />
        </div>
      </div>

      <div className={styles.waterGlow} />
      <div className={styles.particles}>
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Welcome;