import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./home.module.css";

function Home() {
  const { t } = useTranslation();

  return (
    <section className={styles.home}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h1 className={styles.fadeIn}>
            {t("home.greeting", { name: "Gül Əkbərova" })}
          </h1>
          <h2 className={styles.typewriter}>
            {t("home.role")}
          </h2>
          <p className={styles.fadeInDelay}>
            {t("home.description")}
          </p>
          <a href="/works" className={styles.btn}>
            {t("home.btn")}
          </a>
        </div>

        <div className={styles.imageBox}>
          <div className={styles.glow}></div>
          <img src="/gul-main.jpg" alt="Profile" className={styles.floatImg} />
        </div>
      </div>
    </section>
  );
}

export default Home;
