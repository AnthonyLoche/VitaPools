// app/components/Diagnosis/ContatoRapido.jsx

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import styles from "@/assets/css/diagnosis/ContatoRapido.module.css";

const ContatoRapido = () => {
  return (
    <div className={styles.contactCard}>
      <div className={styles.contactInfo}>
        <h3>Precisa de ajuda personalizada?</h3>
        <p>Fale connosco diretamente para uma avaliação profissional da sua piscina.</p>
        <div className={styles.contactItems}>
          <div className={styles.contactItem}>
            <Phone size={18} />
            <span>+351 932 096 025</span>
          </div>
          <div className={styles.contactItem}>
            <Mail size={18} />
            <span>Vitapoolsmanutencao@gmail.com</span>
          </div>
          <div className={styles.contactItem}>
            <MapPin size={18} />
            <span>Mafra, Portugal</span>
          </div>
        </div>
      </div>
      <Link href="/contato" className={styles.contactButton}>
        Pedir Orçamento
        <ArrowRight size={20} />
      </Link>
    </div>
  );
};

export default ContatoRapido;