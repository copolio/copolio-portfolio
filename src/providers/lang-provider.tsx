"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Locale } from "@/lib/types";
import { dict } from "@/lib/dictionary";

interface LangContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <T>(ko: T, en: T) => T;
}

export const LangContext = createContext<LangContextType>({
  locale: "ko",
  setLocale: () => {},
  t: <T,>(ko: T) => ko,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ko");

  const t = <T,>(ko: T, en: T): T => (locale === "ko" ? ko : en);

  useEffect(() => {
    document.title = dict.siteTitle[locale];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", dict.siteDescription[locale]);
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LangContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LangContext.Provider>
  );
}
