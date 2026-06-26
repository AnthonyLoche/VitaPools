// app/components/Diagnosis/Hero.jsx

import React from "react";
import styles from "@/assets/css/diagnosis/Hero.module.css";

const DiagnosisHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>Ferramentas Gratuitas</span>
        <h1 className={styles.heroTitle}>Diagnóstico da sua piscina</h1>
        <p className={styles.heroDescription}>
          Descubra o que se passa com a sua piscina em menos de 1 minuto, ou
          insira os valores da sua análise e saiba exatamente o que precisa de
          corrigir.
        </p>
      </div>
      <div className={styles.heroWave}></div>
    </section>
  );
};

export default DiagnosisHero;