"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wavify from "react-wavify";
import { X, Menu } from "lucide-react";
import styles from "@/assets/css/layout/HeaderMain.module.css";
import logo from "@/assets/images/logo_h.png";

const HeaderMain = () => {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [amplitude, setAmplitude]     = useState(3);
  const [menuOpen, setMenuOpen]       = useState(false);
  const pathname = usePathname();
  const menuRef  = useRef(null);

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  /* close menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* scroll handler */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setAmplitude(Math.min(3 + window.scrollY * 0.02, 10));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* close menu when clicking outside */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /* lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: "/",          label: "Início" },
    { href: "/services",  label: "Serviços" },
    { href: "/diagnosis", label: "Fazer Diagnóstico" },
    { href: "/gallery",   label: "Galeria" },
  ];

  return (
    <>
      <header
        ref={menuRef}
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <nav className={styles.nav}>
          {/* Logo */}
          <Link href="/" className={styles.logoContainer}>
            <Image className={styles.logo} alt="VitaPools" src={logo} priority />
          </Link>

          {/* Desktop links */}
          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link href="/budget" className={`${styles.ctaButton} ${styles.ctaDesktop}`}>
            Solicitar Orçamento
          </Link>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </nav>

        {/* Wave */}
        <div className={`${styles.waveContainer} ${menuOpen ? styles.waveHidden : ""}`}>
          <Wavify
            fill="#0062a1"
            paused={false}
            options={{ height: 10, amplitude, speed: 0.25, points: 10 }}
          />
        </div>

        {/* Mobile drawer */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/budget"
            className={styles.ctaButton}
            onClick={() => setMenuOpen(false)}
          >
            Solicitar Orçamento
          </Link>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  );
};

export default HeaderMain;