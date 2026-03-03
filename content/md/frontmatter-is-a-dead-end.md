---json
{
  "title": "Frontmatter Is a Dead End (And Everything I Changed to Prove It)",
  "slug": "frontmatter-is-a-dead-end",
  "date": "2026-03-02T22:00:00Z",
  "author": ["Jay Griffin", "Claude Opus 4.6"],
  "authorshipNote": "Claude Opus 4.6 via GitHub Copilot",
  "type": "post",
  "description": "A marathon Copilot session that touched 70+ files, added relatedPosts everywhere — and the realization that this whole content system sorely needs a database.",
  "tags": ["dev", "content-system", "sqlite", "prism", "p5js", "workflow", "retrospective"],
  "relatedPosts": ["migrating-to-sqlite", "vibecoding-plasma-cosmos-evolution", "codeblock-showcase", "md-vs-tsx"]
}
---

### `relatedPosts` Across Every Single Content File

I added `relatedPosts` metadata to every content file in the project — all 36+ markdown files and all 32+ TSX files. Each one mapped by topic, tags, and content relationships.

Then I tested it and nothing showed up on docs pages. Turns out `RelatedPosts` was only wired up in the `/posts/[slug]` route. The `/docs/[slug]` and `/docs/commits/[slug]` routes had no idea the component existed. Fixed all three routes, and while I was at it, made all of them look up both posts *and* docs so cross-type related links actually resolve.

## What This Session Taught Me

### Frontmatter Is Horrible

I have 70+ content files. Each one has a JSON frontmatter block that I have to hand-edit. There's no validation, no autocomplete, no referential integrity. When I added `relatedPosts` to every file, I was using slugs blindly and hoping they matched. A typo in a slug just silently fails — no related post shows up and nothing tells me why.

The `---json` block format means my metadata lives in a weird no man's land: it's not a database, it's not TypeScript (so no type checking), and it's not even standard YAML frontmatter that tools expect. It's a string blob that gets parsed at build time. I just like JSON so it's what I use.

### My docs/posts/commits Taxonomy Is Garbage

I have three content types (`post`, `doc`, `doc:commit`) served by three different route handlers that are almost identical but slightly different in annoying ways. The fact that I had to fix three separate `page.tsx` files to add RelatedPosts support is exactly the kind of duplication that shouldn't exist. The routing is doing too much work that should live in the data layer.

### I Need SQLite

Every pain point from this session traces back to the same root cause: metadata is scattered across 70+ files with no centralized query layer. I want to:

- Query related posts by ID
- Find all posts with a given tag without importing every file
- Validate that `relatedPosts` references are bidirectional
- Update metadata fields in bulk without sed scripts and subagents
- Have a single source of truth that my routes read from

This isn't a hypothetical anymore. I've been [writing about migrating to SQLite](/posts/migrating-to-sqlite) for too long. This session was the final push — the content system works, but it works *despite* itself, not *because* of its design.
