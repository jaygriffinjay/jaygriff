---json
{
  "title": "Why I'm Finally Moving to SQLite (And Why I Waited Until Now)",
  "slug": "migrating-to-sqlite",
  "date": "2026-02-10T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.5"],
  "authorshipNote": "🔧 AI-Assisted - Written after back and forth discussion about migration strategy and timing",
  "type": "post",
  "description": "After over 60 articles in one month, my file-based content system is breaking down. Here's why I'm migrating to SQLite, why now, and why I didn't do this sooner.",
  "tags": ["dev", "database", "content-system", "sqlite"]
}
---

## The Pain Points That Made This Inevitable

### 1. Code Block Escaping Hell

I have hundreds of code blocks across my articles. About 5% of them are broken at any given time because of ridiculous escaping issues.

When you write code inside TSX files, you're constantly fighting the JSX parser:

```tsx
// This is a nightmare to maintain:
<CodeBlock language="typescript">
{`const template = \`hello \${name}\`;
const Component = () => <div>{data}</div>;`}
</CodeBlock>
```

Every backtick needs escaping. Every brace could be interpreted as JSX. Template literals are double-escaped. It's fragile and annoying.

**The fix:** Factor code snippets out into separate files or database entries. Store them as plain text. Reference them by ID. Never deal with escaping again.

### 2. Querying is Painful

Want to show all articles tagged "react" from 2024? With my current setup, I have to:

1. Import every single post file
2. Parse the metadata exports
3. Filter in memory
4. Sort manually

This works fine for 10 posts. At 50+ and growing, it's slow and getting slower.

**What I actually want:**

```sql
SELECT * FROM articles 
WHERE tags LIKE '%react%' 
AND created_at >= '2024-01-01'
ORDER BY created_at DESC;
```

Fast. Simple. Scales to thousands of articles without breaking a sweat.

### 3. Related Articles Don't Exist

I want to show related articles at the bottom of each post—articles with similar tags, same series, or related topics.

Right now? Impossible without loading every single post into memory and doing manual comparisons.

**With a database:**

```sql
SELECT DISTINCT a2.* 
FROM articles a1
JOIN article_tags at1 ON a1.id = at1.article_id
JOIN article_tags at2 ON at1.tag = at2.tag
JOIN articles a2 ON at2.article_id = a2.id
WHERE a1.id = ? AND a2.id != ?
LIMIT 5;
```

Boom. Related articles in milliseconds.

### 4. Metadata is Scattered

Every article exports metadata in its own way. Some have `projectId`, some don't. Some have `topics`, some have `tags`. Some have `authoredBy`, some don't.

There's no schema enforcement. No validation. No consistency.

**With SQLite:** One schema. Required fields are required. Optional fields are nullable. TypeScript types generated from the schema. Can't ship inconsistent data.

### 5. Features I Can't Build

Here's what I want but can't easily do right now:

- **Tag cloud with counts** - "How many articles are tagged 'react'?"
- **Chronological timeline** - "Show me everything from January 2026"
- **Series/collections** - "Part 3 of 5 in this series"
- **Search** - "Find articles mentioning 'SQLite'"
- **RSS feed by category** - "Subscribe to just my AI content"
- **Sitemap generation** - Need to query all published articles
- **Draft vs published** - No way to mark articles as unpublished

All of these require structured, queryable data. Files don't cut it.

## Why SQLite Specifically?

I could use Postgres. I could use Supabase. I could use MongoDB.

But SQLite is perfect for this use case:

### It's Just a File

The entire database is one file I can commit to git. No separate server. No cloud service. No connection strings. Just:

```
my-blog/
├── content.db       <- the entire database
├── posts/
└── ...
```

Version controlled. Easy to back up. Portable.

### It's Fast Enough

SQLite handles millions of rows without issue. I'm generating maybe 60 articles a month. At that pace, I won't hit SQLite's limits for **decades**.

Even if I 10x my output, I'm still nowhere near the scale where I'd need Postgres.

### No Infrastructure Complexity

No Docker containers. No cloud database. No authentication setup. No connection pooling. No schema migrations across environments.

Just: `npm install better-sqlite3` and I'm done.

### Git-Friendly Workflow

The `.db` file commits just like any other file. I can see the database evolve over time in my git history. I can roll back if I mess something up.

### When Would I Need Postgres?

Only if I need:

- Multiple servers writing simultaneously (I'm the only writer)
- High write concurrency (I write articles, not processing millions of transactions)
- Separate database server across regions (it's a mostly static site)
- Advanced features like PostGIS or row-level security (nope)

None of those apply. SQLite is **more than enough** for a personal blog, even at scale.

## The Architecture I'm Building

Here's what I'm migrating toward:

### Database Schema

```sql
CREATE TABLE articles (
  id TEXT PRIMARY KEY,              -- NanoID for unique, compact IDs
  slug TEXT UNIQUE NOT NULL,        -- URL-friendly identifier
  title TEXT NOT NULL,
  description TEXT,
  component_path TEXT NOT NULL,     -- Path to the TSX file
  created_at TEXT NOT NULL,
  updated_at TEXT,
  published BOOLEAN DEFAULT 0,
  project_id TEXT,
  content_type TEXT                 -- 'post' | 'doc' | 'dev'
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE article_tags (
  article_id TEXT,
  tag_id INTEGER,
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id),
  PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE code_snippets (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL,
  title TEXT,
  file_path TEXT,                   -- Path to the actual code file
  description TEXT
);

CREATE TABLE article_snippets (
  article_id TEXT,
  snippet_id TEXT,
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (snippet_id) REFERENCES code_snippets(id),
  PRIMARY KEY (article_id, snippet_id)
);
```

### What Goes Where

**In the database:**
- Article metadata (title, slug, dates, tags)
- Relationships (tags, series, related articles)
- References to files (component paths, image paths)
- Code snippet metadata

**In files:**
- TSX components (the actual interactive content)
- Code snippets as plain `.ts`, `.py`, `.rust` files
- Images and assets
- Anything executable

**The rule:** Data goes in the database. Code stays as files.

### The Component Pattern

Posts stay as TSX files, but lose their metadata exports:

```tsx
// posts/my-article.tsx
export default function MyArticle() {
  return (
    <article>
      <p>My content here...</p>
      <CodeBlock snippetId="example-1" />
    </article>
  );
}
```

The database knows about this file:

```sql
INSERT INTO articles (id, slug, title, component_path, ...)
VALUES ('V1StGXR8_Z5jdHi', 'my-article', 'My Article', 'posts/my-article.tsx', ...);
```

Then my router queries the DB and dynamically imports the component:

```tsx
// app/posts/[slug]/page.tsx
export default async function PostPage({ params }) {
  const article = await db.get(
    'SELECT * FROM articles WHERE slug = ?',
    params.slug
  );
  
  const Component = await import(`@/posts/${article.component_path}`);
  
  return <Component.default />;
}
```

Clean separation. Database for queries. Files for code.

## Why I Didn't Do This at Article #5

Remember [The Metadata Paradox](/posts/metadata-paradox)? I wrote about not automating too early. This is that principle in action.

**At 5 articles:**
- Querying by hand was fine
- No performance issues
- Didn't know what features I'd need
- Would've been premature optimization

**At 50 articles:**
- My current "queries" are annoying
- Feature requests are piling up (related articles, full text search, RSS)
- Code block escaping is a constant pain
- Growth trajectory is clear

**I waited for the pain. The pain arrived. Now I factor.**

This is the right time because:

1. I know what I need (not guessing)
2. The benefits are clear and immediate
3. The migration effort is justified by real problems
4. I won't be fighting imaginary future requirements

## The Migration Plan

### Phase 1: Schema + Migration Script

1. Design the database schema
2. Write a script to parse existing posts and populate the DB
3. Keep TSX files as source of truth initially
4. Test queries work as expected

### Phase 2: Hybrid Mode

1. Update routing to read from database
2. Keep manually editing TSX files
3. Run sync script after changes
4. Validate everything still works

### Phase 3: Database-First

1. Database becomes source of truth
2. Build simple admin tools (or just SQL scripts)
3. TSX files are referenced, not parsed
4. Code snippets fully factored out

## What I'm Gaining

**Immediate wins:**
- No more code block escaping hell
- Fast queries for chronological, tag-based, related content
- RSS feeds and sitemaps trivial to generate
- Full-text search becomes possible
- Draft vs published status
- Consistent metadata schema

**Long-term benefits:**
- Can scale to thousands of articles
- Database migrations track schema evolution
- Can add features without touching every file
- Better developer experience overall

**What I'm NOT losing:**
- TSX components still work exactly the same
- Full creative freedom for interactive content
- Git-based workflow
- Type safety and tooling

## The Bottom Line

I'm moving because I have **50+ articles**, **hundreds of code blocks**, and **clear feature requirements** that my current file-based system can't handle efficiently.

The pain is real. The solution is obvious. Time to ship it.

And when I hit 10,000 articles and actually need Postgres? I'll migrate then. But that's a problem for future me, and future me will have way more information about what's actually needed.

For now: SQLite, NanoIDs, and getting back to building features instead of fighting my content system.