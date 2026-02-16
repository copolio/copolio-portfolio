"use client";

import { createContext, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/types";

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

  return (
    <LangContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LangContext.Provider>
  );
}
