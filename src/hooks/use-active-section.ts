"use client";

import { useCallback, useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  const handleBottomEdge = useCallback(() => {
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 50;
    if (atBottom && sectionIds.length > 0) {
      // Find the last section that exists in the DOM
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        if (document.getElementById(sectionIds[i])) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    }
  }, [sectionIds]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    window.addEventListener("scroll", handleBottomEdge, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleBottomEdge);
    };
  }, [sectionIds, handleBottomEdge]);

  return activeSection;
}
