import React, { useState } from "react";
import styles from "./langSelector.module.css";

const languages = ["az", "en", "ru", "tr"];

function LangSelector({ selectedLang , onChangeLang }) {
  const currentLang = selectedLang || "az";
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* Seçilmiş dil */}
      <div  className={styles.mainFlag}>
      <img
        src={`/icons/language/${currentLang}.svg`}
        alt={currentLang}
        className={styles.mainFlagImg}
        onClick={() => setOpen(!open)}
      />
      </div>
     

      {/* Açılan digər dillər */}
      {open && (
        <div className={styles.dropdown}>
          {languages
            .filter((lng) => lng !== currentLang)
            .map((lng) => (
              <img
                key={lng}
                src={`/icons/language/${lng}.svg`}
                alt={lng}
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
