import { getContent, getItemsContent } from "@/lib/content";
import type {
  Profile,
  TechCategory,
  Experience,
  Project,
  Education,
  Certification,
} from "@/lib/types";
import { PageClient } from "./page-client";

export default function Home() {
  const profileKo = getContent<Profile>("profile", "ko");
  const profileEn = getContent<Profile>("profile", "en");

  const techKo = getContent<{ categories: TechCategory[] }>("techstack", "ko");
  const techEn = getContent<{ categories: TechCategory[] }>("techstack", "en");

  const expKo = getItemsContent<Experience>("experience", "ko");
  const expEn = getItemsContent<Experience>("experience", "en");

  const projKo = getItemsContent<Project>("projects", "ko");
  const projEn = getItemsContent<Project>("projects", "en");

  const eduKo = getItemsContent<Education>("education", "ko");
  const eduEn = getItemsContent<Education>("education", "en");

  const certKo = getItemsContent<Certification>("certifications", "ko");
  const certEn = getItemsContent<Certification>("certifications", "en");

  return (
    <PageClient
      profileKo={{ ...profileKo.data, summary: profileKo.content.trim() }}
      profileEn={{ ...profileEn.data, summary: profileEn.content.trim() }}
      techKo={techKo.data.categories}
      techEn={techEn.data.categories}
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
