"use client";

import { useState, useRef } from "react";
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
import styles from "@/assets/css/gallery/main.module.css";

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

  const filteredItems = galleryItems.filter(
    (item) => filter === "all" || item.category === filter
  );

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

  return (
    <>
      <HeaderMain />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Galeria</span>
            <h1 className={styles.heroTitle}>O nosso trabalho em imagens</h1>
            <p className={styles.heroDescription}>
              Veja alguns dos nossos projetos e transformações realizadas em piscinas
              na região de Mafra, Ericeira e arredores.
            </p>
          </div>
          <div className={styles.heroWave}></div>
        </section>

        <div className={styles.container}>
          <div className={styles.filterBar}>
            <div className={styles.filterScroll}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.filterButton} ${
                    filter === cat.id ? styles.filterActive : ""
                  }`}
                  onClick={() => setFilter(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className={styles.filterStats}>
              <span>{filteredItems.length} itens</span>
            </div>
          </div>

          <div className={styles.grid}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
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