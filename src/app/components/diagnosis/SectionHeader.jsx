// app/components/Diagnosis/SectionHeader.jsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/diagnosis/SectionHeader.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SectionHeader = ({ badge, title, subtitle }) => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    // --- BADGE ---
    gsap.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
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
      { opacity: 0, y: 30, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        delay: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- DIVIDER ---
    gsap.fromTo(
      dividerRef.current,
      { opacity: 0, scaleX: 0 },
      {
        opacity: 1,
        scaleX: 1,
        duration: 0.8,
        delay: 0.35,
        ease: "power3.out",
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
      { opacity: 0, y: 20, filter: "blur(4px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // --- EFEITO DE PARALLAX NO TÍTULO ---
    gsap.to(titleRef.current, {
      y: -8,
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
    <div ref={sectionRef} className={styles.sectionHeader}>
      <span ref={badgeRef} className={styles.sectionBadge}>
        {badge}
      </span>
      <h2 ref={titleRef} className={styles.sectionTitle}>
        {title}
      </h2>
      <div ref={dividerRef} className={styles.sectionDivider}></div>
      <p ref={subtitleRef} className={styles.sectionSubtitle}>
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;