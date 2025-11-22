import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styles from "./homeLayout.module.css";

import Header from "../header/Header";

import Home from "../home/Home";
import About from "../about/About";
import Education from "../education/Education";
import Certificates from "../certificates/Certificates";
import Skills from "../skills/Skills";
import Works from "../works/Works";
import Contact from "../contact/Contact";
import SeenWorks from "../seenworks/SeenWorks";
import LangSelector from "../lang/LangSelector";

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
  const { i18n } = useTranslation();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("home");
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Scroll & URL sync
  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    const element = document.getElementById(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(path);
  }, [location.pathname]);

  const handleChangeLang = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
  };

  const handleSectionClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(id);
    window.history.pushState(null, "", `/${id}`);
    setSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      
      {/* 🔹 Header Component */}
      <Header
        sections={sections}
        activeSection={activeSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleSectionClick={handleSectionClick}
        selectedLang={selectedLang}
        handleChangeLang={handleChangeLang}
      />

      {/* 🔹 Main content */}
      <main className={styles.mainContent}>
        {sections.map((section) => (
          <section id={section.id} key={section.id}>
            {section.component}
          </section>
        ))}
      </main>
      <LangSelector 
        selectedLang={selectedLang}
        onChangeLang={handleChangeLang}
    />
    </div>
  );
}

export default HomeLayout;
