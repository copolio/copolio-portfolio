"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Timeline } from "@/components/timeline/timeline";
import { TimelineItem } from "@/components/timeline/timeline-item";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import type { Experience } from "@/lib/types";

interface Props {
  ko: Experience[];
  en: Experience[];
}

export function ExperienceSection({ ko, en }: Props) {
  const { t } = useLang();
  const items = t(ko, en);

  return (
    <SectionWrapper id="experience">
      <h2 className="text-2xl font-bold mb-8">
        {t(dict.experience.ko, dict.experience.en)}
      </h2>

      <Timeline>
        {items.map((exp, i) => (
          <TimelineItem
            key={i}
            startDate={exp.startDate}
            endDate={exp.endDate}
            title={exp.company}
            subtitle={exp.role}
            location={exp.location}
            techUsed={exp.techUsed}
          >
            {exp.highlights.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {exp.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            )}
          </TimelineItem>
        ))}
      </Timeline>
    </SectionWrapper>
  );
}
