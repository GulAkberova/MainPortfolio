import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./works.module.css";

function Works() {
  const { t } = useTranslation();
  const projects = t("works.projects", { returnObjects: true });

  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section className={styles.works} id="works">
      <div className={styles.container}>
        <h2 className={styles.title}>{t("works.title")}</h2>
        <div className={styles.timeline}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
              onClick={() => openModal(project)}
            >
              <div className={styles.contentWrapper}>
                <div className={styles.logoWrapper}>
                  <img src={project.image} alt={project.title} />
                </div>
                <div className={styles.headerRow}>
                  <h3>{project.title}</h3>
                  <div className={styles.timelineDate}>{project.year}</div>
                </div>
                <h5>{project.position}</h5>
                <p>{project.description}</p>
                <div className={styles.tech}>
                  {project.tech.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
                <a
                  href={project.link || "#"}
                  className={styles.btn}
                  onClick={(e) => e.stopPropagation()}
                >
                  Daha çox bax →
                </a>
              </div>
            </div>
          ))}
          <div className={styles.timelineLine}></div>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
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
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <h3>{selectedProject.title}</h3>
              <span className={styles.modalYear}>{selectedProject.year}</span>
              <h5>{selectedProject.position}</h5>
            </div>
            <div className={styles.modalBody}>
              <p>{selectedProject.description}</p>
              {selectedProject.tech && (
                <div className={styles.modalTech}>
                  {selectedProject.tech.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              )}
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalBtn}
                >
                  Daha çox bax →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Works;
