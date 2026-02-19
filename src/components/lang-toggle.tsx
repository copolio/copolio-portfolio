"use client";

import { useLang } from "@/hooks/use-lang";
import { Button } from "@/components/ui/button";

export function LangToggle() {
  const { locale, setLocale } = useLang();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLocale(locale === "ko" ? "en" : "ko")}
      className="font-mono text-xs w-10"
    >
      {locale === "ko" ? "EN" : "KO"}
    </Button>
  );
}
