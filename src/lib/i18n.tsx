"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "id";

export type LocalizedString = Record<Locale, string>;

export function t(value: LocalizedString, locale: Locale): string {
  return value[locale];
}

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("locale");
    if (stored === "en" || stored === "id") {
      setLocaleState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem("locale", next);
    } catch {
      /* ignore storage errors */
    }
  };

  const toggleLocale = () => setLocale(locale === "en" ? "id" : "en");

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
