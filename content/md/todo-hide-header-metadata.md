---json
{
  "title": "TODO: Add hideHeader metadata field",
  "slug": "todo-hide-header-metadata",
  "date": "2026-01-23T00:00:00Z",
  "author": ["Jay Griffin"],
  "type": "doc",
  "description": "Add optional metadata field to hide ContentHeader component for non-standard pages like about-me",
  "tags": ["todo", "metadata", "ui", "content-system"]
}
---

# TODO: Add hideHeader metadata field

## Problem
Some pages (like about-me) don't need the ContentHeader component because they're not standard content pages. Currently there's no way to remove it without creating custom routes.

## Solution
Add `hideHeader?: boolean` to PostMeta interface and check it in the page rendering logic.

## Implementation Steps

1. **Update PostMeta type** (`src/types/post.ts`)
   ```typescript
   export interface PostMeta {
     // ... existing fields
     hideHeader?: boolean; // NEW
   }
   ```

2. **Update page rendering** (wherever ContentHeader is rendered)
   - Check `metadata.hideHeader` before rendering ContentHeader
   - If true, skip ContentHeader and render content directly

3. **Use it in about-me.tsx**
   ```typescript
   export const metadata: PostMeta = {
     title: 'About Me',
     slug: 'about-me',
     hideHeader: true, // <-- Add this
     // ... other fields
   }
   ```

## Files to modify
- `src/types/post.ts` - Add field to interface
- `src/app/docs/[slug]/page.tsx` (or wherever ContentHeader renders) - Add conditional rendering
- `content/tsx/about-me.tsx` - Add `hideHeader: true` to metadata

## Related
- Could extend this pattern for other optional components (breadcrumbs, child listings, etc)
- Might want `hideTitle`, `hideDate`, etc as more granular controls later
- Consider whether this should be type-based (e.g., `type: 'page'` auto-hides header) vs explicit flag
