"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import { levelColors } from "@/lib/tech-utils";
import { cn } from "@/lib/utils";
import type { TechCategory } from "@/lib/types";

interface Props {
  ko: TechCategory[];
  en: TechCategory[];
  activeTech: string | null;
  onTechClick: (name: string) => void;
}

export function TechStackSection({ ko, en, activeTech, onTechClick }: Props) {
  const { t } = useLang();
  const categories = t(ko, en);

  return (
    <SectionWrapper id="techstack">
      <h2 className="text-2xl font-bold mb-8">
        {t(dict.techStack.ko, dict.techStack.en)}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Card key={cat.category}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{cat.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const isActive = activeTech === item.name;
                  const isDimmed = activeTech !== null && !isActive;

                  return (
                    <Badge
                      key={item.name}
                      variant="secondary"
                      className={cn(
                        item.level ? levelColors[item.level] : "",
                        "cursor-pointer transition-all duration-200",
                        isActive && "ring-2 ring-primary ring-offset-2 scale-105",
                        isDimmed && "opacity-30"
                      )}
                      onClick={() => onTechClick(item.name)}
                    >
                      {item.name}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
