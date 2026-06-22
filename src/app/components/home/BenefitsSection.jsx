"use client";

import React from "react";
import {
  UserSearch,
  Wrench,
  Package,
  Waves,
  Shield,
  BadgeCheck,
} from "lucide-react";
import styles from "@/assets/css/home/BenefitsSection.module.css";

const Benefits = () => {
  const benefits = [
    {
      icon: UserSearch,
      title: "Atendimento personalizado",
      description: "Soluções adaptadas às necessidades específicas da sua piscina e frequência de uso.",
    },
    {
      icon: Wrench,
      title: "Especialistas em manutenção",
      description: "Equipa técnica qualificada com anos de experiência no setor de tratamento de águas.",
    },
    {
      icon: Package,
      title: "Produtos de qualidade",
      description: "Utilizamos apenas químicos certificados de alta performance para garantir a segurança dos banhistas.",
    },
    {
      icon: Waves,
      title: "Recuperação de água verde",
      description: "Transformamos águas turvas e verdes em cristais líquidos em tempo recorde.",
    },
    {
      icon: Shield,
      title: "Manutenção preventiva",
      description: "Evite reparações dispendiosas com o nosso plano de acompanhamento regular.",
    },
    {
      icon: BadgeCheck,
      title: "Rapidez e confiança",
      description: "Compromisso total com prazos e a máxima transparência em cada intervenção.",
    },
  ];

  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Porquê escolher a VitaPools?</h2>
          <div className={styles.divider}></div>
        </div>

        {/* Grid de Benefícios */}
        <div className={styles.grid}>
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className={styles.card}>
                <IconComponent className={styles.icon} size={36} strokeWidth={1.5} />
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;