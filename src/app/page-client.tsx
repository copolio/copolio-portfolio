"use client";

import { Header } from "@/components/layout/header";
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

  return (
    <>
      <Header activeSection={activeSection} />
      <main className="min-h-screen">
        <ProfileSection ko={profileKo} en={profileEn} />
        <TechStackSection ko={techKo} en={techEn} />
        <ExperienceSection ko={expKo} en={expEn} />
        <ProjectsSection ko={projKo} en={projEn} />
        <EducationSection ko={eduKo} en={eduEn} />
        <CertificationsSection ko={certKo} en={certEn} />
      </main>
      <Footer />
    </>
  );
}
