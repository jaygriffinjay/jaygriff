---json
{
  "title": "Three Pages With No Title Tag (And Why I'm Leaving Them That Way For Now)",
  "slug": "client-component-page-title-debt",
  "date": "2026-03-01T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.6"],
  "authorshipNote": "Claude Sonnet 4.6 via GitHub Copilot",
  "description": "I wired up page title metadata across the whole site — except for three pages that use 'use client'. I know the fix. I don't want to do it yet. Here's everything documented so I can come back to it.",
  "type": "doc",
  "tags": ["next.js", "metadata", "tech-debt", "client-components", "seo"],
  "projectId": "jaygriff",
  "relatedPosts": ["seo-optimization-plan"]
}
---

## What I Was Doing

This is a lot of infrastructure for what amounts to a browser tab title. But the point is that once it's set up it's fully automatic — any new server component page just exports one line and gets the right title, and dynamic routes like `/posts/[slug]` resolve titles from content metadata with no manual work. Three pages are still broken because I put `'use client'` at the top of the whole file instead of scoping it properly. That's the real story here.

I wired up full page title metadata across jaygriff.com so every page shows `Page Title | Jay Griffin` in the browser tab and search results.

The setup:

**`src/app/layout.tsx`** — title template:
```tsx
export const metadata = {
  title: {
    default: 'Jay Griffin',
    template: '%s | Jay Griffin',
  },
  // ...
};
```

**Server component pages** — just export metadata:
```tsx
export const metadata = { title: routeMetadata.title, description: routeMetadata.description };
```

**Dynamic routes** (`posts/[slug]`, `docs/[slug]`) — use `generateMetadata`:
```tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await loadContentBySlug(slug, 'post');
  if (!content) return {};
  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
}
```

This works fine for all the server component routes.

---

## The Problem: Three Client Pages Have No Titles

Three app routes are `'use client'` components:

- `/about-me` — `src/app/about-me/page.tsx` — uses `useState` for the FAQ accordion
- `/projects` — `src/app/projects/page.tsx` — gallery interaction
- `/my-stack` — `src/app/my-stack/page.tsx` — filter/tool card interaction

Next.js does not allow `export const metadata` (or `generateMetadata`) in `'use client'` components. It silently ignores it. These three pages currently show just `Jay Griffin` in the tab with no page-specific title.

---

## The Bandaid I Considered (And Didn't Do)

The quick fix is a **thin server wrapper**. Create a new server `page.tsx` that exports metadata and re-exports the default component from a renamed file.

Steps for each page:
1. Rename `page.tsx` → `AboutMePage.tsx` (preserving the `'use client'` directive and all logic)
2. Create a new `page.tsx` (server component):

```tsx
// src/app/about-me/page.tsx (NEW - server component)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Full-stack developer. React, Next.js, TypeScript.',
};

export { default } from './AboutMePage';
```

The routing stays identical. Next.js picks up the metadata from the server wrapper. The client component renders as normal.

**Why it would work:**
- No changes to component logic at all
- Routes, navigation, `getAllRoutes()`, sitemap — none of that breaks. The route discovery system only scans the filesystem for posts/docs slugs, it doesn't import from app route `page.tsx` files.
- `theme-editor/page.tsx` already uses this exact pattern (it imports `ThemeEditorPage` from a separate file) — so it's proven in the codebase

**Why I'm not doing it right now:**

I don't like this pattern. It creates a file just to be a pass-through. The real problem is that `'use client'` is at the top of the whole page file when it only needs to be on the interactive parts. Wrapping it papers over that design issue instead of fixing it.

The proper fix is to push `'use client'` down the component tree:

- `about-me`: The accordion open/close state is the only interactive thing. The `Accordion.Root` and the `useState` can live in a small `<FAQAccordion>` client component. The outer `page.tsx` becomes a server component.
- `projects`: Gallery interaction (hover states, click handlers) can be pushed into `ProjectGallery` itself, which is already its own component. Page can likely become server.
- `my-stack`: Filter state goes into a `<StackFilter>` client component. Page goes server.

This is the right move — but it's also a real refactor for each page, and I'd rather do it as part of the Tailwind + shadcn stack migration where I'm touching all these components anyway.

---

## What To Do When I Come Back To This

For each of the three pages, the plan is:

1. Identify the specific interactive state (accordion, hover, filter)
2. Extract that state + the interactive JSX into a new `ClientComponent.tsx` with `'use client'`
3. Convert `page.tsx` to a server component
4. Add `export const metadata` directly to `page.tsx`
5. No wrapper files needed

Or, if I want to be fast about it and just ship title tags now, the thin wrapper works and can be cleaned up later. But I'd rather wait.
