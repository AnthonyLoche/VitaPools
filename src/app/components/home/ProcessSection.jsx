"use client";

import React from "react";
import {
  PenTool,
  Search,
  CheckCircle,
  Droplets,
} from "lucide-react";
import Wavify from "react-wavify";
import styles from "@/assets/css/home/ProcessSection.module.css";

const ProcessSection = () => {
  const steps = [
    {
      id: 1,
      title: "Pedido de orçamento",
      description: "Contacte-nos com os detalhes da sua piscina e localização.",
      icon: PenTool,
    },
    {
      id: 2,
      title: "Análise da piscina",
      description: "Avaliamos o estado da água e equipamentos presencialmente.",
      icon: Search,
    },
    {
      id: 3,
      title: "Execução do serviço",
      description: "Realizamos a intervenção com máxima eficiência e limpeza.",
      icon: CheckCircle,
    },
    {
      id: 4,
      title: "Piscina pronta",
      description: "Desfrute da sua piscina com total tranquilidade e segurança.",
      icon: Droplets,
    },
  ];

  return (
    <section className={styles.process} id="como-trabalhamos">
      {/* Wavify Background */}
      <div className={styles.wavifyContainer}>
        <Wavify
          fill="#000080"
          paused={false}
          options={{
            height: 45,
            amplitude: 40,
            speed: 0.2,
            points: 4,
          }}
        />
      </div>
            <div className={styles.wavifyContainer2}>
        <Wavify
          fill="#000080"
          paused={false}
          options={{
            height: 60,
            amplitude: 40,
            speed: 0.2,
            points: 4,
          }}
        />
      </div>

      <div className={styles.container}>
        {/* Background Decoration */}
        <div className={styles.decoration}>
          <Droplets className={styles.decorationIcon} size={400} strokeWidth={0.5} />
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>O Nosso Processo</h2>
          <p className={styles.subtitle}>
            Um caminho simples e transparente para a sua piscina perfeita.
          </p>
        </div>

        {/* Steps Grid */}
        <div className={styles.grid}>
          {/* Connector Line */}
          <div className={styles.connector}></div>

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className={styles.step}>
                <div className={styles.stepIcon}>
                  <IconComponent className={styles.icon} size={32} strokeWidth={1.5} />
                </div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;