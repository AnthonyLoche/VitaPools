"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "@/assets/css/home/FAQSection.module.css";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Quanto custa a manutenção mensal?",
      answer: "Os valores variam conforme o tamanho da piscina e a frequência das visitas (semanal ou quinzenal). Solicite um orçamento personalizado para obter um preço exato para o seu caso.",
    },
    {
      question: "Em quanto tempo recuperam uma água verde?",
      answer: "Normalmente, em 48 a 72 horas conseguimos reverter o estado da água de verde para cristalina, dependendo da saturação de algas e do estado dos filtros.",
    },
    {
      question: "Atendem em que regiões?",
      answer: "Focamos a nossa atuação nas zonas de Ericeira, Mafra, Torres Vedras e arredores, garantindo rapidez e proximidade.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <h2 className={styles.title}>Perguntas Frequentes</h2>

        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => toggleFAQ(index)}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <ChevronDown
                  className={`${styles.icon} ${openIndex === index ? styles.iconOpen : ''}`}
                  size={24}
                />
              </button>
              <div
                className={`${styles.answer} ${openIndex === index ? styles.answerOpen : ''}`}
              >
                <p className={styles.answerText}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;