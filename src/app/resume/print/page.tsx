import {
  getContent,
  getItemsContent,
  aggregateTechData,
} from "@/lib/content";
import type {
  Profile,
  TechCategory,
  Experience,
  Project,
  Education,
  Certification,
} from "@/lib/types";
import { ResumePrintClient } from "./page-client";

interface ProfileWithSummary extends Profile {
  summary: string;
}

export default function ResumePrintPage() {
  const profileKo = getContent<Profile>("profile", "ko");
  const profileEn = getContent<Profile>("profile", "en");

  const techKoRaw = getContent<{ categories: TechCategory[] }>(
    "techstack",
    "ko"
  );
  const techEnRaw = getContent<{ categories: TechCategory[] }>(
    "techstack",
    "en"
  );

  const expKo = getItemsContent<Experience>("experience", "ko");
  const expEn = getItemsContent<Experience>("experience", "en");

  const projKo = getItemsContent<Project>("projects", "ko");
  const projEn = getItemsContent<Project>("projects", "en");

  const eduKo = getItemsContent<Education>("education", "ko");
  const eduEn = getItemsContent<Education>("education", "en");

  const certKo = getItemsContent<Certification>("certifications", "ko");
  const certEn = getItemsContent<Certification>("certifications", "en");

  const techAggKo = aggregateTechData(
    techKoRaw.data.categories,
    expKo,
    projKo,
    "기타"
  );
  const techAggEn = aggregateTechData(
    techEnRaw.data.categories,
    expEn,
    projEn,
    "Others"
  );

  return (
    <ResumePrintClient
      profileKo={
        {
          ...profileKo.data,
          summary: profileKo.content.trim(),
        } as ProfileWithSummary
      }
      profileEn={
        {
          ...profileEn.data,
          summary: profileEn.content.trim(),
        } as ProfileWithSummary
      }
      techKo={techAggKo.categories}
      techEn={techAggEn.categories}
      expKo={expKo}
      expEn={expEn}
      projKo={projKo}
      projEn={projEn}
      eduKo={eduKo}
      eduEn={eduEn}
      certKo={certKo}
      certEn={certEn}
    />
  );
}
