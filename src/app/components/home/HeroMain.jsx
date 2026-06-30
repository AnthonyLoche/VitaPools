"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/home/HeroMain.module.css";
import hero_video from "@/assets/videos/hero_test.mp4";
import hero_step2 from "@/assets/images/hero_step2.png";
import hero_step3 from "@/assets/videos/hero_step3.mp4";
import hero_step5 from "@/assets/videos/hero.mp4";
import logo from "@/assets/images/logo_removed_white.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

const HeroMain = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const sceneRefs = useRef([]);
  const progressRef = useRef(null);
  const autoplayRef = useRef(null);
  const currentScene = useRef(0);
  const isMounted = useRef(false);
  const [activeScene, setActiveScene] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);

  const changeBackground = useCallback((sceneIndex, isInitial = false) => {
    const scene = SCENES[sceneIndex];
    const media = scene.media;

    if (media.type === "video") {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(imageRef.current, { display: "none" });
        },
      });

      const video = videoRef.current;
      gsap.set(video, { display: "block", opacity: 0 });

      if (!isInitial) {
        video.src = media.src;
        video.load();
        video.play().catch(() => {});
      }

      gsap.to(video, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
      setImageSrc(null);
    } else if (media.type === "image") {
      gsap.to(videoRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(videoRef.current, { display: "none" });
        },
      });

      const img = imageRef.current;
      gsap.set(img, { display: "block", opacity: 0 });
      img.src = media.src;

      gsap.to(img, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
      setImageSrc(media.src.src);
    }
  }, []);

  const transitionTo = useCallback(
    (nextIdx) => {
      if (nextIdx < 0 || nextIdx >= SCENES.length) return;
      if (nextIdx === currentScene.current) return;

      const prev = currentScene.current;
      const prevEl = sceneRefs.current[prev];
      const nextEl = sceneRefs.current[nextIdx];
      const direction = nextIdx > prev ? 1 : -1;
      const vidCfg = SCENES[nextIdx].video;

      changeBackground(nextIdx, false);

      gsap.to(overlayRef.current, {
        opacity: SCENES[nextIdx].overlay,
        duration: TRANSITION_DURATION,
        ease: "power2.inOut",
      });

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

          const children = nextEl.querySelectorAll(`.${styles.animChild}`);
          if (children.length) {
            gsap.to(children, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            });
          }
        },
      });
    },
    [changeBackground],
  );

  const startAutoplay = useCallback(
    (firstDelay = 2500) => {
      clearTimeout(autoplayRef.current);
      clearInterval(autoplayRef.current);

      autoplayRef.current = setTimeout(() => {
        transitionTo((currentScene.current + 1) % SCENES.length);

        autoplayRef.current = setInterval(() => {
          transitionTo((currentScene.current + 1) % SCENES.length);
        }, 2500);
      }, firstDelay);
    },
    [transitionTo],
  );

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    currentScene.current = 0;
    setActiveScene(0);

    const firstEl = sceneRefs.current[0];
    if (firstEl) {
      sceneRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { display: i === 0 ? "flex" : "none", opacity: 0 });
      });

      gsap.set(firstEl, {
        display: "flex",
        opacity: 0,
        y: 30,
        filter: "blur(16px)",
        scale: 1.04,
      });

      gsap.to(firstEl, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.0,
        delay: 0.25,
        ease: "power3.out",
        onComplete: () => {
          const children = firstEl.querySelectorAll(`.${styles.animChild}`);
          if (children.length) {
            gsap.set(children, { opacity: 1, y: 0, filter: "blur(0px)" });
          }
        },
      });
    }

    const initialScene = SCENES[0];
    changeBackground(0, true);

    if (initialScene.media.type === "video") {
      videoRef.current.src = initialScene.media.src;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }

    gsap.set(overlayRef.current, { opacity: initialScene.overlay });

    // ── Primeiro step dura 10s, demais 2.5s
    startAutoplay(8000);

    return () => {
      clearTimeout(autoplayRef.current);
      clearInterval(autoplayRef.current);
      currentScene.current = 0;
      isMounted.current = false;
    };
  }, [transitionTo, changeBackground, startAutoplay]);

  const goToScene = (idx) => {
    clearTimeout(autoplayRef.current);
    clearInterval(autoplayRef.current);
    transitionTo(idx);
    startAutoplay(2500);
  };

  return (
    <section ref={heroRef} className={styles.hero} id="inicio">
      <div className={styles.heroBg}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        />
        <img
          ref={imageRef}
          src={imageSrc || hero_step2}
          alt="Background"
          className={styles.heroImage}
        />
        <div ref={overlayRef} className={styles.heroOverlay} />
        <div className={styles.vignette} />
      </div>

      {/* ─── SCENE 1 ─── */}
      <div ref={(el) => (sceneRefs.current[0] = el)} className={`${styles.scene} ${styles.scene1}`}>
        <div className={styles.sceneInner}>
          <div className={styles.scene1Content}>
            <span className={`${styles.eyebrow} ${styles.animChild}`}>VitaPools</span>
            <h1 className={`${styles.displayTitle} ${styles.displayTitleLeft} ${styles.animChild}`}>
              Transparência<br /><em>Confiança.</em><br />Profissionalismo.
            </h1>
            <p className={`${styles.lead} ${styles.animChild}`}>
              Manutenção e limpeza de piscinas com qualidade, confiança e profissionalismo.
            </p>
            <div className={`${styles.buttonRow} ${styles.animChild}`}>
              <Link href="/budget" className={styles.btnPrimary}>Pedir Orçamento</Link>
              <Link href="/services" className={styles.btnGhost}>Ver Serviços</Link>
            </div>
          </div>
          <div className={`${styles.scene1Logo} ${styles.animChild}`}>
            <Image 
              src={logo} 
              alt="VitaPools Logo" 
              className={styles.logoImage}
              priority
            />
          </div>
        </div>
      </div>

      <div ref={(el) => (sceneRefs.current[1] = el)} className={`${styles.scene} ${styles.scene2}`}>
        <div className={styles.sceneInner}>
          <p className={`${styles.sceneIndex} ${styles.animChild}`}>01</p>
          <h2 className={`${styles.displayTitle} ${styles.displayTitleRight} ${styles.animChild}`}>
            Atuamos em<br /><em>Mafra</em><br />Ericeira.
          </h2>
          <p className={`${styles.lead} ${styles.leadRight} ${styles.animChild}`}>
            Analisamos, tratamos e equilibramos a água para garantir segurança e qualidade.
          </p>
        </div>
      </div>

      <div ref={(el) => (sceneRefs.current[2] = el)} className={`${styles.scene} ${styles.scene3}`}>
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

      <div ref={(el) => (sceneRefs.current[3] = el)} className={`${styles.scene} ${styles.scene5}`}>
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

    </section>
  );
};

export default HeroMain;