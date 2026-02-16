"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Timeline } from "@/components/timeline/timeline";
import { TimelineItem } from "@/components/timeline/timeline-item";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import type { TechMap } from "@/lib/tech-utils";
import { Github, FolderOpen } from "lucide-react";
import type { Experience, Project } from "@/lib/types";

interface Props {
  ko: Experience[];
  en: Experience[];
  activeTech: string | null;
  onTechClick: (name: string) => void;
  techMap: TechMap;
  projectsByCompanyKo: Map<string, Project[]>;
  projectsByCompanyEn: Map<string, Project[]>;
}

export function ExperienceSection({
  ko,
  en,
  activeTech,
  onTechClick,
  techMap,
  projectsByCompanyKo,
  projectsByCompanyEn,
}: Props) {
  const { t } = useLang();
  const items = t(ko, en);
  const projectsByCompany = t(projectsByCompanyKo, projectsByCompanyEn);

  return (
    <SectionWrapper id="experience">
      <h2 className="text-2xl font-bold mb-8">
        {t(dict.experience.ko, dict.experience.en)}
      </h2>

      <Timeline>
        {items.map((exp, i) => {
          const linkedProjects = projectsByCompany.get(exp.company) || [];
          return (
            <TimelineItem
              key={i}
              startDate={exp.startDate}
              endDate={exp.endDate}
              title={exp.company}
              subtitle={exp.role}
              location={exp.location}
              techUsed={exp.techUsed}
              activeTech={activeTech}
              onTechClick={onTechClick}
              techMap={techMap}
            >
              {exp.highlights.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {exp.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              )}

              {linkedProjects.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-primary/20 space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                    <FolderOpen className="h-3 w-3" />
                    {t(dict.relatedProjects.ko, dict.relatedProjects.en)}
                  </p>
                  {linkedProjects.map((proj, k) => (
                    <div key={k} className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{proj.title}</span>
                        {proj.links?.github && (
                          <a
                            href={proj.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      {proj.techUsed.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {proj.techUsed.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-[10px] px-1.5 py-0"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TimelineItem>
          );
        })}
      </Timeline>
    </SectionWrapper>
  );
}
