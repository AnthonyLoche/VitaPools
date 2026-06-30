"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  User, Ruler, Calendar, Home, Droplets,
  Check, ArrowRight, ArrowLeft, Send, Mail, Phone, FileText,
  MapPin, Sparkles, Activity, Droplet, Percent,
  MessageCircle, Download, RefreshCw,
  Waves, Droplets as DropletsIcon,
  Bath, Home as HomeIcon,
  Brush, Beaker, Wrench, Gauge,
  Sparkles as SparklesIcon,
  CalendarDays, Clock,
  Sun, Moon, Cloud,
  AlertCircle, CheckCircle, HelpCircle,
  Flower2, Trees,
  CircleCheck,
  LucideIcon,
  FileCheck,
  ClipboardList,
  Circle,
  CircleDot,
  CheckSquare,
  Square,
} from "lucide-react";
import gsap from "gsap";
import styles from "@/assets/css/budget/main.module.css";
import logo from "@/assets/images/logo_h_removed_white.png";

const TOTAL_STEPS = 7;

// Mapeamento de ícones para cada step
const DepthIcon = ({ step }) => {
  const icons = {
    1: <User size={28} />,
    2: <Phone size={28} />,
    3: <MapPin size={28} />,
    4: <Ruler size={28} />,
    5: <Sparkles size={28} />,
    6: <Calendar size={28} />,
    7: <Droplets size={28} />,
  };
  return icons[step] || <FileText size={28} />;
};

const DEPTH_DATA = [
  { label: "−3m",  sub: "A entrar na água..." },
  { label: "−6m",  sub: "A mergulhar..." },
  { label: "−10m", sub: "A descer..." },
  { label: "−14m", sub: "Na penumbra..." },
  { label: "−18m", sub: "Quase no fundo..." },
  { label: "−22m", sub: "No fundo..." },
  { label: "−15m", sub: "A subir..." },
];

const STEP_TITLES = {
  1: "Quem somos?",
  2: "O seu contacto",
  3: "Onde fica?",
  4: "Tamanho da piscina",
  5: "Serviços que precisa",
  6: "Com que frequência?",
  7: "Estado atual",
};

/* ── Lerp single float ── */
function lerp(a, b, t) { return a + (b - a) * t; }

/* ── Lerp hex color ── */
function lerpColor(a, b, t) {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  return `#${((1 << 24) |
    (Math.round(lerp(ar, br, t)) << 16) |
    (Math.round(lerp(ag, bg, t)) << 8) |
    Math.round(lerp(ab, bb, t))).toString(16).slice(1)}`;
}

/* ── Target depth per step ── */
function targetDepth(step) {
  if (step === 0) return 0;
  if (step > TOTAL_STEPS) return 1;
  return (step - 1) / (TOTAL_STEPS - 1);
}

/* ── Particles ── */
function Particles({ count = 20, size = "sm" }) {
  const [items] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 7,
      w: size === "sm" ? 3 + Math.random() * 5 : 6 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 40,
    }))
  );
  return (
    <div className={styles.particleLayer} aria-hidden="true">
      {items.map((p) => (
        <div key={p.id} className={styles.particle} style={{
          left: `${p.left}%`, width: `${p.w}px`, height: `${p.w}px`,
          animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
          "--drift": `${p.drift}px`,
        }} />
      ))}
    </div>
  );
}

/* ── Depth meter ── */
function DepthMeter({ pct }) {
  const fillPercent = pct * 100;
  return (
    <div className={styles.depthMeter}>
      <div className={styles.depthTrack}>
        <div className={styles.depthFill} style={{ height: `${fillPercent}%` }} />
        <div className={styles.depthBubble} style={{ top: `${fillPercent}%` }} />
      </div>
      <div className={styles.depthLabels}>
        <span>0m</span>
        <span>−25m</span>
      </div>
    </div>
  );
}

/* ── Light rays ── */
function LightRays({ opacity }) {
  return (
    <div className={styles.raysWrap} style={{ opacity }} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className={styles.ray} style={{ "--i": i }} />
      ))}
    </div>
  );
}

export default function BudgetPage() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [bgTop, setBgTop] = useState("#00172b");
  const [bgBot, setBgBot] = useState("#003257");
  const [rayOp, setRayOp] = useState(0);
  const [showDone, setShowDone] = useState(false);
  const [errors, setErrors] = useState({});

  // Refs para animações GSAP
  const introRef = useRef(null);
  const introLogoRef = useRef(null);
  const introPreRef = useRef(null);
  const introTitleRef = useRef(null);
  const introWavesRef = useRef(null);

  const formSceneRef = useRef(null);
  const progressRef = useRef(null);
  const depthInfoRef = useRef(null);
  const cardRef = useRef(null);
  const cardHeaderRef = useRef(null);
  const cardBodyRef = useRef(null);
  const cardActionsRef = useRef(null);

  const doneRef = useRef(null);
  const doneCardRef = useRef(null);

  const depthRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    poolSize: "",
    services: [],
    frequency: "",
    poolStatus: "",
    system: "",
    observations: "",
  });

  useEffect(() => { setMounted(true); }, []);

  // --- ANIMAÇÃO DA INTRO ---
  useEffect(() => {
    if (step === 0 && introRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(introLogoRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(introPreRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(introTitleRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(introWavesRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3"
      );

      return () => tl.kill();
    }
  }, [step]);

  // --- ANIMAÇÃO DO FORMULÁRIO ---
  useEffect(() => {
    if (step >= 1 && step <= TOTAL_STEPS && visible && formSceneRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(formSceneRef.current,
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(progressRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(depthInfoRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(cardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(cardHeaderRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(cardBodyRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(cardActionsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

      return () => tl.kill();
    }
  }, [step, visible]);

  // --- ANIMAÇÃO DO DONE ---
  useEffect(() => {
    if (step === TOTAL_STEPS + 1 && showDone && doneRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(doneRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(doneCardRef.current,
        { opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: "blur(0px)", 
          duration: 0.8, 
          ease: "power3.out" 
        },
        "-=0.2"
      );

      // Anima o ícone de check com efeito de pulso
      const iconWrapper = doneCardRef.current?.querySelector(`.${styles.doneIconWrapper}`);
      if (iconWrapper) {
        gsap.fromTo(iconWrapper,
          { scale: 0.5, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.8, 
            delay: 0.3, 
            ease: "back.out(1.7)" 
          }
        );
      }

      return () => tl.kill();
    }
  }, [step, showDone]);

  useEffect(() => {
    const tick = () => {
      const cur = depthRef.current;
      const tgt = targetRef.current;
      const diff = tgt - cur;
      const stepSpeed = 0.045;
      const next = cur + diff * stepSpeed;
      depthRef.current = next;

      setBgTop(lerpColor("#00172b", "#0081cc", next));
      setBgBot(lerpColor("#003257", "#aee4ff", next));
      setRayOp(next * 0.7);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    targetRef.current = targetDepth(step);
  }, [step]);

  useEffect(() => {
    if (step !== 0) return;
    const t = setTimeout(() => transition(() => setStep(1)), 2800);
    return () => clearTimeout(t);
  }, [step]);

  const transition = (cb) => {
    setVisible(false);
    setTimeout(() => { cb(); setVisible(true); }, 550);
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
        if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
        break;
      case 2:
        if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
        break;
      case 3:
        if (!formData.address.trim()) newErrors.address = "Morada é obrigatória";
        break;
      case 4:
        if (!formData.poolSize) newErrors.poolSize = "Selecione o tamanho da piscina";
        break;
      case 5:
        if (formData.services.length === 0) newErrors.services = "Selecione pelo menos um serviço";
        break;
      case 6:
        if (!formData.frequency) newErrors.frequency = "Selecione a frequência";
        break;
      case 7:
        if (!formData.poolStatus) newErrors.poolStatus = "Selecione o estado da piscina";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) {
      transition(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1)));
    }
  };

  const prev = () => {
    setErrors({});
    transition(() => setStep((s) => Math.max(s - 1, 1)));
  };

  const submit = () => {
    if (validateStep(step)) {
      setVisible(false);
      setTimeout(() => {
        setStep(TOTAL_STEPS + 1);
        setShowDone(true);
        setTimeout(() => setVisible(true), 300);
      }, 500);
    }
  };

  const goBack = () => {
    if (step > 1) {
      transition(() => setStep(step - 1));
    } else {
      window.location.href = "/";
    }
  };

  const reset = () => transition(() => {
    setStep(0);
    setShowDone(false);
    setErrors({});
    setFormData({
      name: "", email: "", phone: "", address: "",
      poolSize: "", services: [], frequency: "",
      poolStatus: "", system: "", observations: "",
    });
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((f) => ({
        ...f,
        [name]: checked
          ? [...f.services, value]
          : f.services.filter((item) => item !== value),
      }));
      if (errors.services) setErrors((prev) => ({ ...prev, services: null }));
    } else {
      setFormData((f) => ({ ...f, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const [meterPct, setMeterPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setMeterPct(depthRef.current), 50);
    return () => clearInterval(id);
  }, []);

  const generateWhatsAppMessage = () => {
    const servicesList = formData.services.length > 0 
      ? formData.services.join(", ") 
      : "Não especificado";
    
    return `*🟦 Novo Pedido de Orçamento - VitaPools*%0A%0A` +
      `*👤 Nome:* ${formData.name || "Não informado"}%0A` +
      `*📧 Email:* ${formData.email || "Não informado"}%0A` +
      `*📱 Telefone:* ${formData.phone || "Não informado"}%0A` +
      `*📍 Morada:* ${formData.address || "Não informado"}%0A` +
      `*📏 Tamanho da piscina:* ${formData.poolSize || "Não informado"}%0A` +
      `*🔧 Serviços:* ${servicesList}%0A` +
      `*📅 Frequência:* ${formData.frequency || "Não informado"}%0A` +
      `*💧 Estado atual:* ${formData.poolStatus || "Não informado"}%0A` +
      `*🧪 Sistema:* ${formData.system || "Não informado"}%0A` +
      `${formData.observations ? `*📝 Observações:* ${formData.observations}` : ""}`;
  };

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/351932096025?text=${message}`, "_blank");
  };

  if (!mounted) return <div className={styles.shell} />;

  const showBack = step >= 1 && step <= TOTAL_STEPS;

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.name.trim() && formData.email.trim() && /\S+@\S+\.\S+/.test(formData.email);
      case 2: return formData.phone.trim();
      case 3: return formData.address.trim();
      case 4: return formData.poolSize;
      case 5: return formData.services.length > 0;
      case 6: return formData.frequency;
      case 7: return formData.poolStatus;
      default: return true;
    }
  };

  return (
    <div className={styles.shell} style={{ "--bg-top": bgTop, "--bg-bottom": bgBot }}>

      <div className={styles.waterBg} aria-hidden="true">
        <Particles count={step === 0 ? 40 : 20} size={step === 0 ? "lg" : "sm"} />
        <LightRays opacity={rayOp} />
        {step === 0 && <div className={styles.caustics} />}
        {step === 0 && (
          <div className={styles.bubbleContainer}>
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={styles.entryBubble}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 5}s`,
                  width: `${4 + Math.random() * 18}px`,
                  height: `${4 + Math.random() * 18}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {showBack && (
        <button
          onClick={goBack}
          className={`${styles.backBtn} ${visible ? styles.in : styles.out}`}
          aria-label="Voltar"
        >
          <ArrowLeft size={18} />
        </button>
      )}

      {step === 0 && (
        <div ref={introRef} className={`${styles.intro} ${visible ? styles.in : styles.out}`}>
          <div className={styles.introContent}>
            <Image 
              ref={introLogoRef}
              alt="VitaPools" 
              className={styles.introLogo}
              src={logo}
            />
            <h1 ref={introTitleRef} className={styles.introTitle}>Vamos fazer um orçamento<br />à sua medida</h1>
            <div ref={introWavesRef} className={styles.introWaves} aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className={styles.introWaveDot} style={{ "--d": `${i * 0.25}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {step >= 1 && step <= TOTAL_STEPS && (
        <div ref={formSceneRef} className={`${styles.formScene} ${visible ? styles.in : styles.out}`}>
          <DepthMeter pct={meterPct} />

          <div className={styles.formWrap}>
            <div ref={progressRef} className={styles.progressRow}>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
              </div>
              <span className={styles.progressLabel}>{step} / {TOTAL_STEPS}</span>
            </div>

            <div ref={depthInfoRef} className={styles.depthInfo}>
              <div className={styles.depthBadge}>
                <Droplets size={13} />
                {DEPTH_DATA[step - 1]?.label}
              </div>
              <span className={styles.depthSub}>{DEPTH_DATA[step - 1]?.sub}</span>
            </div>

            <div ref={cardRef} className={styles.card}>
              <div ref={cardHeaderRef} className={styles.cardHeader}>
                <div className={styles.iconWrap}><DepthIcon step={step} /></div>
                <h2 className={styles.cardTitle}>{STEP_TITLES[step]}</h2>
              </div>
              <div ref={cardBodyRef} className={styles.cardBody}>
                <StepFields
                  step={step}
                  formData={formData}
                  onChange={onChange}
                  errors={errors}
                />
              </div>
              <div ref={cardActionsRef} className={styles.cardActions}>
                <button onClick={prev} className={styles.btnBack} aria-label="Voltar">
                  <ArrowLeft size={16} />
                  Voltar
                </button>
                {step < TOTAL_STEPS ? (
                  <button
                    onClick={next}
                    className={`${styles.btnNext} ${!isStepValid() ? styles.btnDisabled : ''}`}
                    disabled={!isStepValid()}
                  >
                    Continuar <ArrowRight size={18} />
                  </button>
                ) : (
                  <button onClick={submit} className={styles.btnSubmit}>
                    Enviar <Send size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === TOTAL_STEPS + 1 && (
        <div ref={doneRef} className={`${styles.done} ${showDone ? styles.doneAppear : ''}`}>
          <div ref={doneCardRef} className={`${styles.doneCard} ${visible ? styles.doneCardIn : styles.doneCardOut}`}>
            <div className={styles.doneIconWrapper}>
              <div className={styles.doneIconPulse}>
                <div className={styles.doneIcon}>
                  <Check size={40} strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h2 className={styles.doneTitle}>Orçamento pronto!</h2>
            <p className={styles.doneSub}>Em breve vamos ligar-lhe com a melhor proposta.</p>

            <div className={styles.doneCardDivider}></div>

            <div className={styles.summaryGrid}>
              <SummaryRow icon={<User size={16} />} label="Nome" value={formData.name || "—"} />
              <SummaryRow icon={<Mail size={16} />} label="Email" value={formData.email || "—"} />
              <SummaryRow icon={<Phone size={16} />} label="Telefone" value={formData.phone || "—"} />
              <SummaryRow icon={<MapPin size={16} />} label="Morada" value={formData.address || "—"} />
              <SummaryRow icon={<Ruler size={16} />} label="Tamanho" value={formData.poolSize || "—"} />
              <SummaryRow icon={<Sparkles size={16} />} label="Serviços" value={formData.services.length > 0 ? formData.services.join(", ") : "—"} />
              <SummaryRow icon={<Calendar size={16} />} label="Frequência" value={formData.frequency || "—"} />
              <SummaryRow icon={<Droplets size={16} />} label="Estado" value={formData.poolStatus || "—"} />
            </div>

            {formData.observations && (
              <div className={styles.obs}>
                <p className={styles.obsLabel}>Observações</p>
                <p className={styles.obsText}>{formData.observations}</p>
              </div>
            )}

            <div className={styles.doneActions}>
              <button onClick={handleWhatsApp} className={styles.btnWhatsApp}>
                <MessageCircle size={20} />
                Enviar por WhatsApp
              </button>
              <button className={styles.btnReset} onClick={reset}>
                <RefreshCw size={18} />
                Fazer novo orçamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Step fields ─── */
function StepFields({ step, formData, onChange, errors }) {
  const getError = (field) => errors && errors[field];

  switch (step) {
    case 1: return (
      <>
        <Field label="Como podemos chamá-lo?" error={getError("name")}>
          <input
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Ex: João Silva"
            className={`f-input ${getError("name") ? "f-input-error" : ""}`}
          />
        </Field>
        <Field label="Qual o seu email?" error={getError("email")}>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="exemplo@email.com"
            className={`f-input ${getError("email") ? "f-input-error" : ""}`}
          />
        </Field>
      </>
    );
    case 2: return (
      <Field label="Telefone ou WhatsApp" error={getError("phone")}>
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          placeholder="+351 900 000 000"
          className={`f-input ${getError("phone") ? "f-input-error" : ""}`}
        />
      </Field>
    );
    case 3: return (
      <Field label="Morada da piscina" error={getError("address")}>
        <input
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Ex: Rua das Flores, 123, Mafra"
          className={`f-input ${getError("address") ? "f-input-error" : ""}`}
        />
      </Field>
    );
    case 4: return (
      <Field label="Qual o tamanho da piscina?" error={getError("poolSize")}>
        <RadioList
          name="poolSize"
          value={formData.poolSize}
          onChange={onChange}
          options={[
            { value: "Pequena (até 20m²)", label: "Pequena (até 20m²)", icon: Bath },
            { value: "Média (21m² a 30m²)", label: "Média (21m² a 30m²)", icon: Bath },
            { value: "Grande (31m² a 60m²)", label: "Grande (31m² a 60m²)", icon: Bath },
            { value: "Muito grande (acima de 60m²)", label: "Muito grande (acima de 60m²)", icon: Bath },
          ]}
          error={getError("poolSize")}
        />
      </Field>
    );
    case 5: return (
      <Field label="Que serviços precisa? (pode escolher vários)" error={getError("services")}>
        <CheckboxList
          name="services"
          value={formData.services}
          onChange={onChange}
          options={[
            { value: "Limpeza regular", label: "Limpeza regular", icon: Brush },
            { value: "Manutenção química", label: "Manutenção química", icon: Beaker },
            { value: "Limpeza e manutenção completa", label: "Limpeza e manutenção completa", icon: Wrench },
            { value: "Consultoria técnica", label: "Consultoria técnica", icon: Gauge },
            { value: "Verificação e ajuste do pH", label: "Verificação e ajuste do pH", icon: Activity },
            { value: "Limpeza de paredes e fundo", label: "Limpeza de paredes e fundo", icon: DropletsIcon },
            { value: "Limpeza de filtros e skimmers", label: "Limpeza de filtros e skimmers", icon: Bath },
            { value: "Outros", label: "Outros", icon: FileText },
          ]}
          error={getError("services")}
        />
      </Field>
    );
    case 6: return (
      <Field label="Com que frequência pretende limpar?" error={getError("frequency")}>
        <RadioList
          name="frequency"
          value={formData.frequency}
          onChange={onChange}
          options={[
            { value: "Semanal", label: "Semanal", icon: CalendarDays },
            { value: "Quinzenal", label: "Quinzenal", icon: CalendarDays },
            { value: "Mensal", label: "Mensal", icon: CalendarDays },
            { value: "Pontual / Esporádico", label: "Pontual / Esporádico", icon: Clock },
            { value: "Outra", label: "Outra", icon: Clock },
          ]}
          error={getError("frequency")}
        />
      </Field>
    );
    case 7: return (
      <>
        <Field label="Como está a piscina atualmente?" error={getError("poolStatus")}>
          <RadioList
            name="poolStatus"
            value={formData.poolStatus}
            onChange={onChange}
            options={[
              { value: "Está limpa e cristalina", label: "Limpa e cristalina", icon: CircleCheck },
              { value: "Precisa de manutenção", label: "Precisa de manutenção", icon: AlertCircle },
              { value: "Água verde / turva", label: "Água verde / turva", icon: Cloud },
              { value: "Não tenho a certeza", label: "Não tenho a certeza", icon: HelpCircle },
            ]}
            error={getError("poolStatus")}
          />
        </Field>
        <Field label="A piscina utiliza que sistema?">
          <RadioList
            name="system"
            value={formData.system}
            onChange={onChange}
            options={[
              { value: "Sal", label: "Sal", icon: DropletsIcon },
              { value: "Cloro", label: "Cloro", icon: Beaker },
              { value: "Não sei", label: "Não sei", icon: HelpCircle },
            ]}
          />
        </Field>
      </>
    );
    default: return null;
  }
}

function Field({ label, hint, children, error }) {
  return (
    <div className={styles.fieldGroup}>
      <label className={`${styles.fieldLabel} ${error ? styles.fieldLabelError : ""}`}>{label}</label>
      {children}
      {hint && <p className={styles.fieldHint}>{hint}</p>}
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  );
}

// Radio List - versão em lista vertical
function RadioList({ name, value, onChange, options, error }) {
  return (
    <div className={`${styles.radioList} ${error ? styles.radioListError : ""}`}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = value === opt.value;
        return (
          <label key={opt.value} className={`${styles.radioListItem} ${isSelected ? styles.radioListItemActive : ''}`}>
            <input type="radio" name={name} value={opt.value} checked={isSelected} onChange={onChange} />
            <span className={styles.radioIndicator}>
              {isSelected ? <CircleDot size={20} /> : <Circle size={20} />}
            </span>
            {Icon && <Icon size={18} className={styles.optionIcon} />}
            <span className={styles.radioLabelText}>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}

// Checkbox List - versão em lista vertical
function CheckboxList({ name, value, onChange, options, error }) {
  return (
    <div className={`${styles.checkboxList} ${error ? styles.checkboxListError : ""}`}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const isChecked = value.includes(opt.value);
        return (
          <label key={opt.value} className={`${styles.checkboxListItem} ${isChecked ? styles.checkboxListItemActive : ''}`}>
            <input type="checkbox" name={name} value={opt.value} checked={isChecked} onChange={onChange} />
            <span className={styles.checkboxIndicator}>
              {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
            </span>
            {Icon && <Icon size={18} className={styles.optionIcon} />}
            <span className={styles.checkboxLabelText}>{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div className={styles.summaryRow}>
      <span className={styles.summaryIcon}>{icon}</span>
      <div>
        <p className={styles.summaryLabel}>{label}</p>
        <p className={styles.summaryValue}>{value}</p>
      </div>
    </div>
  );
}