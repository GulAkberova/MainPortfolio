// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import HttpBackend from "i18next-http-backend";

// i18n
//   .use(HttpBackend) // JSON fayllarından tərcümələri yükləyir
//   .use(LanguageDetector) // Brauzerin dilini təyin edir
//   .use(initReactI18next) // React ilə işləmək üçün
//   .init({
//     fallbackLng: "az", // Əgər brauzer dilini tapa bilməsə, default olaraq Azərbaycan dilini göstərir
//     debug: true, // Debug rejimi
//     interpolation: {
//       escapeValue: false, // XSS təhlükəsindən qorunmaq üçün lazımdır
//     },
//   });

// export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "az",
    debug: true,
    interpolation: { escapeValue: false },
    backend: {
      // JSON fayllarının yolunu public/qovluğuna görə təyin et
      loadPath: "/locales/{{lng}}/translation.json"
    },
    detection: {
      order: ["queryString", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie"],
    },
    react: { useSuspense: true } // Suspense ilə işləmək üçün
  });

export default i18n;
