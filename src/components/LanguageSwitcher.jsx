import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lng");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  return null;
};
