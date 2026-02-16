import type { ReactNode } from "react";

interface TimelineProps {
  children: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return <div className="relative space-y-8 ml-4 md:ml-0">{children}</div>;
}
