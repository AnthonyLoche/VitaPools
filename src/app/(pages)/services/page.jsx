// src/app/pages/services/page.jsx
"use client";

import React, { useEffect, useRef } from "react";
import { HeaderMain, FooterMain } from "@/app/components";
import {
  Droplets,
  Wrench,
  FlaskConical,
  Sparkles,
  Brush,
  HeartPulse,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import styles from "@/assets/css/services/main.module.css";

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Limpeza Regular",
      subtitle: "Manutenção preventiva para uma piscina sempre impecável",
      description:
        "A limpeza regular é a base para manter a sua piscina saudável e cristalina. Realizamos visitas semanais ou quinzenais, adaptadas à frequência de utilização e às necessidades específicas da sua piscina.\n\nDurante cada visita, fazemos a limpeza de superfície, aspiração do fundo, esfregagem de paredes e linha de água, limpeza de skimmers e cestos, além da verificação do sistema de filtração e dos níveis de pH e cloro.\n\nCom este serviço, garantimos que a sua piscina está sempre pronta para receber a família e amigos, sem preocupações nem surpresas desagradáveis.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1iY3zpw5f-w1oJ0Ot1BgXsELZ4sunRJwhOHeFa5LUq_pgDV1rRmGQacHn5dgNkpbrsD3x6EKkk_3zVSg-i4-gT-ebEFQWF15kYo61Zuc7Y-ya_w8wRYPzWprTFnV3spQglsebdb0YK3XRfXessUwJp4p7Z8nYa7VeHk9809ZQ-AdLr0aodKJlng0Hwzb0zLsTVwkmitkDMqDJjxHU8_b4VLISSlqQ_RKnibIEBphu6tzQ_4M8rYuT4WBcX5h0o6396aRduPmsBA",
      icon: Droplets,
      features: [
        "Limpeza de superfície",
        "Aspiração do fundo",
        "Esfregagem de paredes e linha de água",
        "Limpeza de skimmers e cestos",
        "Verificação do sistema de filtração",
        "Controlo de pH e cloro",
      ],
      cta: "Solicitar este serviço",
      layout: "image-left",
      whatsappMessage: "Olá! Gostaria de solicitar informações sobre o serviço de *Limpeza Regular* para piscina. Podem entrar em contato comigo? Obrigado!",
      anchor: "limpeza-regular", // Adicionar anchor único
    },
    {
      id: 2,
      title: "Manutenção Completa",
      subtitle: "Cuidado integral para todos os sistemas da sua piscina",
      description:
        "A manutenção completa vai além da limpeza, abrangendo a verificação e otimização de todos os sistemas da piscina: filtração, bombagem, circulação e tratamento químico.\n\nEste serviço inclui a análise detalhada do equipamento, limpeza de filtros, verificação de bombas e ajuste fino de todos os parâmetros para garantir o máximo de eficiência e durabilidade.\n\nIdeal para quem quer ter a certeza de que a piscina está a funcionar no seu melhor, com o mínimo de consumo energético e o máximo de qualidade da água.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD169t5XzocI1x74rOU9EVWywYoYHsUiY3J95WcYQ55TwyKTLGIbmP88xYZ5Ra7cyZYpa1OLtLdKJIgfb6cyB0u4bQUyJZk-0ESzCEpUOocWaFKHifdkOXHfwto4wZZU343rSBIpgMNw0kZVPHqgfunZrBnhA5x96ZA-UhiejpS5efjTqLwLjhLl9oejYCtajHoMmQ4WsQlUYpZnrCdWcTxxEhnO7g_KIhGA89St5Mk-3kwqCuiocixNr7UfoJaMKq3-0uJfS0anw",
      icon: Wrench,
      features: [
        "Verificação de filtros",
        "Inspeção de bombas",
        "Análise de circulação",
        "Otimização de eficiência",
        "Relatório técnico detalhado",
      ],
      cta: "Solicitar este serviço",
      layout: "image-right",
      whatsappMessage: "Olá! Gostaria de solicitar informações sobre o serviço de *Manutenção Completa* para piscina. Podem entrar em contato comigo? Obrigado!",
      anchor: "manutencao-completa",
    },
    {
      id: 3,
      title: "Tratamento Químico",
      subtitle: "Equilíbrio perfeito para uma água segura e cristalina",
      description:
        "O tratamento químico é a ciência por trás de uma água de piscina perfeitamente equilibrada. Realizamos uma análise rigorosa dos níveis de pH, cloro, alcalinidade e dureza da água, ajustando-os com precisão cirúrgica.\n\nUtilizamos produtos de alta qualidade e fazemos a dosagem exata para cada situação, garantindo que a água fica segura para os banhistas, sem agressões à pele, olhos ou equipamentos.\n\nCom este serviço, eliminamos as dúvidas sobre a química da piscina e asseguramos que a água está sempre no ponto ideal para desfrutar com toda a tranquilidade.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      icon: FlaskConical,
      features: [
        "Análise completa da água",
        "Ajuste de pH e alcalinidade",
        "Dosagem de cloro precisa",
        "Correção de dureza",
        "Uso de produtos certificados",
        "Água segura e equilibrada",
      ],
      cta: "Solicitar este serviço",
      layout: "image-left",
      whatsappMessage: "Olá! Gostaria de solicitar informações sobre o serviço de *Tratamento Químico* para piscina. Podem entrar em contato comigo? Obrigado!",
      anchor: "tratamento-quimico",
    },
    {
      id: 4,
      title: "Recuperação de Água Verde",
      subtitle: "Transformação radical em tempo recorde",
      description:
        "A água verde é um dos problemas mais comuns e frustrantes para quem tem piscina. Causada por algas que se multiplicam em condições de desequilíbrio químico ou filtração insuficiente, a água verde pode parecer um pesadelo.\n\nCom a nossa experiência e produtos específicos, realizamos um tratamento de choque que elimina as algas, clarifica a água e restaura o equilíbrio químico num curto espaço de tempo.\n\nNormalmente, em 48 a 72 horas, a sua piscina passa de verde e opaca a cristalina e convidativa. Acompanhamos o processo até a água estar completamente estável e segura.",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
      icon: Sparkles,
      features: [
        "Diagnóstico da situação",
        "Tratamento de choque",
        "Eliminação de algas",
        "Clarificação da água",
        "Restauração do equilíbrio químico",
        "Acompanhamento até estabilizar",
      ],
      cta: "Solicitar este serviço",
      layout: "image-right",
      whatsappMessage: "Olá! Gostaria de solicitar informações sobre o serviço de *Recuperação de Água Verde* para piscina. Podem entrar em contato comigo? Obrigado!",
      anchor: "recuperacao-agua-verde",
    },
    {
      id: 5,
      title: "Limpeza de Paredes e Fundo",
      subtitle: "Remoção profunda de resíduos incrustados",
      description:
        "Com o tempo, as superfícies da piscina acumulam resíduos incrustados, manchas de calcário, algas aderentes e sujidade que a limpeza superficial não consegue remover.\n\nRealizamos uma limpeza mecânica e manual de paredes e fundo, utilizando técnicas e produtos específicos para cada tipo de revestimento (azulejo, fibra, vinil, etc.), removendo a sujidade mais teimosa sem danificar as superfícies.\n\nO resultado é uma piscina com as superfícies completamente limpas, brilhantes e livres de manchas, prolongando a vida útil do revestimento e melhorando significativamente a estética da piscina.",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop",
      icon: Brush,
      features: [
        "Remoção de manchas e incrustações",
        "Limpeza de algas aderentes",
        "Tratamento de calcário",
        "Adequado a todos os revestimentos",
        "Superfícies brilhantes e limpas",
        "Prolongamento da vida útil",
      ],
      cta: "Solicitar este serviço",
      layout: "image-left",
      whatsappMessage: "Olá! Gostaria de solicitar informações sobre o serviço de *Limpeza de Paredes e Fundo* para piscina. Podem entrar em contato comigo? Obrigado!",
      anchor: "limpeza-paredes-fundo",
    },
    {
      id: 6,
      title: "Controlo Técnico",
      subtitle: "Monitorização preventiva de todos os sistemas",
      description:
        "O controlo técnico é o serviço de monitorização e prevenção que mantém a sua piscina a funcionar no seu melhor, evitando avarias e problemas maiores.\n\nRealizamos inspeções regulares a todos os sistemas: filtração, bombagem, eletricidade, automação, tratamento químico e outros componentes. Emitimos relatórios detalhados com o estado de cada sistema e recomendações de manutenção preventiva.\n\nEste serviço é essencial para quem valoriza a longevidade dos equipamentos e quer evitar paragens inesperadas, garantindo que a piscina está sempre pronta a ser usada.",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
      icon: HeartPulse,
      features: [
        "Inspeção de sistemas",
        "Monitorização preventiva",
        "Relatórios detalhados",
        "Recomendações técnicas",
        "Longevidade dos equipamentos",
      ],
      cta: "Solicitar este serviço",
      layout: "image-right",
      whatsappMessage: "Olá! Gostaria de solicitar informações sobre o serviço de *Controlo Técnico* para piscina. Podem entrar em contato comigo? Obrigado!",
      anchor: "controlo-tecnico",
    },
  ];

  const phoneNumber = "351932096025";

  // Efeito para scroll para a âncora quando a página carregar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // Pequeno delay para garantir que a página carregou completamente
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 300);
      }
    }
  }, []);

  return (
    <>
      <HeaderMain />

      {/* Hero da Página */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroContent}>
          <span className={styles.pageHeroBadge}>Serviços</span>
          <h1 className={styles.pageHeroTitle}>Soluções completas para a sua piscina</h1>
          <p className={styles.pageHeroDescription}>
            Conheça os nossos serviços especializados, desenhados para manter a sua piscina
            sempre pronta a receber quem mais gosta.
          </p>
        </div>
        <div className={styles.pageHeroWave}></div>
      </section>

      {/* Lista de Serviços */}
      {services.map((service, index) => {
        const IconComponent = service.icon;
        const isImageLeft = service.layout === "image-left";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(service.whatsappMessage)}`;

        return (
          <section
            key={service.id}
            id={service.anchor} // Adicionar ID para âncora
            className={`${styles.serviceSection} ${index % 2 === 0 ? styles.sectionEven : styles.sectionOdd}`}
          >
            <div className={styles.serviceContainer}>
              <div className={`${styles.serviceGrid} ${isImageLeft ? styles.gridImageLeft : styles.gridImageRight}`}>
                {/* Imagem */}
                <div className={styles.serviceImage}>
                  <div className={styles.imageWrapper}>
                    <img
                      alt={service.title}
                      className={styles.serviceImg}
                      src={service.image}
                    />
                    <div className={styles.imageBadge}>
                      <IconComponent size={18} />
                      <span>{service.title}</span>
                    </div>
                  </div>
                </div>

                {/* Texto */}
                <div className={styles.serviceContent}>
                  <div className={styles.serviceHeader}>
                    <span className={styles.serviceNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                  </div>
                  <p className={styles.serviceSubtitle}>{service.subtitle}</p>

                  <div className={styles.serviceDescription}>
                    {service.description.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  <ul className={styles.serviceFeatures}>
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <CheckCircle size={18} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.serviceCta}
                  >
                    {service.cta}
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Separador entre serviços */}
            {index < services.length - 1 && (
              <div className={styles.serviceDivider}></div>
            )}
          </section>
        );
      })}

      {/* CTA Final */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaContainer}>
          <div className={styles.finalCtaContent}>
            <h2>Precisa de ajuda a escolher?</h2>
            <p>
              Fale connosco e descubra qual o serviço mais adequado para a sua piscina.
              Orçamento gratuito e sem compromisso.
            </p>
            <a 
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Olá! Visitei o site de vocês e gostaria de saber mais informações sobre os serviços de piscina. Podem me ajudar?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.finalCtaButton}
            >
              Fale connosco agora
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>
      <FooterMain />
    </>
  );
};

export default ServicesPage;