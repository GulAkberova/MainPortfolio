import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./contact.module.css";

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert(t("contact.alert")); // JSON-dan alınan tərcümə
    setFormData({ name: "", email: "", message: "" });
  };

  const fields = t("contact.form.fields", { returnObjects: true });

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <h2 className={styles.title}>{t("contact.title")}</h2>
        <p className={styles.subtitle}>{t("contact.subtitle")}</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          {fields.map((field, index) => {
            if (field.type === "textarea") {
              return (
                <textarea
                  key={index}
                  name={field.name}
                  rows={field.rows}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                ></textarea>
              );
            }
            return (
              <input
                key={index}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            );
          })}
          <button type="submit" className={styles.btn}>
            {t("contact.form.submitButton.text")}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
