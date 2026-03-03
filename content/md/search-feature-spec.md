---json
{
  "title": "Feature Spec: Full-Text Hybrid Search with SQLite FTS5",
  "slug": "search-feature-spec",
  "date": "2026-03-02T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Summarized from a Claude.ai conversation",
  "type": "doc",
  "description": "Replacing Fuse.js title-only search with server-side full-text search using SQLite FTS5 — paragraph-level results with highlighted snippet previews linking directly to headings.",
  "tags": ["search", "sqlite", "fts5", "spec", "architecture"],
  "projectId": "jaygriff",
  "relatedPosts": ["migrating-to-sqlite", "content-layer-docs", "llm-seo-roadmap"]
}
---

## Overview

Replace the current Fuse.js title-only search with a server-side full-text search powered by SQLite FTS5. Search results will return at the paragraph/section level with highlighted snippet previews, linking directly to the relevant heading within an article.

---

## Why

- Current search only covers article titles via Fuse.js — misses content inside articles
- SQLite FTS5 is already a natural extension of the ongoing frontmatter migration
- FTS5's built-in `snippet()` function returns highlighted match fragments out of the box
- Server-side search means no large JSON blob shipped to the client
- One source of truth: frontmatter metadata + chunked content all in SQLite

---

## Approach

### 1. Content Chunking (build time)

- Parse all `.md` and `.tsx` files in `src/content/`
- Split content at heading boundaries (h2, h3)
- Slugify each heading to generate anchor IDs (pairs with `rehype-slug`)
- Each chunk stores: `article_slug`, `heading_id`, `heading_text`, `body_text`
- Insert chunks into SQLite alongside frontmatter

### 2. SQLite FTS5 Table

```sql
CREATE VIRTUAL TABLE search_fts USING fts5(
  heading_text,
  body_text,
  content='chunks',
  content_rowid='id'
);
```

### 3. Search API Route

- Next.js API route: `/api/search?q=...`
- Queries FTS5, returns ranked chunk results
- Uses `snippet()` to return highlighted text fragments

```sql
SELECT
  slug,
  heading_id,
  heading_text,
  snippet(search_fts, 1, '<mark>', '</mark>', '...', 20) as excerpt
FROM search_fts
JOIN chunks ON chunks.id = search_fts.rowid
WHERE search_fts MATCH ?
ORDER BY rank
```

### 4. Search UI

- Replace Fuse.js with a `fetch` call to `/api/search`
- Display results as cards: article title + heading + highlighted excerpt
- Each result links to `/blog/[slug]#[heading-id]`
- Wrap `<mark>` in a Tailwind highlight class for styled matches

---

## Prerequisites

- Finish frontmatter migration to SQLite
- Confirm `rehype-slug` (or equivalent) is generating heading IDs on render

## Implementation Steps

- Write build-time chunking script for `.md` files
- Handle `.tsx` content files (text extraction is trickier than plain markdown)
- Create `chunks` table and FTS5 virtual table in SQLite schema
- Populate chunks at build time / on content change
- Build `/api/search` route
- Update search UI component to use new API
- Add heading deep-link anchors to article pages (byproduct of chunking)
- Remove Fuse.js dependency

---

## Notes

- TSX content files will need special handling — JSX isn't directly parseable for text extraction. May need to render to string first or maintain a plain-text/markdown source alongside.
- For future enhancement: layer in vector embeddings for semantic search (catches conceptual matches that keyword search misses). Client-side approximate search works fine up to a few hundred articles.
