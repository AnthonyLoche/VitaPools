"use client";

import React from "react";
import {
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";
import styles from "@/assets/css/home/CTASection.module.css";

const CTASection = () => {
  return (
    <section className={styles.cta} id="contato">
      <div className={styles.background}>
        <img
          alt="Luxury Pool Background"
          className={styles.backgroundImage}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAphnWohYRJBHm_R8Y0h7vtNWV61z-QY1gkFu68aU_LJZMJl_-yRBsC6IP25c50yNfnDhRE_D_ghwmiKRsRRkItxg_5n1Whd6Rw4-A-sNCgobNErT1TlmsmFOXVXPuG9RYoUwhsOyebbicj0GdWWkcc9-uRfnFmc0VAgdqk3CPlBlDObbjK9IqwOHjGHH4mdryfRD5Ew0p9Pug3gL3Ig7xyLdLMvhHOe1iVXYOlcMHFuhV9DDXYFHQtIh322QnJZWWRElJo4aGLww"
        />
        <div className={styles.backgroundOverlay}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Pronto para ter uma piscina impecável?</h2>
          <p className={styles.description}>
            Peça agora o seu orçamento gratuito e personalizado para os nossos serviços premium de manutenção e limpeza.
          </p>

          <a href="mailto:info@vitapools.pt" className={styles.button}>
            Solicitar Orçamento Agora
            <ArrowRight size={24} />
          </a>

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