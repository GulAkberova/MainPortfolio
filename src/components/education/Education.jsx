import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./education.module.css";

function Education() {
  const { t } = useTranslation();
  const educationItems = t("education.items", { returnObjects: true });

  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <section className={styles.education} id="education">
      <div className={styles.container}>
        <h2 className={styles.title}>{t("education.title")}</h2>
        <div className={styles.timeline}>
          {educationItems.map((item, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => openModal(item)}
            >
              <div className={styles.iconWrapper}>
                <img src={item.icon} alt={item.school} className={styles.icon} />
              </div>
              <div className={styles.info}>
                <div className={styles.header}>
                  <h3>{item.school}</h3>
                  <span className={styles.year}>{item.year}</span>
                </div>
                <p className={styles.degree}>{item.degree}</p>
                <p className={styles.desc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={closeModal}>
              ×
            </button>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                <img src={selectedItem.icon} alt={selectedItem.school} />
              </div>
              <h3>{selectedItem.school}</h3>
              <span className={styles.modalYear}>{selectedItem.year}</span>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalDegree}>{selectedItem.degree}</p>
              <p className={styles.modalDesc}>{selectedItem.longDescription || selectedItem.description}</p>
              {selectedItem.topics && (
                <ul className={styles.modalTopics}>
                  {selectedItem.topics.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Education;
