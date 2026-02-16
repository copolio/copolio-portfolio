"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";

const sections = [
  { id: "profile", label: dict.profile },
  { id: "techstack", label: dict.techStack },
  { id: "experience", label: dict.experience },
  { id: "projects", label: dict.projects },
  { id: "education", label: dict.education },
  { id: "certifications", label: dict.certifications },
] as const;

interface HeaderProps {
  activeSection?: string;
}

export function Header({ activeSection }: HeaderProps) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between h-14 px-4 md:px-8">
        <a href="#profile" className="font-bold text-lg">
          Portfolio
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-accent ${
                activeSection === s.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {t(s.label.ko, s.label.en)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LangToggle />
          <ThemeToggle />

          {/* Mobile nav */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex flex-col gap-2 mt-8">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent ${
                      activeSection === s.id
                        ? "text-foreground font-medium bg-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t(s.label.ko, s.label.en)}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
