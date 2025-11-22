import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./header.module.css";

const Header = ({
  sections,
  activeSection,
  sidebarOpen,
  setSidebarOpen,
  handleSectionClick,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* 🔹 Burger icon */}
      <div
        className={styles.burger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div
          className={`${styles.bar} ${sidebarOpen ? styles.bar1 : ""}`}
        ></div>
        <div
          className={`${styles.bar} ${sidebarOpen ? styles.bar2 : ""}`}
        ></div>
        <div
          className={`${styles.bar} ${sidebarOpen ? styles.bar3 : ""}`}
        ></div>
      </div>

      {/* 🔹 Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <div className={styles.profile}>
          <img src="/gul-main.jpg" alt="Profile" />
          <h2>Gül Əkbərova</h2>
        </div>

        <nav className={styles.nav}>
          <ul>
            {sections.map((section) => (
              <li
                key={section.id}
                className={activeSection === section.id ? styles.active : ""}
                onClick={() => handleSectionClick(section.id)}
              >
                {t(`nav.${section.id}`)}
              </li>
            ))}
          </ul>
        </nav>

       
      </aside>
    </>
  );
};

export default Header;
