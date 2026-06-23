"use client";

import React from "react";
import styles from "@/assets/css/home/HeroMain.module.css";
import hero_video from "@/assets/videos/hero.mp4";
import Link from "next/link";

import WaterCanvas from "./WaterCanvas";

const HeroMain = () => {
  return (
    <section className={styles.hero} id="inicio">
      {/* Background */}
      <div className={styles.heroBackground}>
        <video autoPlay muted loop playsInline className={styles.heroImage}>
          <source src={hero_video} type="video/mp4" />
        </video>

        <div className={styles.heroOverlay}></div>

        {/* Three.js */}
        <WaterCanvas />
      </div>

      {/* Conteúdo */}
      <div className={styles.heroContent}>
        <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <span className={styles.heroBadge}>VitaPools</span>

            <h1 className={styles.heroTitle}>
              Manutenção e Limpeza de Piscinas em Portugal
            </h1>

            <p className={styles.heroDescription}>
              Tratamento, manutenção e recuperação da sua piscina com qualidade,
              confiança e profissionalismo.
            </p>

            <div className={styles.heroButtons}>
              <Link href="/budget" className={styles.primaryButton}>
                Pedir Orçamento
              </Link>

              <Link href="/services" className={styles.secondaryButton}>
                Ver Serviços
              </Link>
            </div>

            <div className={styles.heroFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>

                <span className={styles.featureText}>
                  Atendimento personalizado
                </span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>

                <span className={styles.featureText}>Serviço profissional</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>

                <span className={styles.featureText}>
                  Água sempre cristalina
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMain;
