# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Static export build (output: "export")
npm run lint         # ESLint (flat config, ESLint 9)
```

## Architecture

Bilingual (Ko/En) static portfolio site built with Next.js 16 App Router, Tailwind CSS v4, and shadcn/ui.

### Server-Client Split Pattern

Every route follows the same pattern:
- `page.tsx` (server component) — loads content for **both locales** via `getContent()`/`getItemsContent()` from MDX files, passes as separate props
- `page-client.tsx` (client component, `"use client"`) — receives both `dataKo` and `dataEn` props, uses `useLang()` hook's `t(ko, en)` to select based on current locale

```typescript
// Server: load both locales
const profileKo = getContent<Profile>("profile", "ko");
const profileEn = getContent<Profile>("profile", "en");

// Client: select by locale
const { t } = useLang();
const profile = t(profileKo, profileEn);
```

### Content System

MDX files with YAML frontmatter (parsed by `gray-matter`) in `src/content/{ko,en}/`:
- `profile.mdx`, `techstack.mdx`, `experience.mdx`, `projects.mdx`, `education.mdx`, `certifications.mdx`
- `projects/{slug}.mdx` — individual project detail pages (rich markdown body)

Slugs must be identical across locales. Content loader functions are in `src/lib/content.ts`.

### i18n

Custom lightweight context system — no i18n library:
- `LangProvider` context + `useLang()` hook expose `locale`, `setLocale()`, `t()`
- `src/lib/dictionary.ts` — central UI string translations as `{ ko, en }` pairs
- All data loaded server-side for both locales; client selects at render time

### Routing

```
/                      → Single-page resume (all sections)
/experience/[slug]     → Company detail + linked projects
/projects/[slug]       → Project detail with MDX body (career description)
/resume/print          → Print-optimized resume (PDF export)
/career/print          → Print-optimized career description (PDF export)
```

Dynamic routes use `generateStaticParams()` for static export compatibility.

### Key Patterns

- **Tech aggregation**: `aggregateTechData()` in `content.ts` merges manual tech categories with auto-extracted tech from experiences/projects
- **Cross-section interaction**: `activeTech` state in home page filters/highlights matching items across Experience and Projects sections
- **Print pages**: Force all light-theme CSS variables inside `.print-page` (in `globals.css`) to ensure correct rendering regardless of dark mode
- **Tailwind v4**: Uses `@plugin` directive for JS plugins (e.g., `@plugin "@tailwindcss/typography"`), not `@import`
- **shadcn/ui**: New York style, components in `src/components/ui/`, configured via `components.json`
- **Path alias**: `@/*` maps to `src/*`

### Types

All shared types in `src/lib/types.ts`: `Profile`, `TechCategory`, `TechItem`, `Experience`, `Project`, `ProjectDetail`, `Education`, `Certification`.
