---
name: sync-notion
description: Fetch a public Notion page and sync its content into the portfolio MDX files.
argument-hint: <notion-url>
---

# Sync Notion to MDX

Fetch content from a public Notion page and update the portfolio MDX content files accordingly.

## Steps

1. **Extract page ID** from `$ARGUMENTS` (the 32-char hex after the last `/` or `-`).

2. **Fetch content** via the Splitbee API and parse block types:
   ```bash
   curl -s "https://notion-api.splitbee.io/v1/page/<page-id>" | python3 -c "
   import json, sys
   data = json.load(sys.stdin)
   def extract_text(props):
       if not props: return ''
       return ''.join(str(item[0]) for item in props if isinstance(item, list) and len(item) > 0)
   for block_id, block_data in data.items():
       val = block_data.get('value', {})
       btype = val.get('type', '')
       props = val.get('properties', {})
       title_text = extract_text(props.get('title', []))
       if title_text.strip():
           prefix = {'header':'# ','sub_header':'## ','sub_sub_header':'### ','bulleted_list':'- ','numbered_list':'1. ','quote':'> ','toggle':'[toggle] '}.get(btype, '')
           print(f'{prefix}{title_text.strip()}')
   "
   ```

3. **Read existing MDX files** to understand the current YAML frontmatter schema, then **map Notion content** into:
   - `src/content/ko/*.mdx` — Korean content
   - `src/content/en/*.mdx` — English translation (natural, not literal)
   - `src/content/{ko,en}/projects/<slug>.mdx` — project detail files (frontmatter: role, teamSize + markdown body)

4. **Delete stale project detail files** whose slugs no longer exist in the updated `projects.mdx`.

5. **Run `npm run build`** to verify all pages generate correctly.

## Rules

- Preserve the existing YAML frontmatter schema — don't add or rename fields
- Slugs must be identical across ko/en locales
- Keep `src/lib/types.ts` in sync if structural changes are needed
