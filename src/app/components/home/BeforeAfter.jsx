"use client";

import React from "react";
import Image from "next/image";
import styles from "@/assets/css/home/BeforeAfter.module.css";
import before1 from "@/assets/images/before1.jpeg";
import after1 from "@/assets/images/after1.jpeg";
import before2 from "@/assets/images/before2.jpeg";
import after2 from "@/assets/images/after2.jpeg";

const BeforeAfter = () => {
  const results = [
    {
      id: 1,
      title: "Recuperação Intensiva",
      description: '"A água estava verde há meses. Em apenas 48h a VitaPools deixou-a pronta para uso."',
      beforeImage: before1,
      afterImage: after1,
      beforeAlt: "Piscina verde antes do tratamento",
      afterAlt: "Piscina cristalina depois do tratamento",
    },
    {
      id: 2,
      title: "Limpeza de Resíduos",
      description: '"Fundo e paredes completamente aspirados e higienizados. Trabalho impecável."',
      beforeImage: before2,
      afterImage: after2,
      beforeAlt: "Piscina suja antes da limpeza",
      afterAlt: "Piscina limpa depois da limpeza",
    },
  ];

  return (
    <section className={styles.beforeAfter}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Resultados que Impressionam</h2>
          <p className={styles.subtitle}>
            Veja a transformação radical em algumas das nossas intervenções recentes.
          </p>
        </div>

        <div className={styles.grid}>
          {results.map((result) => (
            <div key={result.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {/* Before */}
                <div className={styles.imageHalf}>
                  <Image
                    src={result.beforeImage}
                    alt={result.beforeAlt}
                    className={styles.image}
                    fill
                  />
                  <span className={`${styles.badge} ${styles.badgeBefore}`}>Antes</span>
                </div>

                {/* After */}
                <div className={styles.imageHalf}>
                  <Image
                    src={result.afterImage}
                    alt={result.afterAlt}
                    className={styles.image}
                    fill
                  />
                  <span className={`${styles.badge} ${styles.badgeAfter}`}>Depois</span>
                </div>
              </div>

              <div className={styles.content}>
                <h4 className={styles.cardTitle}>{result.title}</h4>
                <p className={styles.cardDescription}>{result.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;