"use client";

import { useState, useMemo, useCallback } from "react";
import { track } from "@vercel/analytics";
import { Header } from "@/components/layout/header";
import { TableOfContents } from "@/components/layout/table-of-contents";
import { Footer } from "@/components/layout/footer";
import { ProfileSection } from "@/components/sections/profile-section";
import { TechStackSection } from "@/components/sections/techstack-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { EducationSection } from "@/components/sections/education-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { useActiveSection } from "@/hooks/use-active-section";
import type {
  Profile,
  TechCategory,
  TechItem,
  Experience,
  Project,
  Education,
  Certification,
} from "@/lib/types";

interface ProfileWithSummary extends Profile {
  summary: string;
}

interface PageClientProps {
  profileKo: ProfileWithSummary;
  profileEn: ProfileWithSummary;
  techKo: TechCategory[];
  techEn: TechCategory[];
  techMapKo: Record<string, TechItem>;
  techMapEn: Record<string, TechItem>;
  expKo: Experience[];
  expEn: Experience[];
  projKo: Project[];
  projEn: Project[];
  eduKo: Education[];
  eduEn: Education[];
  certKo: Certification[];
  certEn: Certification[];
}

const sectionIds = [
  "profile",
  "techstack",
  "experience",
  "projects",
  "education",
  "certifications",
];

export function PageClient({
  profileKo,
  profileEn,
  techKo,
  techEn,
  techMapKo,
  expKo,
  expEn,
  projKo,
  projEn,
  eduKo,
  eduEn,
  certKo,
  certEn,
}: PageClientProps) {
  const activeSection = useActiveSection(sectionIds);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const techMap = useMemo(() => {
    const map = new Map<string, TechItem>();
    for (const [name, item] of Object.entries(techMapKo)) {
      map.set(name, item);
    }
    return map;
  }, [techMapKo]);

  const projectsByCompanyKo = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const proj of projKo) {
      if (proj.company) {
        const existing = map.get(proj.company) || [];
        existing.push(proj);
        map.set(proj.company, existing);
      }
    }
    return map;
  }, [projKo]);

  const projectsByCompanyEn = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const proj of projEn) {
      if (proj.company) {
        const existing = map.get(proj.company) || [];
        existing.push(proj);
        map.set(proj.company, existing);
      }
    }
    return map;
  }, [projEn]);

  const handleTechClick = useCallback((name: string) => {
    setActiveTech((prev) => {
      const next = prev === name ? null : name;
      if (next !== null) {
        track("tech_filter", { tech: name });
      }
      return next;
    });
  }, []);

  return (
    <>
      <Header activeSection={activeSection} />
      <TableOfContents activeSection={activeSection} />
      <main className="min-h-screen">
        <ProfileSection ko={profileKo} en={profileEn} />
        <TechStackSection
          ko={techKo}
          en={techEn}
          activeTech={activeTech}
          onTechClick={handleTechClick}
        />
        <ExperienceSection
          ko={expKo}
          en={expEn}
          activeTech={activeTech}
          onTechClick={handleTechClick}
          techMap={techMap}
          projectsByCompanyKo={projectsByCompanyKo}
          projectsByCompanyEn={projectsByCompanyEn}
        />
        <ProjectsSection
          ko={projKo}
          en={projEn}
          activeTech={activeTech}
          onTechClick={handleTechClick}
          techMap={techMap}
        />
        <EducationSection ko={eduKo} en={eduEn} />
        <CertificationsSection ko={certKo} en={certEn} />
      </main>
      <Footer />
    </>
  );
}
