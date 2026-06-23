"use client";

import React from "react";
import Image from "next/image";
import styles from "@/assets/css/home/OriginSection.module.css";
import originImage from "@/assets/images/gallery/img001.jpg" // Substitua pela sua imagem

const Origin = () => {
  return (
    <section className={styles.origin}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Imagem */}
          <div className={styles.imageWrapper}>
            <Image
              src={originImage}
              alt="Manhã calma junto a uma piscina, antes do tratamento diário"
              className={styles.image}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Texto */}
          <div className={styles.content}>
            <span className={styles.badge}>Porque faço isto</span>
            
            <div className={styles.quote}>
              <p className={styles.quoteText}>
                "Uma piscina não se resolve com pressa — observa-se a água, 
                percebe-se o que ela está a dizer, e responde-se com calma."
              </p>
              
              <p className={styles.quoteBody}>
                Comecei a tratar piscinas por uma razão simples: gosto do tipo 
                de atenção que isto exige. Há qualquer coisa de quase meditativo 
                nisto — o silêncio de uma manhã antes de qualquer cliente acordar, 
                a água a ganhar transparência aos poucos, o problema que parecia 
                grande a desfazer-se com paciência e o produto certo, não com mais 
                produto.
                <br /><br />
                Para mim, tratar uma piscina é cuidar de um espaço onde uma 
                família vai criar memórias — um mergulho depois do trabalho, 
                uma tarde de verão com os filhos. Esse sentido é o que trago a 
                cada visita: não é só água limpa, é devolver a alguém um lugar 
                de descanso.
              </p>
            </div>

            <div className={styles.signature}>
              — Fundador, VitaPools
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origin;