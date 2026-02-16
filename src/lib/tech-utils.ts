import type { TechItem } from "./types";

export const levelColors: Record<string, string> = {
  expert: "bg-primary text-primary-foreground",
  advanced: "bg-primary/80 text-primary-foreground",
  intermediate: "bg-secondary text-secondary-foreground",
  beginner: "bg-muted text-muted-foreground",
};

export type TechMap = Map<string, TechItem>;
