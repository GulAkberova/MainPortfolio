import React, { useEffect, useState, useRef } from "react";
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
import Info from "../info/Info";

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
  const [selectedLang, setSelectedLang] = useState(i18n.language || "az");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sectionRefs = useRef({});

  const handleChangeLang = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
  };

  const handleSectionClick = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(id);
    window.history.pushState(null, "", `/${id}`);
    setSidebarOpen(false);
  };

  // 🔹 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px", // section mərkəzə gələndə aktiv olsun
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((section) => {
        const el = sectionRefs.current[section.id];
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  useEffect(() => {
    if (i18n.language) {
      setSelectedLang(i18n.language);
    }
  }, [i18n.language]);

  return (
    <div className={styles.layout}>
      <Header
        sections={sections}
        activeSection={activeSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleSectionClick={handleSectionClick}
      />

      <main className={styles.mainContent}>
        {sections.map((section) => (
          <section
            id={section.id}
            key={section.id}
            ref={(el) => (sectionRefs.current[section.id] = el)}
          >
            {section.component}
          </section>
        ))}
      </main>

      <LangSelector selectedLang={selectedLang} onChangeLang={handleChangeLang} />
      <Info />

    </div>
  );
}

export default HomeLayout;
