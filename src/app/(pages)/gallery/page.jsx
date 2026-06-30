"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HeaderMain, FooterMain } from "@/app/components";
import {
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/assets/css/gallery/main.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Imagens importadas
import img001 from "@/assets/images/gallery/img001.jpg";
import img002 from "@/assets/images/gallery/img002.jpg";
import img003 from "@/assets/images/gallery/img003.jpg";
import img004 from "@/assets/images/gallery/img004.jpg";
import img005 from "@/assets/images/gallery/img005.jpg";

// Vídeos importados
import video001 from "@/assets/images/gallery/video001.mp4";
import video002 from "@/assets/images/gallery/video002.mp4";
import video003 from "@/assets/images/gallery/video003.mp4";
import video004 from "@/assets/images/gallery/video004.mp4";
import video005 from "@/assets/images/gallery/video005.mp4";
import video006 from "@/assets/images/gallery/video006.mp4";
import video007 from "@/assets/images/gallery/video007.mp4";

const galleryItems = [
  // ===== IMAGENS =====
  {
    id: 1,
    type: "image",
    src: img001,
    title: "Piscina Cristalina",
    description: "Após tratamento completo em Mafra",
    category: "recuperacao",
  },
  {
    id: 2,
    type: "image",
    src: img002,
    title: "Antes e Depois",
    description: "Recuperação de água verde em Ericeira",
    category: "antes-depois",
  },
  {
    id: 3,
    type: "image",
    src: img003,
    title: "Manutenção Regular",
    description: "Piscina de cliente em Mafra",
    category: "manutencao",
  },
  {
    id: 4,
    type: "image",
    src: img004,
    title: "Água Cristalina",
    description: "Tratamento químico profissional",
    category: "tratamento",
  },
  {
    id: 5,
    type: "image",
    src: img005,
    title: "Recuperação de Algas",
    description: "Antes do tratamento de choque",
    category: "recuperacao",
  },
  // ===== VÍDEOS =====
  {
    id: 6,
    type: "video",
    src: video001,
    title: "Transformação Completa",
    description: "Processo de recuperação em time-lapse",
    category: "recuperacao",
  },
  {
    id: 7,
    type: "video",
    src: video002,
    title: "Limpeza de Paredes",
    description: "Técnica profissional de limpeza",
    category: "limpeza",
  },
  {
    id: 8,
    type: "video",
    src: video003,
    title: "Manutenção Premium",
    description: "Serviço completo em ação",
    category: "manutencao",
  },
  {
    id: 9,
    type: "video",
    src: video004,
    title: "Tratamento Químico",
    description: "Ajuste de pH e cloro",
    category: "tratamento",
  },
  {
    id: 10,
    type: "video",
    src: video005,
    title: "Antes e Depois",
    description: "Transformação em 48 horas",
    category: "antes-depois",
  },
  {
    id: 11,
    type: "video",
    src: video006,
    title: "Limpeza de Filtros",
    description: "Manutenção preventiva",
    category: "manutencao",
  },
  {
    id: 12,
    type: "video",
    src: video007,
    title: "Pós Serviço",
    description: "Tratamento final e inspeção",
    category: "recuperacao",
  },
];

const categories = [
  { id: "all", label: "Todos" },
  { id: "recuperacao", label: "Recuperações" },
  { id: "manutencao", label: "Manutenção" },
  { id: "limpeza", label: "Limpeza" },
  { id: "tratamento", label: "Tratamento" },
  { id: "antes-depois", label: "Antes & Depois" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // Refs para animações
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const waveRef = useRef(null);
  const filterBarRef = useRef(null);
  const filterButtonsRef = useRef([]);
  const statsRef = useRef(null);
  const gridRef = useRef(null);
  const gridItemsRef = useRef([]);

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  // --- ANIMAÇÕES DO HERO ---
  useEffect(() => {
    // Badge
    gsap.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Título
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        delay: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Descrição
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 25, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Wave
    gsap.fromTo(
      waveRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Parallax no hero
    const heroContent = heroRef.current?.querySelector(`.${styles.heroContent}`);
    if (heroContent) {
      gsap.to(heroContent, {
        y: 20,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // --- ANIMAÇÕES DA FILTER BAR ---
  useEffect(() => {
    // Filter Bar
    gsap.fromTo(
      filterBarRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: filterBarRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Botões do filtro (um por um)
    filterButtonsRef.current.forEach((button, index) => {
      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: 0.1 + index * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: filterBarRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // Stats
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: filterBarRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // --- ANIMAÇÕES DOS ITENS DO GRID ---
  useEffect(() => {
    // Aguarda os itens serem renderizados
    const items = gridItemsRef.current;
    if (items.length === 0) return;

    // Anima cada item do grid
    items.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
  }, [filter]); // Re-anima quando o filtro muda

  const openLightbox = (index) => {
    const actualIndex = galleryItems.indexOf(filteredItems[index]);
    setCurrentIndex(actualIndex);
    setSelectedItem(galleryItems[actualIndex]);
    setIsPlaying(false);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    document.body.style.overflow = "auto";
  };

  const navigateLightbox = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < galleryItems.length) {
      setCurrentIndex(newIndex);
      setSelectedItem(galleryItems[newIndex]);
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Reset das referências quando o filtro muda
  useEffect(() => {
    gridItemsRef.current = [];
  }, [filter]);

  return (
    <>
      <HeaderMain />
      <main className={styles.main}>
        <section ref={heroRef} className={styles.hero}>
          <div className={styles.heroContent}>
            <span ref={badgeRef} className={styles.heroBadge}>
              Galeria
            </span>
            <h1 ref={titleRef} className={styles.heroTitle}>
              O nosso trabalho em imagens
            </h1>
            <p ref={descriptionRef} className={styles.heroDescription}>
              Veja alguns dos nossos projetos e transformações realizadas em piscinas
              na região de Mafra, Ericeira e arredores.
            </p>
          </div>
          <div ref={waveRef} className={styles.heroWave}></div>
        </section>

        <div className={styles.container}>
          <div ref={filterBarRef} className={styles.filterBar}>
            <div className={styles.filterScroll}>
              {categories.map((cat, index) => (
                <button
                  key={cat.id}
                  ref={(el) => (filterButtonsRef.current[index] = el)}
                  className={`${styles.filterButton} ${
                    filter === cat.id ? styles.filterActive : ""
                  }`}
                  onClick={() => setFilter(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div ref={statsRef} className={styles.filterStats}>
              <span>{filteredItems.length} itens</span>
            </div>
          </div>

          <div ref={gridRef} className={styles.grid}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (gridItemsRef.current[index] = el)}
                className={styles.gridItem}
                onClick={() => openLightbox(index)}
              >
                {item.type === "image" ? (
                  <div className={styles.mediaWrapper}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      className={styles.mediaImage}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={styles.mediaOverlay}>
                      <div className={styles.mediaInfo}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div className={styles.mediaType}>
                        <ImageIcon size={18} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.mediaWrapper}>
                    <video
                      src={item.src}
                      className={styles.mediaVideo}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                    />
                    <div className={styles.playButton}>
                      <Play size={48} />
                    </div>
                    <div className={styles.mediaOverlay}>
                      <div className={styles.mediaInfo}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div className={styles.mediaType}>
                        <Video size={18} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className={styles.emptyState}>
              <p>Nenhum item encontrado para esta categoria.</p>
            </div>
          )}
        </div>
      </main>

      {selectedItem && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>
            <X size={28} />
          </button>

          {currentIndex > 0 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {currentIndex < galleryItems.length - 1 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
            >
              <ChevronRight size={32} />
            </button>
          )}

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.type === "image" ? (
              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className={styles.lightboxImage}
                  fill
                  sizes="90vw"
                  priority
                />
              </div>
            ) : (
              <div className={styles.lightboxVideoWrapper}>
                <video
                  ref={videoRef}
                  src={selectedItem.src}
                  className={styles.lightboxVideo}
                  controls={false}
                  onClick={togglePlay}
                />
                <button
                  className={styles.lightboxPlayBtn}
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause size={48} /> : <Play size={48} />}
                </button>
              </div>
            )}

            <div className={styles.lightboxInfo}>
              <div>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.description}</p>
              </div>
              <div className={styles.lightboxMeta}>
                <span className={styles.lightboxType}>
                  {selectedItem.type === "image" ? "📷 Imagem" : "🎬 Vídeo"}
                </span>
                <span className={styles.lightboxCounter}>
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <FooterMain />
    </>
  );
}