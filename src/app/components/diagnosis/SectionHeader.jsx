// app/components/Diagnosis/SectionHeader.jsx

import React from "react";
import styles from "@/assets/css/diagnosis/SectionHeader.module.css";

const SectionHeader = ({ badge, title, subtitle }) => {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionBadge}>{badge}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionSubtitle}>{subtitle}</p>
    </div>
  );
};

export default SectionHeader;