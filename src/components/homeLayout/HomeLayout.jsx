import React, { useState } from "react";
import styles from "./homeLayout.module.css";
import { useTranslation } from "react-i18next";
import Home from "../home/Home";
import About from "../about/About";
import Education from "../education/Education";
import Certificates from "../certificates/Certificates";
import Skills from "../skills/Skills";
import Works from "../works/Works";
import Contact from "../contact/Contact";
import SeenWorks from "../seenworks/SeenWorks";

const sections = [
  { id: "home", component: <Home /> },
  { id: "about", component: <About /> },
  { id: "education", component: <Education /> },
  { id: "works", component: <Works /> },
  { id: "projects", component: <SeenWorks /> },
  { id: "skills", component: <Skills /> },
  { id: "certificates", component: <Certificates /> },
  { id: "contact", component: <Contact /> },
];

function HomeLayout() {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("home");
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChangeLang = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
  };

  const renderComponent = sections.find(
    (s) => s.id === activeSection
  )?.component;

  return (
    <div className={styles.layout}>
      {/* Burger icon for mobile */}
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

      {/* Sidebar */}
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
                onClick={() => {
                  setActiveSection(section.id);
                  setSidebarOpen(false); // click to close menu on mobile
                }}
              >
                {t(`nav.${section.id}`)}
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.langSelectorBox}>
          {["az", "en", "ru", "tr"].map((lng) => (
            <span
              key={lng}
              className={`${styles.langButton} ${
                selectedLang === lng ? styles.activeLang : ""
              }`}
              onClick={() => handleChangeLang(lng)}
            >
              {lng.toUpperCase()}
            </span>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>{renderComponent}</main>
    </div>
  );
}

export default HomeLayout;
