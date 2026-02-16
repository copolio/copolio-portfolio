import { notFound } from "next/navigation";
import { getItemsContent } from "@/lib/content";
import type { Experience, Project } from "@/lib/types";
import { ExperienceDetailClient } from "./page-client";

export function generateStaticParams() {
  const items = getItemsContent<Experience>("experience", "ko");
  return items.map((item) => ({ slug: item.slug }));
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const allExpKo = getItemsContent<Experience>("experience", "ko");
  const allExpEn = getItemsContent<Experience>("experience", "en");
  const expKo = allExpKo.find((e) => e.slug === slug);
  const expEn = allExpEn.find((e) => e.slug === slug);

  if (!expKo || !expEn) {
    return notFound();
  }

  const allProjKo = getItemsContent<Project>("projects", "ko");
  const allProjEn = getItemsContent<Project>("projects", "en");
  const projKo = allProjKo.filter((p) => p.company === expKo.company);
  const projEn = allProjEn.filter((p) => p.company === expEn.company);

  return (
    <ExperienceDetailClient
      expKo={expKo}
      expEn={expEn}
      projKo={projKo}
      projEn={projEn}
    />
  );
}
