"use client";

import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", label: dict.profile },
  { id: "techstack", label: dict.techStack },
  { id: "experience", label: dict.experience },
  { id: "projects", label: dict.projects },
  { id: "education", label: dict.education },
  { id: "certifications", label: dict.certifications },
] as const;

interface TableOfContentsProps {
  activeSection: string;
}

export function TableOfContents({ activeSection }: TableOfContentsProps) {
  const { t } = useLang();

  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <ul className="space-y-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={cn(
                "block text-sm px-3 py-1.5 rounded-md transition-colors border-l-2",
                activeSection === s.id
                  ? "border-primary text-foreground font-medium bg-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              )}
            >
              {t(s.label.ko, s.label.en)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
