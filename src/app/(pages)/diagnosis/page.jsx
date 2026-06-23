"use client";

import { useState } from "react";
import { HeaderMain, FooterMain } from "@/app/components";
import {
  Droplets,
  FlaskConical,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Waves,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import styles from "@/assets/css/diagnosis/main.module.css";

const DiagnosisPage = () => {
  // Estado do Médico da Piscina
  const [medicoStep, setMedicoStep] = useState(1);
  const [medicoState, setMedicoState] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Estado do Assistente de Produtos
  const [phValue, setPhValue] = useState("");
  const [cloroValue, setCloroValue] = useState("");
  const [alcValue, setAlcValue] = useState("");
  const [assistResult, setAssistResult] = useState(null);

  const problemas = [
    { id: "verde", label: "Água verde", icon: <Waves size={20} /> },
    { id: "turva", label: "Água turva", icon: <Droplets size={20} /> },
    { id: "ph", label: "pH descontrolado", icon: <FlaskConical size={20} /> },
    {
      id: "manchas",
      label: "Manchas nas paredes",
      icon: <AlertCircle size={20} />,
    },
    {
      id: "cheiro",
      label: "Cheiro forte a cloro",
      icon: <AlertCircle size={20} />,
    },
    {
      id: "sembrilho",
      label: "Cristalina mas sem brilho",
      icon: <HelpCircle size={20} />,
    },
  ];

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
      causa:
        "presença de algas, geralmente por cloro insuficiente ou filtração deficiente",
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
    };
  };

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
          "pH baixo — considere adicionar corretor de pH+ (cerca de 10 ml por m³, ajustável)",
        );
        isOk = false;
      } else if (ph > 7.6) {
        issues.push(
          "pH alto — considere adicionar corretor de pH- (cerca de 10 ml por m³, ajustável)",
        );
        isOk = false;
      }
    }

    if (!isNaN(cloro)) {
      if (cloro < 1) {
        issues.push(
          "cloro livre baixo — adicione cloro de manutenção (cerca de 1 g por m³)",
        );
        isOk = false;
      } else if (cloro > 3) {
        issues.push(
          "cloro livre alto — evite usar a piscina e deixe estabilizar antes de adicionar mais produto",
        );
        isOk = false;
      }
    }

    if (!isNaN(alc)) {
      if (alc < 80) {
        issues.push(
          "alcalinidade baixa — pode causar variações bruscas de pH, considere um aumentador de alcalinidade",
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

  const result = getMedicoResult();

  return (
    <>
      <HeaderMain />
      <main className={styles.main}>
        {/* Hero da Página */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Ferramentas Gratuitas</span>
            <h1 className={styles.heroTitle}>Diagnóstico da sua piscina</h1>
            <p className={styles.heroDescription}>
              Descubra o que se passa com a sua piscina em menos de 1 minuto, ou
              insira os valores da sua análise e saiba exatamente o que precisa
              de corrigir.
            </p>
          </div>
          <div className={styles.heroWave}></div>
        </section>

        <div className={styles.container}>
          {/* ===== MÉDICO DA PISCINA ===== */}
          <section className={styles.medicoSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Ferramenta Principal</span>
              <h2 className={styles.sectionTitle}>O Médico da Piscina</h2>
              <p className={styles.sectionSubtitle}>
                Responda a 3 perguntas rápidas e descubra, em menos de 1 minuto,
                o que se passa com a sua piscina.
              </p>
            </div>

            <div className={styles.medicoCard}>
              {/* Progresso */}
              <div className={styles.medicoProgress}>
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`${styles.stepDot} ${step <= medicoStep ? styles.stepDone : ""}`}
                  />
                ))}
              </div>

              {/* Step 1 */}
              {!showResult && medicoStep === 1 && (
                <div className={styles.medicoStep}>
                  <h3 className={styles.medicoQuestion}>
                    Qual é o problema da sua piscina?
                  </h3>
                  <p className={styles.medicoSub}>
                    Escolha a opção que descreve melhor o que está a ver.
                  </p>
                  <div className={styles.medicoOptions}>
                    {problemas.map((p) => (
                      <button
                        key={p.id}
                        className={styles.medicoOpt}
                        onClick={() => handleMedicoChoose("problema", p.id)}
                      >
                        <span className={styles.medicoOptIcon}>{p.icon}</span>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {!showResult && medicoStep === 2 && (
                <div className={styles.medicoStep}>
                  <h3 className={styles.medicoQuestion}>
                    Há quanto tempo isto se nota?
                  </h3>
                  <p className={styles.medicoSub}>
                    Isto ajuda a estimar a gravidade e o tempo de recuperação.
                  </p>
                  <div className={styles.medicoOptions}>
                    {duracaoOptions.map((d) => (
                      <button
                        key={d.id}
                        className={styles.medicoOpt}
                        onClick={() => handleMedicoChoose("duracao", d.id)}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  <button
                    className={styles.medicoBack}
                    onClick={() => handleMedicoBack(1)}
                  >
                    ← Voltar
                  </button>
                </div>
              )}

              {/* Step 3 */}
              {!showResult && medicoStep === 3 && (
                <div className={styles.medicoStep}>
                  <h3 className={styles.medicoQuestion}>
                    Com que frequência costuma tratar a piscina?
                  </h3>
                  <p className={styles.medicoSub}>
                    Última pergunta — já quase lá.
                  </p>
                  <div className={styles.medicoOptions}>
                    {frequenciaOptions.map((f) => (
                      <button
                        key={f.id}
                        className={styles.medicoOpt}
                        onClick={() => handleMedicoChoose("frequencia", f.id)}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <button
                    className={styles.medicoBack}
                    onClick={() => handleMedicoBack(2)}
                  >
                    ← Voltar
                  </button>
                </div>
              )}

              {/* Resultado */}
              {showResult && result && (
                <div className={styles.medicoResult}>
                  <div
                    className={`${styles.urgencyBadge} ${result.score <= 1 ? styles.urgencyBaixa : result.score <= 3 ? styles.urgencyMedia : styles.urgencyAlta}`}
                  >
                    {result.urgencyLabel}
                  </div>
                  <h3 className={styles.medicoResultTitle}>
                    Diagnóstico: {problemaInfo[medicoState.problema]?.label}
                  </h3>
                  <div className={styles.medicoResultDetail}>
                    <p>
                      <strong>Causa provável:</strong> {result.causa}
                      <br />
                      <br />O problema {result.duracaoTexto}, e{" "}
                      {result.freqTexto} — isto influencia diretamente a
                      gravidade e o tempo de recuperação.
                      <br />
                      <br />
                      <strong>Tempo estimado de recuperação:</strong>{" "}
                      {result.tempoRecuperacao}
                      <br />
                      <br />
                      Quanto mais tempo se espera, maior tende a ser o consumo
                      de produto e o esforço necessário para recuperar a água.
                      Uma avaliação no local permite confirmar o diagnóstico e
                      tratar com precisão.
                    </p>
                  </div>
                  <a href="/contato" className={styles.medicoCta}>
                    Receber uma avaliação profissional da VitaPools →
                  </a>
                  <button
                    className={styles.medicoRestart}
                    onClick={handleMedicoRestart}
                  >
                    <RefreshCw size={16} />
                    Refazer o diagnóstico
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ===== ASSISTENTE DE PRODUTOS ===== */}
          <section className={styles.assistSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>Ferramenta Gratuita</span>
              <h2 className={styles.sectionTitle}>
                O que medi hoje — e agora?
              </h2>
              <p className={styles.sectionSubtitle}>
                Introduza os valores da sua análise e saiba exatamente se
                precisa de corrigir algo, sem adivinhar.
              </p>
            </div>

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
              <button
                className={styles.assistButton}
                onClick={handleAssistCalculate}
              >
                Ver o que fazer hoje
              </button>

              {assistResult && (
                <div
                  className={`${styles.assistResult} ${styles[assistResult.type]}`}
                >
                  <h4>{assistResult.title}</h4>
                  <p>{assistResult.message}</p>
                </div>
              )}
            </div>
          </section>

          {/* ===== CONTACTO RÁPIDO ===== */}
          <section className={styles.contactSection}>
            <div className={styles.contactCard}>
              <div className={styles.contactInfo}>
                <h3>Precisa de ajuda personalizada?</h3>
                <p>
                  Fale connosco diretamente para uma avaliação profissional da
                  sua piscina.
                </p>
                <div className={styles.contactItems}>
                  <div className={styles.contactItem}>
                    <Phone size={18} />
                    <span>+351 900 000 000</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Mail size={18} />
                    <span>info@vitapools.pt</span>
                  </div>
                  <div className={styles.contactItem}>
                    <MapPin size={18} />
                    <span>Mafra, Portugal</span>
                  </div>
                </div>
              </div>
              <a href="/contato" className={styles.contactButton}>
                Pedir Orçamento
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
        </div>
      </main>
      <FooterMain />
    </>
  );
};

export default DiagnosisPage;
