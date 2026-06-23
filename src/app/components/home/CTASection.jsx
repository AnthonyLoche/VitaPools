"use client";

import React from "react";
import {
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";
import styles from "@/assets/css/home/CTASection.module.css";
import Image from "next/image";
import background from "@/assets/images/cta.jpg";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className={styles.cta} id="contato">
      <div className={styles.background}>
        <Image
          alt="Luxury Pool Background"
          className={styles.backgroundImage}
          src={background}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className={styles.backgroundOverlay}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Pronto para ter uma piscina impecável?</h2>
          <p className={styles.description}>
            Peça agora o seu orçamento gratuito e personalizado para os nossos serviços premium de manutenção e limpeza.
          </p>

          <Link href="/budget" className={styles.button}>
            Solicitar Orçamento Agora
            <ArrowRight size={24} />
          </Link>

          <div className={styles.features}>
            <div className={styles.feature}>
              <CheckCircle size={20} className={styles.featureIcon} />
              <span className={styles.featureText}>Orçamento Grátis</span>
            </div>
            <div className={styles.feature}>
              <Clock size={20} className={styles.featureIcon} />
              <span className={styles.featureText}>Resposta em 24h</span>
            </div>
            <div className={styles.feature}>
              <Award size={20} className={styles.featureIcon} />
              <span className={styles.featureText}>Serviço Premium</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;