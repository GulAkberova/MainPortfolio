import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./skills.module.css";

function Skills() {
  const { t } = useTranslation();
  const skillsData = t("skills.categories", { returnObjects: true });

  return (
    <section className={styles.skills} id="skills">
      <div className={styles.container}>
        <h2 className={styles.title}>{t("skills.title")}</h2>

        <div className={styles.categories}>
          {skillsData.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              <div className={styles.skillsGrid}>
                {category.items.map((skill, idx) => (
                  <div key={idx} className={styles.skillCard}>
                    <div className={styles.iconWrapper}>
                      <img src={skill.icon} alt={skill.name} />
                    </div>
                    <p>{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
