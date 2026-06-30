// app/components/services/ServicesList.jsx
"use client";

import React, { useEffect, useRef } from "react";
import {
  Droplets,
  Wrench,
  FlaskConical,
  Sparkles,
  Brush,
  HeartPulse,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/services/main.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ServicesList = ({ services, phoneNumber = "351932096025" }) => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Anima cada seção de serviço quando entra na viewport
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const content = section.querySelector(`.${styles.serviceContent}`);
      const image = section.querySelector(`.${styles.serviceImage}`);

      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, x: index % 2 === 0 ? 40 : -40, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Função para mapear ícones
  const getIconComponent = (iconName) => {
    const icons = {
      Droplets,
      Wrench,
      FlaskConical,
      Sparkles,
      Brush,
      HeartPulse,
    };
    return icons[iconName] || Droplets;
  };

  return (
    <>
      {services.map((service, index) => {
        const IconComponent = getIconComponent(service.iconName || "Droplets");
        const isImageLeft = service.layout === "image-left";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(service.whatsappMessage)}`;

        return (
          <section
            key={service.id}
            id={service.anchor}
            ref={(el) => (sectionRefs.current[index] = el)}
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
                    {service.cta || "Solicitar este serviço"}
                    <ChevronRight size={18} />
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
    </>
  );
};

export default ServicesList;