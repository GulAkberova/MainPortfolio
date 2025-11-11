import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./about.module.css";

const About = () => {
  const { t } = useTranslation();
  const infoItems = t("about.info", { returnObjects: true });
  const contacts = t("about.contacts", { returnObjects: true });

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        {/* 🔹 Şəkil hissəsi */}
        <div className={styles.imageBox}>
          <img src="/gul-kbrova-mail.jpeg" alt={t("about.title")} />
        </div>

        {/* 🔹 Mətn və info hissəsi */}
        <div className={styles.textBox}>
          <h2 className={styles.title}>{t("about.title")}</h2>

          <p className={styles.description}>
            {t("about.description1", { name: "Gül Əkbərova" })}
          </p>

          <p className={styles.description}>
            {t("about.description2")}
          </p>

          <p className={styles.description}>
            <strong>{t("about.techSkills")}</strong>
          </p>

          {/* 🔹 Info grid */}
          <div className={styles.infoGrid}>
            {infoItems.map((item, idx) => (
              <div key={idx}>
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            ))}

            {/* 🔹 Contacts (ikonlu və linkli) */}
            {contacts.map((contact, idx) => (
              <div key={`contact-${idx}`}>
                <h4>{contact.label}</h4>
                <p>
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "6px", color: "#1e1e1e", textDecoration: "none" }}
                  >
                    {/* SVG icon placeholder */}
                    <img
                      src={`${contact.icon}`} 
                      alt={contact.type}
                      style={{ width: "18px", height: "18px" }}
                    />
                    {contact.value}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
