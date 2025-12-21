import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import styles from "./contact.module.css";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    success: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        {
          ...formData,
          time: new Date().toLocaleString(),
        },
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        () => {
          setModal({ open: true, success: true });
          setFormData({ name: "", email: "", message: "" });
          setSending(false);
        },
        () => {
          setModal({ open: true, success: false });
          setSending(false);
        }
      );
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <h2 className={styles.title}>{t("contact.title")}</h2>
        <p className={styles.subtitle}>{t("contact.subtitle")}</p>

        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          {/* Name */}
          <div className={styles.inputGroup}>
            <span className={styles.icon}>👤</span>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label>{t("contact.form.name")}</label>
          </div>

          {/* Email */}
          <div className={styles.inputGroup}>
            <span className={styles.icon}>✉️</span>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label>{t("contact.form.email")}</label>
          </div>

          {/* Message */}
          <div className={styles.inputGroup}>
            <span className={styles.icon}>💬</span>
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
            />
            <label>{t("contact.form.message")}</label>
          </div>

          <button className={styles.btn} disabled={sending}>
            {sending ? t("contact.form.loading") : t("contact.form.submitButton.text")}
          </button>
        </form>
      </div>

      {/* MODAL */}
      {modal.open && (
        <div className={styles.modalBackdrop} onClick={() => setModal({ ...modal, open: false })}>
          <div
            className={`${styles.modalContent} ${
              modal.success ? styles.success : styles.error
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalIcon}>
              {modal.success ? "✅" : "❌"}
            </div>
            <p>
              {modal.success
                ? t("contact.form.alertSuccess")
                : t("contact.form.alertError")}
            </p>
            <button onClick={() => setModal({ ...modal, open: false })}>
              {t("contact.form.sending")}
            </button>
          </div>
        </div>
      )}

      
    </section>
  );
}

export default Contact;
