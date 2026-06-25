"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Wavify from "react-wavify";
import styles from "@/assets/css/home/Welcome.module.css";
import logo from "@/assets/images/logo_removed_white.png";

const Welcome = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [displayTitle, setDisplayTitle] = useState("");
  const [displaySubtitle, setDisplaySubtitle] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullTitle = "VitaPools";
  const fullSubtitle = "Manutenção e limpeza de piscinas";

  // ── EFEITO DE APARIÇÃO ──
  useEffect(() => {
    let mounted = true;
    let timeoutId;

    const wait = (ms) =>
      new Promise((resolve) => {
        timeoutId = setTimeout(resolve, ms);
      });

    const showText = async () => {
      // Título - fade in do texto completo
      if (!mounted) return;
      setDisplayTitle(fullTitle);
      await wait(400);
      if (!mounted) return;

      // Subtítulo - palavra por palavra
      const words = fullSubtitle.split(" ");
      let currentText = "";
      
      for (let i = 0; i < words.length; i++) {
        if (!mounted) return;
        currentText += (i === 0 ? "" : " ") + words[i];
        setDisplaySubtitle(currentText);
        await wait(200);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── ANIMAÇÕES GSAP DE ENTRADA ──
  useEffect(() => {
    // Garante que não existam tweens "fantasmas" desses elementos
    // de uma montagem anterior (ex: StrictMode em dev, remounts, etc.)
    gsap.killTweensOf([
      logoRef.current,
      titleRef.current,
      subtitleRef.current,
    ]);

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.6,
      ease: "power4.out",
    });

    tl.to(
      titleRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1",
    );

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
      floatTween = gsap.to(logoRef.current, {
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
      gsap.killTweensOf([
        logoRef.current,
        titleRef.current,
        subtitleRef.current,
      ]);
    };
  }, []);

  // ── SAÍDA APÓS DIGITAÇÃO COMPLETA ──
  useEffect(() => {
    if (!isTypingComplete) return;

    const delayId = setTimeout(() => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          if (onComplete) {
            onComplete();
          }
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

  if (!isVisible) return null;

  return (
    <section ref={containerRef} className={styles.welcome}>
      {/* Fundo escuro */}
      <div className={styles.background}></div>

      {/* Ondas Wavify */}
      <div className={styles.waveTop}>
        <Wavify
          fill="#000080"
          paused={false}
          options={{
            height: 80,
            amplitude: 95,
            speed: 0.15,
            points: 5,
          }}
        />
      </div>

      <div className={styles.waveBottom}>
        <Wavify
          fill="#000080"
          paused={false}
          options={{
            height: 80,
            amplitude: 95,
            speed: 0.2,
            points: 6,
          }}
        />
      </div>

      {/* Conteúdo central */}
      <div ref={contentRef} className={styles.content}>
        <div
          ref={logoRef}
          className={styles.logoWrapper}
          style={{
            opacity: 0,
            transform: "scale(0.6) translateY(40px)",
            filter: "blur(20px)",
          }}
        >
          <Image
            src={logo}
            alt="VitaPools Logo"
            className={styles.logo}
            priority
          />
        </div>

        <h1
          ref={titleRef}
          className={styles.title}
          style={{
            opacity: 0,
            transform: "scale(0.98) translateY(40px)",
            filter: "blur(16px)",
          }}
        >
          {displayTitle}
        </h1>

        <p
          ref={subtitleRef}
          className={styles.subtitle}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            filter: "blur(10px)",
          }}
        >
          {displaySubtitle}
        </p>

        {/* Indicador de scroll */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollLine}></span>
        </div>
      </div>

      {/* Brilho/reflexo de água */}
      <div className={styles.waterGlow}></div>
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