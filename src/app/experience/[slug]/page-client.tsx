"use client";

import { Header } from "@/components/layout/header";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import type { Experience, Project } from "@/lib/types";
import {
  MapPin,
  Calendar,
  Briefcase,
  ChevronRight,
  Github,
  ExternalLink,
} from "lucide-react";

interface Props {
  expKo: Experience;
  expEn: Experience;
  projKo: Project[];
  projEn: Project[];
}

function formatDate(date: string, present: string): string {
  if (!date) return present;
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}

export function ExperienceDetailClient({
  expKo,
  expEn,
  projKo,
  projEn,
}: Props) {
  const { t } = useLang();
  const exp = t(expKo, expEn);
  const projects = t(projKo, projEn);
  const present = t(dict.present.ko, dict.present.en);
  const dateRange = `${formatDate(exp.startDate, present)} - ${exp.endDate ? formatDate(exp.endDate, present) : present}`;

  return (
    <>
      <Header />
      <BreadcrumbNav
        items={[
          { label: dict.experience, href: "/#experience" },
          { label: t(expKo.company, expEn.company) },
        ]}
      />
      <main className="min-h-screen py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Company header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-3 flex items-center gap-2">
              {exp.company}
              {exp.website && (
                <a
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {exp.role}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {dateRange}
              </span>
              {exp.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {exp.location}
                </span>
              )}
            </div>
          </div>

          {/* Tech stack */}
          {exp.techUsed.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {exp.techUsed.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* Highlights */}
          {exp.highlights.length > 0 && (
            <div className="mb-12">
              <ul className="space-y-2 text-muted-foreground">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6">
                {t(dict.projectsAtCompany.ko, dict.projectsAtCompany.en)}
              </h2>
              <div className="grid gap-4">
                {projects.map((proj) => (
                  <a
                    key={proj.slug}
                    href={`/projects/${proj.slug}`}
                    className="group"
                  >
                    <Card className="transition-all hover:shadow-md hover:border-primary/30">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-base group-hover:text-primary transition-colors flex items-center gap-1">
                            {proj.title}
                            <ChevronRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </h3>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {formatDate(proj.startDate, present)} -{" "}
                            {proj.endDate
                              ? formatDate(proj.endDate, present)
                              : present}
                          </span>
                        </div>
                        {proj.highlights.length > 0 && (
                          <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                            {proj.highlights.map((h, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {proj.techUsed.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            {proj.links?.github && (
                              <Github className="h-4 w-4 text-muted-foreground" />
                            )}
                            {proj.links?.demo && (
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
