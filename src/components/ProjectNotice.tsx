"use client";

import { ui } from "@/lib/content";
import { t, useLocale, type LocalizedString } from "@/lib/i18n";

export default function ProjectNotice({
  notice,
  className = "",
}: {
  notice: LocalizedString;
  className?: string;
}) {
  const { locale } = useLocale();
  return (
    <p
      role="note"
      className={`max-w-lg border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-ink-soft ${className}`}
    >
      <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
        {t(ui.statusNote, locale)}
      </span>
      {t(notice, locale)}
    </p>
  );
}
