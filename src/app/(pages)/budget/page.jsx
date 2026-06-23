"use client";

import { useState, useEffect, useRef } from "react";
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
  LucideIcon
} from "lucide-react";
import styles from "@/assets/css/budget/main.module.css";

const TOTAL_STEPS = 8;

// Mapeamento de ícones para cada step
const DepthIcon = ({ step }) => {
  const icons = {
    1: <User size={28} />,
    2: <Mail size={28} />,
    3: <Phone size={28} />,
    4: <MapPin size={28} />,
    5: <Ruler size={28} />,
    6: <Sparkles size={28} />,
    7: <Calendar size={28} />,
    8: <Droplets size={28} />,
  };
  return icons[step] || <FileText size={28} />;
};

// Mapeamento de ícones para opções de serviços
const SERVICE_ICONS = {
  "Limpeza regular": Brush,
  "Manutenção química": Beaker,
  "Limpeza e manutenção completa": Wrench,
  "Consultoria técnica": Gauge,
  "Verificação e ajuste do pH": Activity,
  "Limpeza de paredes e fundo": DropletsIcon,
  "Limpeza de filtros e skimmers": Bath,
  "Outros": FileText,
};

// Mapeamento de ícones para estados da piscina
const STATUS_ICONS = {
  "Está limpa e cristalina": CircleCheck,
  "Precisa de manutenção": AlertCircle,
  "Água verde / turva": Cloud,
  "Não tenho a certeza": HelpCircle,
};

// Mapeamento de ícones para sistemas
const SYSTEM_ICONS = {
  "Sal": DropletsIcon,
  "Cloro": Beaker,
  "Não sei": HelpCircle,
};

const DEPTH_DATA = [
  { label: "−3m",  sub: "A entrar na água..." },
  { label: "−6m",  sub: "A mergulhar..." },
  { label: "−10m", sub: "A descer..." },
  { label: "−14m", sub: "Na penumbra..." },
  { label: "−18m", sub: "Quase no fundo..." },
  { label: "−22m", sub: "No fundo..." },
  { label: "−15m", sub: "A subir..." },
  { label: "−5m",  sub: "Quase na superfície!" },
];

const STEP_TITLES = {
  1: "Quem somos?",
  2: "O seu email",
  3: "O seu contacto",
  4: "Onde fica?",
  5: "Tamanho da piscina",
  6: "Serviços que precisa",
  7: "Com que frequência?",
  8: "Estado atual",
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

  /* animated depth (0–1) */
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

  /* depth animation loop */
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

  /* update target when step changes */
  useEffect(() => {
    targetRef.current = targetDepth(step);
  }, [step]);

  /* auto-advance intro */
  useEffect(() => {
    if (step !== 0) return;
    const t = setTimeout(() => transition(() => setStep(1)), 2800);
    return () => clearTimeout(t);
  }, [step]);

  const transition = (cb) => {
    setVisible(false);
    setTimeout(() => { cb(); setVisible(true); }, 550);
  };

  const next = () => transition(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1)));
  const prev = () => transition(() => setStep((s) => Math.max(s - 1, 1)));
  const submit = () => {
    setVisible(false);
    setTimeout(() => {
      setStep(TOTAL_STEPS + 1);
      setShowDone(true);
      setTimeout(() => setVisible(true), 300);
    }, 500);
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
    } else {
      setFormData((f) => ({ ...f, [name]: value }));
    }
  };

  /* animated pct for depth meter */
  const [meterPct, setMeterPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setMeterPct(depthRef.current), 50);
    return () => clearInterval(id);
  }, []);

  /* Função para gerar a mensagem do WhatsApp */
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
    window.open(`https://wa.me/5547992236761?text=${message}`, "_blank");
  };

  if (!mounted) return <div className={styles.shell} />;

  const showBack = step >= 1 && step <= TOTAL_STEPS;

  return (
    <div className={styles.shell} style={{ "--bg-top": bgTop, "--bg-bottom": bgBot }}>

      {/* ── water bg ── */}
      <div className={styles.waterBg} aria-hidden="true">
        <Particles count={step === 0 ? 30 : 16} size={step === 0 ? "lg" : "sm"} />
        <LightRays opacity={rayOp} />
        {step === 0 && <div className={styles.caustics} />}
      </div>

      {/* ── back button (fixed top-left) ── */}
      {showBack && (
        <button
          onClick={goBack}
          className={`${styles.backBtn} ${visible ? styles.in : styles.out}`}
          aria-label="Voltar"
        >
          <ArrowLeft size={18} />
        </button>
      )}

      {/* ── intro ── */}
      {step === 0 && (
        <div className={`${styles.intro} ${visible ? styles.in : styles.out}`}>
          <img alt="VitaPools" className={styles.introLogo}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCclMZ1pAIPYRW9r8a-9p4K8UfxWdyCstlnx2XZhnGDNvAdfoDD8MA7chg3aFlB6JTNz8XzHPedQiOACDQbIblyDrr7_XEUj_3ZGQnquqJISNN_nXJdmmhp_dDupUSLU_OCw2cREpuKHpwfVV--uqSLpTCJdas5ZchKMHMGWhx38EJQhqiJMqMABQM1uuVNeBFdxy7xidqdMEH2ptce2Wyo0g-iWN0zZOz2t4X4Z-LRRxriu0CP1Pm13ljCvOAMFzYcGvPMteFHWw"
          />
          <p className={styles.introPre}>VitaPools</p>
          <h1 className={styles.introTitle}>Vamos fazer um orçamento<br />à sua medida</h1>
          <div className={styles.introWaves} aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.introWaveDot} style={{ "--d": `${i * 0.25}s` }} />
            ))}
          </div>
        </div>
      )}

      {/* ── form steps ── */}
      {step >= 1 && step <= TOTAL_STEPS && (
        <div className={`${styles.formScene} ${visible ? styles.in : styles.out}`}>
          <DepthMeter pct={meterPct} />

          <div className={styles.formWrap}>
            {/* progress */}
            <div className={styles.progressRow}>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
              </div>
              <span className={styles.progressLabel}>{step} / {TOTAL_STEPS}</span>
            </div>

            {/* depth badge */}
            <div className={styles.depthInfo}>
              <div className={styles.depthBadge}>
                <Droplets size={13} />
                {DEPTH_DATA[step - 1]?.label}
              </div>
              <span className={styles.depthSub}>{DEPTH_DATA[step - 1]?.sub}</span>
            </div>

            {/* card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}><DepthIcon step={step} /></div>
                <h2 className={styles.cardTitle}>{STEP_TITLES[step]}</h2>
              </div>
              <div className={styles.cardBody}>
                <StepFields step={step} formData={formData} onChange={onChange} />
              </div>
              <div className={styles.cardActions}>
                <button onClick={prev} className={styles.btnBack} aria-label="Voltar">
                  <ArrowLeft size={16} />
                  Voltar
                </button>
                {step < TOTAL_STEPS ? (
                  <button onClick={next} className={styles.btnNext}
                    disabled={
                      (step === 1 && !formData.name) ||
                      (step === 2 && !formData.email) ||
                      (step === 3 && !formData.phone) ||
                      (step === 4 && !formData.address) ||
                      (step === 5 && !formData.poolSize) ||
                      (step === 6 && formData.services.length === 0) ||
                      (step === 7 && !formData.frequency) ||
                      (step === 8 && !formData.poolStatus)
                    }>
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

      {/* ── done ── */}
      {step === TOTAL_STEPS + 1 && (
        <div className={`${styles.done} ${showDone ? styles.doneAppear : ''}`}>
          <div className={`${styles.doneCard} ${visible ? styles.doneCardIn : styles.doneCardOut}`}>
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
              <button className={styles.btnDownload}>
                <Download size={18} />
                Descarregar orçamento
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
function StepFields({ step, formData, onChange }) {
  switch (step) {
    case 1: return (
      <Field label="Como podemos chamá-lo?">
        <input name="name" value={formData.name} onChange={onChange} placeholder="Ex: João Silva" className="f-input" />
      </Field>
    );
    case 2: return (
      <Field label="Qual o seu email?">
        <input name="email" type="email" value={formData.email} onChange={onChange} placeholder="exemplo@email.com" className="f-input" />
      </Field>
    );
    case 3: return (
      <Field label="Telefone ou WhatsApp">
        <input name="phone" type="tel" value={formData.phone} onChange={onChange} placeholder="+351 900 000 000" className="f-input" />
      </Field>
    );
    case 4: return (
      <Field label="Morada da piscina">
        <input name="address" value={formData.address} onChange={onChange} placeholder="Ex: Rua das Flores, 123, Mafra" className="f-input" />
      </Field>
    );
    case 5: return (
      <Field label="Qual o tamanho da piscina?">
        <RadioGroup
          name="poolSize"
          value={formData.poolSize}
          onChange={onChange}
          options={[
            { value: "Pequena (até 20m²)", label: "Pequena (até 20m²)", icon: Bath },
            { value: "Média (21m² a 30m²)", label: "Média (21m² a 30m²)", icon: Bath },
            { value: "Grande (31m² a 60m²)", label: "Grande (31m² a 60m²)", icon: Bath },
            { value: "Muito grande (acima de 60m²)", label: "Muito grande (acima de 60m²)", icon: Bath },
          ]}
        />
      </Field>
    );
    case 6: return (
      <Field label="Que serviços precisa? (pode escolher vários)">
        <CheckboxGroup
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
        />
      </Field>
    );
    case 7: return (
      <Field label="Com que frequência pretende limpar?">
        <RadioGroup
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
        />
      </Field>
    );
    case 8: return (
      <>
        <Field label="Como está a piscina atualmente?">
          <RadioGroup
            name="poolStatus"
            value={formData.poolStatus}
            onChange={onChange}
            options={[
              { value: "Está limpa e cristalina", label: "Limpa e cristalina", icon: CircleCheck },
              { value: "Precisa de manutenção", label: "Precisa de manutenção", icon: AlertCircle },
              { value: "Água verde / turva", label: "Água verde / turva", icon: Cloud },
              { value: "Não tenho a certeza", label: "Não tenho a certeza", icon: HelpCircle },
            ]}
          />
        </Field>
        <Field label="A piscina utiliza que sistema?">
          <RadioGroup
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

function Field({ label, hint, children }) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
      {hint && <p className={styles.fieldHint}>{hint}</p>}
    </div>
  );
}

function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className={styles.radioGroup}>
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <label key={opt.value} className={`${styles.radioLabel} ${value === opt.value ? styles.radioActive : ''}`}>
            <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={onChange} />
            {value === opt.value && <Check size={14} strokeWidth={3} />}
            {Icon && <Icon size={16} className={styles.optionIcon} />}
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}

function CheckboxGroup({ name, value, onChange, options }) {
  return (
    <div className={styles.checkboxGroup}>
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <label key={opt.value} className={`${styles.checkboxLabel} ${value.includes(opt.value) ? styles.checkboxActive : ''}`}>
            <input type="checkbox" name={name} value={opt.value} checked={value.includes(opt.value)} onChange={onChange} />
            {value.includes(opt.value) && <Check size={14} strokeWidth={3} />}
            {Icon && <Icon size={16} className={styles.optionIcon} />}
            {opt.label}
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