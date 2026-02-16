import { getContent, getItemsContent, getProjectDetail } from "@/lib/content";
import type {
  Profile,
  Experience,
  Project,
  ProjectDetail,
} from "@/lib/types";
import { CareerPrintClient } from "./page-client";

interface ProjectWithDetail extends Project {
  detail: ProjectDetail | null;
  experienceRole?: string;
}

export default function CareerPrintPage() {
  const profileKo = getContent<Profile>("profile", "ko");
  const profileEn = getContent<Profile>("profile", "en");

  const expKo = getItemsContent<Experience>("experience", "ko");
  const expEn = getItemsContent<Experience>("experience", "en");

  const projKo = getItemsContent<Project>("projects", "ko");
  const projEn = getItemsContent<Project>("projects", "en");

  // Build company-to-experience lookup
  const expByCompanyKo = new Map(expKo.map((e) => [e.company, e]));
  const expByCompanyEn = new Map(expEn.map((e) => [e.company, e]));

  // Enrich projects with detail content
  const enrichedKo: ProjectWithDetail[] = projKo.map((proj) => ({
    ...proj,
    detail: getProjectDetail(proj.slug, "ko"),
    experienceRole: proj.company
      ? expByCompanyKo.get(proj.company)?.role
      : undefined,
  }));

  const enrichedEn: ProjectWithDetail[] = projEn.map((proj) => ({
    ...proj,
    detail: getProjectDetail(proj.slug, "en"),
    experienceRole: proj.company
      ? expByCompanyEn.get(proj.company)?.role
      : undefined,
  }));

  return (
    <CareerPrintClient
      profileKo={profileKo.data}
      profileEn={profileEn.data}
      projectsKo={enrichedKo}
      projectsEn={enrichedEn}
    />
  );
}
