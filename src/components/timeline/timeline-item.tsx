"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import { levelColors, type TechMap } from "@/lib/tech-utils";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TimelineItemProps {
  startDate: string;
  endDate?: string;
  title: string;
  subtitle?: string;
  location?: string;
  techUsed?: string[];
  children?: ReactNode;
  activeTech?: string | null;
  onTechClick?: (name: string) => void;
  techMap?: TechMap;
}

function formatDate(date: string, present: string): string {
  if (!date) return present;
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}

export function TimelineItem({
  startDate,
  endDate,
  title,
  subtitle,
  location,
  techUsed,
  children,
  activeTech,
  onTechClick,
  techMap,
}: TimelineItemProps) {
  const { t } = useLang();
  const present = t(dict.present.ko, dict.present.en);
  const dateRange = `${formatDate(startDate, present)} - ${endDate ? formatDate(endDate, present) : present}`;

  const isRelevant =
    !activeTech || (techUsed?.includes(activeTech) ?? false);

  return (
    <div className="relative pl-8 md:pl-10">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1" />
      {/* Timeline dot */}
      <div className="absolute left-[-4px] top-2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background md:left-[-3px]" />

      <Card
        className={cn(
          "transition-all duration-200",
          activeTech && !isRelevant && "opacity-30 scale-[0.98]"
        )}
      >
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
            <div>
              <h3 className="font-semibold text-base">{title}</h3>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="whitespace-nowrap">{dateRange}</span>
              {location && (
                <>
                  <span className="hidden sm:inline">·</span>
                  <span>{location}</span>
                </>
              )}
            </div>
          </div>

          {children}

          {techUsed && techUsed.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {techUsed.map((tech) => {
                const techItem = techMap?.get(tech);
                const isActive = activeTech === tech;
                const isDimmed = activeTech !== null && !isActive;

                return (
                  <Badge
                    key={tech}
                    variant={techItem?.level ? "secondary" : "outline"}
                    className={cn(
                      "text-xs transition-all duration-200",
                      techItem?.level && levelColors[techItem.level],
                      onTechClick && "cursor-pointer",
                      isActive &&
                        "ring-2 ring-primary ring-offset-1 scale-105",
                      isDimmed && "opacity-40"
                    )}
                    onClick={
                      onTechClick ? () => onTechClick(tech) : undefined
                    }
                  >
                    {tech}
                  </Badge>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
