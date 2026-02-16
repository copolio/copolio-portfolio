"use client";

import Markdown from "react-markdown";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import { LangToggle } from "@/components/lang-toggle";
import type { Profile, Project, ProjectDetail } from "@/lib/types";
import { Mail, Github, Linkedin, MapPin, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectWithDetail extends Project {
  detail: ProjectDetail | null;
  experienceRole?: string;
}

interface Props {
  profileKo: Profile;
  profileEn: Profile;
  projectsKo: ProjectWithDetail[];
  projectsEn: ProjectWithDetail[];
}

function formatDate(date: string, present: string): string {
  if (!date) return present;
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}

export function CareerPrintClient({
  profileKo,
  profileEn,
  projectsKo,
  projectsEn,
}: Props) {
  const { t } = useLang();
  const profile = t(profileKo, profileEn);
  const projects = t(projectsKo, projectsEn);
  const present = t(dict.present.ko, dict.present.en);

  return (
    <div className="print-page-bg">
      {/* Toolbar - hidden in print */}
      <div className="sticky top-0 z-10 flex items-center justify-end gap-2 px-4 py-3 print:hidden">
        <LangToggle />
        <Button
          variant="default"
          size="sm"
          onClick={() => window.print()}
          className="gap-1.5"
        >
          <Printer className="h-4 w-4" />
          {t("PDF 저장", "Save PDF")}
        </Button>
      </div>

      <div className="print-page">
        {/* Header */}
        <header className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-base text-muted-foreground mt-0.5">
            {profile.title} —{" "}
            {t(dict.careerDescription.ko, dict.careerDescription.en)}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              {profile.email}
            </span>
            {profile.github && (
              <span className="flex items-center gap-1">
                <Github className="h-3.5 w-3.5" />
                {profile.github.replace("https://github.com/", "")}
              </span>
            )}
            {profile.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="h-3.5 w-3.5" />
                {profile.linkedin.replace("https://linkedin.com/in/", "")}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </div>
        </header>

        {/* Projects */}
        {projects.map((proj, idx) => (
          <section
            key={proj.slug}
            className={idx < projects.length - 1 ? "mb-8" : ""}
          >
            {/* Project header */}
            <div className="mb-3 border-b pb-2">
              <h2 className="text-lg font-bold">{proj.title}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                {proj.company && <span>{proj.company}</span>}
                <span>
                  {formatDate(proj.startDate, present)} -{" "}
                  {proj.endDate
                    ? formatDate(proj.endDate, present)
                    : present}
                </span>
                {proj.detail?.role && (
                  <span>
                    {t(dict.role.ko, dict.role.en)}: {proj.detail.role}
                  </span>
                )}
                {proj.detail?.teamSize && (
                  <span>
                    {t(dict.teamSize.ko, dict.teamSize.en)}:{" "}
                    {proj.detail.teamSize}
                    {t("명", "")}
                  </span>
                )}
              </div>
              {proj.techUsed.length > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {proj.techUsed.join(" · ")}
                </p>
              )}
            </div>

            {/* Project content */}
            {proj.detail?.content ? (
              <article className="prose prose-sm prose-neutral max-w-none print-prose">
                <Markdown>{proj.detail.content}</Markdown>
              </article>
            ) : (
              proj.highlights.length > 0 && (
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )
            )}
          </section>
        ))}

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </div>
  );
}
