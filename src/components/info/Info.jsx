import React from "react";
import styles from "./info.module.css";

function Info() {
  return (
    <div className={styles.header}>
      <div className={styles.iconWrapper}>
      {/* <a href="tel:+994501234567" className={styles.iconLink} aria-label="Call">
        <img src="/icons/about/phone.svg" alt="Phone" />
      </a>

      <a href="mailto:gulkhanimakberova@gmail.com" className={styles.iconLink} aria-label="Email">
        <img src="/icons/about/maill.svg" alt="Email" />
      </a> */}

        {/* LinkedIn */}
        <a
        href="https://www.linkedin.com/in/g%C3%BClxan%C4%B1mekberova/"
        className={styles.iconLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <img src="/icons/about/linkedin.svg" alt="LinkedIn" />
      </a>
 <a
        href="https://www.instagram.com/pmlexicon/"
        className={styles.iconLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="instagram"
      >
        <img src="/icons/about/instagram.png" alt="Instagram" />
      </a>
       
      {/* <a
        href="https://github.com/gulakberova"
        className={styles.iconLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <img src="/icons/about/github.svg" alt="GitHub" />
      </a> */}

      <a
        href="/cv/Gulkhanim_Akbaova_CV_IT.pdf"
        download
        className={`${styles.iconLink} ${styles.cvLink}`}
        aria-label="Download CV"
      >
        <img src="/icons/about/download.svg" alt="Download CV" />
      </a>
      </div>
    </div>
  );
}

export default Info;
