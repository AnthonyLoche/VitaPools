"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import styles from "@/assets/css/layout/FooterMain.module.css";
import logo from "@/assets/images/logo_h_removed_white.png";
import Image from "next/image";
import Link from "next/link";

// Ícone Facebook SVG
const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Ícone Instagram SVG
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Brand */}
          <div className={styles.brandColumn}>
            <div className={styles.brandHeader}>
              <Image
                alt="VitaPools Logo"
                className={styles.logo}
                src={logo}
              />
            </div>
            <p className={styles.brandDescription}>
              Líderes em manutenção de piscinas residenciais e comerciais em Portugal. Especialistas em garantir a qualidade da sua água.
            </p>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.facebook.com/profile.php?id=61574078202244" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink} 
                aria-label="Facebook"
              >
                <FacebookIcon size={20} />
              </a>
              <a 
                href="https://www.instagram.com/vitapoolsnd/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink} 
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className={styles.columnTitle}>Links Rápidos</h4>
            <ul className={styles.linkList}>
              <li><Link href="/" className={styles.link}>Início</Link></li>
              <li><Link href="/services" className={styles.link}>Serviços</Link></li>
              <li><Link href="/diagnostico" className={styles.link}>Diagnósticos</Link></li>
            </ul>
          </div>

          {/* Column 3: Areas */}
          <div>
            <h4 className={styles.columnTitle}>Áreas de Atuação</h4>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>Ericeira</a></li>
              <li><a href="#" className={styles.link}>Mafra</a></li>
              <li><a href="#" className={styles.link}>Torres Vedras</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className={styles.columnTitle}>Contactos</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Phone size={16} className={styles.contactIcon} />
                <span>+351 932 096 025</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={16} className={styles.contactIcon} />
                <span>Vitapoolsmanutencao@gmail.com</span>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} />
                <span>Mafra, Portugal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 VitaPools. Todos os direitos reservados.</p>
          <p>Desenvolvido com excelência para o seu bem-estar.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;