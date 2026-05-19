"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { languages, t } from "@/lib/i18n/dictionaries";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  tr: (key) => t(key, "en"),
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("mandarin-flow-language");
    if (saved && languages[saved]) setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mandarin-flow-language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = languages[lang]?.dir || "ltr";
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, tr: (key) => t(key, lang) }),
    [lang],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function Localized({ k }) {
  const { tr } = useLanguage();
  return tr(k);
}
