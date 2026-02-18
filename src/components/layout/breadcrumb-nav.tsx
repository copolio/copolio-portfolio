"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { dict, type DictEntry } from "@/lib/dictionary";

export interface BreadcrumbItem {
  label: DictEntry | string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const { t } = useLang();

  function renderLabel(label: DictEntry | string): string {
    if (typeof label === "string") return label;
    return t(label.ko, label.en);
  }

  return (
    <nav className="border-b bg-muted/40">
      <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-sm px-4 md:px-8 h-10">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          {t(dict.home.ko, dict.home.en)}
        </Link>
        {items.map((crumb, i) => (
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
      </div>
    </nav>
  );
}
