"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/hooks/use-lang";
import { dict } from "@/lib/dictionary";
import { Award, ExternalLink } from "lucide-react";
import type { Certification } from "@/lib/types";

interface Props {
  ko: Certification[];
  en: Certification[];
}

export function CertificationsSection({ ko, en }: Props) {
  const { t } = useLang();
  const items = t(ko, en);

  return (
    <SectionWrapper id="certifications">
      <h2 className="text-2xl font-bold mb-8">
        {t(dict.certifications.ko, dict.certifications.en)}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((cert, i) => (
          <Card key={i}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm">{cert.name}</h3>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {cert.date}
                    </Badge>
                    {cert.credentialId && (
                      <span className="text-xs text-muted-foreground">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
