import React, { useState } from "react";
import styles from "./langSelector.module.css";

const languages = ["az", "en", "ru", "tr"];

function LangSelector({ selectedLang, onChangeLang }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* Seçilmiş dil */}
      <img
        src={`/icons/language/${selectedLang}.svg`}
        className={styles.mainFlag}
        onClick={() => setOpen(!open)}
      />

      {/* Açılan digər dillər */}
      {open && (
        <div className={styles.dropdown}>
          {languages
            .filter((lng) => lng !== selectedLang)
            .map((lng) => (
              <img
                key={lng}
                src={`/icons/language/${lng}.svg`}
                className={styles.childFlag}
                onClick={() => {
                  onChangeLang(lng);
                  setOpen(false);
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default LangSelector;
