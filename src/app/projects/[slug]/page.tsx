import { notFound } from "next/navigation";
import { getItemsContent, getProjectDetail } from "@/lib/content";
import { extractHeadings } from "@/lib/markdown-utils";
import type { Experience, Project } from "@/lib/types";
import { ProjectDetailClient } from "./page-client";

export function generateStaticParams() {
  const items = getItemsContent<Project>("projects", "ko");
  return items.map((item) => ({ slug: item.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const allProjKo = getItemsContent<Project>("projects", "ko");
  const allProjEn = getItemsContent<Project>("projects", "en");
  const projKo = allProjKo.find((p) => p.slug === slug);
  const projEn = allProjEn.find((p) => p.slug === slug);

  if (!projKo || !projEn) {
    return notFound();
  }

  const detailKo = getProjectDetail(slug, "ko");
  const detailEn = getProjectDetail(slug, "en");

  // Resolve company slug for breadcrumb link
  let companySlug: string | null = null;
  if (projKo.company) {
    const experiences = getItemsContent<Experience>("experience", "ko");
    const exp = experiences.find((e) => e.company === projKo.company);
    if (exp) companySlug = exp.slug;
  }

  const headingsKo = detailKo ? extractHeadings(detailKo.content) : [];
  const headingsEn = detailEn ? extractHeadings(detailEn.content) : [];

  return (
    <ProjectDetailClient
      projKo={projKo}
      projEn={projEn}
      detailKo={detailKo}
      detailEn={detailEn}
      companySlug={companySlug}
      headingsKo={headingsKo}
      headingsEn={headingsEn}
    />
  );
}
