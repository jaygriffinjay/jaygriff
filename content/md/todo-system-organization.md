---json
{
  "title": "Todo System Organization & Status Tracking",
  "slug": "todo-system-organization",
  "date": "2026-01-23T13:00:00Z",
  "author": "Jay Griffin",
  "type": "doc",
  "tags": ["todo", "meta", "organization", "workflow", "feature-spec"]
}
---

## Problem

Currently using todos-as-content-pages pattern (which is great!), but organization and tracking is inconsistent:

**Current state:**
- Some todos have "todo" in the title, some don't
- All use `tags: ['todo']` for identification
- No way to mark todos as done/completed
- No linking between todos → work done → commits → resolution
- Can't easily see "all open todos" vs "completed todos"

**What works well:**
- ✅ Rich documentation format (way better than GitHub Issues)
- ✅ AI-accessible (can query, generate, edit todos with AI)
- ✅ Version controlled (git history shows evolution)
- ✅ Searchable and linkable

**What needs improvement:**
- ❌ Inconsistent naming (some say "todo", some don't)
- ❌ No status tracking (can't tell what's done)
- ❌ No traceability (which commit addressed which todo?)
- ❌ No overview page (list of all todos by status)

## Desired Patterns

### 1. Title Convention: NO "Todo" Prefix

**Bad (redundant):**
```
title: "Todo: Docs Homepage"
title: "Todo: Hide Header Metadata"
```

**Good (descriptive):**
```
title: "Docs Homepage Routing Decision"
title: "Hide Header Metadata Field"
title: "Metadata Editor Implementation"
```

**Rationale:**
- The `tags: ['todo']` already marks it as a todo
- UI can show badges/context (🔲 Open, ✅ Done)
- Titles should be slug-based or explanatory
- Reduces noise when todos convert to documentation

### 2. Status Tracking Field

Add `status` field to PostMeta for todos:

```typescript
// In src/types/post.ts
export interface PostMeta {
  // ... existing fields
  status?: 'open' | 'in-progress' | 'done' | 'blocked' | 'wont-do';
}
```

**Usage in frontmatter:**
```json
{
  "title": "Metadata Editor Implementation",
  "slug": "metadata-editor",
  "type": "doc",
  "tags": ["todo", "feature", "metadata"],
  "status": "open"
}
```

**Status meanings:**
- `open` - Not started, needs work
- `in-progress` - Currently being worked on
- `done` - Completed, maybe keep for documentation
- `blocked` - Can't proceed (waiting on something)
- `wont-do` - Decided not to implement

### 3. Linking Todos to Work

**GitHub Issue style:** Issue → Commit → Resolution

**Our equivalent:**
```json
{
  "title": "Hide Header Metadata Field",
  "slug": "hide-header-metadata",
  "type": "doc",
  "tags": ["todo", "metadata", "components"],
  "status": "done",
  "resolvedBy": "commit-2026-01-25-metadata-controls",
  "relatedCommits": ["commit-2026-01-25-metadata-controls"]
}
```

Or simpler, just link in the content:
```markdown
## Resolution

Implemented in [Metadata Controls Commit](/docs/commits/metadata-controls-commit).

Changes:
- Added `hideHeader?: boolean` to PostMeta
- Updated page rendering logic
- Applied to about-me.tsx
```

### 4. Todo Overview Page

Create `/todos` page (or filtered view on homepage) showing:

**Open Todos:**
- 🔲 Metadata Editor Implementation
- 🔲 Search/Filter/Sort Improvements
- 🔲 Docs Homepage Routing Decision

**In Progress:**
- 🔄 Private Content System

**Completed:**
- ✅ Hide Header Metadata Field
- ✅ Update Authorship Metadata

**Blocked:**
- 🚧 Feature X (waiting on library update)

## Implementation: MVP

### Step 1: Add Status Field to Type

Update `src/types/post.ts`:
```typescript
export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  author?: string | string[];
  authorshipNote?: string;
  description?: string;
  type: 'post' | 'doc' | 'doc:commit';
  tags?: string[];
  status?: 'open' | 'in-progress' | 'done' | 'blocked' | 'wont-do'; // NEW
  // ... other fields
}
```

### Step 2: Update Existing Todos

Add `status: 'open'` to all current todos:
- `todo-docs-homepage.md` → `status: 'open'`
- `todo-hide-header-metadata.md` → `status: 'open'`
- `todo-update-authorship-metadata.md` → `status: 'open'`

### Step 3: Visual Indicators in Navigator

Update Navigator to show status badges:
```typescript
// In Navigator component
const statusIcons = {
  open: '🔲',
  'in-progress': '🔄',
  done: '✅',
  blocked: '🚧',
  'wont-do': '❌',
};

{posts.map(post => (
  <div key={post.slug}>
    {post.tags?.includes('todo') && post.status && (
      <span>{statusIcons[post.status]} </span>
    )}
    <Link href={post.route}>{post.title}</Link>
  </div>
))}
```

### Step 4: Filter Todos by Status

Add filtering to Navigator or create dedicated `/todos` view:
```typescript
const todos = posts.filter(p => p.tags?.includes('todo'));
const openTodos = todos.filter(t => t.status === 'open');
const inProgressTodos = todos.filter(t => t.status === 'in-progress');
const doneTodos = todos.filter(t => t.status === 'done');
```

## Implementation: Future Enhancements

### Auto-link Todos to Commits

When creating a commit summary doc, check for related todos and auto-update their status:

```typescript
// In commit doc frontmatter
{
  "title": "Metadata Controls Implementation",
  "type": "doc:commit",
  "resolves": ["hide-header-metadata"], // Slug of todo(s) resolved
}
```

Script to auto-update todos:
```bash
# Find commit docs with "resolves" field
# Update corresponding todo status to "done"
# Add "resolvedBy" link to todo
```

### Todo Board View

Create Kanban-style board at `/todos/board`:

```
| Open          | In Progress       | Done              |
|---------------|-------------------|-------------------|
| Metadata Edit | Private Content   | Hide Header       |
| Search/Filter |                   | Authorship Update |
| Docs Homepage |                   |                   |
```

Drag-and-drop to change status (updates frontmatter).

### Priority Field

Add `priority` to PostMeta:
```typescript
priority?: 'low' | 'medium' | 'high' | 'critical';
```

Sort todos by priority in overview.

### Due Dates

Add `dueDate` field:
```typescript
dueDate?: string; // ISO 8601 format
```

Show overdue todos in red, upcoming in yellow.

### Todo Templates

Create templates for common todo types:

**Feature Spec Template:**
```markdown
## Problem
[What needs to be solved]

## Proposed Solution
[How to solve it]

## Implementation Steps
1. Step one
2. Step two

## Files to Modify
- `src/file1.ts`
- `src/file2.ts`

## Related
- [Related Todo](#)
- [Related Commit](#)
```

**Bug Fix Template:**
```markdown
## Bug Description
[What's broken]

## Expected Behavior
[What should happen]

## Actual Behavior
[What currently happens]

## Steps to Reproduce
1. Step one
2. Step two

## Proposed Fix
[How to fix it]
```

### Archive Completed Todos

Option 1: Move to `content/archive/todos/`
Option 2: Keep in place but filter by status
Option 3: Add `archived: true` field

Preference: **Option 2** (keep everything, filter by status). Completed todos serve as documentation.

## Integration with Metadata Editor

When the metadata editor exists, bulk operations on todos become trivial:

**Bulk status update:**
- Query: "Show all todos with status='open' and tags include 'metadata'"
- Action: Set status='done' for all results

**Bulk cleanup:**
- Query: "Show all todos with 'Todo:' in title"
- Action: Remove 'Todo: ' prefix from all titles

**Consistency check:**
- Query: "Show all posts with tag='todo' but no status field"
- Action: Add status='open' to all results

## Current Naming Cleanup Needed

**These todos need title updates:**
- ❌ `todo-docs-homepage.md` → keep title as is (already descriptive)
- ❌ `todo-hide-header-metadata.md` → keep title as is
- ❌ `todo-update-authorship-metadata.md` → keep title as is

Actually, reviewing existing todos - the titles are already good! They don't have "Todo:" prefix, they're descriptive. The filenames have "todo-" prefix for clarity, which is fine.

**Pattern to maintain:**
- ✅ Filename: `todo-descriptive-name.md` (clear what it is)
- ✅ Title: "Descriptive Explanation" (no "todo" needed)
- ✅ Tags: `['todo']` (for filtering)
- ✅ Status: `'open'` (for tracking)

## Examples of Good Todo Metadata

### Feature Request:
```json
{
  "title": "Metadata Editor with AI Assistance",
  "slug": "metadata-editor-feature",
  "type": "doc",
  "tags": ["todo", "feature", "metadata", "ai"],
  "status": "open",
  "priority": "high",
  "description": "Build AI-powered metadata editor for bulk operations on content"
}
```

### Bug Fix:
```json
{
  "title": "CodeBlock Formatting in Dark Mode",
  "slug": "codeblock-dark-mode-bug",
  "type": "doc",
  "tags": ["todo", "bug", "styling", "codeblock"],
  "status": "in-progress",
  "priority": "medium"
}
```

### Research/Decision:
```json
{
  "title": "Docs Homepage Routing Strategy",
  "slug": "docs-routing-decision",
  "type": "doc",
  "tags": ["todo", "routing", "architecture", "decision"],
  "status": "open",
  "priority": "medium",
  "description": "Decide between dedicated /docs page, unified homepage, or redirect pattern"
}
```

### Completed:
```json
{
  "title": "Hide Header Metadata Field",
  "slug": "hide-header-metadata",
  "type": "doc",
  "tags": ["todo", "metadata", "components"],
  "status": "done",
  "resolvedBy": "commit-2026-01-25-metadata-controls",
  "description": "Add optional hideHeader field to PostMeta for component control"
}
```

## Why This Matters

A well-organized todo system means:

1. **Never lose track of work** - Everything documented, statusable, searchable
2. **Clear priorities** - Know what to work on next
3. **Historical record** - See what was planned, what shipped, what was abandoned
4. **Onboarding** - Future employer/collaborator can see your thought process
5. **Validated by metadata editor** - Bulk operations prove the system's power

The todo system isn't just task tracking—it's **project memory as queryable data**.

## Timeline

**Now (5 minutes):**
- Add `status?: 'open' | 'in-progress' | 'done' | 'blocked' | 'wont-do'` to PostMeta type
- Add `status: 'open'` to existing todos

**Soon (1 hour):**
- Add status indicators to Navigator
- Create simple todo filter/overview page

**Later (2-3 hours):**
- Implement todo board view
- Add priority and due date fields
- Build auto-linking between todos and commits

**Eventually:**
- Drag-and-drop status updates
- Todo templates
- Advanced filtering and sorting
- Integration with metadata editor for bulk ops
