// app/components/Diagnosis/MedicoPiscina.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Waves, Droplets, FlaskConical, AlertCircle, HelpCircle, RefreshCw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/diagnosis/MedicoPiscina.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MedicoPiscina = () => {
  const [medicoStep, setMedicoStep] = useState(1);
  const [medicoState, setMedicoState] = useState({});
  const [showResult, setShowResult] = useState(false);

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const stepRef = useRef(null);
  const optionsRef = useRef([]);
  const backButtonRef = useRef(null);
  const resultRef = useRef(null);
  const resultTitleRef = useRef(null);
  const resultDetailRef = useRef(null);
  const resultActionsRef = useRef(null);

  const problemas = [
    { id: "verde", label: "Água verde", icon: <Waves size={20} /> },
    { id: "turva", label: "Água turva", icon: <Droplets size={20} /> },
    { id: "ph", label: "pH descontrolado", icon: <FlaskConical size={20} /> },
    { id: "manchas", label: "Manchas nas paredes", icon: <AlertCircle size={20} /> },
    { id: "cheiro", label: "Cheiro forte a cloro", icon: <AlertCircle size={20} /> },
    { id: "sembrilho", label: "Cristalina mas sem brilho", icon: <HelpCircle size={20} /> },
  ];

  const problemasCol1 = problemas.slice(0, 3);
  const problemasCol2 = problemas.slice(3, 6);

  const duracaoOptions = [
    { id: "recente", label: "Apareceu há poucos dias" },
    { id: "semana", label: "Já leva cerca de 1 semana" },
    { id: "mes", label: "Já leva 2 semanas a 1 mês" },
  ];

  const frequenciaOptions = [
    { id: "regular", label: "Semanal ou quinzenal" },
    { id: "ocasional", label: "De vez em quando" },
    { id: "raro", label: "Raramente, ou só quando há problema" },
  ];

  const problemaInfo = {
    verde: {
      label: "água verde",
      causa: "presença de algas, geralmente por cloro insuficiente ou filtração deficiente",
      baseUrgencia: 2,
    },
    turva: {
      label: "água turva",
      causa: "desequilíbrio químico ou filtração fraca",
      baseUrgencia: 1,
    },
    ph: {
      label: "pH descontrolado",
      causa: "falta de correção regular de pH e alcalinidade",
      baseUrgencia: 1,
    },
    manchas: {
      label: "manchas nas paredes",
      causa: "acumulação de calcário ou óxido metálico",
      baseUrgencia: 0,
    },
    cheiro: {
      label: "cheiro forte a cloro",
      causa: "cloraminas acumuladas (cloro combinado), não excesso de cloro",
      baseUrgencia: 1,
    },
    sembrilho: {
      label: "água sem brilho",
      causa: "falta de clarificação ou desequilíbrio mineral leve",
      baseUrgencia: 0,
    },
  };

  const duracaoPeso = { recente: 0, semana: 1, mes: 2 };
  const frequenciaPeso = { regular: 0, ocasional: 1, raro: 2 };

  // --- ANIMAÇÃO DE ENTRADA DO CARD ---
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // --- ANIMAÇÃO QUANDO O STEP MUDA ---
  useEffect(() => {
    if (!stepRef.current) return;

    // Anima a transição do step
    gsap.fromTo(
      stepRef.current,
      { opacity: 0, y: 20, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    // Anima as opções individualmente
    if (optionsRef.current.length > 0) {
      optionsRef.current.forEach((option, index) => {
        if (option) {
          gsap.fromTo(
            option,
            { opacity: 0, x: index % 2 === 0 ? -15 : 15, scale: 0.95 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.5,
              delay: index * 0.08,
              ease: "power3.out",
            }
          );
        }
      });
    }

    // Anima o botão de voltar
    if (backButtonRef.current) {
      gsap.fromTo(
        backButtonRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }

    // Anima o progresso
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [medicoStep, showResult]);

  // --- ANIMAÇÃO QUANDO O RESULTADO É MOSTRADO ---
  useEffect(() => {
    if (!showResult || !resultRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      resultRef.current,
      { opacity: 0, scale: 0.95, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      }
    )
    .fromTo(
      resultTitleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .fromTo(
      resultDetailRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.3"
    )
    .fromTo(
      resultActionsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // Anima o badge de urgência separadamente
    const urgencyBadge = resultRef.current.querySelector(`.${styles.urgencyBadge}`);
    if (urgencyBadge) {
      gsap.fromTo(
        urgencyBadge,
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.7)",
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, [showResult]);

  const handleMedicoChoose = (key, value) => {
    const newState = { ...medicoState, [key]: value };
    setMedicoState(newState);

    if (medicoStep < 3) {
      setMedicoStep(medicoStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleMedicoBack = (step) => {
    setMedicoStep(step);
  };

  const handleMedicoRestart = () => {
    setMedicoState({});
    setMedicoStep(1);
    setShowResult(false);
  };

  const getMedicoResult = () => {
    const p = problemaInfo[medicoState.problema];
    if (!p) return null;

    const score =
      p.baseUrgencia +
      (duracaoPeso[medicoState.duracao] || 0) +
      (frequenciaPeso[medicoState.frequencia] || 0);

    let urgencyLabel, tempoRecuperacao;
    if (score <= 1) {
      urgencyLabel = "Urgência baixa";
      tempoRecuperacao = "1 a 2 dias";
    } else if (score <= 3) {
      urgencyLabel = "Urgência média";
      tempoRecuperacao = "2 a 4 dias";
    } else {
      urgencyLabel = "Urgência alta";
      tempoRecuperacao = "4 a 7 dias, com acompanhamento";
    }

    const duracaoTexto = {
      recente: "apareceu há poucos dias",
      semana: "já leva cerca de uma semana",
      mes: "já leva entre duas semanas e um mês",
    }[medicoState.duracao];

    const freqTexto = {
      regular: "mantém uma manutenção regular",
      ocasional: "trata a piscina de vez em quando",
      raro: "raramente trata a piscina",
    }[medicoState.frequencia];

    return {
      urgencyLabel,
      tempoRecuperacao,
      causa: p.causa,
      duracaoTexto,
      freqTexto,
      score,
      problema: p.label,
    };
  };

  const result = getMedicoResult();

  const generateWhatsAppMessage = () => {
    if (!result) return "";
    return (
      `*🟦 Diagnóstico - VitaPools*%0A%0A` +
      `*Problema:* ${result.problema}%0A` +
      `*Urgência:* ${result.urgencyLabel}%0A` +
      `*Tempo estimado:* ${result.tempoRecuperacao}%0A` +
      `*Causa provável:* ${result.causa}%0A` +
      `*Situação:* O problema ${result.duracaoTexto}, e ${result.freqTexto}.%0A%0A` +
      `Gostaria de agendar uma avaliação profissional.`
    );
  };

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/351932096025?text=${message}`, "_blank");
  };

  // Função para resetar as referências das opções
  const resetOptionsRef = () => {
    optionsRef.current = [];
  };

  return (
    <div ref={sectionRef} className={styles.medicoWrapper}>
      <div ref={cardRef} className={styles.medicoCard}>
        <div ref={progressRef} className={styles.medicoProgress}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`${styles.stepDot} ${step <= medicoStep ? styles.stepDone : ""}`}
            />
          ))}
        </div>

        {/* Step 1 */}
        {!showResult && medicoStep === 1 && (
          <div ref={stepRef} className={styles.medicoStep}>
            <h3 className={styles.medicoQuestion}>Qual é o problema da sua piscina?</h3>
            <p className={styles.medicoSub}>Escolha a opção que descreve melhor o que está a ver.</p>
            <div className={styles.medicoOptions}>
              <div className={styles.medicoOptionsCol}>
                {problemasCol1.map((p, index) => (
                  <button
                    key={p.id}
                    ref={(el) => (optionsRef.current[index] = el)}
                    className={styles.medicoOpt}
                    onClick={() => handleMedicoChoose("problema", p.id)}
                  >
                    <span className={styles.medicoOptIcon}>{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>
              <div className={styles.medicoOptionsCol}>
                {problemasCol2.map((p, index) => (
                  <button
                    key={p.id}
                    ref={(el) => (optionsRef.current[index + 3] = el)}
                    className={styles.medicoOpt}
                    onClick={() => handleMedicoChoose("problema", p.id)}
                  >
                    <span className={styles.medicoOptIcon}>{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {!showResult && medicoStep === 2 && (
          <div ref={stepRef} className={styles.medicoStep}>
            <h3 className={styles.medicoQuestion}>Há quanto tempo isto se nota?</h3>
            <p className={styles.medicoSub}>Isto ajuda a estimar a gravidade e o tempo de recuperação.</p>
            <div className={styles.medicoOptions}>
              {duracaoOptions.map((d, index) => (
                <button
                  key={d.id}
                  ref={(el) => (optionsRef.current[index] = el)}
                  className={styles.medicoOpt}
                  onClick={() => handleMedicoChoose("duracao", d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <button 
              ref={backButtonRef} 
              className={styles.medicoBack} 
              onClick={() => handleMedicoBack(1)}
            >
              ← Voltar
            </button>
          </div>
        )}

        {/* Step 3 */}
        {!showResult && medicoStep === 3 && (
          <div ref={stepRef} className={styles.medicoStep}>
            <h3 className={styles.medicoQuestion}>Com que frequência costuma tratar a piscina?</h3>
            <p className={styles.medicoSub}>Última pergunta — já quase lá.</p>
            <div className={styles.medicoOptions}>
              {frequenciaOptions.map((f, index) => (
                <button
                  key={f.id}
                  ref={(el) => (optionsRef.current[index] = el)}
                  className={styles.medicoOpt}
                  onClick={() => handleMedicoChoose("frequencia", f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button 
              ref={backButtonRef} 
              className={styles.medicoBack} 
              onClick={() => handleMedicoBack(2)}
            >
              ← Voltar
            </button>
          </div>
        )}

        {/* Resultado */}
        {showResult && result && (
          <div ref={resultRef} className={styles.medicoResult}>
            <div
              className={`${styles.urgencyBadge} ${
                result.score <= 1
                  ? styles.urgencyBaixa
                  : result.score <= 3
                  ? styles.urgencyMedia
                  : styles.urgencyAlta
              }`}
            >
              {result.urgencyLabel}
            </div>
            <h3 ref={resultTitleRef} className={styles.medicoResultTitle}>
              Diagnóstico: {result.problema}
            </h3>
            <div ref={resultDetailRef} className={styles.medicoResultDetail}>
              <p>
                <strong>Causa provável:</strong> {result.causa}
                <br />
                <br />
                O problema {result.duracaoTexto}, e {result.freqTexto} — isto influencia
                diretamente a gravidade e o tempo de recuperação.
                <br />
                <br />
                <strong>Tempo estimado de recuperação:</strong> {result.tempoRecuperacao}
                <br />
                <br />
                Quanto mais tempo se espera, maior tende a ser o consumo de produto e o
                esforço necessário para recuperar a água. Uma avaliação no local permite
                confirmar o diagnóstico e tratar com precisão.
              </p>
            </div>
            <div ref={resultActionsRef} className={styles.medicoActions}>
              <button onClick={handleWhatsApp} className={styles.medicoWhatsApp}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6 6.3A8.86 8.86 0 0 0 12.1 4a8.83 8.83 0 0 0-7.7 13.2L3 21l3.9-1a8.84 8.84 0 0 0 5.2 1.7h0a8.83 8.83 0 0 0 8.8-8.8 8.7 8.7 0 0 0-3.3-6.6Zm-5.5 13.5h0a7.3 7.3 0 0 1-3.8-1l-.3-.2-2.9.7.7-2.8-.2-.3a7.4 7.4 0 0 1 6.5-11.2 7.3 7.3 0 0 1 7.3 7.4 7.3 7.3 0 0 1-7.3 7.4Zm4-5.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.6.8c-.1.2-.3.2-.5.1a6 6 0 0 1-2.9-2.5c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.1-.3 0-.5l-.6-1.4c-.2-.4-.3-.3-.5-.3h-.5c-.2 0-.5.1-.6.3-.2.2-.7.7-.7 1.7s.7 2 .8 2.1c.1.2 1.7 2.6 4.1 3.6 2 .8 2 .6 2.4.6.4 0 1.3-.5 1.4-1 .2-.5.2-.9.1-1Z"/>
                </svg>
                Receber avaliação profissional
              </button>
              <button className={styles.medicoRestart} onClick={handleMedicoRestart}>
                <RefreshCw size={16} />
                Refazer diagnóstico
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicoPiscina;