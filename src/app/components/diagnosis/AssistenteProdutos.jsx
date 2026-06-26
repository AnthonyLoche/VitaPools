// app/components/Diagnosis/AssistenteProdutos.jsx

"use client";

import React, { useState } from "react";
import styles from "@/assets/css/diagnosis/AssistenteProdutos.module.css";

const AssistenteProdutos = () => {
  const [phValue, setPhValue] = useState("");
  const [cloroValue, setCloroValue] = useState("");
  const [alcValue, setAlcValue] = useState("");
  const [assistResult, setAssistResult] = useState(null);

  const handleAssistCalculate = () => {
    const ph = parseFloat(phValue);
    const cloro = parseFloat(cloroValue);
    const alc = parseFloat(alcValue);

    if (isNaN(ph) && isNaN(cloro) && isNaN(alc)) {
      setAssistResult({
        type: "warning",
        title: "Preencha pelo menos um valor",
        message:
          "Introduza o pH, cloro ou alcalinidade que mediu para receber uma recomendação.",
      });
      return;
    }

    let issues = [];
    let isOk = true;

    if (!isNaN(ph)) {
      if (ph < 7.2) {
        issues.push(
          "pH baixo — considere adicionar corretor de pH+ (cerca de 10 ml por m³, ajustável)"
        );
        isOk = false;
      } else if (ph > 7.6) {
        issues.push(
          "pH alto — considere adicionar corretor de pH- (cerca de 10 ml por m³, ajustável)"
        );
        isOk = false;
      }
    }

    if (!isNaN(cloro)) {
      if (cloro < 1) {
        issues.push(
          "cloro livre baixo — adicione cloro de manutenção (cerca de 1 g por m³)"
        );
        isOk = false;
      } else if (cloro > 3) {
        issues.push(
          "cloro livre alto — evite usar a piscina e deixe estabilizar antes de adicionar mais produto"
        );
        isOk = false;
      }
    }

    if (!isNaN(alc)) {
      if (alc < 80) {
        issues.push(
          "alcalinidade baixa — pode causar variações bruscas de pH, considere um aumentador de alcalinidade"
        );
        isOk = false;
      } else if (alc > 150) {
        issues.push("alcalinidade alta — pode dificultar o controlo do pH");
        isOk = false;
      }
    }

    if (isOk) {
      setAssistResult({
        type: "success",
        title: "Hoje não precisa de fazer nada!",
        message:
          "Os valores introduzidos estão dentro do intervalo ideal. Continue a monitorizar regularmente.",
      });
    } else {
      setAssistResult({
        type: "action",
        title: "Recomendações para hoje",
        message: issues.join(" • "),
      });
    }
  };

  return (
    <div className={styles.assistCard}>
      <div className={styles.assistRow}>
        <div className={styles.assistField}>
          <label>pH medido</label>
          <input
            type="number"
            value={phValue}
            onChange={(e) => setPhValue(e.target.value)}
            placeholder="7.4"
            step="0.1"
          />
        </div>
        <div className={styles.assistField}>
          <label>Cloro livre (ppm)</label>
          <input
            type="number"
            value={cloroValue}
            onChange={(e) => setCloroValue(e.target.value)}
            placeholder="2"
            step="0.1"
          />
        </div>
        <div className={styles.assistField}>
          <label>Alcalinidade (ppm)</label>
          <input
            type="number"
            value={alcValue}
            onChange={(e) => setAlcValue(e.target.value)}
            placeholder="100"
          />
        </div>
      </div>
      <button className={styles.assistButton} onClick={handleAssistCalculate}>
        Ver o que fazer hoje
      </button>

      {assistResult && (
        <div className={`${styles.assistResult} ${styles[assistResult.type]}`}>
          <h4>{assistResult.title}</h4>
          <p>{assistResult.message}</p>
        </div>
      )}
    </div>
  );
};

export default AssistenteProdutos;