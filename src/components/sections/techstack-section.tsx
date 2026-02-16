"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import type { TechCategory } from "@/lib/types";

const levelColors: Record<string, string> = {
  expert: "bg-primary text-primary-foreground",
  advanced: "bg-primary/80 text-primary-foreground",
  intermediate: "bg-secondary text-secondary-foreground",
  beginner: "bg-muted text-muted-foreground",
};

interface Props {
  ko: TechCategory[];
  en: TechCategory[];
}

export function TechStackSection({ ko, en }: Props) {
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
                {cat.items.map((item) => (
                  <Badge
                    key={item.name}
                    variant="secondary"
                    className={item.level ? levelColors[item.level] : ""}
                  >
                    {item.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
