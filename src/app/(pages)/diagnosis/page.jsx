// app/diagnosis/page.jsx

"use client";

import { HeaderMain, FooterMain } from "@/app/components";
import DiagnosisHero from "@/app/components/Diagnosis/Hero";
import SectionHeader from "@/app/components/Diagnosis/SectionHeader";
import MedicoPiscina from "@/app/components/Diagnosis/MedicoPiscina";
import AssistenteProdutos from "@/app/components/Diagnosis/AssistenteProdutos";
import ContatoRapido from "@/app/components/Diagnosis/ContatoRapido";
import styles from "@/assets/css/diagnosis/main.module.css";

const DiagnosisPage = () => {
  return (
    <>
      <HeaderMain />
      <main className={styles.main}>
        <DiagnosisHero />

        <div className={styles.container}>
          {/* Médico da Piscina */}
          <section className={styles.medicoSection}>
            <SectionHeader
              badge="Ferramenta Principal"
              title="O Médico da Piscina"
              subtitle="Responda a 3 perguntas rápidas e descubra, em menos de 1 minuto, o que se passa com a sua piscina."
            />
            <MedicoPiscina />
          </section>

          {/* Assistente de Produtos */}
          <section className={styles.assistSection}>
            <SectionHeader
              badge="Ferramenta Gratuita"
              title="O que medi hoje — e agora?"
              subtitle="Introduza os valores da sua análise e saiba exatamente se precisa de corrigir algo, sem adivinhar."
            />
            <AssistenteProdutos />
          </section>

          {/* Contacto Rápido */}
          <section className={styles.contactSection}>
            <ContatoRapido />
          </section>
        </div>
      </main>
      <FooterMain />
    </>
  );
};

export default DiagnosisPage;