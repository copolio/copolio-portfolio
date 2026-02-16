"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Timeline } from "@/components/timeline/timeline";
import { TimelineItem } from "@/components/timeline/timeline-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import type { TechMap } from "@/lib/tech-utils";
import { Github, ExternalLink, Building2 } from "lucide-react";
import type { Project } from "@/lib/types";

interface Props {
  ko: Project[];
  en: Project[];
  activeTech: string | null;
  onTechClick: (name: string) => void;
  techMap: TechMap;
}

export function ProjectsSection({
  ko,
  en,
  activeTech,
  onTechClick,
  techMap,
}: Props) {
  const { t } = useLang();
  const items = t(ko, en);

  return (
    <SectionWrapper id="projects">
      <h2 className="text-2xl font-bold mb-8">
        {t(dict.projects.ko, dict.projects.en)}
      </h2>

      <Timeline>
        {items.map((proj, i) => (
          <TimelineItem
            key={i}
            startDate={proj.startDate}
            endDate={proj.endDate}
            title={proj.title}
            titleHref={`/projects/${proj.slug}`}
            techUsed={proj.techUsed}
            activeTech={activeTech}
            onTechClick={onTechClick}
            techMap={techMap}
          >
            {proj.company && (
              <div className="mb-2">
                <Badge variant="secondary" className="text-xs">
                  <Building2 className="h-3 w-3 mr-1" />
                  {proj.company}
                </Badge>
              </div>
            )}

            {proj.highlights.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {proj.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            )}

            {proj.links && (
              <div className="flex gap-2 mt-3">
                {proj.links.github && (
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={proj.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  </Button>
                )}
                {proj.links.demo && (
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={proj.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            )}
          </TimelineItem>
        ))}
      </Timeline>
    </SectionWrapper>
  );
}
