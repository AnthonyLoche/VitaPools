"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "@/assets/css/home/ServicesSection.module.css";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Limpeza Regular",
      description: "Manutenção semanal ou quinzenal para manter a sua piscina impecável todo o ano.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1iY3zpw5f-w1oJ0Ot1BgXsELZ4sunRJwhOHeFa5LUq_pgDV1rRmGQacHn5dgNkpbrsD3x6EKkk_3zVSg-i4-gT-ebEFQWF15kYo61Zuc7Y-ya_w8wRYPzWprTFnV3spQglsebdb0YK3XRfXessUwJp4p7Z8nYa7VeHk9809ZQ-AdLr0aodKJlng0Hwzb0zLsTVwkmitkDMqDJjxHU8_b4VLISSlqQ_RKnibIEBphu6tzQ_4M8rYuT4WBcX5h0o6396aRduPmsBA",
      buttonText: "Saiba Mais",
    },
    {
      id: 2,
      title: "Manutenção Completa",
      description: "Verificação de filtros, bombas e sistemas de circulação incluídos no pacote.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD169t5XzocI1x74rOU9EVWywYoYHsUiY3J95WcYQ55TwyKTLGIbmP88xYZ5Ra7cyZYpa1OLtLdKJIgfb6cyB0u4bQUyJZk-0ESzCEpUOocWaFKHifdkOXHfwto4wZZU343rSBIpgMNw0kZVPHqgfunZrBnhA5x96ZA-UhiejpS5efjTqLwLjhLl9oejYCtajHoMmQ4WsQlUYpZnrCdWcTxxEhnO7g_KIhGA89St5Mk-3kwqCuiocixNr7UfoJaMKq3-0uJfS0anw",
      buttonText: "Saiba Mais",
    },
    {
      id: 3,
      title: "Tratamento Químico",
      description: "Ajuste rigoroso de pH, cloro e alcalinidade para uma água equilibrada e segura.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      buttonText: "Consultar",
    },
    {
      id: 4,
      title: "Recuperação de Água Verde",
      description: "Tratamento de choque para piscinas abandonadas ou com excesso de algas.",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
      buttonText: "Consultar",
    },
    {
      id: 5,
      title: "Limpeza de Paredes e Fundo",
      description: "Remoção mecânica e manual de resíduos incrustados nas superfícies.",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop",
      buttonText: "Consultar",
    },
    {
      id: 6,
      title: "Controlo Técnico",
      description: "Relatórios de estado e monitorização preventiva de todos os sistemas de apoio.",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
      buttonText: "Consultar",
    },
  ];

  return (
    <section className={styles.services} id="servicos">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>Nossos Serviços</span>
            <h2 className={styles.title}>Soluções Completas para sua Piscina</h2>
          </div>
          <p className={styles.description}>
            Desde a limpeza básica até ao controlo técnico avançado, garantimos que a sua piscina está sempre pronta para mergulhar.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              <img
                alt={service.title}
                className={styles.cardImage}
                src={service.image}
              />
              <div className={styles.overlay}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <button className={styles.cardButton}>
                  {service.buttonText}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;