import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "./types";

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
