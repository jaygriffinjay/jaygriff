---json
{
  "title": "Content Layer: Current System Documentation",
  "slug": "content-layer-docs",
  "date": "2026-02-28T00:00:00Z",
  "author": ["Jay Griffin, Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via GitHub Copilot",
  "type": "doc",
  "projectId": "jaygriff",
  "feature": "Content System",
  "description": "Reference doc for the SQLite migration. Captures exactly how the current filesystem-based content system works, where the pain points are, and what each function actually does.",
  "tags": ["content-system", "sqlite", "architecture", "docs", "posts", "filesystem"],
  "relatedPosts": ["migrating-to-sqlite", "search-feature-spec"]
}
---


## Overview

The content layer lives in three files:

- `src/lib/posts.ts` — discovers and indexes all content by scanning the filesystem
- `src/lib/content-loader.ts` — loads individual content by slug
- `src/lib/routes.ts` — builds a flat route index for the Navigator search

Content lives in two directories:

- `content/tsx/` — React components with exported `metadata` objects
- `content/md/` — Markdown files with JSON frontmatter

---

## posts.ts

### What it does

Scans both content directories on every call and returns arrays of posts or docs with their metadata.

### The problem: duplicated filesystem scans

`getAllPosts()` and `getAllDocs()` are nearly identical — both scan `content/tsx/` and `content/md/`, import every file, parse metadata, deduplicate, and filter by type. The only difference is the final filter: posts check for `type === 'post'`, docs check for `type?.startsWith('doc')`.

This means any caller that needs both posts and docs triggers **two full filesystem scans**.

### Key functions

**`getAllPosts()`**
- Reads all `.tsx` files from `content/tsx/`, dynamically imports each one, extracts `module.metadata`
- Reads all `.md` files from `content/md/`, parses JSON frontmatter
- Deduplicates: TSX takes priority over MD for the same slug
- Filters to only return items where `type` is undefined or `'post'`

**`getAllDocs()`**
- Same scan as `getAllPosts()` — reads both directories, imports TSX, parses MD frontmatter
- Same deduplication logic
- Filters to only return items where `type` starts with `'doc'` (covers `doc`, `doc:commit`, etc.)

**`getPostBySlug(slug)`**
- Calls `getAllPosts()` (full scan) just to find one filename
- Returns the filename string or null

**`getDocBySlug(slug)`**
- Same as above but calls `getAllDocs()`

**`getAllAppRoutes()`**
- Recursively walks `src/app/` looking for `page.tsx` files
- Skips dynamic routes (directories containing `[`)
- Skips client components by checking if file starts with `'use client'`
- Imports each page and checks for a `routeMetadata` export
- Returns route entries for pages that have metadata

### The scan cost

Every call to `getAllPosts()` or `getAllDocs()` does:
1. `fs.readdirSync()` on both directories
2. `import()` on every TSX file (dynamic import, not cached between requests in dev)
3. `fs.readFileSync()` + frontmatter parse on every MD file

At 69 files this is acceptable. At 500+ files this becomes noticeably slow.

---

## content-loader.ts

### What it does

Loads a single piece of content by slug — returns either a TSX component or markdown string depending on what exists.

### Key types

```ts
export type ContentType = 'post' | 'doc';

export interface LoadedContent {
  type: 'tsx' | 'markdown';
  Component?: React.ComponentType;
  markdownContent?: string;
  metadata: PostMeta;
  filename: string;
}
```

The `type` field is a discriminated union — callers know whether to render a React component or a markdown string.

### Key functions

**`loadContentBySlug(slug, type)`**
- Calls `getAllPosts()` or `getAllDocs()` to find the matching item (full scan)
- Then checks if a TSX file exists at the expected path with `existsSync()`
- If TSX exists: dynamically imports it, returns the default export as `Component`
- If not: reads the MD file, parses frontmatter, returns `markdownContent`

Note: this does a full scan to find the filename, then separately checks if the file exists — redundant since the scan already confirmed it exists.

**`getAllPostSlugs()`** / **`getAllDocSlugs()`**
- Thin wrappers that call `getAllPosts()` / `getAllDocs()` and map to slug arrays
- Used by Next.js `generateStaticParams()` for static build-time pre-rendering

---

## routes.ts

### What it does

Builds a flat `RouteEntry[]` index used by the Navigator search feature. Combines sitemap entries with post/doc metadata to produce searchable route data.

### Key type

```ts
export interface RouteEntry {
  path: string;
  title: string;
  description?: string;
  keywords?: string[];
}
```

### The problem: three scans per call

`getAllRoutes()` calls:
1. `sitemap()` — generates the full sitemap (which itself may scan content)
2. `getAllPosts()` — full filesystem scan
3. `getAllDocs()` — full filesystem scan

All three happen on every call to `getAllRoutes()`.

### How it works

- Iterates sitemap entries, extracts the URL pathname
- For `/posts/:slug` routes: finds matching post metadata, uses title/description/tags as keywords
- For `/docs/:slug` routes: same but for docs
- For `/`: hardcoded Home entry
- Fallback for any other route: derives title from the last path segment

### What it produces

A flat array of `RouteEntry` objects — path, title, description, keywords. This is intentionally stripped down from the full `PostMeta` type. The Navigator only needs what it needs.

---

## The core architectural problem

Every data access goes through a full filesystem scan. There is no caching layer, no persistent index, no way to query a subset of content without loading everything.

This works fine at current scale. It breaks down as content grows because:

- Related posts require loading every post into memory and comparing manually
- Tag filtering requires loading everything and filtering in JS
- Chronological queries require loading everything and sorting
- Any feature that needs to "find posts where X" requires a full scan

The SQLite migration replaces these filesystem scans with actual queries. The three files above become thin wrappers around SQL — the shape of the API stays the same, the internals become fast and queryable.

---

## Data Model Problems

These are the design issues in the current `PostMeta` interface that should be fixed during the SQLite migration.

### 1. No runtime validation

TypeScript only enforces types at compile time. When frontmatter is parsed from a file:

```ts
const { metadata } = parseMarkdownWithJsonFrontmatter(fileContent);
return { filename, metadata };
```

You're casting the parsed object to `PostMeta` with zero runtime checks. The file could be missing required fields, have wrong types, or have typos in field names — TypeScript won't catch any of it. It all blows up at render time instead of at write time.

**Required fields that are routinely missing in practice:** `description` is typed as required `string` but the metadata scanner shows empty descriptions across many posts. Same risk with `date`. These should either be truly required (enforced at write time) or explicitly optional in the interface.

SQLite fixes this — `NOT NULL` constraints on `title`, `slug`, `date` mean bad data can't get in. You catch the problem when populating the DB, not when someone loads a page.

### 2. Inconsistent union types on `author` and `updated`

```ts
author?: string | string[]
updated?: string | string[]
```

Both fields are `string | string[]` — meaning every single consumer has to branch on `Array.isArray()` before using them. This pattern spreads defensive code everywhere and is easy to forget.

These should just always be arrays:

```ts
authors: string[]      // always an array, required, minimum 1
updatedDates: string[] // always an array, empty if never updated
```

A single author is just an array of length 1. A single update date is just an array of length 1. No branching needed anywhere downstream. This happened organically — single author came first, multi-author was bolted on later with `| string[]` to avoid a breaking change. The SQLite migration is the right time to normalize this.

### 3. `description` is required but treated as optional

The interface says:

```ts
description: string; // required, non-optional
```

But in practice many posts don't have one. This means TypeScript thinks it's always there, so any code doing `metadata.description.toLowerCase()` or passing it to a component won't complain at compile time but will throw at runtime for posts missing it.

Should be `description?: string` to match reality, or actually enforced as required at write time via SQLite schema.

### 4. `type` union is incomplete

```ts
type?: 'post' | 'doc' | 'doc:commit'
```

But `getAllDocs()` filters with `type?.startsWith('doc')` — implying there are or could be other `doc:*` variants beyond `doc:commit`. The type definition doesn't match the actual filtering logic. Either lock down the union to all known variants or widen it and document the convention.

### 5. `relatedPosts` is manual and unvalidated

```ts
relatedPosts?: string[] // Array of slugs for related posts
```

These are freehand slug strings in a file. No validation that the slugs actually exist. A typo or a renamed slug silently produces a broken related posts link with no error anywhere.

SQLite with a foreign key constraint fixes this — a `related_posts` junction table referencing `content.slug` will reject invalid slugs at insert time.

---

## What maps to what in SQLite

| Current | SQLite equivalent |
|---|---|
| `getAllPosts()` | `SELECT * FROM content WHERE type = 'post'` |
| `getAllDocs()` | `SELECT * FROM content WHERE type LIKE 'doc%'` |
| `getPostBySlug(slug)` | `SELECT filename FROM content WHERE slug = ?` |
| `loadContentBySlug(slug)` | `SELECT * FROM content WHERE slug = ? AND type = ?` |
| `getAllRoutes()` | `SELECT path, title, description, tags FROM content` |
| Related posts (not yet built) | `SELECT ... JOIN content_tags ... WHERE tag IN (...)` |
| Tag filtering (not yet built) | `SELECT * FROM content WHERE id IN (SELECT content_id FROM content_tags WHERE tag = ?)` |

The migration doesn't change the API surface. `getAllPosts()` still returns the same shape. The filesystem scan just becomes a query.
