"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import { levelColors, type TechMap } from "@/lib/tech-utils";
import { cn } from "@/lib/utils";
import { ChevronRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

interface TimelineItemProps {
  startDate: string;
  endDate?: string;
  title: string;
  titleHref?: string;
  website?: string;
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
  titleHref,
  website,
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
    <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-[8rem_1fr] md:gap-6">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-35" />
      {/* Timeline dot */}
      <div className="absolute left-[-4px] top-2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background md:left-34 md:top-5" />

      {/* Left column: date (desktop only) */}
      <div className="hidden md:flex md:flex-col md:items-end md:pt-4 md:text-sm md:text-muted-foreground">
        <span className="whitespace-nowrap">{dateRange}</span>
        {location && <span className="text-xs mt-0.5">{location}</span>}
      </div>

      {/* Right column: card */}
      <Card
        className={cn(
          "transition-all duration-200",
          activeTech && !isRelevant && "opacity-30 scale-[0.98]"
        )}
      >
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
            <div>
              <div className="flex items-center gap-1.5">
                {titleHref ? (
                  <a
                    href={titleHref}
                    className="font-semibold text-base hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {title}
                    <ChevronRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ) : (
                  <h3 className="font-semibold text-base">{title}</h3>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {/* Date and location: mobile only */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground md:hidden">
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
