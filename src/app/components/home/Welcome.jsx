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

  // ── EFEITO DE APARIÇÃO ──
  useEffect(() => {
    let mounted = true;
    let timeoutId;

    const wait = (ms) =>
      new Promise((resolve) => {
        timeoutId = setTimeout(resolve, ms);
      });

    const showText = async () => {
      await wait(600);
      if (!mounted) return;

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
          }}
        >
          {displaySubtitle}
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