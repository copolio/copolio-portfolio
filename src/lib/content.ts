import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Locale,
  TechCategory,
  TechItem,
  Experience,
  Project,
  ProjectDetail,
  AggregatedTechData,
} from "./types";

const contentDir = path.join(process.cwd(), "src", "content");

export function getContent<T>(
  section: string,
  locale: Locale
): { data: T; content: string } {
  const filePath = path.join(contentDir, locale, `${section}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data: data as T, content };
}

export function getItemsContent<T>(section: string, locale: Locale): T[] {
  const { data } = getContent<{ items: T[] }>(section, locale);
  return data.items;
}

export function aggregateTechData(
  manualCategories: TechCategory[],
  experiences: Experience[],
  projects: Project[],
  othersLabel: string
): AggregatedTechData {
  const techMap: Record<string, TechItem> = {};
  for (const cat of manualCategories) {
    for (const item of cat.items) {
      techMap[item.name] = item;
    }
  }

  const allTechNames = new Set<string>();
  for (const exp of experiences) {
    for (const tech of exp.techUsed) allTechNames.add(tech);
  }
  for (const proj of projects) {
    for (const tech of proj.techUsed) allTechNames.add(tech);
  }

  const uncategorized: TechItem[] = [];
  for (const name of allTechNames) {
    if (!(name in techMap)) {
      const item: TechItem = { name };
      uncategorized.push(item);
      techMap[name] = item;
    }
  }

  const categories = [...manualCategories];
  if (uncategorized.length > 0) {
    uncategorized.sort((a, b) => a.name.localeCompare(b.name));
    categories.push({ category: othersLabel, items: uncategorized });
  }

  return { categories, techMap };
}

export function getProjectDetail(
  slug: string,
  locale: Locale
): ProjectDetail | null {
  const dir = path.join(contentDir, locale, "projects");
  if (!fs.existsSync(dir)) return null;
  const match = fs
    .readdirSync(dir)
    .find((f) => f === `${slug}.mdx` || f.endsWith(`-${slug}.mdx`));
  if (!match) return null;
  const filePath = path.join(dir, match);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    role: data.role,
    teamSize: data.teamSize,
    content: content.trim(),
  };
}
