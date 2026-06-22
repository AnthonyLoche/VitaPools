"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Wavify from "react-wavify";
import styles from "@/assets/css/layout/HeaderMain.module.css";
import logo from "@/assets/images/logo_h.png";

const HeaderMain = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [amplitude, setAmplitude] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // quanto mais scroll, mais "agitada" fica a água
      setAmplitude(Math.min(3 + window.scrollY * 0.02, 10));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Image className={styles.logo} alt="VitaPools" src={logo} />
        </div>

        <div className={styles.navLinks}>
          <a className={`${styles.navLink} ${styles.active}`} href="#inicio">
            Início
          </a>

          <a className={styles.navLink} href="#servicos">
            Serviços
          </a>

          <a className={styles.navLink} href="#como-trabalhamos">
            Como Trabalhamos
          </a>

          <a className={styles.navLink} href="#projetos">
            Projetos
          </a>

          <a className={styles.navLink} href="#avaliacoes">
            Avaliações
          </a>
        </div>

        <a className={styles.ctaButton} href="#contato">
          Solicitar Orçamento
        </a>
      </nav>

      <div className={styles.waveContainer}>
        <Wavify
          fill="#0062A1"
          paused={false}
          options={{
            height: 6,
            amplitude: 10,
            speed: 0.25,
            points: 10,
          }}
        />
      </div>
    </header>
  );
};

export default HeaderMain;
