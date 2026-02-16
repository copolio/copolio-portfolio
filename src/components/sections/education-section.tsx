"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import { GraduationCap } from "lucide-react";
import type { Education } from "@/lib/types";

interface Props {
  ko: Education[];
  en: Education[];
}

export function EducationSection({ ko, en }: Props) {
  const { t } = useLang();
  const items = t(ko, en);

  return (
    <SectionWrapper id="education">
      <h2 className="text-2xl font-bold mb-8">
        {t(dict.education.ko, dict.education.en)}
      </h2>

      <div className="space-y-4">
        {items.map((edu, i) => (
          <Card key={i}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {edu.startDate} - {edu.endDate ?? t("현재", "Present")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree} · {edu.field}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground mt-1">
                      GPA: {edu.gpa}
                    </p>
                  )}
                  {edu.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
