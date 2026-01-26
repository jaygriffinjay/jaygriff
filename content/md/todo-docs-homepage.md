---json
{
  "title": "TODO: Decide on /docs routing strategy",
  "slug": "todo-docs-homepage",
  "date": "2026-01-23T00:00:00Z",
  "author": ["Jay Griffin"],
  "type": "doc",
  "description": "Figure out whether to create dedicated /docs page or surface all docs on homepage via Navigator",
  "tags": ["todo", "routing", "navigation", "ux"]
}
---

# TODO: Decide on /docs routing strategy

## Problem
README links to `/docs` but it's currently a 404. Need to decide on approach.

## Options

### Option 1: Create dedicated /docs homepage
- New route at `src/app/docs/page.tsx`
- Shows all docs with filtering/sorting
- Separate from main homepage
- README link works immediately

**Pros:**
- Clear separation (posts vs docs)
- Dedicated space for documentation
- README accuracy restored

**Cons:**
- Another page to maintain
- Splitting content across multiple views
- Might duplicate Navigator functionality

### Option 2: Merge into Navigator on homepage
- Surface all docs on main homepage
- Use Navigator filtering/tags
- Change README link to just `/` or `/posts` or create redirect

**Pros:**
- Single unified view of all content
- Navigator already has filtering
- Less duplicate UI

**Cons:**
- Homepage might get crowded
- Docs mixed with posts/commits
- Need better filtering UX

### Option 3: /docs redirects to filtered homepage view
- `/docs` redirects to `/?type=doc` or similar
- URL-based filtering on homepage
- Navigator respects query params

**Pros:**
- Best of both - clean URL, unified UI
- No duplicate pages
- Extensible to other filters

**Cons:**
- Need to implement query param filtering
- More complex routing logic

## Decision needed
- Which approach fits the "single powerful homepage" vision?
- Is Navigator search/filter good enough yet?
- Should content types have dedicated pages or unified view?

## Related
- Search/filtering improvements (roadmap)
- Navigator UX enhancements
- Homepage design philosophy
