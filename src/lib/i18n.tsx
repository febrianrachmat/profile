"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
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

// The <html lang> attribute, set from storage by the locale script in the
// document head, is the single source of truth. React subscribes to it directly.
function subscribeLocale(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  return () => observer.disconnect();
}

function readLocale(): Locale {
  return document.documentElement.lang === "id" ? "id" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // The server renders English; the client reads the real attribute.
  const locale = useSyncExternalStore<Locale>(subscribeLocale, readLocale, () => "en");

  const setLocale = (next: Locale) => {
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
