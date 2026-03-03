---json
{
  "title": "Markdown Table Test",
  "slug": "markdown-table-test",
  "date": "2026-01-26T12:30:00Z",
  "author": "Claude Sonnet 4.5",
  "authorshipNote": "🤖 AI-Generated",
  "type": "doc",
  "description": "Testing GFM table syntax rendering with primitive table components.",
  "tags": ["markdown", "tables", "testing"],
  "relatedPosts": ["table-examples", "markdown-renderer-implementation"]
}
---

## Simple Table

Here's a basic table in markdown:

| Feature | Status | Priority |
|---------|--------|----------|
| Tables in MD | ✅ Complete | High |
| Search | 📋 Planned | Medium |
| RSS Feed | 💭 Idea | Low |

## Content Metadata Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Display title |
| `slug` | string | Yes | URL identifier |
| `date` | string | Yes | ISO 8601 date |
| `tags` | string[] | No | Topic tags |
| `author` | string / string[] | No | Author name(s) |

## Authorship Categories

| Category | Badge | AI % | Notes |
|----------|-------|------|-------|
| AI-Generated | 🤖 | 100% | Model creates all content |
| AI-Assisted | 🔧 | 1-99% | Human edits AI output |
| Human-Written | ✍️ | 0% | No AI assistance |

## Alignment Test

You can also align columns:

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |
| More | More | More |
