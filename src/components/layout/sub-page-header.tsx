"use client";

import { ChevronRight } from "lucide-react";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useLang } from "@/hooks/use-lang";
import { dict, type DictEntry } from "@/lib/dictionary";

interface Breadcrumb {
  label: DictEntry | string;
  href?: string;
}

interface SubPageHeaderProps {
  breadcrumbs: Breadcrumb[];
}

export function SubPageHeader({ breadcrumbs }: SubPageHeaderProps) {
  const { t } = useLang();

  function renderLabel(label: DictEntry | string): string {
    if (typeof label === "string") return label;
    return t(label.ko, label.en);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between h-14 px-4 md:px-8">
        <nav className="flex items-center gap-1.5 text-sm min-w-0">
          <a
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            {t(dict.home.ko, dict.home.en)}
          </a>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground transition-colors truncate"
                >
                  {renderLabel(crumb.label)}
                </a>
              ) : (
                <span className="text-foreground font-medium truncate">
                  {renderLabel(crumb.label)}
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
