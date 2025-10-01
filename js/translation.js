/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    en: {
      talk: "Let's Talk",
      about: "About Me",
      projects: "Projects",
      contact: "Contact",
    },
    es: {
      talk: "Hablemos",
      about: "Sobre mí",
      projects: "Proyectos",
      contact: "Contacto",
    }
  };

  const langSwitcher = document.getElementById("lang-switcher");
  if (!langSwitcher) return; // prevent error if button not found

  let currentLang = localStorage.getItem("lang") || 
    (navigator.language.startsWith("es") ? "es" : "en");

  function updateLanguage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.getAttribute("data-translate");
      el.textContent = translations[lang][key];
    });
    langSwitcher.textContent = lang.toUpperCase();
    localStorage.setItem("lang", lang);
  }

  langSwitcher.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    updateLanguage(currentLang);
  });

  updateLanguage(currentLang);
});
