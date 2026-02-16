"use client";

import Markdown from "react-markdown";
import { SubPageHeader } from "@/components/layout/sub-page-header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import type { Project, ProjectDetail } from "@/lib/types";
import {
  Calendar,
  Building2,
  Users,
  Briefcase,
  Github,
  ExternalLink,
} from "lucide-react";

interface Props {
  projKo: Project;
  projEn: Project;
  detailKo: ProjectDetail | null;
  detailEn: ProjectDetail | null;
  companySlug: string | null;
}

function formatDate(date: string, present: string): string {
  if (!date) return present;
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}

export function ProjectDetailClient({
  projKo,
  projEn,
  detailKo,
  detailEn,
  companySlug,
}: Props) {
  const { t } = useLang();
  const proj = t(projKo, projEn);
  const detail = t(detailKo, detailEn);
  const present = t(dict.present.ko, dict.present.en);
  const dateRange = `${formatDate(proj.startDate, present)} - ${proj.endDate ? formatDate(proj.endDate, present) : present}`;

  const breadcrumbs = companySlug
    ? [
        {
          label: dict.experience,
          href: `/#experience`,
        },
        {
          label: t(projKo.company!, projEn.company!),
          href: `/experience/${companySlug}`,
        },
        { label: t(projKo.title, projEn.title) },
      ]
    : [
        { label: dict.projects, href: "/#projects" },
        { label: t(projKo.title, projEn.title) },
      ];

  return (
    <>
      <SubPageHeader breadcrumbs={breadcrumbs} />
      <main className="min-h-screen py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Project header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">{proj.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
              {proj.company && companySlug && (
                <a
                  href={`/experience/${companySlug}`}
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Building2 className="h-4 w-4" />
                  {proj.company}
                </a>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {dateRange}
              </span>
              {detail?.role && (
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  {detail.role}
                </span>
              )}
              {detail?.teamSize && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {t(dict.teamSize.ko, dict.teamSize.en)} {detail.teamSize}
                  {t("명", "")}
                </span>
              )}
            </div>
          </div>

          {/* Tech stack */}
          {proj.techUsed.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {proj.techUsed.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* Links */}
          {proj.links && (
            <div className="flex gap-2 mb-10">
              {proj.links.github && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={proj.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-1.5" />
                    GitHub
                  </a>
                </Button>
              )}
              {proj.links.demo && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={proj.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-1.5" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          )}

          {/* MDX content */}
          {detail?.content ? (
            <article className="prose prose-neutral dark:prose-invert max-w-none">
              <Markdown>{detail.content}</Markdown>
            </article>
          ) : (
            /* Fallback to highlights if no detail content */
            proj.highlights.length > 0 && (
              <ul className="space-y-2 text-muted-foreground">
                {proj.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
