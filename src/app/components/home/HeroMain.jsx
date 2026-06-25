"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import styles from "@/assets/css/home/HeroMain.module.css";
import hero_video from "@/assets/videos/hero_test.mp4";
import hero_step2 from "@/assets/images/hero_step2.jpeg";
import hero_step3 from "@/assets/videos/hero_step3.mp4";
import hero_step5 from "@/assets/videos/hero.mp4";

// ─── SCENE CONFIGURATION ─────────────────────────────────────────────────────
const SCENES = [
  {
    id: "s1",
    media: { type: "video", src: hero_video },
    overlay: 0.45,
    video: { scale: 1.0, x: "0%", y: "0%", brightness: 1.0, contrast: 1.0 },
  },
  {
    id: "s2",
    media: { type: "image", src: hero_step2 },
    overlay: 0.6,
    video: { scale: 1.06, x: "-2%", y: "1%", brightness: 0.85, contrast: 1.05 },
  },
  {
    id: "s3",
    media: { type: "video", src: hero_step3 },
    overlay: 0.55,
    video: { scale: 1.12, x: "2%", y: "-1%", brightness: 0.8, contrast: 1.08 },
  },
  {
    id: "s4",
    media: { type: "video", src: hero_step5 },
    overlay: 0.5,
    video: { scale: 1.08, x: "0%", y: "-2%", brightness: 1.2, contrast: 1.05 },
  },
];

const TRANSITION_DURATION = 0.75;

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const HeroMain = () => {
  const heroRef        = useRef(null);
  const videoRef       = useRef(null);
  const overlayRef     = useRef(null);
  const imageRef       = useRef(null);
  const sceneRefs      = useRef([]);
  const progressRef    = useRef(null);
  const scrollLockRef  = useRef(false);
  const currentScene   = useRef(0);
  const [activeScene, setActiveScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // ── Função para trocar o fundo COM FADE ──────────────────────────────────
  const changeBackground = useCallback((sceneIndex, isInitial = false) => {
    const scene = SCENES[sceneIndex];
    const media = scene.media;

    if (media.type === "video") {
      // Fade out da imagem
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(imageRef.current, { display: "none" });
        }
      });

      // Fade in do vídeo
      const video = videoRef.current;
      gsap.set(video, { display: "block", opacity: 0 });
      
      if (!isInitial) {
        video.src = media.src;
        video.load();
        video.play().catch(() => {});
      }
      
      gsap.to(video, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
      
      setImageSrc(null);
    } else if (media.type === "image") {
      // Fade out do vídeo
      gsap.to(videoRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(videoRef.current, { display: "none" });
        }
      });

      // Fade in da imagem
      const img = imageRef.current;
      gsap.set(img, { display: "block", opacity: 0 });
      img.src = media.src;
      
      gsap.to(img, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      });
      
      setImageSrc(media.src.src);
    }
  }, []);

  // ── Verifica se está no último step ──────────────────────────────────────
  const isLastScene = useCallback(() => {
    return currentScene.current === SCENES.length - 1;
  }, []);

  // ── Verifica se está no primeiro step ─────────────────────────────────────
  const isFirstScene = useCallback(() => {
    return currentScene.current === 0;
  }, []);

  // ── Transition engine ──────────────────────────────────────────────────────
  const transitionTo = useCallback((nextIdx) => {
    if (scrollLockRef.current) return;
    if (nextIdx < 0 || nextIdx >= SCENES.length) return;
    if (nextIdx === currentScene.current) return;

    scrollLockRef.current = true;
    setIsTransitioning(true);

    const prev = currentScene.current;
    const prevEl = sceneRefs.current[prev];
    const nextEl = sceneRefs.current[nextIdx];
    const direction = nextIdx > prev ? 1 : -1;
    const vidCfg = SCENES[nextIdx].video;

    // ── TROCA O FUNDO COM FADE ──
    changeBackground(nextIdx, false);

    // ── ANIMA O OVERLAY ──
    gsap.to(overlayRef.current, {
      opacity: SCENES[nextIdx].overlay,
      duration: TRANSITION_DURATION,
      ease: "power2.inOut",
    });

    // ── ANIMA O ZOOM DO VÍDEO (se for vídeo) ──
    if (SCENES[nextIdx].media.type === "video") {
      gsap.to(videoRef.current, {
        scale: vidCfg.scale,
        xPercent: parseFloat(vidCfg.x),
        yPercent: parseFloat(vidCfg.y),
        filter: `brightness(${vidCfg.brightness}) contrast(${vidCfg.contrast})`,
        duration: TRANSITION_DURATION * 1.4,
        ease: "power3.inOut",
      });
    }

    // ── EXIT: cena atual ──
    gsap.to(prevEl, {
      opacity: 0,
      y: direction * -40,
      filter: "blur(16px)",
      scale: direction > 0 ? 0.94 : 1.06,
      duration: TRANSITION_DURATION * 0.65,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(prevEl, { display: "none" });
      },
    });

    // ── ENTER: próxima cena ──
    gsap.set(nextEl, {
      display: "flex",
      opacity: 0,
      y: direction * 60,
      filter: "blur(20px)",
      scale: direction > 0 ? 1.06 : 0.94,
    });

    gsap.to(nextEl, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      duration: TRANSITION_DURATION,
      delay: TRANSITION_DURATION * 0.35,
      ease: "power3.out",
      onComplete: () => {
        currentScene.current = nextIdx;
        setActiveScene(nextIdx);
        setIsTransitioning(false);

        const children = nextEl.querySelectorAll(`.${styles.animChild}`);
        if (children.length) {
          gsap.fromTo(
            children,
            { opacity: 0, y: 24, filter: "blur(8px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.55,
              stagger: 0.09,
              ease: "power2.out",
            }
          );
        }

        setTimeout(() => {
          scrollLockRef.current = false;
        }, 350);
      },
    });
  }, [changeBackground]);

  // ── Input handlers ─────────────────────────────────────────────────────────
  useEffect(() => {
    // ── INICIAL ──
    const firstEl = sceneRefs.current[0];
    if (firstEl) {
      gsap.set(firstEl, { display: "flex", opacity: 0, y: 30, filter: "blur(16px)", scale: 1.04 });
      gsap.to(firstEl, {
        opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
        duration: 1.0, delay: 0.25, ease: "power3.out",
        onComplete: () => {
          const children = firstEl.querySelectorAll(`.${styles.animChild}`);
          if (children.length) {
            gsap.fromTo(
              children,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
          }
        },
      });
    }

    sceneRefs.current.forEach((el, i) => {
      if (i !== 0 && el) gsap.set(el, { display: "none" });
    });

    // ── INICIAL: VIDEO ──
    const initialScene = SCENES[0];
    changeBackground(0, true);
    
    if (initialScene.media.type === "video") {
      videoRef.current.src = initialScene.media.src;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }

    gsap.set(overlayRef.current, { opacity: initialScene.overlay });

    // ── WHEEL ──
    let wheelAcc = 0;
    let wheelTimer = null;
    const WHEEL_THRESHOLD = 60;

    const onWheel = (e) => {
      if (isLastScene() && e.deltaY > 0) return;
      if (isFirstScene() && e.deltaY < 0) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      if (scrollLockRef.current) return;

      wheelAcc += e.deltaY;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAcc = 0; }, 200);

      if (Math.abs(wheelAcc) >= WHEEL_THRESHOLD) {
        const dir = wheelAcc > 0 ? 1 : -1;
        const nextIdx = currentScene.current + dir;
        if (nextIdx >= SCENES.length) return;
        wheelAcc = 0;
        transitionTo(nextIdx);
      }
    };

    // ── TOUCH ──
    let touchStartY = 0;
    let touchMoved = false;

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    };

    const onTouchMove = (e) => {
      const delta = touchStartY - e.touches[0].clientY;
      if (isLastScene() && delta > 0) return;
      if (isFirstScene() && delta < 0) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      if (!touchMoved && Math.abs(delta) > 40) {
        touchMoved = true;
        const nextIdx = currentScene.current + (delta > 0 ? 1 : -1);
        if (nextIdx >= 0 && nextIdx < SCENES.length) {
          transitionTo(nextIdx);
        }
      }
    };

    // ── KEYBOARD ──
    const onKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (isLastScene()) return;
        e.preventDefault();
        transitionTo(currentScene.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (isFirstScene()) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        transitionTo(currentScene.current - 1);
      }
    };

    const hero = heroRef.current;
    hero.addEventListener("wheel", onWheel, { passive: false });
    hero.addEventListener("touchstart", onTouchStart, { passive: true });
    hero.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      hero.removeEventListener("wheel", onWheel);
      hero.removeEventListener("touchstart", onTouchStart);
      hero.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [transitionTo, isLastScene, isFirstScene, changeBackground]);

  const goToScene = (idx) => {
    if (!scrollLockRef.current) transitionTo(idx);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section ref={heroRef} className={styles.hero} id="inicio">
      <div className={styles.heroBg}>
        {/* Vídeo */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        />
        
        {/* Imagem */}
        <img
          ref={imageRef}
          src={imageSrc || hero_step2}
          alt="Background"
          className={styles.heroImage}
        />
        
        <div ref={overlayRef} className={styles.heroOverlay} />
        <div className={styles.vignette} />
      </div>

      {/* ── SCENE 1 ── */}
      <div
        ref={(el) => (sceneRefs.current[0] = el)}
        className={`${styles.scene} ${styles.scene1}`}
      >
        <div className={styles.sceneInner}>
          <span className={`${styles.eyebrow} ${styles.animChild}`}>VitaPools</span>
          <h1 className={`${styles.displayTitle} ${styles.displayTitleLeft} ${styles.animChild}`}>
            Água<br /><em>perfeita.</em>
          </h1>
          <p className={`${styles.lead} ${styles.animChild}`}>
            Manutenção e limpeza de piscinas com qualidade, confiança e profissionalismo.
          </p>
          <div className={`${styles.buttonRow} ${styles.animChild}`}>
            <Link href="/budget" className={styles.btnPrimary}>Pedir Orçamento</Link>
            <Link href="/services" className={styles.btnGhost}>Ver Serviços</Link>
          </div>
        </div>
      </div>

      {/* ── SCENE 2 ── */}
      <div
        ref={(el) => (sceneRefs.current[1] = el)}
        className={`${styles.scene} ${styles.scene2}`}
      >
        <div className={styles.sceneInner}>
          <p className={`${styles.sceneIndex} ${styles.animChild}`}>01</p>
          <h2 className={`${styles.displayTitle} ${styles.displayTitleRight} ${styles.animChild}`}>
            A água<br />merece<br /><em>atenção.</em>
          </h2>
          <p className={`${styles.lead} ${styles.leadRight} ${styles.animChild}`}>
            Analisamos, tratamos e equilibramos a água para garantir segurança e qualidade.
          </p>
        </div>
      </div>

      {/* ── SCENE 3 ── */}
      <div
        ref={(el) => (sceneRefs.current[2] = el)}
        className={`${styles.scene} ${styles.scene3}`}
      >
        <div className={`${styles.sceneInner} ${styles.sceneInnerCenter}`}>
          <p className={`${styles.sceneIndex} ${styles.animChild}`}>02</p>
          <h2 className={`${styles.displayTitle} ${styles.displayTitleCenter} ${styles.animChild}`}>
            Prevenção<br />antes<br /><em>do problema.</em>
          </h2>
          <div className={`${styles.pillRow} ${styles.animChild}`}>
            <span className={styles.pill}><span className={styles.pillCheck}>✓</span> Limpeza Completa</span>
            <span className={styles.pill}><span className={styles.pillCheck}>✓</span> Tratamento Químico</span>
            <span className={styles.pill}><span className={styles.pillCheck}>✓</span> Manutenção Preventiva</span>
          </div>
        </div>
      </div>

      {/* ── SCENE 4 (FINAL) ── */}
      <div
        ref={(el) => (sceneRefs.current[3] = el)}
        className={`${styles.scene} ${styles.scene5}`}
      >
        <div className={`${styles.sceneInner} ${styles.sceneInnerCenter}`}>
          <h2 className={`${styles.displayTitle} ${styles.displayTitleCenter} ${styles.animChild}`}>
            Água<br />cristalina.<br /><em>Sempre.</em>
          </h2>
          <div className={`${styles.buttonRow} ${styles.buttonRowCenter} ${styles.animChild}`}>
            <Link href="/budget" className={styles.btnPrimary}>Solicitar Orçamento</Link>
            <Link href="/services" className={styles.btnGhost}>Conhecer Serviços</Link>
          </div>
        </div>
      </div>

      {/* ── PROGRESS ── */}
      <nav ref={progressRef} className={styles.progress} aria-label="Navegação de cenas">
        {SCENES.map((_, i) => (
          <button
            key={i}
            className={`${styles.progressDot} ${activeScene === i ? styles.progressDotActive : ""}`}
            onClick={() => goToScene(i)}
            aria-label={`Cena ${i + 1}`}
          />
        ))}
      </nav>

      <div className={`${styles.scrollHint} ${activeScene === 0 ? styles.scrollHintVisible : ""}`}>
        <span className={styles.scrollHintText}>scroll</span>
        <span className={styles.scrollHintLine} />
      </div>
    </section>
  );
};

export default HeroMain;