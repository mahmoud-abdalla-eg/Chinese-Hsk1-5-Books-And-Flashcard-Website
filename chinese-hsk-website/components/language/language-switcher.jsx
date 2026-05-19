"use client";

import { languages } from "@/lib/i18n/dictionaries";
import { useLanguage } from "./language-provider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <label className="flex items-center gap-2 rounded-full border border-slate-950/10 bg-white/70 px-3 py-2 text-sm shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <span className="sr-only">Language</span>
      <select
        value={lang}
        onChange={(event) => setLang(event.target.value)}
        className="bg-transparent font-black text-slate-800 outline-none dark:text-slate-100"
      >
        {Object.entries(languages).map(([code, language]) => (
          <option key={code} value={code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
