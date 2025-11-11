import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/UserContext";
import { signOut } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";
import styles from "./header.module.css";

function Header() {
  const { user, role, loading } = useUser();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoBox}>
        <NavLink to="/">
          <img src="/rsm.png" alt="Logo" className={styles.logo} />
        </NavLink>
      </div>

      <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.active : ""}`}>
        <ul>
          <li>
            <NavLink to="/home" onClick={() => setIsMobileMenuOpen(false)}>{t("home")}</NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>{t("about")}</NavLink>
          </li>
          <li>
            <NavLink to="/education" onClick={() => setIsMobileMenuOpen(false)}>{t("education")}</NavLink>
          </li>
          <li>
            <NavLink to="/certificates" onClick={() => setIsMobileMenuOpen(false)}>{t("certificates")}</NavLink>
          </li>
          <li>
            <NavLink to="/skills" onClick={() => setIsMobileMenuOpen(false)}>{t("skills")}</NavLink>
          </li>
          <li>
            <NavLink to="/works" onClick={() => setIsMobileMenuOpen(false)}>{t("works")}</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t("contact")}</NavLink>
          </li>
          {(role === "admin" || role === "superadmin") && (
            <li>
              <NavLink to="/answer" onClick={() => setIsMobileMenuOpen(false)}>{t("answer")}</NavLink>
            </li>
          )}
          {role === "superadmin" && (
            <li>
              <NavLink to="/superuserdashboard" onClick={() => setIsMobileMenuOpen(false)}>
                {t("superdashboard")}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <div className={styles.right}>
        <select
          value={selectedLang}
          onChange={(e) => changeLanguage(e.target.value)}
          className={styles.langSelector}
        >
          <option value="az">AZ</option>
          <option value="en">EN</option>
          <option value="ru">RU</option>
          <option value="tr">TR</option>
        </select>

        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : user ? (
          <div className={styles.userDropdown}>
            <div
              className={styles.avatar}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {user.email.charAt(0).toUpperCase()}
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <p>{user.email}</p>
                <p>{t("status")}: {role}</p>
                <button onClick={handleLogout}>{t("logout")}</button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authLinks}>
            <NavLink to="/login">Login</NavLink> / <NavLink to="/register">Register</NavLink>
          </div>
        )}

        <div
          className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}

export default Header;
