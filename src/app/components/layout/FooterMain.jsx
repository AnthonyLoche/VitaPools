"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Camera,
} from "lucide-react";
import styles from "@/assets/css/layout/FooterMain.module.css";
import logo from "@/assets/images/logo_h_remove.png";
import Image from "next/image";

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
              <a href="#" className={styles.socialLink} aria-label="Facebook">
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Camera size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className={styles.columnTitle}>Links Rápidos</h4>
            <ul className={styles.linkList}>
              <li><a href="#inicio" className={styles.link}>Início</a></li>
              <li><a href="#servicos" className={styles.link}>Serviços</a></li>
              <li><a href="#como-trabalhamos" className={styles.link}>Como Trabalhamos</a></li>
              <li><a href="#projetos" className={styles.link}>Projetos</a></li>
              <li><a href="#avaliacoes" className={styles.link}>Avaliações</a></li>
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
                <span>+351 900 000 000</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={16} className={styles.contactIcon} />
                <span>info@vitapools.pt</span>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} />
                <span>Mafra, Portugal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2024 VitaPools. Todos os direitos reservados.</p>
          <p>Desenvolvido com excelência para o seu bem-estar.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;