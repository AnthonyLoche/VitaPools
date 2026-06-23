"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wavify from "react-wavify";
import styles from "@/assets/css/layout/HeaderMain.module.css";
import logo from "@/assets/images/logo_h.png";

const HeaderMain = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [amplitude, setAmplitude] = useState(3);
  const pathname = usePathname();

  // Definir link ativo baseado no pathname
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // quanto mais scroll, mais "agitada" fica a água
      setAmplitude(Math.min(3 + window.scrollY * 0.02, 10));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/services", label: "Serviços" },
    { href: "/diagnosis", label: "Fazer Diagnóstico" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logoContainer}>
          <Image className={styles.logo} alt="VitaPools" src={logo} priority />
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                isActive(link.href) ? styles.active : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/budget" className={styles.ctaButton}>
          Solicitar Orçamento
        </Link>
      </nav>

      <div className={styles.waveContainer}>
        <Wavify
          fill="#000080"
          paused={false}
          options={{
            height: 6,
            amplitude: amplitude,
            speed: 0.25,
            points: 10,
          }}
        />
      </div>
    </header>
  );
};

export default HeaderMain;