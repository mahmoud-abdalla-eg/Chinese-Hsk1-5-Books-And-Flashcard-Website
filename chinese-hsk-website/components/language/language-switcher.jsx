"use client";

import { useState } from "react";
import { languages } from "@/lib/i18n/dictionaries";
import { useLanguage } from "./language-provider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const active = languages[lang] || languages.en;

  const chooseLanguage = (code) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-w-36 items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-800 shadow-sm shadow-slate-900/5 transition hover:border-amber-300 hover:bg-amber-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{active.label}</span>
        <span className="text-xs text-slate-400">v</span>
      </button>
      {open ? (
        <div
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-2xl shadow-slate-900/15"
          role="listbox"
        >
          {Object.entries(languages).map(([code, language]) => (
            <button
              key={code}
              type="button"
              onClick={() => chooseLanguage(code)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
                code === lang
                  ? "bg-amber-100 text-amber-950"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              dir={language.dir}
              role="option"
              aria-selected={code === lang}
            >
              <span>{language.label}</span>
              <span className="text-xs uppercase text-slate-400">{code}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
