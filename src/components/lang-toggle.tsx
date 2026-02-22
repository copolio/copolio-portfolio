"use client";

import { track } from "@vercel/analytics";
import { useLang } from "@/hooks/use-lang";
import { Button } from "@/components/ui/button";

export function LangToggle() {
  const { locale, setLocale } = useLang();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => {
        const next = locale === "ko" ? "en" : "ko";
        track("lang_switch", { to: next });
        setLocale(next);
      }}
      className="font-mono text-xs w-10"
    >
      {locale === "ko" ? "EN" : "KO"}
    </Button>
  );
}
