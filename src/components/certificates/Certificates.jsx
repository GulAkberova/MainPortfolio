import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./certificates.module.css";

const Certificates = () => {
  const { t } = useTranslation();
  const certificates = t("certificates.list", { returnObjects: true });

  return (
    <section className={styles.certificates} id="certificates">
      <div className={styles.container}>
        <h2 className={styles.title}>{t("certificates.title")}</h2>
        <div className={styles.grid}>
          {certificates.map((cert, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageBox}>
                <img src={cert.image} alt={cert.title} />
              </div>
              <div className={styles.content}>
                <h3>{cert.title}</h3>
                <p>{cert.platform}</p>
                <p className={styles.year}>{cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
