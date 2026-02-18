"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import type { Profile } from "@/lib/types";

interface ProfileWithSummary extends Profile {
  summary: string;
}

interface Props {
  ko: ProfileWithSummary;
  en: ProfileWithSummary;
}

export function ProfileSection({ ko, en }: Props) {
  const { t } = useLang();
  const data = t(ko, en);

  return (
    <SectionWrapper id="profile" className="pt-24">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Avatar className="h-32 w-32 border-2 border-border">
          <AvatarImage src={data.photo} alt={data.name} />
          <AvatarFallback className="text-2xl">
            {data.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-lg text-muted-foreground mt-1">{data.title}</p>
          {data.tagline && (
            <p className="text-sm text-muted-foreground/80 mt-0.5">
              {data.tagline}
            </p>
          )}

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {data.location}
            </div>
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              {data.email}
            </a>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            {data.github && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-1.5" />
                  GitHub
                </a>
              </Button>
            )}
            {data.linkedin && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4 mr-1.5" />
                  LinkedIn
                </a>
              </Button>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            {data.summary}
          </p>

          {/* Bio timeline */}
          {data.bio && data.bio.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">
                {t(dict.bio.ko, dict.bio.en)}
              </h2>
              <dl className="space-y-1.5">
                {data.bio.map((entry, i) => (
                  <div key={i} className="flex gap-4 text-sm">
                    <dt className="font-semibold shrink-0 w-12 text-right">
                      {entry.year}
                    </dt>
                    <dd className="text-muted-foreground">{entry.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
