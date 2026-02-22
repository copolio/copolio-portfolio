"use client";

import { track } from "@vercel/analytics";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import { Header } from "@/components/layout/header";
import type {
  Profile,
  TechCategory,
  Experience,
  Project,
  Education,
  Certification,
} from "@/lib/types";
import { Mail, Github, Linkedin, MapPin, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileWithSummary extends Profile {
  summary: string;
}

interface Props {
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

function formatDate(date: string, present: string): string {
  if (!date) return present;
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}

export function ResumePrintClient({
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
}: Props) {
  const { t } = useLang();
  const profile = t(profileKo, profileEn);
  const tech = t(techKo, techEn);
  const experiences = t(expKo, expEn);
  const projects = t(projKo, projEn);
  const educations = t(eduKo, eduEn);
  const certifications = t(certKo, certEn);
  const present = t(dict.present.ko, dict.present.en);

  return (
    <>
      <Header />
      <div className="print-page-bg relative">
        <div className="print-page">
        {/* Header / Profile */}
        <header className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-base text-muted-foreground mt-0.5">
            {profile.title}
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
                {profile.linkedin.replace("https://www.linkedin.com/in/", "")}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </div>
          <p className="mt-3 text-sm">{profile.summary}</p>
        </header>

        {/* Tech Stack */}
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 border-b pb-1">
            {t(dict.techStack.ko, dict.techStack.en)}
          </h2>
          <div className="space-y-1">
            {tech.map((cat) => (
              <div key={cat.category} className="text-sm">
                <span className="font-medium">{cat.category}: </span>
                <span className="text-muted-foreground">
                  {cat.items.map((item) => item.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 border-b pb-1">
            {t(dict.experience.ko, dict.experience.en)}
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.slug} className="break-inside-avoid-page">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-semibold">{exp.company}</span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      {exp.role}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
                    {formatDate(exp.startDate, present)} -{" "}
                    {exp.endDate ? formatDate(exp.endDate, present) : present}
                  </span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="mt-1 text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
                {exp.techUsed.length > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {exp.techUsed.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 border-b pb-1">
            {t(dict.projects.ko, dict.projects.en)}
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.slug} className="break-inside-avoid-page">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-semibold">{proj.title}</span>
                    {proj.company && (
                      <span className="text-muted-foreground ml-2 text-xs">
                        @ {proj.company}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
                    {formatDate(proj.startDate, present)} -{" "}
                    {proj.endDate
                      ? formatDate(proj.endDate, present)
                      : present}
                  </span>
                </div>
                {proj.highlights.length > 0 && (
                  <ul className="mt-1 text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
                {proj.techUsed.length > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {proj.techUsed.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-5">
          <h2 className="text-base font-bold mb-2 border-b pb-1">
            {t(dict.education.ko, dict.education.en)}
          </h2>
          <div className="space-y-2">
            {educations.map((edu, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4">
                <div>
                  <span className="font-semibold">{edu.institution}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {edu.degree} {edu.field}
                  </span>
                  {edu.gpa && (
                    <span className="text-xs text-muted-foreground ml-2">
                      GPA {edu.gpa}
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
                  {formatDate(edu.startDate, present)} -{" "}
                  {edu.endDate ? formatDate(edu.endDate, present) : present}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-base font-bold mb-2 border-b pb-1">
              {t(dict.certifications.ko, dict.certifications.en)}
            </h2>
            <div className="space-y-1">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-4"
                >
                  <div>
                    <span className="font-semibold text-sm">{cert.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {cert.issuer}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground shrink-0">
                    {formatDate(cert.date, present)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.name}
        </footer>
        </div>
        <Button
          variant="default"
          size="icon"
          onClick={() => {
            track("pdf_print", { type: "resume" });
            window.print();
          }}
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg print:hidden"
        >
          <Printer className="h-5 w-5" />
          <span className="sr-only">{t("PDF 저장", "Save PDF")}</span>
        </Button>
      </div>
    </>
  );
}
